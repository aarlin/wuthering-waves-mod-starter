"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuView =
		exports.MenuViewData =
		exports.MenuScrollItemData =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Pool_1 = require("../../../Core/Container/Pool"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
	PcAndGamepadKeySettingPanel_1 = require("./KeySettingsView/PcAndGamepadKeySettingPanel"),
	MenuController_1 = require("./MenuController"),
	MenuScrollSettingContainerDynItem_1 = require("./Views/MenuScrollSettingContainerDynItem"),
	MenuScrollSettingContainerItem_1 = require("./Views/MenuScrollSettingContainerItem"),
	CAPACITY = 20;
class MenuScrollItemData {
	constructor() {
		(this.Type = 0), (this.Data = void 0);
	}
}
exports.MenuScrollItemData = MenuScrollItemData;
class MenuViewData {
	constructor() {
		(this.Axi = 200),
			(this.Pxi = 100),
			(this.xxi = 0),
			(this.wxi = 0),
			(this.MenuViewDataCurMainType = 0),
			(this.MenuViewDataLastSubType = 0);
	}
	set MenuViewDataCurMainType(e) {
		this.xxi = e;
	}
	get MenuViewDataCurMainType() {
		return this.xxi;
	}
	set MenuViewDataLastSubType(e) {
		this.wxi = e;
	}
	get MenuViewDataLastSubType() {
		return this.wxi;
	}
	get MenuViewDataMainInterval() {
		return this.Axi;
	}
	get MenuViewDataSubInterval() {
		return this.Pxi;
	}
}
exports.MenuViewData = MenuViewData;
class MenuView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Bxi = []),
			(this.bxi = []),
			(this.qxi = void 0),
			(this.Gxi = new MenuViewData()),
			(this.cpt = void 0),
			(this.xqe = void 0),
			(this.Nxi = void 0),
			(this.Oxi = void 0),
			(this.a7 = () => new MenuScrollItemData()),
			(this.kxi = () => {
				this.Fxi();
			}),
			(this.Vxi = () => {
				var e;
				(GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
					GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
					(80 <
						(e =
							GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetGameQualityLoadInfo())
							.Percentage &&
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"PictureConfigOverload",
						),
					this.Hxi(e.Percentage, e.BarColor),
					this.jxi(e.Desc));
			}),
			(this.Wxi = (e, t, i) =>
				new MenuScrollSettingContainerItem_1.MenuScrollSettingContainerItem()),
			(this.dVe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.Kxi = (e) => {
				e = this.Bxi[e];
				var t =
						((this.Gxi.MenuViewDataCurMainType = e),
						ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainTypeConfigById(
							e,
						)),
					i = this.GetItem(5),
					n = this.GetItem(4);
				if (t) {
					let e = t.TabPanelType;
					switch (
						ModelManager_1.ModelManager.PlatformModel.SourcePlatformType
					) {
						case 3:
							e = t.PcTabPanelType;
							break;
						case 6:
							e = t.XboxTabPanelType;
							break;
						case 7:
							e = t.PsTabPanelType;
					}
					switch (e) {
						case 1:
							this.Qxi(), i.SetUIActive(!0), n.SetUIActive(!1);
							break;
						case 2:
							this.Xxi(), i.SetUIActive(!1), n.SetUIActive(!0);
							break;
						default:
							i.SetUIActive(!1), n.SetUIActive(!1);
					}
				} else i.SetUIActive(!1), n.SetUIActive(!1);
			}),
			(this.yqe = (e) => (
				(e = this.Bxi[e]),
				(e = MenuController_1.MenuController.GetTargetMainInfo(e)),
				new CommonTabData_1.CommonTabData(
					e.MainIcon,
					new CommonTabTitleData_1.CommonTabTitleData(e.MainName),
				)
			)),
			(this.$xi = () => {
				this.xqe.UnBindLateUpdate();
			}),
			(this.$Ge = () => {
				var e;
				MenuController_1.MenuController.BeforeViewClose(),
					MenuController_1.MenuController.CheckRestartMap()
						? (MenuController_1.MenuController.ClearRestartMap(),
							(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
								47,
							)).FunctionMap.set(1, () => {
								UiManager_1.UiManager.CloseView("MenuView");
							}),
							e.FunctionMap.set(2, () => {
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Menu", 8, "重启游戏，使设置生效"),
									ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
										5,
									);
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								e,
							))
						: UiManager_1.UiManager.CloseView("MenuView");
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIDynScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnBeforeDestroy() {
		this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			this.Nxi && this.Nxi.Clear(),
			this.bxi && (this.bxi.length = 0),
			this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
			this.qxi && (this.qxi = void 0);
		var e = ModelManager_1.ModelManager.MenuModel;
		e.IsEdited &&
			(MenuController_1.MenuController.ReportSettingMenuLogEvent(),
			(e.IsEdited = !1));
	}
	async OnBeforeStartAsync() {
		MenuController_1.MenuController.RefreshCurrentSetting(),
			(this.qxi =
				new MenuScrollSettingContainerDynItem_1.MenuScrollSettingContainerDynItem()),
			(this.xqe = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(0),
				this.GetItem(2),
				this.qxi,
				this.Wxi,
			)),
			await this.xqe.Init(),
			(this.Nxi = new Pool_1.Pool(20, this.a7)),
			await this.Yxi();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.TextLanguageChange,
			this.kxi,
		),
			(GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
				GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.ConfigLoadChange,
					this.Vxi,
				);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TextLanguageChange,
			this.kxi,
		),
			(GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
				GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ConfigLoadChange,
					this.Vxi,
				);
	}
	OnStart() {
		this.cpt.SelectToggleByIndex(0, !0);
	}
	async Yxi() {
		this.Bxi = MenuController_1.MenuController.GetMainTypeList();
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.Kxi,
			this.yqe,
		);
		(this.cpt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
			this.GetItem(1),
			e,
			this.$Ge,
		)),
			await this.cpt.RefreshTabItemByLengthAsync(this.Bxi.length);
	}
	Qxi() {
		this.Fxi();
	}
	Xxi() {
		var e = ModelManager_1.ModelManager.PlatformModel;
		let t = 0;
		e.IsInKeyBoard() ? (t = 1) : e.IsInGamepad() && (t = 2),
			this.Oxi
				? this.Oxi.Refresh(t)
				: ((this.Oxi =
						new PcAndGamepadKeySettingPanel_1.PcAndGamepadKeySettingPanel()),
					this.Oxi.CreateThenShowByResourceIdAsync(
						"UiItem_HandleSet",
						this.GetItem(4),
					).then(
						() => {
							this.Oxi.Refresh(t);
						},
						() => {},
					));
	}
	Fxi() {
		var e = MenuController_1.MenuController.GetTargetBaseConfigData(
			this.Gxi.MenuViewDataCurMainType,
		);
		2 === this.Gxi.MenuViewDataCurMainType &&
		(GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
			GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform())
			? (this.GetItem(3)?.SetUIActive(!0), this.Vxi())
			: this.GetItem(3)?.SetUIActive(!1),
			(this.Gxi.MenuViewDataLastSubType = 0),
			this.Jxi(),
			this.zxi(e);
	}
	jxi(e) {
		var t = this.GetItem(3)?.GetAttachUIChildren().Get(1);
		LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
	}
	Hxi(e, t) {
		var i = this.GetItem(3),
			n = i?.GetAttachUIChildren().Get(3);
		if (n) {
			var a = n.GetAttachUIChildren();
			n = i?.GetAttachUIChildren().Get(4);
			if (n) {
				var o = n.Width,
					r = [0, 0, 0, 0, 0];
				if (100 <= e) for (let e = 0; e < a.Num(); e++) r[e] = o;
				else if (80 <= e) {
					for (let e = 0; e < a.Num() - 1; e++) r[e] = o;
					r[4] = o * ((5 * (e - 80)) / 100);
				} else if (60 <= e) {
					for (let e = 0; e < a.Num() - 2; e++) r[e] = o;
					r[3] = o * ((5 * (e - 60)) / 100);
				} else if (40 <= e) {
					for (let e = 0; e < a.Num() - 3; e++) r[e] = o;
					r[2] = o * ((5 * (e - 40)) / 100);
				} else if (20 <= e) {
					for (let e = 0; e < a.Num() - 4; e++) r[e] = o;
					r[1] = o * ((5 * (e - 20)) / 100);
				} else r[0] = o * ((5 * e) / 100);
				for (let e = 0; e < a.Num(); e++) {
					var s = a.Get(e);
					s.SetWidth(r[e]), this.SetSpriteByPath(t, s, !1);
				}
			}
		}
	}
	Jxi() {
		for (const e of this.bxi) this.Nxi.Put(e);
		this.bxi = [];
	}
	Zxi(e, t) {
		let i = this.Nxi.Get();
		((i = void 0 === i ? this.Nxi.Create() : i).Type = t),
			(i.Data = e),
			this.bxi.push(i);
	}
	zxi(e) {
		for (const t of e)
			t.CheckCondition() &&
				(t.MenuDataSubType !== this.Gxi.MenuViewDataLastSubType &&
					((this.Gxi.MenuViewDataLastSubType = t.MenuDataSubType),
					this.Zxi(t, 0)),
				this.Zxi(t, 1));
		this.xqe.RefreshByData(this.bxi), this.xqe.BindLateUpdate(this.$xi);
	}
}
exports.MenuView = MenuView;
