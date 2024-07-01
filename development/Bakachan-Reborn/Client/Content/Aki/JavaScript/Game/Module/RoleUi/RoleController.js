"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputManager_1 = require("../../Ui/Input/InputManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	UiRoleUtils_1 = require("../UiComponent/UiRoleUtils"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../UiModel/UiModelUtil"),
	RoleLevelUpSuccessController_1 = require("./RoleLevel/RoleLevelUpSuccessController");
class RoleController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			InputManager_1.InputManager.RegisterOpenViewFunc(
				"RoleRootView",
				RoleController.Wlo,
			),
			!0
		);
	}
	static OpenRoleMainView(e, o = 0, l = [], t = void 0, r) {
		(e = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(e)).Init(
			l,
			o,
			t,
		),
			UiManager_1.UiManager.OpenView("RoleRootView", e, r);
	}
	static CloseAndOpenRoleMainView(e, o, l = 0, t = [], r = void 0, n) {
		(o = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(o)).Init(
			t,
			l,
			r,
		),
			UiManager_1.UiManager.CloseAndOpenView(e, "RoleRootView", o, n);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"RoleRootView",
			RoleController.CanOpenView,
			"RoleController.CanOpenView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"RoleRootView",
			RoleController.CanOpenView,
		);
	}
	static CheckCharacterInBattleTag() {
		var e = Global_1.Global.BaseCharacter;
		return (
			!!e &&
			e.CharacterActorComponent.Entity.CheckGetComponent(185).HasTag(1996802261)
		);
	}
	static CheckCharacterInBattleTagAndShowTips() {
		return (
			!!RoleController.CheckCharacterInBattleTag() &&
			(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"ForbiddenActionInFight",
			),
			!0)
		);
	}
	static OnSelectedRoleChange(e) {
		this.RefreshUiSceneRoleActor(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSelectedRoleChanged,
			);
	}
	static RefreshUiSceneRoleActor(e, o = void 0) {
		const l = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		l.Model?.CheckGetComponent(11)?.RoleDataId !== e &&
			(l.Model?.CheckGetComponent(12)?.LoadModelByRoleDataId(e, !0, () => {
				o?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(l);
			}),
			UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(l, !0));
	}
	static OnSelectedRoleChangeByConfig(e) {
		this.RefreshUiSceneRoleActorByConfigId(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSelectedRoleChanged,
			);
	}
	static RefreshUiSceneRoleActorByConfigId(e, o = void 0) {
		const l = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		l.Model?.CheckGetComponent(11)?.RoleDataId !== e &&
			(l.Model?.CheckGetComponent(12)?.LoadModelByRoleConfigId(e, !0, () => {
				o?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(l);
			}),
			UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(l, !0));
	}
	static ShowUiSceneActorAndShadow(e) {
		var o = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model;
		(o =
			(o && UiModelUtil_1.UiModelUtil.SetVisible(o, !0),
			UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"),
				1,
			))) && o.SetActorHiddenInGame(!e);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RedDotStart,
			RoleController.Klo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				RoleController.POt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LeaveInstanceDungeon,
				RoleController.Qlo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TextLanguageChange,
				RoleController.jJe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RedDotStart,
			RoleController.Klo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				RoleController.POt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LeaveInstanceDungeon,
				RoleController.Qlo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TextLanguageChange,
				RoleController.jJe,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(17656, (e) => {
			ModelManager_1.ModelManager.RoleModel.UpdateRoleInfoByServerData(e.h8n);
		}),
			Net_1.Net.Register(18173, (e) => {
				ModelManager_1.ModelManager.RoleModel.RoleAttrUpdate(
					e.l3n,
					e.hDs,
					e.lDs,
				);
			}),
			Net_1.Net.Register(18460, (e) => {
				var o = e.tRs.l3n;
				ModelManager_1.ModelManager.RoleModel.UpdateRoleInfo(e.tRs),
					ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
						o,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RoleSelectionListUpdate,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActiveRole,
						o,
					);
			}),
			Net_1.Net.Register(15377, (e) => {
				ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.l3n, e.k3n, e.r3n);
			}),
			Net_1.Net.Register(5858, (e) => {
				void 0 !== e &&
					ModelManager_1.ModelManager.RoleModel.RoleResonanceLockFinish(e);
			}),
			Net_1.Net.Register(4111, (e) => {
				void 0 !== e &&
					ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.l3n, e.PDs);
			}),
			Net_1.Net.Register(15113, (e) => {
				e && ModelManager_1.ModelManager.RoleModel.RoleNameUpdate(e.l3n, e.e4n);
			}),
			Net_1.Net.Register(22693, (e) => {
				if (
					!ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
					!ModelManager_1.ModelManager.PlotModel.InSeamlessFormation
				) {
					ModelManager_1.ModelManager.GameModeModel.WorldDone &&
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"TrialRoleAdd",
						);
					for (const o of e.xkn)
						ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.add(o);
					0 < ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size &&
						((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !0),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info("Role", 11, "进入角色试用状态");
				}
			}),
			Net_1.Net.Register(17690, (e) => {
				if (
					ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
					!ModelManager_1.ModelManager.PlotModel.InSeamlessFormation
				) {
					ModelManager_1.ModelManager.GameModeModel.WorldDone &&
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"TrialRoleDetach",
						);
					for (const o of e.xkn)
						ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.delete(o);
					ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size <= 0 &&
						((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info("Role", 11, "角色试用状态结束");
				}
			}),
			Net_1.Net.Register(13690, (e) => {
				e &&
					ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillNodeData(
						e.l3n,
						e.FDs,
					);
			}),
			Net_1.Net.Register(15733, (e) => {
				if (e) {
					var o = new Map(),
						l = e.LLs;
					for (const e of Object.keys(l)) {
						var t = Number(e);
						o.set(t, l[t]);
					}
					ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o),
						ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.TLs);
				}
			}),
			Net_1.Net.Register(16138, (e) => {
				e &&
					ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorDataSingle(
						e.RLs,
					);
			}),
			Net_1.Net.Register(6558, (e) => {
				e &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAddFavorItem,
						[{ IncId: 0, ItemId: e.G3n }, e.I5n],
					);
			}),
			Net_1.Net.Register(6900, (e) => {
				if (e) {
					var o = new Map(),
						l = e.LLs;
					for (const e of Object.keys(l)) {
						var t = Number(e);
						o.set(t, l[t]);
					}
					ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o);
				}
			}),
			Net_1.Net.Register(15409, (e) => {
				e &&
					ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorNewCanUnLockId(
						e,
					);
			}),
			Net_1.Net.Register(4827, (e) => {
				e &&
					ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorLevelAndExp(e);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(17656),
			Net_1.Net.UnRegister(18173),
			Net_1.Net.UnRegister(18460),
			Net_1.Net.UnRegister(15377),
			Net_1.Net.UnRegister(5858),
			Net_1.Net.UnRegister(4111),
			Net_1.Net.UnRegister(15113),
			Net_1.Net.UnRegister(22693),
			Net_1.Net.UnRegister(17690),
			Net_1.Net.UnRegister(13690),
			Net_1.Net.UnRegister(15733),
			Net_1.Net.UnRegister(16138),
			Net_1.Net.UnRegister(6558),
			Net_1.Net.UnRegister(15409),
			Net_1.Net.UnRegister(4827);
	}
	static IsInRoleTrial() {
		return ModelManager_1.ModelManager.RoleModel.IsInRoleTrial;
	}
	static SendPbUpLevelRoleRequest(e, o, l) {
		var t;
		!o ||
			o.length <= 0 ||
			(((t = Protocol_1.Aki.Protocol.Was.create()).l3n = e),
			(t.Y5n = o),
			Net_1.Net.Call(15278, t, (e) => {
				e &&
					(e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.RoleModel.RoleLevelUpReceiveItem(
								e.Vms,
							),
							ModelManager_1.ModelManager.RoleModel.RoleLevelUp(
								e.l3n,
								e.k3n,
								e.r3n,
							),
							ModelManager_1.ModelManager.RoleModel.RoleLevelResponseData.ClearItemList(),
							l())
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								28300,
							));
			}));
	}
	static SendPbOverRoleRequest(e) {
		var o = Protocol_1.Aki.Protocol.Qas.create();
		(o.l3n = e),
			Net_1.Net.Call(18268, o, (e) => {
				e &&
					(e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.RoleModel.RoleBreakUp(e.l3n, e.ADs)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								16722,
							));
			});
	}
	static SendPbUpLevelSkillRequest(e, o) {
		if (
			!RoleController.CheckCharacterInBattleTagAndShowTips() &&
			!(l =
				ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					e,
				)).IsTrialRole()
		) {
			var l,
				t =
					(((l = Protocol_1.Aki.Protocol.Yas.create()).l3n = e),
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
			l.vkn = t.SkillId;
			const r = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
				e,
				o,
			);
			Net_1.Net.Call(1148, l, (e) => {
				e &&
					(e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (this.ShowSkillTreeLevelUpSuccessView(o, r),
							ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(
								e.l3n,
								e.PDs,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.SkillTreeNodeLevelUp,
								o,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								22380,
							));
			});
		}
	}
	static SendRoleLevelUpViewRequest(e, o, l = void 0) {
		var t = Protocol_1.Aki.Protocol.lhs.create();
		(t.l3n = e),
			(t.Y5n = o),
			(t.Q8n = l),
			Net_1.Net.Call(18825, t, (e) => {
				e &&
					(e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
								e,
							)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								25227,
							));
			});
	}
	static SendRoleLevelUpViewRequestWithOpenView(e, o = void 0) {
		var l = Protocol_1.Aki.Protocol.lhs.create();
		(l.l3n = e),
			Net_1.Net.Call(18825, l, (l) => {
				l &&
					(l.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
								l,
							),
							o
								? (UiManager_1.UiManager.CloseView("RoleLevelUpView"),
									UiManager_1.UiManager.CloseView("RoleBreachView"),
									UiManager_1.UiManager.CloseView(o))
								: UiManager_1.UiManager.OpenView("RoleLevelUpView", e))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								l.Kms,
								25227,
							));
			});
	}
	static SendRoleBreakThroughViewRequest(e, o = 0) {
		var l = Protocol_1.Aki.Protocol.uhs.create();
		(l.l3n = e),
			Net_1.Net.Call(8794, l, (o) => {
				o &&
					(o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.RoleModel.UpdateRoleBreachViewResponseData(
								o,
							),
							UiManager_1.UiManager.OpenView("RoleBreachView", e))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								27917,
							));
			});
	}
	static SendRoleSkillLevelUpViewRequest(e, o) {
		var l = Protocol_1.Aki.Protocol.dhs.create();
		(l.l3n = e),
			(e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
		(l.vkn = e.SkillId),
			Net_1.Net.Call(10645, l, (e) => {
				e &&
					e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.Kms,
						9390,
					);
			});
	}
	static SendResonanceUnlockRequest(e) {
		if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
			const l = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
			var o;
			l.IsTrialRole() ||
				(((o = Protocol_1.Aki.Protocol.yhs.create()).l3n = e),
				Net_1.Net.Call(7816, o, (e) => {
					var o, t;
					e &&
						(e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
							? (l.GetResonanceData().SetResonantChainGroupIndex(e.VDs),
								(o = e.VDs - 1),
								(t = {
									Title: "Text_ResonanceUnlockSuccess_Text",
									TextList: [
										{
											TextId: (t =
												ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(
													l,
												))[o].AttributesDescription,
											Params: t[o].AttributesDescriptionParams,
										},
									],
								}),
								RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
									t,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
								))
							: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.X5n,
									28183,
								));
				}));
		}
	}
	static SendRoleSkillViewRequest(e, o, l) {
		ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) ||
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		var t = ModelManager_1.ModelManager.RoleModel.GetCurRoleSkillViewDataLocal(
			e,
			o,
		);
		e = ModelManager_1.ModelManager.RoleModel.GetNextRoleSkillViewDataLocal(
			e,
			o,
		);
		ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillViewData(t, e, o),
			l?.();
	}
	static OpenTeamRoleSelectView(e) {
		UiManager_1.UiManager.OpenView("TeamRoleSelectView", e);
	}
	static PlayRoleMontage(e, o = !1, l = !1, t = !1) {
		UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
			?.Model?.CheckGetComponent(13)
			?.SetState(e, o, l, t);
	}
	static SendRoleActivateSkillRequest(e, o) {
		var l;
		RoleController.CheckCharacterInBattleTagAndShowTips() ||
			ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				e,
			).IsTrialRole() ||
			(((l = Protocol_1.Aki.Protocol.Mhs.create()).l3n = e),
			(l.$8n = o),
			Net_1.Net.Call(16311, l, (e) => {
				e &&
					(e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (this.ShowSkillTreeLevelUpSuccessView(o, 0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.SkillTreeNodeActive,
								o,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								26701,
							));
			}));
	}
	static SendRoleFavorListRequest() {
		var e = Protocol_1.Aki.Protocol.PJn.create();
		Net_1.Net.Call(22638, e, (e) => {
			e &&
				(e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
					? ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.TLs)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.X5n,
							7183,
						));
		});
	}
	static SendRoleFavorUnLockRequest(e, o, l) {
		var t = Protocol_1.Aki.Protocol.OJn.create();
		(t.t6n = e),
			(t.l3n = o),
			(t.Z6n = l),
			Net_1.Net.Call(23207, t, (e) => {
				var l;
				e &&
					((l = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						e.l3n,
					).GetFavorData()),
					e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
						? l.UpdateUnlockId(e.t6n, o, e.Z6n)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.X5n,
								29942,
							));
			});
	}
	static SendRoleActiveRequest(e) {
		var o = Protocol_1.Aki.Protocol.Vas.create();
		(o.l3n = e),
			Net_1.Net.Call(22652, o, (o) => {
				o &&
					(o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RoleHandBookActive,
								e,
							)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								1076,
							));
			});
	}
	static CheckRoleTargetLevel(e) {
		var o = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
		if (o) {
			var l = o.length;
			for (let r = 0; r < l; r++) {
				var t = o[r].GetLevelData();
				if (t && t.GetLevel() > e) return !0;
			}
		}
		return !1;
	}
	static CheckRoleSkillTargetLevel(e) {
		var o = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
		if (o) {
			var l = o.length;
			for (let a = 0; a < l; a++) {
				var t = o[a].GetSkillData();
				if (t) {
					var r = t.GetAllSkillLevel(),
						n = r.length;
					for (let o = 0; o < n; o++) if (e <= r[o]) return !0;
				}
			}
		}
		return !1;
	}
	static ShowSkillTreeLevelUpSuccessView(e, o) {
		switch (
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeType
		) {
			case 4:
				this.ShowAttributeNodeLevelUpSuccessView(e);
				break;
			case 3:
				this.ShowOuterSkillNodeLevelUpSuccessView(e);
				break;
			case 1:
			case 2:
				this.ShowInnerSkillNodeLevelUpSuccessView(e, o);
		}
	}
	static ShowAttributeNodeLevelUpSuccessView(e) {
		(e = {
			Title: "Text_ResonanceUnlockSuccess_Text",
			TextList: [
				{
					TextId: (e =
						ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e))
						.PropertyNodeDescribe,
					Params: e.PropertyNodeParam,
				},
			],
		}),
			RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
				e,
			);
	}
	static ShowOuterSkillNodeLevelUpSuccessView(e) {
		(e =
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
				e,
			).SkillId),
			(e = {
				Title: "Text_ResonanceUnlockSuccess_Text",
				TextList: [
					{
						TextId: (e =
							ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
								e,
							)).SkillDescribe,
						Params: e.SkillDetailNum,
					},
				],
			}),
			RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
				e,
			);
	}
	static ShowInnerSkillNodeLevelUpSuccessView(e, o) {
		var l = [],
			t =
				ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()
					?.EffectDescList,
			r =
				ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()
					?.EffectDescList;
		for (let e = 0; e < t.length; e++) {
			var n = t[e],
				a = r[e],
				i =
					ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(
						n,
					);
			(n =
				ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
					n,
				)) !==
				(a =
					ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
						a,
					)) && l.push({ Name: i, ShowArrow: !0, PreText: n, CurText: a });
		}
		e =
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).SkillId;
		var d = o + 1;
		o = {
			LevelInfo: {
				PreUpgradeLv: o,
				UpgradeLv: d,
				FormatStringId: "Text_LevelShow_Text",
				IsMaxLevel:
					d ===
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e)
						.MaxSkillLevel,
			},
			WiderScrollView: !0,
			AttributeInfo: l,
		};
		RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
			o,
		);
	}
	static async RobotRolePropRequest(e) {
		var o = Protocol_1.Aki.Protocol.Pms.create();
		if ((e = ((o.xkn = e), await Net_1.Net.CallAsync(13392, o))))
			if (e.K0s === Protocol_1.Aki.Protocol.lkn.Sys)
				for (const o of e.DDs) {
					var l = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
						o.l3n,
					).GetAttributeData();
					for (const e of o.hDs) l.SetRoleBaseAttr(e.Ckn, e.gkn);
					for (const e of o.lDs) l.SetRoleAddAttr(e.Ckn, e.gkn);
					o.EDs &&
						ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
							o.EDs,
						);
				}
			else
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.K0s,
					15361,
				);
	}
}
((exports.RoleController = RoleController).Wlo = () => {
	RoleController.OpenRoleMainView(0);
}),
	(RoleController.CanOpenView = (e) =>
		!!ModelManager_1.ModelManager.FunctionModel.IsOpen(10001) &&
		(ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
			? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"PhantomFormationEnterRoleTip",
				),
				!1)
			: !ModelManager_1.ModelManager.DeadReviveModel.AllDead)),
	(RoleController.POt = () => {
		RoleController.SendRoleFavorListRequest();
	}),
	(RoleController.Klo = () => {
		for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotCreateRole,
				e,
			);
	}),
	(RoleController.Qlo = () => {
		ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Role", 11, "切换地图,重置进入试用角色状态"),
			(ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1));
	}),
	(RoleController.jJe = () => {
		var e,
			o,
			l,
			t = ModelManager_1.ModelManager.RoleModel.GetRoleMap(),
			r = ModelManager_1.ModelManager.RoleModel.GetRoleRobotMap();
		for ([, e] of t)
			ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(e.GetRoleId()) ||
				((o = e.GetRoleConfig()),
				(o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name)),
				e.SetRoleName(o));
		for ([, l] of r) {
			var n = l.GetRoleConfig();
			n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(n.Name);
			l.SetName(n);
		}
	});
