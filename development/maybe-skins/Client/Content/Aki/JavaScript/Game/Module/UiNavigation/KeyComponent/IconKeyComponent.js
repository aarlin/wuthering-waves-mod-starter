"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.IconKeyComponent = void 0);
const UE = require("ue"),
	KeyComponent_1 = require("./KeyComponent");
class IconKeyComponent extends KeyComponent_1.KeyBaseComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[4, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[0, UE.UITexture],
			[5, UE.UITexture],
		];
	}
	GetNameText() {
		return this.GetText(4);
	}
	GetKeyTexture() {
		return this.GetTexture(0);
	}
	GetLongPressItem() {
		return this.GetItem(1);
	}
	GetCircleItem() {
		return this.GetItem(2);
	}
	GetSquareItem() {
		return this.GetItem(3);
	}
	GetLongPressTipTexture() {
		return this.GetTexture(5);
	}
}
exports.IconKeyComponent = IconKeyComponent;
