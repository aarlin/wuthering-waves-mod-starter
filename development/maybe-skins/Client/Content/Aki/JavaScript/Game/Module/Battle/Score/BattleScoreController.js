"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleScoreController = void 0);
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../../Core/Net/Net"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class BattleScoreController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return Net_1.Net.Register(20872, this.tyn), !0;
	}
	static OnClear() {
		return Net_1.Net.UnRegister(20872), !0;
	}
}
(exports.BattleScoreController = BattleScoreController).tyn = (e) => {
	ModelManager_1.ModelManager.BattleScoreModel?.HandleBattleScoreNotify(e);
};
