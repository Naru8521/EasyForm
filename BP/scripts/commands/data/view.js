import { Player } from "@minecraft/server";
import view from "../../forms/View/view";
/// <reference path="../../types.js" />

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    await view(player, args[0]);
}