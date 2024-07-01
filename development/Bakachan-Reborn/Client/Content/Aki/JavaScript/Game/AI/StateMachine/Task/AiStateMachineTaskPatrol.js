"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTaskPatrol = void 0);
const GlobalData_1 = require("../../../GlobalData"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskPatrol extends AiStateMachineTask_1.AiStateMachineTask {
	constructor() {
		super(...arguments),
			(this.mLn = void 0),
			(this.$ie = void 0),
			(this.Jh = void 0),
			(this.Gce = void 0),
			(this.mBe = void 0),
			(this.dLn = void 0),
			(this.Hte = void 0),
			(this.Bte = void 0),
			(this.MoveState = 0),
			(this.OpenDebugMode = !1);
	}
	OnInit(t) {
		return (
			(this.MoveState = t.TaskPatrol.MoveState),
			(this.OpenDebugMode = t.TaskPatrol.OpenDebugMode),
			!0
		);
	}
	OnEnter(t) {
		var e = this.Node.AiComponent.TsAiController;
		e instanceof TsAiController_1.default &&
		((this.Bte = e.AiController),
		(this.mLn = this.Bte.AiPatrol),
		(this.$ie = this.mLn.GetConfig()),
		this.$ie)
			? ((this.Jh = this.Bte.CharAiDesignComp.Entity),
				(this.Gce = this.Jh.GetComponent(36)),
				(this.mBe = this.Jh.GetComponent(89)),
				(this.dLn = this.Jh.GetComponent(39)),
				(this.Hte = this.Bte.CharActorComp),
				this.CLn())
			: this.$ne();
	}
	OnExit(t) {
		this.Node.TaskFinish ||
			(this.dLn.PausePatrol("AiStateMachineTaskPatrol"), this.gLn()),
			this.Gce && (this.Gce.StopMove(!0), (this.Gce.IsSpecialMove = !1));
	}
	$ne() {
		this.Node.TaskFinish = !0;
	}
	fLn() {
		this.mLn.GeneratePatrol(!0),
			this.mLn.StartPatrol(!0, () => {
				this.pLn();
			}),
			this.mLn.ResetBaseInfoByMainPoint(this.Gce, this.mBe, this.MoveState);
	}
	pLn() {
		var t;
		GlobalData_1.GlobalData.BpEventManager &&
			(t = this.mLn?.PatrolPoint) &&
			t.IsMain &&
			GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(
				this.Hte.Actor,
				this.mLn.PatrolIndex,
			);
	}
	vLn() {
		const t = this.mLn?.PatrolPoint;
		var e;
		t &&
			(this.dLn.HasPatrolRecord()
				? this.dLn.ResumePatrol("AiStateMachineTaskPatrol")
				: ((e = {
						DebugMode: this.OpenDebugMode,
						UseNearestPoint: !0,
						ReturnFalseWhenNavigationFailed: !1,
						OnArrivePointHandle: () => {
							var e = this.dLn.GetLastPointRawIndex();
							-1 !== e && this.mLn.SetPatrolIndex(e), t.IsMain && this.pLn();
						},
						OnPatrolEndHandle: (t) => {
							1 === t && this.gLn(), this.$ne();
						},
					}),
					this.dLn.StartPatrol(this.$ie.SplineEntityId, e)));
	}
	gLn() {
		this.pLn(), this.mLn?.PatrolFinish();
	}
	CLn() {
		this.$ie.ContainZ &&
			this.Gce &&
			this.Gce.CharacterMovement.SetMovementMode(5),
			this.fLn(),
			this.mLn?.PatrolPoint
				? (this.vLn(),
					void 0 !== this.Bte.AiPatrol.StartWithInversePath &&
						(this.Bte.AiPatrol.StartWithInversePath = void 0))
				: this.$ne();
	}
}
exports.AiStateMachineTaskPatrol = AiStateMachineTaskPatrol;
