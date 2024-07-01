"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorNearChainEdge extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.DistToChainEdgeLessThan = 0),
			(this.IsInitTsVariables = !1),
			(this.TsDistToChainEdgeLessThan = -0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsDistToChainEdgeLessThan = this.DistToChainEdgeLessThan));
	}
	PerformConditionCheckAI(e, r) {
		this.InitTsVariables();
		var o,
			t,
			a = e.AiController;
		return a
			? !(void 0 === (o = a.AiHateList.AiHate?.MaxMoveFromBorn) || o < 0) &&
					(o < this.TsDistToChainEdgeLessThan
						? (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"BehaviorTree",
									6,
									"TsDecoratorNearChainEdge配置的距离比ChainEdge要短，因此永远为True",
									["BT", this.TreeAsset.GetName()],
								),
							!0)
						: ((t =
								BlackboardController_1.BlackboardController.GetVectorValueByEntity(
									a.CharActorComp.Entity.Id,
									"CenterLocation",
								)),
							TsDecoratorNearChainEdge.TmpVector.FromUeVector(
								t ?? a.CharActorComp.GetInitLocation(),
							),
							Vector_1.Vector.DistSquared2D(
								TsDecoratorNearChainEdge.TmpVector,
								a.CharActorComp.ActorLocationProxy,
							) >=
								MathUtils_1.MathUtils.Square(
									o - this.TsDistToChainEdgeLessThan,
								)))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
(TsDecoratorNearChainEdge.TmpVector = Vector_1.Vector.Create()),
	(exports.default = TsDecoratorNearChainEdge);
