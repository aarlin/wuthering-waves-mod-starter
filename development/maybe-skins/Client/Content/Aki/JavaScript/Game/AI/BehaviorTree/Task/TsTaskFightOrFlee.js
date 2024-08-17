"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFightOrFlee extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.FightOrFlee = ""),
			(this.IsInitTsVariables = !1),
			(this.TsFightOrFlee = ""),
			(this.FightProbability = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0), (this.TsFightOrFlee = this.FightOrFlee));
	}
	ReceiveExecuteAI(t, e) {
		if ((this.InitTsVariables(), (r = t.AiController))) {
			var i = (r = r.CharActorComp).Entity.Id;
			if (!this.FightProbability) {
				var r,
					a = (r = r.CreatureData).GetPbEntityInitData().ComponentsData;
				if (
					!(a = (0, IComponent_1.getComponent)(a, "AnimalComponent")) ||
					void 0 === a.AnimalAttackRange
				)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("BehaviorTree", 30, "缺少战斗概率配置", [
								"EntityConfigId",
								r.GetPbDataId(),
							]),
						void this.FinishExecute(!1)
					);
				this.FightProbability = a.AnimalAttackRange;
			}
			(r =
				MathUtils_1.MathUtils.GetRandomRange(0, 100) < this.FightProbability),
				BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
					i,
					this.TsFightOrFlee,
					r,
				),
				this.FinishExecute(!0);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskFightOrFlee;
