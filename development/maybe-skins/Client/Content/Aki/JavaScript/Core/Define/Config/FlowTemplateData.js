"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowTemplateData = void 0);
class FlowTemplateData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Amount() {
		return this.amount();
	}
	get Enable() {
		return this.enable();
	}
	get Template() {
		return this.template();
	}
	get CameraType() {
		return this.cameratype();
	}
	get ActorDataArray() {
		return this.actordataarray();
	}
	get CameraData() {
		return this.cameradata();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFlowTemplateData(t, r) {
		return (r || new FlowTemplateData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	amount() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	enable() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	template(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	cameratype(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	actordataarray(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	cameradata(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.FlowTemplateData = FlowTemplateData;
//# sourceMappingURL=FlowTemplateData.js.map
