import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import CommandListForm from "./CommandList";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {string[]} commands 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function CommandAddForm(player, preset, showMode, commands, i, backForm) {
    const form = new UI.ModalFormData();

    form.title("%ef.form.commandAdd");
    form.textField("%ef.form.command", "", "");
    form.submitButton("%ef.form.add");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await CommandListForm(player, preset, showMode, commands, i, backForm);
    
    const newCommand = formValues[0].replace("/", "");

    commands.push(newCommand);
    await CommandListForm(player, preset, showMode, commands, i, backForm);
}