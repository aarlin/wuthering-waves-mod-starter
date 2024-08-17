"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Skybox = void 0);
class Skybox {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get StaticSkybox() {
		return this.staticskybox();
	}
	get DynamicSkybox() {
		return this.dynamicskybox();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSkybox(t, s) {
		return (s || new Skybox()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	staticskybox(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	dynamicskybox(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Skybox = Skybox;
//# sourceMappingURL=Skybox.js.map
