import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
import { util } from "../util";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 */
export default async function ListForm(player) {
    const ids = world.getDynamicPropertyIds();

    /** @type {PresetConfig[]} */
    const presets = ids.map(id => JSON.parse(world.getDynamicProperty(id)));
    const form = new UI.ActionFormData();

    form.title("%ef.form.presetList");

    if (presets.length > 0) {
        form.body(`%ef.form.presetLength: ${presets.length}`);
        
        for (const preset of presets) {
            form.button(preset.name);
        }
    } else {
        form.body("%ef.form.noPreset");
        form.button("%ef.form.close");
    }

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return;
    if (presets.length > 0) {
        const preset = presets[selection];

        await MenuForm(player, preset, "edit");
    }
}