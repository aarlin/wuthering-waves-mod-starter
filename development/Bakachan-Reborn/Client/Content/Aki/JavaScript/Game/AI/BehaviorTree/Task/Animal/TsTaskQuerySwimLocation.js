"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	IEntity_1 = require("../../../../../UniverseEditor/Interface/IEntity"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
	ColorUtils_1 = require("../../../../Utils/ColorUtils"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	DISTANCE_FROM_WATER_SURFACE = 200,
	SAFE_RANGE = 20,
	BLACKBOARD_KEY_SWIM_LOCATION = "SwimLocation",
	PROFILE_KEY = "TsTaskQuerySwimLocation";
class TsTaskQuerySwimLocation extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.Angle = 0),
			(this.InnerDiameter = 0),
			(this.OuterDiameter = 0),
			(this.DebugMode = !1),
			(this.IsInitTsVariables = !1),
			(this.TsAngle = 0),
			(this.TsInnerDiameter = 0),
			(this.TsOuterDiameter = 0),
			(this.TsDebugMode = !1),
			(this.HaveRangeConfig = !1),
			(this.RangeInited = !1),
			(this.Center = void 0),
			(this.Size = void 0),
			(this.Rotator = void 0),
			(this.VectorCache2 = void 0),
			(this.TargetVector = void 0),
			(this.VectorCache = void 0),
			(this.TraceElement = void 0),
			(this.ShallowTraceElement = void 0),
			(this.InitZ = -0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsAngle = this.Angle),
			(this.TsInnerDiameter = this.InnerDiameter),
			(this.TsOuterDiameter = this.OuterDiameter),
			(this.TsDebugMode = this.DebugMode),
			(this.HaveRangeConfig = !1),
			(this.RangeInited = !1),
			(this.Center = Vector_1.Vector.Create()),
			(this.Size = Vector_1.Vector.Create()),
			(this.Rotator = Rotator_1.Rotator.Create()),
			(this.TargetVector = Vector_1.Vector.Create()),
			(this.VectorCache = Vector_1.Vector.Create()),
			(this.VectorCache2 = Vector_1.Vector.Create()));
	}
	ReceiveExecuteAI(e, t) {
		if ((r = e.AiController)) {
			var o, r;
			this.InitTsVariables(), this.InitTraceElement();
			const e = (r = r.CharActorComp).CreatureData;
			if (((this.HaveRangeConfig = this.InitRange(e)), !this.InitZ)) {
				const e = r.CreatureData;
				this.InitZ = e.GetInitLocation().Z ?? r.ActorLocationProxy.Z;
			}
			this.ShallowTraceElement.SetBoxHalfSize(
				r.Radius + 20,
				r.Radius + 20,
				r.HalfHeight + 20,
			),
				this.HaveRangeConfig
					? ((o = TsTaskQuerySwimLocation.RandomPointInBoxRange2D(
							this.Size.X,
							this.Size.Y,
							this.Rotator.Yaw,
						)),
						(this.TargetVector.X = this.Center.X + o.X),
						(this.TargetVector.Y = this.Center.Y + o.Y))
					: ((o = TsTaskQuerySwimLocation.RandomPointInFanRing(
							this.TsInnerDiameter,
							this.TsOuterDiameter,
							((r.ActorRotationProxy.Yaw - this.TsAngle / 2) / 180) * Math.PI,
							((r.ActorRotationProxy.Yaw + this.TsAngle / 2) / 180) * Math.PI,
						)),
						(this.TargetVector.X = r.ActorLocationProxy.X + o.X),
						(this.TargetVector.Y = r.ActorLocationProxy.Y + o.Y)),
				(this.TargetVector.Z = this.InitZ),
				this.CheckInWater(this.TargetVector) &&
				this.CheckReachable(r.ActorLocationProxy, this.TargetVector) &&
				(this.DebugDrawRange(),
				!this.HaveRangeConfig || this.IsInBoxRange2D(this.TargetVector))
					? (this.DebugDraw(
							this.TargetVector,
							ColorUtils_1.ColorUtils.LinearGreen,
						),
						BlackboardController_1.BlackboardController.SetVectorValueByEntity(
							r.Entity.Id,
							"SwimLocation",
							this.TargetVector.X,
							this.TargetVector.Y,
							this.TargetVector.Z,
						),
						this.Finish(!0))
					: (this.DebugDraw(
							this.TargetVector,
							ColorUtils_1.ColorUtils.LinearRed,
						),
						this.Finish(!1));
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	InitRange(e) {
		if (!this.RangeInited) {
			var t = e.GetPbEntityInitData().ComponentsData;
			if (
				!(t = (0, IComponent_1.getComponent)(t, "AnimalComponent")) ||
				void 0 === t.MoveRange
			)
				return !1;
			t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.MoveRange);
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
				t.BlueprintType,
			);
			t = (0, IEntity_1.decompressEntityData)(t, o);
			if (
				"Box" !==
				(o = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"RangeComponent",
				).Shape).Type
			)
				return !1;
			(t = t.Transform),
				this.InitCenter(t, o),
				this.InitSize(t, o),
				this.InitRotator(t, o),
				(0 === this.Rotator.Pitch && 0 === this.Rotator.Roll) ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("BehaviorTree", 30, "池塘范围不支持Roll和Pitch", [
							"EntityConfigId",
							e.GetPbDataId(),
						]),
					(this.Rotator.Pitch = 0),
					(this.Rotator.Roll = 0)),
				(this.RangeInited = !0);
		}
		return !0;
	}
	InitCenter(e, t) {
		this.Center || (this.Center = Vector_1.Vector.Create()),
			(this.Center.X = e?.Pos.X ?? 0),
			(this.Center.X += t.Center.X ?? 0),
			(this.Center.Y = e?.Pos.Y ?? 0),
			(this.Center.Y += t.Center.Y ?? 0),
			(this.Center.Z = e?.Pos.Z ?? 0),
			(this.Center.Z += t.Center.Z ?? 0);
	}
	InitSize(e, t) {
		this.Size || (this.Size = Vector_1.Vector.Create()),
			(this.Size.X = t.Size.X ?? 0),
			(this.Size.X *= e?.Scale?.X ?? 1),
			(this.Size.Y = t.Size.Y ?? 0),
			(this.Size.Y *= e?.Scale?.Y ?? 1),
			(this.Size.Z = t.Size.Z ?? 0),
			(this.Size.Z *= e?.Scale?.Z ?? 1);
	}
	InitRotator(e, t) {
		this.Rotator || (this.Rotator = Rotator_1.Rotator.Create()),
			(this.Rotator.Pitch = t.Rotator?.Y ?? 0),
			(this.Rotator.Pitch += e?.Rot?.Y ?? 0),
			(this.Rotator.Yaw = t.Rotator?.Z ?? 0),
			(this.Rotator.Yaw += e?.Rot?.Z ?? 0),
			(this.Rotator.Roll = t.Rotator?.X ?? 0),
			(this.Rotator.Roll += e?.Rot?.X ?? 0);
	}
	static RandomPointInBoxRange2D(e, t, o) {
		(e = MathUtils_1.MathUtils.GetRandomRange(-e, e)),
			(t = MathUtils_1.MathUtils.GetRandomRange(-t, t)),
			(o *= MathUtils_1.MathUtils.DegToRad);
		var r = Math.cos(o);
		return { X: e * r - t * (o = Math.sin(o)), Y: e * o + t * r };
	}
	static RandomPointInFanRing(e, t, o, r) {
		return r < o || t < e || e < 0
			? { X: 0, Y: 0 }
			: ((e = MathUtils_1.MathUtils.GetRandomRange(e * e, t * t)),
				(t = MathUtils_1.MathUtils.GetRandomRange(o, r)),
				{ X: (o = Math.sqrt(e)) * Math.cos(t), Y: o * Math.sin(t) });
	}
	IsInBoxRange2D(e) {
		this.VectorCache2.DeepCopy(e),
			this.VectorCache2.SubtractionEqual(this.Center);
		e = this.VectorCache2.X;
		var t = this.VectorCache2.Y,
			o = -this.Rotator.Yaw * MathUtils_1.MathUtils.DegToRad,
			r = Math.cos(o);
		o = Math.sin(o);
		return (
			(this.VectorCache2.X = r * e - o * t),
			(this.VectorCache2.Y = o * e + r * t),
			this.VectorCache2.X > -this.Size.X &&
				this.VectorCache2.X < +this.Size.X &&
				this.VectorCache2.Y > -this.Size.Y &&
				this.VectorCache2.Y < +this.Size.Y
		);
	}
	InitTraceElement() {
		this.TraceElement ||
			((this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.TraceElement.bIsSingle = !0),
			(this.TraceElement.bIgnoreSelf = !0),
			this.TraceElement.SetTraceTypeQuery(
				QueryTypeDefine_1.KuroTraceTypeQuery.Water,
			),
			this.TraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.TraceElement,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.TraceElement,
				ColorUtils_1.ColorUtils.LinearRed,
			)),
			this.ShallowTraceElement ||
				((this.ShallowTraceElement = UE.NewObject(
					UE.TraceBoxElement.StaticClass(),
				)),
				(this.ShallowTraceElement.bIsSingle = !1),
				(this.ShallowTraceElement.bIgnoreSelf = !0),
				this.ShallowTraceElement.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
				),
				this.ShallowTraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					this.ShallowTraceElement,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					this.ShallowTraceElement,
					ColorUtils_1.ColorUtils.LinearRed,
				)),
			(this.TraceElement.WorldContextObject = this.GetWorld()),
			(this.ShallowTraceElement.WorldContextObject = this.GetWorld());
	}
	CheckInWater(e) {
		return (
			this.VectorCache.DeepCopy(e),
			(this.VectorCache.Z = e.Z + 200),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.TraceElement,
				this.VectorCache,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.TraceElement,
				e,
			),
			!!TraceElementCommon_1.TraceElementCommon.LineTrace(
				this.TraceElement,
				PROFILE_KEY,
			)
		);
	}
	CheckReachable(e, t) {
		var o = RenderConfig_1.RenderConfig.WaterCollisionProfileName;
		if (
			(e =
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.ShallowTraceElement,
					e,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.ShallowTraceElement,
					t,
				),
				TraceElementCommon_1.TraceElementCommon.BoxTrace(
					this.ShallowTraceElement,
					PROFILE_KEY,
				))) &&
			this.ShallowTraceElement.HitResult.bBlockingHit
		) {
			var r = this.ShallowTraceElement.HitResult.Actors,
				i = this.ShallowTraceElement.HitResult.Components;
			for (let e = 0; e < r.Num(); e++) {
				var a = r.Get(e);
				if (
					void 0 !== a &&
					(a = i.Get(e)) &&
					!o.op_Equality(a.GetCollisionProfileName())
				)
					return !1;
			}
		}
		return !0;
	}
	DebugDraw(e, t) {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			this.TsDebugMode &&
			UE.KismetSystemLibrary.DrawDebugSphere(
				this,
				e.ToUeVector(),
				30,
				10,
				t,
				1.5,
			);
	}
	DebugDrawRange() {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			this.TsDebugMode &&
			this.HaveRangeConfig &&
			UE.KismetSystemLibrary.DrawDebugBox(
				this,
				this.Center.ToUeVector(),
				this.Size.ToUeVector(),
				ColorUtils_1.ColorUtils.LinearGreen,
				this.Rotator.ToUeRotator(),
				1.5,
			);
	}
}
exports.default = TsTaskQuerySwimLocation;
