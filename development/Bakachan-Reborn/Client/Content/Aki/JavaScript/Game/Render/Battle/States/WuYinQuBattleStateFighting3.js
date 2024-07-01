"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	WuYinQuBattleStateFighting1_1 = require("./WuYinQuBattleStateFighting1");
class WuYinQuBattleStateFighting3 extends WuYinQuBattleStateFighting1_1.default {
	GetFightingData() {
		return this.Owner.WuYinQuFightingData.WuYinQuFightingData3;
	}
	OnEnter(t) {
		super.OnEnter(t),
			(this.Owner.当前状态 = "战斗阶段3"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderBattle", 12, "进入战斗阶段3");
	}
	OnUpdate(t) {
		super.OnUpdate(t);
	}
	OnExit(t) {
		super.OnExit(t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderBattle", 12, "退出战斗阶段3");
	}
}
exports.default = WuYinQuBattleStateFighting3;
