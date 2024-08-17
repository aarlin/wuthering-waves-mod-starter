"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StarLevelComponent = void 0);
const CookLevelView_1 = require("../../Cook/View/CookLevelView"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class StarLevelComponent {
	constructor(e) {
		(this.Gqt = (e, t, o) => {
			var r = new CookLevelView_1.StarItem();
			return (
				r.CreateThenShowByActor(t.GetOwner()),
				r.SetState(e),
				{ Key: o, Value: r }
			);
		}),
			(this.$be = new GenericLayoutNew_1.GenericLayoutNew(e, this.Gqt));
	}
	ShowLevel(e, t) {
		var o = new Array(t);
		for (let t = 0; t < e; t++) o[t] = !0;
		this.$be.RebuildLayoutByDataNew(o);
	}
	Clear() {
		this.$be.ClearChildren();
	}
}
exports.StarLevelComponent = StarLevelComponent;
