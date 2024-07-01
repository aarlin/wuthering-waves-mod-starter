"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
class TsDecoratorDistance extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.Distance = 0),
			(this.CompareType = 0),
			(this.IsInitTsVariables = !1),
			(this.TsDistance = 0),
			(this.TsCompareType = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsDistance = this.Distance),
			(this.TsCompareType = this.CompareType));
	}
	PerformConditionCheckAI(e, r) {
		if ((t = e.AiController)) {
			this.InitTsVariables();
			var t,
				s = (t = t.CharActorComp).Entity.CheckGetComponent(47);
			if (0 !== s.RoleId) {
				var a =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						s.RoleId,
					);
				if (!a)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"BehaviorTree",
								6,
								"主人已经被销毁",
								["EntityId", s?.Entity.Id],
								["Self", t.Actor.GetName()],
							),
						!1
					);
				var o = UE.Vector.DistSquared(a.ActorLocation, t.ActorLocation);
				switch (this.TsCompareType) {
					case 0:
						if (o === this.TsDistance * this.TsDistance) return !0;
						break;
					case 1:
						if (o < this.TsDistance * this.TsDistance) return !0;
						break;
					case 2:
						if (o > this.TsDistance * this.TsDistance) return !0;
				}
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]);
		return !1;
	}
}
exports.default = TsDecoratorDistance;
