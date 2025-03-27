import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>}
 */
export default async function ComponentSettingForm(player, preset, showMode, i, backForm) {
    let data = preset.form.data;

    /** @type {Component[]} */
    let components = data.components;
    let component = components[i];
    const type = component.type;
    const form = new UI.ModalFormData();

    form.title("%ef.form.componentSetting");
    
    switch (type) {
        case "TextField":
            form.textField("%ef.form.label", "", component.label);
            form.textField("%ef.form.placeholder", "", component.placeholderText);
            form.textField("%ef.form.default", "", component.defaultValue);
            break;

        case "Slider":
            form.textField("%ef.form.label", "", component.label);
            form.textField("%ef.form.minimum", "", `${component.minimumValue}`);
            form.textField("%ef.form.maximum", "", `${component.maximumValue}`);
            form.textField("%ef.form.step", "", `${component.valueStep}`);
            form.textField("%ef.form.default", "", `${component.defaultValue}`);
            break;

        case "DropDown":
            form.textField("%ef.form.label", "", component.label);
            form.textField("%ef.form.option", "", component.options.join(","));
            form.textField("%ef.form.default", "", component.defaultValue);
            break;

        case "Toggle":
            form.textField("%ef.form.label", "", component.label);
            form.toggle("%ef.form.default", component.defaultValue);
            break;
    }

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode);
    
    switch (type) {
        case "TextField":
            component.label = formValues[0];
            component.placeholderText = formValues[1];
            component.defaultValue = formValues[2];
            break;

        case "Slider":
            component.label = formValues[0];
            component.minimumValue = parseInt(formValues[1]) ?? 0;
            component.maximumValue = parseInt(formValues[2]) ?? 1;
            component.valueStep = parseInt(formValues[3]) ?? 1;
            component.defaultValue = 0;
            break;

        case "DropDown":
            component.label = formValues[0];
            component.options = formValues[1] === "" ? [] : formValues[1].split(",");
            component.defaultValue = formValues[2];
            break;

        case "Toggle":
            component.label = formValues[0];
            component.defaultValue = formValues[1];
            break;
    }

    await backForm(player, preset, showMode, i);
}