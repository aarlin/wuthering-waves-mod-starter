"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushMainView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
	TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem"),
	TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
class BossRushMainView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.upt = []),
			(this.TabViewComponent = void 0),
			(this.TabComponent = void 0),
			(this.q8i = 0),
			(this.nPr = (e) => {
				this.TabComponent?.SelectToggleByIndex(this.sPr(e));
			}),
			(this.fqe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.pqe = (e) => {
				this.q8i = e;
				var t = this.upt[e],
					n = t.ChildViewName;
				e = this.TabComponent.GetTabItemByIndex(e);
				this.TabViewComponent.ToggleCallBack(t, n, e);
			}),
			(this.yqe = (e) => new CommonTabData_1.CommonTabData("", void 0)),
			(this.W9t = () => {
				var e;
				0 !== this.q8i
					? ((e = this.upt[this.q8i - 1].ChildViewName),
						(ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !0),
						this.nPr(e))
					: this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId =
			this.OpenParam),
			(this.upt =
				ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
					"BossRushMainView",
				)),
			await this.aPr(),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(1),
			));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RequestChangeBossRushView,
			this.nPr,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RequestChangeBossRushView,
			this.nPr,
		);
	}
	OnStart() {
		this.TabComponent?.SelectToggleByIndex(this.sPr("BossRushSelectView"), !0);
	}
	async aPr() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.fqe,
			this.pqe,
			this.yqe,
		);
		(this.TabComponent =
			new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
				this.GetItem(0),
				e,
				this.W9t,
			)),
			this.TabComponent.SetScrollViewVisible(!1),
			(this.TabComponent.NeedCaptionSwitchWithToggle = !1),
			this.TabComponent.SetHelpButtonShowState(!1),
			this.TabComponent.SetTitle(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Activity_100805001_Title",
				),
			),
			await this.TabComponent.RefreshTabItemByLengthAsync(this.upt.length);
	}
	sPr(e) {
		for (let t = 0; t < this.upt.length; t++)
			if (this.upt[t].ChildViewName === e) return t;
		return 0;
	}
}
exports.BossRushMainView = BossRushMainView;
