"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WaitEntityPreloadTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WAIT_TIME = 6e4;
class WaitEntityPreloadTask {
	constructor(e, t) {
		(this.vJ = void 0),
			(this.kpr = void 0),
			(this.Fpr = 0),
			(this.Vpr = void 0),
			(this.Hpr = new Map()),
			(this.jpr = new Map()),
			(this.ZWo = new Map()),
			(this.Wpr = void 0),
			(this.Kpr = (e) => {
				if (!(8 & this.Fpr)) {
					var t = (r = e.Entity.GetComponent(0)).GetCreatureDataId(),
						r = r.GetPbDataId();
					e = e.Id;
					let i = !1;
					this.Hpr.has(t) && ((i = !0), this.Hpr.delete(t)),
						this.jpr.has(r) && ((i = !0), this.jpr.delete(r)),
						this.ZWo.has(e) && ((i = !0), this.ZWo.delete(e)),
						!i || this.t6 || this.Neo();
				}
			}),
			(this.zpe = (e, t) => {
				if (!(8 & this.Fpr))
					if (t.Id === this.vJ.Id) (this.Fpr |= 4), this.Neo();
					else {
						var r = (i = t.Entity.GetComponent(0)).GetCreatureDataId(),
							i = i.GetPbDataId();
						t = t.Id;
						let e = !1;
						this.Hpr.has(r) &&
							((e = !0),
							this.Hpr.delete(r),
							ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
								(Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Entity",
										3,
										"实体需要等待的实体被删了",
										["CreatureDataId", this.Vpr?.GetCreatureDataId()],
										["被删的实体CreatureDataId", r],
										["依赖的实体列表", this.Wpr],
									))),
							this.jpr.has(i) &&
								((e = !0),
								this.jpr.delete(i),
								ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
									(Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Entity",
											3,
											"实体需要等待的实体被删了",
											["CreatureDataId", this.Vpr?.GetCreatureDataId()],
											["被删的实体PbDataId", i],
											["依赖的实体列表", this.Wpr],
										))),
							this.ZWo.has(t) &&
								((e = !0),
								this.ZWo.delete(t),
								ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
									(Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Entity",
											3,
											"实体需要等待的实体被删了",
											["CreatureDataId", this.Vpr?.GetCreatureDataId()],
											["被删的实体EntityId", t],
											["依赖的实体列表", this.Wpr],
										))),
							e && ((this.Fpr |= 1), this.t6 || this.Neo());
					}
			}),
			(this.vJ = e),
			(this.kpr = t);
	}
	Init() {
		(this.Vpr = this.vJ.Entity.GetComponent(0)),
			(this.Wpr = this.Vpr.GetDependenceEntities().join()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PreloadEntityFinished,
				this.Kpr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			TimerSystem_1.TimerSystem.Delay(() => {
				!this.vJ?.Valid ||
					8 & this.Fpr ||
					((this.Fpr |= 2),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"等待实体超时",
							["CreatureDataId", this.Vpr.GetCreatureDataId()],
							["依赖的实体", this.Wpr],
							["没有预加载的实体", this.Qpr()],
						),
					this.Neo());
			}, 6e4),
			this.Xpr(),
			this.t6 || this.Neo();
	}
	get t6() {
		return this.ZWo.size + this.jpr.size + this.Hpr.size;
	}
	Clear() {
		(this.vJ = void 0),
			this.Hpr.clear(),
			this.jpr.clear(),
			this.ZWo.clear(),
			(this.Wpr = void 0),
			(this.kpr = void 0);
	}
	Xpr() {
		var e, t, r, i, a;
		for ([e, t] of this.Vpr.GetDependenceEntities())
			0 === t
				? this.Hpr.has(e)
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
							"CreatureDataId",
							e,
						])
					: this.Hpr.set(e, t)
				: 1 === t
					? this.jpr.has(e)
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error("Entity", 3, "重复添加依赖实体", ["PbDataId", e])
						: this.jpr.set(e, t)
					: 2 === t &&
						(this.ZWo.has(e)
							? Log_1.Log.CheckError() &&
								Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
									"EntityId",
									e,
								])
							: this.ZWo.set(e, t));
		for ([r] of this.Hpr) {
			var s = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
			s?.Valid &&
				(s.Entity.GetComponent(0).GetPreloadFinished() || s?.IsInit) &&
				this.Hpr.delete(r);
		}
		for ([i] of this.jpr) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
			o?.Valid &&
				(o.Entity.GetComponent(0).GetPreloadFinished() || o?.IsInit) &&
				this.jpr.delete(i);
		}
		for ([a] of this.ZWo) {
			var n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a);
			n?.Valid &&
				(n.Entity.GetComponent(0).GetPreloadFinished() || n?.IsInit) &&
				this.ZWo.delete(a);
		}
	}
	Neo() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PreloadEntityFinished,
			this.Kpr,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			(this.Fpr |= 8),
			this.kpr(this.Fpr),
			this.Clear();
	}
	Qpr() {
		let e = "";
		if (this.Hpr.size) for (var [t] of this.Hpr) e += `CreatureDataId:${t},`;
		if (this.jpr.size) for (var [r] of this.jpr) e += `PbDataId:${r},`;
		if (this.ZWo.size) for (var [i] of this.ZWo) e += `EntityId:${i},`;
		return e;
	}
	static Create(e, t) {
		return (e = new WaitEntityPreloadTask(e, t)).Init(), e;
	}
}
exports.WaitEntityPreloadTask = WaitEntityPreloadTask;
