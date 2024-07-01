"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicCurveMovementController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletLogicController_1 = require("./BulletLogicController"),
	PROFILE_KEY = "BulletLogicCurveMovementController_GetDestLocation",
	HEIGHT_DETECT = 500,
	DRAW_DURATION = 5;
class BulletLogicCurveMovementController extends BulletLogicController_1.BulletLogicController {
	constructor(e, t) {
		super(e, t),
			(this.zie = void 0),
			(this.Wht = -0),
			(this.uoe = void 0),
			(this.m9o = 0),
			(this.d9o = 1),
			(this.Hte = this.Bullet.GetComponent(152)),
			(this._9o = this.Bullet.GetBulletInfo());
	}
	OnInit() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			this.LogicController.SplineTrace.ToAssetPathName(),
			UE.Class,
			(e) => {
				this.C9o(e);
			},
		),
			(this._9o.BulletDataMain.Execution.MovementReplaced = !0);
	}
	OnBulletDestroy() {
		this.zie &&
			(ActorSystem_1.ActorSystem.Put(this.zie.GetOwner()), (this.zie = void 0));
	}
	C9o(e) {
		var t, o;
		this.Bullet?.Valid &&
			this.LogicController.SplineTrace &&
			((o = (t = this.g9o())
				? UE.KismetMathLibrary.FindLookAtRotation(this.Hte.ActorLocation, t)
				: void 0),
			(o = UE.KismetMathLibrary.MakeTransform(
				this.Hte.ActorLocation,
				t ? o : this.Hte.ActorRotation,
				Vector_1.Vector.OneVector,
			)),
			(e = ActorSystem_1.ActorSystem.Get(e, o)),
			ObjectUtils_1.ObjectUtils.IsValid(e)
				? e.IsA(UE.BP_BasePathLineBullet_C.StaticClass())
					? ((this.zie = e.Spline),
						(o = this.zie.GetNumberOfSplinePoints()),
						(e = this.zie.GetLocationAtSplinePoint(o - 1, 1)),
						(o = this.zie.GetLocationAtSplinePoint(0, 1)),
						(o = UE.Vector.DistSquared(o, e)),
						(e = t
							? UE.Vector.DistSquared(this.Hte.ActorLocation, t)
							: this.zie.GetSplineLength()),
						t &&
							((this.d9o = Math.sqrt(e / o)),
							this.zie
								.GetOwner()
								.SetActorScale3D(
									Vector_1.Vector.OneVector.op_Multiply(this.d9o),
								)),
						(this.Wht = this.f9o()),
						(this.zie.Duration = this.Wht))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							21,
							"加载的Spline不是BP_BasePathLineBullet_C类型",
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 21, "加载的Spline为空"));
	}
	BulletLogicAction(e) {
		var t,
			o = this.m9o;
		this.zie &&
			!this._9o.NeedDestroy &&
			((t = this.zie.GetLocationAtTime(o, 1, !0)),
			this.Hte.SetActorLocation(t),
			this.LogicController.IsForwardTangent &&
				((t = this.zie.GetRotationAtTime(o, 1, !0)),
				this.Hte.SetActorRotation(t)),
			(this.m9o += e * this.Hte.TimeDilation)),
			o >= this.Wht &&
				(ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(
					this.LogicController.EffectOnReach,
				) &&
					((t = this.Hte.Owner),
					EffectSystem_1.EffectSystem.SpawnEffect(
						t,
						t.GetTransform(),
						this.LogicController.EffectOnReach.ToAssetPathName(),
						"[BulletLogicCurveMovementController.BulletLogicAction]",
						new EffectContext_1.EffectContext(
							this._9o.Attacker ? this._9o.Attacker.Id : void 0,
						),
					)),
				this.LogicController.IsDestroyReach) &&
				BulletController_1.BulletController.DestroyBullet(
					this.Bullet.Id,
					this.LogicController.IsSummonOnReach,
				);
	}
	koe() {
		(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.uoe.bIsSingle = !0),
			(this.uoe.bIgnoreSelf = !0),
			this.uoe.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			(this.uoe.DrawTime = 5),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearRed,
			);
	}
	g9o() {
		var e = this._9o.TargetActorComp;
		if (this.LogicController.UseTargetLocation)
			return BulletUtil_1.BulletUtil.GetTargetLocation(
				e,
				FNameUtil_1.FNameUtil.NONE,
				this._9o,
			);
		this.uoe || this.koe();
		var t = e?.Valid,
			o = (0, puerts_1.$ref)(void 0),
			i =
				((o =
					(((e =
						(UE.BPL_Fight_C.获取Actor周围坐标点(
							t ? e.Owner : this._9o.AttackerActorComp.Actor,
							t ? this.LogicController.Rotate : this.LogicController.SelfRotate,
							0,
							t ? this.LogicController.Length : this.LogicController.SelfLength,
							this.Hte.Owner,
							o,
						),
						(0, puerts_1.$unref)(o))).Z += t
						? this.LogicController.Height
						: this.LogicController.SelfHeight),
					this.uoe.SetStartLocation(e.X, e.Y, e.Z + 500),
					this.uoe.SetEndLocation(e.X, e.Y, e.Z - 500),
					e)),
				(e = TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.uoe,
					PROFILE_KEY,
				)),
				this.uoe.HitResult);
		return (
			e &&
				i.bBlockingHit &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, o),
				(o.Z += t
					? this.LogicController.Height
					: this.LogicController.SelfHeight)),
			o
		);
	}
	f9o() {
		var e = this.LogicController.Duration,
			t = this.LogicController.MaxSpeed,
			o = this.LogicController.MinSpeed,
			i = this.zie.GetSplineLength() * this.d9o;
		(o = 0 < o ? i / o : MathUtils_1.MathUtils.MaxFloat),
			(i = 0 < t ? i / t : 0);
		return (
			MathUtils_1.MathUtils.Clamp(e, i, o) *
			TimeUtil_1.TimeUtil.InverseMillisecond
		);
	}
}
exports.BulletLogicCurveMovementController = BulletLogicCurveMovementController;
