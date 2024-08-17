"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeDelay = exports.delayInput = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	Queue_1 = require("../../../Core/Container/Queue"),
	UiManager_1 = require("../UiManager"),
	InputMappingsDefine_1 = require("./InputMappingsDefine");
exports.delayInput = [InputMappingsDefine_1.actionMappings.通用交互];
class InputDistributeDelay {
	constructor() {
		(this.jcr = new Queue_1.Queue()), (this.Wcr = new Queue_1.Queue());
	}
	StartDelay(e, i) {
		(i ? this.jcr : this.Wcr).Push(Time_1.Time.Now + e);
	}
	IsInputActive(e) {
		let i;
		i = e ? this.jcr : this.Wcr;
		for (var t = Time_1.Time.Now; 0 < i.Size; ) {
			if (t < i.Front) return i.Pop(), !0;
			i.Pop();
		}
		return !1;
	}
	CheckCondition(e, i) {
		return (
			e === InputMappingsDefine_1.actionMappings.通用交互 &&
			!UiManager_1.UiManager.IsViewCreating("InteractionHintView") &&
			!UiManager_1.UiManager.IsViewDestroying("InteractionHintView")
		);
	}
}
exports.InputDistributeDelay = InputDistributeDelay;
