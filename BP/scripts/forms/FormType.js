import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../config";
import MenuForm from "./Menu";
import { util } from "../util";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function FormTypeForm(player, preset, showMode) {
    const type = preset.form.type;
    const form = new UI.ModalFormData();
    
    form.title("%ef.form.formType");
    form.dropdown("§c%ef.form.message.formType§f\n%ef.form.type", config.formTypes, config.formTypes.indexOf(type));
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset, showMode);

    /** @type {FormType} */
    const newType = config.formTypes[formValues[0]];
    const newData = newType === "ActionForm"
        ? util.deepCopyObject(config.actionFormDataConfig)
        : newType === "ModalForm"
            ? util.deepCopyObject(config.modalFormDataConfig)
            : newType === "MessageForm"
                ? util.deepCopyObject(config.messageFormDataConfig)
                : newType === "ChestForm"
                    ? util.deepCopyObject(config.chestFormDataConfig)
                    : {}

    if (newType === type) {
        await MenuForm(player, preset, showMode);
        return;
    }

    preset.form.type = newType;
    preset.form.data = newData;
    await MenuForm(player, preset, showMode);
}