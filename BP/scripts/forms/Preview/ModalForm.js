import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function PreviewModalForm(player, preset, showMode) {
    const data = preset.form.data;
    const title = data.title;

    /** @type {ComponentType[]} */
    const components = data.components;
    const submitButton = data.submitButton;

    if (components.length > 0) {
        const form = new UI.ModalFormData();

        form.title(title);
        
        for (const component of components) {
            const type = component.type;

            switch (type) {
                case "TextField":
                    form.textField(component.label, component.placeholderText, component.defaultValue);
                    break;
    
                case "DropDown":
                    form.dropdown(component.label, component.options, component.options.indexOf(component.defaultValue));
                    break;
    
                case "Slider":
                    form.slider(component.label, component.minimumValue, component.maximumValue, component.valueStep, component.defaultValue);
                    break;
    
                case "Toggle":
                    form.toggle(component.label, component.defaultValue);
                    break;
            }
        }

        if (submitButton.text !== "") {
            form.submitButton(submitButton);
        }
    
        await form.show(player);
        await MenuForm(player, preset, showMode);
        return;
    }

    await MenuForm(player, preset, showMode, "%ef.error.message.component");
}