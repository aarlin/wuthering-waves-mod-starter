"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrainDec = void 0);
class TrainDec {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get RoleLevel() {
		return this.rolelevel();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTrainDec(t, e) {
		return (e || new TrainDec()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	rolelevel() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrainDec = TrainDec;
//# sourceMappingURL=TrainDec.js.map
