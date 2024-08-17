"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class ItemMaterialDataMap extends UE.Actor {
	constructor() {
		super(...arguments), (this.Map = new UE.TMap());
	}
}
exports.default = ItemMaterialDataMap;
