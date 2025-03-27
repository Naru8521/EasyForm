import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../../config";
import { util } from "../../../util";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>}
 */
export default async function ComponentTypeForm(player, preset, showMode, i, backForm) {
    let data = preset.form.data;
    let components = data.components;
    let component = components[i];
    const form = new UI.ModalFormData();

    form.title("%ef.form.componentType");
    form.dropdown("%ef.form.type", config.componentTypes, config.componentTypes.indexOf(component.type));
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    /** @type {ComponentType} */
    const newType = config.componentTypes[formValues[0]];

    switch (newType) {
        case "TextField":
            component = util.deepCopyObject(config.textFieldConfig);
            break;

        case "Slider":
            component = util.deepCopyObject(config.sliderConfig);
            break;

        case "DropDown":
            component = util.deepCopyObject(config.dropDownConfig);
            break;

        case "Toggle":
            component = util.deepCopyObject(config.toggleConfig);
            break;
    }

    data.components[i] = component;

    await backForm(player, preset, showMode, i);
}