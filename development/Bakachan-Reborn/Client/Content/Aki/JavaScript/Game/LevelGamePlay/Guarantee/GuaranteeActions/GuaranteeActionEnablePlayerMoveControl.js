"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionEnablePlayerMoveControl = void 0);
const InputController_1 = require("../../../Input/InputController"),
	GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionEnablePlayerMoveControl extends GuaranteeActionBase_1.GuaranteeActionBase {
	OnExecute(e) {
		InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0);
	}
}
exports.GuaranteeActionEnablePlayerMoveControl =
	GuaranteeActionEnablePlayerMoveControl;
