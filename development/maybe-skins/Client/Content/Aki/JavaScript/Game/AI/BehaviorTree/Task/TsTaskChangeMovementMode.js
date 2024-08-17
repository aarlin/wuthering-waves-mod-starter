"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMovementMode extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MovementMode = 0),
			(this.IsInitTsVariables = !1),
			(this.TsMovementMode = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMovementMode = this.MovementMode));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var s = e.AiController;
		s
			? ((s = s.CharActorComp) &&
					(s = ActorUtils_1.ActorUtils.GetEntityByActor(s.Actor)) &&
					(s = s.Entity.GetComponent(36)) &&
					s.CharacterMovement.SetMovementMode(this.TsMovementMode),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskChangeMovementMode;
