"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericLayoutAdd = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	LguiUtil_1 = require("./LguiUtil");
class GenericLayoutAdd {
	constructor(t, e) {
		(this.$bo = void 0),
			(this.Ybo = void 0),
			(this.Jbo = new Map()),
			(this.zbo = []),
			(this.AQ = new Map()),
			(this.$bo = t),
			(this.Ybo = e),
			this.Zbo();
	}
	Zbo() {
		if (this.$bo) {
			var t = this.eqo().GetAttachUIChildren();
			for (let o = 0, i = t.Num(); o < i; ++o) {
				var e = t.Get(o);
				e.SetUIActive(!1), this.Jbo.set(o, e);
			}
		}
	}
	eqo() {
		return this.$bo.GetRootComponent();
	}
	AddItemToLayout(t, e = 0) {
		var o = this.Jbo.get(e);
		if (o) {
			o.SetUIActive(!0);
			let s = this.AQ.get(e);
			s || ((s = new Map()), this.AQ.set(e, s));
			for (let h = 0, u = t.length; h < u; ++h) {
				var i = LguiUtil_1.LguiUtil.CopyItem(o, this.eqo()),
					r = this.Ybo(t[h], i, h, e);
				s.set(r.Key, r.Value), this.zbo.push(i);
			}
			o.SetUIActive(!1);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("ModuleUtil", 11, "查找不到对应HierarchyIndex的UIItem");
	}
	GetLayoutItemByKey(t, e = 0) {
		if ((e = this.AQ.get(e))) return e.get(t);
	}
	GetLayoutItemMap(t = 0) {
		if ((t = this.AQ.get(t))) return t;
	}
	ClearChildren() {
		for (const t of this.AQ.values()) {
			for (const e of t.values()) e.Destroy();
			t.clear();
		}
		this.AQ.clear();
		for (const t of this.zbo) ActorSystem_1.ActorSystem.Put(t.GetOwner());
		this.zbo.length = 0;
	}
}
exports.GenericLayoutAdd = GenericLayoutAdd;
