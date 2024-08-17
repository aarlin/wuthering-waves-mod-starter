"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TemplateConfig = void 0);
class TemplateConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BlueprintType() {
		return this.blueprinttype();
	}
	get Name() {
		return this.name();
	}
	get ComponentsData() {
		return this.componentsdata();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTemplateConfig(t, e) {
		return (e || new TemplateConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	blueprinttype(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	componentsdata(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.TemplateConfig = TemplateConfig;
//# sourceMappingURL=TemplateConfig.js.map
