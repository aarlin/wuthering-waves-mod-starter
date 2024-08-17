"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillBehaviorCondition = void 0);
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorCondition {
	static Satisfy(e, t) {
		for (let r = 0; r < e.Num(); r++) {
			var o = e.Get(r);
			switch (o.ConditionType) {
				case 0:
					if (this.dzo(o, t)) break;
					return !1;
				case 1:
					if (this.Czo(o, t)) break;
					return !1;
				case 2:
					if (this.gzo(o, t)) break;
					return !1;
				case 3:
					if (this.fzo(o, t)) break;
					return !1;
				case 4:
					if (this.pzo(o, t)) break;
					return !1;
				case 5:
					if (this.vzo(o, t)) break;
					return !1;
				default:
					return !1;
			}
		}
		return !0;
	}
	static dzo(e, t) {
		let o = !1;
		return t.SkillComponent.SkillTarget && (o = !0), e.Reverse ? !o : o;
	}
	static Czo(e, t) {
		let o = !1;
		var r;
		return (
			t.SkillComponent.SkillTarget &&
				((r = t.Entity.GetComponent(1).ActorLocationProxy),
				(t =
					t.SkillComponent.SkillTarget.Entity.GetComponent(
						1,
					).ActorLocationProxy),
				(r = e.IgnoreZ
					? Vector_1.Vector.Dist2D(r, t)
					: Vector_1.Vector.Distance(r, t)),
				(o = (0, SkillBehaviorMisc_1.compare)(
					e.ComparisonLogic,
					r,
					e.Value,
					e.RangeL,
					e.RangeR,
				))),
			e.Reverse ? !o : o
		);
	}
	static gzo(e, t) {
		let o = !1;
		var r, i, a;
		return (
			t.SkillComponent.SkillTarget &&
				((i = (r = t.Entity.GetComponent(1)).ActorLocationProxy),
				(t =
					t.SkillComponent.SkillTarget.Entity.GetComponent(
						1,
					).ActorLocationProxy),
				(a = Vector_1.Vector.Create()),
				t.Subtraction(i, a),
				e.IgnoreZ && (a.Z = 0),
				a.Normalize(),
				(t = MathUtils_1.MathUtils.GetAngleByVectorDot(a, r.ActorForwardProxy)),
				(o = (0, SkillBehaviorMisc_1.compare)(
					e.ComparisonLogic,
					t,
					e.Value,
					e.RangeL,
					e.RangeR,
				))),
			e.Reverse ? !o : o
		);
	}
	static fzo(e, t) {
		return (
			(t = t.Entity.GetComponent(185)),
			(t = e.AnyTag
				? t.HasAnyTag(
						GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
							e.TagToCheck,
						),
					)
				: t.HasAllTag(
						GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
							e.TagToCheck,
						),
					)),
			e.Reverse ? !t : t
		);
	}
	static pzo(e, t) {
		var o = (t = t.Entity.GetComponent(156)).GetCurrentValue(e.AttributeId1);
		(t = 0 < e.AttributeId2 ? t.GetCurrentValue(e.AttributeId2) : 0),
			(o = (0, SkillBehaviorMisc_1.compare)(
				e.ComparisonLogic,
				o,
				e.Value + t * e.AttributeRate,
				e.RangeL,
				e.RangeR,
			));
		return e.Reverse ? !o : o;
	}
	static vzo(e, t) {
		return (
			(t = t.Entity.GetComponent(161).GetHeightAboveGround()),
			(t = (0, SkillBehaviorMisc_1.compare)(
				e.ComparisonLogic,
				t,
				e.Value,
				e.RangeL,
				e.RangeR,
			)),
			e.Reverse ? !t : t
		);
	}
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
