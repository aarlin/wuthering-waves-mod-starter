"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Switcher = void 0);
class Switcher {
	constructor(t, e = void 0) {
		(this.E$o = new Set()), (this.ICr = t), (this.TCr = e);
	}
	get Active() {
		return 0 < this.E$o.size !== this.ICr;
	}
	SetActive(t, e) {
		var i = this.Active;
		this.ICr !== e ? this.E$o.add(t) : this.E$o.delete(t),
			i !== this.Active && this.TCr && this.TCr(this.Active);
	}
}
exports.Switcher = Switcher;
