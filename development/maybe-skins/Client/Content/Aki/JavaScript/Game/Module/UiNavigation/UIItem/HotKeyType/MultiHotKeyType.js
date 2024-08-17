"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiHotKeyType = void 0);
const UE = require("ue"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	HotKeyItemFactory_1 = require("../HotKeyItemFactory"),
	HotKeyTypeBase_1 = require("./HotKeyTypeBase");
class MultiHotKeyType extends HotKeyTypeBase_1.HotKeyTypeBase {
	constructor() {
		super(...arguments),
			(this.Layout = void 0),
			(this.bbo = []),
			(this.qbo = (e, t, o) => ({
				Key: e,
				Value: HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyComponent(
					t.GetOwner(),
					e,
					this,
				),
			}));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UILayoutBase],
		];
	}
	async OnBeforeStartAsync() {
		this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(1),
			this.qbo,
			this.GetItem(0),
		);
		var e = this.OpenParam;
		this.Layout.RebuildLayoutByDataNew(e),
			(this.bbo = await Promise.all(this.Layout.GetLayoutItemList()));
	}
	OnClear() {
		for (const e of this.bbo) e.Clear();
	}
	GetHotKeyComponents() {
		return this.bbo;
	}
	KeyItemNotifySetActive(e) {
		let t = !1;
		for (const e of this.GetHotKeyComponents())
			if (e.IsHotKeyActive()) {
				t = !0;
				break;
			}
		this.SetActive(t);
	}
}
exports.MultiHotKeyType = MultiHotKeyType;
