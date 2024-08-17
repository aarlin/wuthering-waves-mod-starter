"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WaitEntityTaskController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager");
class WaitEntityTaskController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				WaitEntityTaskController.GUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				WaitEntityTaskController.zpe,
			),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				WaitEntityTaskController.GUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				WaitEntityTaskController.zpe,
			),
			!0
		);
	}
	static AddTask(e) {
		var t = WaitEntityTaskController.BOe++;
		return ModelManager_1.ModelManager.WaitEntityTaskModel.AddTask(t, e), t;
	}
	static RemoveTask(e) {
		ModelManager_1.ModelManager.WaitEntityTaskModel.RemoveTask(e);
	}
}
((exports.WaitEntityTaskController = WaitEntityTaskController).BOe = 0),
	(WaitEntityTaskController.GUe = (e, t, n) => {
		var a = (t = t.Entity.GetComponent(0)).GetCreatureDataId();
		t = t.GetPbDataId();
		ModelManager_1.ModelManager.WaitEntityTaskModel.OnAddEntity(a, t);
	}),
	(WaitEntityTaskController.zpe = (e, t) => {
		var n = (t = t.Entity.GetComponent(0)).GetCreatureDataId();
		t = t.GetPbDataId();
		ModelManager_1.ModelManager.WaitEntityTaskModel.OnRemoveEntity(n, t);
	});
