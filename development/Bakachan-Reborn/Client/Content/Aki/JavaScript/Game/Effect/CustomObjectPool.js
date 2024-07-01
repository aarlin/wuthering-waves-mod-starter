"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectActorPool = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Log_1 = require("../../Core/Common/Log"),
	Queue_1 = require("../../Core/Container/Queue"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	DEFAULT_CAPACITY = 4;
class CustomObjectPool {
	constructor(e = 4, t = 0) {
		(this.o7 = e),
			(this.wCe = t),
			(this.BCe = void 0),
			(this.bCe = new Queue_1.Queue(this.o7));
	}
	OnSpawn(e, t) {}
	OnDeSpawn(e) {}
	OnClear() {}
	Spawn(...e) {
		let t,
			r = !1;
		for (; this.bCe.Size; ) {
			if (((t = this.bCe.Pop()), this.OnObjectIsValid(t))) {
				r = !0;
				break;
			}
			t = void 0;
		}
		return (
			this.OnObjectIsValid(t) || ((t = this.OnCreateObject(...e)), (r = !1)),
			this.OnSpawn(r, t, ...e),
			this.wCe &&
				(this.BCe &&
					(TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0)),
				(this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
					var e = this.bCe.Size,
						t = Math.floor(e / 2);
					if (((this.BCe = void 0), !(e <= this.o7)))
						for (var r = Math.max(t, this.o7); this.bCe.Size >= r; ) {
							var o = this.bCe.Pop();
							this.OnDestroyObject(o);
						}
				}, this.wCe))),
			t
		);
	}
	DeSpawn(e) {
		return this.OnObjectIsValid(e)
			? (this.OnDeSpawn(e), this.bCe.Push(e), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderEffect", 3, "poolObject无效，回池失败"),
				!1);
	}
	Clear() {
		for (; this.bCe.Size; ) {
			var e = this.bCe.Pop();
			this.OnDestroyObject(e);
		}
		this.BCe &&
			(TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0)),
			this.OnClear();
	}
}
class EffectActorPool extends CustomObjectPool {
	OnCreateObject(...e) {
		var t = e[0];
		let r;
		return (
			t.IsA(UE.Actor.StaticClass()) && (r = t),
			(t = e[1]),
			ActorSystem_1.ActorSystem.Get(UE.TsEffectActor_C.StaticClass(), t, r)
		);
	}
	OnSpawn(e, t, ...r) {
		t?.SetActorHiddenInGame(!1),
			t?.K2_DetachFromActor(1, 1, 1),
			e && ((e = r[1]), t?.K2_SetActorTransform(e, !1, void 0, !0));
	}
	OnDeSpawn(e) {
		if (!this.qCe?.IsValid()) {
			if (
				((this.qCe = ActorSystem_1.ActorSystem.Get(
					UE.TsEffectActor_C.StaticClass(),
					new UE.Transform(),
				)),
				void 0 === this.qCe)
			)
				return;
			var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
			(3 !== t && 2 !== t) || (this.qCe.ActorLabel = "EffectActorPool");
		}
		e.K2_AttachToActor(this.qCe, void 0, 2, 2, 2, !1);
	}
	OnObjectIsValid(e) {
		return e?.IsValid() ?? !1;
	}
	OnDestroyObject(e) {
		e.K2_DestroyActor();
	}
	OnClear() {
		this.qCe?.IsValid() && (this.qCe.K2_DestroyActor(), (this.qCe = void 0));
	}
}
exports.EffectActorPool = EffectActorPool;
