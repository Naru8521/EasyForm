import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
import FormTitleForm from "../FormTitle";
import CancelForm from "../Cancel";
import SlotAmountForm from "./SlotAmount";
import ButtonListForm from "./Button/ButtonList";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function ChestFormMenuForm(player, preset, showMode) {
    const form = new UI.ActionFormData();

    form.title("%ef.form.formEdit");
    form.button("§l%ef.form.formTitle", "textures/items/name_tag");
    form.button("§l%ef.form.slots", "textures/ui/slot_enabled_pocket");
    form.button("§l%ef.form.buttonList", "textures/ui/keyboard_tooltip_icon");
    form.button("§l%ef.form.cancelButton", "textures/ui/realms_red_x");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset, showMode);
    if (selection === 0) return await FormTitleForm(player, preset, showMode, ChestFormMenuForm);
    if (selection === 1) return await SlotAmountForm(player, preset, showMode);
    if (selection === 2) return await ButtonListForm(player, preset, showMode);
    if (selection === 3) return await CancelForm(player, preset, showMode, ChestFormMenuForm);
    if (selection === 4) return await MenuForm(player, preset, showMode);
}