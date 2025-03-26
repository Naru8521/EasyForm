import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import ChestFormMenuForm from "./ChestFormMenu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function SlotAmountForm(player, preset, showMode) {
    let data = preset.form.data;
    const size = data.size;
    const form = new UI.ModalFormData();

    form.title("%ef.form.slots");
    form.dropdown("§c%ef.form.message.slot§f\n%ef.form.slot", config.chestSizes, config.chestSizes.indexOf(size));
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await ChestFormMenuForm(player, preset, showMode);
    
    const newSize = config.chestSizes[formValues[0]];

    if (newSize === size) {
        await ChestFormMenuForm(player, preset, showMode);
        return;
    }

    data.size = newSize;
    data.buttons = [];
    await ChestFormMenuForm(player, preset, showMode);
}