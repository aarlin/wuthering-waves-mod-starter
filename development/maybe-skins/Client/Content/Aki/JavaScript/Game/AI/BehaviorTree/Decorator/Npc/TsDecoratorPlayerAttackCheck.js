"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	GlobalData_1 = require("../../../../GlobalData"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../../Controller/TsAiController");
class TsDecoratorPlayerAttackCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = "玩家攻击"),
			(this.IsCollected = !1),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey));
	}
	PerformConditionCheckAI(r, e) {
		var t;
		return (
			this.InitTsVariables(),
			r instanceof TsAiController_1.default &&
				(this.IsCollected ||
					((t = r.AiController.NpcDecision) &&
						((this.IsCollected = !0), (t.CheckPlayerAttack = !0))),
				!!(t = r.AiController.CharActorComp)) &&
				((r = t.Entity.Id),
				1 ===
					BlackboardController_1.BlackboardController.GetIntValueByEntity(
						r,
						this.TsBlackboardKey,
					))
		);
	}
}
exports.default = TsDecoratorPlayerAttackCheck;
