"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameSplineUtils = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager");
class GameSplineUtils {
	static InitGameSpline(t, e) {
		let o,
			a = Vector_1.Vector.ZeroVector,
			r = !1;
		if (t.IsA(UE.BP_BasePathLine_C.StaticClass())) {
			var n = t;
			(o = n.Spline),
				(a = n.OriginalLocation),
				(r = n.IsAttachedToEntity),
				GlobalData_1.GlobalData.IsPlayInEditor &&
					e &&
					(n.DebugTarget = e.Owner);
		} else {
			if (!t.IsA(UE.BP_MovePathLine_C.StaticClass()))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Level", 7, "加载的内容不是支持的Spline", [
							"AssetType",
							t.GetName(),
						]),
					o
				);
			(o = (n = t).Spline),
				(a = n.OriginalLocation),
				(r = n.IsAttachedToEntity),
				GlobalData_1.GlobalData.IsPlayInEditor &&
					e &&
					(n.DebugTarget = e.Owner);
		}
		return (
			o &&
				ObjectUtils_1.ObjectUtils.IsValid(o) &&
				(r && e
					? t.K2_SetActorLocationAndRotation(
							e.ActorLocation,
							e.ActorRotation,
							!1,
							void 0,
							!1,
						)
					: t.K2_SetActorLocationAndRotation(
							a,
							Rotator_1.Rotator.ZeroRotator,
							!1,
							void 0,
							!1,
						)),
			o
		);
	}
	static InitGameSplineBySplineEntity(t, e) {
		if (e?.IsValid()) {
			let n = e.GetComponentByClass(UE.SplineComponent.StaticClass());
			if (
				((n =
					n ||
					e.AddComponentByClass(
						UE.SplineComponent.StaticClass(),
						!1,
						MathUtils_1.MathUtils.DefaultTransform,
						!1,
					)),
				(o =
					ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t)))
			) {
				var o,
					a = Vector_1.Vector.Create(
						o.Transform?.Pos?.X ?? 0,
						o.Transform?.Pos?.Y ?? 0,
						o.Transform?.Pos?.Z ?? 0,
					),
					r = Rotator_1.Rotator.Create(
						o.Transform?.Rot?.Y ?? 0,
						o.Transform?.Rot?.Z ?? 0,
						o.Transform?.Rot?.X ?? 0,
					);
				if (
					(o = (0, IComponent_1.getComponent)(
						o.ComponentsData,
						"SplineComponent",
					))
				)
					return (
						e.K2_SetActorLocationAndRotation(
							a.ToUeVector(),
							r.ToUeRotator(),
							!1,
							void 0,
							!1,
						),
						(a = o.Option),
						n.ClearSplinePoints(),
						(r = this.Zye(a.Points)),
						n.AddPoints(r),
						(e.SplineData = o.Option),
						n.UpdateSpline(),
						n
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						32,
						"[InitGameSplineBySplineEntity] 找不到pdDataId对应的ComponentsData找不到SplineComponent",
						["pbDataId", t],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						32,
						"[InitGameSplineBySplineEntity] 找不到pdDataId对应的数据",
						["pbDataId", t],
					);
		}
	}
	static Zye(t) {
		var e = UE.NewArray(UE.SplinePoint);
		if (0 < t.length) {
			var o = [],
				a = [],
				r = [],
				n = [],
				i = [];
			for (const e of t) {
				var s = Vector_1.Vector.Create(
					e.Position.X ?? 0,
					e.Position.Y ?? 0,
					e.Position.Z ?? 0,
				);
				(s =
					(o.push(s),
					Rotator_1.Rotator.Create(
						e.Rotation?.Y ?? 0,
						e.Rotation?.Z ?? 0,
						e.Rotation?.X ?? 0,
					))),
					(s =
						(a.push(s),
						Vector_1.Vector.Create(
							e.ArriveTangent.X ?? 0,
							e.ArriveTangent.Y ?? 0,
							e.ArriveTangent.Z ?? 0,
						))),
					(s =
						(r.push(s),
						Vector_1.Vector.Create(
							e.LeaveTangent.X ?? 0,
							e.LeaveTangent.Y ?? 0,
							e.LeaveTangent.Z ?? 0,
						)));
				switch ((n.push(s), e.LineType)) {
					case IComponent_1.ESplineLine.Linear:
						i.push(0);
						break;
					case IComponent_1.ESplineLine.CurveCustomTangent:
						i.push(4);
						break;
					case IComponent_1.ESplineLine.Curve:
						i.push(1);
						break;
					case IComponent_1.ESplineLine.Constant:
						i.push(2);
				}
			}
			for (let s = 0; s < t.length; s++) {
				var l = new UE.SplinePoint(
					s,
					o[s].ToUeVector(),
					r[s].ToUeVector(),
					n[s].ToUeVector(),
					a[s].ToUeRotator(),
					Vector_1.Vector.OneVector,
					i[s],
				);
				e.Add(l);
			}
		}
		return e;
	}
	static GenerateGuideEffect(t, e, o) {
		var a = ActorSystem_1.ActorSystem.Get(
			UE.BP_BasePathLine_C.StaticClass(),
			MathUtils_1.MathUtils.DefaultTransform,
		);
		(t =
			(a.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0),
			a.GetComponentByClass(UE.SplineComponent.StaticClass()))).SetSplinePoints(
			e,
			0,
			!0,
		),
			(e = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				MathUtils_1.MathUtils.DefaultTransform,
				o,
				"[GameSplineUtils.GenerateEffectHandle]",
				new EffectContext_1.EffectContext(void 0, a),
			));
		if (EffectSystem_1.EffectSystem.IsValid(e))
			return (
				EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToActor(
					a,
					void 0,
					2,
					2,
					2,
					!1,
				),
				{ EffectHandle: e, SplineActor: a, SplineComp: t }
			);
	}
}
exports.GameSplineUtils = GameSplineUtils;
