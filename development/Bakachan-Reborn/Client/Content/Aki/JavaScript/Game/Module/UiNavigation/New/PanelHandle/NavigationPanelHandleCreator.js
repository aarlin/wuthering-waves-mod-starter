"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationPanelHandleCreator = void 0);
class NavigationPanelHandleCreator {
	static RegisterSpecialPanelHandle(a, e) {
		NavigationPanelHandleCreator.awo.set(a, e);
	}
	static GetPanelHandle(a) {
		let e = NavigationPanelHandleCreator.awo.get(a),
			t = a;
		return (
			e ||
				((e = NavigationPanelHandleCreator.awo.get("Default")),
				(t = "Default")),
			new e(t)
		);
	}
}
(exports.NavigationPanelHandleCreator = NavigationPanelHandleCreator).awo =
	new Map();
