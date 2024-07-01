"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTaskRandomMontage = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskRandomMontage extends AiStateMachineTask_1.AiStateMachineTask {
	constructor() {
		super(...arguments),
			(this.MontageNames = void 0),
			(this.Ine = !1),
			(this.ose = 0),
			(this.Rne = void 0),
			(this.rse = void 0),
			(this.MontageIndex = void 0),
			(this.Dne = !1),
			(this.Playing = !1),
			(this.Une = () => {
				(this.Dne = !1),
					this.Node.Activated &&
						(this.Ine &&
							(this.Node.ActorComponent.EnableActor(this.Rne),
							(this.Rne = void 0)),
						this.Node.MoveComponent.SetForceSpeed(
							Vector_1.Vector.ZeroVectorProxy,
						));
			}),
			(this.nse = (e) => {
				this.Node.TaskFinish = !0;
			});
	}
	get HasResource() {
		return !!this.rse;
	}
	OnInit(e) {
		return (
			(this.MontageNames = Array.from(e.TaskRandomMontage.MontageNames)),
			(this.Ine = e.TaskRandomMontage.HideOnLoading),
			(this.ose = e.TaskRandomMontage.BlendInTime),
			!0
		);
	}
	OnEnter(e) {
		this.Node.SkillComponent.StopGroup1Skill(
			"AiStateMachineTaskRandomMontage.OnEnter",
		),
			(this.Node.TaskFinish = !1),
			(this.Dne = !0),
			(this.Playing = !1),
			(this.MontageIndex = this.Node.Owner.GetBlackboard(1)),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Node.Entity,
				"随机Montage",
				["MontageIndex", this.MontageIndex],
			),
			(void 0 === this.MontageIndex ||
				this.MontageIndex < 0 ||
				this.MontageIndex >= this.MontageNames.length) &&
				(CombatDebugController_1.CombatDebugController.CombatError(
					"StateMachineNew",
					this.Node.Entity,
					"播放随机Montage失败，MontageIndex非法",
					["MontageIndex", this.MontageIndex],
				),
				(this.MontageIndex = 0)),
			this.Ine &&
				!this.Rne &&
				(this.Rne = this.Node.ActorComponent.DisableActor("状态机加载动作"));
		let t = "";
		if (!this.rse)
			for (let e = 0; e < this.MontageNames.length; e++) {
				var n = (this.MontageIndex + e) % this.MontageNames.length;
				if (
					((t = this.MontageNames[n]),
					(this.rse = this.Node.MontageComponent.PlayMontageAsync(
						t,
						this.Une,
						this.nse,
						!1,
						this.ose,
					)),
					this.rse)
				)
					break;
			}
		this.rse
			? ((this.Playing = !0),
				this.Node.MontageComponent.PlayMontageTaskAndRequest(
					this.rse,
					this.Node.ElapseTime / 1e3,
					t,
					e,
				))
			: (this.Node.TaskFinish = !0);
	}
	OnExit(e) {
		this.Ine &&
			this.Dne &&
			(this.Node.ActorComponent.EnableActor(this.Rne), (this.Rne = void 0)),
			this.Node.MontageComponent.EndMontageTask(this.rse),
			(this.rse = void 0),
			(this.Node.TaskFinish = !1),
			(this.Playing = !1);
	}
	OnTick() {
		this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
	}
	OnClear() {
		this.rse && this.Node.MontageComponent.EndMontageTask(this.rse),
			(this.rse = void 0);
	}
	GetTimeRemaining() {
		return this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineTaskRandomMontage = AiStateMachineTaskRandomMontage;
