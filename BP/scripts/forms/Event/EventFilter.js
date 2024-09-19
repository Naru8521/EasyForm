import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
/// <reference path="../../types.js" />
/// <reference path="../../eventTypes.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function EventFilterForm(player, preset, showMode, i, backForm) {
    let showEvents = preset.showEvents;
    let event = showEvents[i];
    const type = event.type;
    const form = new UI.ModalFormData();

    form.title("%ef.form.eventFilter");

    switch (type) {
        case "ChatSend":
            form.textField("%ef.form.message", "", event.message);
            break;

        case "EntityHitBlock":
        case "ItemUseOn":
        case "LeverAction":
        case "PlayerBreakBlock":
        case "PlayerInteractWithBlock":
        case "PlayerPlaceBlock":
        case "PressurePlatePush":
        case "TripWireTrip":
            form.textField("%ef.form.blockId", "", event.block.id);
            form.textField("%ef.form.location (x,y,z)", "", `${event.block.location.x},${event.block.location.y},${event.block.location.z}`);
            break;

        case "EntityHitEntityHitEntity":
            form.textField("%ef.form.entityId", "", event.damagingEntity.id);
            form.textField("%ef.form.entityName", "", event.damagingEntity.name);
            break;

        case "PlayerInteractWithEntity":
            form.textField("%ef.form.entityId", "", event.entity.id);
            form.textField("%ef.form.entityName", "", event.entity.name);
            break;

        case "PlayerSpawn":
            form.toggle("%ef.form.initialSpawn", event.initialSpawn);
            break;
    }

    form.textField("%ef.form.itemId", "", event.item.id);
    form.textField("%ef.form.itemName", "", event.item.name);
    form.textField("%ef.form.itemLore", "", event.item.lore.join(","));
    form.textField("%ef.form.dimensionId", "minecraft:overworld", event.dimensionId);
    form.textField("%ef.form.tag (,%ef.form.message.several)", "a,b,c", event.tags.join(","));

    if (event.cancel !== undefined) {
        form.toggle("%ef.form.cancel", event.cancel);
    }

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    let formIndex = 0;

    if (type === "ChatSend") {
        event.message = formValues[formIndex++];
    } else if (
        type === "EntityHitBlock" ||
        type === "ItemUseOn" ||
        type === "LeverAction" ||
        type === "PlayerBreakBlock" ||
        type === "PlayerInteractWithBlock" ||
        type === "PlayerPlaceBlock" ||
        type === "PressurePlatePush" ||
        type === "TripWireTrip"
    ) {
        event.block.id = formValues[formIndex++];

        const locationString = formValues[formIndex++].trim();

        if (locationString === "") {
            event.block.location = { x: NaN, y: NaN, z: NaN };
        } else {
            const [x, y, z] = locationString.split(",").map(coord => parseInt(coord) || NaN);
            event.block.location = { x, y, z };
        }
    } else if (type === "EntityHitEntityHitEntity") {
        event.damagingEntity.id = formValues[formIndex++];
        event.damagingEntity.name = formValues[formIndex++];
    } else if (type === "PlayerInteractWithEntity") {
        event.entity.id = formValues[formIndex++];
        event.entity.name = formValues[formIndex++];
    } else if (type === "PlayerSpawn") {
        event.initialSpawn = formValues[formIndex++];
    }

    event.item.id = formValues[formIndex++];
    event.item.name = formValues[formIndex++];

    const lore = formValues[formIndex++];
    event.item.lore = lore.trim() === "" ? [] : lore.split(",");
    event.dimensionId = formValues[formIndex++];

    const tags = formValues[formIndex++];
    event.tags = tags.trim() === "" ? [] : tags.split(",");

    if (event.cancel !== undefined) {
        event.cancel = formValues[formIndex++];
    }

    await backForm(player, preset, showMode, i);
}
