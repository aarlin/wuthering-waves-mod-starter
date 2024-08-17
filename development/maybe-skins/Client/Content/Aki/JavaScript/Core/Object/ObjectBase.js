"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ObjectBase = void 0);
const ObjectSystem_1 = require("./ObjectSystem");
class ObjectBase {
	constructor(e, t) {
		(this.Id = e), (this.Index = t);
	}
	get Valid() {
		return ObjectSystem_1.ObjectSystem.IsValid(this);
	}
}
exports.ObjectBase = ObjectBase;
//# sourceMappingURL=ObjectBase.js.map
