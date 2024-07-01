"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetPlayerOperation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../../Game/Global"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputController_1 = require("../../Input/InputController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	InputDefine_1 = require("../../Ui/Input/InputDefine"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPlayerOperation extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.pLe = "Set Player Operation Action"),
			(this.xRe = !1),
			(this.wRe = []),
			(this.BRe = new Map());
	}
	ExecuteNew(e, t) {
		if (e) {
			this.xRe = !1;
			var n = e;
			switch (
				((this.wRe = []),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ForceReleaseInput,
					this.pLe,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("LevelEvent", 5, "关卡事件-设置玩家操作限制", [
						"配置param:",
						n,
					]),
				LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
				InputDistributeController_1.InputDistributeController.RefreshInputTag(),
				this.bRe(),
				this.qRe(),
				(LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView =
					[]),
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
					1,
				),
				this.BRe.set(0, !0),
				n.Type)
			) {
				case IAction_1.EPlayerOperationType.EnableAll:
					return (this.xRe = !0), void this.GRe();
				case IAction_1.EPlayerOperationType.DisableAll:
					n.DisplayMode === IAction_1.EDisplayModeInPlayerOp.HideUi
						? ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
								1,
							)
						: this.qRe(),
						this.wRe.push("BlockAllInputTag"),
						InputController_1.InputController.SetMoveControlEnabled(
							!1,
							!1,
							!1,
							!1,
						),
						this.BRe.set(0, !1);
					break;
				case IAction_1.EPlayerOperationType.DisableModule:
					var i = n;
					if (
						i.UiOption &&
						i.UiOption?.Type !== IAction_1.EUiOperationType.Enable
					) {
						if (i.UiOption?.Type === IAction_1.EUiOperationType.Disable) {
							this.wRe.push("UiInputRoot.MouseInputTag"),
								this.wRe.push("UiInputRoot.Navigation");
							var o = [];
							o.push(12),
								o.push(18),
								o.push(19),
								ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
									1,
									o,
								);
						} else if (
							i.UiOption?.Type === IAction_1.EUiOperationType.EnableSectionalUi
						) {
							if (
								(this.wRe.push("UiInputRoot"),
								(o = []).push(12),
								o.push(18),
								i.UiOption.ShowEsc
									? o.push(1)
									: (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc =
											!0),
								i.UiOption.ShowMiniMap
									? o.push(4)
									: LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
											"WorldMapView",
										),
								i.UiOption.ShowQuestTrack && (o.push(5), o.push(17)),
								i.UiOption.ShowScreenEffect && o.push(23),
								i.UiOption.ShowSystem)
							)
								o.push(3), o.push(2);
							else
								for (const e of InputDefine_1.openViewActionsMap.values())
									"WorldMapView" !== e &&
										LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
											e,
										);
							(i.SceneInteractionOption &&
								i.SceneInteractionOption?.Type !==
									IAction_1.ESceneInteractionOperationType.Enable) ||
								o.push(19),
								0 < o.length &&
									ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
										1,
										o,
									);
						}
					} else
						this.wRe.push("UiInputRoot"),
							this.qRe(),
							i.SceneInteractionOption?.Type ===
								IAction_1.ESceneInteractionOperationType.Disable &&
								ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
									1,
									[19],
									!1,
								);
					i.MoveOption?.Type === IAction_1.EMoveOperationType.Disable
						? this.NRe(i.MoveOption)
						: (i.MoveOption &&
								i.MoveOption?.Type !== IAction_1.EMoveOperationType.Enable) ||
							(this.bRe(),
							this.wRe.push("FightInputRoot.FightInput.AxisInput.MoveInput")),
						i.SkillOption &&
						i.SkillOption?.Type !== IAction_1.ESkillOperationType.Enable
							? (i.SkillOption?.DisplayMode ===
								IAction_1.EDisplayModeInSkillOp.Hide
									? ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
											1,
											[9, 10],
											!1,
										)
									: i.SkillOption?.DisplayMode ===
											IAction_1.EDisplayModeInSkillOp.Ashen &&
										(ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
											1,
											[9, 10],
											!0,
										),
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
											!1,
										)),
								i.SkillOption?.Type ===
								IAction_1.ESkillOperationType.DisableSection
									? (this.wRe.push("FightInputRoot.FightInput.ActionInput"),
										this.BRe.set(
											0,
											!i.SkillOption.DisableExploreSkill
												?.PlaceTemporaryTeleport,
										))
									: i.SkillOption?.Type ===
											IAction_1.ESkillOperationType.Disable &&
										this.BRe.set(0, !1))
							: (this.wRe.push("FightInputRoot.FightInput.ActionInput"),
								ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
									1,
									[9, 10],
									!0,
								),
								ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(
									0,
									!0,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
									!0,
								)),
						(i.CameraOption &&
							i.CameraOption?.Type !== IAction_1.ECameraOperationType.Enable) ||
							this.wRe.push("FightInputRoot.FightInput.AxisInput.CameraInput"),
						(i.SceneInteractionOption &&
							i.SceneInteractionOption?.Type !==
								IAction_1.ESceneInteractionOperationType.Enable) ||
							this.wRe.push("InteractionRoot");
			}
			this.ORe(), this.GRe();
		}
	}
	GRe() {
		for (var [e, t] of this.BRe)
			ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(e, t);
	}
	ORe() {
		LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
			? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
					...this.wRe,
				),
				InputDistributeController_1.InputDistributeController.RefreshInputTag())
			: (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTags(
					this.wRe,
				),
				LevelEventLockInputState_1.LevelEventLockInputState.Lock(this.wRe));
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			this.xRe
				? EventDefine_1.EEventName.RemGuaranteeAction
				: EventDefine_1.EEventName.AddGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "UnLimitPlayerOperation" },
		);
	}
	NRe(e) {
		var t;
		e &&
			((t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity),
			e.ForbidSprint &&
				t?.Valid &&
				(t.GetComponent(185)?.AddTag(477750727), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"Test",
					30,
					"[LevelEventSetPlayerOperation.DisableMove] AddTag 禁止冲刺",
				),
			t?.Valid &&
				(e.ForceWalk
					? t.GetComponent(185)?.AddTag(-63548288)
					: e.ForceJog && t.GetComponent(185)?.AddTag(229513169)),
			InputController_1.InputController.SetMoveControlEnabled(
				e.Forward,
				e.Back,
				e.Left,
				e.Right,
			),
			this.wRe.push("FightInputRoot.FightInput.AxisInput.MoveInput"));
	}
	bRe() {
		InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0);
		var e,
			t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
		t?.Valid &&
			((t = t.GetComponent(185))?.HasTag((e = 477750727)) &&
				(t.RemoveTag(e), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"Test",
					30,
					"[LevelEventSetPlayerOperation.EnableMove] RemoveTag 禁止冲刺",
				),
			t?.HasTag((e = -63548288)) && t.RemoveTag(e),
			t?.HasTag((e = 229513169))) &&
			t.RemoveTag(e);
	}
	qRe() {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetActiveBattleViewSkill,
				!0,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
				!0,
			);
	}
}
exports.LevelEventSetPlayerOperation = LevelEventSetPlayerOperation;
