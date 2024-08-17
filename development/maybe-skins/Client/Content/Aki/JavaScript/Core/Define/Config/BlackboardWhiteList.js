"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackboardWhiteList = void 0);
class BlackboardWhiteList {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Key() {
		return this.key();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBlackboardWhiteList(t, s) {
		return (s || new BlackboardWhiteList()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.BlackboardWhiteList = BlackboardWhiteList;
//# sourceMappingURL=BlackboardWhiteList.js.map
