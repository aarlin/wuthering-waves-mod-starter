"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueSelectBaseView = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiActorPool_1 = require("../../../Ui/UiActorPool");
class RogueSelectBaseView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.UiPoolActorPrivate = void 0),
			(this.OnDescModelChange = () => {}),
			(this.CloseMySelf = () => {
				this.CloseMe();
			}),
			(this.RoguelikeChooseDataResult = (e, t, i, o, s) => {}),
			(this.RoguelikeRefreshGain = (e) => {});
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeDataUpdate,
			this.OnDescModelChange,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
				this.CloseMySelf,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeChooseDataResult,
				this.RoguelikeChooseDataResult,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeRefreshGain,
				this.RoguelikeRefreshGain,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeDataUpdate,
			this.OnDescModelChange,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
				this.CloseMySelf,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeChooseDataResult,
				this.RoguelikeChooseDataResult,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeRefreshGain,
				this.RoguelikeRefreshGain,
			);
	}
	RecycleUiPoolActor() {
		this.UiPoolActorPrivate &&
			UiActorPool_1.UiActorPool.RecycleAsync(
				this.UiPoolActorPrivate,
				this.UiPoolActorPrivate.Path,
			);
	}
}
exports.RogueSelectBaseView = RogueSelectBaseView;
