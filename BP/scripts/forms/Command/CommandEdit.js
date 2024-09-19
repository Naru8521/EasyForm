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
 * @param {number} select
 */
export default async function CommandEditForm(player, preset, showMode, commands, i, backForm, select) {
    const command = commands[select];
    const form = new UI.ModalFormData();

    form.title("%ef.form.commandEdit");
    form.textField("%ef.form.command", "", command);
    form.toggle("§c%ef.form.delete", false);
    form.submitButton("%ef.form.save");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await CommandListForm(player, preset, showMode, commands, i, backForm);
    if (formValues[1]) {
        commands.splice(select, 1);
        await CommandListForm(player, preset, showMode, commands, i, backForm);
        return;
    }

    const newCommand = formValues[0].replace("/", "");

    commands[select] = newCommand;
    await CommandListForm(player, preset, showMode, commands, i, backForm);
}