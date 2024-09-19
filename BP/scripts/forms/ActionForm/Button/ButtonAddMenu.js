import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ButtonListForm from "./ButtonList";
import ButtonSettingForm from "./ButtonSetting";
import CommandListForm from "../../Command/CommandList";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 */
export default async function ButtonAddMenuForm(player, preset, showMode, i) {
    let data = preset.form.data;
    let buttons = data.buttons;
    let button = buttons[i];
    let commands = button.commands;
    const form = new UI.ActionFormData();

    form.title("%ef.form.buttonAdd");
    form.body([

    ].join("\n"));
    form.button("§l%ef.form.buttonSetting", "textures/ui/keyboard_tooltip_icon");
    form.button("§l%ef.form.commandsList", "textures/ui/ImpulseSquare");
    form.button("§l§b%ef.form.create", "textures/ui/check");

    const { selection, canceled } = await form.show(player);

    if (canceled) {
        data.buttons.splice(i, 1);
        await ButtonListForm(player, preset, showMode);
        return;
    }
    if (selection === 0) return await ButtonSettingForm(player, preset, showMode, i, ButtonAddMenuForm);
    if (selection === 1) return await CommandListForm(player, preset, showMode, commands, i, ButtonAddMenuForm);
    if (selection === 2) return await ButtonListForm(player, preset, showMode);
}