"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RangeCheck = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	ModelManager_1 = require("../../Manager/ModelManager");
class SRange {
	constructor() {
		(this.Radius = -0),
			(this.TargetPosition = void 0),
			(this.RangeComponentShape = void 0),
			(this.VecLB = Vector_1.Vector.Create(0, 0, 0)),
			(this.VecRB = Vector_1.Vector.Create(0, 0, 0)),
			(this.VecLF = Vector_1.Vector.Create(0, 0, 0)),
			(this.VecRF = Vector_1.Vector.Create(0, 0, 0)),
			(this.High = 0),
			(this.Low = 0),
			(this.Radius = 0),
			(this.TargetPosition = Vector_1.Vector.Create(0, 0, 0)),
			(this.RangeComponentShape = void 0);
	}
}
class RangeCheck {
	constructor() {
		(this.PlayerPosition = void 0), (RangeCheck.RangeMap = new Map());
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return RangeCheck.RangeMap.clear(), !(RangeCheck.RangeMap = void 0);
	}
	GetOrAdd(e) {
		return RangeCheck.RangeMap
			? RangeCheck.RangeMap.get(e) || this.MakeRange(e)
				? RangeCheck.RangeMap.get(e)
				: void 0
			: this.MakeRange(e)
				? RangeCheck.RangeMap.get(e)
				: void 0;
	}
	MakeRange(e) {
		var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
		if (!t) return !1;
		var o = (0, IComponent_1.getComponent)(
				t.ComponentsData,
				"RangeComponent",
			)?.Shape,
			r = new SRange();
		switch (
			((r.RangeComponentShape = o), RangeCheck.RangeMap.set(e, r), o?.Type)
		) {
			case "Sphere":
				var a = o.Center,
					n = t.Transform.Pos;
				(r.TargetPosition = Vector_1.Vector.Create(
					n.X + (a?.X ?? 0),
					n.Y + (a?.Y ?? 0),
					n.Z + (a?.Z ?? 0),
				)),
					(r.Radius = o.Radius);
				break;
			case "Box":
				(n = t.Transform.Pos), (a = t.Transform.Rot);
				var i = o.Center,
					s = o.Size,
					c = o.Rotator;
				(a = Rotator_1.Rotator.Create(
					a?.Y ?? 0 + (c?.Y ?? 0),
					a?.Z ?? 0 + (c?.Z ?? 0),
					a?.X ?? 0 + (c?.X ?? 0),
				).Quaternion()),
					(c = Vector_1.Vector.Create(
						n.X + (i?.X ?? 0),
						n.Y + (i?.Y ?? 0),
						n.Z + (i?.Z ?? 0),
					)),
					(n = Transform_1.Transform.Create(a, c, Vector_1.Vector.OneVector)),
					(i = Vector_1.Vector.Create()),
					(a = Vector_1.Vector.Create(s.X, -s.Y, -s.Z)),
					(c =
						(n.TransformPosition(a, i),
						r.VecLB.Set(i.X, i.Y, i.Z),
						a.Set(-s.X, -s.Y, -s.Z),
						n.TransformPosition(a, i),
						r.VecRB.Set(i.X, i.Y, i.Z),
						a.Set(s.X, s.Y, -s.Z),
						n.TransformPosition(a, i),
						r.VecLF.Set(i.X, i.Y, i.Z),
						a.Set(-s.X, s.Y, -s.Z),
						n.TransformPosition(a, i),
						r.VecRF.Set(i.X, i.Y, i.Z),
						a.Set(-s.X, s.Y, s.Z),
						n.TransformPosition(a, i),
						i.Z)),
					(s = (a.Set(-s.X, s.Y, -s.Z), n.TransformPosition(a, i), i.Z));
				(r.High = c), (r.Low = s);
		}
		return (
			RangeCheck.RangeMap.set(e, r),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Controller", 46, "EntityRange创建成功", [
					"entityData",
					t,
				]),
			!0
		);
	}
	CheckReached(e) {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (!t || !e) return !1;
		if (
			((this.PlayerPosition = t.Entity.GetComponent(1)?.ActorLocationProxy),
			!this.PlayerPosition)
		)
			return !1;
		var o = RangeCheck.RangeMap.get(e);
		if (!o) return !1;
		let r = !1;
		switch (o.RangeComponentShape.Type) {
			case "Sphere":
				o.TargetPosition &&
					(r =
						Vector_1.Vector.Distance(this.PlayerPosition, o.TargetPosition) <
						o.Radius);
				break;
			case "Box":
				r = this.Xqo(o);
		}
		return r;
	}
	Xqo(e) {
		var t, o, r, a;
		return (
			!!e &&
			!!(t = this.PlayerPosition) &&
			!(e.High < t.Z || e.Low > t.Z) &&
			((o = e.VecLB),
			(r = e.VecRB),
			(a = e.VecLF),
			(e = e.VecRF),
			!!(o && r && a && e)) &&
			0 <= this.$qo(t, o, r) * this.$qo(t, e, a) &&
			0 <= this.$qo(t, r, e) * this.$qo(t, a, o)
		);
	}
	$qo(e, t, o) {
		return (o.X - t.X) * (e.Y - t.Y) - (e.X - t.X) * (o.Y - t.Y);
	}
}
(exports.RangeCheck = RangeCheck).RangeMap = void 0;
