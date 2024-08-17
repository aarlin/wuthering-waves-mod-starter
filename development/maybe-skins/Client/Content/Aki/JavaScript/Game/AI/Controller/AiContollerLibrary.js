"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiControllerLibrary = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	MIN_NAVIGATION_FINAL_DIST_SQUARD = 1e4,
	MIN_NAVIGATION_FINAL_HEIGHt = 200,
	DEFAULT_NAVIGATION_BLOCK_LENGTH = 100,
	defaultBlockHalfExtent = new UE.Vector(1, 1, 500);
class AiControllerLibrary {
	static NavigationFindPath(t, r, e, o = void 0, a, i) {
		if (
			!UE.NavigationSystemV1.K2_ProjectPointToNavigation(
				t,
				r,
				void 0,
				void 0,
				void 0,
				defaultBlockHalfExtent,
				-1,
			)
		)
			return (
				o &&
					(o.push(Vector_1.Vector.Create(r)),
					o.push(Vector_1.Vector.Create(e))),
				!i
			);
		var c = UE.NavigationSystemV1.FindPathToLocationSynchronously(t, r, e);
		if (!c) return !1;
		var n = c.PathPoints.Num();
		if (n < 2) return !1;
		if (
			((i = c.PathPoints.Get(n - 1)),
			UE.Vector.DistSquared2D(e, i) > 1e4 || (!a && Math.abs(i.Z - e.Z) > 200))
		)
			return !1;
		if (o)
			for (let t = (o.length = 0); t < n; ++t) {
				var s = c.PathPoints.Get(t);
				o.push(Vector_1.Vector.Create(s.X, s.Y, s.Z));
			}
		return !0;
	}
	static GetPathLength(t, r) {
		if (0 === r.length) return 0;
		let e = 0;
		this.cz.FromUeVector(t), (e += Vector_1.Vector.Dist(this.cz, r[0]));
		for (let t = 1; t < r.length; ++t)
			e += Vector_1.Vector.Dist(r[t - 1], r[t]);
		return e;
	}
	static NavigationBlock(t, r, e, o = !0) {
		return (
			(r = r.ToUeVector()),
			!(
				o &&
				!UE.NavigationSystemV1.K2_ProjectPointToNavigation(
					t,
					r,
					void 0,
					void 0,
					void 0,
					defaultBlockHalfExtent,
					-1,
				)
			) &&
				!UE.NavigationSystemV1.IsStraightReachable(
					t,
					r,
					e.ToUeVector(),
					void 0,
					void 0,
					defaultBlockHalfExtent,
				)
		);
	}
	static NavigationBlockDirection(t, r, e, o = 100, a = !0) {
		var i = t.Character.CharacterMovement.MovementMode;
		return (
			(1 !== i && 2 !== i) ||
			(e.Multiply(o, this.cz),
			this.cz.AdditionEqual(r),
			this.NavigationBlock(t, r, this.cz, a))
		);
	}
	static NavigationBlockDirectionE(t, r, e, o, a = 100, i = !0) {
		return (
			this.GetDirectionVector(e, o, this.fz),
			this.NavigationBlockDirection(t, r, this.fz, a, i)
		);
	}
	static GetDirectionVector(t, r, e) {
		switch ((e.DeepCopy(t), r)) {
			case 0:
				break;
			case 1:
				e.UnaryNegation(e);
				break;
			case 2:
				e.Set(-e.Y, e.X, 0);
				break;
			case 3:
				e.Set(e.Y, -e.X, 0);
		}
	}
	static TurnToTarget(t, r, e, o = !1, a = 0) {
		r.Subtraction(t.ActorLocationProxy, this.cz),
			o
				? (MathUtils_1.MathUtils.LookRotationForwardFirst(
						this.cz,
						Vector_1.Vector.UpVectorProxy,
						this.cie,
					),
					t.SetInputRotator(this.cie))
				: t.SetInputRotatorByNumber(
						0,
						this.cz.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg,
						0,
					),
			0 < a
				? ((r = (t.InputRotator.Yaw - t.ActorRotation.Yaw) / a),
					t.SetOverrideTurnSpeed(Math.min(r, e)))
				: t.SetOverrideTurnSpeed(e);
	}
	static TurnToDirect(t, r, e, o = !1, a = 0) {
		o
			? (MathUtils_1.MathUtils.LookRotationForwardFirst(
					r,
					Vector_1.Vector.UpVectorProxy,
					this.cie,
				),
				t.SetInputRotator(this.cie))
			: t.SetInputRotatorByNumber(
					0,
					MathUtils_1.MathUtils.GetAngleByVector2D(r),
					0,
				),
			0 < a
				? ((o = (t.InputRotator.Yaw - t.ActorRotation.Yaw) / a),
					t.SetOverrideTurnSpeed(Math.min(o, e)))
				: t.SetOverrideTurnSpeed(e);
	}
	static ClearInput(t) {
		t && (t = t.AiController.CharActorComp)?.Valid && t.ClearInput();
	}
	static AllyOnPath(t, r, e, o) {
		var a = t.CharActorComp,
			i = a.ActorLocationProxy,
			c = a.ScaledHalfHeight,
			n = a.ScaledRadius,
			s = (this.cz.Set(-r.Y, r.X, 0), this.cz),
			l = this.fz;
		for (const a of t.AiPerception.Allies)
			if (a !== t.CharAiDesignComp.Entity.Id) {
				if (
					(h =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							a,
						)) &&
					(h.ActorLocationProxy.Subtraction(i, l),
					!(Math.abs(l.Z) > c + h.ScaledHalfHeight))
				) {
					var h = n + h.ScaledRadius,
						u = Vector_1.Vector.DotProduct(l, r),
						d = Vector_1.Vector.DotProduct(l, s);
					if (Math.abs(u) < h && d < e && -e < d && o === (0 < d ? 2 : 3))
						return !0;
					if (Math.abs(d) < h && u < e && -e < u && o === (0 < u ? 0 : 1))
						return !0;
				}
			}
		return !1;
	}
	static AllyBlockDirections(t, r, e, o) {
		if (t.AiPerception) {
			o.clear();
			var a = t.CharActorComp,
				i = a.ActorLocationProxy,
				c = a.ScaledHalfHeight,
				n = a.ScaledRadius,
				s = (this.cz.Set(-r.Y, r.X, 0), this.cz),
				l = this.fz;
			for (const a of t.AiPerception.Allies) {
				var h,
					u,
					d =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							a,
						);
				d &&
					(d.ActorLocationProxy.Subtraction(i, l),
					Math.abs(l.Z) > c + d.ScaledHalfHeight ||
						((d = n + d.ScaledRadius),
						(h = Vector_1.Vector.DotProduct(l, r)),
						(u = Vector_1.Vector.DotProduct(l, s)),
						Math.abs(h) < d && u < e && -e < u && o.add(0 < u ? 2 : 3),
						Math.abs(u) < d && h < e && -e < h && o.add(0 < h ? 0 : 1)));
			}
		}
	}
	static GetLocationFromEntity(t) {
		var r = t?.GetComponent(1);
		return r
			? r.ActorLocationProxy
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("AI", 6, "目标Entity没有坐标属性", [
						"EntityId",
						t.Id,
					]),
				Vector_1.Vector.ZeroVectorProxy);
	}
	static InTeamArea(t, r, e = 1) {
		t = t.CharActorComp.ActorLocationProxy;
		let o =
			Math.atan2(
				t.Y - r.CachedTargetLocation.Y,
				t.X - r.CachedTargetLocation.X,
			) *
				MathUtils_1.MathUtils.RadToDeg -
			r.CachedControllerYaw -
			r.AngleCenter;
		for (; 180 < o; ) o -= 360;
		for (; 180 < -o; ) o += 360;
		return (
			!(Math.abs(o) > r.MaxAngleOffset * e) &&
			(t = Vector_1.Vector.DistSquared2D(t, r.CachedTargetLocation)) >=
				MathUtils_1.MathUtils.Square(
					r.DistanceCenter - r.MaxDistanceOffset * e,
				) &&
			t <=
				MathUtils_1.MathUtils.Square(r.DistanceCenter + r.MaxDistanceOffset * e)
		);
	}
	static InputNearestDirection(t, r, e, o, a, i, c) {
		var n, s;
		c
			? (i
					? (r.ToOrientationQuat(e),
						e.Inverse(e),
						e.RotateVector(c, o),
						(n = AiControllerLibrary.KPn(o, t.WanderDirectionType, i)),
						(s = t.GetNearestDirection(r, n)),
						0 !== n && 1 !== n && s.UnaryNegation(s),
						AiControllerLibrary.TurnToDirect(t, s, a))
					: AiControllerLibrary.TurnToDirect(t, c, a),
				t.ActorQuatProxy.Inverse(e),
				e.RotateVector(r, o))
			: (t.ActorQuatProxy.Inverse(e),
				e.RotateVector(r, o),
				(n = AiControllerLibrary.KPn(o, t.WanderDirectionType, i)),
				(s =
					(!i && 2 !== t.WanderDirectionType) || 0 === t.WanderDirectionType
						? r
						: t.GetNearestDirection(r, n)),
				AiControllerLibrary.TurnToDirect(t, s, a)),
			t.InputWanderDirection(r, o);
	}
	static KPn(t, r, e) {
		let o = 0;
		return (
			0 === r && e
				? (o =
						Math.abs(t.X) > Math.abs(t.Y) ? (t.X < 0 ? 1 : 0) : t.Y < 0 ? 3 : 2)
				: 1 === r
					? (o = t.X < 0 ? 1 : 0)
					: 2 === r && (o = t.Y < 0 ? 3 : 2),
			o
		);
	}
}
((exports.AiControllerLibrary = AiControllerLibrary).cz =
	Vector_1.Vector.Create()),
	(AiControllerLibrary.fz = Vector_1.Vector.Create()),
	(AiControllerLibrary.cie = Rotator_1.Rotator.Create());
