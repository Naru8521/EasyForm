import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ModalFormMenuForm from "./ModalFormMenu";
import SubmitButtonMenuForm from "./SubmitButtonMenu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function SubmitButtonSettingForm(player, preset, showMode) {
    let data = preset.form.data;
    let submitButton = data.submitButton;
    const form = new UI.ModalFormData();

    form.title("%ef.form.submitButton");
    form.textField("%ef.form.text", "", submitButton.text);
    form.textField("%ef.form.move", "%ef.form.name", submitButton.move);
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await SubmitButtonMenuForm(player, preset, showMode);

    submitButton.text = formValues[0];
    submitButton.move = formValues[1];
    await SubmitButtonMenuForm(player, preset, showMode);
}