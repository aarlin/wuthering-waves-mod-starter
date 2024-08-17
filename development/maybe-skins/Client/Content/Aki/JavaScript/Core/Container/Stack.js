"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Stack = void 0);
class Stack {
	constructor() {
		this.K7 = [];
	}
	[Symbol.iterator]() {
		return this.K7[Symbol.iterator]();
	}
	get Size() {
		return this.K7.length;
	}
	get Empty() {
		return 0 === this.Size;
	}
	Clear() {
		this.K7.length = 0;
	}
	Push(t) {
		this.K7.push(t);
	}
	Peek() {
		return 0 < this.Size ? this.K7[this.K7.length - 1] : void 0;
	}
	Pop() {
		return this.K7.pop();
	}
	Delete(t) {
		t = this.K7.indexOf(t);
		return 0 <= t && (this.K7.splice(t, 1), !0);
	}
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map
