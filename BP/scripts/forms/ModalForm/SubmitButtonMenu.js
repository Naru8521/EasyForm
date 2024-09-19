import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ModalFormMenuForm from "./ModalFormMenu";
import SubmitButtonSettingForm from "./SubmitButtonSetting";
import CommandListForm from "../Command/CommandList";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function SubmitButtonMenuForm(player, preset, showMode) {
    let data = preset.form.data;
    let submitButton = data.submitButton;
    let commands = submitButton.commands;
    const form = new UI.ActionFormData();

    form.title("%ef.form.submitButton");
    form.button("§l%ef.form.setting", "textures/ui/icon_setting");
    form.button("§l%ef.form.commandsList", "textures/ui/ImpulseSquare");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await ModalFormMenuForm(player, preset, showMode);
    if (selection === 0) return await SubmitButtonSettingForm(player, preset, showMode);
    if (selection === 1) return await CommandListForm(player, preset, showMode, commands, undefined, SubmitButtonMenuForm);
    if (selection === 2) return await ModalFormMenuForm(player, preset, showMode);
}