"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeographyHandBookView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../Ui/UiManager"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	GeographyHandBookItem_1 = require("./GeographyHandBookItem"),
	HandBookController_1 = require("./HandBookController"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RoleRootUiCameraHandleData = void 0),
			(this.GenericLayout = void 0),
			(this.pZt = []),
			(this.vZt = []),
			(this.lqe = void 0),
			(this.Refresh = () => {
				this.InitVerticalLayout(), this.RefreshCollectText();
			}),
			(this.MZt = (e, t, o) => (
				(t = new GeographyHandBookItem_1.GeographyHandBookItem(t)).Refresh(
					e,
					!1,
					o,
				),
				this.vZt.push(t),
				{ Key: o, Value: t }
			)),
			(this.aZt = (e, t) => e.Id - t.Id),
			(this.SZt = (e, t) => e.Id - t.Id),
			(this.JSt = () => {
				UiManager_1.UiManager.CloseView("GeographyHandBookView");
			}),
			(this.OnHandBookRead = (e, t) => {
				if (2 === e) {
					var o = this.vZt.length;
					for (let e = 0; e < o; e++) {
						var n = this.vZt[e].GetChildItemList(),
							i = n.length;
						for (let e = 0; e < i; e++) {
							var a = n[e];
							if (a.GetData().Config.Id === t) return void a.SetNewState(!1);
						}
					}
				}
			}),
			(this.OnGeographyPhotoSelect = (e) => {
				var t = ConfigCommon_1.ConfigCommon.ToList(
						ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig(),
					),
					o = (t.sort(this.SZt), this.GetScrollViewWithScrollbar(3)),
					n = t.length;
				let i;
				for (let o = 0; o < n; o++) {
					var a = t[o];
					if (a.Id === e) {
						i = a;
						break;
					}
				}
				var r = this.vZt.length;
				for (let e = 0; e < r; e++) {
					var s = this.vZt[e].GetChildItemList(),
						h = s.length;
					for (let e = 0; e < h; e++) {
						var l = s[e],
							v = l.GetData().Config;
						v.Id === i.Id && v.Type === i.Type
							? (l.SetToggleState(1), o.ScrollTo(l.GetRootItem()))
							: l.SetToggleState(0);
					}
				}
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UIText],
			[3, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	OnStart() {
		this.Refresh(), this.InitCommonTabTitle();
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
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnGeographyPhotoSelect,
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
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnGeographyPhotoSelect,
			);
	}
	OnBeforeShow() {
		let e = !0;
		for (const o of this.vZt)
			for (const n of o.GetChildItemList()) {
				var t = n.GetTog();
				e && n.GetIsUnlock()
					? (t.SetToggleStateForce(1, !1, !0), (e = !1))
					: t.SetToggleStateForce(0, !1, !0);
			}
	}
	InitCommonTabTitle() {
		var e =
			ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(2);
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.JSt),
			this.lqe.SetTitleLocalText(e.Name),
			this.lqe.SetTitleIcon(e.TitleIcon);
	}
	InitVerticalLayout() {
		var e = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfigList(),
		);
		e.sort(this.aZt),
			(this.pZt = e),
			(this.vZt = []),
			this.GenericLayout ||
				(this.GenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
					this.GetVerticalLayout(1),
					this.MZt,
				)),
			this.GenericLayout.ClearChildren(),
			this.GenericLayout.RebuildLayoutByDataNew(this.pZt);
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(2);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
			this.GetText(2)?.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.RoleRootUiCameraHandleData = void 0),
			this.GenericLayout &&
				(this.GenericLayout.ClearChildren(), (this.GenericLayout = void 0)),
			(this.pZt = []),
			(this.vZt = []);
	}
}
exports.GeographyHandBookView = GeographyHandBookView;
