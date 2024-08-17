"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PatrolMoveLogic = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
	Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
	AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	CharacterActorComponent_1 = require("../CharacterActorComponent"),
	FIX_LOCATION_TOLERANCE = 2,
	PROFILE_KEY = "PatrolMoveLogic_ResetActorLocation",
	RESET_LOCATION_TOLERANCE = 10;
class PatrolMoveLogic {
	constructor() {
		(this.Entity = void 0),
			(this.Hte = void 0),
			(this.oRe = void 0),
			(this.mBe = void 0),
			(this.lYo = !1),
			(this.cYo = 0),
			(this.hYo = 0),
			(this.Fuo = Rotator_1.Rotator.Create()),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create()),
			(this.QYo = Quat_1.Quat.Create()),
			(this.nDi = -0),
			(this.XYo = Vector_1.Vector.Create()),
			(this.$Yo = Vector_1.Vector.Create(0, 0, 0)),
			(this.JYo = 0),
			(this.NOe = 0),
			(this.zYo = Vector_1.Vector.Create()),
			(this.ZYo = []),
			(this.eJo = void 0);
	}
	Init(t) {
		(this.Entity = t),
			(this.Hte = t.CheckGetComponent(3)),
			(this.oRe = t.CheckGetComponent(160)),
			(this.mBe = t.GetComponent(89)),
			this.tJo();
	}
	GetMovePoint(t) {
		if (0 <= t && t < this.ZYo.length) return this.ZYo[t];
	}
	UpdateMovePath(t, e, o, i) {
		(this.ZYo.length = 0),
			this.ZYo.push(...t),
			(this.hYo = i),
			(this.lYo = e),
			(this.cYo = o),
			(this.NOe = 0),
			this.iJo(1);
	}
	StopMove() {
		(this.ZYo.length = 0), (this.JYo = 0), (this.NOe = 0);
	}
	UpdateMove(t, e) {
		if (!this.GetMovePoint(this.NOe)) return this.StopMove(), !1;
		for (
			!GlobalData_1.GlobalData.IsPlayInEditor &&
				GlobalData_1.GlobalData.IsPlayInEditor &&
				e &&
				this.DYo(),
				this.oJo();
			this.rJo();
		) {
			if (this.NOe === this.ZYo.length - 1) return !1;
			this.iJo(this.NOe + 1);
		}
		return (
			this.XYo.Normalize(),
			this.mBe &&
			this.mBe.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Climb
				? (this.QYo.DeepCopy(this.Hte.ActorQuatProxy),
					this.QYo.Inverse(this.QYo),
					this.QYo.RotateVector(this.XYo, this.XYo),
					this.Hte.SetInputDirect(this.XYo))
				: (this.Hte.SetOverrideTurnSpeed(this.cYo),
					this.Hte.SetInputDirect(this.XYo),
					AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
						this.Hte,
						this.XYo,
						this.cYo,
						this.lYo,
					)),
			!0
		);
	}
	iJo(t) {
		(this.JYo = this.NOe),
			(this.NOe = t),
			(this.zYo = this.ZYo[this.NOe]),
			this.oJo(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"UpdateMovePoint",
					["EntityId", this.Entity.Id],
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["CurrentIndex", this.NOe],
					["CurrentToLocation", this.zYo],
				);
	}
	oJo() {
		this.XYo.DeepCopy(this.zYo),
			this.XYo.SubtractionEqual(this.Hte.ActorLocationProxy),
			this.lYo || (this.XYo.Z = 0),
			(this.nDi = this.XYo.Size());
	}
	rJo() {
		if (this.JYo === this.NOe || this.nDi <= this.hYo)
			return (
				this.sJo(),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"到达目标位置",
						["EntityId", this.Entity.Id],
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["distance", this.nDi],
						["index", this.NOe],
					),
				!0
			);
		this.zYo.Subtraction(this.ZYo[this.JYo], this.jye),
			(this.jye.Z = 0),
			this.RTe.DeepCopy(this.XYo),
			(this.RTe.Z = 0);
		var t = this.RTe.DotProduct(this.jye);
		return (
			t < 0 &&
				(this.sJo(), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"AI",
					43,
					"经过了目标位置",
					["EntityId", this.Entity.Id],
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["distance", this.nDi],
					["index", this.NOe],
					["dotProduct", t],
				),
			t < 0
		);
	}
	sJo() {
		this.jye.DeepCopy(this.zYo),
			this.lYo || (this.jye.Z += this.Hte.HalfHeight),
			this.$Yo.DeepCopy(this.jye),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"ResetActorLocation",
					["EntityId", this.Entity.Id],
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["LastPatrolPoint", this.$Yo],
					["CurrentPoint", this.Hte.ActorLocationProxy],
				);
	}
	ResetLastPointCondition() {
		return !(
			this.$Yo.Size() < 1 ||
			(Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy) <
				this.hYo + 10 &&
				(this.$Yo.Set(0, 0, 0), 1))
		);
	}
	ResetLastPatrolPoint(t, e) {
		var o;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"AI",
				43,
				"Reset目标位置",
				["EntityId", this.Entity.Id],
				["PbDataId", this.Hte.CreatureData.GetPbDataId()],
				["deltaSeconds", t],
				["LastPatrolPoint", this.$Yo],
				["CurrentPoint", this.Hte.ActorLocationProxy],
				[
					"Distance",
					Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
				],
			),
			this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1),
			this.Hte.ClearInput(),
			this.oRe && this.Entity.GetTickInterval() <= 1
				? ((o = this.oRe.GetMeshTransform()),
					this.aJo(e),
					this.oRe.SetModelBuffer(
						o,
						t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
					))
				: this.aJo(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AI",
					43,
					"Reset目标位置结束",
					["EntityId", this.Entity.Id],
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["ActorLocation", this.Hte.ActorLocationProxy],
					[
						"Distance",
						Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
					],
				),
			this.$Yo.Set(0, 0, 0);
	}
	aJo(t) {
		this.lYo || this.hJo(this.$Yo, this.$Yo),
			t
				? (this.jye.DeepCopy(this.XYo),
					this.jye.ToOrientationRotator(this.Fuo),
					this.Hte.SetActorLocationAndRotation(
						this.$Yo.ToUeVector(),
						this.Fuo.ToUeRotator(),
						"拉回目标点设置坐标",
						!1,
					))
				: this.Hte.SetActorLocation(
						this.$Yo.ToUeVector(),
						"拉回目标点设置坐标",
						!1,
					);
	}
	tJo() {
		var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
		(t.bIsSingle = !1),
			(t.bIgnoreSelf = !0),
			t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				t,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				t,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			(this.eJo = t);
	}
	hJo(t, e) {
		this.jye.DeepCopy(t), (this.jye.Z += this.Hte.HalfHeight);
		var o = this.jye,
			i =
				((t =
					(this.RTe.DeepCopy(t),
					(this.RTe.Z += CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
					this.RTe)),
				this.eJo);
		(i.WorldContextObject = this.Hte.Actor),
			(i.Radius = this.Hte.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, o),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, t),
			i.ActorsToIgnore.Empty();
		for (const t of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			i.ActorsToIgnore.Add(t);
		o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
			this.Hte.Actor.CapsuleComponent,
			i,
			PROFILE_KEY,
			PROFILE_KEY,
		);
		var r = i.HitResult;
		if (o && r.bBlockingHit) {
			var s = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
			let t = "";
			var a = r.Actors.Num();
			let o = -1,
				i = "";
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, s);
			for (let e = 0; e < a; ++e) {
				var h = r.Actors.Get(e);
				if (
					h?.IsValid() &&
					((t += h.GetName() + ", "), !h.IsA(UE.Character.StaticClass()))
				) {
					(o = e),
						(i = h.GetName()),
						TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, e, s);
					break;
				}
			}
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
						["EntityId", this.Entity.Id],
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["经过修正的位置", s],
						["Actors", t],
						["HitLocationIndex", o],
						["HitLocationName", i],
						["this.ActorComp!.ScaledHalfHeight", this.Hte.ScaledHalfHeight],
						["this.ActorComp!.ScaledRadius", this.Hte.ScaledRadius],
					),
				(s.Z += this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
				(s.Z += 2),
				this.eJo &&
					((this.eJo.WorldContextObject = void 0),
					this.eJo.ActorsToIgnore.Empty()),
				e.DeepCopy(s),
				!0
			);
		}
		return (
			this.eJo &&
				((this.eJo.WorldContextObject = void 0),
				this.eJo.ActorsToIgnore.Empty()),
			!1
		);
	}
	DYo() {
		if (0 !== this.ZYo.length && GlobalData_1.GlobalData.IsPlayInEditor)
			for (let e = this.ZYo.length - 1; -1 < e; e--) {
				var t = this.ZYo[e];
				UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					t.ToUeVector(),
					30,
					10,
					e === this.NOe
						? ColorUtils_1.ColorUtils.LinearRed
						: ColorUtils_1.ColorUtils.LinearGreen,
				);
			}
	}
}
exports.PatrolMoveLogic = PatrolMoveLogic;
