"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelTrailSpec = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelTrailSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.ParentActor = void 0),
			(this.AttachCount = 0),
			(this.SkeletalMeshComp = void 0),
			(this.WorldToParentActor = void 0),
			(this.UseBones = !1),
			(this.AttachBoneNames = void 0),
			(this.AttachLocations = void 0),
			(this.UnitLength = 0),
			(this.LocationsCurve = void 0),
			(this.DissipateNum = 0),
			(this.IsDead = !1),
			(this.LastSubdivision = 0),
			(this.DissipateLeft = 0),
			(this.LocationsFromCurve = void 0),
			(this.DyMaterial = void 0),
			(this.MaterialParameters = void 0),
			(this.BezierMeshComp = void 0),
			(this.t0e = !1),
			(this.MaxSubdivision = 12),
			(this.MaxMeshLength = 100),
			(this.MaxLayerNum = 600),
			(this.cz = void 0);
	}
	OnCanStop() {
		return !0;
	}
	OnInit() {
		return (this.ParentActor = this.Handle.GetSureEffectActor()), !0;
	}
	Setup(e) {
		if (((this.SkeletalMeshComp = e), this.SkeletalMeshComp)) {
			if (this.EffectModel.AttachToBones) {
				if (
					((this.UseBones = !0),
					(this.AttachCount = this.EffectModel.AttachBoneNames.Num()),
					this.AttachCount < 2)
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("RenderEffect", 26, "拖尾特效绑定点数量不足", [
							"DA文件",
							this.EffectModel.GetName(),
						])
					);
				(this.AttachBoneNames = new Array()),
					(this.AttachLocations = new Array());
				for (let e = 0; e < this.AttachCount; e++) {
					var t = this.EffectModel.AttachBoneNames.Get(e);
					let i = Vector_1.Vector.Create(0, 0, 0);
					if (
						(this.EffectModel.RelativeLocations.Num() > e &&
							(i = Vector_1.Vector.Create(
								this.EffectModel.RelativeLocations.Get(e),
							)),
						!this.SkeletalMeshComp.DoesSocketExist(t))
					)
						return void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								26,
								"拖尾特效找不到插槽",
								["DA文件", this.EffectModel.GetName()],
								["网格体", this.SkeletalMeshComp.GetName()],
								["插槽名", t],
							)
						);
					this.AttachBoneNames.push(t), this.AttachLocations.push(i);
				}
			} else {
				if (
					((this.UseBones = !1),
					(this.AttachCount = this.EffectModel.RelativeLocations.Num()),
					this.AttachCount < 2)
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("RenderEffect", 26, "拖尾特效绑定点数量不足", [
							"DA文件",
							this.EffectModel.GetName(),
						])
					);
				this.AttachLocations = new Array();
				for (let e = 0; e < this.AttachCount; e++) {
					var i = Vector_1.Vector.Create(
						this.EffectModel.RelativeLocations.Get(e),
					);
					this.AttachLocations.push(i);
				}
			}
			(this.BezierMeshComp =
				EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
					this.ParentActor,
					UE.KuroBezierMeshComponent.StaticClass(),
					void 0,
					void 0,
					!1,
					this.EffectModel,
				)),
				(this.SceneComponent = this.BezierMeshComp),
				(this.t0e = this.BezierMeshComp.IsComponentTickEnabled()),
				this.BezierMeshComp.SetComponentTickEnabled(!1),
				(this.DyMaterial =
					UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
						this.BezierMeshComp,
						this.EffectModel.Material,
					)),
				this.BezierMeshComp.SetMaterial(0, this.DyMaterial),
				(this.MaterialParameters = new EffectMaterialParameter_1.default(
					this.EffectModel.FloatParameters,
					this.EffectModel.ColorParameters,
				)),
				this.MaterialParameters.Apply(this.DyMaterial, 0, !0),
				this.BezierMeshComp.Setup(
					this.AttachCount,
					this.EffectModel.UnitLength,
				),
				(this.WorldToParentActor = this.ParentActor.GetTransform().Inverse()),
				(this.LocationsCurve = this.EffectModel.LocationsCurve),
				(this.LocationsFromCurve = new Array());
			for (let e = 0; e < this.AttachCount; e++) {
				var s = Vector_1.Vector.Create(0, 0, 0);
				this.LocationsFromCurve.push(s);
			}
			(this.cz = Vector_1.Vector.Create(0, 0, 0)),
				(this.DissipateNum = 0),
				(this.IsDead = !1),
				(this.DissipateLeft = 0);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					26,
					"拖尾特效错误：没有寻找到骨骼模型",
					["DA文件", this.EffectModel.GetName()],
				);
	}
	OnTick() {
		if (this.BezierMeshComp) {
			this.IsDead ||
				this.SkeletalMeshComp?.IsValid() ||
				this.Stop("[EffectModelTrailSpec.OnTick]", !1);
			var e = this.LocationsCurve.Num();
			for (let s = 0; s < e; s++) {
				var t = this.LocationsCurve.GetKey(s),
					i = this.LocationsCurve.Get(t);
				i = UE.KuroCurveLibrary.GetValue_Vector(i, this.LifeTime.TotalPassTime);
				this.LocationsFromCurve[t].FromUeVector(i);
			}
			if (
				(this.BezierMeshComp.GetLayerNum() > this.MaxLayerNum &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("RenderEffect", 26, "拖尾特效太长", [
							"特效名",
							this.EffectModel.GetName(),
						]),
					this.SetDead()),
				!this.IsDead)
			) {
				for (let e = 0; e < this.AttachCount; e++) {
					var s = this.GetAttachLocation(e);
					this.BezierMeshComp.SetKeyPoint(e, s.X, s.Y, s.Z);
				}
				var o = UE.KuroCurveLibrary.GetValue_Float(
					this.EffectModel.Alpha,
					this.LifeTime.TotalPassTime,
				);
				this.BezierMeshComp.AddLayer(o);
			}
			let r = 0,
				a =
					((r = this.IsDead
						? this.EffectModel.DissipateSpeedAfterDead
						: UE.KuroCurveLibrary.GetValue_Float(
								this.EffectModel.DissipateSpeed,
								this.LifeTime.TotalPassTime,
							)),
					this.Handle.GetIgnoreTimeScale() ||
						(r = r * this.GetTimeScale() * this.GetGlobalTimeScale()),
					(r += this.DissipateLeft),
					Math.floor(r));
			(this.DissipateLeft = r - a),
				(o = this.BezierMeshComp.GetMeshHeight() - this.MaxMeshLength) > a &&
					((a = o), (this.DissipateLeft = 0)),
				this.BezierMeshComp.Dissipate(a),
				this.BezierMeshComp.UpdateMesh(0),
				this.MaterialParameters.Apply(
					this.DyMaterial,
					this.LifeTime.PassTime,
					!1,
				);
		}
	}
	OnEnd() {
		return (
			this.BezierMeshComp?.GetOwner() &&
				this.BezierMeshComp.GetOwner().K2_DestroyComponent(this.BezierMeshComp),
			!0
		);
	}
	SetDead() {
		this.IsDead = !0;
	}
	ShouldDestroy() {
		return (
			!this.BezierMeshComp ||
			!(
				!this.IsDead ||
				(!this.EffectModel.DestroyAtOnce &&
					0 !== this.BezierMeshComp.GetMeshHeight())
			)
		);
	}
	GetAttachLocation(e) {
		let t, i;
		return (
			this.AttachLocations[e].Addition(this.LocationsFromCurve[e], this.cz),
			(t = this.UseBones
				? this.SkeletalMeshComp.GetSocketTransform(this.AttachBoneNames[e], 0)
				: this.SkeletalMeshComp.K2_GetComponentToWorld()),
			(i = this.WorldToParentActor.TransformPosition(
				t.TransformPosition(this.cz.ToUeVector(!0)),
			)),
			Vector_1.Vector.Create(i)
		);
	}
	OnStop(e, t) {
		this.BezierMeshComp?.SetComponentTickEnabled(!1), this.SetDead();
	}
	OnPlay(e) {
		this.BezierMeshComp?.SetComponentTickEnabled(this.t0e);
	}
}
exports.EffectModelTrailSpec = EffectModelTrailSpec;
