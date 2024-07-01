"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelMultiEffectSpec = void 0);
const UE = require("ue"),
	EffectModelHelper_1 = require("../Render/Effect/Data/EffectModelHelper"),
	MultiEffectBuffBall_1 = require("../Render/Effect/Data/MultiEffect/MultiEffectBuffBall"),
	CustomMap_1 = require("../World/Define/CustomMap"),
	EffectSpec_1 = require("./EffectSpec/EffectSpec"),
	EffectSystem_1 = require("./EffectSystem");
class EffectModelMultiEffectSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.EffectSpecMap = new CustomMap_1.CustomMap()),
			(this.GroupComponent = void 0),
			(this.MultiEffect = void 0);
	}
	OnInit() {
		var e = this.Handle.GetSureEffectActor(),
			t = (t = this.Handle.Parent)
				? t.GetEffectSpec()?.GetSceneComponent()
				: void 0;
		e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
			e,
			UE.SceneComponent.StaticClass(),
			t,
			void 0,
			!1,
			this.EffectModel,
		);
		return (this.SceneComponent = e), (this.GroupComponent = e), !0;
	}
	OnStart() {
		var e = new Map();
		return (
			0 === this.EffectModel.Type &&
				(e.set("BaseNum", this.EffectModel.BaseNum),
				e.set("SpinSpeed", this.EffectModel.SpinSpeed),
				e.set("Radius", this.EffectModel.Radius),
				(this.MultiEffect = new MultiEffectBuffBall_1.MultiEffectBuffBall()),
				this.MultiEffect.Init(e)),
			!0
		);
	}
	OnTick(e) {
		var t = this.EffectSpecMap.GetItems(),
			f = this.MultiEffect.GetDesiredNum(this.LifeTime.PassTime),
			c =
				(this.AdjustNumber(f),
				this.MultiEffect.Update(e, this.LifeTime.PassTime, t),
				this.Handle.GetSureEffectActor()?.bHidden ?? !1);
		for (const e of t) {
			var s = EffectSystem_1.EffectSystem.GetSureEffectActor(e);
			s?.IsValid() && s.bHidden !== c && s.SetActorHiddenInGame(c);
		}
	}
	OnEnd() {
		return (
			this.GroupComponent.GetOwner().K2_DestroyComponent(this.GroupComponent),
			!0
		);
	}
	OnStop(e) {
		var t = new Array();
		for (const e of this.EffectSpecMap.GetItems())
			EffectSystem_1.EffectSystem.IsValid(e) && t.push(e);
		for (const f of t) EffectSystem_1.EffectSystem.StopEffectById(f, e, !0);
		this.EffectSpecMap.Clear();
	}
	OnClear() {
		for (const e of this.EffectSpecMap.GetItems())
			EffectSystem_1.EffectSystem.IsValid(e) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					e,
					"[EffectModelMultiEffectSpec.OnClear]",
					!0,
				);
		return this.EffectSpecMap.Clear(), !0;
	}
	AdjustNumber(e) {
		var t,
			f,
			c = this.EffectSpecMap.Size();
		c < e
			? ((f = this.Handle.GetSureEffectActor()),
				(t = UE.KismetSystemLibrary.GetPathName(
					this.GetEffectModel().EffectData,
				)),
				(f = EffectSystem_1.EffectSystem.SpawnEffect(
					f.GetOuter(),
					f.GetTransform(),
					t,
					"[EffectModelMultiEffectSpec.EffectModelGroupSpec]",
					this.Handle.GetContext(),
				)),
				EffectSystem_1.EffectSystem.IsValid(f) &&
					(this.EffectSpecMap.Set(f, f),
					EffectSystem_1.EffectSystem.AddFinishCallback(f, (e) => {
						this.EffectSpecMap.Remove(e);
					}),
					EffectSystem_1.EffectSystem.GetEffectActor(f).K2_AttachToActor(
						this.Handle.GetSureEffectActor(),
						void 0,
						1,
						1,
						1,
						!1,
					)))
			: e < c &&
				(f = this.EffectSpecMap.GetByIndex((t = c - 1))) &&
				(this.EffectSpecMap.RemoveByIndex(t),
				EffectSystem_1.EffectSystem.StopEffectById(
					f,
					"[EffectModelMultiEffectSpec.AdjustNumber]",
					!0,
				));
	}
}
exports.EffectModelMultiEffectSpec = EffectModelMultiEffectSpec;
