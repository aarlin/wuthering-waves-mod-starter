"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	GlobalData_1 = require("../../../GlobalData"),
	AiInteractionItemQueryManager_1 = require("../../../NewWorld/SceneItem/AiInteraction/AiInteractionItemQueryManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiFindClosetItem extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.Range = 0),
			(this.ItemBlackboardKey = ""),
			(this.ItemDistanceBlackboardKey = ""),
			(this.ItemLocationBlackboardKey = ""),
			(this.SearchFilterIsMarkByAi = !1),
			(this.Tag = void 0),
			(this.UseNavigation = !1),
			(this.IsInitTsVariables = !1),
			(this.TsRange = 0),
			(this.TsItemBlackboardKey = ""),
			(this.TsItemDistanceBlackboardKey = ""),
			(this.TsItemLocationBlackboardKey = ""),
			(this.TsSearchFilterIsMarkByAi = !1),
			(this.TsFilter = void 0),
			(this.TsUseNavigation = !1);
	}
	InitTsVariables() {
		if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
			if (
				((this.IsInitTsVariables = !0),
				(this.TsRange = this.Range),
				(this.TsItemBlackboardKey = this.ItemBlackboardKey),
				(this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey),
				(this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey),
				(this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi),
				(this.TsFilter =
					new AiInteractionItemQueryManager_1.AiInteractionSearchFilter()),
				0 === this.Tag?.Num())
			)
				this.TsFilter.Tag = void 0;
			else
				for (let t = 0; t < this.Tag.Num(); ++t)
					(this.TsFilter.Tag = new Array()),
						this.TsFilter.Tag.push(this.Tag.Get(t));
			this.TsUseNavigation = this.UseNavigation;
		}
	}
	ReceiveExecuteAI(t, e) {
		var a,
			i = t.AiController;
		i
			? (this.InitTsVariables(),
				(i = i.CharActorComp),
				(e = e.K2_GetActorLocation()),
				(this.TsFilter.IsSearchedMarkByAi = this.TsSearchFilterIsMarkByAi),
				(this.TsFilter.Entity = i.Entity),
				!(e =
					AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().GetCloseActor(
						e,
						this.TsUseNavigation ? 1 : 0,
						this.TsFilter,
						t,
					)) || e.Length > this.TsRange
					? this.FinishExecute(!1)
					: (BlackboardController_1.BlackboardController.SetIntValueByEntity(
							i.Entity.Id,
							this.TsItemBlackboardKey,
							e.Entity.Id,
						),
						BlackboardController_1.BlackboardController.SetFloatValueByEntity(
							i.Entity.Id,
							this.TsItemDistanceBlackboardKey,
							e.Length,
						),
						(a = e.Entity.GetComponent(0)) &&
							(a.GetEntityType() ===
								Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
								((a = e.Entity.GetComponent(182).ActorLocation),
								BlackboardController_1.BlackboardController.SetVectorValueByEntity(
									i.Entity.Id,
									this.TsItemLocationBlackboardKey,
									a.X,
									a.Y,
									a.Z,
								)),
							this.FinishExecute(!0))))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]);
	}
}
exports.default = TsTaskAiFindClosetItem;
