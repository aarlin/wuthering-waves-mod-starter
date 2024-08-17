"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonPopViewBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent"),
	UiPanelBase_1 = require("../Base/UiPanelBase"),
	UiManager_1 = require("../UiManager");
class CommonPopViewBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.dur = void 0),
			(this.Cur = !0),
			(this.gur = void 0),
			(this.ContentItem = void 0),
			(this.ViewInfo = void 0),
			(this.OnClickBtnBtnCall = () => {}),
			(this.fur = !1),
			(this.OnClickMaskButton = () => {
				this.Cur && this.TryHideSelf();
			}),
			(this.OnClickCloseBtn = () => {
				this.TryHideSelf();
			});
	}
	AttachItem(t, e) {
		var r,
			o,
			i,
			n,
			s,
			h,
			a = this.GetAttachParent();
		a &&
			((r = t.GetAnchorHAlign()),
			(o = t.GetAnchorVAlign()),
			(i = t.GetStretchBottom()),
			(n = t.GetStretchLeft()),
			(s = t.GetStretchRight()),
			(h = t.GetStretchTop()),
			t.SetUIParent(a),
			t.SetAnchorAlign(r, o),
			t.SetStretchBottom(i),
			t.SetStretchLeft(n),
			t.SetStretchRight(s),
			t.SetStretchTop(h),
			e !== t) &&
			(e.SetAnchorAlign(r, o),
			e.SetStretchBottom(i),
			e.SetStretchLeft(n),
			e.SetStretchRight(s),
			e.SetStretchTop(h));
	}
	GetAttachParent() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("UiCommon", 28, "子类没有重写获取父物体方法");
	}
	GetCostParent() {}
	SetViewInfo(t) {
		this.ViewInfo = t;
	}
	SetPopupViewBase() {
		this.gur = this;
	}
	TryHideSelf() {
		this.pur();
	}
	OverrideBackBtnCallBack(t) {
		(this.OnClickBtnBtnCall = t), (this.fur = !0);
	}
	pur() {
		this.fur
			? this.OnClickBtnBtnCall()
			: UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
	}
	SetCloseBtnInteractive(t) {
		this.gur.OnSetCloseBtnInteractive(t);
	}
	SetHelpButtonActive(t) {
		this.gur.OnSetHelpButtonActive(t);
	}
	SetTitleByTextIdAndArg(t, ...e) {
		this.gur.OnSetTitleByTextIdAndArg(t, e);
	}
	SetBackBtnShowState(t) {
		this.gur.OnSetBackBtnShowState(t);
	}
	RefreshCost(t) {
		this.gur.OnRefreshCost(t);
	}
	SetMaskResponsibleState(t) {
		this.Cur = t;
	}
	async SetCurrencyItemList(t) {
		var e = this.GetCostParent();
		e
			? (this.dur ||
					(this.dur =
						new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
							e,
						)),
				await this.dur.SetCurrencyItemList(t))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCommon", 28, "找不到CostParent");
	}
	GetCurrencyComponent() {
		return this.dur;
	}
	SetTitleVisible(t) {}
	SetTitleText(t) {}
	SetTexBgVisible(t) {}
}
exports.CommonPopViewBase = CommonPopViewBase;
