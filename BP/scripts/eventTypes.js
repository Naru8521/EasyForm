/**
 * @typedef {ChatSend | PlayerBreakBlock | PlayerPlaceBlock | ItemUse | ItemUseOn | PlayerInteractWithBlock | PlayerInteractWithEntity | WeatherChange | EffectAdd | ButtonPush | EntityHitEntityDamagingEntity | EntityHitEntityHitEntity | EntityHitBlock | LeverAction | PlayerDimensionChange | PlayerEmote | PlayerSpawn | PressurePlatePush | TripWireTrip} ShowEvent
 */

/**
 * @typedef {"ChatSend" | "PlayerBreakBlock" | "PlayerPlaceBlock" | "ItemUse" | "ItemUseOn" | "PlayerInteractWithBlock" | "PlayerInteractWithEntity" | "WeatherChange" | EffectAdd | ButtonPush | EntityHitEntityDamagingEntity | "EntityHitEntityHitEntity" | "EntityHitBlock" | "LeverAction" | "PlayerDimensionChange" | "PlayerEmote" | "PlayerSpawn" | "PressurePlatePush" | "TripWireTrip"} EventType
 */

/**
 * @typedef {("ChatSend" | "PlayerBreakBlock" | "PlayerPlaceBlock" | "ItemUse" | "ItemUseOn" | "PlayerInteractWithBlock" | "PlayerInteractWithEntity" | "WeatherChange" | EffectAdd | ButtonPush | EntityHitEntityDamagingEntity | "EntityHitEntityHitEntity" | "EntityHitBlock" | "LeverAction" | "PlayerDimensionChange" | "PlayerEmote" | "PlayerSpawn" | "PressurePlatePush" | "TripWireTrip")[]} EventTypes
 */

// イベント用 //

/**
 * @typedef {Object} Block
 * @property {string} id
 * @property {import("@minecraft/server").Vector3} location
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} name
 * @property {string[]} lore
 */

/**
 * @typedef {Object} Entity 
 * @property {string} id
 * @property {string} name
 */

// イベント //

/**
 * @typedef {Object} ChatSend
 * @property {"ChatSend"} type
 * @property {string} message
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} PlayerBreakBlock
 * @property {"PlayerBreakBlock"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} PlayerPlaceBlock
 * @property {"PlayerPlaceBlock"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} ItemUse
 * @property {"ItemUse"} type
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} ItemUseOn
 * @property {"ItemUseOn"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} PlayerInteractWithBlock
 * @property {"PlayerInteractWithBlock"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} PlayerInteractWithEntity
 * @property {"PlayerInteractWithEntity"} type
 * @property {Entity} entity
 * @property {Item} item 
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} WeatherChange 
 * @property {"WeatherChange"} type
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} EffectAdd 
 * @property {"EffectAdd"} type
 * @property {string[]} ids
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 * @property {boolean} cancel
 */

/**
 * @typedef {Object} ButtonPush 
 * @property {"ButtonPush"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} EntityHitEntityDamagingEntity
 * @property {"EntityHitEntityDamagingEntity"} type
 * @property {Entity} hitEntity
 * @property {Item} item 
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} EntityHitEntityHitEntity
 * @property {"EntityHitEntityHitEntity"} type
 * @property {Entity} damagingEntity
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} EntityHitBlock 
 * @property {"EntityHitBlock"} type
 * @property {Block} block
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} LeverAction 
 * @property {"LeverAction"} type
 * @property {Item} item
 * @property {Block} block
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} PlayerDimensionChange 
 * @property {"PlayerDimensionChange"} type
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} PlayerEmote 
 * @property {"PlayerEmote"} type
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} PlayerSpawn 
 * @property {"PlayerSpawn"} type
 * @property {boolean} initialSpawn
 * @property {Item} item
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} PressurePlatePush
 * @property {"PressurePlatePush"} type
 * @property {Item} item
 * @property {Block} block
 * @property {string} dimensionId
 * @property {string[]} tags
 */

/**
 * @typedef {Object} TripWireTrip
 * @property {"TripWireTrip"} type
 * @property {Item} item
 * @property {Block} block
 * @property {string} dimensionId
 * @property {string[]} tags
 */