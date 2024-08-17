"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestHandBookView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../Ui/UiManager"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	HandBookController_1 = require("./HandBookController"),
	PlotHandBookItem_1 = require("./PlotHandBookItem"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class QuestHandBookView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.GenericLayout = void 0),
			(this.hei = []),
			(this.lqe = void 0),
			(this.Refresh = () => {
				this.InitVerticalLayout(), this.RefreshCollectText();
			}),
			(this.lei = (e, t, o) => (
				(t = new PlotHandBookItem_1.PlotHandBookItem(t)).Refresh(e, !1, o),
				{ Key: o, Value: t }
			)),
			(this.aZt = (e, t) => e.Id - t.Id),
			(this.JSt = () => {
				UiManager_1.UiManager.CloseView("QuestHandBookView");
			}),
			(this.OnPhotoSelect = (e) => {
				for (const o of this.GenericLayout?.GetLayoutItemList())
					for (const i of o.GetChildItemList()) {
						var t = i.GetTog();
						i.GetData()?.Config.Id === e
							? t.SetToggleStateForce(1, !1, !0)
							: t.SetToggleStateForce(0, !1, !0);
					}
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UIText],
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
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnPhotoSelect,
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
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnPhotoSelect,
			);
	}
	OnAfterShow() {}
	InitCommonTabTitle() {
		var e =
			ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(7);
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.JSt),
			this.lqe.SetTitleLocalText(e.Name),
			this.lqe.SetTitleIcon(e.TitleIcon);
	}
	InitVerticalLayout() {
		var e = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList(),
		);
		e.sort(this.aZt),
			(this.hei = e),
			this.GenericLayout ||
				(this.GenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
					this.GetVerticalLayout(1),
					this.lei,
				)),
			this.GenericLayout.ClearChildren(),
			this.GenericLayout.RebuildLayoutByDataNew(this.hei);
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(7);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
			this.GetText(2)?.SetUIActive(!1);
	}
	OnBeforeShow() {
		let e = !0;
		for (const o of this.GenericLayout?.GetLayoutItemList())
			for (const i of o.GetChildItemList()) {
				var t = i.GetTog();
				e && i.GetIsUnlock()
					? (t.SetToggleStateForce(1, !1, !0), (e = !1))
					: t.SetToggleStateForce(0, !1, !0);
			}
	}
	OnBeforeDestroy() {
		this.GenericLayout &&
			(this.GenericLayout.ClearChildren(), (this.GenericLayout = void 0)),
			(this.hei = []);
	}
}
exports.QuestHandBookView = QuestHandBookView;
