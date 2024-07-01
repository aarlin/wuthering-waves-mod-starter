"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharNpcDitherEffect = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharNpcDitherEffect extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.gU = !1),
			(this.Rar = new Array()),
			(this.Tfi = !0),
			(this.k$o = -0);
	}
	Start() {
		this.OnInitSuccess();
	}
	EnableNpcDitherEffect() {
		this.gU &&
			this.Rar.forEach((e) => {
				ObjectUtils_1.ObjectUtils.IsValid(e) && e.SetUseCustomAlphaTest(!0);
				var t = e.GetMaterials();
				for (let a = 0, i = t.Num(); a < i; a++) {
					let i;
					var r = t.Get(a);
					r &&
						(r instanceof UE.MaterialInstanceDynamic
							? (i = r)
							: ((i = e.CreateDynamicMaterialInstance(a, t.Get(a))),
								e.SetMaterial(a, i)),
						i.SetScalarParameterValue(
							RenderConfig_1.RenderConfig.UseDitherEffect,
							1,
						));
				}
			});
	}
	RemoveNpcDitherEffect() {
		this.gU &&
			this.Rar.forEach((e) => {
				ObjectUtils_1.ObjectUtils.IsValid(e) && e.SetUseCustomAlphaTest(!1);
				var t = e.GetMaterials();
				for (let e = 0, a = t.Num(); e < a; e++) {
					var r = t.Get(e);
					r instanceof UE.MaterialInstanceDynamic &&
						r.SetScalarParameterValue(
							RenderConfig_1.RenderConfig.UseDitherEffect,
							0,
						);
				}
			});
	}
	SetNpcDitherEffect(e) {
		if (this.gU && 0 !== this.Rar.length) {
			var t = MathUtils_1.MathUtils.Clamp(e, 0, 1);
			let r = !1;
			this.Tfi ? ((this.Tfi = !1), (r = !0)) : this.k$o !== t && (r = !0),
				r &&
					((this.k$o = e),
					this.Rar.forEach((e) => {
						var t = e.GetMaterials();
						for (let a = 0, i = t.Num(); a < i; a++) {
							let i;
							var r = t.Get(a);
							r &&
								(r instanceof UE.MaterialInstanceDynamic
									? (i = r)
									: ((i = e.CreateDynamicMaterialInstance(a, t.Get(a))),
										e.SetMaterial(a, i)),
								i.SetScalarParameterValue(
									RenderConfig_1.RenderConfig.DitherValue,
									this.k$o,
								));
						}
					}));
		}
	}
	UpdateSkeletalComponents(e) {
		if ((this.gU || this.Uar(), e && ObjectUtils_1.ObjectUtils.IsValid(e))) {
			var t = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
			this.Rar.length = 0;
			for (let e = t.Num() - 1; 0 <= e; --e) {
				var r = t.Get(e);
				if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
					var a = r.SkeletalMesh;
					if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
						var i = r.GetMaterials();
						for (let e = 0, t = i.Num(); e < t; e++) {
							var s = r.CreateDynamicMaterialInstance(e, i.Get(e));
							r.SetMaterial(e, s);
						}
						this.Rar.push(r);
					}
				}
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					12,
					"NPC Rendering传入了一个无效的actor",
				);
	}
	Uar() {
		this.gU
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderCharacter", 12, "重复调用NPC dither初始化方法:")
			: (this.gU = !0);
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdNpcDitherEffect;
	}
	GetStatName() {
		return "CharNpcDitherEffect";
	}
}
exports.CharNpcDitherEffect = CharNpcDitherEffect;
