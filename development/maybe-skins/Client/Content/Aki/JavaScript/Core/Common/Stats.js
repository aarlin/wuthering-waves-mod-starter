"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.statDecorator = exports.Stat = void 0);
const UE = require("ue"),
	CycleCounter_1 = require("../Performance/CycleCounter"),
	Macro_1 = require("../Preprocessor/Macro"),
	Log_1 = require("./Log");
class Stat {
	constructor(t, r) {
		(this.Name = t),
			(this.Desc = r),
			(this.E9 = 1),
			(this.ac = 0),
			(this.S9 = -1);
	}
	static get Enable() {
		return CycleCounter_1.CycleCounter.IsEnabled;
	}
	static CreateStatOfType(t, r, e, a) {
		if (!Stat.Enable) return Stat.y9;
		if (!r || 0 === r.length)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Stat", 1, "统计创建失败，名字为空"),
				Stat.y9
			);
		let o = r;
		o.length > Stat.I9 &&
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Stat", 31, "名字过长", ["name", r]),
			(o = r.substring(0, Stat.I9)));
		var s = new Stat(o, e);
		switch (((s.E9 = t), (s.ac = 2), t)) {
			case 1:
				s.S9 = UE.KuroJsStatsLibrary.CreateCycleCounter(o, e, a);
				break;
			case 2:
				UE.KuroJsStatsLibrary.CreateSimpleSeconds(o, e, a, !0);
				break;
			case 3:
				UE.KuroJsStatsLibrary.CreateSimpleSeconds(o, e, a, !1);
		}
		return s;
	}
}
function statDecorator(o) {
	return (t, r, e) => {
		const a = e.value;
		e.value = function (...t) {
			if (!Stat.Enable) return a.call(this, ...t);
			try {
				return a.call(this, ...t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Stat",
							1,
							"方法执行异常",
							t,
							["name", o],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Stat",
							1,
							"事件处理方法执行异常",
							["name", o],
							["error", t],
						);
			}
		};
	};
}
((exports.Stat = Stat).T9 = 5),
	(Stat.I9 = 800),
	(Stat.y9 = new Stat("", "")),
	(Stat.m6 = void 0),
	(Stat.L9 = void 0),
	(Stat.P8 = void 0),
	(Stat.F8 = (t, r) => r),
	(Stat.V8 = { stack: void 0 }),
	Log_1.Log.InitStat(Stat),
	(exports.statDecorator = statDecorator);
//# sourceMappingURL=Stats.js.map
