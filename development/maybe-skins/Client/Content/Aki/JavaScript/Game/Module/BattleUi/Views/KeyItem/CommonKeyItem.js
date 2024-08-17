"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonKeyItem = void 0);
const UE = require("ue"),
	KeyItemBase_1 = require("./KeyItemBase");
class CommonKeyItem extends KeyItemBase_1.KeyItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	GetKeyText() {}
	GetKeyTexture() {
		return this.GetTexture(0);
	}
	OnSetGray() {
		var e = this.GetKeyTexture();
		e.SetChangeColor(this.IsGray, e.changeColor);
	}
}
exports.CommonKeyItem = CommonKeyItem;
