"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiMask = void 0);
const Log_1 = require("../../Core/Common/Log"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	UiLayer_1 = require("./UiLayer"),
	MASK_DESTROY_TIME = 2e3;
class UiMask {
	constructor(e) {
		(this.Zdr = 0), (this.IRe = void 0), (this.eCr = e);
	}
	Tit() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiMask",
				11,
				"[UiMask]添加定时器",
				["MaskTag", this.eCr],
				["MaskCount", this.Zdr],
			),
			(this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiMask",
						11,
						"[UiMask]超过保底时间,定时器执行逻辑,解除遮罩",
						["MaskTag", this.eCr],
					),
					this.tCr();
			}, 2e3));
	}
	p7e() {
		void 0 !== this.IRe &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiMask",
					11,
					"[UiMask]移除定时器",
					["MaskTag", this.eCr],
					["MaskCount", this.Zdr],
				),
			TimerSystem_1.TimerSystem.Remove(this.IRe),
			(this.IRe = void 0));
	}
	iCr() {
		(this.Zdr += 1),
			this.Tit(),
			UiLayer_1.UiLayer.SetShowMaskLayer(this.eCr, !0);
	}
	oCr() {
		--this.Zdr,
			this.Zdr <= 0 && UiLayer_1.UiLayer.SetShowMaskLayer(this.eCr, !1);
	}
	tCr() {
		(this.Zdr = 0),
			(this.IRe = void 0),
			UiLayer_1.UiLayer.SetShowMaskLayer(this.eCr, !1);
	}
	SetMask(e) {
		e ? (this.p7e(), this.iCr()) : 0 < this.Zdr && this.oCr(),
			this.Zdr <= 0 && this.p7e();
	}
}
exports.UiMask = UiMask;
