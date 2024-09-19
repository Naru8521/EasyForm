import { Player } from "@minecraft/server";
import ListForm from "../../forms/List";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    await ListForm(player);
}