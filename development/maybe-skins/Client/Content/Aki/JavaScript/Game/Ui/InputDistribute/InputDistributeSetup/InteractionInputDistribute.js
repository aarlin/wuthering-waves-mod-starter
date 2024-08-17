"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
	UiLayerType_1 = require("../../Define/UiLayerType"),
	InputManager_1 = require("../../Input/InputManager"),
	UiLayer_1 = require("../../UiLayer"),
	UiManager_1 = require("../../UiManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class InteractionInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		if (
			ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning ||
			TsInteractionUtils_1.TsInteractionUtils.IsInteractWaitOpenViewName
		)
			InputManager_1.InputManager.IsShowMouseCursor() &&
			ModelManager_1.ModelManager.PlatformModel.IsPc()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态，并且在Pc平台",
							[
								"IsInteractionTurning",
								ModelManager_1.ModelManager.InteractionModel
									.IsInteractionTurning,
							],
							[
								"IsInteractWaitOpenViewName",
								TsInteractionUtils_1.TsInteractionUtils
									.IsInteractWaitOpenViewName,
							],
						),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.MouseInputTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.NavigationTag,
						InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag,
					]))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态，并且不是Pc平台",
							[
								"IsInteractionTurning",
								ModelManager_1.ModelManager.InteractionModel
									.IsInteractionTurning,
							],
							[
								"IsInteractWaitOpenViewName",
								TsInteractionUtils_1.TsInteractionUtils
									.IsInteractWaitOpenViewName,
							],
						),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.NavigationTag,
						InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag,
					]));
		else if (
			void 0 !==
			ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
		)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					37,
					"[InputDistribute]刷新交互列表输入Tag时,处于交互锁定状态",
				),
				this.SetInputDistributeTags([
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.MouseInputTag,
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.NavigationTag,
					InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag,
				]);
		else {
			var t =
				ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
			t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(178);
			if (t && !t.GetClientCanInteraction())
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Input",
						8,
						"[InputDistribute]刷新交互列表输入Tag时,当前交互实体在执行交互,禁用热键",
					),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.MouseInputTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.NavigationTag,
						InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag,
					]);
			else {
				if (
					!UiManager_1.UiManager.IsViewOpen("InteractionHintView") &&
					!ModelManager_1.ModelManager.BattleUiModel.ExistBattleInteract()
				)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新交互列表输入Tag时,没有打开交互界面,也不存在战斗交互",
							),
						!1
					);
				if (TsInteractionUtils_1.TsInteractionUtils.IsInteractionOpenView())
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新交互列表输入Tag时,当前通过交互打开了界面",
								[
									"viewName",
									TsInteractionUtils_1.TsInteractionUtils.GetCurrentOpenViewName(),
								],
							),
						!1
					);
				if (
					!(t = UiLayer_1.UiLayer.GetLayerRootUiItem(
						UiLayerType_1.ELayerType.HUD,
					)) ||
					!t.bIsUIActive
				)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新交互列表输入Tag时,Hud层没有显示",
							),
						!1
					);
				InputManager_1.InputManager.IsShowMouseCursor()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态",
							),
						this.SetInputDistributeTags([
							InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
								.AxisInput.MoveInputTag,
							InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
								.AxisInput.CameraInput.CameraRotationTag,
							InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
								.ShortcutKeyTag,
							InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
								.MouseInputTag,
							InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
								.NavigationTag,
							InputDistributeDefine_1.inputDistributeTagDefine
								.InteractionRootTag,
						]))
					: (t = ModelManager_1.ModelManager.PlatformModel).IsGamepad() ||
							t.IsMobile()
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Input",
									8,
									"[InputDistribute]刷新交互列表输入Tag时,鼠标处于隐藏状态并且在用手柄或手机输入",
								),
							this.SetInputDistributeTags([
								InputDistributeDefine_1.inputDistributeTagDefine
									.FightInputRootTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.ShortcutKeyTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.MouseInputTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.NavigationTag,
								InputDistributeDefine_1.inputDistributeTagDefine
									.InteractionRootTag,
							]))
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Input",
									8,
									"[InputDistribute]刷新交互列表输入Tag时,鼠标处于隐藏状态",
								),
							this.SetInputDistributeTags([
								InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
									.ActionInputTag,
								InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
									.AxisInput.MoveInputTag,
								InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
									.AxisInput.CameraInput.CameraRotationTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.ShortcutKeyTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.MouseInputTag,
								InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
									.NavigationTag,
								InputDistributeDefine_1.inputDistributeTagDefine
									.InteractionRootTag,
							]));
			}
		}
		return !0;
	}
}
exports.InteractionInputDistribute = InteractionInputDistribute;
