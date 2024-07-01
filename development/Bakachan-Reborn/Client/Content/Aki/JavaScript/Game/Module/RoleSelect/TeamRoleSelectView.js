"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamRoleSelectView = exports.TeamRoleSelectViewData = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiPopViewData_1 = require("../../Ui/Define/UiPopViewData"),
	UiManager_1 = require("../../Ui/UiManager"),
	FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
	TeamPlayerSelectionComponent_1 = require("../Common/TeamPlayerSelectionComponent"),
	EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
	RoleController_1 = require("../RoleUi/RoleController"),
	RoleDefine_1 = require("../RoleUi/RoleDefine"),
	RoleTagMediumIconItem_1 = require("../RoleUi/RoleTag/RoleTagMediumIconItem"),
	SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
	TeamRoleGrid_1 = require("./TeamRoleGrid"),
	TeamRoleSkillItem_1 = require("./TeamRoleSkillItem"),
	displaySkillTypes = [11, 2, 3, 6];
class TeamRoleSelectViewData extends UiPopViewData_1.UiPopViewData {
	constructor(e, t, i, o, l, a) {
		super(),
			(this.UseWay = void 0),
			(this.CurrentRoleId = 0),
			(this.RoleList = void 0),
			(this.EditBattleRoleSlotDataList = void 0),
			(this.Position = 0),
			(this.FormationRoleList = void 0),
			(this.ConfirmCallBack = void 0),
			(this.OnHideFinishCallBack = void 0),
			(this.BackCallBack = void 0),
			(this.GetConfirmButtonTextCallBack = void 0),
			(this.GetConfirmButtonEnableCallBack = void 0),
			(this.IsNeedRevive = void 0),
			(this.CanConfirmFunc = void 0),
			(this.CanJoinTeam = void 0),
			(this.UseWay = e),
			(this.CurrentRoleId = t),
			(this.RoleList = i),
			(this.BackCallBack = l),
			(this.ConfirmCallBack = o),
			(this.Position = a);
	}
	SetHideFinishCallBack(e) {
		this.OnHideFinishCallBack = e;
	}
	SetGetConfirmButtonTextFunction(e) {
		this.GetConfirmButtonTextCallBack = e;
	}
	SetGetConfirmButtonEnableFunction(e) {
		this.GetConfirmButtonEnableCallBack = e;
	}
	SetOtherTeamSlotData(e) {
		this.EditBattleRoleSlotDataList = e;
	}
	SetConfirmCheckFunction(e) {
		this.CanConfirmFunc = e;
	}
}
exports.TeamRoleSelectViewData = TeamRoleSelectViewData;
class TeamRoleSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.ami = void 0),
			(this.CurSelectRole = void 0),
			(this.jho = void 0),
			(this.Kho = void 0),
			(this.Xho = void 0),
			(this.$ho = void 0),
			(this.Yho = void 0),
			(this.Jho = void 0),
			(this.zho = void 0),
			(this.x4t = !1),
			(this.xUt = () => {
				var e = this.CurSelectRole?.GetDataId(),
					t = this.Pe?.CanConfirmFunc;
				(t && !t(e)) ||
					(this.Pe?.ConfirmCallBack?.(e),
					UiManager_1.UiManager.CloseView(this.Info.Name));
			}),
			(this.W9t = () => {
				this.Pe?.BackCallBack?.(),
					UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.Zho = () => {
				var e = this.CurSelectRole.GetDataId(),
					t = e >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [e] : [];
				RoleController_1.RoleController.OpenRoleMainView(0, e, t),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OnRoleChangeEnd,
						this.elo,
					),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.CloseView,
						this.$Ge,
					);
			}),
			(this.$Ge = (e) => {
				"RoleRootView" === e &&
					(EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnRoleChangeEnd,
						this.elo,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.CloseView,
						this.$Ge,
					));
			}),
			(this.w4t = (e) => {
				(ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = e),
					(this.x4t = e),
					(e = this.Xho.GetSelectedGridIndex()),
					!this.$ho || e < 0 || this.$ho.length < e || this.tlo(this.$ho[e]);
			}),
			(this.Qho = (e, t, i) => {
				this.Kho = e;
				e = 0 < this.Kho.length;
				var o =
					(this.GetItem(8).SetUIActive(!e),
					this.GetButton(3).RootUIComp.SetUIActive(e),
					!ModelManager_1.ModelManager.TowerModel.CheckInTower() && e);
				if (
					(this.GetButton(9).RootUIComp.SetUIActive(o),
					this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(e),
					this.GetItem(10).SetUIActive(e),
					e)
				) {
					if (
						((o = this.CurSelectRole?.GetDataId()),
						o &&
							ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
								o,
							),
						this.jho.DeselectCurrentGridProxy(),
						this.jho.RefreshByData(this.Kho),
						this.CurSelectRole)
					)
						if (1 !== i || t) {
							let e = !1;
							for (const t of this.Kho)
								if (t.GetDataId() === this.CurSelectRole?.GetDataId()) {
									e = !0;
									break;
								}
							e || (this.CurSelectRole = this.Kho[0]);
						} else this.CurSelectRole = this.Kho[0];
					else
						for (const e of this.Kho)
							if (
								((this.CurSelectRole = e),
								this.Pe?.CanJoinTeam?.(e.GetDataId()))
							)
								break;
					this.ilo();
				}
			}),
			(this.z9e = () => {
				var e = new TeamRoleGrid_1.TeamRoleGrid();
				return (
					(e.IsHighlightIndex = this.IsHighlightIndex),
					e.BindOnExtendToggleStateChanged(this.ToggleFunction),
					e.BindOnCanExecuteChange(this.CanExecuteChangeFunction),
					e
				);
			}),
			(this.IsHighlightIndex = (e) => e === this.Pe?.Position),
			(this.ToggleFunction = (e) => {
				var t;
				1 === e.State &&
					((t = this.CurSelectRole?.GetDataId()) &&
						ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
							t,
						),
					(t = e.Data),
					(this.CurSelectRole = t),
					this.olo(),
					(e = this.Kho.indexOf(t)),
					this.jho.SelectGridProxy(e),
					(t = this.CurSelectRole.GetDataId()),
					ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(t),
					this.rlo(t),
					this.F6t(t),
					this.U4t(t));
			}),
			(this.CanExecuteChangeFunction = (e, t, i) =>
				1 !== i || this.CurSelectRole !== e),
			(this.nlo = () => {
				var e = new TeamRoleSkillItem_1.TeamRoleSkillItem();
				return e.BindOnSkillStateChange(this.slo), e;
			}),
			(this.slo = (e, t) => {
				1 === e &&
					this.$ho &&
					((e = this.$ho.indexOf(t)), this.Xho.SelectGridProxy(e), this.tlo(t));
			}),
			(this.alo = () => {
				this.CurSelectRole &&
					(this.olo(), this.rlo(this.CurSelectRole.GetDataId()));
			}),
			(this.elo = () => {
				var e = ModelManager_1.ModelManager.RoleSelectModel;
				let t = !1;
				for (let a = 0; a < this.Kho.length; a++) {
					var i = this.Kho[a],
						o = this.CurSelectRole === i,
						l = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
							i.GetDataId(),
						);
					l &&
						l !== i &&
						((t = !0),
						(this.Kho[a] = l),
						0 < (i = e.GetRoleIndex(i.GetDataId())) && e.RoleIndexMap.set(i, l),
						o) &&
						(this.CurSelectRole = l);
				}
				t && this.ami?.UpdateData(this.Pe.UseWay, this.Kho);
			}),
			(this.d3t = () => {
				var e;
				this.Pe?.EditBattleRoleSlotDataList &&
					(((e =
						ModelManager_1.ModelManager.EditBattleTeamModel.GetRoleSlotData(
							this.Pe.Position,
						)) &&
						e.GetRoleData?.PlayerId ===
							ModelManager_1.ModelManager.PlayerInfoModel.GetId()) ||
						(this.Pe?.BackCallBack?.(),
						UiManager_1.UiManager.CloseView(this.Info.Name)),
					this.Pe?.SetOtherTeamSlotData(
						ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
					),
					this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIInteractionGroup],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[1, UE.UILoopScrollViewComponent],
			[2, UE.UIText],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIButtonComponent],
			[10, UE.UIItem],
			[11, UE.UIText],
			[12, UE.UIText],
			[13, UE.UIHorizontalLayout],
			[14, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIMultiTemplateLayout],
			[17, UE.UIItem],
			[18, UE.UIText],
			[22, UE.UIExtendToggle],
			[23, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.xUt],
				[4, this.W9t],
				[9, this.Zho],
				[22, this.w4t],
			]);
	}
	async OnBeforeStartAsync() {
		var e = [];
		for (const t of this.OpenParam.RoleList)
			t.GetDataId() > RoleDefine_1.ROBOT_DATA_MIN_ID && e.push(t.GetDataId());
		0 < e.length &&
			(await RoleController_1.RoleController.RobotRolePropRequest(e));
	}
	OnStart() {
		(this.Pe = this.OpenParam),
			(this.jho = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(1),
				this.GetItem(7).GetOwner(),
				this.z9e,
			));
		var e = this.GetItem(20),
			t =
				((e =
					((this.Jho =
						new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(e)),
					this.GetItem(21))),
				(e =
					((this.zho =
						new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(e)),
					ModelManager_1.ModelManager.GameModeModel.IsMulti)),
				(e =
					(this.GetItem(23).SetUIActive(e),
					(this.x4t =
						ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && e),
					this.x4t ? 1 : 0)),
				this.GetExtendToggle(22).SetToggleState(e),
				(this.Xho = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(13),
					this.nlo,
				)),
				(this.Yho = new GenericLayout_1.GenericLayout(
					this.GetMultiTemplateLayout(16),
					() => new RoleTagMediumIconItem_1.RoleTagMediumIconItem(),
				)),
				(this.Kho = this.Pe?.RoleList),
				this.Pe?.CurrentRoleId),
			i = this.Pe?.FormationRoleList,
			o =
				(ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
				ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
		if (i)
			for (
				let e = 1;
				e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(e > i.length);
				e++
			) {
				var l = i[e - 1];
				for (const t of this.Kho)
					if (t.GetDataId() === l) {
						o.set(e, t);
						break;
					}
			}
		(e = this.GetItem(5)),
			(this.ami = new FilterSortEntrance_1.FilterSortEntrance(e, this.Qho));
		for (const e of this.Kho)
			if (e.GetDataId() === t) {
				this.CurSelectRole = e;
				break;
			}
		this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList),
			this.Kho.sort(
				(e, t) => t.GetRoleConfig().Priority - e.GetRoleConfig().Priority,
			),
			this.ami?.UpdateData(this.Pe.UseWay, this.Kho);
	}
	OnBeforeDestroy() {
		this.Pe?.OnHideFinishCallBack?.(),
			this.ami?.Destroy(),
			(this.Pe = void 0),
			(this.CurSelectRole = void 0),
			this.ami?.Destroy(),
			(this.ami = void 0),
			this.jho?.ClearGridProxies(),
			(this.jho = void 0),
			this.Kho?.splice(0, this.Kho.length),
			(this.Kho = void 0),
			this.Jho?.Destroy(),
			(this.Jho = void 0),
			this.zho?.Destroy(),
			(this.zho = void 0),
			this.Xho?.ClearChildren(),
			(this.Xho = void 0),
			this.$ho?.splice(0, this.$ho.length),
			(this.$ho = void 0),
			this.Yho?.ClearChildren(),
			(this.Yho = void 0);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleRefreshAttribute,
				this.alo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRevive,
				this.alo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleRefreshAttribute,
				this.alo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRevive,
				this.alo,
			);
	}
	ilo() {
		this.olo();
		var e = this.Kho.indexOf(this.CurSelectRole);
		this.jho.SelectGridProxy(e), (e = this.CurSelectRole.GetDataId());
		ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(e),
			this.rlo(e),
			this.F6t(e),
			this.U4t(e);
	}
	RefreshTeamItem(e) {
		if (e) {
			this.Jho.SetActive(!0),
				this.zho.SetActive(!0),
				(this.Jho.IsSet = !1),
				(this.zho.IsSet = !1);
			for (let i = 1; i <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; i++) {
				var t = e[i - 1];
				!t?.HasRole ||
					t.GetRoleData.IsSelf ||
					(this.Jho.IsSet
						? this.zho.IsSet ||
							(this.zho.SetRoleId(t.GetRoleData.ConfigId),
							this.zho.SetTeamNumber(t.GetRoleData.OnlineIndex),
							this.zho.RefreshItem())
						: (this.Jho.SetRoleId(t.GetRoleData.ConfigId),
							this.Jho.SetTeamNumber(t.GetRoleData.OnlineIndex),
							this.Jho.RefreshItem()));
			}
			this.Jho.SetActive(this.Jho.IsSet), this.zho.SetActive(this.zho.IsSet);
		} else this.Jho.SetActive(!1), this.zho.SetActive(!1);
	}
	rlo(e) {
		e = this.Pe?.GetConfirmButtonTextCallBack?.(e);
		e &&
			((e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e)),
			this.GetText(2).ShowTextNew(e));
	}
	F6t(e) {
		this.Pe?.GetConfirmButtonEnableCallBack &&
			((e = this.Pe.GetConfirmButtonEnableCallBack(e)),
			this.GetInteractionGroup(0)?.SetInteractable(e));
	}
	U4t(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleName(e);
		if (
			(t =
				(this.GetText(11).SetText(t),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)))
		) {
			var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
				t.SkillId,
			);
			if (i) {
				const l = new Array();
				for (const e of displaySkillTypes)
					for (const t of i)
						if (t.SkillType === e) {
							var o = new TeamRoleSkillItem_1.TeamRoleSkillData();
							(o.SkillIcon = t.Icon),
								(o.SkillType = e),
								(o.SkillName = t.SkillName),
								(o.SkillTagList = t.SkillTagList),
								(o.SkillResume = t.SkillDescribe),
								(o.SkillResumeNum = t.SkillDetailNum),
								(o.MultiSkillDesc = t.MultiSkillDescribe),
								(o.MultiSkillDescNum = t.MultiSkillDetailNum),
								l.push(o);
							break;
						}
				l.length <= 0 ||
					((this.$ho = l),
					this.Xho.DeselectCurrentGridProxy(),
					this.Xho.RefreshByData(l, () => {
						this.Xho.SelectGridProxy(0), this.slo(1, l[0]);
					}),
					(t = void 0 !== (e = t.Tag) && 0 < e.length),
					this.GetMultiTemplateLayout(16).RootUIComp.SetUIActive(t),
					t && this.Yho?.RefreshByData(e));
			}
		}
	}
	tlo(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), e.SkillName);
		var t = this.GetText(18);
		(t =
			(this.x4t
				? LguiUtil_1.LguiUtil.SetLocalTextNew(
						t,
						e.MultiSkillDesc,
						...e.MultiSkillDescNum,
					)
				: "" === e.SkillResume
					? t.SetUIActive(!1)
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							t,
							e.SkillResume,
							...e.SkillResumeNum,
						),
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
				e.SkillType,
			))) && this.GetText(12).SetText(t);
	}
	olo() {
		var e,
			t,
			i = this.GetText(6);
		!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
		((e = this.CurSelectRole.GetDataId()),
		(t = this.Kho.indexOf(this.CurSelectRole)),
		this.jho.RefreshGridProxy(t),
		this.Pe?.IsNeedRevive?.(e))
			? (i.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(i, "EditBattleTeamNeedRevive"))
			: i.SetUIActive(!1);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = Number(e[0]);
		if (0 !== t && (t = this.hlo(t))) return [t, t];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
	hlo(e) {
		let t,
			i = 0;
		return (
			this.Kho?.forEach(
				(o) =>
					o.GetRoleId() === e &&
					((i = this.Kho.indexOf(o)), (t = this.jho?.GetGrid(i)), !0),
			),
			TimerSystem_1.TimerSystem.Next(() => {
				this.jho.ScrollToGridIndex(i, !1);
			}),
			t
		);
	}
}
exports.TeamRoleSelectView = TeamRoleSelectView;
