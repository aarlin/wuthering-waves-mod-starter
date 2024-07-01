"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyKeyItem = void 0);
const UE = require("ue"),
	LongPressKeyItemBase_1 = require("./LongPressKeyItemBase");
class SpecialEnergyKeyItem extends LongPressKeyItemBase_1.LongPressKeyItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UIText],
		];
	}
	GetKeyText() {
		return this.GetText(3);
	}
	GetKeyTexture() {
		return this.GetTexture(0);
	}
	GetLongPressTexture() {
		return this.GetTexture(2);
	}
	GetLongPressItem() {
		return this.GetItem(1);
	}
}
exports.SpecialEnergyKeyItem = SpecialEnergyKeyItem;
