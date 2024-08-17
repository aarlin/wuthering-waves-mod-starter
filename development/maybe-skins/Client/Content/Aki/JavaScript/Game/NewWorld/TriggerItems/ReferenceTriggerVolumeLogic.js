"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReferenceTriggerVolumeLogic = void 0);
const puerts_1 = require("puerts"),
	RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
	VALID_LEN = 3;
class ReferenceTriggerVolumeLogic {
	constructor(r) {
		(this.$nr = void 0),
			(this.Ynr = void 0),
			(this.Jnr = 0),
			(this.znr = void 0),
			(this.Ynr = new Set());
		for (const i of r) {
			var e = i.PathName.split(".");
			3 === e?.length && this.Ynr.add(e[1] + "." + e[2]);
		}
		(this.$nr = new Map()), (this.znr = []);
	}
	AddVolume(r, e) {
		this.Ynr.has(r) && (this.Vr(e), this.$nr.set(r, e));
	}
	RemoveVolume(r) {
		this.Ynr.has(r) && (this.kre(this.$nr.get(r)), this.$nr.delete(r));
	}
	Clear() {
		for (const r of this.$nr.values()) this.kre(r);
		0 < this.Jnr && this.Znr(!1),
			(this.Jnr = 0),
			this.Ynr.clear(),
			this.$nr.clear();
	}
	Destroy() {
		this.Clear(), (this.Ynr = void 0), (this.$nr = void 0), (this.znr = void 0);
	}
	AddOnPlayerOverlapCallback(r) {
		this.Jnr && r(!0), this.znr?.push(r);
	}
	RemoveOnPlayerOverlapCallback(r) {
		void 0 === this.znr ||
			(r = this.znr.indexOf(r)) < 0 ||
			this.znr.splice(r, 1);
	}
	OnCollisionEnterFunc(r) {
		this.esr(r) && (this.Jnr || this.Znr(!0), this.Jnr++);
	}
	OnCollisionExitFunc(r) {
		this.esr(r) && (this.Jnr--, this.Jnr || this.Znr(!1));
	}
	esr(r) {
		return (
			r === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
		);
	}
	Vr(r) {
		if (r?.IsValid()) {
			var e = (0, puerts_1.$ref)(void 0),
				i = (r.GetOverlappingActors(e), (0, puerts_1.$unref)(e));
			if (0 < i?.Num())
				for (let r = 0, e = i.Num(); r < e; r++) {
					var t = i.Get(r);
					this.OnCollisionEnterFunc(t);
				}
			r.OnActorBeginOverlap.Add((r, e) => {
				this.OnCollisionEnterFunc(e);
			}),
				r.OnActorEndOverlap.Add((r, e) => {
					this.OnCollisionExitFunc(e);
				});
		}
	}
	kre(r) {
		r?.IsValid() &&
			(r.OnActorBeginOverlap.Clear(), r.OnActorEndOverlap.Clear());
	}
	Znr(r) {
		if (this.znr?.length)
			for (let e = this.znr.length - 1; 0 <= e; e--) (0, this.znr[e])(r);
	}
}
exports.ReferenceTriggerVolumeLogic = ReferenceTriggerVolumeLogic;
