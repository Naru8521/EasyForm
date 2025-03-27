import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import CommandAddForm from "./CommandAdd";
import CommandEditForm from "./CommandEdit";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {string[]} commands 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function CommandListForm(player, preset, showMode, commands, i, backForm) {
    const form = new UI.ActionFormData();

    form.title("%ef.form.commandsList");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");
    form.button("§l§b%ef.form.create", "textures/ui/check");

    for (const command of commands) {
        form.button(command);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);
    if (selection === 0) return await backForm(player, preset, showMode, i);
    if (selection === 1) return await CommandAddForm(player, preset, showMode, commands, i, backForm);

    const select = selection - 2;

    await CommandEditForm(player, preset, showMode, commands, i, backForm, select);
}