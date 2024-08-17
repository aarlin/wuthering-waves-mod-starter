"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SingleHotKeyItem = void 0);
const HotKeyItem_1 = require("./HotKeyItem"),
	HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class SingleHotKeyItem extends HotKeyItem_1.HotKeyItem {
	constructor() {
		super(...arguments), (this.kbo = void 0);
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		this.kbo = await HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(
			this.GetRootActor(),
			e,
			!1,
		);
	}
	OnClear() {
		this.kbo.Clear();
	}
	GetHotKeyComponentArray() {
		return this.kbo ? this.kbo.GetHotKeyComponents() : [];
	}
}
exports.SingleHotKeyItem = SingleHotKeyItem;
