"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
class TsGameSplineActor extends UE.Actor {
	constructor() {
		super(...arguments), (this.SplineData = void 0);
	}
	GetPatrolSpeedByIndex(e) {
		return this.SplineData.Type !== IComponent_1.ESplineType.Patrol
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelPlay",
						32,
						"[TsGameSplineActor.GetPatrolSpeedByIndex]当前样条非巡逻样条",
					),
				-1)
			: this.SplineData.Points[e].MoveSpeed;
	}
	GetPointRotatorByIndex(e) {
		e = this.SplineData.Points[e].Rotation;
		var t = new UE.Rotator();
		return (
			void 0 !== e &&
				((t.Pitch = e.Y ?? 0), (t.Yaw = e.Z ?? 0), (t.Roll = e.X ?? 0)),
			t
		);
	}
}
exports.default = TsGameSplineActor;
