"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongPressButton = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	SECOND_0_1 = 100;
class LongPressButton {
	constructor(t, e, s = 100) {
		(this.IRe = void 0),
			(this.VCt = void 0),
			(this.Qqo = () => {
				TimerSystem_1.TimerSystem.Resume(this.IRe);
			}),
			(this.K9t = () => {
				TimerSystem_1.TimerSystem.Pause(this.IRe);
			}),
			t.OnPointDownCallBack.Bind(this.Qqo),
			t.OnPointUpCallBack.Bind(this.K9t),
			t.OnPointExitCallBack.Bind(this.K9t),
			(this.VCt = t),
			(this.IRe = TimerSystem_1.TimerSystem.Forever(e, s)),
			TimerSystem_1.TimerSystem.Pause(this.IRe);
	}
	OnDestroy() {
		this.VCt.OnPointDownCallBack.Unbind(),
			this.VCt.OnPointUpCallBack.Unbind(),
			TimerSystem_1.TimerSystem.Remove(this.IRe);
	}
}
exports.LongPressButton = LongPressButton;
