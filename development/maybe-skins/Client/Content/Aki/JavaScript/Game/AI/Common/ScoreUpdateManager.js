"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScoreUpdateManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats");
class ScoreUpdateManager {
	constructor(e = 1, t = 10) {
		(this.Rte = e),
			(this.Ute = t),
			(this.Ate = new Array()),
			(this.Pte = new Map()),
			(this.xte = 0);
	}
	AddScore(e, t = 1) {
		if (t < 1)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "AddScore is less than 1");
		else {
			var r = this.Pte.get(e),
				o = (r && this.Ate[r].delete(e), r ? r + t : t);
			for (this.xte < o && (this.xte = o); this.Ate.length <= o; )
				this.Ate.push(new Set());
			this.Ate[o].add(e), this.Pte.set(e, o);
		}
	}
	RemoveObject(e) {
		var t = this.Pte.get(e);
		t && this.Ate[t].delete(e), this.Pte.delete(e);
	}
	Update() {
		if (0 !== this.xte) {
			let r = 0,
				o = 0;
			for (let s = this.xte; 0 < s; --s) {
				var e = this.Ate[s],
					t = 1 / s;
				for (const s of e) {
					try {
						s.ScoreUpdate();
					} catch (e) {
						e instanceof Error
							? Log_1.Log.CheckError() &&
								Log_1.Log.ErrorWithStack(
									"AI",
									6,
									"ScoreUpdate执行异常",
									e,
									["ScoreObject", s.constructor.name],
									["error", e.message],
								)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"AI",
									6,
									"ScoreUpdate执行异常",
									["ScoreObject", s.constructor.name],
									["error", e],
								);
					}
					if (
						(this.Pte.set(s, 0),
						e.delete(s),
						(r += t),
						++o,
						r >= this.Rte || o >= this.Ute)
					)
						return;
				}
				this.xte--;
			}
		}
	}
}
(exports.ScoreUpdateManager = ScoreUpdateManager).wte = void 0;
