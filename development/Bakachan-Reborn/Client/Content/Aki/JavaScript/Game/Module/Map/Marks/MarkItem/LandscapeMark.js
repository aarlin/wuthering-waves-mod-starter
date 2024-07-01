"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LandscapeMarkItem = void 0);
const LandscapeMarkItemView_1 = require("../MarkItemView/LandscapeMarkItemView"),
	ConfigMarkItem_1 = require("./ConfigMarkItem");
class LandscapeMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
	constructor(e, a, r, t, s, n = 1) {
		super(e, a, r, t, s, n);
	}
	OnCreateView() {
		this.InnerView = new LandscapeMarkItemView_1.LandscapeMarkItemView(this);
	}
}
exports.LandscapeMarkItem = LandscapeMarkItem;
