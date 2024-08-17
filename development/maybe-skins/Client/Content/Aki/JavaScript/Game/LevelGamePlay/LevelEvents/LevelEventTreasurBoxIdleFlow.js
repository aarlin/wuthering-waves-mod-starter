"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventTreasurBoxIdleFlow = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventTreasurBoxIdleFlow extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, l) {}
	ExecuteNew(e, l, r) {
		e && LevelGeneralNetworks_1.LevelGeneralNetworks.RequestDoAction(r, l);
	}
}
exports.LevelEventTreasurBoxIdleFlow = LevelEventTreasurBoxIdleFlow;
