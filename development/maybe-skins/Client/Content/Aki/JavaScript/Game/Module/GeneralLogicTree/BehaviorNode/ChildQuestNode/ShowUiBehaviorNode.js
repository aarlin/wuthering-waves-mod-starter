"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShowUiBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ShowUiBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.yXt = !1),
			(this.IXt = void 0),
			(this.TXt = !1),
			(this.yze = () => {
				this.yXt || this.SubmitNode();
			}),
			(this.OnAfterSubmit = (e) => {
				this.yXt = !1;
			});
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"ShowUi" === (e = e.Condition).Type &&
			((this.IXt = e.UiType), (this.TXt = e.KeepUiOpen), !0)
		);
	}
	OnDestroy() {
		super.OnDestroy(), (this.IXt = void 0), (this.TXt = !1);
	}
	OnNodeActive() {
		super.OnNodeActive(),
			this.TXt &&
				"RogueAbilitySelect" === this.IXt.Type &&
				RoguelikeController_1.RoguelikeController.OpenBuffSelectViewByIdAsync(
					this.IXt.BindId,
				);
	}
	AddEventsOnChildQuestStart() {
		super.AddEventsOnChildQuestStart(),
			"All" === this.IXt.Type &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.ActiveBattleView,
					this.yze,
				);
	}
	RemoveEventsOnChildQuestEnd() {
		super.RemoveEventsOnChildQuestEnd(),
			"All" === this.IXt.Type &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ActiveBattleView,
					this.yze,
				);
	}
	OnBeforeSubmit() {
		this.yXt = !0;
	}
}
exports.ShowUiBehaviorNode = ShowUiBehaviorNode;
