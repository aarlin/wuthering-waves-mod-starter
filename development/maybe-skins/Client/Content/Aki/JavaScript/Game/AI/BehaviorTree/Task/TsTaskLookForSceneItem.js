"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskLookForSceneItem extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.OutBlackboardKey = "LookForSceneItem"),
			(this.DetectDistance = 0),
			(this.NavigationOn = !0),
			(this.BotanyItem = !1),
			(this.MineralItem = !0),
			(this.DropItem = !0),
			(this.IsInitTsVariables = !1),
			(this.TsOutBlackboardKey = ""),
			(this.TsDetectDistance = 0),
			(this.TsNavigationOn = !1),
			(this.TsBotanyItem = !1),
			(this.TsMineralItem = !1),
			(this.TsDropItem = !1),
			(this.TmpHandles = []);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsOutBlackboardKey = this.OutBlackboardKey),
			(this.TsDetectDistance = this.DetectDistance),
			(this.TsNavigationOn = this.NavigationOn),
			(this.TsBotanyItem = this.BotanyItem),
			(this.TsMineralItem = this.MineralItem),
			(this.TsDropItem = this.DropItem),
			(this.TmpHandles = []));
	}
	ReceiveTickAI(t, e, i) {
		this.InitTsVariables();
		var o = t.AiController;
		if (o)
			if (this.TsOutBlackboardKey) {
				var a = o.CharActorComp.ActorLocationProxy;
				ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
					a,
					this.TsDetectDistance,
					1,
					this.TmpHandles,
				);
				let e,
					i = MathUtils_1.MathUtils.Square(this.DetectDistance);
				for (const o of this.TmpHandles)
					if (o.Entity?.Active) {
						var r = o.Entity.GetComponent(1).ActorLocationProxy,
							s = Vector_1.Vector.DistSquared(a, r);
						if (!(s > i)) {
							var n = o.Entity.GetComponent(0),
								l = n.GetBaseInfo()?.Category?.CollectType;
							n = n.GetBaseInfo()?.Category?.MainType;
							let h = !1;
							!(h =
								!(
									(h =
										!(
											(h =
												!(
													!this.TsBotanyItem ||
													"Botany" !== l ||
													!o.Entity.GetComponent(178)?.IsOnlyCollectOption()
												) || h) ||
											!this.TsMineralItem ||
											"Mineral" !== l
										) || h) ||
									!this.TsDropItem ||
									"Drop" !== n
								) || h) ||
								(this.TsNavigationOn &&
									!AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
										t,
										a.ToUeVector(),
										r.ToUeVector(),
									)) ||
								((i = s), (e = o));
						}
					}
				(o = o.CharActorComp.Entity.Id),
					e
						? (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
								o,
								this.TsOutBlackboardKey,
								e.Id,
							),
							this.FinishExecute(!0))
						: (BlackboardController_1.BlackboardController.RemoveValueByEntity(
								o,
								this.TsOutBlackboardKey,
							),
							this.FinishExecute(!1));
			} else this.FinishExecute(!1);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskLookForSceneItem;
