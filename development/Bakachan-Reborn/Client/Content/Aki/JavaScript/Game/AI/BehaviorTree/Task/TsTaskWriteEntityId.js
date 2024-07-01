"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskWriteEntityId extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyTarget = ""),
			(this.BlackboardKeyWriteTo = ""),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKeyTarget = ""),
			(this.TsBlackboardKeyWriteTo = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
			(this.TsBlackboardKeyWriteTo = this.BlackboardKeyWriteTo));
	}
	ReceiveTickAI(e, t, r) {
		var a = e.AiController;
		if (a)
			if ((this.InitTsVariables(), this.TsBlackboardKeyTarget)) {
				let e = 0;
				if (this.TsBlackboardKeyTarget) {
					if (
						!(e =
							BlackboardController_1.BlackboardController.GetEntityIdByEntity(
								a.CharAiDesignComp.Entity.Id,
								this.TsBlackboardKeyTarget,
							))
					)
						return void this.FinishExecute(!1);
					if (
						!(
							ModelManager_1.ModelManager.CreatureModel.GetEntityById(
								e,
							)?.Entity?.GetComponent(1)?.Owner instanceof
							TsBaseCharacter_1.default
						)
					)
						return void this.FinishExecute(!1);
				}
				BlackboardController_1.BlackboardController.SetEntityIdByEntity(
					e,
					this.TsBlackboardKeyWriteTo,
					a.CharAiDesignComp.Entity.Id,
				),
					this.FinishExecute(!0);
			} else this.FinishExecute(!1);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskWriteEntityId;
