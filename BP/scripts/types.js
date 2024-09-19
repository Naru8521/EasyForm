/// <reference path="./eventTypes.js" />

/**
 * @typedef {"create" | "edit"} ShowMode
 */

/**
 * @typedef {("ActionForm" | "ModalForm" | "MessageForm" | "ChestForm")[]} FormTypes
 */

/**
 * @typedef {"ActionForm" | "ModalForm" | "MessageForm" | "ChestForm"} FormType
 */

/**
 * @typedef {"TextField" | "DropDown" | "Slider" | "Toggle"} ComponentType
 */

/**
 * @typedef {("TextField" | "DropDown" | "Slider" | "Toggle")[]} ComponentTypes
 */

/**
 * @typedef {TextField | DropDown | Slider | Toggle} Component
 */

/**
 * @typedef {"5" | "9" | "18" | "27" | "36" | "45" | "54"} ChestSize
 */

/**
 * @typedef {("5" | "9" | "18" | "27" | "36" | "45" | "54")[]} ChestSizes
 */

/**
 * @typedef {Object} CommandConfig
 * @property {string} prefix - チャット実行時の最初に付ける文字
 * @property {string} id - scriptEventコマンド実行時の識別ID
 * @property {string[]} tags - 実行権限のタグリスト
 */

/**
 * @typedef {Object} PresetConfig
 * @property {string} uuid
 * @property {string} name
 * @property {ShowEvent[]} showEvents
 * @property {Form} form
 */

/**
 * @typedef {Object} Form
 * @property {FormType} type
 * @property {ActionFormData | ModalFormData | MessageFormData | ChestFormDataConfig} data
 */

/**
 * @typedef {Object} ActionFormData
 * @property {string} title
 * @property {string} body
 * @property {Button[]} buttons
 * @property {Cancel} cancel
 */

/**
 * @typedef {Object} ModalFormData
 * @property {string} title
 * @property {(TextField | DropDown | Slider | Toggle)[]} components
 * @property {SubmitButton} submitButton
 * @property {Cancel} cancel
 */

/**
 * @typedef {Object} MessageFormData
 * @property {string} title
 * @property {string} body
 * @property {(Button1 | Button2)[]} buttons
 * @property {Cancel} cancel
 */

/**
 * @typedef {Object} ChestFormDataConfig
 * @property {string} title
 * @property {ChestSize} size
 * @property {ChestButton[]} buttons
 * @property {Cancel} cancel 
 */

/**
 * @typedef {Object} ChestButton
 * @property {number} slot
 * @property {string} name 
 * @property {string[]} lore
 * @property {string} textureId
 * @property {number} amount
 * @property {boolean} enchant
 * @property {string} move
 * @property {string[]} commands
 */

/**
 * @typedef {Object} Button1 
 * @property {string} text
 * @property {string} move
 * @property {string[]} commands
 */

/**
 * @typedef {Object} Button2 
 * @property {string} text
 * @property {string} move
 * @property {string[]} commands
 */

/**
 * @typedef {Object} Button
 * @property {string} text
 * @property {string} iconPath
 * @property {string} move
 * @property {string[]} commands
 */

/**
 * @typedef {Object} TextField
 * @property {"TextField"} type
 * @property {string} label
 * @property {string} placeholderText
 * @property {string} defaultValue
 */

/**
 * @typedef {Object} DropDown
 * @property {"DropDown"} type
 * @property {string} label
 * @property {string[]} options
 * @property {string} defaultValue
 */

/**
 * @typedef {Object} Slider
 * @property {"Slider"} type
 * @property {string} label
 * @property {number} minimumValue
 * @property {number} maximumValue
 * @property {number} valueStep
 * @property {number} defaultValue
 */

/**
 * @typedef {Object} Toggle
 * @property {"Toggle"} type
 * @property {string} label
 * @property {boolean} defaultValue
 */

/**
 * @typedef {Object} SubmitButton
 * @property {string} text
 * @property {string} move
 * @property {string} commands
 */

/**
 * @typedef {Object} Cancel
 * @property {string} move
 */