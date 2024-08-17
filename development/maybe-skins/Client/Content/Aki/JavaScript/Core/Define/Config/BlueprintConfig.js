"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlueprintConfig = void 0);
class BlueprintConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BlueprintType() {
		return this.blueprinttype();
	}
	get EntityType() {
		return this.entitytype();
	}
	get EntityLogic() {
		return this.entitylogic();
	}
	get ModelId() {
		return this.modelid();
	}
	get HalfHeight() {
		return this.halfheight();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBlueprintConfig(t, i) {
		return (i || new BlueprintConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	blueprinttype(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	entitytype(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	entitylogic(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	modelid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	halfheight() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BlueprintConfig = BlueprintConfig;
//# sourceMappingURL=BlueprintConfig.js.map
