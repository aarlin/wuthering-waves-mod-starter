"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PageDot = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class PageDot extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	OnStart() {
		this.UpdateShow(!1);
	}
	Refresh(t) {}
	UpdateShow(t) {
		this.GetItem(0).SetUIActive(t);
	}
}
exports.PageDot = PageDot;
