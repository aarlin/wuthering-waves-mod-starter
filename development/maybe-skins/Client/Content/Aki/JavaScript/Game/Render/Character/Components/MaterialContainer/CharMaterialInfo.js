"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharMaterialSlot = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	STAR_SCAR_SLOT_NAME = "MI_Star",
	ORIGINAL_INDEX = 0,
	CACHE_INDEX = 1,
	TARGET_INDEX = 2;
class ColorTempContainer {
	constructor() {
		(this.ColorR = -0),
			(this.ColorG = -0),
			(this.ColorB = -0),
			(this.ColorA = -0);
	}
}
class CharMaterialSlot {
	constructor() {
		(this.DynamicMaterial = void 0),
			(this.FloatParamMap = void 0),
			(this.VectorParamMap = void 0),
			(this.TextureParamMap = void 0),
			(this.ReplaceMaterialArray = void 0),
			(this.SlotName = ""),
			(this.MaterialIndex = 0),
			(this.SectionIndex = 0),
			(this.IsStarScar = !1),
			(this.MaterialPartType = 0),
			(this.SlotType = 0),
			(this.MaterialDirty = !1),
			(this.Uhr = !1),
			(this.Ahr = !1),
			(this.Phr = !1);
	}
	Init(a, t, e) {
		(this.SlotName = t),
			(this.MaterialIndex = a),
			(this.SectionIndex = RenderConfig_1.INVALID_SECTION_INDEX),
			(this.Uhr = !1),
			(this.Ahr = !1),
			(this.Phr = !1),
			(this.IsStarScar = "MI_Star" === t),
			(this.SlotType = RenderConfig_1.RenderConfig.GetMaterialSlotType(t)),
			(this.MaterialPartType =
				RenderConfig_1.RenderConfig.GetMaterialPartType(t)),
			this.SetDynamicMaterial(e),
			(this.ReplaceMaterialArray = new Array());
	}
	SetDynamicMaterial(a) {
		(this.DynamicMaterial = a),
			(this.FloatParamMap = new Map()),
			(this.VectorParamMap = new Map()),
			(this.TextureParamMap = new Map()),
			(this.MaterialDirty = !0);
	}
	SetSkeletalMeshMaterial(a) {
		var t;
		this.MaterialDirty &&
			((this.MaterialDirty = !1),
			0 < (t = this.ReplaceMaterialArray.length)
				? a.SetMaterial(this.MaterialIndex, this.ReplaceMaterialArray[t - 1])
				: a.SetMaterial(this.MaterialIndex, this.DynamicMaterial));
	}
	UpdateMaterialParam() {
		if (this.IsDynamicMaterialValid()) {
			var a = this.DynamicMaterial;
			if (this.Uhr) {
				this.Uhr = !1;
				for (const r of this.FloatParamMap.keys()) {
					var t,
						e = this.FloatParamMap.get(r);
					e[1] !== e[2] &&
						((e[1] = e[2]),
						(t = FNameUtil_1.FNameUtil.GetDynamicFName(r)),
						a.SetScalarParameterValue(t, e[2]));
				}
			}
			if (this.Ahr) {
				this.Ahr = !1;
				for (const t of this.VectorParamMap.keys()) {
					var r,
						i = this.VectorParamMap.get(t);
					i[1] !== i[2] &&
						((i[1] = i[2]),
						(i = new UE.LinearColor(
							i[2].ColorR,
							i[2].ColorG,
							i[2].ColorB,
							i[2].ColorA,
						)),
						(r = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
						a.SetVectorParameterValue(r, i));
				}
			}
			if (this.Phr) {
				this.Phr = !1;
				for (const t of this.TextureParamMap.keys()) {
					var l = this.TextureParamMap.get(t),
						s = l[2];
					void 0 !== s &&
						l[1] !== s &&
						((l[1] = s),
						(l = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
						a.SetTextureParameterValue(l, s));
				}
			}
		}
	}
	SetReplaceMaterial(a) {
		this.ReplaceMaterialArray.push(a), (this.MaterialDirty = !0);
	}
	RevertReplaceMaterial(a) {
		var t = new Array();
		let e = !1;
		for (let r = 0; r < this.ReplaceMaterialArray.length; r++)
			this.ReplaceMaterialArray[r] !== a
				? t.push(this.ReplaceMaterialArray[r])
				: (e = !0);
		return (this.ReplaceMaterialArray = t), (this.MaterialDirty = !0), e;
	}
	SetFloat(a, t) {
		var e;
		this.IsDynamicMaterialValid() &&
			((e = a.toString()),
			(this.Uhr = !0),
			this.FloatParamMap.has(e)
				? (this.FloatParamMap.get(e)[2] = t)
				: this.FloatParamMap.set(e, [
						this.DynamicMaterial.K2_GetScalarParameterValue(a),
						t + 1,
						t,
					]));
	}
	RevertFloat(a) {
		this.IsDynamicMaterialValid() &&
			this.FloatParamMap.has(a) &&
			((this.Uhr = !0), ((a = this.FloatParamMap.get(a))[2] = a[0]));
	}
	SetColor(a, t) {
		var e, r;
		this.IsDynamicMaterialValid() &&
			((e = a.toString()),
			(this.Ahr = !0),
			((r = new ColorTempContainer()).ColorR = t.R),
			(r.ColorG = t.G),
			(r.ColorB = t.B),
			(r.ColorA = t.A),
			this.VectorParamMap.has(e)
				? (this.VectorParamMap.get(e)[2] = r)
				: ((t = this.DynamicMaterial.K2_GetVectorParameterValue(a)),
					((a = new ColorTempContainer()).ColorR = t.R),
					(a.ColorG = t.G),
					(a.ColorB = t.B),
					(a.ColorA = t.A),
					this.VectorParamMap.set(e, [a, void 0, r])));
	}
	RevertColor(a) {
		this.IsDynamicMaterialValid() &&
			this.VectorParamMap.has(a) &&
			((this.Ahr = !0), ((a = this.VectorParamMap.get(a))[2] = a[0]));
	}
	SetTexture(a, t) {
		var e;
		this.IsDynamicMaterialValid() &&
			((e = a.toString()),
			(this.Phr = !0),
			this.TextureParamMap.has(e)
				? (this.TextureParamMap.get(e)[2] = t)
				: this.TextureParamMap.set(e, [
						this.DynamicMaterial.K2_GetTextureParameterValue(a),
						void 0,
						t,
					]));
	}
	RevertTexture(a) {
		this.IsDynamicMaterialValid() &&
			this.TextureParamMap.has(a) &&
			((this.Phr = !0), ((a = this.TextureParamMap.get(a))[2] = a[0]));
	}
	RevertProperty(a) {
		this.IsDynamicMaterialValid() &&
			((a = a.toString()),
			this.RevertColor(a),
			this.RevertFloat(a),
			this.RevertTexture(a));
	}
	SetStarScarEnergy(a) {
		this.IsDynamicMaterialValid() &&
			this.IsStarScar &&
			this.SetFloat(RenderConfig_1.RenderConfig.StarScarEnergyControl, a);
	}
	IsDynamicMaterialValid() {
		return void 0 !== this.DynamicMaterial && this.DynamicMaterial.IsValid();
	}
}
exports.CharMaterialSlot = CharMaterialSlot;
