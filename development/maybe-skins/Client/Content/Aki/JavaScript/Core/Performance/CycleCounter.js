"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CycleCounter = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue");
class CycleCounter {
	static RefreshState() {
		if (
			((this.uY = !1),
			this.cY !== this.mY && ((this.cY = this.mY), (this.uY = !0), !this.cY))
		) {
			var e = this.dY.length;
			for (let t = 0; t < e; t++) UE.KuroJsStatsLibrary.StopCycleCounter();
			this.dY.splice(0);
		}
		this.CY !== this.gY && ((this.CY = this.gY), (this.uY = !0));
	}
	static get IsEnabled() {
		return this.cY;
	}
	static SetEnable(t) {
		this.mY = t;
	}
	static SetNeedCheck(t) {
		this.gY = t;
	}
	static Init(t, e = "", s = "") {
		UE.KuroJsStatsLibrary.CreateCycleCounter(t, e, s);
	}
	static Start(t) {
		this.cY && (UE.KuroJsStatsLibrary.StartCycleCounter(t), this.CheckStart(t));
	}
	static CheckStart(t) {
		this.CY && this.dY.push(t);
	}
	static Stop(t) {
		this.cY &&
			this.IsPassedStackCheck(t) &&
			UE.KuroJsStatsLibrary.StopCycleCounter();
	}
	static IsPassedStackCheck(s) {
		if (!this.CY) return !0;
		if (0 < this.dY.length) {
			if (s === this.dY[this.dY.length - 1]) return this.dY.pop(), !0;
			let e = !1;
			for (let t = this.dY.length - 1; 0 <= t; t--)
				if (this.dY[t] === s) {
					e = !0;
					break;
				}
			if (e) {
				var i = [];
				i.push(this.dY.pop());
				let t = i[0];
				for (; t !== s; )
					UE.KuroJsStatsLibrary.StopCycleCounter(),
						i.push(this.dY.pop()),
						(t = i[i.length - 1]);
				return (
					puerts_1.logger.error(
						`CycleCounter.Stop()匹配失败，已尝试从栈中恢复 current stat name: ${s}, none stopped names: ` +
							i,
					),
					!0
				);
			}
		}
		return this.uY
			? (puerts_1.logger.log(
					"CycleCounter.Stop()匹配失败，但当前帧切换过开关状态 name: " + s,
				),
				!0)
			: (puerts_1.logger.error("CycleCounter.Stop()匹配失败 name: " + s), !1);
	}
}
((exports.CycleCounter = CycleCounter).cY = !0),
	(CycleCounter.mY = !0),
	(CycleCounter.CY = !0),
	(CycleCounter.gY = !0),
	(CycleCounter.uY = !1),
	(CycleCounter.dY = new Array());
//# sourceMappingURL=CycleCounter.js.map
