"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashRootView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
	HandBookController_1 = require("../../HandBook/HandBookController"),
	HelpController_1 = require("../../Help/HelpController"),
	CalabashTabItem_1 = require("./CalabashTabItem"),
	CALABASH_LEVEL_UP_HELP_ID = 48,
	CALABASH_COLLECT_HELP_ID = 47,
	VISION_RECOVERY_HELP_ID = 70;
class CalabashRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.upt = void 0),
			(this.cpt = void 0),
			(this.mpt = void 0),
			(this.dpt = void 0),
			(this.Cpt = !1),
			(this.O3e = 0),
			(this.gpt = () => {
				this.CloseMe();
			}),
			(this.ift = () => {
				HelpController_1.HelpController.OpenHelpById(this.O3e);
			}),
			(this.fpt = (e) => {
				var t = this.upt.findIndex(
					(e) => "CalabashCollectTabView" === e.ChildViewName,
				);
				this.dpt
					? ((this.dpt.TabViewName = "CalabashCollectTabView"),
						(this.dpt.Param = e))
					: (this.dpt = { TabViewName: "CalabashCollectTabView", Param: e }),
					this.cpt.SelectToggleByIndex(t);
			}),
			(this.ppt = (e) => {
				var t = this.upt.findIndex(
					(e) => "PhantomBattleFettersTabView" === e.ChildViewName,
				);
				this.dpt
					? ((this.dpt.TabViewName = "PhantomBattleFettersTabView"),
						(this.dpt.Param = e))
					: (this.dpt = {
							TabViewName: "PhantomBattleFettersTabView",
							Param: e,
						}),
					this.cpt.SelectToggleByIndex(t);
			}),
			(this.vpt = () => {
				this.cpt?.HideItem();
			}),
			(this.Mpt = () => {
				this.cpt?.ShowItem();
			}),
			(this.Spt = (e) => {
				e
					? this.UiViewSequence.PlaySequence("SwitchA")
					: this.UiViewSequence.PlaySequence("SwitchB");
			}),
			(this.fqe = (e) => new CalabashTabItem_1.CalabashTabItem()),
			(this.pqe = (e) => {
				var t = this.upt[e],
					a = t.ChildViewName,
					i =
						((e = this.cpt.GetTabItemByIndex(e)),
						a === this.dpt?.TabViewName ? this.dpt?.Param : void 0);
				this.mpt.ToggleCallBack(t, a, e, i),
					this.dpt && (this.dpt.Param = void 0);
				let n = !1;
				"CalabashLevelUpTabView" === a
					? ((this.O3e = 48), (n = !0))
					: "CalabashCollectTabView" === a
						? ((this.O3e = 47), (n = !0))
						: "VisionRecoveryTabView" === a && ((this.O3e = 70), (n = !0)),
					this.cpt.SetHelpButtonShowState(n),
					this.GetItem(3)?.SetUIActive("CalabashCollectTabView" === a);
			}),
			(this.yqe = (e) => (
				(e = this.upt[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.Ept = (e) => {
				ModelManager_1.ModelManager.CalabashModel.SaveIfSimpleState(!e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.Ept]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.JumpToCalabashCollect,
			this.fpt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
				this.ppt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CalabashEnterInternalView,
				this.vpt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CalabashQuitInternalView,
				this.Mpt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
				this.Spt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.JumpToCalabashCollect,
			this.fpt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
				this.ppt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CalabashEnterInternalView,
				this.vpt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CalabashQuitInternalView,
				this.Mpt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
				this.Spt,
			);
	}
	async OnBeforeStartAsync() {
		(this.Cpt = !0),
			await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync(
				[1],
			),
			ModelManager_1.ModelManager.CalabashModel.CheckSimpleStateSave();
		var e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()
			? 0
			: 1;
		this.GetExtendToggle(2)?.SetToggleState(e),
			(this.dpt = this.OpenParam),
			this.ypt(),
			await this.Ipt(),
			this.Tpt();
	}
	ypt() {
		this.upt = ModelManager_1.ModelManager.CalabashModel?.GetViewTabList();
	}
	async Ipt() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.fqe,
			this.pqe,
			this.yqe,
		);
		(this.cpt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
			this.GetItem(0),
			e,
			this.gpt,
		)),
			this.cpt.SetHelpButtonCallBack(this.ift),
			(e = this.upt.length);
		await this.cpt.RefreshTabItemByLengthAsync(e);
	}
	Tpt() {
		this.mpt = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
	}
	Lpt() {
		const e = this.dpt?.TabViewName;
		let t = 0;
		var a;
		(t = e
			? this.upt.findIndex((t) => t.ChildViewName === e)
			: (a = this.cpt.GetSelectedIndex()) !== CommonDefine_1.INVALID_VALUE
				? a
				: 0),
			this.cpt.SelectToggleByIndex(t);
	}
	x6e() {
		var e = this.upt.findIndex(
			(e) => "CalabashLevelUpTabView" === e.ChildViewName,
		);
		0 <= e && this.cpt.GetTabItemByIndex(e)?.BindRedDot("CalabashTab");
	}
	OnBeforeShow() {
		this.Cpt ? this.Lpt() : this.mpt.SetCurrentTabViewState(!0),
			(this.Cpt = !1),
			this.x6e();
	}
	OnBeforeHide() {
		this.Dpt(), this.mpt.SetCurrentTabViewState(!1);
	}
	OnAfterHide() {
		var e = this.mpt.GetTabViewByTabName("VisionRecoveryTabView");
		void 0 !== e && e.RemoveAllVisionItemOutside();
	}
	Dpt() {
		var e = this.upt.findIndex(
			(e) => "CalabashLevelUpTabView" === e.ChildViewName,
		);
		this.cpt.GetTabItemByIndex(e)?.UnBindRedDot();
	}
	OnBeforeDestroy() {
		this.cpt.Destroy(), this.mpt.DestroyTabViewComponent();
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		const t = Number(e[0]);
		var a = this.cpt
			.GetTabItemByIndex(this.upt.findIndex((e) => e.Id === t))
			.GetRootItem();
		if (a) return [a, a];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
}
exports.CalabashRootView = CalabashRootView;
