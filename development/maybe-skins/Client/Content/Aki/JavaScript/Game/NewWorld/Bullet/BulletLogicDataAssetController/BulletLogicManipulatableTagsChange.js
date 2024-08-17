"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicManipulatableTagsChange = void 0);
const BulletHitActorData_1 = require("../Model/BulletHitActorData"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableTagsChange extends BulletLogicController_1.BulletLogicController {
	constructor(e, t) {
		super(e, t), (this.Parameter = e);
	}
	BulletLogicActionOnHitObstacles(e = void 0) {
		if (
			e &&
			e instanceof BulletHitActorData_1.BulletHitActorData &&
			e.Entity &&
			e.Entity.GetComponent(0).IsSceneItem()
		) {
			e = e.Entity;
			var t = e?.GetComponent(140),
				a = this.Parameter,
				o = e?.GetComponent(177);
			if (t && this.CheckCondition(e) && o) {
				var l = a.AddTags.GameplayTags,
					r = l.Num();
				for (let e = 0; e < r; e++) {
					var i = l.Get(e).TagId;
					o.AddServerTagByIdLocal(i, "特定子弹命中可控物添加标签");
				}
				var n = a.RemoveTags.GameplayTags,
					s = n.Num();
				for (let e = 0; e < s; e++) {
					var g = n.Get(e).TagId;
					o.RemoveServerTagByIdLocal(g, "特定子弹命中可控物移除标签");
				}
			}
		}
	}
	CheckCondition(e) {
		var t = this.Parameter,
			a = e?.GetComponent(177);
		if (!a) return !1;
		var o = t.ExistTagsCondition.GameplayTags,
			l = o.Num();
		for (let e = 0; e < l; e++) {
			var r = o.Get(e).TagId;
			if (!a.HasTag(r)) return !1;
		}
		var i = t.UnExistTagsCondition.GameplayTags,
			n = i.Num();
		for (let e = 0; e < n; e++) {
			var s = i.Get(e).TagId;
			if (a.HasTag(s)) return !1;
		}
		return !0;
	}
}
exports.BulletLogicManipulatableTagsChange = BulletLogicManipulatableTagsChange;
