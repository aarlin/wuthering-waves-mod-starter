"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewTowerGuide = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	RoleController_1 = require("../../../RoleUi/RoleController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityTowerGuideController_1 = require("./ActivityTowerGuideController"),
	ActivityTowerGuideRewardGrid_1 = require("./ActivityTowerGuideRewardGrid");
class ActivitySubViewTowerGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LFe = 0),
			(this.ViewState = 0),
			(this.DFe = void 0),
			(this.mNe = void 0),
			(this.dNe = !0),
			(this.RFe = void 0),
			(this.UFe = void 0),
			(this.AFe = () => {
				var e =
					new ActivityTowerGuideRewardGrid_1.ActivityTowerGuideRewardGrid();
				return (
					e.BindOnCanExecuteChange(() => !1),
					e.BindOnExtendToggleClicked((e) => {
						(e = e.Data),
							ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
								e.Item[0].ItemId,
							);
					}),
					e
				);
			}),
			(this.wNe = (e) => {
				e === this.ActivityBaseData.Id && this.OnRefreshView();
			}),
			(this.Pke = () => {
				RoleController_1.RoleController.OpenRoleMainView(1, 0, [this.LFe]);
			}),
			(this.PFe = () => {
				2 === this.ActivityBaseData.GetTowerProgressState(1) &&
					ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(
						1,
					);
			}),
			(this.xFe = () => {
				2 === this.ActivityBaseData.GetTowerProgressState(2) &&
					ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(
						2,
					);
			}),
			(this.wFe = () => {
				var e,
					t = this.ActivityBaseData.GetPreGuideQuestFinishState();
				t
					? ((e = {
							MarkId: this.ActivityBaseData.MapMarkId,
							MarkType: 0,
							OpenAreaId: 0,
						}),
						WorldMapController_1.WorldMapController.OpenView(2, !1, e))
					: ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
						UiManager_1.UiManager.OpenView("QuestView", e)),
					ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
						this.ActivityBaseData,
						t ? 2 : 1,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIHorizontalLayout],
			[10, UE.UIItem],
			[11, UE.UIButtonComponent],
			[12, UE.UIButtonComponent],
			[20, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIText],
			[15, UE.UIItem],
			[16, UE.UIButtonComponent],
			[17, UE.UIText],
			[18, UE.UIText],
			[19, UE.UIText],
			[21, UE.UIItem],
			[22, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[5, this.Pke],
				[16, this.Pke],
				[6, this.PFe],
				[11, this.xFe],
				[12, this.wFe],
			]);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		(this.RFe = new TowerGuideProgress()),
			await this.RFe.CreateByActorAsync(this.GetItem(4).GetOwner()),
			(this.UFe = new TowerGuideProgress()),
			await this.UFe.CreateByActorAsync(this.GetItem(10).GetOwner()),
			(this.DFe = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(9),
				this.AFe,
			)),
			(this.mNe = this.GetText(22));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.wNe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.wNe,
		);
	}
	OnStart() {
		this.BFe(), this.bFe(), this.OnRefreshView();
	}
	OnBeforeDestroy() {
		for (const e of this.DFe.GetLayoutItemList()) this.AddChild(e);
	}
	OnRefreshView() {
		var e = this.ActivityBaseData.GetViewState();
		this.fNe(), this.qFe(e);
	}
	BFe() {
		this.GetText(18).SetText(this.ActivityBaseData.GetTitle()),
			this.GetText(19).ShowTextNew(this.ActivityBaseData.LocalConfig.Desc);
	}
	bFe() {
		this.LFe = this.ActivityBaseData.TrialRoleId;
		var e = this.ActivityBaseData.GetTrialRoleData();
		e && this.GetText(17).SetText(e.GetName());
	}
	qFe(e) {
		var t,
			i = 0 === (this.ViewState = e),
			r = 1 === e,
			o =
				((e = 2 === e),
				this.GetItem(0).SetUIActive(i),
				this.GetItem(1).SetUIActive(i),
				this.GetItem(2).SetUIActive(i),
				this.GetItem(8).SetUIActive(i),
				this.GetItem(13).SetUIActive(i),
				i && this.GetText(14).ShowTextNew(this.GetCurrentLockConditionText()),
				this.ActivityBaseData.GetTowerProgressState(1)),
			s = this.ActivityBaseData.GetTowerProgressState(2);
		if (
			(this.GFe(i, 2 === s),
			this.RFe.SetUiActive(1 === o),
			1 === o &&
				(([i, t] = this.ActivityBaseData.GetTowerProgress(1)),
				this.RFe.Refresh(i, t)),
			this.GetItem(3).SetUIActive(3 === o),
			this.GetButton(6).RootUIComp.SetUIActive(2 === o),
			this.UFe.SetUiActive(1 === s),
			1 === s &&
				(([i, t] = this.ActivityBaseData.GetTowerProgress(2)),
				this.UFe.Refresh(i, t)),
			this.GetItem(7).SetUIActive(3 === s),
			this.GetButton(11).RootUIComp.SetUIActive(2 === s),
			this.GetButton(12).RootUIComp.SetUIActive(r),
			r)
		) {
			let e = "";
			(e = (o = this.ActivityBaseData.GetPreGuideQuestFinishState())
				? "ReadyToFightText"
				: "JumpToQuestText"),
				this.GetText(20).ShowTextNew(e);
		}
		this.GetItem(15).SetUIActive(e);
	}
	OnTimer(e) {
		this.fNe();
	}
	pNe(e) {
		this.dNe !== e && ((this.dNe = e), this.GetItem(21).SetUIActive(e));
	}
	fNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.pNe(e), e && this.mNe.SetText(t);
	}
	GFe(e, t) {
		var i =
			ConfigManager_1.ConfigManager.ActivityTowerGuideConfig.GetTowerGuideById(
				2,
			);
		if (i) {
			var r,
				o,
				s = [];
			for ([r, o] of i.RewardItem) {
				var a = [{ IncId: 0, ItemId: r }, o];
				s.push({ Item: a, IsLock: e, IsReceivableVisible: t });
			}
			this.DFe.RefreshByData(s);
		}
	}
}
exports.ActivitySubViewTowerGuide = ActivitySubViewTowerGuide;
class TowerGuideProgress extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	Refresh(e, t) {
		this.GetText(0).SetText(e.toString()),
			this.GetText(1).SetText("/" + t.toString());
	}
}
