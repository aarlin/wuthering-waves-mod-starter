"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SeqBaseAssistant = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
class SeqBaseAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.Model = ModelManager_1.ModelManager.SequenceModel),
			(this.IsRunning = !1),
			(this.Callback = void 0),
			(this.Promise = void 0);
	}
	DoCallback(s) {
		var e;
		this.Callback && ((e = this.Callback), (this.Callback = void 0), e(s));
	}
	End() {}
	Load(s) {}
	async LoadPromise() {
		return this.Promise.Promise;
	}
	PreAllPlay(s) {}
	async PreAllPlayPromise() {
		return this.Promise.Promise;
	}
	PreEachPlay() {}
	EachStop() {}
	AllStop(s) {}
	async AllStopPromise() {
		return this.Promise.Promise;
	}
	OnDestroy() {}
}
exports.SeqBaseAssistant = SeqBaseAssistant;
