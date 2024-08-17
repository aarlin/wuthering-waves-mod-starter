"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraManager = void 0);
const UiCamera_1 = require("./UiCamera");
class UiCameraManager {
	static Initialize() {}
	static Clear() {
		this.JRo?.Destroy(), (this.JRo = void 0);
	}
	static Get() {
		return (
			this.JRo ||
				((this.JRo = new UiCamera_1.UiCamera()), this.JRo.Initialize()),
			this.JRo
		);
	}
	static Destroy(e = 0, a = 0, i = 0) {
		this.JRo?.Destroy(e, a, i), (this.JRo = void 0);
	}
}
(exports.UiCameraManager = UiCameraManager).JRo = void 0;
