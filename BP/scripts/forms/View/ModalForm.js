import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { util } from "../../util";
import view from "./view";
import { formShowMap } from "../../maps";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 */
export default async function ViewModalForm(player, preset) {
    const playerId = player.id;
    const data = preset.form.data;
    const title = data.title;

    /** @type {ComponentType[]} */
    const components = data.components;
    const submitButton = data.submitButton;
    const cancel = data.cancel;
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

    formShowMap.set(playerId, preset.name);

    const { formValues, canceled } = await util.formBusy(player, form);

    formShowMap.delete(playerId);

    if (canceled) {
        const move = cancel.move;

        if (move !== "") {
            await view(player, move);
        }
        return;
    }

    const commands = submitButton.commands;
    const move = submitButton.move;

    for (let command of commands) {
        try {
            command = command.replace(/\{formValues\[(\d+)\]\}/g, (match, index) => {
                return formValues[index] !== undefined ? formValues[index] : match;
            });
            
            player.runCommandAsync(command);
        } catch {};
    }

    if (move !== "") {
        await view(player, move);
        return;
    }
}