"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../../../GlobalData"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	SceneCharacterWaterEffect_1 = require("./SceneCharacterWaterEffect"),
	VoxelUtils_1 = require("../../../Utils/VoxelUtils"),
	PROFILE_KEY = "SceneCharacterInteraction_CheckInWater";
class SceneCharacterInteraction {
	constructor() {
		(this.OwnerCharacter = void 0),
			(this.SwimComponent = void 0),
			(this.IsInGrassRange = !1),
			(this.IsInWaterRange = !1),
			(this.GrassInteractionStrength = 0),
			(this.ActorLocation = void 0),
			(this.TsActorLocation = void 0),
			(this.TsPreviousActorLocation = void 0),
			(this.ActorSpeed = void 0),
			(this.Config = void 0),
			(this.WaterEffect = void 0),
			(this.CapsuleHalfHeight = 0),
			(this.IsEnable = !1),
			(this.IsInWaterOrOnMaterial = !1),
			(this.PhysicalMaterial = void 0),
			(this.WaterHeight = 0),
			(this.WaterNormal = void 0),
			(this.UpdateWaterStateInternal = 0.3),
			(this.UpdateWaterStateInternalPc = 0.15),
			(this.UpdateWaterStateInternalScale = 1),
			(this.UpdateWaterStateCounter = 0),
			(this.IsInGrass = !1),
			(this.TempVector = void 0);
	}
	SetInWater() {
		(this.IsInWaterOrOnMaterial = !0), (this.PhysicalMaterial = void 0);
	}
	SetOnMaterial(t) {
		(this.IsInWaterOrOnMaterial = !0), (this.PhysicalMaterial = t);
	}
	GetInWater() {
		return this.IsInWaterOrOnMaterial && void 0 === this.PhysicalMaterial;
	}
	GetWaterHeight() {
		return this.WaterHeight;
	}
	GetWaterDepth() {
		return this.WaterHeight - (this.TsActorLocation.Z - this.CapsuleHalfHeight);
	}
	Start(t, e, r = 1) {
		(this.OwnerCharacter = t),
			(this.UpdateWaterStateInternalScale = r),
			e
				? ((this.Config = e), this.Init(), this.Enable())
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Render", 26, ": 创建了没有配置的交互控制", [
						"this.OwnerCharacter.GetName()",
						this.OwnerCharacter.GetName(),
					]);
	}
	Update(t) {
		if (this.IsEnable && UE.KismetSystemLibrary.IsValid(this.OwnerCharacter)) {
			(this.ActorLocation = this.OwnerCharacter.K2_GetActorLocation()),
				this.TsPreviousActorLocation.DeepCopy(this.TsActorLocation),
				this.TsActorLocation.FromUeVector(this.ActorLocation),
				this.TsActorLocation.Subtraction(
					this.TsPreviousActorLocation,
					this.TempVector,
				),
				this.TempVector.Division(t, this.ActorSpeed);
			let e = !0;
			(this.UpdateWaterStateCounter -= t),
				0 < this.UpdateWaterStateCounter
					? (e = !1)
					: (this.UpdateWaterStateCounter = this.UpdateWaterStateInternal),
				this.WaterEffect &&
					(e &&
						(this.CheckInWater(t),
						(t = this.TsActorLocation.Z - this.CapsuleHalfHeight),
						this.IsInWaterOrOnMaterial
							? this.PhysicalMaterial
								? this.WaterEffect.SetStateOnMaterial(
										this.PhysicalMaterial,
										this.WaterHeight - t,
										this.WaterNormal,
										this.ActorSpeed,
										this.TsActorLocation,
										this.WaterHeight,
									)
								: this.WaterEffect.SetStateInWater(
										this.WaterHeight - t,
										this.WaterNormal,
										this.ActorSpeed,
										this.TsActorLocation,
										this.WaterHeight,
									)
							: this.WaterEffect.SetStateNone(this.ActorSpeed)),
					this.WaterEffect.Tick()),
				e &&
					this.Config?.自动草集群 &&
					UE.KuroVoxelSystem.IsVoxelSystemInitialized(
						GlobalData_1.GlobalData.GameInstance.GetWorld(),
					) &&
					(VoxelUtils_1.VoxelUtils.GetVoxelInfo(
						GlobalData_1.GlobalData.GameInstance.GetWorld(),
						this.ActorLocation,
					).MtlID === SceneCharacterInteraction.t1r
						? this.IsInGrass ||
							(UE.KuroRenderingRuntimeBPPluginBPLibrary.AddAdditionalClusteredStuff(
								GlobalData_1.GlobalData.World,
								this.Config.草集群特效,
							),
							(this.IsInGrass = !0))
						: this.IsInGrass &&
							(UE.KuroRenderingRuntimeBPPluginBPLibrary.RemoveAdditionalClusteredStuff(
								GlobalData_1.GlobalData.World,
								this.Config.草集群特效,
							),
							(this.IsInGrass = !1)));
		}
	}
	Init() {
		this.OwnerCharacter?.CapsuleComponent &&
			((this.CapsuleHalfHeight =
				this.OwnerCharacter.CapsuleComponent.CapsuleHalfHeight),
			(this.WaterEffect =
				new SceneCharacterWaterEffect_1.SceneCharacterWaterEffect()),
			(this.WaterEffect.Config = this.Config.水特效),
			this.WaterEffect.Start(this.OwnerCharacter),
			this.WaterEffect.Enable()),
			(this.IsInGrassRange = !1),
			(this.IsInWaterRange = !1),
			(this.GrassInteractionStrength = 0),
			(this.IsEnable = !1),
			(this.TempVector = Vector_1.Vector.Create()),
			(this.ActorSpeed = Vector_1.Vector.Create()),
			this.OwnerCharacter &&
				((this.ActorLocation = this.OwnerCharacter.K2_GetActorLocation()),
				(this.TsActorLocation = Vector_1.Vector.Create(this.ActorLocation)),
				(this.TsPreviousActorLocation = Vector_1.Vector.Create(
					this.ActorLocation,
				))),
			1 ===
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
					this.OwnerCharacter,
				) && (this.UpdateWaterStateInternal = this.UpdateWaterStateInternalPc),
			(this.UpdateWaterStateInternal *= this.UpdateWaterStateInternalScale);
	}
	Enable() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderEffect", 26, "交互配置启用", [
				"Actor",
				this.OwnerCharacter?.GetName(),
			]),
			SceneCharacterInteraction.koe(),
			(this.IsEnable = !0),
			(this.SwimComponent =
				this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(66)),
			this.OwnerCharacter.CapsuleComponent && this.CheckInWater(0);
	}
	Disable() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderEffect", 26, "交互配置禁用", [
				"Actor",
				this.OwnerCharacter?.GetName(),
			]),
			(this.IsEnable = !1),
			this.ClearInWaterOrOnMaterialState(),
			this.WaterEffect && this.WaterEffect.Disable();
	}
	GetEnabled() {
		return this.IsEnable;
	}
	Destroy() {
		this.Disable();
	}
	ClearInWaterOrOnMaterialState() {
		(this.IsInWaterOrOnMaterial = !1), (this.PhysicalMaterial = void 0);
	}
	static koe() {
		var t = UE.NewObject(UE.TraceSphereElement.StaticClass()),
			e =
				((e =
					((t.WorldContextObject = GlobalData_1.GlobalData.World),
					(t.bIsSingle = !1),
					(t.bIgnoreSelf = !0),
					(t.Radius = 1),
					UE.NewArray(UE.BuiltinByte))).Add(
					QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
				),
				(0, puerts_1.$ref)(e));
		t.SetObjectTypesQuery(e),
			(t.DrawTime = 10),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				t,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				t,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			t.SetDrawDebugTrace(this.i1r ? 2 : 0),
			(SceneCharacterInteraction.Nnr = t);
	}
	static SetTraceDebug(t) {
		SceneCharacterInteraction.Nnr.SetDrawDebugTrace(t ? 2 : 0);
	}
	CheckInWater(t) {
		if (this.Config?.启用水面交互) {
			SceneCharacterInteraction.Nnr || SceneCharacterInteraction.koe();
			var e = (r = (a =
					this.OwnerCharacter
						.CapsuleComponent).K2_GetComponentLocation()).op_Addition(
					new UE.Vector(0, 0, a.CapsuleHalfHeight),
				),
				r = r.op_Addition(
					new UE.Vector(0, 0, -a.CapsuleHalfHeight - this.Config.射线向下延长),
				),
				a = SceneCharacterInteraction.Nnr;
			(e =
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, r),
				TraceElementCommon_1.TraceElementCommon.SphereTrace(a, PROFILE_KEY))),
				(r = a.HitResult);
			if (e && r.bBlockingHit) {
				var i = a.HitResult,
					o = i.GetHitCount();
				for (let t = 0; t < o; ++t) {
					if (
						2 ===
						i.Components.Get(t).BodyInstance.CollisionResponses
							.ResponseToChannels.GameTraceChannel2
					)
						return (
							(this.WaterHeight = i.LocationZ_Array.Get(t)),
							(this.WaterNormal = Vector_1.Vector.Create(
								i.ImpactNormalX_Array.Get(t),
								i.ImpactNormalY_Array.Get(t),
								i.ImpactNormalZ_Array.Get(t),
							)),
							void this.SetInWater()
						);
					var n = i.Components.Get(t);
					let e;
					if (
						(e =
							n instanceof UE.LandscapeHeightfieldCollisionComponent
								? i.PhysMaterials.Get(t)
								: UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(
										n,
									)) &&
						this.WaterEffect.IsMaterialInUse(e)
					)
						return (
							(this.WaterHeight = i.LocationZ_Array.Get(t)),
							(this.WaterNormal = Vector_1.Vector.Create(
								i.ImpactNormalX_Array.Get(t),
								i.ImpactNormalY_Array.Get(t),
								i.ImpactNormalZ_Array.Get(t),
							)),
							void this.SetOnMaterial(e)
						);
				}
			}
			this.ClearInWaterOrOnMaterialState();
		} else
			this.Config?.启用简易水面交互 &&
				this.SwimComponent &&
				((e = this.SwimComponent.GetAboveFootWaterSurfaceInfo())
					? ((this.WaterHeight = e.WaterHeight + e.Location.Z),
						(this.WaterNormal = e.SurfaceNormal),
						this.SetInWater())
					: this.ClearInWaterOrOnMaterialState());
	}
}
(SceneCharacterInteraction.t1r = 2),
	(SceneCharacterInteraction.Nnr = void 0),
	(SceneCharacterInteraction.i1r = !1),
	(exports.default = SceneCharacterInteraction);
