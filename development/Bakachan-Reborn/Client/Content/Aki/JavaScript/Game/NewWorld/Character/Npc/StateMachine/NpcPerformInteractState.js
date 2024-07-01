"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformInteractState = void 0);
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
class NpcPerformInteractState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.xer = ""),
			(this.YZo = void 0),
			(this.ser = void 0),
			(this.wer = !1),
			(this.Ber = () => {
				this.StateMachine.Switch(1);
			});
	}
	get NpcMontageController() {
		return this.ser;
	}
	set NpcMontageController(t) {
		this.ser = t;
	}
	CanChangeFrom(t) {
		var e = this.Owner.Entity.GetComponent(168);
		return this.wer && 1 === t && !e.IsInPlot;
	}
	OnCreate(t) {
		t?.ShowOnInteract?.Montage
			? ((this.wer = !0), (this.xer = t.ShowOnInteract.Montage))
			: (this.wer = !1);
	}
	OnEnter(t) {
		this.ser.LoadAsync(this.xer, (t) => {
			t?.IsValid() && this?.Owner?.Valid && (this.ser?.Play(t), (this.YZo = t));
		}),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnInteractPlotEnd,
				this.Ber,
			);
	}
	OnUpdate(t) {}
	OnExit(t) {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnInteractPlotEnd,
			this.Ber,
		),
			this.Owner.Entity.GetComponent(3).ClearInput(),
			this.ser?.ForceStop(0.5, this.YZo),
			(this.YZo = void 0);
	}
	OnDestroy() {
		this.ser = void 0;
	}
}
exports.NpcPerformInteractState = NpcPerformInteractState;
