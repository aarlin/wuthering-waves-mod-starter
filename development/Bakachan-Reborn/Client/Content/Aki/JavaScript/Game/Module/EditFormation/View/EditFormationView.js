"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditFormationView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
	EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem"),
	QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
	TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	EditFormationController_1 = require("../EditFormationController"),
	EditFormationDefine_1 = require("../EditFormationDefine"),
	ExitSkillView_1 = require("./ExitSkill/ExitSkillView"),
	FormationRoleView_1 = require("./FormationRoleView");
class EditFormationView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.l4t = []),
			(this.cpt = void 0),
			(this._3t = [10, 11, 12]),
			(this._4t = 0),
			(this.u4t = 0),
			(this.c4t = -1),
			(this.m4t = !1),
			(this.d4t = void 0),
			(this.C4t = void 0),
			(this.g4t = () => {
				this.IsDestroyOrDestroying || this.f4t(this._4t);
			}),
			(this.WJe = (e, t) => {
				for (const o of this.l4t) o.GetPlayer() === e && o.RefreshPing(t);
			}),
			(this.p4t = () => {
				var e;
				this.m4t ||
					(this.v4t() &&
						((e = () => {
							(this.c4t = this._4t),
								ModelManager_1.ModelManager.GameModeModel.IsMulti ||
									ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
										this.c4t,
									),
								this.M4t();
						}),
						(ModelManager_1.ModelManager.GameModeModel.IsMulti
							? EditFormationController_1.EditFormationController.UpdateFightRoleRequest()
							: EditFormationController_1.EditFormationController.EditFormationRequest(
									this._4t,
								)
						).finally(e),
						this.S4t()));
			}),
			(this.q3t = () => {
				if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
					var e = ModelManager_1.ModelManager.EditFormationModel,
						t = new Array();
					if ((e = e.GetEditingRoleIdList(this._4t)))
						for (const o of e) t.push(o);
					(e = ModelManager_1.ModelManager.RoleModel.GetRoleList()),
						((e = new QuickRoleSelectView_1.QuickRoleSelectViewData(
							5,
							t,
							e,
						)).CanConfirm = this.E4t),
						(e.OnConfirm = this.G3t),
						(e.OnBack = this.y4t),
						(e.OnHideFinish = this.g4t),
						UiManager_1.UiManager.OpenView("QuickRoleSelectView", e),
						this.O3t(!1);
				}
			}),
			(this.E4t = (e) => {
				var t = ModelManager_1.ModelManager.EditFormationModel;
				if (this._4t !== t.GetCurrentFormationId) return !0;
				if (e.length <= 0)
					return (
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"EditBattleTeamRoleEmpty",
						),
						!1
					);
				let o = !0;
				for (const i of e)
					if (!t.IsRoleDead(i)) {
						o = !1;
						break;
					}
				return (
					!o ||
					(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"EditFormationAllDead",
					),
					!1)
				);
			}),
			(this.G3t = (e) => {
				this.O3t(!0);
				var t = ModelManager_1.ModelManager.EditFormationModel;
				for (
					let n = 0;
					n < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
					n++
				) {
					var o = n <= e.length ? e[n] : 0,
						i = n + 1;
					t.SetEditingRoleId(this._4t, i, o, !1);
				}
			}),
			(this.I4t = () => {
				var e, t, o;
				this.m4t ||
					(this._4t === this.c4t && !this.v4t()) ||
					((e = () => {
						this.M4t();
					}),
					ModelManager_1.ModelManager.GameModeModel.IsMulti
						? EditFormationController_1.EditFormationController.UpdateFightRoleRequest().finally(
								e,
							)
						: ((t =
								ModelManager_1.ModelManager.EditFormationModel
									.GetCurrentFormationId),
							(o = this._4t === t),
							EditFormationController_1.EditFormationController.EditFormationRequest(
								t,
							).finally(e),
							o &&
								ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
									this.c4t,
								)),
					this.S4t());
			}),
			(this.k3t = () => {
				if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
					var e = new ExitSkillView_1.ExitSkillViewData();
					for (const n of this.l4t) {
						var t = n.GetConfigId(),
							o = n.GetOnlineIndex(),
							i = n.GetPlayer();
						e.AddData(t, o, i);
					}
					UiManager_1.UiManager.OpenView("ExitSkillView", e);
				}
			}),
			(this.y4t = () => {
				this.O3t(!0);
			}),
			(this.S3t = (e) => {
				var t, o;
				return this.M3t(e)
					? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
					: ((e = (o =
							ModelManager_1.ModelManager
								.EditFormationModel).IsInEditingFormation(this._4t, e)),
						(t = o.GetCurrentFormationId === this._4t),
						(o = (o = o.GetEditingRoleIdList(this._4t)) && 1 === o.length),
						!(
							t &&
							e &&
							o &&
							(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"EditBattleTeamRoleEmpty",
							),
							1)
						));
			}),
			(this.Q3t = (e) => {
				this.O3t(!0);
				var t,
					o = ModelManager_1.ModelManager.EditFormationModel,
					i = o.GetEditingRolePosition(this._4t, e),
					n = this.u4t;
				o.IsInEditingFormation(this._4t, e)
					? o.GetEditingRoleId(this._4t, n)
						? i === n
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Formation", 49, "编队角色位置相同，换下", [
										"位置",
										n,
									]),
								o.SetEditingRoleId(this._4t, n))
							: ((t = o.GetEditingRoleId(this._4t, n)),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Formation", 49, "编队角色更换"),
								o.SetEditingRoleId(this._4t, n, e),
								o.SetEditingRoleId(this._4t, i, t))
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Formation", 49, "编队角色换下", ["位置", i]),
							o.SetEditingRoleId(this._4t, i))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Formation",
								49,
								"编队角色加入",
								["位置", n],
								["roleId", e],
							),
						o.SetEditingRoleId(this._4t, this.u4t, e),
						this.T4t(e));
			}),
			(this.p3t = (e) =>
				!ModelManager_1.ModelManager.EditFormationModel.IsInEditingFormation(
					this._4t,
					e,
				)),
			(this.v3t = (e) => this.M3t(e)),
			(this.j3t = (e) => {
				var t = ModelManager_1.ModelManager.EditFormationModel;
				e = t.IsInEditingFormation(this._4t, e);
				let o = !0;
				return (
					!(
						t.GetEditingRoleIdList(this._4t) &&
						!t.GetEditingRoleId(this._4t, this.u4t) &&
						e
					) && o
				);
			}),
			(this.K3t = (e) => {
				var t, o;
				if (e)
					return this.M3t(e)
						? "EditBattleTeamRevive"
						: ((o = (t =
								ModelManager_1.ModelManager
									.EditFormationModel).IsInEditingFormation(this._4t, e)),
							(e = t.GetEditingRolePosition(this._4t, e)),
							t.GetEditingRoleIdList(this._4t)
								? t.GetEditingRoleId(this._4t, this.u4t)
									? o
										? void 0 === e
											? "JoinText"
											: e === this.u4t
												? "GoDownText"
												: "ChangeText"
										: "ChangeText"
									: o
										? "ChangeText"
										: "JoinText"
								: "JoinText");
			}),
			(this.dVe = (e, t) => new EditFormationTabItem_1.EditFormationTabItem()),
			(this.yqe = (e) => {
				var t = EditFormationDefine_1.FORMATION_SPRITES[e],
					o =
						((t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								t,
							)),
						(e = e + 1),
						ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
							"TeamText",
						));
				return (
					(t = new CommonTabData_1.CommonTabData(
						t,
						new CommonTabTitleData_1.CommonTabTitleData(o, e),
					)).SetSmallIcon(
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_TeamTitle",
						),
					),
					t
				);
			}),
			(this.X3t = (e) => {
				this.m4t ||
					((e += 1),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Test", 5, "当点击编队按钮时", ["formationId", e]),
					this.f4t(e),
					(this._4t = e),
					this.rFe());
			}),
			(this.L4t = (e) => {
				this.m4t ||
					(ModelManager_1.ModelManager.EditFormationModel.IsMyPosition(e)
						? ((this.u4t = e),
							UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") ||
								UiManager_1.UiManager.OpenView(
									"TeamRoleSelectView",
									this.D4t(),
								),
							this.O3t(!1))
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"IsNotMyRole",
							));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIButtonComponent],
			[10, UE.UISpriteTransition],
			[11, UE.UISpriteTransition],
			[12, UE.UISpriteTransition],
			[13, UE.UIItem],
			[14, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.k3t],
				[6, this.p4t],
				[8, this.I4t],
				[9, this.q3t],
			]);
	}
	async OnBeforeStartAsync() {
		var e = ModelManager_1.ModelManager.EditFormationModel,
			t = e.GetCurrentFormationId;
		if (void 0 === t)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Formation", 49, "打开大世界编队界面时，当前编队为空");
		else {
			(this._4t = t),
				(this.c4t = t),
				e.InitEditingFormationMap(),
				await this.$3t();
			let i = 1;
			for (const e of [this.GetItem(3), this.GetItem(4), this.GetItem(5)]) {
				var o = new FormationRoleView_1.FormationRoleView(e, i);
				o.BindOnSelectRole(this.L4t), this.l4t.push(o), i++;
			}
			this.rFe(),
				(t = ModelManager_1.ModelManager.GameModeModel.IsMulti),
				this.GetButton(6).RootUIComp.SetUIActive(!t),
				this.GetButton(9).RootUIComp.SetUIActive(!t),
				this.GetItem(13).SetUIActive(!1),
				this.O3t(!0);
		}
	}
	OnBeforeShow() {
		var e;
		ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			((e = this._4t - 1),
			this.cpt.SelectToggleByIndex(e),
			(e =
				ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId -
				1),
			this.cpt.GetTabItemByIndex(e).ShowTeamBattleTips()),
			this.f4t(this._4t);
	}
	OnAddEventListener() {
		ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshPlayerPing,
				this.WJe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnRefreshPlayerPing,
			this.WJe,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshPlayerPing,
				this.WJe,
			);
	}
	OnBeforeDestroy() {
		for (const e of this.l4t) e.Reset();
		(this.l4t = []),
			this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			(this.m4t = !1),
			this.d4t &&
				(TimerSystem_1.TimerSystem.Has(this.d4t) &&
					TimerSystem_1.TimerSystem.Remove(this.d4t),
				(this.d4t = void 0)),
			this.C4t &&
				(TimerSystem_1.TimerSystem.Has(this.C4t) &&
					TimerSystem_1.TimerSystem.Remove(this.C4t),
				(this.C4t = void 0));
	}
	S4t() {
		this.d4t ||
			(this.GetItem(14).SetUIActive(!0),
			(this.d4t = TimerSystem_1.TimerSystem.Delay(() => {
				this.O3t(!1),
					this.GetButton(1).RootUIComp.SetUIActive(!1),
					this.GetItem(13).SetUIActive(!0);
			}, EditFormationDefine_1.DELAY_SHOW_LOADING))),
			this.C4t ||
				(this.C4t = TimerSystem_1.TimerSystem.Delay(() => {
					UiManager_1.UiManager.ResetToBattleView();
				}, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION));
	}
	async M4t() {
		(this.m4t = !0),
			await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise,
			UiManager_1.UiManager.ResetToBattleView();
	}
	D4t() {
		var e = ModelManager_1.ModelManager.EditFormationModel,
			t = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
			o = e.GetEditingRoleId(this._4t, this.u4t);
		(o = new TeamRoleSelectView_1.TeamRoleSelectViewData(
			5,
			o,
			t,
			this.Q3t,
			this.y4t,
			this.u4t,
		)).SetGetConfirmButtonEnableFunction(this.j3t),
			o.SetGetConfirmButtonTextFunction(this.K3t),
			o.SetHideFinishCallBack(this.g4t),
			o.SetConfirmCheckFunction(this.S3t),
			(o.IsNeedRevive = this.v3t),
			(o.CanJoinTeam = this.p3t),
			(t = e.GetEditingRoleIdList(this._4t));
		return (o.FormationRoleList = t), o;
	}
	T4t(e) {
		(e =
			ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(
				e,
			)?.JoinTeamEvent),
			e &&
				(AudioSystem_1.AudioSystem.PostEvent(e), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Audio", 57, "[Game.EditFormationView] PostEvent", [
					"Event",
					e,
				]);
	}
	O3t(e) {
		var t = this.GetButton(8)
			.GetOwner()
			.GetComponentByClass(UE.UIItem.StaticClass());
		t && t.SetUIActive(e);
	}
	async $3t() {
		var e = this.GetItem(0),
			t = new CommonTabComponentData_1.CommonTabComponentData(
				this.dVe,
				this.X3t,
				this.yqe,
			);
		(this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(e, t)),
			ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				(this.cpt.SetCanChange(
					() =>
						this._4t !==
							ModelManager_1.ModelManager.EditFormationModel
								.GetCurrentFormationId || this.v4t(),
				),
				await this.cpt.RefreshTabItemAsync(
					EditFormationDefine_1.MAX_FORMATION_ID - 1,
				));
	}
	rFe() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			var e =
				this._4t !==
				ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId;
			let t;
			this.GetButton(6).SetSelfInteractive(e),
				(t = e ? "EditBattleTeamFight" : "EditBattleTeamFighting"),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), t);
		}
	}
	f4t(e) {
		var t = ModelManager_1.ModelManager.EditFormationModel,
			o = this.GetButton(1).RootUIComp;
		if (t.GetEditingRoleIdList(e).length <= 0) {
			for (const e of this.l4t) e.ResetRole();
			o.SetUIActive(!1);
		} else {
			o.SetUIActive(!0);
			var i,
				n,
				a,
				r =
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
			for (let o = 1; o <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; o++) {
				let l = 0,
					s = 0,
					d = "",
					M = 0,
					m = 0;
				t.IsMyPosition(o)
					? ((n = ModelManager_1.ModelManager.RoleModel),
						(l = t.GetEditingRoleId(e, o)),
						(i = n.GetRoleInstanceById(l))
							? ((s = (i = i.GetLevelData()).GetLevel()),
								(m = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
								ModelManager_1.ModelManager.GameModeModel.IsMulti
									? ((d =
											ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ??
											""),
										(M =
											ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
												m,
											)?.PlayerNumber ?? 1))
									: (d = n.GetRoleName(l)),
								this.e4t(o, l, s, d, M, m))
							: this.e4t(o))
					: (i = t.GetCurrentFormationData?.GetRoleDataByPosition(o))
						? ((m = i.PlayerId),
							(n =
								ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
									m,
								)),
							r && !n
								? this.e4t(o)
								: ((l = i.ConfigId),
									(a =
										ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
											m,
										)),
									(s = i.Level),
									(d = a?.Name ?? ""),
									(M =
										ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
											m,
										)?.PlayerNumber ?? 1),
									this.e4t(o, l, s, d, M, m)))
						: this.e4t(o);
			}
		}
	}
	e4t(e, t = 0, o = 0, i = "", n = 0, a = 0) {
		e -= 1;
		var r = this.l4t[e];
		const l = this.GetUiSpriteTransition(this._3t[e]);
		let s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			"SP_TeamRoleSkillNone",
		);
		if (t) {
			if (
				(r.Refresh(t, o, i, n, a),
				(e =
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.SkillId),
				e)
			)
				for (const t of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
					e,
				))
					if (t.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
						s = t.Icon;
						break;
					}
		} else r.ResetRole();
		ResourceSystem_1.ResourceSystem.LoadAsync(
			s,
			UE.LGUISpriteData_BaseObject,
			(e, t) => {
				l.SetAllTransitionSprite(e);
			},
			102,
		);
	}
	v4t() {
		var e = ModelManager_1.ModelManager.EditFormationModel,
			t = e.GetEditingRoleIdList(this._4t);
		if (0 === t.length)
			return (
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"EditBattleTeamNoRole",
				),
				!1
			);
		let o = !0;
		for (const i of t)
			if (!e.IsRoleDead(i)) {
				o = !1;
				break;
			}
		return (
			!o ||
			(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"EditFormationAllDead",
			),
			!1)
		);
	}
	M3t(e) {
		var t, o;
		return !(
			!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			((o = (t =
				ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(
				this._4t,
				e,
			)),
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
				e,
			)?.IsTrialRole()) ||
			o ||
			!t.IsRoleDead(e)
		);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = Number(e[0]);
		if (0 !== t && ((t = this.l4t[t - 1]?.GetRootItem()), t)) return [t, t];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
}
exports.EditFormationView = EditFormationView;
