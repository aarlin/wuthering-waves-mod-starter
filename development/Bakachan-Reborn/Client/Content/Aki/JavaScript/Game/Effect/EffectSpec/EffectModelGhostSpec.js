"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelGhostSpec = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectSpec_1 = require("./EffectSpec");
class GhostElement {
	constructor(e, t) {
		(this.Name = void 0),
			(this.PoseComponent = void 0),
			(this.Name = e),
			(this.PoseComponent = t);
	}
}
class EffectModelGhostSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.n0e = []),
			(this.s0e = new Map()),
			(this.a0e = new Map()),
			(this.h0e = void 0),
			(this.l0e = 0),
			(this._0e = 0),
			(this.u0e = void 0);
	}
	OnInit() {
		return (this._0e = 1), (this.u0e = this.EffectModel.MaterialRef), !0;
	}
	OnPlay() {
		(this.l0e = -999),
			(this.h0e = this.Handle.GetContext()),
			this.h0e
				? this.h0e.SkeletalMeshComp
					? (this.h0e.UseSpawnRate
							? (this._0e = 1 / Math.max(this.h0e.SpawnRate, 1e-6))
							: (this._0e = this.h0e.SpawnInterval),
						this.CollectSkeletalMesh(this.h0e.SkeletalMeshComp))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderEffect",
							26,
							"残影EffectContext缺少SkeletalMesh组件",
						)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("RenderEffect", 26, "残影EffectContext类型错误");
	}
	static GetComponentName(e) {
		switch (e) {
			case 0:
				return EffectModelGhostSpec.BodyName;
			case 1:
				return EffectModelGhostSpec.WeaponCase0Name;
			case 2:
				return EffectModelGhostSpec.WeaponCase1Name;
			case 3:
				return EffectModelGhostSpec.WeaponCase2Name;
			case 4:
				return EffectModelGhostSpec.WeaponCase3Name;
			case 5:
				return EffectModelGhostSpec.WeaponCase4Name;
			case 6:
				return EffectModelGhostSpec.HuluCaseName;
			case 7:
				return EffectModelGhostSpec.OtherCase0Name;
			case 8:
				return EffectModelGhostSpec.OtherCase1Name;
			case 9:
				return EffectModelGhostSpec.OtherCase2Name;
			case 10:
				return EffectModelGhostSpec.OtherCase3Name;
			case 11:
				return EffectModelGhostSpec.OtherCase4Name;
			case 12:
				return;
		}
	}
	CollectSkeletalMesh(e) {
		var t = e.GetOwner();
		if (t) {
			var o = t.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
				s = o.Num(),
				a = new Map();
			for (let t = 0; t < s; t++) {
				var n = o.Get(t);
				n && n !== e && a.set(n.GetName(), n);
			}
			var h = this.EffectModel.MeshComponentsToUse.Num();
			for (let t = 0; t < h; ++t) {
				var r,
					c = this.EffectModel.MeshComponentsToUse.Get(t);
				0 === c
					? this.a0e.set(e, EffectModelGhostSpec.GetComponentName(c))
					: ((c = EffectModelGhostSpec.GetComponentName(c)),
						(r = a.get(c))
							? this.a0e.set(r, c)
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("RenderEffect", 26, "残影获取Skeletal失败", [
									"name",
									c,
								]));
			}
			var f = this.EffectModel.CustomComponentNames.Num();
			for (let e = 0; e < f; ++e) {
				var i = this.EffectModel.CustomComponentNames.Get(e).toString(),
					l = a.get(i);
				l
					? this.a0e.set(l, i)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("RenderEffect", 26, "残影获取Skeletal失败", [
							"name",
							i,
						]);
			}
			for (const e of this.a0e.values()) this.s0e.set(e, []);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderEffect", 26, "残影获取Actor失败");
	}
	OnTick(e) {
		var t;
		this.c0e(),
			!this.Handle.IsPlaying() ||
				this.Handle.IsStopping() ||
				(t = this._0e) < 0 ||
				(this.LifeTime.TotalPassTime - this.l0e >= t && this.m0e());
	}
	OnCanStop() {
		return !this.n0e || 0 === this.n0e.length;
	}
	yAr() {
		for (const e of this.n0e)
			for (const t of e[0])
				t.PoseComponent.K2_DestroyComponent(t.PoseComponent);
		this.n0e.length = 0;
		for (const e of this.s0e.values())
			for (const t of e) t.K2_DestroyComponent(t);
		this.s0e.clear(), this.a0e.clear(), (this.h0e = void 0);
	}
	OnStop(e, t) {
		t && this.yAr();
	}
	m0e() {
		var e = [];
		for (const a of this.a0e.keys())
			if (a && a.IsVisible() && !a.bHiddenInGame) {
				var t = this.a0e.get(a);
				let n;
				var o = this.s0e.get(t);
				if (o.length)
					(n = o.pop()).SetComponentTickEnabled(!1),
						n.SetVisibility(!0),
						n.Activate(!0);
				else {
					(n = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
						this.Handle.GetSureEffectActor(),
						UE.PoseableMeshComponent.StaticClass(),
						void 0,
						void 0,
						!1,
						this.EffectModel,
					)).SetSkeletalMesh(a.SkeletalMesh, !1),
						n.SetLODBias(3);
					var s = this.u0e;
					for (let e = 0; e < n.GetNumMaterials(); e++) n.SetMaterial(e, s);
				}
				(o = a.K2_GetComponentToWorld()),
					n.K2_SetWorldTransform(o, !1, void 0, !0),
					n.CopyPoseFromSkeletalComponent(a),
					n.SetCustomPrimitiveDataFloat(0, 1),
					e.push(new GhostElement(t, n));
			}
		var a = this.h0e.GhostLifeTime,
			n = this.LifeTime.TotalPassTime;
		this.n0e.push([e, n + a]), (this.l0e = n);
	}
	c0e() {
		let e = 0;
		for (const s of this.n0e) {
			if ((t = s[1]) >= this.LifeTime.TotalPassTime) {
				var t = (t - this.LifeTime.TotalPassTime) / this.h0e.GhostLifeTime,
					o = UE.KuroCurveLibrary.GetValue_Float(
						this.EffectModel.AlphaCurve,
						t,
					);
				for (const e of s[0]) e.PoseComponent.SetCustomPrimitiveDataFloat(0, o);
			} else {
				for (const e of s[0])
					e.PoseComponent.Deactivate(),
						e.PoseComponent.SetVisibility(!1),
						e.PoseComponent.SetComponentTickEnabled(!1),
						this.s0e.get(e.Name).push(e.PoseComponent);
				e++;
			}
		}
		0 < e && this.n0e.splice(0, e);
	}
}
((exports.EffectModelGhostSpec = EffectModelGhostSpec).BodyName = "Body"),
	(EffectModelGhostSpec.WeaponCase0Name = "WeaponCase0"),
	(EffectModelGhostSpec.WeaponCase1Name = "WeaponCase1"),
	(EffectModelGhostSpec.WeaponCase2Name = "WeaponCase2"),
	(EffectModelGhostSpec.WeaponCase3Name = "WeaponCase3"),
	(EffectModelGhostSpec.WeaponCase4Name = "WeaponCase4"),
	(EffectModelGhostSpec.HuluCaseName = "HuluCase"),
	(EffectModelGhostSpec.OtherCase0Name = "OtherCase0"),
	(EffectModelGhostSpec.OtherCase1Name = "OtherCase1"),
	(EffectModelGhostSpec.OtherCase2Name = "OtherCase2"),
	(EffectModelGhostSpec.OtherCase3Name = "OtherCase3"),
	(EffectModelGhostSpec.OtherCase4Name = "OtherCase4");
