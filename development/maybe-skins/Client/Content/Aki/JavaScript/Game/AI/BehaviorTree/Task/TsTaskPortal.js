"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPortal extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.Distance = 0),
			(this.EffectDieTime = -0),
			(this.EffectBornTime = -0),
			(this.ActiveModel = !1),
			(this.WaitTime = -0),
			(this.EffectId = 0),
			(this.StartMaterialControllerData = void 0),
			(this.EndMaterialControllerData = void 0),
			(this.FollowPointName = "FollowPoint"),
			(this.FollowPoint = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsEffectDieTime = -0),
			(this.TsEffectBornTime = -0),
			(this.TsActiveModel = !1),
			(this.TsWaitTime = -0),
			(this.TsStartMaterialControllerData = void 0),
			(this.TsEndMaterialControllerData = void 0),
			(this.TsFollowPointName = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsEffectDieTime = this.EffectDieTime),
			(this.TsEffectBornTime = this.EffectBornTime),
			(this.TsActiveModel = this.ActiveModel),
			(this.TsWaitTime = this.WaitTime),
			(this.TsStartMaterialControllerData = this.StartMaterialControllerData),
			(this.TsEndMaterialControllerData = this.EndMaterialControllerData),
			(this.TsFollowPointName = this.FollowPointName));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables(),
			t.AiController
				? this.TsActiveModel || this.FinishExecute(!1)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]);
	}
	ReceiveTickAI(t, e, i) {
		if ((t = t.AiController)) {
			var o = t.CharActorComp;
			this.FollowPoint =
				BlackboardController_1.BlackboardController.GetVectorValueByEntity(
					t.CharAiDesignComp.Entity.Id,
					this.TsFollowPointName,
				);
			let e = Vector_1.Vector.ZeroVector;
			this.FollowPoint &&
				(e = new UE.Vector(
					this.FollowPoint.X,
					this.FollowPoint.Y,
					this.FollowPoint.Z,
				)),
				this.TsActiveModel
					? this.TsWaitTime <= Time_1.Time.WorldTime &&
						(o.Actor.CharRenderingComponent.RemoveMaterialControllerData(
							this.EffectId,
						),
						o.Actor.CharRenderingComponent.AddMaterialControllerData(
							this.TsStartMaterialControllerData,
						),
						(this.TsActiveModel = !1),
						(t = UE.KismetMathLibrary.ProjectPointOnToPlane(
							o.ActorLocation,
							e,
							new UE.Vector(0, 0, 1),
						)),
						(t = UE.KismetMathLibrary.FindLookAtRotation(t, e)),
						o.SetActorLocationAndRotation(e, t, "行为树节点.巡逻", !0),
						(this.TsWaitTime = this.TsEffectBornTime + Time_1.Time.WorldTime))
					: this.TsWaitTime <= Time_1.Time.WorldTime &&
						e &&
						e !== Vector_1.Vector.ZeroVector &&
						((this.TsActiveModel = !0),
						(this.EffectId =
							o.Actor.CharRenderingComponent.AddMaterialControllerData(
								this.TsEndMaterialControllerData,
							)),
						(this.TsWaitTime = this.TsEffectDieTime + Time_1.Time.WorldTime));
		} else this.FinishExecute(!1);
	}
}
exports.default = TsTaskPortal;
