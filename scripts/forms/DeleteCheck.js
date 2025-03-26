import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function DeleteCheckForm(player, preset, showMode) {
    const form = new UI.ActionFormData();

    form.title("%ef.form.check");
    form.body("%ef.form.message.delete");
    form.button("%ef.form.yes");
    form.button("%ef.form.no");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await DeleteCheckForm(player, preset, showMode);
    if (selection === 0) {
        world.setDynamicProperty(preset.uuid, undefined);
        player.sendMessage(`${preset.name} %ef.message.delete`);
    }
    if (selection === 1) return await MenuForm(player, preset, showMode);
}