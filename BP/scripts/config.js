/// <reference path="./types.js" />
/// <reference path="./eventTypes.js" />

/** @type {CommandConfig} */
export const commandConfig = {
    prefix: "ef", // チャット実行時の最初に付ける文字
    id: "e:f", // scriptEventコマンド実行時の識別ID
    tags: ["op"] // 実行権限
};

/** @type {FormTypes} */
export const formTypes = [
    "ActionForm",
    "ModalForm",
    "MessageForm",
    "ChestForm"
];

/** @type {ComponentTypes} */
export const componentTypes = [
    "DropDown",
    "Slider",
    "TextField",
    "Toggle"
];

/** @type {ChestSizes} */
export const chestSizes = [
    "5",
    "9",
    "18",
    "27",
    "36",
    "45",
    "54"
];

/** @type {PresetConfig} */
export const presetConfig = {
    uuid: "",
    name: "",
    showEvents: [],
    form: {
        type: "",
        data: {}
    }
};

/** @type {ActionFormData} */
export const actionFormDataConfig = {
    title: "",
    body: "",
    buttons: [],
    cancel: {
        move: ""
    }
};

/** @type {ModalFormData} */
export const modalFormDataConfig = {
    title: "",
    components: [],
    submitButton: {
        text: "",
        move: "",
        commands: []
    },
    cancel: {
        move: ""
    }
};

/** @type {MessageFormData} */
export const messageFormDataConfig = {
    title: "",
    body: "",
    buttons: [
        {
            text: "button0",
            move: "",
            commands: []
        },
        {
            text: "button1",
            move: "",
            commands: []
        }
    ],
    cancel: {
        move: ""
    }
};

/** @type {ChestFormDataConfig} */
export const chestFormDataConfig = {
    title: "",
    size: "54",
    buttons: [],
    cancel: {
        move: ""
    }
};

/** @type {ChestButton} */
export const chestButtonConfig = {
    slot: 0,
    name: "",
    lore: [],
    textureId: "",
    amount: 1,
    enchant: false,
    move: "",
    commands: []
};

/** @type {Button} */
export const buttonConfig = {
    text: "",
    iconPath: "",
    move: "",
    commands: []
}

/** @type {TextField} */
export const textFieldConfig = {
    type: "TextField",
    label: "",
    placeholderText: "",
    defaultValue: ""
};

/** @type {DropDown} */
export const dropDownConfig = {
    type: "DropDown",
    label: "",
    options: [],
    defaultValue: ""
};

/** @type {Slider} */
export const sliderConfig = {
    type: "Slider",
    label: "",
    minimumValue: 0,
    maximumValue: 1,
    valueStep: 1,
    defaultValue: 0
};

/** @type {Toggle} */
export const toggleConfig = {
    type: "Toggle",
    label: "",
    defaultValue: false
};

/** @type {EventTypes} */
export const eventTypes = [
    "ChatSend",
    "EntityHitBlock",
    "EntityHitEntityHitEntity",
    "ItemUse",
    "ItemUseOn",
    "LeverAction",
    "PlayerBreakBlock",
    "PlayerDimensionChange",
    "PlayerEmote",
    "PlayerInteractWithBlock",
    "PlayerInteractWithEntity",
    "PlayerPlaceBlock",
    "PlayerSpawn",
    "PressurePlatePush",
    "TripWireTrip",
    "WeatherChange"
];

/** @type {Block} */
const block = {
    id: "",
    location: {
        x: NaN,
        y: NaN,
        z: NaN
    }
};

/** @type {Item} */
const item = {
    id: "",
    name: "",
    lore: []
};

/** @type {Entity} */
const entity = {
    id: "",
    name: ""
};

/** @type {ChatSend} */
export const chatSendConfig = {
    type: "ChatSend",
    message: "",
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {PlayerBreakBlock} */
export const playerBreakBlockConfig = {
    type: "PlayerBreakBlock",
    block: block,
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {PlayerPlaceBlock} */
export const playerPlaceBlockConfig = {
    type: "PlayerPlaceBlock",
    block: block,
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {ItemUse} */
export const itemUseConfig = {
    type: "ItemUse",
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {ItemUseOn} */
export const itemUseOnConfig = {
    type: "ItemUseOn",
    block: block,
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {PlayerInteractWithBlock} */
export const playerInteractWithBlockConfig = {
    type: "PlayerInteractWithBlock",
    block: block,
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {PlayerInteractWithEntity} */
export const playerInteractWithEntityConfig = {
    type: "PlayerInteractWithEntity",
    entity: entity,
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {WeatherChange} */
export const weatherChangeConfig = {
    type: "WeatherChange",
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {EffectAdd} */
export const effectAddConfig = {
    type: "EffectAdd",
    ids: [],
    item: item,
    dimensionId: "",
    tags: [],
    cancel: false
};

/** @type {ButtonPush} */
export const buttonPushConfig = {
    type: "ButtonPush",
    block: block,
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {EntityHitEntityDamagingEntity} */
export const entityHitEntityDamagingEntityConfig = {
    type: "EntityHitEntityDamagingEntity",
    hitEntity: entity,
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {EntityHitEntityHitEntity} */
export const entityHitEntityHitEntityConfig = {
    type: "EntityHitEntityHitEntity",
    damagingEntity: entity,
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {EntityHitBlock} */
export const entityHitBlockConfig = {
    type: "EntityHitBlock",
    block: block,
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {LeverAction} */
export const leverActionConfig = {
    type: "LeverAction",
    item: item,
    block: block,
    dimensionId: "",
    tags: []
};

/** @type {PlayerDimensionChange} */
export const playerDimensionChangeConfig = {
    type: "PlayerDimensionChange",
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {PlayerEmote} */
export const playerEmoteConfig = {
    type: "PlayerEmote",
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {PlayerSpawn} */
export const playerSpawnConfig = {
    type: "PlayerSpawn",
    initialSpawn: false,
    item: item,
    dimensionId: "",
    tags: []
};

/** @type {PressurePlatePush} */
export const pressurePlatePushConfig = {
    type: "PressurePlatePush",
    item: item,
    block: block,
    dimensionId: "",
    tags: []
};

/** @type {TripWireTrip} */
export const tripWireTripConfig = {
    type: "TripWireTrip",
    item: item,
    block: block,
    dimensionId: "",
    tags: []
};