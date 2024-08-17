"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTickConditionModule = void 0);
const Log_1 = require("../../Core/Common/Log"),
	TickSystem_1 = require("../../Core/Tick/TickSystem");
class UiTickConditionModule {
	constructor(i) {
		(this.HDe = void 0),
			(this.vJo = void 0),
			(this.yJt = void 0),
			(this.lCr = 0),
			(this.Xje = TickSystem_1.TickSystem.InvalidId),
			(this.r6 = (i) => {
				this.yJt?.(i)
					? (this.HDe?.(this.lCr), this.vJo?.(this.lCr), this._Cr())
					: (this.lCr += i);
			}),
			(this.czo = i);
	}
	StartTick(i, t, o) {
		(this.yJt = i),
			(this.vJo = t),
			(this.HDe = o),
			(this.Xje = TickSystem_1.TickSystem.Add(
				this.r6,
				"UiTickConditionModule",
				0,
				!0,
			).Id);
	}
	ManualStopTick() {
		this.vJo &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiTickConditionModule",
					11,
					"手动停止Tick,执行停止回调",
					["标识", this.czo],
				),
			this.vJo?.(this.lCr),
			this._Cr());
	}
	_Cr() {
		this._gt(),
			(this.lCr = 0),
			(this.yJt = void 0),
			(this.vJo = void 0),
			(this.HDe = void 0);
	}
	_gt() {
		this.Xje !== TickSystem_1.TickSystem.InvalidId &&
			TickSystem_1.TickSystem.Remove(this.Xje);
	}
}
exports.UiTickConditionModule = UiTickConditionModule;
