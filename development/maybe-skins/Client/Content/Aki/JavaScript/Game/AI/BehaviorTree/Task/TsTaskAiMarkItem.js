"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiMarkItem extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.ItemBlackboardKey = ""),
			(this.SearchFilterIsMarkByAi = !1),
			(this.IsInitTsVariables = !1),
			(this.TsItemBlackboardKey = ""),
			(this.TsSearchFilterIsMarkByAi = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsItemBlackboardKey = this.ItemBlackboardKey),
			(this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi));
	}
	ReceiveExecuteAI(e, t) {
		var r,
			a,
			s,
			i = e.AiController;
		i
			? (this.InitTsVariables(),
				(r = (i = i.CharActorComp).Entity.GetComponent(69)),
				(a = BlackboardController_1.BlackboardController.GetIntValueByEntity(
					i.Entity.Id,
					this.TsItemBlackboardKey,
				)),
				0 !== r.AiItemMarkId && this.TsSearchFilterIsMarkByAi
					? r.AiItemMarkId === a
						? this.FinishExecute(!0)
						: this.FinishExecute(!1)
					: (a = EntitySystem_1.EntitySystem.Get(a)) &&
							(s = a.GetComponent(128)) &&
							!s.IsSearchByOther(i.Entity.Id)
						? (this.TsSearchFilterIsMarkByAi
								? ((r.AiItemMarkId = a.Id), s.SetSearched(i.Entity))
								: ((r.AiItemMarkId = 0), s.SetUnSearched()),
							this.FinishExecute(!0))
						: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskAiMarkItem;
