"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	BasePerformComponent_1 = require("../../../../../NewWorld/Character/Common/Component/BasePerformComponent"),
	AiContollerLibrary_1 = require("../../../../Controller/AiContollerLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase"),
	TOLERANCE = 10,
	TURN_SPEED = 200,
	NEARBY_CHAIR_OFFSET = 70,
	MOVE_TO_CHAIR_SPEED = 70,
	MOVE_TO_NEARBY_CHAIR_SPEED = 100;
class TsTaskNpcSitOnChair extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.ChairEntityId = 0),
			(this.MovementMode = 0),
			(this.MontagePath = ""),
			(this.LoopDuration = 0),
			(this.RepeatTimes = 0),
			(this.PlayingMontageId = 0),
			(this.IsPlayLoop = !1),
			(this.LoopMontage = !1),
			(this.PhaseInternal = 0),
			(this.HasAborted = !1),
			(this.IsExecuteMoveNearby = !1),
			(this.IsExecuteMoveClose = !1),
			(this.IsExecuteTurnTo = !1),
			(this.IsExecutePlayMontage = !1),
			(this.IsExecuteMoveAway = !1),
			(this.Entity = void 0),
			(this.Character = void 0),
			(this.MoveComp = void 0),
			(this.ChairController = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsChairEntityId = 0),
			(this.TsMontagePath = ""),
			(this.TsLoopDuration = 0),
			(this.TsRepeatTimes = 0),
			(this.ChairNearbyPos = void 0),
			(this.TempVec = void 0);
	}
	get Phase() {
		return this.PhaseInternal;
	}
	set Phase(e) {
		this.PhaseInternal !== e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("NPC", 51, "[TsTaskNpcSitOnChair] 切换阶段", [
					"Phase",
					e,
				]),
			(this.PhaseInternal = e));
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsChairEntityId = this.ChairEntityId),
			(this.TsMontagePath = this.MontagePath),
			(this.TsLoopDuration = this.LoopDuration),
			(this.TsRepeatTimes = this.RepeatTimes),
			(this.ChairNearbyPos = Vector_1.Vector.Create()),
			(this.TempVec = Vector_1.Vector.Create()));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var o = e.AiController;
		o
			? ((this.Entity = o.CharAiDesignComp.Entity),
				(this.Character = this.Entity.GetComponent(3)),
				(this.MoveComp = this.Entity.GetComponent(36)),
				this.MoveComp?.CharacterMovement?.IsValid()
					? ((o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
							this.TsChairEntityId,
						)),
						(this.ChairController =
							o?.Entity?.GetComponent(
								178,
							)?.GetSubEntityInteractLogicController()),
						this.ChairController &&
						this.ChairController.IsSceneInteractionLoadCompleted()
							? "" === this.TsMontagePath
								? this.FinishExecute(!1)
								: (this.Phase = 1)
							: this.FinishExecute(!0))
					: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ReceiveTickAI(e, t, o) {
		switch (this.Phase) {
			case 1:
				this.Phase = 2;
				break;
			case 2:
				this.ExecuteMoveNearby();
				break;
			case 3:
				this.ExecuteMoveClose();
				break;
			case 4:
				this.ExecuteTurnTo(),
					this.Character.InputRotatorProxy.Equals(
						this.Character.ActorRotationProxy,
						10,
					) &&
						((this.MoveComp.CharacterMovement.MovementMode = this.MovementMode),
						(this.Phase = 5));
				break;
			case 5:
				this.ExecutePlayMontage();
				break;
			case 6:
				this.ExecuteMoveAway();
				break;
			case 7:
				this.Finish(!0);
				break;
			default:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						51,
						"[TsTaskTurnAndSit] 阶段切换出错",
						["CurPhase", this.Phase],
					);
		}
	}
	OnAbort() {
		2 === this.Phase || 3 === this.Phase || 6 === this.Phase
			? this.MoveComp?.StopMove(!0)
			: 4 === this.Phase
				? this.Character?.ClearInput()
				: 5 === this.Phase &&
					((this.HasAborted = !0),
					this.Entity?.GetComponent(37)?.ClearAndStopMontage(
						this.PlayingMontageId,
					));
	}
	OnClear() {
		(this.Character = void 0),
			(this.MovementMode = 0),
			(this.IsExecuteMoveNearby = !1),
			(this.IsExecuteMoveClose = !1),
			(this.IsExecuteTurnTo = !1),
			(this.IsExecutePlayMontage = !1),
			(this.IsExecuteMoveAway = !1);
	}
	ExecuteMoveNearby() {
		var e;
		this.IsExecuteMoveNearby ||
			((this.IsExecuteMoveNearby = !0),
			(e = this.ChairController.GetInteractPoint()),
			this.ChairController.GetForwardDirection().Multiply(
				70,
				this.ChairNearbyPos,
			),
			this.ChairNearbyPos.AdditionEqual(e),
			(e = {
				Index: 0,
				Position: this.ChairNearbyPos,
				MoveState: IComponent_1.EPatrolMoveState.Walk,
				MoveSpeed: 100,
			}),
			this.MoveComp.MoveAlongPath({
				Points: [e],
				Navigation: !0,
				IsFly: !1,
				DebugMode: !0,
				Loop: !1,
				Callback: (e) => {
					this.MoveComp.StopMove(!0), (this.Phase = 3);
				},
				ReturnFalseWhenNavigationFailed: !1,
			}));
	}
	ExecuteMoveClose() {
		var e, t;
		this.IsExecuteMoveClose ||
			((this.IsExecuteMoveClose = !0),
			this.ChairController.Possess(this.Entity),
			this.ChairController.IgnoreCollision(),
			(e = this.Character.ActorLocationProxy),
			(t = this.ChairController.GetInteractPoint()),
			this.TempVec.Set(t.X, t.Y, e.Z),
			(t = {
				Index: 0,
				Position: this.TempVec,
				MoveState: IComponent_1.EPatrolMoveState.Walk,
				MoveSpeed: 70,
			}),
			this.MoveComp.MoveAlongPath({
				Points: [t],
				Navigation: !0,
				IsFly: !1,
				DebugMode: !0,
				Loop: !1,
				Callback: (e) => {
					this.MoveComp.StopMove(!0), (this.Phase = 4);
				},
				ReturnFalseWhenNavigationFailed: !1,
			}));
	}
	ExecuteTurnTo() {
		this.IsExecuteTurnTo ||
			((this.IsExecuteTurnTo = !0),
			this.ChairController.GetForwardDirection().Multiply(200, this.TempVec),
			this.TempVec.AdditionEqual(this.ChairNearbyPos),
			(this.MovementMode = this.MoveComp.CharacterMovement.MovementMode),
			(this.MoveComp.CharacterMovement.MovementMode = 1),
			AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
				this.Character,
				this.TempVec,
				200,
			));
	}
	ExecutePlayMontage() {
		var e, t;
		this.IsExecutePlayMontage ||
			((this.IsExecutePlayMontage = !0),
			(this.IsPlayLoop =
				void 0 !== this.TsLoopDuration && 0 !== this.TsLoopDuration),
			(this.LoopMontage =
				-1 === this.TsLoopDuration || -1 === this.TsRepeatTimes),
			(e = this.Entity.GetComponent(37)),
			(t = new BasePerformComponent_1.PlayMontageConfig(
				this.TsRepeatTimes,
				this.TsLoopDuration,
				this.IsPlayLoop,
				this.LoopMontage,
			)),
			(this.HasAborted = !1),
			(this.PlayingMontageId = e.LoadAndPlayMontage(
				this.TsMontagePath,
				t,
				void 0,
				() => {
					this.HasAborted || (this.Phase = 6);
				},
				() => !this.HasAborted,
			)),
			this.PlayingMontageId < 0 && this.Finish(!1));
	}
	ExecuteMoveAway() {
		var e;
		this.IsExecuteMoveAway ||
			((this.IsExecuteMoveAway = !0),
			(e = {
				Index: 0,
				Position: this.ChairNearbyPos,
				MoveState: IComponent_1.EPatrolMoveState.Walk,
				MoveSpeed: 70,
			}),
			this.MoveComp.MoveAlongPath({
				Points: [e],
				Navigation: !0,
				IsFly: !1,
				DebugMode: !0,
				Loop: !1,
				Callback: (e) => {
					this.MoveComp.StopMove(!0),
						this.ChairController.ResetCollision(),
						this.ChairController.UnPossess(this.Entity),
						(this.Phase = 7);
				},
				ReturnFalseWhenNavigationFailed: !1,
			}));
	}
}
exports.default = TsTaskNpcSitOnChair;
