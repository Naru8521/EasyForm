import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function PreviewMessageForm(player, preset, showMode) {
    const data = preset.form.data;
    const title = data.title;
    const body = data.body;
    const buttons = data.buttons;
    const form = new UI.MessageFormData();

    if (buttons.length > 0) {
        form.title(title);
        form.body(body);

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const { text, iconPath } = button;

            if (i === 0) {
                form.button1(button)
            } else if (i === 1) {
                form.button2(button)
            }
        }

        await form.show(player);
        await MenuForm(player, preset, showMode);
    }
}