"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../../Core/Net/Net"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPatrol extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.MoveOnePath = !1),
			(this.UseSimpleMove = !1),
			(this.UseActorForward = !0),
			(this.UseLastMoveIndex = !1),
			(this.OpenDebugNode = !1),
			(this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0),
			(this.StateComp = void 0),
			(this.PatrolLogic = void 0),
			(this.PatrolConfig = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsMoveState = 0),
			(this.TsMoveOnePath = !1),
			(this.TsUseLastMoveIndex = !1),
			(this.TsOpenDebugNode = !1),
			(this.HandleMoveEnd = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveState = this.MoveState),
			(this.TsMoveOnePath = this.MoveOnePath),
			(this.TsUseLastMoveIndex = this.UseLastMoveIndex),
			(this.TsOpenDebugNode = this.OpenDebugNode));
	}
	ReceiveExecuteAI(t, o) {
		this.InitTsVariables();
		var e,
			i = t.AiController;
		i
			? ((this.PatrolLogic = i.AiPatrol),
				(this.PatrolConfig = this.PatrolLogic.GetConfig()),
				this.PatrolConfig &&
				((this.Entity = i.CharAiDesignComp.Entity),
				(this.MoveComp = this.Entity.GetComponent(36)),
				(this.StateComp = this.Entity.GetComponent(89)),
				(this.ActorComp = i.CharActorComp),
				this.PatrolConfig.ContainZ &&
					this.MoveComp &&
					this.MoveComp.CharacterMovement.SetMovementMode(5),
				this.HandleMoveEnd ||
					(this.HandleMoveEnd = (t) => {
						this.ExecuteMoveEnd(t);
					}),
				this.InitPatrolInfo(),
				this.PatrolLogic?.PatrolPoint)
					? (((e = Protocol_1.Aki.Protocol.WYn.create()).rkn =
							MathUtils_1.MathUtils.NumberToLong(
								i.CharActorComp.CreatureData.GetCreatureDataId(),
							)),
						(e.okn = !this.PatrolLogic.StartWithInversePath),
						Net_1.Net.Call(11810, e, () => {}),
						this.MoveToPatrolPoint(),
						void 0 !== i.AiPatrol.StartWithInversePath &&
							(i.AiPatrol.StartWithInversePath = void 0))
					: this.Finish(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	CallOutside() {
		var t;
		GlobalData_1.GlobalData.BpEventManager &&
			(t = this.PatrolLogic?.PatrolPoint) &&
			t.IsMain &&
			GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(
				this.ActorComp.Actor,
				this.PatrolLogic.PatrolIndex,
			);
	}
	InitPatrolInfo() {
		this.PatrolLogic.GeneratePatrol(!0),
			this.PatrolLogic.StartPatrol(this.TsUseLastMoveIndex, () => {
				this.CallOutside();
			}),
			this.PatrolLogic.ResetBaseInfoByMainPoint(
				this.MoveComp,
				this.StateComp,
				this.TsMoveState,
			);
	}
	MoveToPatrolPoint() {
		const t = this.PatrolLogic?.PatrolPoint;
		if (t) {
			var o = [];
			let a = 0;
			for (let s = 0; s < this.PatrolLogic.AllPatrolPoints.length; s++) {
				var e = this.PatrolLogic.AllPatrolPoints[s],
					i = {
						Index: e.IsMain ? a : -1,
						Position: e.Point,
						MoveState: e.MoveState,
						MoveSpeed: e.MoveSpeed,
						Actions: e.Actions,
						Callback: () => {
							this.PatrolLogic.SetPatrolIndex(s),
								t.IsMain && this.CallOutside();
						},
					};
				e.IsMain && a++, i.Actions || (i.Actions = []), o.push(i);
			}
			var s = {
				Points: o,
				Navigation: this.PatrolConfig.IsNavigation,
				IsFly: this.PatrolConfig.ContainZ,
				DebugMode: this.TsOpenDebugNode,
				Loop: this.PatrolConfig.Loop,
				CircleMove: this.PatrolConfig.CirclePatrol,
				StartWithInversePath: this.PatrolLogic.StartWithInversePath,
				Callback: (t) => {
					1 === t && this.PatrolFinish(), this.Finish(!0);
				},
				UsePreviousIndex: this.UseLastMoveIndex,
				UseNearestPoint: this.UseLastMoveIndex,
				ReturnFalseWhenNavigationFailed: !1,
			};
			this.MoveComp.MoveAlongPath(s);
		}
	}
	ExecuteMoveEnd(t) {
		1 === t
			? this.PatrolLogic?.PatrolPoint &&
				((t = this.PatrolLogic.PatrolPoint),
				this.CheckMoveEnd(t)
					? (this.PatrolFinish(), this.Finish(!0))
					: t !== this.PatrolLogic.PatrolPoint &&
						((t = this.PatrolLogic.PatrolPoint)
							? (t.IsMain &&
									(this.CallOutside(),
									this.PatrolLogic.ResetBaseInfoByMainPoint(
										this.MoveComp,
										this.StateComp,
										this.TsMoveState,
									)),
								this.MoveToPatrolPoint())
							: this.Finish(!0)))
			: this.Finish(!1);
	}
	ReceiveTickAI(t, o, e) {}
	CheckMoveEnd(t) {
		let o = this.PatrolLogic.CheckPatrolEnd();
		return (
			t.IsMain &&
				(this.TsMoveOnePath && !t.IsIgnorePoint && (o = !0), t.Actions) &&
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
					t.Actions,
					LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
				),
			o
		);
	}
	PatrolFinish() {
		this.CallOutside(), this.PatrolLogic?.PatrolFinish();
	}
	OnAbort() {
		this.PatrolFinish(), this.MoveComp?.StopMove(!0);
	}
	OnClear() {
		var t;
		this.AIOwner instanceof TsAiController_1.default &&
			(EntitySystem_1.EntitySystem.Get(this.Entity.Id) &&
				(((t = Protocol_1.Aki.Protocol.QYn.create()).rkn =
					MathUtils_1.MathUtils.NumberToLong(
						this.ActorComp.CreatureData.GetCreatureDataId(),
					)),
				Net_1.Net.Call(21134, t, () => {})),
			this.MoveComp &&
				(this.TsMoveOnePath &&
					this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
				(this.MoveComp.IsSpecialMove = !1)),
			(this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0),
			(this.StateComp = void 0),
			(this.PatrolLogic = void 0),
			(this.PatrolConfig = void 0));
	}
}
exports.default = TsTaskPatrol;
