"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComponentForceTickController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Core_1 = require("../../../Core/Core"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class ComponentForceTickController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.Tgr = [123]),
			(this.Lgr = [44, 57, 123, 94, 140, 142, 133, 131, 135, 143]),
			(this.Dgr = [54, 57, 142]),
			!0
		);
	}
	static RegisterPreTick(o, r) {
		this.Rgr(o)
			? Core_1.Core.RegisterPreTick(r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"TickController",
					32,
					"[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
					["Comp", o.toString()],
				);
	}
	static RegisterTick(o, r) {
		this.Ugr(o)
			? this.Agr.has(o)
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"TickController",
						32,
						"[ComponentForceTickController.RegisterTick] 当前Comp已经注册过ForceTick",
						["Comp", o.toString()],
					)
				: this.Agr.set(o, r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"TickController",
					32,
					"[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController",
					["Comp", o.toString()],
				);
	}
	static RegisterAfterTick(o, r) {
		this.Pgr(o)
			? this.ZEt.has(o)
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"TickController",
						32,
						"[ComponentForceTickController.RegisterAfterTick] 当前Comp已经注册过ForceAfterTick",
						["Comp", o.toString()],
					)
				: this.ZEt.set(o, r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"TickController",
					32,
					"[ComponentForceTickController.RegisterAfterTick] 当前Comp不允许注册到ForceTickController",
					["Comp", o.toString()],
				);
	}
	static UnregisterTick(o) {
		this.Agr.has(o)
			? this.Agr.delete(o)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"TickController",
					32,
					"[ComponentForceTickController.UnregisterTick] 当前Comp未注册过ForceTick",
					["Comp", o.toString()],
				);
	}
	static UnregisterAfterTick(o) {
		this.ZEt.has(o)
			? this.ZEt.delete(o)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"TickController",
					32,
					"[ComponentForceTickController.UnregisterAfterTick] 当前Comp未注册过ForceAfterTick",
					["Comp", o.toString()],
				);
	}
	static UnregisterPreTick(o) {
		Core_1.Core.UnRegisterPreTick(o);
	}
	static OnTick(o) {
		for (var [r, e] of this.Agr)
			if (r.Active)
				try {
					this.m6(
						this.xgr,
						r.constructor.name,
						"ComponentForceTickController.OnTick.",
					),
						e(o * this.EW);
				} catch (o) {
					o instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"TickController",
								32,
								"处理方法执行异常",
								o,
								["comp", r.toString()],
								["error", o.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"TickController",
								32,
								"处理方法执行异常",
								["comp", r.toString()],
								["error", o],
							);
				}
	}
	static OnAfterTick(o) {
		for (var [r, e] of this.ZEt)
			try {
				r.Active &&
					(this.m6(
						this.wgr,
						r.constructor.name,
						"ComponentForceTickController.OnAfterTick.",
					),
					e(o * this.EW));
			} catch (o) {
				o instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"TickController",
							32,
							"处理方法执行异常",
							o,
							["comp", r.toString()],
							["error", o.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"TickController",
							32,
							"处理方法执行异常",
							["comp", r.toString()],
							["error", o],
						);
			}
	}
	static Rgr(o) {
		return Boolean(
			this.Tgr.find((r) => (0, RegisterComponent_1.isComponentInstance)(o, r)),
		);
	}
	static Ugr(o) {
		return Boolean(
			this.Lgr.find((r) => (0, RegisterComponent_1.isComponentInstance)(o, r)),
		);
	}
	static Pgr(o) {
		return Boolean(
			this.Dgr.find((r) => (0, RegisterComponent_1.isComponentInstance)(o, r)),
		);
	}
	static m6(o, r, e) {
		if (Stats_1.Stat.Enable) {
			let e = o.get(r);
			return e || ((e = void 0), o.set(r, e)), e;
		}
	}
	static SetTimeDilation(o) {
		ComponentForceTickController.EW = o;
	}
}
((exports.ComponentForceTickController = ComponentForceTickController).Lgr =
	[]),
	(ComponentForceTickController.Dgr = []),
	(ComponentForceTickController.Tgr = []),
	(ComponentForceTickController.xgr = new Map()),
	(ComponentForceTickController.wgr = new Map()),
	(ComponentForceTickController.EW = 1),
	(ComponentForceTickController.Agr = new Map()),
	(ComponentForceTickController.ZEt = new Map());
