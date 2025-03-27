import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { util } from "../../util";
import view from "./view";
import { formShowMap } from "../../maps";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 */
export default async function ViewMessageForm(player, preset) {
    const playerId = player.id;
    const data = preset.form.data;
    const title = data.title;
    const body = data.body;
    const buttons = data.buttons;
    const cancel = data.cancel;
    const form = new UI.MessageFormData();

    if (buttons.length > 0) {
        form.title(title);
        form.body(body);

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const { text } = button;

            if (i === 1) {
                form.button1(text)
            } else if (i === 0) {
                form.button2(text)
            }
        }

        formShowMap.set(playerId, preset.name);

        const { selection, canceled } = await util.formBusy(player, form);

        formShowMap.delete(playerId);

        if (canceled) {
            const move = cancel.move;

            if (move !== "") {
                await view(player, move);
            }
            return;
        }

        const button = buttons[selection === 1 ? 0 : 1];
        const commands = button.commands;
        const move = button.move;

        for (const command of commands) {
            try {
                player.runCommandAsync(command);
            } catch {}
        }

        if (move !== "") {
            await view(player, move);
            return;
        }
    }   
}