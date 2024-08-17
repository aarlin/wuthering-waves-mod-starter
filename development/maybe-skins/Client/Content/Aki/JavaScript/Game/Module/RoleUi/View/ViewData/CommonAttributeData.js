"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonAttributeData = void 0);
const ScrollViewDataBase_1 = require("../../../Util/ScrollView/ScrollViewDataBase");
class CommonAttributeData extends ScrollViewDataBase_1.ScrollViewDataBase {
	constructor() {
		super(...arguments),
			(this.AttrIconTexture = ""),
			(this.AttrNameText = ""),
			(this.AttrBaseValue = ""),
			(this.AttrAddValue = ""),
			(this.DetailText = ""),
			(this.NeedUpArrow = !1);
	}
}
exports.CommonAttributeData = CommonAttributeData;
