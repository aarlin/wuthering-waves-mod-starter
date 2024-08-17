"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattleViewGachaButton = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewGachaButton extends RedDotBase_1.RedDotBase {
	OnCheck() {
		return ModelManager_1.ModelManager.GachaModel.CheckNewGachaPool();
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnOpenGachaChanged];
	}
}
exports.RedDotBattleViewGachaButton = RedDotBattleViewGachaButton;
