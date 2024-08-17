"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectProfiler = void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats");
class EffectProfiler {
	static SetEnable(e) {
		this.Vge = e;
	}
	static NoticeCreatedFromLru(e, t) {
		var r;
		this.Vge &&
			((r = this.Hge.get(e)) ? this.Hge.set(e, r + 1) : this.Hge.set(e, 1),
			(r = this.jge.get(e))
				? r.push(new WeakRef(t))
				: this.jge.set(e, [new WeakRef(t)]));
	}
	static NoticeUsed(e) {
		var t, r;
		this.Vge &&
			((t = e.Path),
			(r = this.Wge.get(t)) ? this.Wge.set(t, r + 1) : this.Wge.set(t, 1),
			this.Kge.set(e, void 0),
			this.Qge.set(e, cpp_1.KuroTime.GetMilliseconds64()));
	}
	static NoticeAddedToLru(e) {
		if (this.Vge) {
			var t = e.Path,
				r =
					((r = this.Xge.get(t)) ? this.Xge.set(t, r + 1) : this.Xge.set(t, 1),
					this.Kge.delete(e),
					cpp_1.KuroTime.GetMilliseconds64() - this.Qge.get(e));
			let i = this.$ge.get(t);
			if (
				(i || ((i = []), this.$ge.set(t, i)),
				0 < i.length && !t.includes("DA_Fx_Group_WeaponEnd"))
			) {
				let o = 0;
				for (const e of i) o += e;
				r >= 1.5 * (o /= i.length) &&
					((e = this.Yge(t)), Log_1.Log.CheckError()) &&
					Log_1.Log.Error(
						"RenderEffect",
						25,
						"[EffectProfiler] 回池间隔时间过长",
						["Path", e],
						["CurrentUsedTime", r],
						["HistoryUsedAverageTiming", o],
					);
			}
			if (10 === i.length) {
				for (let e = 0; e < i.length - 1; e++) i[e] = i[e + 1];
				i[i.length - 1] = r;
			} else i.push(r);
		}
	}
	static NoticeRemovedFromLru(e, t) {
		var r;
		this.Vge &&
			((r = this.Xge.get(e)),
			this.Xge.set(e, r - 1),
			(r = this.Jge.get(e)) ? r.push(t) : this.Jge.set(e, [t]));
	}
	static LogReasonHistoryAndNum(e, t, r) {
		if (this.Vge) {
			var i = e.Path,
				o = this.Yge(i),
				s = this.Hge.get(i),
				g = this.Wge.get(i),
				f = this.Xge.get(i);
			if (g && 1 < g)
				if (1 <= f) {
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							25,
							"[EffectProfiler] Error, LogReasonHistoryAndNum",
							["Path", o],
							["HistoryUsedCount", g],
							["CreatedCount", s],
							["CurrentCountInLru", f],
							["LruSize", t],
							["LruHitRate", r],
							["ReasonHistory", this.Jge.get(i)?.join(",")],
						);
					for (const t of this.jge.get(i).values()) {
						var n = t.deref();
						n &&
							n !== e &&
							(n = this.Kge.get(n)) &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								25,
								"[EffectProfiler] Error, Show stack",
								["Stack", n],
							);
					}
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderEffect",
							25,
							"[EffectProfiler] Warn, LogReasonHistoryAndNum",
							["Path", o],
							["HistoryUsedCount", g],
							["CreatedCount", s],
							["CurrentCountInLru", f],
							["LruSize", t],
							["LruHitRate", r],
							["ReasonHistory", this.Jge.get(i)?.join(",")],
						);
		}
	}
	static Yge(e) {
		let t = e.replace("/Game/Aki/Effect", "");
		return 0 <= (e = t.indexOf(".")) ? t.substring(0, e) : t;
	}
}
((exports.EffectProfiler = EffectProfiler).Vge = !1),
	(EffectProfiler.Hge = new Map()),
	(EffectProfiler.Wge = new Map()),
	(EffectProfiler.Xge = new Map()),
	(EffectProfiler.Jge = new Map()),
	(EffectProfiler.Qge = new WeakMap()),
	(EffectProfiler.$ge = new Map()),
	(EffectProfiler.jge = new Map()),
	(EffectProfiler.Kge = new WeakMap());
