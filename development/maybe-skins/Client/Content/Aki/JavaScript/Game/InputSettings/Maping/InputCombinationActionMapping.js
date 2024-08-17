"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationActionMapping = void 0);
const InputCombinationActionBinding_1 = require("../Binding/InputCombinationActionBinding");
class InputCombinationActionMapping {
	constructor() {
		(this.YSe = new Map()), (this.JSe = new Map()), (this.zSe = new Set());
	}
	Clear() {
		for (const e of this.YSe.values()) e.Clear();
		this.YSe.clear(), this.JSe.clear(), this.zSe.clear();
	}
	NewCombinationActionBinding(e, t) {
		var i = new InputCombinationActionBinding_1.InputCombinationActionBinding();
		return i.Initialize(e, t), this.YSe.set(e, i), i;
	}
	AddKey(e, t, i) {
		e.AddKey(t, i);
		let n = this.JSe.get(t),
			o = (n || ((n = new Map()), this.JSe.set(t, n)), n.get(i));
		o || ((o = new Map()), n.set(i, o)),
			o.set(e.GetActionName(), e),
			this.zSe.add(t);
	}
	RemoveKey(e, t, i) {
		e.RemoveKey(t);
		var n = e.GetActionName(),
			o = this.JSe.get(t);
		if (o) {
			var s = o.get(i);
			if (!s) return;
			s.delete(n),
				s.size <= 0 && o.delete(i),
				o.size <= 0 && (this.JSe.delete(t), this.zSe.delete(t));
		} else this.zSe.delete(t);
		(s = new Map()), e.GetKeyMap(s), s.size <= 0 && this.YSe.delete(n);
	}
	GetCombinationActionBindingByKeyName(e, t) {
		if ((e = this.JSe.get(e))) return e.get(t);
	}
	GetCombinationActionBindingByActionName(e) {
		return this.YSe.get(e);
	}
	IsMainKey(e) {
		return this.zSe.has(e);
	}
}
exports.InputCombinationActionMapping = InputCombinationActionMapping;
