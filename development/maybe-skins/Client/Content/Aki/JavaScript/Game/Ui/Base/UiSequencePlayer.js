"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiSequencePlayer = void 0);
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
class UiSequencePlayer {
	constructor(e) {
		(this.a_r = new Map()),
			(this.EPe = void 0),
			(this.WPt = void 0),
			(this.KPt = void 0),
			(this.WFt = (e) => {
				this.a_r.set(e, 2),
					this.WPt?.forEach((t) => {
						t(e);
					});
			}),
			(this.h_r = (e) => {
				this.a_r.set(e, 1),
					this.KPt?.forEach((t) => {
						t(e);
					});
			}),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
			this.EPe.BindSequenceCloseEvent(this.WFt),
			this.EPe.BindSequenceStartEvent(this.h_r);
	}
	l_r(e) {
		this.a_r.delete(e);
	}
	__r(e) {
		this.a_r.set(e, 0);
	}
	BindOnEndSequenceEvent(e) {
		this.WPt || (this.WPt = new Array()), this.WPt.push(e);
	}
	BindOnStartSequenceEvent(e) {
		this.KPt || (this.KPt = new Array()), this.KPt.push(e);
	}
	IsInSequence() {
		let e = !1;
		var t = Array.from(this.a_r.keys()),
			r = t.length;
		for (let s = 0; s < r; s++)
			if (2 !== this.a_r.get(t[s])) {
				e = !0;
				break;
			}
		return e;
	}
	IsSequenceInPlaying(e) {
		return !!this.a_r.has(e) && 1 === this.a_r.get(e);
	}
	IsSequenceFinish(e) {
		return !this.a_r.has(e) || 2 === this.a_r.get(e);
	}
	IsStartSequenceFinish(e) {
		return !this.a_r.has(e) || 0 < this.a_r.get(e);
	}
	GetCurrentSequence() {
		return this.EPe.GetCurrentSequence();
	}
	PlaySequencePurely(e, t = !1, r = !1) {
		this.EPe.PlaySequencePurely(e, t, r);
	}
	StopPrevSequence(e, t = !1) {
		var r = this.EPe.GetCurrentSequence();
		this.EPe.StopCurrentSequence(e, t), this.l_r(r);
	}
	StopCurrentSequenceByName(e, t, r = !1) {
		var s = this.EPe.GetCurrentSequence();
		s === e && (this.EPe.StopCurrentSequence(t, r), this.l_r(s));
	}
	PlaySequence(e, t = !1) {
		this.u_r(), this.__r(e), this.EPe.PlayLevelSequenceByName(e, t);
	}
	async PlaySequenceAsync(e, t, r = !1, s = !1) {
		this.u_r(), this.__r(e), await this.EPe.PlaySequenceAsync(e, t, r, s);
	}
	ReplaySequence(e) {
		this.EPe.ReplaySequenceByKey(e);
	}
	u_r() {
		var e;
		this.IsInSequence() && ((e = Array.from(this.a_r.keys())[0]), this.l_r(e));
	}
	StopSequenceByKey(e, t = !1, r = !1) {
		this.EPe.StopSequenceByKey(e, t, r);
	}
	SequencePlayReverseByKey(e, t) {
		this.EPe.PlaySequencePurely(e, t, !0);
	}
	PauseSequence() {
		this.EPe.PauseSequence();
	}
	ResumeSequence() {
		this.EPe.ResumeSequence();
	}
	SetActorTag(e, t, r) {
		this.EPe.SetActorTag(e, t, r);
	}
	SetRelativeTransform(e, t) {
		this.EPe.SetRelativeTransform(e, t);
	}
	Clear() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
}
exports.UiSequencePlayer = UiSequencePlayer;
