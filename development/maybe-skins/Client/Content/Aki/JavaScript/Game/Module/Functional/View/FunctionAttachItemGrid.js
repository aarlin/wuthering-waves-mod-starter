"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionAttachItemGrid = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	FunctionItem_1 = require("./FunctionItem");
class FunctionAttachItemGrid extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments), (this.P9t = !1);
	}
	OnRefreshItem(t) {
		t &&
			(this.Layout?.SetNeedAnim(this.P9t),
			this.Layout?.RebuildLayoutByDataNew(t),
			(this.P9t = !1));
	}
	OnSelect() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.FunctionGridSelected,
			this.GetCurrentShowItemIndex(),
		);
	}
	OnUnSelect() {}
	OnMoveItem() {}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILayoutBase],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(0),
			(t, e, n) => this.x9t(t, e, n),
			this.GetItem(1),
		);
	}
	x9t(t, e, n) {
		return (
			(e = new FunctionItem_1.FunctionItem(e)).UpdateItem(t),
			{ Key: t, Value: e }
		);
	}
	SetNeedAnim(t) {
		this.P9t = t;
	}
	OnBeforeDestroy() {
		this.Layout.ClearGridController();
		for (const t of this.Layout.GetLayoutItemList()) this.AddChild(t);
	}
	GetFunctionItem(t) {
		return this.Layout.GetLayoutItemByKey(t);
	}
}
exports.FunctionAttachItemGrid = FunctionAttachItemGrid;
