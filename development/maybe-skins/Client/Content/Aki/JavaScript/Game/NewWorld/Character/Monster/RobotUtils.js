"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RobotUtils = void 0);
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
class RobotUtils {
	static IsRobot(t) {
		t = t.GetPbEntityInitData();
		var o = (0, IComponent_1.getComponent)(
			t.ComponentsData,
			"InteractComponent",
		);
		t = (0, IComponent_1.getComponent)(t.ComponentsData, "BubbleComponent");
		return !(!o || !t);
	}
}
exports.RobotUtils = RobotUtils;
