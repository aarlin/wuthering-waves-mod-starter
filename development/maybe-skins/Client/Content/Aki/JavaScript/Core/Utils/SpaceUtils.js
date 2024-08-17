"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpaceUtils = void 0);
const Quat_1 = require("./Math/Quat"),
	Vector_1 = require("./Math/Vector"),
	MathUtils_1 = require("./MathUtils"),
	boundPoints = [
		Vector_1.Vector.Create(1, 1, 1),
		Vector_1.Vector.Create(1, 1, -1),
		Vector_1.Vector.Create(1, -1, 1),
		Vector_1.Vector.Create(1, -1, -1),
		Vector_1.Vector.Create(-1, 1, 1),
		Vector_1.Vector.Create(-1, 1, -1),
		Vector_1.Vector.Create(-1, -1, 1),
		Vector_1.Vector.Create(-1, -1, -1),
	];
class SpaceUtils {
	static vz() {
		return this.Mz.length ? this.Mz.pop() : Vector_1.Vector.Create();
	}
	static Ez(t) {
		this.Mz.push(...t), (t.length = 0);
	}
	static IsComponentInRingArea(t, s, i) {
		var h = i.Bounds,
			e =
				(this.Sz.FromUeVector(h.Origin),
				this.yz.FromUeVector(h.BoxExtent),
				s.X * s.X);
		if (e < this.yz.X * this.yz.X || e < this.yz.Y * this.yz.Y)
			return (
				(this.Sz.Z = 0),
				(this.yz.Z = 0),
				this.g9s.Set(t.X, t.Y, 0),
				this.f9s(this.Sz, this.yz, this.g9s, s.X)
			);
		this.Iz.FromUeQuat(i.K2_GetComponentQuaternion()),
			this.Sz.Subtraction(t, this.Tz);
		var r = s.Z,
			a = s.Y * s.Y;
		let o = 0,
			c = 0;
		for (const _ of boundPoints) {
			this.yz.Multiply(_, this.Lz),
				this.Iz.RotateVector(this.Lz, this.Lz),
				this.Lz.AdditionEqual(this.Tz),
				3 !== c &&
					(this.Lz.Z > r ? (c |= 1) : -this.Lz.Z > r ? (c |= 2) : (c = 3));
			var n = this.Lz.SizeSquared2D();
			if (
				(3 !== o && (e < n ? (o |= 1) : n < a ? (o |= 2) : (o = 3)),
				3 === c && 3 === o)
			)
				return !0;
		}
		return !1;
	}
	static f9s(t, s, i, h) {
		i.Subtraction(t, this.p9s),
			this.p9s.X < 0 && (this.p9s.X = -this.p9s.X),
			this.p9s.Y < 0 && (this.p9s.Y = -this.p9s.Y),
			this.p9s.SubtractionEqual(s);
		let e = !1;
		if ((this.p9s.X < 0 && ((this.p9s.X = 0), (e = !0)), this.p9s.Y < 0)) {
			if (e) return !0;
			this.p9s.Y = 0;
		}
		return this.p9s.DotProduct(this.p9s) <= h * h;
	}
	static IsComponentInSectorArea(t, s, i, h) {
		var e = h.Bounds,
			r =
				(this.Sz.FromUeVector(e.Origin),
				this.yz.FromUeVector(e.BoxExtent),
				this.Iz.FromUeQuat(h.K2_GetComponentQuaternion()),
				this.Sz.Subtraction(t, this.Tz),
				i.Inverse(this.Dz),
				s.X * s.X),
			a = MathUtils_1.MathUtils.DegToRad * s.Y * 0.5,
			o = a < 0.5 * Math.PI,
			c = s.Z;
		let n = 0,
			_ = 0,
			u = 0;
		for (const V of boundPoints) {
			this.yz.Multiply(V, this.Lz),
				this.Iz.RotateVector(this.Lz, this.Lz),
				this.Lz.AdditionEqual(this.Tz),
				this.Dz.RotateVector(this.Lz, this.Lz),
				3 !== _ &&
					(this.Lz.Z > c ? (_ |= 1) : -this.Lz.Z > c ? (_ |= 2) : (_ = 3));
			var l,
				p = this.Lz.SizeSquared2D(),
				p = (3 !== n && p <= r && (n = 3), Math.atan2(this.Lz.Y, this.Lz.X));
			if (
				(3 !== u &&
					(o
						? a < p
							? ((l = this.vz()).DeepCopy(this.Lz), this.Rz.push(l))
							: a < -p
								? ((l = this.vz()).DeepCopy(this.Lz), this.Uz.push(l))
								: (u = 3)
						: Math.abs(p) <= a && (u = 3)),
				3 === _ && 3 === n && 3 === u)
			)
				return o && (this.Ez(this.Uz), this.Ez(this.Rz)), !0;
		}
		if (o) {
			if (3 === _ && 3 === n && this.Az())
				return this.Ez(this.Uz), this.Ez(this.Rz), !0;
			this.Ez(this.Uz), this.Ez(this.Rz);
		}
		return !1;
	}
	static Az() {
		for (const t of this.Uz)
			for (const s of this.Rz)
				if (
					!(Math.abs(s.Y - t.Y) < MathUtils_1.MathUtils.SmallNumber) &&
					0 <= s.X - ((s.X - t.X) / (s.Y - t.Y)) * s.Y
				)
					return !0;
		return !1;
	}
	static IsLocationInSideBullet(t, s) {
		var i = Vector_1.Vector.DistSquared(t.CollisionLocation, s),
			s = t.BulletDataMain.Base,
			h = s.Size;
		switch (s.Shape) {
			case 0:
				return i < h.X * h.X && i < h.Y * h.Y && i < h.Z * h.Z ? !0 : !1;
			case 1:
				return i < h.X * h.X ? !0 : !1;
			case 3:
				return i < h.Y * h.Y ? !0 : !1;
			default:
				return !1;
		}
	}
}
((exports.SpaceUtils = SpaceUtils).Sz = Vector_1.Vector.Create()),
	(SpaceUtils.yz = Vector_1.Vector.Create()),
	(SpaceUtils.Iz = Quat_1.Quat.Create()),
	(SpaceUtils.Lz = Vector_1.Vector.Create()),
	(SpaceUtils.Tz = Vector_1.Vector.Create()),
	(SpaceUtils.Dz = Quat_1.Quat.Create()),
	(SpaceUtils.Mz = new Array()),
	(SpaceUtils.Uz = new Array()),
	(SpaceUtils.Rz = new Array()),
	(SpaceUtils.g9s = Vector_1.Vector.Create()),
	(SpaceUtils.p9s = Vector_1.Vector.Create());
//# sourceMappingURL=SpaceUtils.js.map
