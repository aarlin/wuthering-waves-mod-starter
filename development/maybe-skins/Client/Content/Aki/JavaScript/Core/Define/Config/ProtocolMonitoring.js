"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProtocolMonitoring = void 0);
class ProtocolMonitoring {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ProtocolId() {
		return this.protocolid();
	}
	get ActionId() {
		return this.actionid();
	}
	__init(t, o) {
		return (this.z7 = t), (this.J7 = o), this;
	}
	static getRootAsProtocolMonitoring(t, o) {
		return (o || new ProtocolMonitoring()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	protocolid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ProtocolMonitoring = ProtocolMonitoring;
//# sourceMappingURL=ProtocolMonitoring.js.map
