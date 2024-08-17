"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskMoveToActor extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.NavigationOn = !1),
			(this.BlackboardKeyActor = ""),
			(this.EndDistance = 0),
			(this.TurnSpeed = 0),
			(this.FixPeriod = 0),
			(this.WalkOff = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMoveState = 0),
			(this.TsNavigationOn = !1),
			(this.TsBlackboardKeyActor = ""),
			(this.TsEndDistance = 0),
			(this.TsTurnSpeed = 0),
			(this.TsFixPeriod = 0),
			(this.TsWalkOff = !1),
			(this.SelectedTargetLocation = void 0),
			(this.FoundPath = !1),
			(this.NavigationPath = void 0),
			(this.CurrentNavigationIndex = 0),
			(this.NextCheckTime = -0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveState = this.MoveState),
			(this.TsNavigationOn = this.NavigationOn),
			(this.TsBlackboardKeyActor = this.BlackboardKeyActor),
			(this.TsEndDistance = this.EndDistance),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TsFixPeriod = this.FixPeriod),
			(this.TsWalkOff = this.WalkOff));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var i = t.AiController;
		if (i) {
			var a = i.CharActorComp,
				r =
					(this.TsWalkOff ||
						a.Entity.GetComponent(36)?.SetWalkOffLedgeRecord(!1),
					BlackboardController_1.BlackboardController.GetEntityIdByEntity(
						i.CharAiDesignComp.Entity.Id,
						this.TsBlackboardKeyActor,
					)),
				o = EntitySystem_1.EntitySystem.Get(r);
			if (r && o?.Valid) {
				this.SelectedTargetLocation =
					AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(o);
				var s = i.CharAiDesignComp?.Entity.GetComponent(158);
				if (s?.Valid)
					switch (this.TsMoveState) {
						case 1:
							s.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
							break;
						case 2:
							s.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
							break;
						case 3:
							s.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
							);
					}
				(this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod),
					this.FindNewPath(t, a.ActorLocation);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"BehaviorTree",
						6,
						"TsTaskMoveToEntity没有获取到目标EntityId",
						["BehaviorTree", this.TreeAsset.GetName()],
						["TargetKey", this.TsBlackboardKeyActor],
					),
					(this.FoundPath = !1);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	ReceiveTickAI(t, e, i) {
		if (t instanceof TsAiController_1.default) {
			var a = t.AiController,
				r = a.CharActorComp,
				o = r.ActorLocationProxy;
			if (Time_1.Time.WorldTime > this.NextCheckTime) {
				var s = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
						a.CharAiDesignComp.Entity.Id,
						this.TsBlackboardKeyActor,
					),
					n = EntitySystem_1.EntitySystem.Get(s);
				if (!s || !n?.Valid) return void this.Finish(!1);
				(s = AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(n)),
					(this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod),
					Vector_1.Vector.Dist(s, this.SelectedTargetLocation) > 10 &&
						((this.SelectedTargetLocation = s),
						this.FindNewPath(t, o.ToUeVector()));
			}
			if (this.FoundPath)
				if (
					((n = this.TsNavigationOn
						? Vector_1.Vector.Create(
								this.NavigationPath[this.CurrentNavigationIndex],
							)
						: this.SelectedTargetLocation),
					(s = Vector_1.Vector.Create(n)).Subtraction(o, s),
					(s.Z = 0),
					(t = s.Size()),
					(!this.TsNavigationOn ||
						this.CurrentNavigationIndex === this.NavigationPath.length - 1) &&
						t < this.TsEndDistance)
				)
					this.Finish(!0);
				else {
					t < 10 && this.CurrentNavigationIndex++,
						AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
							r,
							n,
							this.TsTurnSpeed,
						),
						(s.Z = 0),
						(s.X /= t),
						(s.Y /= t),
						r.SetInputDirect(s);
					var h = a.CharAiDesignComp?.Entity.GetComponent(158);
					if (h?.Valid)
						switch (this.TsMoveState) {
							case 1:
								h.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
								);
								break;
							case 2:
								h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
								break;
							case 3:
								h.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
								);
						}
				}
			else this.Finish(!1);
		} else this.Finish(!1);
	}
	FindNewPath(t, e) {
		this.TsNavigationOn
			? (this.NavigationPath || (this.NavigationPath = new Array()),
				(this.FoundPath =
					AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
						t,
						e,
						this.SelectedTargetLocation.ToUeVector(),
						this.NavigationPath,
					)),
				(this.CurrentNavigationIndex = 1))
			: (this.FoundPath = !0);
	}
	OnClear() {
		this.AIOwner instanceof TsAiController_1.default &&
			(AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
			this.TsWalkOff ||
				this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
					36,
				)?.SetWalkOffLedgeRecord(!0));
	}
}
exports.default = TsTaskMoveToActor;
