import { Player, system, world } from "@minecraft/server";
import ViewActionForm from "./ActionForm";
import ViewModalForm from "./ModalForm";
import ViewMessageForm from "./MessageForm";
import ViewChestForm from "./ChestForm";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {string} presetName 
 */
export default async function view(player, presetName) {
    const ids = world.getDynamicPropertyIds();

    /** @type {PresetConfig[]} */
    const presets = ids.map(id => JSON.parse(world.getDynamicProperty(id)));
    const presetNames = presets.map(preset => preset.name);

    if (presetNames.length > 0) {
        const index = presetNames.indexOf(presetName);
        const preset = presets[index];
        const form = preset.form;
        const type = form.type;
    
        switch (type) {
            case "ActionForm":
                system.run(async () => {
                    await ViewActionForm(player, preset);
                });
                break;
    
            case "ModalForm":
                system.run(async () => {
                    await ViewModalForm(player, preset);
                });
                break;
    
            case "MessageForm":
                system.run(async () => {
                    await ViewMessageForm(player, preset);
                });
                break;

            case "ChestForm":
                system.run(async () => {
                    await ViewChestForm(player, preset);
                });
                break;
    
            default:
                break;
        }
    }
}