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
    const data = preset.form.data;
    const buttons = data.buttons;
    const button = buttons[i];
    const form = new UI.ModalFormData();

    form.title("%ef.form.buttonSetting");
    form.textField("%ef.form.text", "test", button.text);
    form.textField("%ef.form.move", "%ef.form.name", button.move);

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    const newText = formValues[0];
    const newMove = formValues[1];

    button.text = newText;
    button.move = newMove;
    await backForm(player, preset, showMode, i);
}