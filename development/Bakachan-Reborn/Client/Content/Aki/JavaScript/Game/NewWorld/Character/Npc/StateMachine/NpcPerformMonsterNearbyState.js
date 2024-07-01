"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformMonsterNearbyState = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
	BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
	NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil"),
	BUBBLE_TIME = 3;
class NpcPerformMonsterNearbyState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.bTe = 0),
			(this.ber = !1),
			(this.qer = void 0),
			(this.Ger = 0),
			(this.Ner = void 0),
			(this.ser = void 0),
			(this.Oer = void 0);
	}
	get NpcMontageController() {
		return this.ser;
	}
	set NpcMontageController(e) {
		this.ser = e;
	}
	CanChangeFrom(e) {
		var t = this.Owner.Entity.GetComponent(168);
		return this.ber && 1 === e && !t.IsInPlot;
	}
	OnCreate(e) {
		e?.NpcMonsterClosePerform
			? ((this.ber = !0),
				(this.qer = e.NpcMonsterClosePerform.Montage),
				(this.Ger = e.NpcMonsterClosePerform.BubbleRate),
				(this.Ner = e.NpcMonsterClosePerform.Bubble))
			: (this.ber = !1);
	}
	OnEnter(e) {
		this.Oer = e;
		e = this.Owner.Entity.GetComponent(168);
		var t =
			(e?.HasBrain && this.Owner.Entity.GetComponent(36)?.StopMove(!1),
			new BasePerformComponent_1.PlayMontageConfig(0, 0, !0, !0));
		(this.bTe = e?.LoadAndPlayMontageById(this.qer, t) ?? 0),
			this.bTe < 0 &&
				TimerSystem_1.TimerSystem.Delay(() => {
					this.StateMachine.Switch(this.Oer);
				}, 3 * CommonDefine_1.MILLIONSECOND_PER_SECOND),
			NpcPerceptionReactionUtil_1.NpcPerceptionReactionUtil.ShowHeadDialog(
				this.Owner.Entity,
				this.Ger,
				this.Ner,
			);
	}
	OnExit(e) {
		this.Owner.Entity.GetComponent(168)?.ClearAndStopMontage(this.bTe);
	}
	OnDestroy() {
		this.ser = void 0;
	}
}
exports.NpcPerformMonsterNearbyState = NpcPerformMonsterNearbyState;
