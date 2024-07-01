"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashCollectStarItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CalabashCollectStarItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	Refresh(t, e, r) {
		this.GetItem(0)?.SetUIActive(t);
	}
}
exports.CalabashCollectStarItem = CalabashCollectStarItem;
