"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiUseItem extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.ItemBlackboardKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsItemBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsItemBlackboardKey = this.ItemBlackboardKey));
	}
	ReceiveExecuteAI(e, a) {
		var r,
			t = e.AiController;
		t
			? (this.InitTsVariables(),
				(t = t.CharActorComp),
				(r = BlackboardController_1.BlackboardController.GetIntValueByEntity(
					t.Entity.Id,
					this.TsItemBlackboardKey,
				)),
				GlobalData_1.GlobalData.Networking() &&
					(ModelManager_1.ModelManager.AiWeaponModel.Net.SendHoldWeaponPushOnSafe(
						t.Entity.Id,
						r,
					),
					this.FinishExecute(!0)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]);
	}
}
exports.default = TsTaskAiUseItem;
