import { Player } from "@minecraft/server";
import { ChestFormData } from "../../libs/extensions/forms";
import MenuForm from "../Menu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function PreviewChestForm(player, preset, showMode) {
    const data = preset.form.data;
    const size = data.size;
    const title = data.title;
    const buttons = data.buttons;
    const form = new ChestFormData(size);

    form.title(title);

    for (const button of buttons) {
        const { slot, name, lore, textureId, amount, enchant } = button;

        if (name !== "" && textureId !== "") {
            form.button(slot, name, lore, textureId, amount, enchant);
        }
    }

    await form.show(player);
    await MenuForm(player, preset, showMode);
}