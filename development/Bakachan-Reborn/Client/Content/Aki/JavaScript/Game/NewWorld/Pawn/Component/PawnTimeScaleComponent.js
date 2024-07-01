"use strict";
var PawnTimeScaleComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, i, r) {
			var o,
				s = arguments.length,
				a =
					s < 3
						? t
						: null === r
							? (r = Object.getOwnPropertyDescriptor(t, i))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, i, r);
			else
				for (var n = e.length - 1; 0 <= n; n--)
					(o = e[n]) &&
						(a = (s < 3 ? o(a) : 3 < s ? o(t, i, a) : o(t, i)) || a);
			return 3 < s && a && Object.defineProperty(t, i, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnTimeScaleComponent = exports.TimeScale = void 0);
const puerts_1 = require("puerts"),
	Time_1 = require("../../../../Core/Common/Time"),
	PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	LIMIT_SCALE = 0;
class TimeScale {
	constructor(e, t, i, r, o, s, a, n) {
		(this.StartTime = e),
			(this.EndTime = t),
			(this.Priority = i),
			(this.TimeDilation = r),
			(this.TimeCurveFloat = o),
			(this.Duration = s),
			(this.Id = a),
			(this.SourceType = n),
			(this.MarkDelete = !1),
			(this.nor = void 0),
			(this.sor = void 0),
			(this.aor = void 0),
			(this.hor = void 0);
	}
	lor() {
		var e = (0, puerts_1.$ref)(0),
			t = (0, puerts_1.$ref)(0);
		this.TimeCurveFloat.GetTimeRange(e, t),
			(this.nor = (0, puerts_1.$unref)(e)),
			(this.sor = (0, puerts_1.$unref)(t));
	}
	get CurveTimeRangeMin() {
		return void 0 === this.nor && this.lor(), this.nor ?? -1 / 0;
	}
	get CurveTimeRangeMax() {
		return void 0 === this.sor && this.lor(), this.sor ?? 1 / 0;
	}
	_or() {
		var e = (0, puerts_1.$ref)(0),
			t = (0, puerts_1.$ref)(0);
		this.TimeCurveFloat.GetValueRange(e, t),
			(this.aor = (0, puerts_1.$unref)(e)),
			(this.hor = (0, puerts_1.$unref)(t));
	}
	get uor() {
		return void 0 === this.aor && this._or(), this.aor ?? -1 / 0;
	}
	get cor() {
		return void 0 === this.hor && this._or(), this.hor ?? 1 / 0;
	}
	CalculateTimeScale() {
		var e, t, i;
		return this.TimeCurveFloat
			? ((i = this.CurveTimeRangeMin),
				(e = this.CurveTimeRangeMax),
				(t = (Time_1.Time.WorldTimeSeconds - this.StartTime) / this.Duration),
				(t = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, i, e)),
				(i = this.TimeCurveFloat.GetFloatValue(t)),
				1 -
					MathUtils_1.MathUtils.RangeClamp(i, this.uor, this.cor, 0, 1) *
						(1 - this.TimeDilation))
			: this.TimeDilation;
	}
}
exports.TimeScale = TimeScale;
let PawnTimeScaleComponent = (PawnTimeScaleComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.C1n = void 0),
			(this.TimeScaleInternal = 1),
			(this.aln = 1),
			(this.TimeScaleList = new PriorityQueue_1.PriorityQueue(
				PawnTimeScaleComponent_1.CompareScalePriority,
			)),
			(this.TimeScaleMap = new Map()),
			(this.hln = 1),
			(this.PauseLocks = new Map());
	}
	static CompareScalePriority(e, t) {
		return e.Priority !== t.Priority
			? t.Priority - e.Priority
			: e.TimeDilation !== t.TimeDilation
				? e.TimeDilation - t.TimeDilation
				: t.EndTime - e.EndTime;
	}
	OnInit() {
		return (
			this.TimeScaleList.Clear(), this.TimeScaleMap.clear(), (this.hln = 1), !0
		);
	}
	OnStart() {
		(this.ActorComp = this.Entity.GetComponent(1)),
			(this.C1n = this.Entity.GetComponent(51));
		var e = this.ActorComp.CreatureData.GetEntityPropertyConfig();
		return (this.aln = e.子弹受击顿帧时长比例 / 100), !0;
	}
	IsTimescaleValid(e, t) {
		return e.EndTime > t && !e.MarkDelete;
	}
	OnTick(e) {}
	SetTimeScale(e, t, i, r, o) {
		var s, a;
		return (
			2 === o && (r *= this.aln),
			r <= 0
				? -1
				: ((s = (a = Time_1.Time.WorldTimeSeconds) + r),
					(a = new TimeScale(a, s, e, Math.max(t, 0), i, r, this.hln++, o)),
					this.TimeScaleList.Push(a),
					this.TimeScaleMap.set(a.Id, a),
					a.Id)
		);
	}
	RemoveTimeScale(e) {
		(e = this.TimeScaleMap.get(e)) && (e.MarkDelete = !0);
	}
	get CurrentTimeScale() {
		return this.TimeScaleInternal;
	}
	ResetTimeScale() {
		this.Entity.IsInit &&
			(this.TimeScaleList.Clear(),
			this.TimeScaleMap.clear(),
			(this.TimeScaleInternal = 1),
			this.Entity.SetTimeDilation(1));
	}
	AddPauseLock(e) {
		this.PauseLocks.has(e) && this.RemovePauseLock(e);
		let t = -1;
		this.C1n.IsImmuneTimeScaleEffect() ||
			(t = this.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 8)),
			this.PauseLocks.set(e, t);
	}
	RemovePauseLock(e) {
		var t = this.PauseLocks.get(e);
		void 0 !== t && this.RemoveTimeScale(t), this.PauseLocks.delete(e);
	}
	ImmunePauseLock() {
		this.PauseLocks.forEach((e) => {
			this.RemoveTimeScale(e);
		});
	}
	ResumePauseLock() {
		this.PauseLocks.forEach((e, t) => {
			var i = this.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 8);
			this.PauseLocks.set(t, i);
		});
	}
});
(PawnTimeScaleComponent = PawnTimeScaleComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(107)],
		PawnTimeScaleComponent,
	)),
	(exports.PawnTimeScaleComponent = PawnTimeScaleComponent);
