"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckDirection = void 0);
const UE = require("ue"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDirection extends LevelGeneralBase_1.LevelConditionBase {
	constructor() {
		super(...arguments), (this.tLe = Vector_1.Vector.Create());
	}
	Check(e, t) {
		if (e.LimitParams && t) {
			var r = e.LimitParams.get("Dir");
			e = e.LimitParams.get("CheckWay");
			if (r && e && Global_1.Global.BaseCharacter) {
				var o = Global_1.Global.BaseCharacter.CharacterActorComponent,
					a =
						(this.tLe.FromUeVector(t.K2_GetActorLocation()),
						this.tLe.Subtraction(o.ActorLocationProxy, this.tLe),
						this.tLe.Normalize(),
						MathUtils_1.MathUtils.GetAngleByVectorDot(
							this.tLe,
							o.ActorForward,
						));
				switch (e) {
					case "1":
						return parseFloat(r) >= a;
					case "2":
						return parseFloat(r) <= a;
					case "3":
						return parseFloat(r) !== a;
				}
			}
		}
		return !1;
	}
	CheckNew(e) {
		var t,
			r = Global_1.Global.BaseCharacter;
		return (
			!!r &&
			((r = r.CharacterActorComponent),
			(t = Vector_1.Vector.Create()),
			r.ActorRotationProxy.Vector(t),
			t.Normalize(),
			(r = Vector_1.Vector.Create(
				e.Direction.X ?? 0,
				e.Direction.Y ?? 0,
				e.Direction.Z ?? 0,
			)),
			(r = Vector_1.Vector.Create(
				UE.Rotator.MakeFromEuler(r.ToUeVector()).Vector(),
			)).Normalize(),
			MathUtils_1.MathUtils.GetAngleByVectorDot(r, t) < e.AngleInterval)
		);
	}
}
exports.LevelConditionCheckDirection = LevelConditionCheckDirection;
