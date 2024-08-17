"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotController = void 0);
const ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	ModelManager_1 = require("../Manager/ModelManager");
class RedDotController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return !0;
	}
	static BindRedDot(e, o, t, r = 0) {
		(e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e)) &&
			e.BindUi(r, o, t);
	}
	static UnBindRedDot(e) {
		(e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e)) && e.UnBindUi();
	}
	static UnBindGivenUi(e, o, t = 0) {
		(e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e)) &&
			e.UnBindGivenUi(t, o);
	}
}
exports.RedDotController = RedDotController;
