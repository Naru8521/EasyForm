import { Block, Entity, Player } from "@minecraft/server";

export class EventCheck {
    /**
     * @param {string} message 
     * @param {ShowEvent} event 
     */
    static isMessage(message, event) {
        if (event.message && event.message !== message) return false;

        return true;
    }

    /**
     * @param {Block} block
     * @param {ShowEvent} event
     */
    static isBlock(block, event) {
        const { id, location } = event.block;

        if (id && id !== block.typeId) return false;
        if (location && location.x === block.location.x && location.y === block.location.y && location.z === block.location.z) return false;

        return true;
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isItem(player, event) {
        const container = player.getComponent("inventory")?.container;
        const item = container?.getItem(player.selectedSlotIndex);
        const { id, name, lore } = event.item;

        if (!item) return false;
        if (id && id !== item.typeId) return false;
        if (name && name !== item.nameTag) return false;
        if (lore.length > 0 && !arraysEqual(lore, item.getLore())) return false;

        return true;
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isEntity(entity, event) {
        const { id, name } = event.entity;

        if (id && id !== entity.typeId) return false;
        if (name && name !== entity.nameTag) return false;

        return true;
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isHitEntity(entity, event) {
        const { id, name } = event.hitEntity;

        if (id && id !== entity.typeId) return false;
        if (name && name !== entity.nameTag) return false;

        return true;
    }

    /**
     * @param {Entity} entity
     * @param {ShowEvent} event
     */
    static isDamagingEntity(entity, event) {
        const { id, name } = event.damagingEntity;

        if (id && id !== entity.typeId) return false;
        if (name && name !== entity.nameTag) return false;

        return true;
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isDimensionId(player, event) {
        if (event.dimensionId && event.dimensionId !== player.dimension.id) return false;

        return true;
    }

    /**
     * @param {Player} player
     * @param {ShowEvent} event
     */
    static isTags(player, event) {
        if (event.tags.length > 0 && !player.getTags().some(tag => event.tags.includes(tag))) return false;

        return true;
    }
}
