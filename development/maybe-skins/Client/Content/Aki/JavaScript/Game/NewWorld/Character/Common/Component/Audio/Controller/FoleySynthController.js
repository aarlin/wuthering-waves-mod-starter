"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoleySynthController = void 0);
const FoleySynthHandler_1 = require("./FoleySynthHandler");
class FoleySynthController {
	constructor(o, t, e) {
		(this.ActorComp = o),
			(this.AkComp = t),
			(this.TagComp = e),
			(this.E$o = new Array()),
			(this.Lo = void 0);
	}
	Init(o) {
		o && ((this.Lo = o), this.Vi(o));
	}
	Tick(o) {
		if (
			this.Lo?.IsLoadSuccess() &&
			(!this.TagComp.HasTag(-1371021686) || this.TagComp.HasTag(1781274524))
		)
			for (const t of this.E$o) t.Tick(o);
	}
	Clear() {
		for (const o of this.E$o) o.Clear();
		(this.E$o.length = 0), (this.Lo = void 0);
	}
	SetDebug(o, t) {
		for (const e of t) e < this.E$o.length && this.E$o[e].SetDebug(o);
	}
	Vi(o) {
		var t;
		o.FoleySynthModel1Configs &&
			0 < o.FoleySynthModel1Configs.length &&
			((t = new FoleySynthHandler_1.FoleySynthModel1Handler(
				this.ActorComp,
				this.AkComp,
				2,
			)).Init(o.FoleySynthModel1Configs),
			this.E$o.push(t)),
			o.FoleySynthModel2Configs &&
				0 < o.FoleySynthModel2Configs.length &&
				((t = new FoleySynthHandler_1.FoleySynthModel2Handler(
					this.ActorComp,
					this.AkComp,
					o.Model2AccelerationMaxCount,
				)).Init(o.FoleySynthModel2Configs),
				(t.VelocityMaxCount = o.Model2VelocityMaxCount),
				this.E$o.push(t));
	}
}
exports.FoleySynthController = FoleySynthController;
