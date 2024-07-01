"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayImgItem = exports.InfoDisplayImgItemSt = void 0);
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class InfoDisplayImgItemSt {
	constructor() {
		(this.Index = 0), (this.Image = ""), (this.Desc = "");
	}
}
exports.InfoDisplayImgItemSt = InfoDisplayImgItemSt;
class InfoDisplayImgItem extends GridProxyAbstract_1.GridProxyAbstract {
	Refresh(t, s, e) {}
}
exports.InfoDisplayImgItem = InfoDisplayImgItem;
