import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function PreviewActionForm(player, preset, showMode) {
    const data = preset.form.data;
    const title = data.title;
    const body = data.body;
    const buttons = data.buttons;
    const form = new UI.ActionFormData();

    if (buttons.length > 0) {
        form.title(title);
        form.body(body);
    
        for (const button of buttons) {
            const { text, iconPath } = button;
    
            if (iconPath === "") {
                form.button(text)
            } else {
                form.button(text, iconPath);
            }
        }
    
        await form.show(player);
        await MenuForm(player, preset, showMode);
        return;
    }

    await MenuForm(player, preset, showMode, "%ef.error.message.button");
}