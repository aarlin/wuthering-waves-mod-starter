"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
	HandBookBaseView_1 = require("./HandBookBaseView"),
	HandBookCommonItem_1 = require("./HandBookCommonItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class ItemHandBookView extends HandBookBaseView_1.HandBookBaseView {
	constructor() {
		super(...arguments),
			(this.ZZt = []),
			(this.Bzt = []),
			(this.Refresh = () => {
				this.RefreshScrollView(this.GetFirstPageType());
			}),
			(this.OnHandBookRead = (e, t) => {
				if (5 === e) {
					var o = this.Bzt.length;
					for (let e = 0; e < o; e++) {
						var n = this.Bzt[e];
						if (n.GetData().Config.Id === t) {
							n.SetNewFlagVisible(!1);
							break;
						}
					}
				}
			}),
			(this.TabToggleCallBack = (e) => {
				(e = this.ZZt[e].Id), this.RefreshScrollView(e);
			}),
			(this.InitHandBookCommonItem = () => {
				var e = new HandBookCommonItem_1.HandBookCommonItem();
				return (
					this.Bzt.push(e),
					e.BindOnExtendToggleStateChanged(this.OnToggleClick),
					e
				);
			}),
			(this.OnToggleClick = (e) => {
				var t = e.Data;
				(e = e.MediumItemGrid.GridIndex),
					this.ScrollViewCommon.DeselectCurrentGridProxy(),
					this.ScrollViewCommon.SelectGridProxy(e),
					this.ScrollViewCommon.RefreshGridProxy(e),
					(e = t.Config);
				this.RefreshTitleText(e.Id),
					t.IsLock
						? this.SetItemLockState(!0)
						: (this.SetItemLockState(!1), this.RefreshItemContent(t));
			}),
			(this.TabItemProxyCreate = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.aZt = (e, t) => e.Id - t.Id);
	}
	OnStart() {
		this.SetDefaultState(),
			this.RefreshTabComponent(),
			this.RefreshItemTitle(),
			this.RefreshCollectText(),
			this.RefreshLockText(),
			this.RefreshScrollView(this.GetFirstPageType());
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	SetItemLockState(e) {
		this.SetLockState(e), this.GetTexture(25).SetUIActive(!e);
	}
	RefreshItemContent(e) {
		var t = e.Config,
			o =
				((e =
					(e.IsNew &&
						HandBookController_1.HandBookController.SendIllustratedReadRequest(
							5,
							t.Id,
						),
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id))),
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name));
		this.SetNameText(o),
			this.SetItemTexture(e.IconMiddle),
			(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title)),
			(t = []).push(o),
			this.InitInfoItemLayout(t),
			(o = []),
			(t =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.BgDescription) ??
				"");
		o.push(new HandBookDefine_1.HandBookContentItemData("", t)),
			this.InitContentItemLayout(o),
			this.RefreshOwnText(e.Id);
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(5);
		this.SetCollectText(e[0], e[1]);
	}
	RefreshLockText() {
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("ItemHandBookLock");
		this.SetLockText(e);
	}
	RefreshOwnText(e) {
		(e = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(5, e)),
			this.SetOwnText(e.Num);
	}
	GetFirstTypeId() {
		return ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList()[0]
			.Id;
	}
	RefreshScrollView(e) {
		if (e) {
			var t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigByType(
						e,
					),
				o = [],
				n = t.length;
			for (let e = 0; e < n; e++) {
				var a = t[e],
					i =
						void 0 ===
						(r = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
							5,
							a.Id,
						)),
					r = void 0 !== r && !r.IsRead,
					m = new HandBookDefine_1.HandBookCommonItemData(),
					s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(a.Id);
				(m.Icon = s.IconSmall),
					(m.QualityId = s.QualityId),
					(m.ConfigId = s.Id),
					(m.IsLock = i),
					(m.IsNew = r),
					(m.Config = a),
					o.push(m);
			}
			this.InitScrollViewByCommonItem(o);
		}
	}
	GetFirstPageType() {
		if (0 !== this.ZZt.length) return this.ZZt[0].Id;
	}
	RefreshTabComponent() {
		(this.ZZt = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
		)),
			this.ZZt.sort(this.aZt);
		var e = this.ZZt.length,
			t = [];
		for (let n = 0; n < e; n++) {
			var o = this.ZZt[n];
			t.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
		}
		this.InitTabComponent(t), this.SetTabToggleCallBack(this.TabToggleCallBack);
	}
	RefreshItemTitle() {
		var e =
			ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(5);
		this.InitCommonTabTitle(
			e.TitleIcon,
			new CommonTabTitleData_1.CommonTabTitleData(e.Name),
		);
	}
	RefreshTitleText(e) {
		(e =
			ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
				e,
			)),
			(e =
				ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfig(
					e.Type,
				)),
			this.UpdateTitle(
				new CommonTabTitleData_1.CommonTabTitleData(e.Descrtption),
			);
	}
	GetTabItemData(e) {
		var t = e.length,
			o = new Array();
		for (let e = 0; e < t; e++) {
			var n = new CommonTabItemBase_1.CommonTabItemData();
			(n.Index = e),
				(n.RedDotName = "ItemHandBook"),
				(n.RedDotUid = this.ZZt[e].Id),
				(n.Data = this.TabList[e]),
				o.push(n);
		}
		return o;
	}
	OnBeforeDestroy() {
		(this.ZZt = []), (this.Bzt = []);
	}
}
exports.ItemHandBookView = ItemHandBookView;
