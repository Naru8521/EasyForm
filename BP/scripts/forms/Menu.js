import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { util } from "../util";
import CloseForm from "./Close";
import PresetNameForm from "./PresetName";
import FormTypeForm from "./FormType";
import ActionFormMenuForm from "./ActionForm/ActionFormMenu";
import EventListForm from "./Event/EventList";
import PreviewActionForm from "./Preview/ActionForm";
import ModalFormMenuForm from "./ModalForm/ModalFormMenu";
import MessageFormMenuForm from "./MessageForm/MessageFormMenu";
import PreviewModalForm from "./Preview/ModalForm";
import PreviewMessageForm from "./Preview/MessageForm";
import ChestFormMenuForm from "./ChestForm/ChestFormMenu";
import PreviewChestForm from "./Preview/ChestForm";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 * @param {string?} err
 */
export default async function MenuForm(player, preset, showMode, err) {
    const form = new UI.ActionFormData();
    const isCreateMode = showMode === "create";

    form.title(isCreateMode ? "%ef.form.create" : "%ef.form.edit");
    form.body([
        `${err ? `§l§c${err}§f\n` : ""}§l§b%ef.form.name: §f${preset.name}`,
        `§l§b%ef.form.formType: §f${preset.form.type}`
    ].join("\n"));
    form.button("§l%ef.form.name", "textures/items/name_tag");
    form.button("§l%ef.form.showEventList", "textures/ui/multiselection");
    form.button("§l%ef.form.formType", "textures/ui/mashup_hangar");
    form.button("§l%ef.form.formEdit", "textures/items/book_writable");
    form.button("§l%ef.form.preview", "textures/ui/creative_icon");

    if (!isCreateMode) {
        form.button("§l§c%ef.form.delete", "textures/ui/icon_trash");
    }
    
    form.button(isCreateMode ? "§l§b%ef.form.create" : "§l§a%ef.form.save", "textures/ui/check");

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return await CloseForm(player, preset, showMode);
    if (selection === 0) return await PresetNameForm(player, preset, showMode);
    if (selection === 1) return await EventListForm(player, preset, showMode);
    if (selection === 2) return await FormTypeForm(player, preset, showMode);
    if (selection === 3) {
        const type = preset.form.type;

        if (type === "ActionForm") return await ActionFormMenuForm(player, preset, showMode);
        if (type === "ModalForm") return await ModalFormMenuForm(player, preset, showMode);
        if (type === "MessageForm") return await MessageFormMenuForm(player, preset, showMode);
        if (type === "ChestForm") return await ChestFormMenuForm(player, preset, showMode);
    }
    if (selection === 4) {
        const type = preset.form.type;

        if (type === "ActionForm") return await PreviewActionForm(player, preset, showMode);
        if (type === "ModalForm") return await PreviewModalForm(player, preset, showMode);
        if (type === "MessageForm") return await PreviewMessageForm(player, preset, showMode);
        if (type === "ChestForm") return await PreviewChestForm(player, preset, showMode);
    }
    if (selection === 5 && !isCreateMode) {
        world.setDynamicProperty(preset.uuid, undefined);
        player.sendMessage(`${preset.name} %ef.message.delete`);
        return;
    }
    if (selection === 5 && isCreateMode) {
        world.setDynamicProperty(preset.uuid, JSON.stringify(preset));
        player.sendMessage(`§b${preset.name} %ef.message.create`);
        return;
    }
    if (selection === 6) {
        world.setDynamicProperty(preset.uuid, JSON.stringify(preset));
        player.sendMessage(`§a${preset.name} %ef.message.save`);
        return;
    }
}