"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectLifeTimeController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	EffectModelHelper_1 = require("./Data/EffectModelHelper");
class EffectLifeTimeController {
	constructor(t, e, i, s, a = () => {}, n = () => !0, r = 0, l = 1) {
		(this.DefaultPassTime = 0),
			(this.PassTimeInternal = 0),
			(this.TotalPassTimeInternal = 0),
			(this.StartTimeInternal = -1),
			(this.LoopTimeInternal = 0),
			(this.EndTimeInternal = 0),
			(this.LoopTimeStamp = 0),
			(this.LifeTimeStamp = 0),
			(this.StateInternal = 0),
			(this.ReadyToFinish = () => !0),
			(this.FinishCallback = () => {}),
			(this.WillLoop = !1),
			(this.WillEverPlay = !1),
			(this.StateInternal = 1),
			3 === s && (this.DefaultPassTime = r),
			(this.PassTimeInternal = 0),
			(this.TotalPassTimeInternal = 0),
			(this.TypeInternal = s),
			(this.ReadyToFinish = n),
			(this.FinishCallback = a),
			(this.ManualTarget = 0),
			(this.ManualTarget = r),
			(this.ManualSpeed = l),
			this.ReInit(t, e, i);
	}
	get LifeTime() {
		return this.LifeTimeStamp;
	}
	get PassTime() {
		return this.PassTimeInternal;
	}
	get TotalPassTime() {
		return this.TotalPassTimeInternal;
	}
	get State() {
		return this.StateInternal;
	}
	get IsFinish() {
		return 6 === this.StateInternal;
	}
	get Type() {
		return this.TypeInternal;
	}
	SetPassTimeManual(t, e = void 0) {
		(this.ManualTarget = t), e && (this.ManualSpeed = e);
	}
	Reset() {
		(this.PassTimeInternal = this.DefaultPassTime),
			(this.TotalPassTimeInternal = 0);
	}
	JumpToEnd() {
		(this.PassTimeInternal = this.LifeTimeStamp),
			(this.TotalPassTimeInternal = this.LifeTimeStamp);
	}
	ReInit(t, e, i) {
		(this.StartTimeInternal = t),
			(this.LoopTimeInternal = e),
			(this.EndTimeInternal = i),
			(this.LoopTimeStamp = t + e),
			(this.LifeTimeStamp = t + e + i),
			this.CalcLoopBehavior();
	}
	SetType(t) {
		(this.TypeInternal = t), this.CalcLoopBehavior();
	}
	LifeTimeCheck(t) {
		return !1;
	}
	CalcLoopBehavior() {
		(this.WillLoop =
			1 === this.TypeInternal ||
			(0 === this.TypeInternal && 0 < this.LoopTimeInternal)),
			(this.WillEverPlay =
				this.WillLoop ||
				(0 === this.TypeInternal && this.LifeTimeStamp <= 0) ||
				3 === this.TypeInternal);
	}
	SetStateBuild() {
		this.StateInternal = 3;
	}
	SetStateInit() {
		this.StateInternal = 2;
	}
	Play() {
		this.StateInternal < 1 ||
			((this.StateInternal = 4),
			(this.PassTimeInternal = this.DefaultPassTime),
			(this.TotalPassTimeInternal = 0));
	}
	Update(t) {
		(this.TotalPassTimeInternal += t),
			3 === this.TypeInternal
				? 5 === this.StateInternal
					? this.PrepareFinish()
					: ((EffectModelHelper_1.EffectTemp.Number = Math.min(
							t * this.ManualSpeed,
							Math.abs(this.ManualTarget - this.PassTimeInternal),
						)),
						this.SeekTo(
							this.PassTimeInternal +
								EffectModelHelper_1.EffectTemp.Number *
									Math.sign(this.ManualTarget - this.PassTimeInternal),
							!1,
						))
				: this.SeekTo(this.PassTimeInternal + t, !0);
	}
	SeekTo(t, e = !1) {
		(this.PassTimeInternal = t),
			4 === this.StateInternal &&
				this.PassTimeInternal >= this.LoopTimeStamp &&
				this.WillLoop &&
				this.Fge(),
			e &&
				(!this.WillEverPlay || 5 <= this.StateInternal) &&
				this.PassTimeInternal >= this.LifeTimeStamp &&
				this.PrepareFinish();
	}
	Fge() {
		var t, e;
		this.LoopTimeInternal <= 0.01
			? (this.PassTimeInternal = this.StartTimeInternal)
			: this.PassTimeInternal >= this.LoopTimeStamp + this.LoopTimeInternal
				? ((t = this.PassTimeInternal - this.StartTimeInternal),
					(e = (0, puerts_1.$ref)(0)),
					UE.KismetMathLibrary.FMod(t, this.LoopTimeInternal, e),
					(this.PassTimeInternal =
						this.StartTimeInternal + (0, puerts_1.$unref)(e)))
				: (this.PassTimeInternal -= this.LoopTimeInternal);
	}
	Stop(t = !1) {
		5 <= this.StateInternal ||
			((this.StateInternal = 5),
			t && (this.PassTimeInternal = this.LoopTimeStamp));
	}
	PrepareFinish() {
		(this.ReadyToFinish && !this.ReadyToFinish()) ||
			((this.StateInternal = 6), this.FinishCallback && this.FinishCallback());
	}
	SetStateFinish() {
		this.StateInternal = 6;
	}
}
exports.EffectLifeTimeController = EffectLifeTimeController;
