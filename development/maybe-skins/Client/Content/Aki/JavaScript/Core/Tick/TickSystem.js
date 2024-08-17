"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickSystem = exports.Ticker = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	Time_1 = require("../Common/Time"),
	PerfSight_1 = require("../PerfSight/PerfSight"),
	SECOND_TO_MILLISECOND = 1e3;
class Ticker {
	constructor(t, i, e, s, r = 0, c = !1) {
		(this.Id = t),
			(this.Handle = i),
			(this.Group = e),
			(this.Name = s),
			(this.TickIntervalMs = r),
			(this.TickEvenPaused = c),
			(this.Count = 0),
			(this.CoolDown = 0),
			(this.Pause = !1),
			(this.StatObj = void 0),
			(this.StatObj = void 0);
	}
}
exports.Ticker = Ticker;
class TickSystem {
	constructor() {}
	static get IsPaused() {
		return TickSystem.dJ && Time_1.Time.Frame > TickSystem.PausedFrame;
	}
	static set IsPaused(t) {
		(TickSystem.dJ = t) && (TickSystem.PausedFrame = Time_1.Time.Frame);
	}
	static get IsSetPaused() {
		return TickSystem.dJ;
	}
	static Initialize(t) {
		(this.CJ = new UE.KuroTickManager(t)), this.gJ.clear(), this.fJ.clear();
	}
	static Destroy() {
		for (var [, t] of this.pJ) (0, puerts_1.releaseManualReleaseDelegate)(t);
		this.CJ.ClearTick();
	}
	static Has(t) {
		return 0 < t && this.gJ.has(t);
	}
	static Add(t, i, e = 0, r = !1) {
		if (t) {
			var c = ++this.o6,
				i = new Ticker(c, t, e, i, 0, r);
			this.gJ.set(c, i);
			let s = this.fJ.get(e);
			return (
				s
					? s.add(i)
					: ((s = new Set()).add(i),
						this.fJ.set(e, s),
						this.pJ.set(
							e,
							(r = (t) => {
								var i = t * SECOND_TO_MILLISECOND;
								for (const e of s)
									(this.IsPaused && !e.TickEvenPaused) || this.vJ(e, i);
							}),
						),
						this.CJ.AddTick(e, (0, puerts_1.toManualReleaseDelegate)(r))),
				i
			);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Tick", 1, "处理方法不存在", ["handle", t]);
	}
	static Remove(t) {
		var i = this.gJ.get(t);
		if (!i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
				!1
			);
		this.gJ.delete(t);
		var e = this.fJ.get(i.Group);
		return e
			? (e.delete(i),
				0 === e.size &&
					(this.fJ.delete(i.Group),
					(e = this.pJ.get(i.Group)),
					this.pJ.delete(i.Group),
					this.CJ.RemoveTick(i.Group),
					(0, puerts_1.releaseManualReleaseDelegate)(e)),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Tick",
						1,
						"分组不存在",
						["id", t],
						["group", i.Group],
					),
				!1);
	}
	static Pause(t) {
		var i = this.gJ.get(t);
		return i
			? (i.Pause = !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
				!1);
	}
	static Resume(t) {
		var i = this.gJ.get(t);
		return i
			? !(i.Pause = !1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]),
				!1);
	}
	static vJ(i, e) {
		if (!i.Pause) {
			let t = e;
			if (0 < i.TickIntervalMs) {
				if (((i.CoolDown += e), i.CoolDown < i.TickIntervalMs)) return;
				e = i.CoolDown % i.TickIntervalMs;
				(t = i.CoolDown - e), (i.CoolDown = e);
			}
			i.Count += 1;
			e = cpp_1.KuroTime.GetMilliseconds64();
			try {
				i.Handle(t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Tick",
							1,
							"处理方法执行异常",
							t,
							["id", i.Id],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Tick",
							1,
							"处理方法执行异常",
							["id", i.Id],
							["error", t],
						);
			}
			e = cpp_1.KuroTime.GetMilliseconds64() - e;
			PerfSight_1.PerfSight.IsEnable &&
				0 === i.Group &&
				("Core" === i.Name
					? PerfSight_1.PerfSight.PostValueF1(
							"CustomPerformance",
							"[PrePhysics]TickSystem_Core",
							e,
							Time_1.Time.Frame,
						)
					: "Game" === i.Name &&
						PerfSight_1.PerfSight.PostValueF1(
							"CustomPerformance",
							"[PrePhysics]TickSystem_Game",
							e,
							Time_1.Time.Frame,
						));
		}
	}
	static AddTickPrerequisite(t, i) {
		this.CJ.AddPrerequisiteActorComponent(t, i);
	}
	static RemoveTickPrerequisite(t, i) {
		this.CJ.RemovePrerequisiteActorComponent(t, i);
	}
	static SetSkeletalMeshProxyTickFunction(t, i) {
		this.CJ.SetSkeletalMeshProxyTickFunction(t, i);
	}
	static CleanSkeletalMeshProxyTickFunction(t) {
		this.CJ.CleanSkeletalMeshProxyTickFunction(t);
	}
}
((exports.TickSystem = TickSystem).InvalidId = -1),
	(TickSystem.dJ = !1),
	(TickSystem.PausedFrame = -1),
	(TickSystem.o6 = 0),
	(TickSystem.CJ = void 0),
	(TickSystem.gJ = new Map()),
	(TickSystem.pJ = new Map()),
	(TickSystem.fJ = new Map());
//# sourceMappingURL=TickSystem.js.map
