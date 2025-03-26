import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function ButtonSettingForm(player, preset, showMode, i, backForm) {
    let data = preset.form.data;
    let buttons = data.buttons;
    let button = buttons[i];
    const form = new UI.ModalFormData();

    form.title("%ef.form.buttonSetting");
    form.textField("%ef.form.name", "", button.name);
    form.textField("%ef.form.lore (,%ef.form.message.several)", "", button.lore.join(","));
    form.textField("%ef.form.textureId", "minecraft:apple | textures/items/diamond", button.textureId);
    form.textField("%ef.form.amount", "1", `${button.amount}`);
    form.toggle("%ef.form.enchant", button.enchant);
    form.textField("%ef.form.move", "%ef.form.name", button.move);

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    const name = formValues[0];
    const lore = formValues[1].trim() === "" ? [] : formValues[1].split(",");
    const textureId = formValues[2];
    const amount = parseInt(formValues[3]) ?? 1;
    const enchant = formValues[4];
    const move = formValues[5];

    button.name = name;
    button.lore = lore;
    button.textureId = textureId;
    button.amount = amount;
    button.enchant = enchant;
    button.move = move;
    await backForm(player, preset, showMode, i);
}