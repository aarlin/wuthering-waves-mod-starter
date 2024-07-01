"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiScheduleGroup = exports.AiAreaMemberData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	BLACKBOARD_KEY_AREA_INDEX = "TeamIndex",
	BLACKBOARD_KEY_ATTACKER = "TeamAttacker",
	MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS = 0.333,
	MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS = 2,
	MAX_ELITE_TYPE = 3,
	MAX_CHAR_TYPE = 6,
	MIN_RADIUS = 30,
	MAX_RADIUS = 100,
	MINUS_HALF_CIRCLE = -180;
class AiAndScore {
	constructor() {
		(this.Ai = void 0), (this.Score = -0);
	}
	static Get() {
		return this.Pool.length ? this.Pool.pop() : new AiAndScore();
	}
	static Release(e) {
		(e.Ai = void 0), this.Pool.push(e);
	}
	static ReleaseArray(e) {
		for (const t of e) (t.Ai = void 0), this.Pool.push(t);
		e.length = 0;
	}
}
(AiAndScore.Pool = new Array()),
	(AiAndScore.Compare = (e, t) => e.Score - t.Score);
class AiAreaMemberData {
	constructor() {
		(this.AreaIndex = -1),
			(this.InZone = !1),
			(this.AngleCenter = 0),
			(this.MaxAngleOffset = 0),
			(this.DistanceCenter = 0),
			(this.MaxDistanceOffset = 0),
			(this.NextUpdateCenterTime = 0),
			(this.CachedTargetLocation = Vector_1.Vector.Create()),
			(this.CachedControllerYaw = 0),
			(this.IsAttacker = !1),
			(this.HasAttack = !1),
			(this.NextScheduleTimeNoAttack = 0),
			(this.NextScheduleTimeAttack = 0),
			(this.NextScheduleTimeBeAttack = 0);
	}
}
exports.AiAreaMemberData = AiAreaMemberData;
class AiScheduleGroup {
	constructor(e, t) {
		(this.cse = e),
			(this.Target = t),
			(this.mse = new Map()),
			(this.dse = new Set()),
			(this.Cse = !1),
			(this.gse = 0),
			(this.fse = new Array());
		var i = e.AiTeamAreas.length;
		for (let e = 0; e < i; ++e) this.fse.push(new Array());
	}
	GetMemberData(e) {
		return this.mse.get(e);
	}
	TryAdd(e) {
		return (
			!this.mse.has(e) &&
			(this.mse.set(e, new AiAreaMemberData()), (this.Cse = !0))
		);
	}
	Remove(e) {
		var t;
		return (
			!!this.mse.delete(e) &&
			(e.CharAiDesignComp?.Valid &&
				((t = e.CharAiDesignComp.Entity.Id),
				BlackboardController_1.BlackboardController.RemoveValueByEntity(
					t,
					"TeamIndex",
				),
				BlackboardController_1.BlackboardController.RemoveValueByEntity(
					t,
					"TeamAttacker",
				)),
			this.dse.delete(e),
			!0)
		);
	}
	IsEmpty() {
		return 0 === this.mse.size;
	}
	CheckTargetAndRemove() {
		for (var [e] of this.mse) {
			var t;
			(this.cse.TeamMemberToGroup.has(e) &&
				(t = e.AiHateList.GetCurrentTarget())?.Valid &&
				t === this.Target) ||
				(this.mse.delete(e), this.dse.delete(e));
		}
	}
	ScheduleGroup() {
		this.gse < Time_1.Time.WorldTime || this.Cse ? this.pse() : this.vse(),
			this.Mse(),
			(this.Cse = !1);
	}
	pse() {
		var e = this.cse.AiTeamLevel,
			[e, t, i] =
				((this.gse =
					Time_1.Time.WorldTime +
					MathUtils_1.MathUtils.GetRandomRange(
						e.AllocationPeriodic.Min,
						e.AllocationPeriodic.Max,
					)),
				this.Sse());
		AiScheduleGroup.Ese.clear(),
			AiScheduleGroup.yse.clear(),
			this.Ise(e, t),
			this.Tse(i),
			AiScheduleGroup.Ese.clear(),
			AiScheduleGroup.yse.clear();
	}
	Ise(e, t) {
		AiScheduleGroup.Lse.clear();
		let i = 1;
		for (var [r] of this.mse) {
			var a = r.CharActorComp.ActorLocationProxy;
			let o =
				Math.atan2(a.Y - e.Y, a.X - e.X) * MathUtils_1.MathUtils.RadToDeg - t;
			for (; 180 < o; ) o -= 360;
			for (; 180 < -o; ) o += 360;
			AiScheduleGroup.Ese.set(r, o),
				(a = Vector_1.Vector.DistSquared2D(a, e)) > i && (i = a),
				AiScheduleGroup.yse.set(r, a),
				AiScheduleGroup.Lse.add(r);
		}
		i += 1;
		let o = 0;
		for (const e of this.cse.AiTeamAreas) {
			var s = this.cse.AreaCharTypeToPriority[o],
				l =
					o + 1 < this.cse.AiTeamAreas.length
						? this.cse.AreaCharTypeToPriority[o + 1]
						: void 0;
			AiScheduleGroup.Dse.length = 0;
			for (const e of AiScheduleGroup.Lse) {
				var h,
					c = s.get(e.AiBase.MonsterType);
				void 0 !== c &&
					(((h = AiAndScore.Get()).Ai = e),
					(h.Score = c + AiScheduleGroup.yse.get(e) / i),
					AiScheduleGroup.Dse.push(h));
			}
			AiScheduleGroup.Dse.sort(AiAndScore.Compare);
			var n = this.fse[o];
			let t = (n.length = 0);
			for (const i of AiScheduleGroup.Dse)
				(t < e.MaxCharacter || !l?.get(i.Ai.AiBase.MonsterType)) &&
					(n.push(i.Ai), AiScheduleGroup.Lse.delete(i.Ai)),
					++t;
			AiAndScore.ReleaseArray(AiScheduleGroup.Dse), ++o;
		}
		if (0 < AiScheduleGroup.Lse.size) {
			for (const e of AiScheduleGroup.Lse) {
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						6,
						"NotDistributeAi",
						["TeamId", this.cse.AiTeamLevel.Id],
						["CharType", e.AiBase.MonsterType],
					);
				break;
			}
			for (const e of AiScheduleGroup.Lse) this.mse.get(e).AreaIndex = -1;
			AiScheduleGroup.Lse.clear();
		}
		o = 0;
		for (const i of this.cse.AiTeamAreas) {
			for (const r of this.fse[o]) {
				var A = this.mse.get(r);
				(A.NextUpdateCenterTime =
					Time_1.Time.WorldTime +
					MathUtils_1.MathUtils.GetRandomRange(
						i.ReactionTime.Min,
						i.ReactionTime.Max,
					)),
					A.CachedTargetLocation.DeepCopy(e),
					(A.CachedControllerYaw = t);
			}
			++o;
		}
	}
	Tse(e) {
		let t = 0,
			i = 0;
		for (const n of this.cse.AiTeamAreas) {
			var r = this.fse[t];
			if (0 === r.length);
			else {
				AiScheduleGroup.Dse.length = 0;
				for (const e of r) {
					var a = AiAndScore.Get();
					(a.Ai = e),
						(a.Score = AiScheduleGroup.Ese.get(e)),
						AiScheduleGroup.Dse.push(a);
				}
				AiScheduleGroup.Dse.sort(AiAndScore.Compare);
				for (let e = 0; e < AiScheduleGroup.Dse.length; ++e)
					r[e] = AiScheduleGroup.Dse[e].Ai;
				AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
				var o = Math.min(r.length, n.MaxCharacter),
					s = r.length - o,
					l = Math.ceil(s / 2),
					h = ((s = s - l), 0.5 * (n.AreaDistance.Max - n.AreaDistance.Min)),
					c = e + n.AreaDistance.Min + h;
				0 < l && this.Rse(t, 0, l, -180, -n.AreaAngle, 0.333, 0, !1, c, h),
					(i =
						0 < o
							? this.Rse(
									t,
									l,
									l + o,
									-n.AreaAngle,
									n.AreaAngle,
									2,
									1,
									!0,
									c,
									h,
									i,
								)
							: 0),
					0 < s &&
						this.Rse(t, l + o, r.length, n.AreaAngle, 180, 0.333, 2, !1, c, h);
			}
			++t;
		}
	}
	Rse(e, t, i, r, a, o, s, l, h, c, n = 0) {
		var A = this.fse[e];
		let d = 0;
		for (let e = t; e < i; ++e) {
			var u = A[e];
			d += MathUtils_1.MathUtils.Clamp(u.CharActorComp.Radius, 30, 100);
		}
		var m = Math.min(o, (a - r) / d);
		let p = 0;
		switch (s) {
			case 0:
				p = a - m * d;
				break;
			case 1:
				p = 0.5 * (r + a - m * d);
				break;
			default:
				p = r;
		}
		for (let r = t; r < i; ++r) {
			var T = A[r],
				C = this.mse.get(T);
			(C.AreaIndex = e),
				(C.InZone = l),
				(C.MaxAngleOffset =
					m *
					MathUtils_1.MathUtils.Clamp(T.CharActorComp.Radius, 30, 100) *
					0.5),
				(C.AngleCenter = p + C.MaxAngleOffset),
				(C.DistanceCenter = h),
				(C.MaxDistanceOffset = c),
				(p += 2 * C.MaxAngleOffset);
		}
		return 0;
	}
	vse() {
		let e,
			t = 0,
			i = 0;
		for (const a of this.cse.AiTeamAreas) {
			for (const o of this.fse[i]) {
				var r = this.mse.get(o);
				!r ||
					Time_1.Time.WorldTime <= r.NextUpdateCenterTime ||
					(e || ([e, t] = this.Sse()),
					(r.NextUpdateCenterTime =
						Time_1.Time.WorldTime +
						MathUtils_1.MathUtils.GetRandomRange(
							a.ReactionTime.Min,
							a.ReactionTime.Max,
						)),
					r.CachedTargetLocation.DeepCopy(e),
					(r.CachedControllerYaw = t));
			}
			++i;
		}
	}
	Mse() {
		AiScheduleGroup.Dse.length = 0;
		var e = this.Use();
		this.Ase(e), AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
	}
	Use() {
		var e = this.cse.AiTeamLevel;
		AiScheduleGroup.Pse.splice(0, AiScheduleGroup.Pse.length);
		for (const i of this.dse) {
			var t = this.mse.get(i);
			if (i.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1503953470))
				if (t.NextScheduleTimeBeAttack) {
					if (t.NextScheduleTimeBeAttack < Time_1.Time.WorldTime) {
						AiScheduleGroup.Pse.push(i);
						continue;
					}
				} else
					t.NextScheduleTimeBeAttack =
						Time_1.Time.WorldTime +
						MathUtils_1.MathUtils.GetRandomRange(
							e.BeAttackCountDown.Min,
							e.BeAttackCountDown.Max,
						);
			else t.NextScheduleTimeBeAttack = void 0;
			t.HasAttack
				? t.NextScheduleTimeAttack < Time_1.Time.WorldTime &&
					!i.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1371021686) &&
					AiScheduleGroup.Pse.push(i)
				: t.NextScheduleTimeNoAttack < Time_1.Time.WorldTime
					? AiScheduleGroup.Pse.push(i)
					: i.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1371021686) &&
						((t.HasAttack = !0),
						BlackboardController_1.BlackboardController.RemoveValueByEntity(
							i.CharAiDesignComp.Entity.Id,
							"TeamAttacker",
						));
		}
		var i = Math.min(
			e.AttackerNum - (this.dse.size - AiScheduleGroup.Pse.length),
			this.mse.size - this.dse.size,
		);
		if (0 < i) {
			var [r, a] = this.Sse();
			let e = 0;
			for (const t of this.fse) {
				var o = this.cse.AiTeamAttacks[e];
				for (const e of t) {
					var s = this.mse.get(e);
					if (s && s.InZone && !s.IsAttacker) {
						var l = e.CharActorComp.ActorLocationProxy;
						let t =
							Math.atan2(l.Y - r.Y, l.X - r.X) *
								MathUtils_1.MathUtils.RadToDeg -
							a;
						for (; 180 < t; ) t -= 360;
						for (; 180 < -t; ) t += 360;
						(t = Math.abs(t)),
							(l = Math.abs(Vector_1.Vector.Dist2D(l, r) - s.DistanceCenter)),
							(l =
								o.ExtraWeight -
								(o.AngleCoefficient * t) / (2 * s.MaxAngleOffset) -
								(o.DistanceCoefficient * l) / (2 * s.MaxDistanceOffset)),
							((s = AiAndScore.Get()).Ai = e),
							(s.Score = l),
							AiScheduleGroup.Dse.push(s);
					}
				}
				++e;
			}
			for (const e of AiScheduleGroup.Pse)
				(this.mse.get(e).IsAttacker = !1),
					this.dse.delete(e),
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						e.CharAiDesignComp.Entity.Id,
						"TeamAttacker",
					);
		} else
			for (const t of AiScheduleGroup.Pse) {
				var h = this.mse.get(t);
				(h.NextScheduleTimeAttack =
					Time_1.Time.WorldTime +
					MathUtils_1.MathUtils.GetRandomRange(
						e.AttackCountDown.Min,
						e.AttackCountDown.Max,
					)),
					(h.NextScheduleTimeNoAttack =
						Time_1.Time.WorldTime +
						MathUtils_1.MathUtils.GetRandomRange(
							e.NoAttackCountDown.Min,
							e.NoAttackCountDown.Max,
						)),
					(h.HasAttack = !1),
					BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
						t.CharAiDesignComp.Entity.Id,
						"TeamAttacker",
						!0,
					);
			}
		return i;
	}
	Ase(e) {
		AiScheduleGroup.Dse.sort(AiAndScore.Compare);
		let t = 0,
			i = 0;
		var r = new Array();
		for (let e = 0; e < 6; ++e) r.push(0);
		for (const e of AiScheduleGroup.Dse)
			e.Ai.AiBase.MonsterType <= 3 ? ++t : ++i,
				++r[e.Ai.AiBase.MonsterType - 1];
		var a = new Array();
		for (let e = 0; e < 6; ++e) a.push(0);
		var o = this.cse.AiTeamLevel;
		for (let s = 0; s < e; ++s) {
			let e = !1;
			if (0 < t && 0 < i)
				e =
					MathUtils_1.MathUtils.GetRandomRange(
						0,
						o.EliteRatio[0] + o.EliteRatio[1],
					) < o.EliteRatio[0];
			else if (0 < t) e = !0;
			else {
				if (!(0 < i)) break;
				e = !1;
			}
			let s = 0,
				l = ((s = e ? (--t, 0) : (--i, 3)), 0),
				h = 0;
			for (let e = 0; e < 3; ++e)
				0 < r[s + e] &&
					((l += o.RangeRatio[e]),
					MathUtils_1.MathUtils.GetRandomRange(0, l) < o.RangeRatio[e]) &&
					(h = s + e);
			--r[h], ++a[h];
		}
		for (let e = AiScheduleGroup.Dse.length - 1; 0 <= e; --e) {
			var s,
				l = AiScheduleGroup.Dse[e];
			a[l.Ai.AiBase.MonsterType - 1] <= 0 ||
				(--a[l.Ai.AiBase.MonsterType - 1],
				((s = this.mse.get(l.Ai)).IsAttacker = !0),
				(s.HasAttack = !1),
				(s.NextScheduleTimeAttack =
					Time_1.Time.WorldTime +
					MathUtils_1.MathUtils.GetRandomRange(
						o.AttackCountDown.Min,
						o.AttackCountDown.Max,
					)),
				(s.NextScheduleTimeNoAttack =
					Time_1.Time.WorldTime +
					MathUtils_1.MathUtils.GetRandomRange(
						o.NoAttackCountDown.Min,
						o.NoAttackCountDown.Max,
					)),
				(s.NextScheduleTimeBeAttack = void 0),
				BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
					l.Ai.CharAiDesignComp.Entity.Id,
					"TeamAttacker",
					!0,
				),
				this.dse.add(l.Ai));
		}
	}
	Sse() {
		var e = this.Target.Entity.CheckGetComponent(3),
			t = this.Target.Entity.CheckGetComponent(52);
		t =
			t?.Valid && t.CharacterController
				? t.CharacterController.K2_GetActorRotation().Yaw
				: 0;
		return [e.ActorLocationProxy, t, e.ScaledRadius];
	}
}
((exports.AiScheduleGroup = AiScheduleGroup).Dse = new Array()),
	(AiScheduleGroup.Ese = new Map()),
	(AiScheduleGroup.yse = new Map()),
	(AiScheduleGroup.Lse = new Set()),
	(AiScheduleGroup.Pse = new Array());
