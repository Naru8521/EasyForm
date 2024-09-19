import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../../config";
import { ChestFormData } from "../../../libs/extensions/forms";
import { util } from "../../../util";
import ChestFormMenuForm from "../ChestFormMenu";
import ButtonEditMenuForm from "./ButtonEditMenu";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function ButtonListForm(player, preset, showMode) {
    /** @type {ChestFormDataConfig} */
    let data = preset.form.data;
    const size = data.size;
    const buttons = data.buttons;
    const form = new ChestFormData(size);

    if (buttons.length === 0) {
        for (let i = 0; i < size; i++) {
            const newButton = util.deepCopyObject(config.chestButtonConfig);

            newButton.slot = i;
            data.buttons.push(newButton);
        }
    }

    form.title("%ef.form.buttonList");
    
    for (const button of buttons) {
        const { slot, name, lore, textureId, amount, enchant } = button;

        form.button(slot, name, lore, textureId, amount, enchant);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await ChestFormMenuForm(player, preset, showMode);

    await ButtonEditMenuForm(player, preset, showMode, selection);
}