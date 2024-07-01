"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ApplicationController = void 0);
const Application_1 = require("../../../Core/Application/Application"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class ApplicationController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Application_1.Application.AddApplicationHandler(
				2,
				ApplicationController.LHe,
			),
			Application_1.Application.AddApplicationHandler(
				1,
				ApplicationController.DHe,
			),
			!0
		);
	}
	static OnClear() {
		return (
			Application_1.Application.RemoveApplicationHandler(
				2,
				ApplicationController.LHe,
			),
			Application_1.Application.RemoveApplicationHandler(
				1,
				ApplicationController.DHe,
			),
			!0
		);
	}
}
((exports.ApplicationController = ApplicationController).LHe = () => {}),
	(ApplicationController.DHe = () => {});
