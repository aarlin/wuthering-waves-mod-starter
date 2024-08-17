"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ParkourExtraInfo = exports.GeneralLogicTreeNodeExtraInfo = void 0);
class GeneralLogicTreeNodeExtraInfo {
	constructor() {
		this.Type = void 0;
	}
}
class ParkourExtraInfo extends (exports.GeneralLogicTreeNodeExtraInfo =
	GeneralLogicTreeNodeExtraInfo) {
	constructor() {
		super(), (this.TotalScore = void 0), (this.Type = 1);
	}
}
exports.ParkourExtraInfo = ParkourExtraInfo;
