"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NormalHotKeyType = void 0);
const UE = require("ue"),
	HotKeyItemFactory_1 = require("../HotKeyItemFactory"),
	HotKeyTypeBase_1 = require("./HotKeyTypeBase");
class NormalHotKeyType extends HotKeyTypeBase_1.HotKeyTypeBase {
	constructor() {
		super(...arguments), (this.HotKeyComponent = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		this.HotKeyComponent =
			await HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyComponent(
				this.GetItem(0).GetOwner(),
				e[0],
				this,
			);
	}
	OnClear() {
		this.HotKeyComponent.Clear();
	}
	GetHotKeyComponents() {
		return [this.HotKeyComponent];
	}
	KeyItemNotifySetActive(e) {
		this.IsMultiKeyItem && this.SetActive(e);
	}
}
exports.NormalHotKeyType = NormalHotKeyType;
