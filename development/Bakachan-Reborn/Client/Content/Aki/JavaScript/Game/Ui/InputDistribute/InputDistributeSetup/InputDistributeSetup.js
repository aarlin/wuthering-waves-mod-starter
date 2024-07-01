"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeSetup = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class InputDistributeSetup {
	SetInputDistributeTag(e) {
		ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(e);
	}
	SetInputDistributeTags(e) {
		ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTags(e);
	}
	AddInputDistributeTag(e) {
		ModelManager_1.ModelManager.InputDistributeModel.AddInputDistributeTag(e);
	}
	RemoveInputDistributeTag(e, t = !1) {
		ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTag(
			e,
			t,
		);
	}
}
exports.InputDistributeSetup = InputDistributeSetup;
