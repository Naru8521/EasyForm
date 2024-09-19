import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function ButtonSettingForm(player, preset, showMode, i, backForm) {
    let data = preset.form.data;
    let buttons = data.buttons;
    let button = buttons[i];
    const form = new UI.ModalFormData();

    form.title("%ef.form.buttonSetting");
    form.textField("%ef.form.text", "test", button.text);
    form.textField("%ef.form.iconPath", "textures/items/apple", button.iconPath);
    form.textField("%ef.form.move", "%ef.form.name", button.move);

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    const newText = formValues[0];
    const newIconPath = formValues[1];
    const newMove = formValues[2];

    button.text = newText;
    button.iconPath = newIconPath;
    button.move = newMove;
    await backForm(player, preset, showMode, i);
}