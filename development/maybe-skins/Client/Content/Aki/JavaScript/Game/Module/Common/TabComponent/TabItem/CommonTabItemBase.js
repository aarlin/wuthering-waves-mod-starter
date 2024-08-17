"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonTabItemBase = exports.CommonTabItemData = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class CommonTabItemData {
	constructor() {
		(this.Index = 0),
			(this.Data = void 0),
			(this.RedDotName = void 0),
			(this.RedDotUid = void 0);
	}
}
exports.CommonTabItemData = CommonTabItemData;
class CommonTabItemBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.CurrentData = void 0),
			(this.NBt = !1),
			(this.SelectedCallBack = void 0),
			(this.OBt = void 0),
			(this.T7e = () => {
				var e;
				return (
					!this.OBt ||
					((e = this.OBt(this.GridIndex, this.NBt)), (this.NBt = !1), e)
				);
			});
	}
	Refresh(e, t, a) {
		(this.CurrentData = e), this.OnRefresh(e, t, a);
	}
	OnRefresh(e, t, a) {}
	Clear() {
		this.OnClear();
	}
	OnClear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
	InitTabItem() {}
	OnStart() {
		this.GetTabToggle().CanExecuteChange.Bind(this.T7e);
	}
	SetSelectedCallBack(e) {
		this.SelectedCallBack = e;
	}
	SetCanExecuteChange(e) {
		this.OBt = e;
	}
	UpdateTabIcon(e) {
		this.OnUpdateTabIcon(e);
	}
	SetForceSwitch(e, t = !1) {
		(this.NBt = !0), this.SetToggleState(e, t);
	}
	SetToggleState(e, t = !1) {
		this.OnSetToggleState(e, t);
	}
}
exports.CommonTabItemBase = CommonTabItemBase;
