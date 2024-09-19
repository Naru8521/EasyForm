import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import ComponentListForm from "./ComponentList";
import ComponentTypeForm from "./CompnentType";
import ComponentSettingForm from "./ComponentSetting";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 */
export default async function ComponentAddMenuForm(player, preset, showMode, i) {
    let data = preset.form.data;
    let components = data.components;
    const form = new UI.ActionFormData();

    form.title("%ef.form.componentAdd");
    form.button("§l%ef.form.componentType", "textures/ui/mashup_hangar");
    form.button("§l%ef.form.componentSetting", "textures/ui/icon_setting");
    form.button("§l§b%ef.form.add", "textures/ui/check");

    const { selection, canceled } = await form.show(player);

    if (canceled) {
        components.splice(i, 1);
        await ComponentListForm(player, preset, showMode);
        return;
    }
    if (selection === 0) return await ComponentTypeForm(player, preset, showMode, i, ComponentAddMenuForm);
    if (selection === 1) return await ComponentSettingForm(player, preset, showMode, i, ComponentAddMenuForm);
    if (selection === 2) return await ComponentListForm(player, preset, showMode);
}