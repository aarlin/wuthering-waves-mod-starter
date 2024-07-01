"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiNiagaraItem = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	DEFAULT_DURATION = 1e3;
class BattleUiNiagaraItem {
	constructor(t) {
		(this.IRe = void 0),
			(this.E9e = () => {
				(this.IRe = void 0), this.Iit();
			}),
			(this.Item = t),
			(this.Duration = 1e3);
	}
	Play() {
		this.Item.SetUIActive(!0),
			this.Item.ActivateSystem(!0),
			this.p7e(),
			this.Tit();
	}
	Stop() {
		this.IRe && (this.p7e(), this.Iit());
	}
	Iit() {
		this.Item.SetUIActive(!1);
	}
	Tit() {
		this.IRe = TimerSystem_1.TimerSystem.Delay(this.E9e, this.Duration);
	}
	p7e() {
		this.IRe &&
			(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
	}
}
exports.BattleUiNiagaraItem = BattleUiNiagaraItem;
