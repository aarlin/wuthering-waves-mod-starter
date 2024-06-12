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
	ExitSkillTag_1 = require("../EditFormation/View/ExitSkill/ExitSkillTag"),
	FormationDefine_1 = require("../Formation/FormationDefine"),
	RoleDefine_1 = require("../RoleUi/RoleDefine"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
	TeamRoleGrid_1 = require("./TeamRoleGrid"),
	TeamRoleSkillItem_1 = require("./TeamRoleSkillItem"),
	displaySkillTypes = [11, 2, 3, 6];
class TeamRoleSelectViewData extends UiPopViewData_1.UiPopViewData {
	constructor(i, t, e, s, h, o) {
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
			(this.UseWay = i),
			(this.CurrentRoleId = t),
			(this.RoleList = e),
			(this.BackCallBack = h),
			(this.ConfirmCallBack = s),
			(this.Position = o);
	}
	SetHideFinishCallBack(i) {
		this.OnHideFinishCallBack = i;
	}
	SetGetConfirmButtonTextFunction(i) {
		this.GetConfirmButtonTextCallBack = i;
	}
	SetGetConfirmButtonEnableFunction(i) {
		this.GetConfirmButtonEnableCallBack = i;
	}
	SetOtherTeamSlotData(i) {
		this.EditBattleRoleSlotDataList = i;
	}
	SetConfirmCheckFunction(i) {
		this.CanConfirmFunc = i;
	}
}
exports.TeamRoleSelectViewData = TeamRoleSelectViewData;
class TeamRoleSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.xui = void 0),
			(this.CurSelectRole = void 0),
			(this.Hsr = void 0),
			(this.jsr = void 0),
			(this.Ksr = void 0),
			(this.Qsr = void 0),
			(this.DFt = void 0),
			(this.$sr = void 0),
			(this.Xsr = void 0),
			(this.ODt = () => {
				var i = this.CurSelectRole?.GetDataId(),
					t = this.Pe?.CanConfirmFunc;
				(t && !t(i)) ||
					(this.Pe?.ConfirmCallBack?.(i),
					UiManager_1.UiManager.CloseView(this.Info.Name));
			}),
			(this.c8t = () => {
				this.Pe?.BackCallBack?.(),
					UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.Ysr = () => {
				ModelManager_1.ModelManager.RoleModel.UpdateSelectRoleInstance(
					this.CurSelectRole,
				);
				var i = this.CurSelectRole.GetDataId(),
					i = { RoleList: i >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [i] : void 0 };
				UiManager_1.UiManager.OpenView("RoleRootView", i),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OnRoleChangeEnd,
						this.Jsr,
					),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.CloseView,
						this.Qqe,
					);
			}),
			(this.Qqe = (i) => {
				"RoleRootView" === i &&
					(EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnRoleChangeEnd,
						this.Jsr,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.CloseView,
						this.Qqe,
					));
			}),
			(this.Wsr = (i, t) => {
				this.jsr = i;
				var i = 0 < this.jsr.length,
					e =
						(this.GetItem(8).SetUIActive(!i),
						this.GetButton(3).RootUIComp.SetUIActive(i),
						!ModelManager_1.ModelManager.TowerModel.CheckInTower() && i);
				if (
					(this.GetButton(9).RootUIComp.SetUIActive(e),
					this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
					this.GetItem(10).SetUIActive(i),
					i)
				) {
					e = this.CurSelectRole?.GetDataId();
					if (
						(e &&
							ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
								e,
							),
						this.Hsr.DeselectCurrentGridProxy(),
						this.Hsr.RefreshByData(this.jsr),
						this.CurSelectRole)
					) {
						let i = !1;
						for (const s of this.jsr)
							if (s.GetDataId() === this.CurSelectRole?.GetDataId()) {
								i = !0;
								break;
							}
						i || (this.CurSelectRole = this.jsr[0]);
					} else
						for (const h of this.jsr)
							if (
								((this.CurSelectRole = h),
								this.Pe?.CanJoinTeam?.(h.GetDataId()))
							)
								break;
					this.zsr();
				}
			}),
			(this.E8e = () => {
				var i = new TeamRoleGrid_1.TeamRoleGrid();
				return (
					(i.IsHighlightIndex = this.IsHighlightIndex),
					i.BindOnExtendToggleStateChanged(this.ToggleFunction),
					i.BindOnCanExecuteChange(this.CanExecuteChangeFunction),
					i
				);
			}),
			(this.IsHighlightIndex = (i) => i === this.Pe?.Position),
			(this.ToggleFunction = (i) => {
				var t;
				1 === i.State &&
					((t = this.CurSelectRole?.GetDataId()) &&
						ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
							t,
						),
					(t = i.Data),
					(this.CurSelectRole = t),
					this.Zsr(),
					(i = this.jsr.indexOf(t)),
					this.Hsr.SelectGridProxy(i),
					(t = this.CurSelectRole.GetDataId()),
					ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(t),
					this.ear(t),
					this.hVt(t),
					this.RFt(t));
			}),
			(this.CanExecuteChangeFunction = (i, t, e) => {
				return 1 !== e || this.CurSelectRole !== i;
			}),
			(this.tar = () => {
				var i = new TeamRoleSkillItem_1.TeamRoleSkillItem();
				return i.BindOnSkillStateChange(this.iar), i;
			}),
			(this.iar = (i, t) => {
				1 === i &&
					this.Qsr &&
					((i = this.Qsr.indexOf(t)),
					this.Ksr.SelectGridProxy(i),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), t.SkillName),
					(i = this.GetText(18)),
					"" === t.SkillResume
						? i.SetUIActive(!1)
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								i,
								t.SkillResume,
								...t.SkillResumeNum,
							),
					(i =
						ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
							t.SkillType,
						)) && this.GetText(12).SetText(i),
					(t = void 0 !== (i = t.SkillTagList) && 0 < i.length),
					this.GetHorizontalLayout(16).RootUIComp.SetUIActive(t),
					t) &&
					this.DFt?.RefreshByData(i);
			}),
			(this.rar = () => {
				this.CurSelectRole &&
					(this.Zsr(), this.ear(this.CurSelectRole.GetDataId()));
			}),
			(this.Jsr = () => {
				var t = ModelManager_1.ModelManager.RoleSelectModel;
				let e = !1;
				for (let i = 0; i < this.jsr.length; i++) {
					var s = this.jsr[i],
						h = this.CurSelectRole === s,
						o = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
							s.GetDataId(),
						);
					o &&
						o !== s &&
						((e = !0),
						(this.jsr[i] = o),
						0 < (s = t.GetRoleIndex(s.GetDataId())) && t.RoleIndexMap.set(s, o),
						h) &&
						(this.CurSelectRole = o);
				}
				e && this.xui?.UpdateData(this.Pe.UseWay, this.jsr);
			}),
			(this.c2t = () => {
				var i;
				this.Pe?.EditBattleRoleSlotDataList &&
					(((i =
						ModelManager_1.ModelManager.EditBattleTeamModel.GetRoleSlotData(
							this.Pe.Position,
						)) &&
						i.GetRoleData?.PlayerId ===
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
			[16, UE.UIHorizontalLayout],
			[17, UE.UIItem],
			[18, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[3, this.ODt],
				[4, this.c8t],
				[9, this.Ysr],
			]);
	}
	OnStart() {
		(this.Pe = this.OpenParam),
			(this.Hsr = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(1),
				this.GetItem(7).GetOwner(),
				this.E8e,
			));
		var i = this.GetItem(20),
			i =
				((this.$sr =
					new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
				this.GetItem(21)),
			t =
				((this.Xsr =
					new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
				(this.Ksr = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(13),
					this.tar,
				)),
				(this.DFt = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(16),
					() => new ExitSkillTag_1.ExitSkillTag(),
				)),
				(this.jsr = this.Pe?.RoleList),
				this.Pe?.CurrentRoleId),
			e = this.Pe?.FormationRoleList,
			s =
				(ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
				ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
		if (e)
			for (
				let i = 1;
				i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length);
				i++
			) {
				var h = e[i - 1];
				for (const o of this.jsr)
					if (o.GetDataId() === h) {
						s.set(i, o);
						break;
					}
			}
		i = this.GetItem(5);
		this.xui = new FilterSortEntrance_1.FilterSortEntrance(i, this.Wsr);
		for (const r of this.jsr)
			if (r.GetDataId() === t) {
				this.CurSelectRole = r;
				break;
			}
		this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList),
			this.jsr.sort(
				(i, t) => t.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
			),
			this.xui?.UpdateData(this.Pe.UseWay, this.jsr);
	}
	OnBeforeDestroy() {
		this.Pe?.OnHideFinishCallBack?.(),
			this.xui?.Destroy(),
			(this.Pe = void 0),
			(this.CurSelectRole = void 0),
			this.xui?.Destroy(),
			(this.xui = void 0),
			this.Hsr?.ClearGridProxies(),
			(this.Hsr = void 0),
			this.jsr?.splice(0, this.jsr.length),
			(this.jsr = void 0),
			this.$sr?.Destroy(),
			(this.$sr = void 0),
			this.Xsr?.Destroy(),
			(this.Xsr = void 0),
			this.Ksr?.ClearChildren(),
			(this.Ksr = void 0),
			this.Qsr?.splice(0, this.Qsr.length),
			(this.Qsr = void 0),
			this.DFt?.ClearChildren(),
			(this.DFt = void 0);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.c2t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleRefreshAttribute,
				this.rar,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRevive,
				this.rar,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.c2t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleRefreshAttribute,
				this.rar,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRevive,
				this.rar,
			);
	}
	zsr() {
		this.Zsr();
		var i = this.jsr.indexOf(this.CurSelectRole),
			i = (this.Hsr.SelectGridProxy(i), this.CurSelectRole.GetDataId());
		ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(i),
			this.ear(i),
			this.hVt(i),
			this.RFt(i);
	}
	RefreshTeamItem(t) {
		if (t) {
			this.$sr.SetActive(!0),
				this.Xsr.SetActive(!0),
				(this.$sr.IsSet = !1),
				(this.Xsr.IsSet = !1);
			for (let i = 1; i <= FormationDefine_1.FORMATION_MAX_NUM; i++) {
				var e = t[i - 1];
				!e?.HasRole ||
					e.GetRoleData.IsSelf ||
					(this.$sr.IsSet
						? this.Xsr.IsSet ||
							(this.Xsr.SetRoleId(e.GetRoleData.ConfigId),
							this.Xsr.SetTeamNumber(e.GetRoleData.OnlineIndex),
							this.Xsr.RefreshItem())
						: (this.$sr.SetRoleId(e.GetRoleData.ConfigId),
							this.$sr.SetTeamNumber(e.GetRoleData.OnlineIndex),
							this.$sr.RefreshItem()));
			}
			this.$sr.SetActive(this.$sr.IsSet), this.Xsr.SetActive(this.Xsr.IsSet);
		} else this.$sr.SetActive(!1), this.Xsr.SetActive(!1);
	}
	ear(i) {
		var i = this.Pe?.GetConfirmButtonTextCallBack?.(i);
		i &&
			((i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i)),
			this.GetText(2).ShowTextNew(i));
	}
	hVt(i) {
		this.Pe?.GetConfirmButtonEnableCallBack &&
			((i = this.Pe.GetConfirmButtonEnableCallBack(i)),
			this.GetInteractionGroup(0)?.SetInteractable(i));
	}
	RFt(i) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleName(i),
			t =
				(this.GetText(11).SetText(t),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i));
		if (t) {
			var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
				t.SkillId,
			);
			if (e) {
				t =
					i < RoleDefine_1.ROBOT_DATA_MIN_ID &&
					!ModelManager_1.ModelManager.TowerModel.CheckInTower();
				this.GetButton(9).RootUIComp.SetUIActive(t);
				const h = new Array();
				for (const o of displaySkillTypes)
					for (const r of e)
						if (r.SkillType === o) {
							var s = new TeamRoleSkillItem_1.TeamRoleSkillData();
							(s.SkillIcon = r.Icon),
								(s.SkillType = o),
								(s.SkillName = r.SkillName),
								(s.SkillTagList = r.SkillTagList),
								(s.SkillResume = r.SkillDescribe),
								(s.SkillResumeNum = r.SkillDetailNum),
								h.push(s);
							break;
						}
				h.length <= 0 ||
					((this.Qsr = h),
					this.Ksr.DeselectCurrentGridProxy(),
					this.Ksr.RefreshByData(h, () => {
						this.Ksr.SelectGridProxy(0), this.iar(1, h[0]);
					}));
			}
		}
	}
	Zsr() {
		var i,
			t,
			e = this.GetText(6);
		!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
		((i = this.CurSelectRole.GetDataId()),
		(t = this.jsr.indexOf(this.CurSelectRole)),
		this.Hsr.RefreshGridProxy(t),
		this.Pe?.IsNeedRevive?.(i))
			? (e.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(e, "EditBattleTeamNeedRevive"))
			: e.SetUIActive(!1);
	}
	GetGuideUiItemAndUiItemForShowEx(i) {
		var t = Number(i[0]);
		if (0 !== t) {
			t = this.oar(t);
			if (t) return [t, t];
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				i,
			]);
	}
	oar(t) {
		let e = 0,
			s = void 0;
		return (
			this.jsr?.forEach(
				(i) =>
					i.GetRoleId() === t &&
					((e = this.jsr.indexOf(i)), (s = this.Hsr?.GetGrid(e)), !0),
			),
			TimerSystem_1.TimerSystem.Next(() => {
				this.Hsr.ScrollToGridIndex(e, !1);
			}),
			s
		);
	}
}
exports.TeamRoleSelectView = TeamRoleSelectView;
//# sourceMappingURL=TeamRoleSelectView.js.map
