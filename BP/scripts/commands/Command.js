import { ChatSendBeforeEvent, ScriptEventCommandMessageAfterEvent } from "@minecraft/server";
import * as config from "../config";

export class Command {
    /**
     * @param {ChatSendBeforeEvent} ev
     * @returns {Promise<boolean>}
     */
    static async chatCheck(ev) {
        const { sender, message } = ev;

        if (message.startsWith(config.commandConfig.prefix)) {
            ev.cancel = true;
    
            const tags = sender.getTags();
            const hasPermission = tags.some(tag => config.commandConfig.tags.includes(tag));
    
            if (hasPermission) {
                const command = message.slice(config.commandConfig.prefix.length).trim();
                const [commandName, ...args] = command.split(' ');
    
                try {
                    const module = await import(`./data/${commandName}`);
                    module.run(sender, args);
                    return true;
                } catch (e) {
                    console.warn(e);
                    sender.sendMessage(`§cError: ${message}。%command.error.noExist`);
                }
            } else {
                sender.sendMessage(`§cError: %command.error.noAuthority`);
            }
        }

        return false;
    }

    /**
     * @param {ScriptEventCommandMessageAfterEvent} ev
     * @returns {Promise<boolean>}
     */
    static async scriptCheck(ev) {
        const { id, message, sourceEntity } = ev;

        if (config.commandConfig.id === id) {
            const [commandName, ...args] = message.split(' ');

            try {
                const module = await import(`./data/${commandName}`);
    
                module.run(sourceEntity, args);
                return true;
            } catch (e) {
                if (sourceEntity) {
                    sourceEntity.sendMessage(`§cエラー: ${message}。%command.error.noExist`);
                }
            }
        }

        return false;
    }
}