import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { formShowMap } from "../../maps";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    const players = world.getAllPlayers();

    for (const player of players) {
        const playerId = player.id;
        const presetName = formShowMap.get(playerId);

        if (presetName === args[0]) {
            UI.uiManager.closeAllForms(player);
        }
    }
}