"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueHookCommonItem = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
	ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
	EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../../../../GlobalData"),
	RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueHookCommonItem {
	constructor(t, e, o, a) {
		(this.OKt = t),
			(this.dXo = e),
			(this.TargetPosition = o),
			(this.Paths = a),
			(this.CXo = void 0),
			(this.gXo = 0),
			(this.dce = !1);
	}
	static Spawn(t, e, o, a) {
		return (
			((t = new this(t, e, o, a)).dce = !0),
			(t.CXo = t.fXo()),
			(t.gXo = t.pXo()),
			t
		);
	}
	Destroy() {
		RecorderBlueprintFunctionLibrary_1.default.Recording &&
			RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(
				this,
			),
			(this.dce = !1),
			ActorSystem_1.ActorSystem.Put(this.CXo),
			EffectSystem_1.EffectSystem.IsValid(this.gXo) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.gXo,
					"[GameplayCueHookCommonItem.Destroy]",
					!0,
				),
			this.vXo();
	}
	static StaticSpawnHookActorRecord(t, e, o) {
		(t = ResourceSystem_1.ResourceSystem.SyncLoad(t, UE.NiagaraSystem)),
			t?.IsValid() &&
				e?.IsValid() &&
				((e = e.AddComponentByClass(
					UE.NiagaraComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)).SetAsset(t),
				e.SetNiagaraVariableVec3("End", o));
	}
	fXo() {
		const t = ActorSystem_1.ActorSystem.Get(
			UE.Actor.StaticClass(),
			this.OKt.GetTransform(),
		);
		return (
			GlobalData_1.GlobalData.IsPlayInEditor &&
				t.SetActorLabel(
					this.OKt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name,
				),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.Paths[0],
				UE.NiagaraSystem,
				(e) => {
					var o;
					this.dce &&
						e?.IsValid() &&
						t?.IsValid() &&
						((o = t.AddComponentByClass(
							UE.NiagaraComponent.StaticClass(),
							!1,
							MathUtils_1.MathUtils.DefaultTransform,
							!1,
						)).SetAsset(e),
						o.SetNiagaraVariableVec3("End", this.TargetPosition),
						t.K2_AttachToComponent(this.OKt.Mesh, this.dXo, 2, 2, 2, !1),
						RecorderBlueprintFunctionLibrary_1.default.Recording) &&
						RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(
							t,
							this,
						);
				},
			),
			t
		);
	}
	pXo() {
		return EffectSystem_1.EffectSystem.SpawnEffect(
			this.OKt,
			new UE.Transform(this.TargetPosition),
			this.Paths[1],
			"[GameplayCueHookCommonItem.CreateBallEffect]",
			new EffectContext_1.EffectContext(this.OKt.EntityId),
			0,
		);
	}
	vXo() {
		EffectSystem_1.EffectSystem.SpawnEffect(
			this.OKt,
			new UE.Transform(this.TargetPosition),
			this.Paths[2],
			"[GameplayCueHookCommonItem.DestroyBallEffect]",
			new EffectContext_1.EffectContext(this.OKt.EntityId),
			0,
		);
	}
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
