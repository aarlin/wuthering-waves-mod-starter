"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiGetItemInfo extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.ItemBlackboardKey = ""),
			(this.ItemDistanceBlackboardKey = ""),
			(this.ItemLocationBlackboardKey = ""),
			(this.UseNavigation = !1),
			(this.VectorArray = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsItemBlackboardKey = ""),
			(this.TsItemDistanceBlackboardKey = ""),
			(this.TsItemLocationBlackboardKey = ""),
			(this.TsUseNavigation = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsItemBlackboardKey = this.ItemBlackboardKey),
			(this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey),
			(this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey),
			(this.TsUseNavigation = this.UseNavigation));
	}
	ReceiveExecuteAI(t, e) {
		if ((o = t.AiController)) {
			this.InitTsVariables();
			var o = o.CharActorComp,
				r = BlackboardController_1.BlackboardController.GetIntValueByEntity(
					o.Entity.Id,
					this.TsItemBlackboardKey,
				),
				a = (r = EntitySystem_1.EntitySystem.Get(r)).GetComponent(0);
			if (a)
				if (
					void 0 === r ||
					a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
				)
					this.FinishExecute(!1);
				else {
					(a = r.GetComponent(182).ActorLocation),
						void 0 === this.VectorArray && (this.VectorArray = new Array()),
						(r = e.K2_GetActorLocation());
					let i = 0;
					(i = this.TsUseNavigation
						? (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
								t,
								r,
								a,
								this.VectorArray,
							),
							AiContollerLibrary_1.AiControllerLibrary.GetPathLength(
								r,
								this.VectorArray,
							))
						: ((e = Vector_1.Vector.Create(a)),
							(r = Vector_1.Vector.Create(r)),
							e.SubtractionEqual(r).Size())),
						BlackboardController_1.BlackboardController.SetFloatValueByEntity(
							o.Entity.Id,
							this.TsItemDistanceBlackboardKey,
							i,
						),
						BlackboardController_1.BlackboardController.SetVectorValueByEntity(
							o.Entity.Id,
							this.TsItemLocationBlackboardKey,
							a.X,
							a.Y,
							a.Z,
						),
						this.FinishExecute(!0);
				}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskAiGetItemInfo;
