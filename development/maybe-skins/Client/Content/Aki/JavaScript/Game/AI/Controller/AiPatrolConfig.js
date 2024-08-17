"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiPatrolConfig = void 0);
class AiPatrolConfig {
	constructor() {
		(this.Id = 0),
			(this.CirclePatrol = !1),
			(this.SplineEntityId = 0),
			(this.IsNavigation = !1),
			(this.StartIndex = 0),
			(this.LimitNpcDistance = 0),
			(this.TurnSpeed = 0),
			(this.Loop = !1),
			(this.EndDistance = 0),
			(this.Sampling = 0),
			(this.ContainZ = !1);
	}
	Init(i) {
		(this.Id = i.Id),
			(this.CirclePatrol = i.CirclePatrol),
			(this.IsNavigation = i.IsNavigation),
			(this.StartIndex = i.StartIndex),
			(this.LimitNpcDistance = i.LimitNpcDistance),
			(this.TurnSpeed = i.TurnSpeed),
			(this.Loop = i.Loop),
			(this.EndDistance = i.EndDistance),
			(this.Sampling = i.Sampling),
			(this.ContainZ = i.ContainZ);
	}
}
exports.AiPatrolConfig = AiPatrolConfig;
