"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicManipulatableCreateBullet = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	BulletController_1 = require("../BulletController"),
	BulletHitActorData_1 = require("../Model/BulletHitActorData"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableCreateBullet extends BulletLogicController_1.BulletLogicController {
	constructor(t, e) {
		super(t, e), (this.u9o = t);
	}
	BulletLogicActionOnHitObstacles(t = void 0) {
		if (
			t &&
			t instanceof BulletHitActorData_1.BulletHitActorData &&
			t.Entity &&
			t.Entity.GetComponent(0).IsSceneItem()
		) {
			var e = t.Entity;
			if (e?.GetComponent(140) && this.CheckCondition(e)) {
				var l = this.Bullet.GetBulletInfo(),
					r = l.AttackerActorComp.Actor,
					o =
						e.GetComponent(1)?.ActorTransform ??
						MathUtils_1.MathUtils.DefaultTransform,
					a = this.u9o.CreateBulletRowName.Num(),
					i = l.ContextId;
				for (let t = 0; t < a; t++) {
					var u = this.u9o.CreateBulletRowName.Get(t);
					BulletController_1.BulletController.CreateBulletCustomTarget(
						r,
						u,
						o,
						{
							SkillId: l.BulletInitParams.SkillId,
							ParentVictimId: e?.Id,
							ParentTargetId: l.Target?.Id,
							ParentId: this.Bullet.Id,
							DtType: l.BulletInitParams.DtType,
						},
						i,
					);
				}
			}
		}
	}
	CheckCondition(t) {
		var e = this.u9o,
			l = t?.GetComponent(177);
		if (!l) return !1;
		var r = e.ExistTagsCondition.GameplayTags,
			o = r.Num();
		for (let t = 0; t < o; t++) {
			var a = r.Get(t).TagId;
			if (!l.HasTag(a)) return !1;
		}
		var i = e.UnExistTagsCondition.GameplayTags,
			u = i.Num();
		for (let t = 0; t < u; t++) {
			var n = i.Get(t).TagId;
			if (l.HasTag(n)) return !1;
		}
		return !0;
	}
}
exports.BulletLogicManipulatableCreateBullet =
	BulletLogicManipulatableCreateBullet;
