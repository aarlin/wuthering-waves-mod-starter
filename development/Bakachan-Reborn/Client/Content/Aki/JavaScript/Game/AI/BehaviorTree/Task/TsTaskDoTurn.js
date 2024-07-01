"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDoTurn extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.TurnToPlayer = !1),
			(this.TargetConfigId = 0),
			(this.TargetEntityKey = ""),
			(this.TargetDirectKey = ""),
			(this.TurnAngleAxis = 0),
			(this.TurnSpeed = 0),
			(this.MinAngle = 0),
			(this.LoopTime = 0),
			(this.IsInitTsVariables = !1),
			(this.TsTurnToPlayer = !1),
			(this.TsTargetConfigId = 0),
			(this.TsTargetEntityKey = ""),
			(this.TsTargetDirectKey = ""),
			(this.TsTurnAngleAxis = 0),
			(this.TsTurnSpeed = 0),
			(this.TsMinAngle = 0),
			(this.TsLoopTime = 0),
			(this.EndForward = void 0),
			(this.EndTime = -0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsTurnToPlayer = this.TurnToPlayer),
			(this.TsTargetConfigId = this.TargetConfigId),
			(this.TsTargetEntityKey = this.TargetEntityKey),
			(this.TsTargetDirectKey = this.TargetDirectKey),
			(this.TsTurnAngleAxis = this.TurnAngleAxis),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TsMinAngle = this.MinAngle),
			(this.TsLoopTime = this.LoopTime));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables(),
			(t = t.AiController) &&
				((t = t.CharActorComp),
				this.InitTurnForward(t),
				(this.EndTime = this.TsLoopTime + Time_1.Time.WorldTime));
	}
	InitTurnForward(t) {
		if (
			(this.EndForward || (this.EndForward = Vector_1.Vector.Create()),
			this.TsTurnToPlayer)
		) {
			var e = Global_1.Global.BaseCharacter;
			e &&
				e.CharacterActorComponent.ActorLocationProxy.Subtraction(
					t.ActorLocationProxy,
					this.EndForward,
				);
		} else if (0 < this.TsTargetConfigId) {
			var r = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
			for (let e = 0, a = r.length; e < a; e++) {
				var i = r[e];
				for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
					i.GetPlayerId(),
				)) {
					var o = e.EntityHandle;
					o &&
						(o = o.Entity.GetComponent(0)) &&
						o.GetVisible() &&
						o.GetPbDataId() === this.TsTargetConfigId &&
						i.GetLocation().Subtraction(t.ActorLocationProxy, this.EndForward);
				}
			}
		} else
			"" !== this.TsTargetEntityKey
				? ((e = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
						t.Entity.Id,
						this.TsTargetEntityKey,
					)),
					EntitySystem_1.EntitySystem.Get(e)
						.GetComponent(3)
						.ActorLocationProxy.Subtraction(
							t.ActorLocationProxy,
							this.EndForward,
						))
				: "" !== this.TsTargetDirectKey
					? (e =
							BlackboardController_1.BlackboardController.GetVectorValueByEntity(
								t.Entity.Id,
								this.TsTargetDirectKey,
							)) && this.EndForward.FromUeVector(e)
					: ((e = Vector_1.Vector.Create(t.ActorForward)).Normalize(
							MathUtils_1.MathUtils.SmallNumber,
						),
						e.RotateAngleAxis(
							this.TsTurnAngleAxis,
							Vector_1.Vector.UpVectorProxy,
							this.EndForward,
						));
		(this.EndForward.Z = 0),
			this.EndForward.Normalize(MathUtils_1.MathUtils.SmallNumber);
	}
	ReceiveTickAI(t, e, r) {
		var i,
			o = t.AiController;
		o
			? ((i = o.CharActorComp.ActorForward),
				(MathUtils_1.MathUtils.GetAngleByVectorDot(i, this.EndForward) <=
					this.TsMinAngle ||
					(AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
						o.CharActorComp,
						this.EndForward,
						this.TsTurnSpeed,
					),
					this.EndTime < Time_1.Time.WorldTime)) &&
					this.Finish(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	OnClear() {
		this.EndForward.Reset(), (this.EndTime = 0);
	}
}
exports.default = TsTaskDoTurn;
