import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function FormTitleForm(player, preset, showMode, backForm) {
    let data = preset.form.data;
    const title = data.title;
    const form = new UI.ModalFormData();

    form.title("%ef.form.formTitle");
    form.textField("%ef.form.title", "", title);
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode);

    const newTitle = formValues[0];

    data.title = newTitle;
    await backForm(player, preset, showMode);
}