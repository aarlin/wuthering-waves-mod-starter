"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	InputController_1 = require("../../../Input/InputController"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GuideController_1 = require("../../Guide/GuideController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ComboTeachingInputHandler_1 = require("../ComboTeachingInputHandler"),
	ComboTeachingNode_1 = require("./ComboTeachingNode"),
	SHOW_TIP_ID = "12900001",
	BEFORE_JUMP_TIME = 100;
class ComboTeachingView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.xyt = void 0),
			(this.wyt = 0),
			(this.Byt = 0),
			(this.byt = void 0),
			(this.qyt = new Map()),
			(this.Gyt = []),
			(this.Nyt = !1),
			(this.Oyt = !1),
			(this.kyt = 0),
			(this.OnPress = (e, t) => {
				this.Gyt[this.Byt]?.OnPress(e, t);
			}),
			(this.OnRelease = (e, t) => {
				this.Gyt[this.Byt]?.OnRelease(e, t);
			}),
			(this.OnHold = (e, t) => {
				this.Gyt[this.Byt]?.OnHold(e, t);
			}),
			(this.OnNodeEnd = (e, t) => {
				const n = this.GetItem(0);
				(ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !0),
					t
						? ((t = this.Gyt[this.Byt + 1]),
							e.Refresh(this.Byt + 1),
							t
								? ((this.Byt = this.Byt + 1),
									this.PlayMoveLeftTweenAnimation(),
									t.Refresh(this.Byt))
								: ((this.Byt = this.Byt + 1),
									0 < this.byt.NextRoleGuideID
										? 0 ===
											ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(
												this.byt.NextRoleGuideID,
											).KeyID.length
											? TimerSystem_1.TimerSystem.Delay(() => {
													(ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
														!0),
														EventSystem_1.EventSystem.Emit(
															EventDefine_1.EEventName.ComboTeachingCloseGuide,
														),
														UiManager_1.UiManager.IsViewOpen(
															"ComboTeachingView",
														) &&
															(this.CloseMe(),
															UiManager_1.UiManager.OpenView(
																"ComboTeachingView",
																this.byt.NextRoleGuideID,
															));
												}, 200)
											: ((ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
													!0),
												EventSystem_1.EventSystem.Emit(
													EventDefine_1.EEventName.ComboTeachingCloseGuide,
												),
												UiManager_1.UiManager.IsViewOpen("ComboTeachingView") &&
													(this.CloseMe(),
													UiManager_1.UiManager.OpenView(
														"ComboTeachingView",
														this.byt.NextRoleGuideID,
													)))
										: this.Nyt ||
											((this.Nyt = !0),
											(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
											(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0),
											(ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId = 0),
											(ModelManager_1.ModelManager.ComboTeachingModel.NextAttr =
												!1),
											(ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr =
												!1),
											this.PlayMoveLeftTweenAnimation(() => {
												n?.SetUIActive(!1);
												var e =
														ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(
															"12900001",
														),
													t =
														ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(
															"12900001",
														);
												ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
													e.TypeId,
													t,
													void 0,
													void 0,
													void 0,
													Number("12900001"),
													() => {
														EventSystem_1.EventSystem.Emit(
															EventDefine_1.EEventName.ComboTeachingFinish,
														),
															UiManager_1.UiManager.IsViewOpen(
																"ComboTeachingView",
															) && this.CloseMe(),
															(ModelManager_1.ModelManager.ComboTeachingModel.IsClose =
																!0),
															EventSystem_1.EventSystem.Emit(
																EventDefine_1.EEventName
																	.ComboTeachingCloseGuide,
															);
													},
												);
											}))))
						: (e.PlayFailAnimation(),
							this.OnRemoveEventListener(),
							(this.Oyt = !0),
							TimerSystem_1.TimerSystem.Delay(() => {
								UE.LGUIBPLibrary.AnchorOffsetXTo(n, this.kyt, 0, 0, 0),
									(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
									(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0),
									(ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId = 0),
									(ModelManager_1.ModelManager.ComboTeachingModel.NextAttr =
										!1),
									(ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr =
										!1),
									(this.Byt = 0),
									(ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !0),
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.ComboTeachingCloseGuide,
									),
									UiManager_1.UiManager.IsViewOpen("ComboTeachingView") &&
										(this.CloseMe(),
										TimerSystem_1.TimerSystem.Delay(() => {
											UiManager_1.UiManager.OpenView(
												"ComboTeachingView",
												ModelManager_1.ModelManager.ComboTeachingModel
													.RecoveryComboId,
											);
										}, 100));
							}, 1e3));
			}),
			(this.OnCharUseSkill = (e, t, n) => {
				if (!this.Nyt) {
					if (
						(e = EntitySystem_1.EntitySystem.Get(e)) &&
						e.GetComponent(0)?.GetEntityType() !==
							Protocol_1.Aki.Protocol.HBs.Proto_Player
					)
						return;
					(ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !1),
						(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = t),
						(ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr = !1),
						(ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = !1),
						this.Gyt[this.Byt]?.OnUseSkill(t);
				}
			}),
			(this.OnCharEndSkill = (e, t) => {
				((e = EntitySystem_1.EntitySystem.Get(e)) &&
					e.GetComponent(0)?.GetEntityType() !==
						Protocol_1.Aki.Protocol.HBs.Proto_Player) ||
					((ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0),
					(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0));
			}),
			(this.OnNextAttrChanged = (e, t) => {
				this.Nyt ||
					((ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = t),
					(ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId = e));
			}),
			(this.OnHit = (e) => {
				var t;
				this.Nyt ||
					((t = e.Attacker.GetComponent(33)),
					(ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId =
						t?.CurrentSkill?.SkillId ?? 0),
					this.Gyt[this.Byt]?.OnBulletHit(e));
			}),
			(this.OnOpenLoading = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		(this.Byt = 0),
			this.qyt.set("普攻", [
				"战斗状态.输入限制.禁止攻击",
				"功能.功能制作.隐藏按钮功能.隐藏普攻按键",
			]),
			this.qyt.set("技能", [
				"战斗状态.输入限制.禁止技能",
				"功能.功能制作.隐藏按钮功能.隐藏技能按键",
			]),
			this.qyt.set("大招", [
				"战斗状态.输入限制.禁止大招",
				"功能.功能制作.隐藏按钮功能.隐藏大招按键",
			]),
			this.qyt.set("跳跃", [
				"战斗状态.输入限制.禁止跳跃",
				"功能.功能制作.隐藏按钮功能.隐藏跳跃按键",
			]),
			this.qyt.set("瞄准", ["战斗状态.输入限制.禁止瞄准开镜"]),
			this.qyt.set("幻象", [
				"战斗状态.输入限制.禁止幻象1",
				"战斗状态.输入限制.禁止幻象2",
				"功能.功能制作.隐藏按钮功能.隐藏探索幻象按键",
				"功能.功能制作.隐藏按钮功能.隐藏攻击幻象按键",
			]),
			this.qyt.set("闪避", [
				"战斗状态.输入限制.禁止闪避",
				"功能.功能制作.隐藏按钮功能.隐藏冲刺按键",
			]),
			(ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !1),
			this.RefreshComboList(this.OpenParam),
			this.InitComboInputHandler();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ComboTeachingPress,
			this.OnPress,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComboTeachingRelease,
				this.OnRelease,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComboTeachingHold,
				this.OnHold,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComboTeachingNodeEnd,
				this.OnNodeEnd,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUseSkill,
				this.OnCharUseSkill,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillEnd,
				this.OnCharEndSkill,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SkillAcceptChanged,
				this.OnNextAttrChanged,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BulletHit,
				this.OnHit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStartLoadingState,
				this.OnOpenLoading,
			);
	}
	OnRemoveEventListener() {
		this.Oyt ||
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComboTeachingPress,
				this.OnPress,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComboTeachingRelease,
				this.OnRelease,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComboTeachingHold,
				this.OnHold,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComboTeachingNodeEnd,
				this.OnNodeEnd,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharUseSkill,
				this.OnCharUseSkill,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SkillAcceptChanged,
				this.OnNextAttrChanged,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BulletHit,
				this.OnHit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStartLoadingState,
				this.OnOpenLoading,
			));
	}
	OnBeforeDestroy() {
		if (
			(InputController_1.InputController.RemoveInputHandler(this.xyt),
			void 0 === Global_1.Global.BaseCharacter)
		)
			(ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0),
				(ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0);
		else {
			var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
			e = EntitySystem_1.EntitySystem.Get(e);
			const t = e?.GetComponent(185),
				n =
					(ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach(
						(e) => {
							t?.RemoveTag(
								GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
							);
						},
					),
					(ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0),
					e?.GetComponent(157));
			ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
				(e) => {
					n?.GetBuffTotalStackById(BigInt(e)) &&
						0 < n?.GetBuffTotalStackById(BigInt(e)) &&
						n?.RemoveBuff(BigInt(e), -1, "ComboTeachingView.OnBeforeDestroy");
				},
			),
				(ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0);
		}
	}
	RefreshComboList(e) {
		(this.Byt = 0),
			(this.wyt = e),
			(this.byt =
				ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(
					this.wyt,
				)),
			(e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
			(e = EntitySystem_1.EntitySystem.Get(e));
		const t = e?.GetComponent(185),
			n = e?.GetComponent(157);
		ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach((e) => {
			t?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
		}),
			(ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.length = 0),
			this.qyt.forEach((e, t) => {
				this.byt.InputEnums.includes(t) ||
					ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.push(...e);
			}),
			ModelManager_1.ModelManager.ComboTeachingModel.AddTagList.forEach((e) => {
				(e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
					t.HasTag(e) || t?.AddTag(e);
			}),
			ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
				(e) => {
					n?.GetBuffTotalStackById(BigInt(e)) &&
						0 < n?.GetBuffTotalStackById(BigInt(e)) &&
						n?.RemoveBuff(BigInt(e), -1, "ComboTeachingView.RefreshComboList");
				},
			),
			(ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.length = 0),
			this.byt.AddBuffID.forEach((e) => {
				ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.push(e);
			}),
			ModelManager_1.ModelManager.ComboTeachingModel.AddBuffList.forEach(
				(e) => {
					n?.AddBuff(e, {
						InstigatorId: n?.CreatureDataId,
						Reason: "CombatTeachingView.RefreshComboList",
					});
				},
			),
			this.byt.guideID.forEach((e, t) => {
				GuideController_1.GuideController.TryStartGuide(e);
			}),
			this.GetItem(3).SetUIActive(!0);
		for (let e = 0; e < this.byt.CommandID.length; e++)
			if (this.Gyt.length > e)
				(this.Gyt[e].CurConfig = this.byt), this.Gyt[e].Refresh(this.Byt);
			else {
				var o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(0));
				const t = new ComboTeachingNode_1.ComboTeachingNode(e, this.byt);
				t.CreateThenShowByActorAsync(o.GetOwner()).then(() => {
					t.Refresh(this.Byt);
				}),
					this.Gyt.push(t);
			}
		e = this.GetItem(3).GetWidth() + 220 * (this.Gyt.length - 1);
		var a = this.GetItem(0).GetParentAsUIItem().GetWidth();
		a < e &&
			((this.kyt = (e - a) / 2), this.GetItem(0).SetAnchorOffsetX(this.kyt)),
			this.GetItem(3).SetUIActive(!1),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				this.byt.DescriptionTitle,
			),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				this.byt.DescriptionContent,
			);
	}
	InitComboInputHandler() {
		(this.xyt = new ComboTeachingInputHandler_1.ComboTeachingInputHandler()),
			InputController_1.InputController.AddInputHandler(this.xyt);
	}
	PlayMoveLeftTweenAnimation(e) {
		var t = this.GetItem(0);
		let n = !1,
			o = 0;
		for (let e = 0; e < this.byt.KeyID.length; e++)
			if ((0 < this.byt.KeyID[e].length && o++, 1 < o)) {
				n = !0;
				break;
			}
		n
			? ((t = UE.LGUIBPLibrary.AnchorOffsetXTo(
					t,
					-100 * this.Byt + this.kyt,
					0.25,
					0,
					14,
				)),
				e && t.OnCompleteCallBack.Bind(e))
			: e &&
				TimerSystem_1.TimerSystem.Delay(() => {
					e();
				}, 1e3);
	}
	OnTick(e) {
		var t;
		0 !== ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId &&
			(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime += e),
			(ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime -= e),
			ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime < 0 &&
				(ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = 0),
			Global_1.Global.BaseCharacter &&
				((t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
				(EntitySystem_1.EntitySystem.Get(t)?.GetComponent(161)).IsJump) &&
				0 === ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime &&
				(ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = 100),
			this.Gyt[this.Byt]?.OnTick(e);
	}
}
exports.ComboTeachingView = ComboTeachingView;
