import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EventListForm from "./EventList";
import EventTypeForm from "./EventType";
import EventFilterForm from "./EventFilter";
/// <reference path="../../types.js" />
/// <reference path="../../eventTypes.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 */
export default async function EventEditForm(player, preset, showMode, i) {
    let showEvents = preset.showEvents;
    let event = showEvents[i];
    const form = new UI.ActionFormData();

    form.title("%ef.form.eventEdit");
    form.button("§l%ef.form.eventType", "textures/ui/mashup_hangar");
    form.button("§l%ef.form.eventSetting", "textures/items/book_writable");
    form.button("§l§c%ef.form.delete", "textures/ui/icon_trash");
    form.button("§l§a%ef.form.save", "textures/ui/check");

    const { selection, canceled } = await form.show(player);

    if (canceled) await EventListForm(player, preset, showMode);
    if (selection === 0) return await EventTypeForm(player, preset, showMode, i, EventEditForm);
    if (selection === 1) return await EventFilterForm(player, preset, showMode, i, EventEditForm);
    if (selection === 2) {
        showEvents.splice(i, 1);
        await EventListForm(player, preset, showMode);
        return;
    }
    if (selection === 3) {
        showEvents[i] = event;
        await EventListForm(player, preset, showMode);
        return;
    }
}