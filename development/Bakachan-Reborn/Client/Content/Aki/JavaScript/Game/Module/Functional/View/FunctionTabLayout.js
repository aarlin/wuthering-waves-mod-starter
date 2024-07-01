"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionTabLayout = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class FunctionTabItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
	}
	SetToggleState(e) {
		this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, !1);
	}
}
class FunctionTabLayout extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.B9t = void 0),
			(this.b9t = -1),
			(this.q9t = 0),
			(this.Z3e = (e, t, i) => ({ Key: i, Value: new FunctionTabItem(t) })),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILayoutBase],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.B9t = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(0),
			this.Z3e,
			this.GetItem(1),
		);
	}
	OnBeforeDestroy() {
		this.B9t.ClearChildren();
	}
	RefreshTab(e) {
		1 < (this.q9t = e)
			? (this.SetActive(!0), this.B9t.RebuildLayoutByDataNew(void 0, e))
			: this.SetActive(!1);
	}
	SetToggleSelectByIndex(e) {
		if (!(this.q9t <= 1) && this.b9t !== e) {
			if (-1 !== this.b9t) {
				this.B9t.GetLayoutItemByKey(this.b9t).SetToggleState(!1);
			}
			this.B9t.GetLayoutItemByKey(e).SetToggleState(!0), (this.b9t = e);
		}
	}
}
exports.FunctionTabLayout = FunctionTabLayout;
