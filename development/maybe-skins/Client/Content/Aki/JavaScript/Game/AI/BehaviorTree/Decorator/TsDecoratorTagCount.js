"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorTagCount extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyTarget = ""),
			(this.Tag = void 0),
			(this.Range = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKeyTarget = ""),
			(this.TsTag = void 0),
			(this.TsRange = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
			(this.TsTag = this.Tag),
			(this.TsRange = new MathUtils_1.FastUeFloatRange(this.Range)));
	}
	PerformConditionCheckAI(r, t) {
		var e = r.AiController;
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						r.GetClass().GetName(),
					]),
				!1
			);
		this.InitTsVariables();
		let a = e.CharActorComp;
		if (this.TsBlackboardKeyTarget) {
			if (
				!(r = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					e.CharAiDesignComp.Entity.Id,
					this.TsBlackboardKeyTarget,
				))
			)
				return !1;
			if (
				!(e =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						r,
					))
			)
				return !1;
			a = e;
		}
		return (
			(r = a.Entity.CheckGetComponent(185).GetTagCountById(this.TsTag.TagId)),
			MathUtils_1.MathUtils.InFastUeRange(r, this.TsRange)
		);
	}
}
exports.default = TsDecoratorTagCount;
