"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
class TsDecoratorInTeamArea extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments), (this.TmpVector = void 0);
	}
	PerformConditionCheckAI(r, e) {
		var o,
			t,
			a = r.AiController;
		return a
			? !(o = a.AiHateList.GetCurrentTarget())?.Valid ||
					!(
						o.Entity.GetComponent(3) &&
						((o = a.CharAiDesignComp.Entity.Id),
						this.TmpVector || (this.TmpVector = Vector_1.Vector.Create()),
						this.TmpVector.FromUeVector(
							BlackboardController_1.BlackboardController.GetVectorValueByEntity(
								o,
								"TeamTargetLocation",
							),
						),
						(t = a.AiTeam.GetAiTeamAreaMemberData(a)))
					) ||
					AiContollerLibrary_1.AiControllerLibrary.InTeamArea(a, t)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						r.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorInTeamArea;
