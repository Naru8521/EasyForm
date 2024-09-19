import { Block, Entity, Player } from "@minecraft/server";

export class EventCheck {
    /**
     * @param {string} message 
     * @param {ShowEvent} event 
     */
    static isMessage(message, event) {
        return !event.message || message === event.message;
    }

    /**
     * @param {Block} block
     * @param {ShowEvent} event
     */
    static isBlock(block, event) {
        const { id, location } = event.block;
        return (
            !id && isNaN(location.x) && isNaN(location.y) && isNaN(location.z) ||
            id === block.typeId ||
            (location.x === block.location.x && location.y === block.location.y && location.z === block.location.z)
        );
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isItem(player, event) {
        const container = player.getComponent("inventory")?.container;
        const item = container?.getItem(player.selectedSlotIndex);
        const { id, name, lore } = event.item;

        return (
            (!id && !name && lore.length === 0) ||
            (item && (
                id === item.typeId ||
                name === item.nameTag ||
                (lore.length > 0 && arraysEqual(lore, item.getLore()))
            ))
        );
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isEntity(entity, event) {
        const { id, name } = event.entity;
        return !id && !name || id === entity.typeId || name === entity.nameTag;
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isHitEntity(entity, event) {
        const { id, name } = event.hitEntity;
        return !id && !name || id === entity.typeId || name === entity.nameTag;
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isDamagingEntity(entity, event) {
        const { id, name } = event.damagingEntity;
        return !id && !name || id === entity.typeId || name === entity.nameTag;
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isDimensionId(player, event) {
        return !event.dimensionId || player.dimension.id === event.dimensionId;
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isTags(player, event) {
        return event.tags.length === 0 || player.getTags().some(tag => event.tags.includes(tag));
    }
}
