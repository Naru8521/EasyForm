import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import { util } from "../../util";
/// <reference path="../../types.js" />
/// <reference path="../../eventTypes.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {number} i 
 * @param {Promise<ActionFormData | ModalFormData | MessageFormData>} backForm
 */
export default async function EventTypeForm(player, preset, showMode, i, backForm) {
    let showEvents = preset.showEvents;
    let event = showEvents[i];
    const type = event.type;
    const form = new UI.ModalFormData();

    form.title("%ef.form.eventType");
    form.dropdown("§c%ef.form.message.eventType§f\n%ef.form.type", config.eventTypes, config.eventTypes.indexOf(type));
    form.submitButton("%ef.form.setting");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, preset, showMode, i);

    /** @type {EventType} */
    const newType = config.eventTypes[formValues[0]];

    switch (newType) {
        case "ChatSend":
            event = util.deepCopyObject(config.chatSendConfig);
            break;

        case "EntityHitBlock":
            event = util.deepCopyObject(config.entityHitBlockConfig);
            break;

        case "EntityHitEntityHitEntity":
            event = util.deepCopyObject(config.entityHitEntityHitEntityConfig);
            break;

        case "ItemUse":
            event = util.deepCopyObject(config.itemUseConfig);
            break;

        case "ItemUseOn":
            event = util.deepCopyObject(config.itemUseOnConfig);
            break;

        case "LeverAction":
            event = util.deepCopyObject(config.leverActionConfig);
            break;

        case "PlayerBreakBlock":
            event = util.deepCopyObject(config.playerBreakBlockConfig);
            break;

        case "PlayerDimensionChange":
            event = util.deepCopyObject(config.playerDimensionChangeConfig);
            break;

        case "PlayerEmote":
            event = util.deepCopyObject(config.playerEmoteConfig);
            break;

        case "PlayerInteractWithBlock":
            event = util.deepCopyObject(config.playerInteractWithBlockConfig);
            break;

        case "PlayerInteractWithEntity":
            event = util.deepCopyObject(config.playerInteractWithEntityConfig);
            break;
        
        case "PlayerPlaceBlock":
            event = util.deepCopyObject(config.playerPlaceBlockConfig);
            break;

        case "PlayerSpawn":
            event = util.deepCopyObject(config.playerSpawnConfig);
            break;

        case "PressurePlatePush":
            event = util.deepCopyObject(config.pressurePlatePushConfig);
            break;

        case "TripWireTrip":
            event = util.deepCopyObject(config.tripWireTripConfig);
            break;

        case "WeatherChange":
            event = util.deepCopyObject(config.weatherChangeConfig);
            break;

        default:
            event = util.deepCopyObject(config.chatSendConfig);
            break;
    }

    preset.showEvents[i] = event;
    await backForm(player, preset, showMode, i);
}