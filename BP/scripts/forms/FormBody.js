import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function FormBodyForm(player, preset, showMode, backForm) {
    let data = preset.form.data;
    const body = data.body;
    const form = new UI.ModalFormData();

    form.title("%ef.form.formBody");
    form.textField("%ef.form.body (\\n)%ef.form.message.newLine", "", body);
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode);

    const newBody = formValues[0];

    data.body = newBody.replace(/\\n/g, "\r\n");
    await backForm(player, preset, showMode);
}