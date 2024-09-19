import { Player } from "@minecraft/server";
import { ChestFormData } from "../../libs/extensions/forms";
import { formShowMap } from "../../maps";
import view from "./view";
import { util } from "../../util";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 */
export default async function ViewChestForm(player, preset) {
    const playerId = player.id;
    const data = preset.form.data;
    const size = data.size;
    const title = data.title;
    const buttons = data.buttons;
    const cancel = data.cancel;
    const form = new ChestFormData(size);

    form.title(title);

    for (const button of buttons) {
        const { slot, name, lore, textureId, amount, enchant } = button;

        if (name !== "" && textureId !== "") {
            form.button(slot, name, lore, textureId, amount, enchant);
        }
    }

    formShowMap.set(playerId, preset.name);

    const { selection, canceled } = await util.formBusy(player, form);

    formShowMap.delete(playerId);

    if (canceled) {
        const move = cancel.move;

        if (move !== "") {
            await view(player, move);
        }
        return;
    }

    const button = buttons[selection];
    const commands = button.commands;
    const move = button.move;

    for (const command of commands) {
        try {
            player.runCommandAsync(command);
        } catch {}
    }

    if (move !== "") {
        await view(player, move);
        return;
    }
}