"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ObjectPool = void 0);
class ObjectPool {
	constructor() {
		this.oY = [];
	}
	Spawn(t) {
		return this.oY.pop();
	}
	DeSpawn(t) {
		this.oY.push(t);
	}
	IsEmpty() {
		return 0 === this.oY.length;
	}
}
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=ObjectPool.js.map
