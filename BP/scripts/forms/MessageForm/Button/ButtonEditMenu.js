import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ButtonListForm from "./ButtonList";
import ButtonSettingForm from "./ButtonSetting";
import CommandListForm from "../../Command/CommandList";
import { util } from "../../../util";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 */
export default async function ButtonEditMenuForm(player, preset, showMode, i) {
    let data = preset.form.data;
    let buttons = data.buttons;
    let button = buttons[i];
    let commands = button.commands;
    const form = new UI.ActionFormData();

    form.title("%ef.form.buttonEdit");
    form.body([

    ].join("\n"));
    form.button("§l%ef.form.buttonSetting");
    form.button("§l%ef.form.commandsList", "textures/ui/ImpulseSquare");
    form.button("§l§a%ef.form.save", "textures/ui/check");

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return await ButtonListForm(player, preset, showMode);
    if (selection === 0) return await ButtonSettingForm(player, preset, showMode, i, ButtonEditMenuForm);
    if (selection === 1) return await CommandListForm(player, preset, showMode, commands, i, ButtonEditMenuForm);
    if (selection === 2) {
        buttons[i] = button;
        await ButtonListForm(player, preset, showMode);
        return;
    }
}