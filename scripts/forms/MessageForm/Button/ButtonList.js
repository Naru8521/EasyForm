import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ButtonEditMenuForm from "./ButtonEditMenu";
import MessageFormMenuForm from "../MessageFormMenu";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function ButtonListForm(player, preset, showMode) {
    let formData = preset.form.data;
    let buttons = formData.buttons;
    const form = new UI.ActionFormData();

    form.title("%ef.form.buttonList");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");

    for (const button of buttons) {
        form.button(button.text);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MessageFormMenuForm(player, preset, showMode);
    if (selection === 0) return await MessageFormMenuForm(player, preset, showMode);

    const i = selection - 1;

    await ButtonEditMenuForm(player, preset, showMode, i);
}