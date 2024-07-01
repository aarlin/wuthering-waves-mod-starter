"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	HandBookBaseView_1 = require("./HandBookBaseView"),
	HandBookCommonItem_1 = require("./HandBookCommonItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine");
class WeaponHandBookView extends HandBookBaseView_1.HandBookBaseView {
	constructor() {
		super(...arguments),
			(this.wzt = []),
			(this.Bzt = []),
			(this.bzt = void 0),
			(this.OnHandBookRead = (e, n) => {
				if (3 === e) {
					var t = this.Bzt.length;
					for (let e = 0; e < t; e++) {
						var o = this.Bzt[e];
						if (o.GetData().Config.Id === n) {
							o.SetNewFlagVisible(!1);
							break;
						}
					}
				}
			}),
			(this.InitHandBookCommonItem = () => {
				var e = new HandBookCommonItem_1.HandBookCommonItem();
				return (
					e.BindOnExtendToggleStateChanged(this.OnToggleClick),
					this.Bzt.push(e),
					e
				);
			}),
			(this.OnToggleClick = (e) => {
				var n,
					t = e.Data;
				e = e.MediumItemGrid.GridIndex;
				this.ScrollViewCommon.DeselectCurrentGridProxy(),
					this.ScrollViewCommon.SelectGridProxy(e),
					this.ScrollViewCommon.RefreshGridProxy(e),
					t.IsLock
						? this.SetLockState(!0)
						: (this.SetLockState(!1),
							(e = t.Config),
							(n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								3,
								e.Id,
							)) && this.SetDateText(n.CreateTime),
							t.IsNew &&
								HandBookController_1.HandBookController.SendIllustratedReadRequest(
									3,
									e.Id,
								),
							(n =
								ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
									e.Id,
								)),
							(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								n.WeaponName,
							)),
							this.SetNameText(t),
							(t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
								n.WeaponType,
							)),
							this.SetTypeText(t),
							this.RefreshContentItemLayout(e),
							this.RefreshAttributeItemLayout(e),
							HandBookController_1.HandBookController.SetWeaponMeshShow(
								e.Id,
								this.qzt,
							));
			}),
			(this.Refresh = () => {
				this.wzt =
					ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
				var e = [],
					n = this.wzt.length;
				for (let s = 0; s < n; s++) {
					var t = this.wzt[s],
						o =
							void 0 ===
							(a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								3,
								t.Id,
							)),
						a = void 0 !== a && !a.IsRead,
						i = new HandBookDefine_1.HandBookCommonItemData(),
						r =
							ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
								t.Id,
							);
					(i.Icon = r.IconSmall),
						(i.QualityId = r.QualityId),
						(i.ConfigId = t.Id),
						(i.Config = t),
						(i.IsLock = o),
						(i.IsNew = a),
						e.push(i);
				}
				this.InitScrollViewByCommonItem(e);
				var s =
					ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
						3,
					);
				this.InitCommonTabTitle(
					s.TitleIcon,
					new CommonTabTitleData_1.CommonTabTitleData(s.Name),
				),
					this.RefreshCollectText();
			}),
			(this.qzt = void 0);
	}
	OnStart() {
		this.SetDefaultState(), this.Refresh(), this.RefreshLockText();
	}
	OnAfterShow() {
		this.bzt =
			UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
				"1060",
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
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(3);
		this.SetCollectText(e[0], e[1]);
	}
	RefreshLockText() {
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"WeaponHandBookLock",
			);
		this.SetLockText(e);
	}
	RefreshAttributeItemLayout(e) {
		var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
				e.Id,
			),
			t = [],
			o = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
				n.FirstCurve,
				n.FirstPropId.Value,
				e.Level,
				e.Breach,
			);
		(o = {
			Id: n.FirstPropId.Id,
			IsRatio: n.FirstPropId.IsRatio,
			CurValue: o,
			BgActive: !0,
		}),
			(e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
				n.SecondCurve,
				n.SecondPropId.Value,
				e.Level,
				e.Breach,
			)),
			(n = {
				Id: n.SecondPropId.Id,
				IsRatio: n.SecondPropId.IsRatio,
				CurValue: e,
				BgActive: !0,
			});
		t.push(o, n), this.InitAttributeLayout(t);
	}
	RefreshContentItemLayout(e) {
		var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
				e.Id,
			),
			t = [],
			o =
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"WeaponDescrtption",
				),
			a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				n.AttributesDescription,
			),
			i =
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"EffectDescrtption",
				);
		(e = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
			n,
			e.Resonance,
		)),
			(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Desc)),
			(n = StringUtils_1.StringUtils.Format(n, ...e));
		t.push(
			new HandBookDefine_1.HandBookContentItemData(o, a),
			new HandBookDefine_1.HandBookContentItemData(i, n),
		),
			this.InitContentItemLayout(t);
	}
	GetTabItemData(e) {
		var n = new Array(),
			t = this.TabList.length;
		for (let e = 0; e < t; e++) {
			var o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = e), (o.Data = this.TabList[e]), n.push(o);
		}
		return n;
	}
	OnBeforePlayCloseSequence() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
			this.bzt,
		);
	}
	OnBeforeCreate() {
		this.qzt = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.qzt),
			(this.qzt = void 0),
			(this.wzt = []),
			(this.Bzt = []);
	}
}
exports.WeaponHandBookView = WeaponHandBookView;
