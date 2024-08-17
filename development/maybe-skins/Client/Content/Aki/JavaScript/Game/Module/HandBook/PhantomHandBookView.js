"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomHandBookView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	HandBookBaseView_1 = require("./HandBookBaseView"),
	HandBookCommonItem_1 = require("./HandBookCommonItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	HandBookFetterItem_1 = require("./HandBookFetterItem"),
	HandBookPhantomItem_1 = require("./HandBookPhantomItem"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PhantomHandBookView extends HandBookBaseView_1.HandBookBaseView {
	constructor() {
		super(...arguments),
			(this.oei = []),
			(this.rei = []),
			(this.nei = []),
			(this.Bzt = []),
			(this.sei = void 0),
			(this.bzt = void 0),
			(this.Refresh = () => {
				this.RefreshTabComponent(),
					this.RefreshPhantomTitle(),
					this.RefreshPhantom(),
					this.RefreshCollectText(),
					this.RefreshLockText();
			}),
			(this.OnHandBookRead = (e, t) => {
				if (1 === e) {
					var o = this.Bzt.length;
					for (let e = 0; e < o; e++) {
						var n = this.Bzt[e],
							a = n.GetData();
						if (a.Config.Id === t) {
							(a.IsNew = !1), n.SetNewFlagVisible(!1);
							break;
						}
					}
				}
			}),
			(this.TabToggleCallBack = (e) => {
				this.SetDefaultState(),
					this.GetItem(0).SetUIActive(!0),
					(e = this.oei[e].Id),
					0 === (this.sei = e)
						? (this.RefreshPhantomTitle(), this.RefreshPhantom())
						: (this.RefreshPhantomFetterTitle(), this.RefreshPhantomFetter());
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
				e = e.MediumItemGrid.GridIndex;
				this.ScrollViewCommon.DeselectCurrentGridProxy(),
					this.ScrollViewCommon.SelectGridProxy(e),
					this.ScrollViewCommon.RefreshGridProxy(e),
					t.IsLock
						? this.SetLockState(!0)
						: (this.SetLockState(!1), this.RefreshPhantomContent(t));
			}),
			(this.TabItemProxyCreate = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.aZt = (e, t) => e.Id - t.Id),
			(this.InitHandBookPhantom = (e, t, o) => {
				var n = new HandBookPhantomItem_1.HandBookPhantomItem();
				return (
					n.Initialize(e, t),
					n.BindToggleCallback(this.OnPhantomToggleClick),
					this.nei.push(n),
					{ Key: o, Value: n }
				);
			}),
			(this.OnPhantomToggleClick = (e) => {
				var t, o;
				0 !== this.sei &&
					((t = e.Config),
					this.SetLockState(!1),
					e.IsNew &&
						HandBookController_1.HandBookController.SendIllustratedReadRequest(
							1,
							t.ItemId,
						),
					(o =
						ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfigById(
							t.MonsterId,
						))
						? e.IsLock ||
							HandBookController_1.HandBookController.SetPhantomMeshShow(
								o.Id,
								this.qzt,
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Role",
								8,
								"怪物id为:" + t.MonsterId + "对应声骸图鉴数据找不到！",
							));
			}),
			(this.InitHandBookFetterItem = () => {
				var e = new HandBookFetterItem_1.HandBookFetterItem();
				return e.BindFetterToggleCallback(this.GZt), this.rei.push(e), e;
			}),
			(this.GZt = (e) => {
				var t = e.GetGirdIndex();
				this.ScrollViewFetter.DeselectCurrentGridProxy(),
					this.ScrollViewFetter.SelectGridProxy(t),
					this.ScrollViewFetter.RefreshGridProxy(t),
					(t = e.GetPhantomFetter()),
					(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name));
				this.SetNameText(e),
					this.RefreshPhantomFetterLayout(t),
					this.RefreshHandBookPhantomLayout(t);
			}),
			(this.qzt = void 0);
	}
	OnStart() {
		this.SetDefaultState(), this.Refresh();
	}
	OnAfterShow() {
		this.bzt =
			UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
				"1062",
			);
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
	RefreshPhantomContent(e) {
		var t, o, n, a;
		1 !== this.sei &&
			(this.GetVerticalLayout(18).RootUIComp.SetUIActive(!1),
			(a = e.Config),
			(o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
				1,
				a.Id,
			)) && this.SetDateText(o.CreateTime),
			e.IsNew &&
				HandBookController_1.HandBookController.SendIllustratedReadRequest(
					1,
					a.Id,
				),
			(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Name)),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				a.TypeDescrtption,
			)),
			(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Intensity)),
			(n = []).push(t, e),
			this.SetNameText(o),
			this.InitInfoItemLayout(n),
			HandBookController_1.HandBookController.SetPhantomMeshShow(
				a.Id,
				this.qzt,
			),
			(t = []),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Title1)),
			(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Descrtption1)),
			(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Title2)),
			(a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Descrtption2)),
			t.push(
				new HandBookDefine_1.HandBookContentItemData(e, o),
				new HandBookDefine_1.HandBookContentItemData(n, a),
			),
			this.InitContentItemLayout(t));
	}
	RefreshPhantom() {
		this.RefreshCollectText(), this.GetItem(26).SetUIActive(!0);
		var e =
				ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig(),
			t = [],
			o = e.length;
		for (let m = 0; m < o; m++) {
			var n,
				a,
				i = e[m],
				r = new HandBookDefine_1.HandBookCommonItemData(),
				s =
					((r.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						i.TypeDescrtption,
					)),
					ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfigListByMonsterId(
						i.Id,
					));
			!s ||
				s.length <= 0 ||
				((s = s[0]),
				(n =
					void 0 ===
					(a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
						1,
						s.MonsterId,
					))),
				(a = void 0 !== a && !a.IsRead),
				(r.Icon = s.IconSmall),
				(r.Config = i),
				(r.IsLock = n),
				(r.IsNew = a),
				t.push(r));
		}
		(this.Bzt = []), this.InitScrollViewByCommonItem(t);
	}
	GetTabItemData(e) {
		var t = e.length,
			o = new Array();
		for (let e = 0; e < t; e++) {
			var n = new CommonTabItemBase_1.CommonTabItemData();
			0 === (n.Index = e) && (n.RedDotName = "PhantomHandBook"),
				(n.Data = this.TabList[e]),
				o.push(n);
		}
		return o;
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(1);
		this.SetCollectText(e[0], e[1]);
	}
	RefreshLockText() {
		var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
			"PhantomHandBookLock",
		);
		this.SetLockText(e);
	}
	RefreshTabComponent() {
		(this.oei = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookPageConfig(),
		)),
			this.oei.sort(this.aZt);
		var e = this.oei.length,
			t = [];
		for (let n = 0; n < e; n++) {
			var o = this.oei[n];
			t.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
		}
		this.InitTabComponent(t), this.SetTabToggleCallBack(this.TabToggleCallBack);
	}
	RefreshPhantomTitle() {
		var e =
			ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
		this.InitCommonTabTitle(
			e.TitleIcon,
			new CommonTabTitleData_1.CommonTabTitleData(e.Name),
		);
	}
	RefreshPhantomFetterTitle() {
		var e =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Fetter"),
			t =
				ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
					1,
				);
		this.InitCommonTabTitle(
			t.TitleIcon,
			new CommonTabTitleData_1.CommonTabTitleData(e),
		);
	}
	RefreshPhantomFetter() {
		this.GetItem(26).SetUIActive(!0), this.GetText(23).SetUIActive(!1);
		var e =
				ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomFetterHandBookConfig(),
			t = [],
			o = e.length;
		for (let a = 0; a < o; a++) {
			var n = e[a];
			n =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
					n.Id,
				);
			t.push(n);
		}
		(this.rei = []),
			this.InitScrollViewByFetterItem(t),
			this.InitToggleState(),
			this.GetText(17).SetUIActive(!1);
	}
	InitToggleState() {
		var e = this.rei.length;
		for (let o = 0; o < e; o++) {
			var t = this.rei[o];
			0 === o
				? (t.SetToggleStateForce(1), t.OnSelected(!0))
				: t.SetToggleStateForce(0);
		}
	}
	RefreshHandBookPhantomLayout(e) {
		this.InitHandBookPhantomLayout([]),
			this.RefreshHandBookPhantomItemToggleState();
	}
	RefreshHandBookPhantomItemToggleState() {
		var e = this.nei.length;
		if (0 !== e)
			for (let o = 0; o < e; o++) {
				var t = this.nei[o];
				0 === o
					? (t.SetToggleStateForce(1), t.OnSelected(!0))
					: t.SetToggleStateForce(0);
			}
	}
	RefreshPhantomFetterLayout(e) {
		var t = [],
			o = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"FetterEffectDescription",
			),
			n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				e.EffectDescription,
			),
			a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"FetterEffectDefineDescription",
			);
		e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			e.EffectDefineDescription,
		);
		t.push(
			new HandBookDefine_1.HandBookContentItemData(o, n),
			new HandBookDefine_1.HandBookContentItemData(a, e),
		),
			this.InitContentItemLayout(t);
	}
	OnBeforePlayCloseSequence() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
			this.bzt,
		);
	}
	OnBeforeCreate() {
		UiSceneManager_1.UiSceneManager.InitPhantomObserver(),
			(this.qzt = UiSceneManager_1.UiSceneManager.GetPhantomObserver());
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyPhantomObserver(),
			(this.qzt = void 0),
			(this.oei = []),
			(this.rei = []),
			(this.nei = []),
			(this.Bzt = []);
	}
}
exports.PhantomHandBookView = PhantomHandBookView;
