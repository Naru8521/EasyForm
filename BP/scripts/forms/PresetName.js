import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {string?} err
 */
export default async function PresetNameForm(player, preset, showMode, err) {
    const form = new UI.ModalFormData();

    form.title("%ef.form.name");
    form.textField(`${err ? `§c${err}§f\n` : ""}%ef.form.name`, "", preset.name);
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset, showMode);
    
    const newPresetName = formValues[0].trim();
    const ids = world.getDynamicPropertyIds();
    const presets = ids.map(id => JSON.parse(world.getDynamicProperty(id)));
    const presetNames = presets.map(preset => preset.name);

    if (presetNames.includes(newPresetName) && presets[presetNames.indexOf(newPresetName)].uuid !== preset.uuid) {
        await PresetNameForm(player, preset, showMode, "%ef.error.message.presetName");
        return;
    }

    preset.name = newPresetName;
    await MenuForm(player, preset, showMode);
}