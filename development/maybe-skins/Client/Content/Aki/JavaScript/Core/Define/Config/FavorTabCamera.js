"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FavorTabCamera = void 0);
class FavorTabCamera {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CameraSettingsName() {
		return this.camerasettingsname();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFavorTabCamera(t, r) {
		return (r || new FavorTabCamera()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	camerasettingsname(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.FavorTabCamera = FavorTabCamera;
//# sourceMappingURL=FavorTabCamera.js.map
