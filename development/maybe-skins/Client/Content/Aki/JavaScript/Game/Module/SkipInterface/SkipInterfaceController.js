"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipInterfaceController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	SkipTaskManager_1 = require("./SkipTaskManager");
class SkipInterfaceController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.Ore(), !0;
	}
	static OnClear() {
		return this.kre(), SkipTaskManager_1.SkipTaskManager.Clear(), !0;
	}
	static Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OpenViewBegined,
			this.Eyo,
		);
	}
	static kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OpenViewBegined,
			this.Eyo,
		);
	}
}
(exports.SkipInterfaceController = SkipInterfaceController).Eyo = (e) => {
	SkipTaskManager_1.SkipTaskManager.CheckContainRingView(e);
};
