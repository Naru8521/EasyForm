import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
import FormTitleForm from "../FormTitle";
import CancelForm from "../Cancel";
import SubmitButtonMenuForm from "./SubmitButtonMenu";
import ComponentListForm from "./Component/ComponentList";
/// <reference path="../../types.js" />

/**
 * @param {Player} player 
 * @param {PresetConfig} preset 
 * @param {ShowMode} showMode 
 */
export default async function ModalFormMenuForm(player, preset, showMode) {
    const form = new UI.ActionFormData();

    form.title("%ef.form.formEdit");
    form.button("§l%ef.form.formTitle", "textures/items/name_tag");
    form.button("§l%ef.form.componentList", "textures/ui/multiselection");
    form.button("§l%ef.form.submitButton", "textures/ui/chat_send");
    form.button("§l%ef.form.cancelButton", "textures/ui/realms_red_x");
    form.button("§l§c%ef.form.return", "textures/ui/undoArrow");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset, showMode);
    if (selection === 0) return await FormTitleForm(player, preset, showMode, ModalFormMenuForm);
    if (selection === 1) return await ComponentListForm(player, preset, showMode);
    if (selection === 2) return await SubmitButtonMenuForm(player, preset, showMode);
    if (selection === 3) return await CancelForm(player, preset, show, ModalFormMenuForm);
    if (selection === 4) return await MenuForm(player, preset, showMode);
}