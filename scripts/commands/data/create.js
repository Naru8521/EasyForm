import { Player } from "@minecraft/server";
import MenuForm from "../../forms/Menu";
import { util } from "../../util";
import * as config from "../../config";
/// <reference path="../../types.js" />

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    /** @type {PresetConfig} */
    const newPreset = util.deepCopyObject(config.presetConfig);
    const newType = "ActionForm";
    const newData = util.deepCopyObject(config.actionFormDataConfig);

    newPreset.uuid = util.generateUUIDv4();
    newPreset.form.type = newType;
    newPreset.form.data = newData;
    await MenuForm(player, newPreset, "create");
}