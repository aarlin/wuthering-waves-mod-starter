"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PackageCapacity = void 0);
class PackageCapacity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get PackageId() {
		return this.packageid();
	}
	get PackageCapacity() {
		return this.packagecapacity();
	}
	__init(t, a) {
		return (this.z7 = t), (this.J7 = a), this;
	}
	static getRootAsPackageCapacity(t, a) {
		return (a || new PackageCapacity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	packageid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	packagecapacity() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PackageCapacity = PackageCapacity;
//# sourceMappingURL=PackageCapacity.js.map
