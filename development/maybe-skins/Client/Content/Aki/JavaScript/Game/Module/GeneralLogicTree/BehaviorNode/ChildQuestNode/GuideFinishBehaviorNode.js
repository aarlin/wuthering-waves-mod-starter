"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideFinishBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GuideFinishBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.QQt = !1),
			(this.mDe = 0),
			(this.XQt = (e) => {
				this.QQt || (e === this.mDe && this.SubmitNode());
			}),
			(this.DDe = () => {
				this.QQt || this.SubmitNode();
			}),
			(this.OnAfterSubmit = (e) => {
				this.QQt = !1;
			});
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"Guide" === (e = e.Condition).Type &&
			((this.mDe = e.GuideGroupId), !0)
		);
	}
	OnDestroy() {
		super.OnDestroy(), (this.mDe = 0);
	}
	AddEventsOnChildQuestStart() {
		super.AddEventsOnChildQuestStart(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GuideGroupFinished,
				this.XQt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComboTeachingFinish,
				this.DDe,
			);
	}
	RemoveEventsOnChildQuestEnd() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.GuideGroupFinished,
			this.XQt,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GuideGroupFinished,
				this.XQt,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.ComboTeachingFinish,
				this.DDe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ComboTeachingFinish,
					this.DDe,
				),
			super.RemoveEventsOnChildQuestEnd();
	}
	OnBeforeSubmit() {
		this.QQt = !0;
	}
}
exports.GuideFinishBehaviorNode = GuideFinishBehaviorNode;
