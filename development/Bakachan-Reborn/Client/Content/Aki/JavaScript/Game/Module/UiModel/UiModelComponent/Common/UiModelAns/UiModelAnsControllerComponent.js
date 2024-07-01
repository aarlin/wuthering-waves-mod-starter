"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			s = arguments.length,
			i =
				s < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, o, n);
		else
			for (var C = e.length - 1; 0 <= C; C--)
				(r = e[C]) && (i = (s < 3 ? r(i) : 3 < s ? r(t, o, i) : r(t, o)) || i);
		return 3 < s && i && Object.defineProperty(t, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelAnsControllerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../../UiModelComponentBase");
class AnsContextSet {
	constructor() {
		this.AnsContextSet = new Set();
	}
	Has(e) {
		if (this.AnsContextSet.has(e)) return e;
		for (const t of this.AnsContextSet) if (t.IsEqual(e)) return t;
	}
	Add(e) {
		this.Has(e) || this.AnsContextSet.add(e);
	}
	Delete(e) {
		return this.AnsContextSet.delete(e);
	}
	Clear() {
		this.AnsContextSet.clear();
	}
}
class AnsContextTrigger {
	constructor(e, t) {
		(this.OnBegin = e), (this.OnEnd = t);
	}
}
let UiModelAnsControllerComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.mBr = new Map()),
			(this.dBr = new Map()),
			(this.CBr = new AnsContextSet()),
			(this.gBr = new AnsContextSet());
	}
	OnInit() {
		this.NeedTick = !0;
	}
	RegisterAnsTrigger(e, t, o) {
		this.dBr.set(e, new AnsContextTrigger(t, o));
	}
	AddAns(e, t) {
		let o = this.mBr.get(e),
			n = (o || ((o = new AnsContextSet()), this.mBr.set(e, o)), o.Has(t));
		n || (o.Add(t), (n = t)), this.fBr(n), n.ExistCount++;
	}
	ReduceAns(e, t) {
		(e = this.mBr.get(e))
			? (e = e.Has(t))
				? (t = e.ExistCount) <= 0
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("Character", 44, "Ans不成对,Ans数量为0,无法减少", [
							"AnsCount",
							t,
						])
					: (this.fBr(e), e.ExistCount--)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Character", 44, "Ans不成对,查找不到对应的AnsContext")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 44, "Ans不成对,Set不存在");
	}
	fBr(e) {
		this.gBr.Has(e) || (this.gBr.Add(e), (e.CacheCount = e.ExistCount));
	}
	Tick(e) {
		var t = this.CBr.AnsContextSet;
		if (0 < t.size) {
			for (const e of t) {
				var o,
					n = e.CacheCount,
					r = e.ExistCount;
				0 === n && 0 < r
					? (o = this.dBr.get(e.constructor.name)) && o.OnBegin(e)
					: 0 < n &&
						0 === r &&
						(o = this.dBr.get(e.constructor.name)) &&
						o.OnEnd(e);
			}
			this.CBr.Clear();
		}
		if (0 < (t = this.gBr.AnsContextSet).size) {
			for (const e of t) this.CBr.Add(e);
			this.gBr.Clear();
		}
	}
};
(UiModelAnsControllerComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(6)],
	UiModelAnsControllerComponent,
)),
	(exports.UiModelAnsControllerComponent = UiModelAnsControllerComponent);
