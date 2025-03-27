import { Player, system, world } from "@minecraft/server";
import { Command } from "./commands/Command";
import { EventCheck } from "./eventCheck";
import view from "./forms/View/view";
import { formShowMap } from "./maps";

world.beforeEvents.playerLeave.subscribe(ev => {
    const { player } = ev;
    const playerId = player.id;

    if (formShowMap.has(playerId)) {
        formShowMap.delete(playerId);
    }
});

system.afterEvents.scriptEventReceive.subscribe(async ev => {
    const check = await Command.scriptCheck(ev);

    if (check) return;
});

world.beforeEvents.chatSend.subscribe(async (ev) => {
    const check = await Command.chatCheck(ev);

    if (check) return;
});

world.beforeEvents.chatSend.subscribe(ev => {
    const { sender, message } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "ChatSend") continue;
            if (!EventCheck.isMessage(message, event)) continue;
            if (!EventCheck.isItem(sender, event)) continue;
            if (!EventCheck.isDimensionId(sender, event)) continue;
            if (!EventCheck.isTags(sender, event)) continue;

            ev.cancel = event.cancel;
            view(sender, preset.name);
        }
    }
});

world.beforeEvents.playerBreakBlock.subscribe(ev => {
    const { player, block, itemStack } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerBreakBlock") continue;
            if (!EventCheck.isBlock(block, event)) continue;
            if (!EventCheck.isItem(itemStack, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            ev.cancel = event.cancel;
            view(player, preset.name);
        }
    }
});

world.beforeEvents.playerPlaceBlock.subscribe(ev => {
    const { player, block } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerPlaceBlock") continue;
            if (!EventCheck.isBlock(block, event)) continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            ev.cancel = event.cancel;
            view(player, preset.name);
        }
    }
});

world.beforeEvents.itemUse.subscribe(ev => {
    const { source, itemStack } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "ItemUse") continue;
            if (!EventCheck.isItem(source, event)) continue;
            if (!EventCheck.isDimensionId(source, event)) continue;
            if (!EventCheck.isTags(source, event)) continue;

            ev.cancel = event.cancel;
            view(source, preset.name);
        }
    }
});

world.beforeEvents.itemUseOn.subscribe(ev => {
    const { source, block, itemStack } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "ItemUseOn") continue;
            if (!EventCheck.isBlock(block, event)) continue;
            if (!EventCheck.isItem(source, event)) continue;
            if (!EventCheck.isDimensionId(source, event)) continue;
            if (!EventCheck.isTags(source, event)) continue;

            ev.cancel = event.cancel;
            view(source, preset.name);
        }
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
    const { player, block } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerInteractWithBlock") continue;
            if (!EventCheck.isBlock(block, event)) continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            ev.cancel = event.cancel;
            view(player, preset.name);
        }
    }
});

world.beforeEvents.playerInteractWithEntity.subscribe(ev => {
    const { player, target } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerInteractWithEntity") continue;
            if (!EventCheck.isEntity(target, event)) continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            ev.cancel = event.cancel;
            view(player, preset.name);
        }
    }
});

world.beforeEvents.weatherChange.subscribe(ev => {
    const players = world.getAllPlayers();

    for (const player of players) {
        const presets = getPresets();

        for (const preset of presets) {
            const showEvents = preset.showEvents;

            for (const event of showEvents) {
                if (event.type !== "WeatherChange") continue;
                if (!EventCheck.isItem(player, event)) continue;
                if (!EventCheck.isDimensionId(player, event)) continue;
                if (!EventCheck.isTags(player, event)) continue;

                ev.cancel = event.cancel;
                view(player, preset.name);
            }
        }
    }
});

world.beforeEvents.effectAdd.subscribe(ev => {
    const { entity, effectType } = ev;

    if (entity instanceof Player) {
        const presets = getPresets();

        for (const preset of presets) {
            const showEvents = preset.showEvents;

            for (const event of showEvents) {
                if (event.type !== "EffectAdd") continue;
                if (!event.ids.includes(effectType)) continue;
                if (!EventCheck.isItem(entity, event)) continue;
                if (!EventCheck.isDimensionId(entity, event)) continue;
                if (!EventCheck.isTags(entity, event)) continue;

                ev.cancel = event.cancel;
                view(entity, preset.name);
            }
        }
    }
});

world.afterEvents.buttonPush.subscribe(ev => {
    const { source, block } = ev;

    if (source instanceof Player) {
        const presets = getPresets();

        for (const preset of presets) {
            const showEvents = preset.showEvents;

            for (const event of showEvents) {
                if (event.type !== "ButtonPush") continue;
                if (!EventCheck.isBlock(block, event)) continue;
                if (!EventCheck.isItem(source, event)) continue;
                if (!EventCheck.isDimensionId(source, event)) continue;
                if (!EventCheck.isTags(source, event)) continue;

                view(source, preset.name);
            }
        }
    }
});

world.afterEvents.entityHitEntity.subscribe(ev => {
    const { damagingEntity, hitEntity } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (damagingEntity instanceof Player && event.type === "EntityHitEntityDamagingEntity") {
                if (!EventCheck.isHitEntity(hitEntity, event)) continue;
                if (!EventCheck.isItem(damagingEntity, event)) continue;
                if (!EventCheck.isDimensionId(damagingEntity, event)) continue;
                if (!EventCheck.isTags(damagingEntity, event)) continue;

                view(damagingEntity, preset.name);
            } else if (hitEntity instanceof Player && event.type === "EntityHitEntityHitEntity") {
                if (!EventCheck.isDamagingEntity(damagingEntity, event)) continue;
                if (!EventCheck.isItem(hitEntity, event)) continue;
                if (!EventCheck.isDimensionId(hitEntity, event)) continue;
                if (!EventCheck.isTags(hitEntity, event)) continue;

                view(hitEntity, preset.name);
            }
        }
    }
});

world.afterEvents.entityHitBlock.subscribe(ev => {
    const { damagingEntity, hitBlock } = ev;

    if (damagingEntity instanceof Player) {
        const presets = getPresets();

        for (const preset of presets) {
            const showEvents = preset.showEvents;

            for (const event of showEvents) {
                if (event.type !== "EntityHitBlock") continue;
                if (!EventCheck.isBlock(hitBlock, event)) continue;
                if (!EventCheck.isItem(damagingEntity, event)) continue;
                if (!EventCheck.isDimensionId(damagingEntity, event)) continue;
                if (!EventCheck.isTags(damagingEntity, event)) continue;

                view(damagingEntity, preset.name);
            }
        }
    }
});

world.afterEvents.leverAction.subscribe(ev => {
    const { player, block } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "LeverAction") continue;
            if (!EventCheck.isBlock(block, event)) continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            view(player, preset.name);
        }
    }
});

world.afterEvents.playerDimensionChange.subscribe(ev => {
    const { player } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerDimensionChange") continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            view(player, preset.name);
        }
    }
});

world.afterEvents.playerEmote.subscribe(ev => {
    const { player } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerEmote") continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            view(player, preset.name);
        }
    }
});

world.afterEvents.playerSpawn.subscribe(ev => {
    const { player, initialSpawn } = ev;
    const presets = getPresets();

    for (const preset of presets) {
        const showEvents = preset.showEvents;

        for (const event of showEvents) {
            if (event.type !== "PlayerSpawn") continue;
            if (event.initialSpawn !== initialSpawn) continue;
            if (!EventCheck.isItem(player, event)) continue;
            if (!EventCheck.isDimensionId(player, event)) continue;
            if (!EventCheck.isTags(player, event)) continue;

            view(player, preset.name);
        }
    }
});

world.afterEvents.pressurePlatePush.subscribe(ev => {
    const { source, block } = ev;

    if (source instanceof Player) {
        const presets = getPresets();

        for (const preset of presets) {
            const showEvents = preset.showEvents;

            for (const event of showEvents) {
                if (event.type !== "PressurePlatePush") continue;
                if (!EventCheck.isBlock(block, event)) continue;
                if (!EventCheck.isItem(source, event)) continue;
                if (!EventCheck.isDimensionId(source, event)) continue;
                if (!EventCheck.isTags(source, event)) continue;

                view(source, preset.name);
            }
        }
    }
});

world.afterEvents.tripWireTrip.subscribe(ev => {
    const { sources, block } = ev;

    for (const source of sources) {
        if (source instanceof Player) {
            const presets = getPresets();

            for (const preset of presets) {
                const showEvents = preset.showEvents;

                for (const event of showEvents) {
                    if (event.type !== "PressurePlatePush") continue;
                    if (!EventCheck.isBlock(block, event)) continue;
                    if (!EventCheck.isItem(source, event)) continue;
                    if (!EventCheck.isDimensionId(source, event)) continue;
                    if (!EventCheck.isTags(source, event)) continue;

                    view(source, preset.name);
                }
            }
        }
    }
});

/**
 * @returns {PresetConfig[]}
 */
function getPresets() {
    const ids = world.getDynamicPropertyIds();
    const presets = ids.map(id => JSON.parse(world.getDynamicProperty(id)));

    return presets;
}