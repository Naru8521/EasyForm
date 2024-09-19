import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../../config";
import ButtonAddMenuForm from "./ButtonAddMenu";
import ButtonEditMenuForm from "./ButtonEditMenu";
import { util } from "../../../util";
import ActionFormMenuForm from "../ActionFormMenu";
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
    form.button("§l§b%ef.form.add", "textures/ui/color_plus");

    for (const button of buttons) {
        form.button(button.text);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await ActionFormMenuForm(player, preset, showMode);
    if (selection === 0) return await ActionFormMenuForm(player, preset, showMode);
    if (selection === 1) {
        const i = buttons.length;
        const button = util.deepCopyObject(config.buttonConfig);

        buttons.push(button);
        await ButtonAddMenuForm(player, preset, showMode, i);
        return;
    }

    const i = selection - 2;

    await ButtonEditMenuForm(player, preset, showMode, i);
}