"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTaskMoveToTarget = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	AiStateMachineTask_1 = require("./AiStateMachineTask"),
	NAVIGATION_COMPLETE_DISTANCE = 10;
class AiStateMachineTaskMoveToTarget extends AiStateMachineTask_1.AiStateMachineTask {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.NavigationOn = !1),
			(this.EndDistance = 0),
			(this.TurnSpeed = 0),
			(this.FixPeriod = 0),
			(this.WalkOff = !1),
			(this.sse = Vector_1.Vector.Create()),
			(this.ase = !1),
			(this.hse = void 0),
			(this.lse = 0),
			(this.Xne = !1),
			(this._se = 0);
	}
	OnInit(e) {
		return (
			(this.MoveState = e.TaskMoveToTarget.MoveState),
			(this.NavigationOn = e.TaskMoveToTarget.NavigationOn),
			(this.EndDistance = e.TaskMoveToTarget.EndDistance),
			(this.TurnSpeed = e.TaskMoveToTarget.TurnSpeed),
			(this.FixPeriod = e.TaskMoveToTarget.FixPeriod),
			(this.WalkOff = e.TaskMoveToTarget.WalkOff),
			!0
		);
	}
	OnEnter(e) {
		var t = this.Node.AiComponent.TsAiController,
			r = t.AiController;
		if (r) {
			var i = r.CharActorComp;
			if (
				(this.WalkOff || i.Entity.GetComponent(36)?.SetWalkOffLedgeRecord(!1),
				(this._se = this.Node.Owner.GetBlackboard(2) ?? 0),
				this._se)
			) {
				var o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
					this._se,
				);
				if (o) {
					(this.sse.X = o.Transform.Pos.X),
						(this.sse.Y = o.Transform.Pos.Y),
						(this.sse.Z = o.Transform.Pos.Z);
					var a = r.CharAiDesignComp?.Entity.GetComponent(158);
					if (a?.Valid)
						switch (this.MoveState) {
							case 1:
								a.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
								);
								break;
							case 2:
								a.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
								break;
							case 3:
								a.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
								);
						}
					this.use(t, i.ActorLocation);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
							"Type",
							t.GetClass().GetName(),
						]);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.$ne();
	}
	OnTick() {
		var e,
			t,
			r,
			i = this.Node.AiComponent.TsAiController;
		i instanceof TsAiController_1.default &&
		((r = (i = i.AiController.CharActorComp).ActorLocationProxy), this.ase) &&
		((e = this.NavigationOn
			? Vector_1.Vector.Create(this.hse[this.lse])
			: this.sse),
		(t = Vector_1.Vector.Create(e)).Subtraction(r, t),
		(t.Z = 0),
		(r = t.Size()),
		(this.NavigationOn && this.lse !== this.hse.length - 1) ||
			!(r < this.EndDistance))
			? (r < 10 && this.lse++,
				AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
					i,
					e,
					this.TurnSpeed,
				),
				(t.Z = 0),
				(t.X /= r),
				(t.Y /= r),
				i.SetInputDirect(t))
			: this.$ne();
	}
	use(e, t) {
		this.NavigationOn
			? (this.hse || (this.hse = new Array()),
				(this.ase = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
					e,
					t,
					this.sse.ToUeVector(),
					this.hse,
				)),
				(this.lse = 1))
			: (this.ase = !0);
	}
	$ne() {
		this.Xne && ((this.Node.TaskFinish = !0), (this.Xne = !1));
	}
	OnExit() {
		var e = this.Node.AiComponent.TsAiController;
		e &&
			(AiContollerLibrary_1.AiControllerLibrary.ClearInput(e),
			this.WalkOff ||
				e.AiController.CharActorComp.Entity.GetComponent(
					36,
				)?.SetWalkOffLedgeRecord(!0));
	}
}
exports.AiStateMachineTaskMoveToTarget = AiStateMachineTaskMoveToTarget;
