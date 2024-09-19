import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function CancelForm(player, preset, showMode, backForm) {
    let data = preset.form.data;
    let cancel = data.cancel;
    let move = cancel.move;
    const form = new UI.ModalFormData();

    form.title("%ef.form.cancelButton");
    form.textField("%ef.form.move", "", move);
    form.submitButton("%ef.form.setting");
    
    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode);

    const newMove = formValues[0];

    move = newMove;
    await backForm(player, preset, showMode);
}