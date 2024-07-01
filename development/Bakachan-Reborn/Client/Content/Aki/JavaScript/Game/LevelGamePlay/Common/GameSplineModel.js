"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameSplineModel = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GameSplineUtils_1 = require("./GameSplineUtils"),
	TsGameSplineActor_1 = require("./TsGameSplineActor"),
	TIMER_PERIOD = 5e3;
class ActorId {
	constructor(e, t) {
		(this.Id = e), (this.Type = t);
	}
}
class GameSplineModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Jye = new Map()),
			(this.j3 = void 0),
			(this.zye = () => {
				for (var [e, t] of this.Jye) {
					for (const e of t[2])
						switch (e.Type) {
							case 0:
								ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
									e.Id,
								) || t[2].delete(e);
								break;
							case 1:
								EntitySystem_1.EntitySystem.Get(e.Id) || t[2].delete(e);
						}
					t[2].size ||
						(ActorSystem_1.ActorSystem.Put(t[0]), this.Jye.delete(e));
				}
				!this.Jye.size &&
					this.j3 &&
					(TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
			});
	}
	LoadAndGetSplineComponent(e, t, r = 0) {
		let i = this.Jye.get(e);
		var s;
		return (
			i ||
				((i = [
					(s = ActorSystem_1.ActorSystem.Get(
						TsGameSplineActor_1.default.StaticClass(),
						new UE.Transform(),
					)),
					GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e, s),
					new Set(),
				]),
				this.Jye.set(e, i),
				this.j3) ||
				(this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, 5e3)),
			i[2].add(new ActorId(t, r)),
			i[1]
		);
	}
	GetSplineActorBySplineId(e) {
		if ((e = this.Jye.get(e))) return e[0];
	}
	ReleaseSpline(e, t, r = 0) {
		var i = this.Jye.get(e);
		if (i) for (const e of i[2]) e.Id === t && e.Type === r && i[2].delete(e);
	}
}
exports.GameSplineModel = GameSplineModel;
