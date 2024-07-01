"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationUtil = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	GlobalData_1 = require("../../GlobalData");
class UiNavigationUtil {
	static GetFullPathOfActor(t) {
		var a;
		return t
			? ((a = (0, puerts_1.$ref)("")),
				UE.LGUIBPLibrary.GetFullPathOfActor(
					GlobalData_1.GlobalData.World,
					t,
					a,
				),
				(0, puerts_1.$unref)(a))
			: "null";
	}
}
(exports.UiNavigationUtil = UiNavigationUtil).IncId = 0;
