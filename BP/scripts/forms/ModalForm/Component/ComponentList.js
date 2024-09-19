import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../../config";
import ModalFormMenuForm from "../ModalFormMenu";
import ComponentAddMenuForm from "./ComponentAddMenu";
import { util } from "../../../util";
import ComponentEditMenuForm from "./ComponentEditMenu";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function ComponentListForm(player, preset, showMode) {
    let data = preset.form.data;
    let components = data.components;
    const form = new UI.ActionFormData();

    form.title("%ef.form.componentList");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");
    form.button("§l§b%ef.form.add", "textures/ui/color_plus");
    
    for (const component of components) {
        form.button(component.type);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await ModalFormMenuForm(player, preset, showMode);
    if (selection === 0) return await ModalFormMenuForm(player, preset, showMode);
    if (selection === 1) {
        const i = components.length;

        components.push(util.deepCopyObject(config.textFieldConfig));
        await ComponentAddMenuForm(player, preset, showMode, i);
        return;
    }
    
    const i = selection - 2;

    await ComponentEditMenuForm(player, preset, showMode, i);
}