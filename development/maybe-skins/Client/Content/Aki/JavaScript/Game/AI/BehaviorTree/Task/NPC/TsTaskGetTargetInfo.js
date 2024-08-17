"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskGetTargetInfo extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.TargetKey = ""),
			(this.PositionKey = ""),
			(this.HpKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsTargetKey = ""),
			(this.TsPositionKey = ""),
			(this.TsHpKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsTargetKey = this.TargetKey),
			(this.TsPositionKey = this.PositionKey),
			(this.TsHpKey = this.HpKey));
	}
	ReceiveExecuteAI(t, e) {
		if ((this.InitTsVariables(), t instanceof TsAiController_1.default)) {
			let e = t.AiController.CharActorComp;
			if (this.TsTargetKey) {
				if (
					!(t = BlackboardController_1.BlackboardController.GetIntValueByWorld(
						this.TsTargetKey,
					))
				)
					return void this.FinishExecute(!1);
				e = (t = EntitySystem_1.EntitySystem.Get(t)).GetComponent(3);
			}
			e
				? ((t = e.ActorLocation),
					BlackboardController_1.BlackboardController.SetVectorValueByGlobal(
						this.TsPositionKey,
						t.X,
						t.Y,
						t.Z,
					),
					(t = e.Actor.AttributeSet) &&
						((t = t.Life.CurrentValue),
						BlackboardController_1.BlackboardController.SetIntValueByWorld(
							this.TsHpKey,
							t,
						)),
					this.FinishExecute(!0))
				: this.FinishExecute(!1);
		} else this.FinishExecute(!1);
	}
}
exports.default = TsTaskGetTargetInfo;
