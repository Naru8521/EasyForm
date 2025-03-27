import { Player } from "@minecraft/server";
import * as config from "../../config";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    const { prefix, id, tags } = config.commandConfig;

    player.sendMessage([
        "§bーー[ %command.help ]ーー§f",
        `§eprefix§f: ${prefix}`,
        `§eid§f: ${id}`,
        `§d%command.help.authorityTAG:§f ${tags}`,
        `§a${prefix} help§f - %command.help.help`,
        `§a${prefix} create§f - %command.help.create`,
        `§a${prefix} list§f - %command.help.list`,
        `§a${prefix} view <preset name>§f - %command.help.view`,
        `§a${prefix} close <preset name>§f - %command.help.close`,
        `§a${prefix} closeAll§f - %command.help.closeAll`,
        "§bーーーーーーーーーーーー§f"
    ].join("\n"));
}