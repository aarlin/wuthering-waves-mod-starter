"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingInputHandler = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputEnums_1 = require("../../Input/InputEnums"),
	InputFilter_1 = require("../../Input/InputFilter");
class ComboTeachingInputHandler {
	constructor() {
		this.InputFilter = void 0;
	}
	GetPriority() {
		return 1;
	}
	GetInputFilter() {
		return (
			this.InputFilter ||
				(this.InputFilter = new InputFilter_1.InputFilter(
					[
						InputEnums_1.EInputAction.攻击,
						InputEnums_1.EInputAction.大招,
						InputEnums_1.EInputAction.跳跃,
						InputEnums_1.EInputAction.闪避,
						InputEnums_1.EInputAction.技能1,
						InputEnums_1.EInputAction.瞄准,
					],
					void 0,
					void 0,
					void 0,
				)),
			this.InputFilter
		);
	}
	HandlePressEvent(e, t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ComboTeachingPress,
			e,
			t,
		);
	}
	HandleReleaseEvent(e, t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ComboTeachingRelease,
			e,
			t,
		);
	}
	HandleHoldEvent(e, t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ComboTeachingHold,
			e,
			t,
		);
	}
	HandleInputAxis(e, t) {}
	PreProcessInput(e, t) {}
	PostProcessInput(e, t) {}
}
exports.ComboTeachingInputHandler = ComboTeachingInputHandler;
