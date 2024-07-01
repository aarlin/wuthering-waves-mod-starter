"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerStarsSimpleItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerStarsSimpleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	Refresh(e, t, r) {
		this.GetItem(0).SetUIActive(e);
	}
}
exports.TowerStarsSimpleItem = TowerStarsSimpleItem;
