"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombineMeshTool = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
class CombineMeshTool {
	static LoadDaConfig(o, e, t, s) {
		o &&
			t &&
			s &&
			(this.BWo(t, s),
			this.bWo(o, e, t, s.Skel_Hair, s),
			this.qWo(o, e, t, s.Skel_Face, s),
			1 === s.NpcSetupType
				? (this.GWo(o, e, t, s.Skel_BodyUp, s),
					this.NWo(o, e, t, s.Skel_BodyDown, s))
				: this.OWo(o, e, t, s.Skel_Body, s),
			this.kWo(o, t, s.Hook_Arm, s.Hook_Arm_Socket, s),
			this.kWo(o, t, s.Hook_Back, s.Hook_Back_Socket, s),
			this.kWo(o, t, s.Hook_Leg, s.Hook_Leg_Socket, s),
			this.kWo(o, t, s.Hook_Waist, s.Hook_Waist_Socket, s),
			this.kWo(o, t, s.Hook_Weapon, s.Hook_Weapon_Socket, s),
			this.kWo(o, t, s.Hook_Head, s.Hook_Head_Socket, s));
	}
	static BWo(o, e) {
		o.SetSkeletalMesh(void 0),
			o.SetVisibility(!0, !1),
			(o.bRenderInMainPass = !1),
			(o.CastShadow = !0),
			ObjectUtils_1.ObjectUtils.IsValid(e.Skel_Main) &&
				o.SetSkeletalMesh(e.Skel_Main, !0);
	}
	static FWo(o, e, t, s, i, a, l = !1) {
		if (
			i &&
			ObjectUtils_1.ObjectUtils.IsValid(i) &&
			ObjectUtils_1.ObjectUtils.IsValid(e)
		) {
			var r = e.AddComponentByClass(
				UE.SkeletalMeshComponent.StaticClass(),
				!0,
				t,
				!1,
				a,
			);
			if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
				if (
					((r.bUseAttachParentBound = !0),
					(r.bUseBoundsFromMasterPoseComponent = !0),
					r.SetSkeletalMesh(i, !0),
					r.SetMasterPoseComponent(s, !1),
					(i = r.K2_AttachToComponent(s, a, 2, 2, 0, !0)),
					(r.CastShadow = !1),
					i)
				)
					return (
						l && r.K2_SetRelativeTransform(t, !1, void 0, !1),
						r.ComponentTags.Add(this.VWo),
						r
					);
				r.K2_DestroyComponent(e);
			}
		}
	}
	static bWo(o, e, t, s, i) {
		(o = this.FWo(i, o, e, t, s, this.HWo)) &&
			i.bDyeColor &&
			(((e = new UE.LinearColor(i.Skel_Hair_Color)).A = 1),
			this.jWo(o, i.SkinDyeColor, e));
	}
	static qWo(o, e, t, s, i) {
		(e = this.FWo(i, o, e, t, s, this.WWo)) &&
			(o.IsA(UE.BP_BaseNPC_C.StaticClass()) && (o.CombineFaceMesh = e),
			i.bDyeColor) &&
			this.jWo(e, i.SkinDyeColor);
	}
	static GWo(o, e, t, s, i) {
		(o = this.FWo(i, o, e, t, s, this.KWo)) &&
			i.bDyeColor &&
			(((e = new UE.LinearColor(i.Skel_BodyUp_Color)).A = 1),
			this.jWo(o, i.SkinDyeColor, e));
	}
	static NWo(o, e, t, s, i) {
		(o = this.FWo(i, o, e, t, s, this.QWo)) &&
			i.bDyeColor &&
			(((e = new UE.LinearColor(i.Skel_BodyDown_Color)).A = 1),
			this.jWo(o, i.SkinDyeColor, e));
	}
	static OWo(o, e, t, s, i) {
		(o = this.FWo(i, o, e, t, s, this.XWo)) &&
			i.bDyeColor &&
			(((e = new UE.LinearColor(i.Body_Dyecolor01)).A = 1),
			((t = new UE.LinearColor(i.Body_Dyecolor02)).A = 1),
			this.jWo(o, i.SkinDyeColor, e, t));
	}
	static jWo(o, e, t, s) {
		var i = o.GetMaterials();
		for (let l = 0, r = i.Num(); l < r; l++) {
			var a = o.CreateDynamicMaterialInstance(l, i.Get(l));
			a &&
				(a.SetVectorParameterValue(this.$Wo, e),
				t && a.SetVectorParameterValue(this.YWo, t),
				s) &&
				a.SetVectorParameterValue(this.JWo, s);
		}
	}
	static kWo(o, e, t, s, i) {
		if (s && t && 0 !== t.Num())
			if (e.DoesSocketExist(s))
				for (let r = 0, n = t.Num(); r < n; r++) {
					var a = (l = t.Get(r)).Transform,
						l = l.Mesh;
					this.FWo(i, o, a, e, l, s, !0);
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						30,
						"目标不存在挂点",
						["Actor", o.GetName()],
						["Socket", s],
					);
	}
}
((exports.CombineMeshTool = CombineMeshTool).VWo = new UE.FName(
	"PartMeshComp",
)),
	(CombineMeshTool.$Wo = new UE.FName("5BaseColorTint")),
	(CombineMeshTool.YWo = new UE.FName("1BaseColorTint")),
	(CombineMeshTool.JWo = new UE.FName("2BaseColorTint")),
	(CombineMeshTool.WWo = new UE.FName("Face")),
	(CombineMeshTool.HWo = new UE.FName("Hair")),
	(CombineMeshTool.XWo = new UE.FName("Body")),
	(CombineMeshTool.KWo = new UE.FName("BodyUp")),
	(CombineMeshTool.QWo = new UE.FName("BodyDown"));
