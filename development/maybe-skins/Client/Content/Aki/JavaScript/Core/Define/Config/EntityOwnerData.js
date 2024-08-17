"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityOwnerData = void 0);
class EntityOwnerData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Guid() {
		return this.guid();
	}
	get Owner() {
		return this.owner();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEntityOwnerData(t, i) {
		return (i || new EntityOwnerData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	guid(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	owner(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.EntityOwnerData = EntityOwnerData;
//# sourceMappingURL=EntityOwnerData.js.map
