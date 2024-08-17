"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	GlobalData_1 = require("../../../GlobalData"),
	SceneItemUtility_1 = require("../../../NewWorld/SceneItem/Util/SceneItemUtility"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorItemIsValid extends UE.BTDecorator_BlueprintBase {
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
	PerformConditionCheckAI(e, t) {
		var r = e.AiController;
		return r
			? (this.InitTsVariables(),
				(e = r.CharActorComp),
				(r = BlackboardController_1.BlackboardController.GetIntValueByEntity(
					e.Entity.Id,
					this.TsItemBlackboardKey,
				)),
				!(
					!(r = EntitySystem_1.EntitySystem.Get(r)) ||
					r.GetComponent(128)?.IsSearchByOther(e.Entity.Id) ||
					!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(r) ||
					!r.Active
				))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorItemIsValid;
