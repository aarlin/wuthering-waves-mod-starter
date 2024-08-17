"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateIdle extends WuYinQuBattleStateBase_1.default {
	OnStart() {
		this.OnEnter(0);
	}
	OnEnter(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderBattle", 12, "进入idle状态"),
			(this.Owner.当前状态 = "静止状态");
	}
	OnUpdate(e) {}
	OnExit(e) {}
}
exports.default = WuYinQuBattleStateIdle;
