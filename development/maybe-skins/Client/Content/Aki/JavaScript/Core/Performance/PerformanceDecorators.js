"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickEffectPerformanceWithEntity =
		exports.TickEntitySkeletonProxyPerformance =
		exports.TickEffectPerformanceEx =
		exports.TickPerformanceEx =
		exports.EntityComponentTickPerformanceEx =
		exports.EntityTickPerformanceEx =
		exports.PerformanceFunctionEx =
			void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../Common/Log"),
	PerformanceController_1 = require("./PerformanceController");
function PerformanceFunctionEx(n) {
	return (r, e, o) => {
		const t = o.value;
		o.value = function (...r) {
			let e;
			if (PerformanceController_1.PerformanceController.IsOpen) {
				var o = PerformanceController_1.PerformanceController.StartMonitor(n);
				try {
					e = t.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Performance",
								10,
								"方法执行异常",
								r,
								["funName", n],
								["error", r.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Performance",
								10,
								"事件处理方法执行异常",
								["funName", n],
								["error", r ?? void 0],
							);
				}
				PerformanceController_1.PerformanceController.EndMonitor(o);
			} else e = t.call(this, ...r);
			return e;
		};
	};
}
function EntityTickPerformanceEx(c) {
	return (r, e, o) => {
		const n = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = n.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Performance",
								36,
								"Entity.Tick方法执行异常",
								r,
								["error", r.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Performance", 36, "Entity.Tick方法执行异常", [
								"error",
								r ?? void 0,
							]);
				}
				var t = cpp_1.KuroTime.GetMilliseconds64();
				PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
					"EntityTick" + this.Id,
					c,
					t - o,
				);
			} else e = n.call(this, ...r);
			return e;
		};
	};
}
function EntityComponentTickPerformanceEx(i) {
	return (r, e, o) => {
		const c = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = c.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Performance",
								36,
								"EntityComp.Tick方法执行异常",
								r,
								["error", r.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Performance",
								36,
								"EntityComp.Tick方法执行异常",
								["error", r ?? void 0],
							);
				}
				var t = cpp_1.KuroTime.GetMilliseconds64(),
					n = this;
				PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(
					n.Entity.Id,
					n.constructor.name,
					i === n.NeedTick,
					t - o,
				);
			} else e = c.call(this, ...r);
			return e;
		};
	};
}
function TickPerformanceEx(c, i, f = 1) {
	return (r, e, o) => {
		const n = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = n.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack("Performance", 36, "方法执行异常", r, [
								"error",
								r.message,
							])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Performance", 36, "方法执行异常", [
								"error",
								r ?? void 0,
							]);
				}
				var t = cpp_1.KuroTime.GetMilliseconds64();
				PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
					c,
					i,
					t - o,
					f,
				);
			} else e = n.call(this, ...r);
			return e;
		};
	};
}
function TickEffectPerformanceEx(f, a = 1) {
	return (r, e, o) => {
		const i = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = i.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack("Performance", 36, "方法执行异常", r, [
								"error",
								r.message,
							])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Performance", 36, "方法执行异常", [
								"error",
								r ?? void 0,
							]);
				}
				var t,
					n,
					c = cpp_1.KuroTime.GetMilliseconds64();
				0 === a && 0 !== e
					? (([t, n] =
							(this.DebugUpdate(e, !0), this.GetNiagaraParticleCount(e))),
						PerformanceController_1.PerformanceController.CollectEffectTickPerformanceInfo(
							this.GetPath(e),
							f,
							o,
							c,
							a,
							this.BornFrameCount(e),
							t,
							n,
						))
					: 1 === a &&
						(([t, n] = this.GetNiagaraParticleCount()),
						PerformanceController_1.PerformanceController.CollectEffectTickPerformanceInfo(
							this.Path,
							f,
							o,
							c,
							a,
							this.BornFrameCount,
							t,
							n,
						));
			} else e = i.call(this, ...r);
			return e;
		};
	};
}
function TickEntitySkeletonProxyPerformance() {
	return (r, e, o) => {
		const t = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = t.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack("Performance", 36, "方法执行异常", r, [
								"error",
								r.message,
							])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Performance", 36, "方法执行异常", [
								"error",
								r ?? void 0,
							]);
				}
				o = cpp_1.KuroTime.GetMilliseconds64() - o;
				PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
					"EntityTick" + this.Entity.Id,
					!1,
					o,
				);
			} else e = t.call(this, ...r);
			return e;
		};
	};
}
function TickEffectPerformanceWithEntity() {
	return (r, e, o) => {
		const n = o.value;
		o.value = function (...r) {
			let e;
			if (
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest
			) {
				var o = cpp_1.KuroTime.GetMilliseconds64();
				try {
					e = n.call(this, ...r);
				} catch (r) {
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack("Performance", 36, "方法执行异常", r, [
								"error",
								r.message,
							])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Performance", 36, "方法执行异常", [
								"error",
								r ?? void 0,
							]);
				}
				var o = cpp_1.KuroTime.GetMilliseconds64() - o,
					t = this.GetOwnerEntityId();
				t &&
					PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
						"EntityTick" + t,
						!1,
						o,
					);
			} else e = n.call(this, ...r);
			return e;
		};
	};
}
(exports.PerformanceFunctionEx = PerformanceFunctionEx),
	(exports.EntityTickPerformanceEx = EntityTickPerformanceEx),
	(exports.EntityComponentTickPerformanceEx = EntityComponentTickPerformanceEx),
	(exports.TickPerformanceEx = TickPerformanceEx),
	(exports.TickEffectPerformanceEx = TickEffectPerformanceEx),
	(exports.TickEntitySkeletonProxyPerformance =
		TickEntitySkeletonProxyPerformance),
	(exports.TickEffectPerformanceWithEntity = TickEffectPerformanceWithEntity);
//# sourceMappingURL=PerformanceDecorators.js.map
