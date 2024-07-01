"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceFlowBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class InstanceDungeonEntranceFlowBase {
	constructor() {
		(this.Lsi = new Array()), (this.Dsi = -1), this.OnCreate();
	}
	get rXt() {
		return 0 < this.Dsi && this.Dsi >= this.Lsi.length;
	}
	Rsi() {
		++this.Dsi,
			this.Dsi < 0 || this.Dsi >= this.Lsi.length
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InstanceDungeon",
						17,
						"副本进入流程执行失败，当前步数与总步数不匹配！",
						["CurrentStep", this.Dsi],
					)
				: this.Lsi[this.Dsi]();
	}
	Reset() {
		this.Dsi = -1;
	}
	Start() {
		this.Reset(), this.Rsi();
	}
	Flow() {
		this.rXt || this.Rsi();
	}
	RevertStep() {
		this.rXt || --this.Dsi;
	}
	AddStep(s) {
		this.Lsi.push(s);
	}
	OnCreate() {}
}
exports.InstanceDungeonEntranceFlowBase = InstanceDungeonEntranceFlowBase;
