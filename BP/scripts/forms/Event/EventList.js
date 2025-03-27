import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import MenuForm from "../Menu";
import EventAddForm from "./EventAdd";
import EventEditForm from "./EventEdit";
import { util } from "../../util";
/// <reference path="../../types.js" />
/// <reference path="../../eventTypes.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function EventListForm(player, preset, showMode) {
    const showEvents = preset.showEvents;
    const form = new UI.ActionFormData();

    form.title("%ef.form.eventList");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");
    form.button("§l§b%ef.form.add", "textures/ui/color_plus");

    for (const event of showEvents) {
        form.button(event.type);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset, showMode);
    if (selection === 0) return await MenuForm(player, preset, showMode);
    if (selection === 1) {
        const i = showEvents.length;

        showEvents.push(util.deepCopyObject(config.chatSendConfig));
        await EventAddForm(player, preset, showMode, i);
        return;
    }

    const i = selection - 2;

    await EventEditForm(player, preset, showMode, i);
}