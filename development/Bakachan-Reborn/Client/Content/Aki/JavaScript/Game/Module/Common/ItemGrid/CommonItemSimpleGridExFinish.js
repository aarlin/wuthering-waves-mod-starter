"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemSimpleGridExFinish = void 0);
const UE = require("ue"),
	CommonItemSimpleGrid_1 = require("./CommonItemSimpleGrid");
class CommonItemSimpleGridExFinish extends CommonItemSimpleGrid_1.CommonItemSimpleGrid {
	constructor(e) {
		super(), e && this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([5, UE.UIItem]);
	}
	SetReceived(e) {
		this.GetItem(5).SetUIActive(e);
	}
}
exports.CommonItemSimpleGridExFinish = CommonItemSimpleGridExFinish;
