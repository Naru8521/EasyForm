import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    const players = world.getAllPlayers();

    for (const player of players) {
        UI.uiManager.closeAllForms(player);
    }
}