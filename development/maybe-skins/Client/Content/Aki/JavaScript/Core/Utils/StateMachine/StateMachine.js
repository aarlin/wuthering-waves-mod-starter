"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StateMachine = void 0);
const Log_1 = require("../../Common/Log"),
	Stats_1 = require("../../Common/Stats");
class StateMachine {
	constructor(t, i = void 0) {
		(this.kh = new Map()), (this.Owner = t), (this.Pz = i);
	}
	get CurrentState() {
		return this.xz?.State;
	}
	Start(t) {
		return void 0 !== this.xz
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 12, "状态机重复启动", ["state", t]),
				!1)
			: ((this.xz = this.GetState(t)),
				!!this.xz && (this.xz.Start(), this.Pz && this.Pz(t, t), !0));
	}
	Destroy() {
		for (const t of this.kh.values()) t.Destroy();
	}
	Switch(t) {
		var i, e;
		return void 0 === this.xz
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 12, "状态机没有开始", ["state", t]),
				!1)
			: !(
					!(i = this.GetState(t)) ||
					(t === this.xz.State
						? !this.xz.CanReEnter() || (this.xz.ReEnter(), 0)
						: ((e = this.xz.State),
							!i.CanChangeFrom(e) ||
								(this.xz.Exit(t),
								(this.xz = i),
								this.xz.Enter(e),
								this.Pz && this.Pz(e, t),
								0)))
				);
	}
	Update(t) {
		this.xz && this.xz.Update(t);
	}
	AddState(t, i, e) {
		this.kh.has(t)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("StateMachine", 12, "状态重复添加", ["state", t])
			: ((i = new i(this.Owner, t, this)), this.kh.set(t, i), i.Create(e));
	}
	GetState(t) {
		var i = this.kh.get(t);
		return (
			i ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 12, "状态不存在", ["state", t])),
			i
		);
	}
}
((exports.StateMachine = StateMachine).qz = void 0),
	(StateMachine.wz = void 0),
	(StateMachine.Bz = void 0),
	(StateMachine.bz = void 0);
//# sourceMappingURL=StateMachine.js.map
