import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function CloseForm(player, preset, showMode) {
    const form = new UI.ActionFormData();

    form.title("%ef.form.check");
    form.body("%ef.form.message.close");
    form.button("%ef.form.yes");
    form.button("%ef.form.no");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await CloseForm(player, preset, showMode);
    if (selection === 0) return;
    if (selection === 1) return await MenuForm(player, preset, showMode);
}