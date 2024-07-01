"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionNameText = void 0);
const UE = require("ue"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNameText {
	constructor(e) {
		(this.Hni = void 0), (this.Hni = e);
	}
	Update(e) {
		var i = e.GetMonsterName();
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.Hni, i),
			this.Hni.SetColor(UE.Color.FromHex(e.GetNameColor()));
	}
}
exports.VisionNameText = VisionNameText;
