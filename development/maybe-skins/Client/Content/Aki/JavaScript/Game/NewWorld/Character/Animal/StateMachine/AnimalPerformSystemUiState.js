"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformSystemUiState = void 0);
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformSystemUiState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	constructor() {
		super(...arguments),
			(this.cWo = new Map()),
			(this.mWo = !1),
			(this.dWo = void 0),
			(this.UKe = (e) => {
				this.dWo &&
					this.dWo === e &&
					(this.mWo ||
						EventSystem_1.EventSystem.Remove(
							EventDefine_1.EEventName.OpenView,
							this.UKe,
						),
					(this.mWo = !0),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.CloseView,
						this.$Ge,
					),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OnDeliveryProps,
						this.CWo,
					));
			}),
			(this.$Ge = (e) => {
				this.dWo &&
					this.dWo === e &&
					(EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.CloseView,
						this.$Ge,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnDeliveryProps,
						this.CWo,
					),
					this.StateMachine.Switch(1));
			}),
			(this.CWo = (e) => {
				e &&
					(e = this.cWo.get(e)) &&
					((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e)),
					this.EcologicalInterface.FeedStart(e));
			});
	}
	get SystemUiViewName() {
		return this.dWo;
	}
	set SystemUiViewName(e) {
		this.dWo = e;
	}
	OnEnter(e) {
		this.EcologicalInterface?.IsValid() &&
			this.dWo &&
			(UiManager_1.UiManager.IsViewShow(this.dWo)
				? this.UKe(this.dWo)
				: ((this.mWo = !1),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OpenView,
						this.UKe,
					)),
			0 === e &&
				this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
			(e = this.Owner.GetComponent(185)) && this.gWo(e),
			this.EcologicalInterface.SystemUiStart());
	}
	OnExit(e) {
		this.EcologicalInterface?.IsValid() &&
			(this.Owner.GetComponent(178)?.SetInteractionState(
				!0,
				"AnimalPerformSystemUiState OnExit",
			),
			this.EcologicalInterface.SystemUiEnd(),
			this.Owner.GetComponent(185)?.RemoveTag(1819982634),
			(this.mWo = !1),
			(this.dWo = void 0));
	}
	InitFeedingAnimalConfig(e, t) {
		if (e && t) {
			var i = e.length;
			for (let n = 0; n < i; ++n) {
				var a = e[n],
					s = t[n];
				s && this.cWo.set(a, s);
			}
		}
	}
	gWo(e) {
		e?.Valid &&
			(e.HasTag(502364103) && (e.RemoveTag(502364103), e.AddTag(1900394806)),
			e.HasTag(393622611) && (e.RemoveTag(393622611), e.AddTag(1900394806)),
			e.HasTag(276015887) && (e.RemoveTag(276015887), e.AddTag(379545977)),
			e.AddTag(1819982634));
	}
}
exports.AnimalPerformSystemUiState = AnimalPerformSystemUiState;
