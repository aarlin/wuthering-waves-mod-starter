"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskSetItemCollision = void 0);
const puerts_1 = require("puerts"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetItemCollision extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments), (this.ItemEntity = void 0), (this.IsIgnore = !1);
	}
	ExecuteTask() {
		return this.IsIgnore ? this.FTe() : this.VTe(), 0;
	}
	HTe(e, t) {
		var o = e.Entity.GetComponent(0),
			n = this.CreatureDataComponent.Entity.GetComponent(2);
		o = o.GetPbDataId();
		let r;
		if (
			(r =
				(o = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(o)) &&
				(o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o))
					? o.Entity.GetComponent(182)
					: e)
		) {
			o = (0, puerts_1.$ref)(void 0);
			var s = (r.Owner.GetAttachedActors(o), (0, puerts_1.$unref)(o)),
				i = s.Num();
			for (let e = 0; e < i; ++e) {
				var a = s.Get(e),
					l = (0, puerts_1.$ref)(void 0),
					p = (a.GetAttachedActors(l), (0, puerts_1.$unref)(l)),
					C = p.Num();
				for (let e = 0; e < C; ++e)
					n.Actor.CapsuleComponent.IgnoreActorWhenMoving(p.Get(e), t);
			}
		}
	}
	VTe() {
		var e,
			t = this.ItemEntity.Entity.GetComponent(182);
		t &&
			((e = this.CreatureDataComponent.Entity.GetComponent(2)),
			this.HTe(t, !1),
			e.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2));
	}
	FTe() {
		var e = this.ItemEntity.Entity.GetComponent(182);
		e &&
			(this.HTe(e, !0),
			this.CreatureDataComponent.Entity.GetComponent(
				2,
			).Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0));
	}
}
exports.LevelAiTaskSetItemCollision = LevelAiTaskSetItemCollision;
