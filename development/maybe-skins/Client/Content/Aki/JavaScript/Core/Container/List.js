"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LinkedNode = void 0);
class LinkedNode {
	constructor(t) {
		(this.Element = void 0), (this.Next = void 0), (this.Element = t);
	}
}
exports.LinkedNode = LinkedNode;
class LinkedList {
	constructor(t) {
		(this.t7 = void 0),
			(this.i7 = void 0),
			(this.s7 = 0),
			(this.t7 = new LinkedNode(t)),
			(this.i7 = this.t7),
			(this.s7 = 1);
	}
	get Count() {
		return this.s7 - 1;
	}
	get TailNode() {
		return this.i7;
	}
	AddTail(t) {
		t = new LinkedNode(t);
		return (this.i7.Next = t), (this.i7 = t), this.s7++, t;
	}
	RemoveNodesBeforeThis(s, e) {
		if (s !== this.t7)
			if (this.i7 === s)
				(this.t7.Next = void 0), (this.i7 = this.t7), (this.s7 = 1);
			else {
				let t = this.t7.Next,
					i = 1;
				for (; t !== s && void 0 !== t; ) (t = t.Next), i++;
				void 0 !== t &&
					(e
						? ((this.t7.Next = s.Next), (this.s7 -= i))
						: ((this.t7.Next = s), (this.s7 -= i - 1)));
			}
	}
	RemoveNode(i) {
		if (i !== this.t7) {
			let t = this.t7;
			for (; t.Next !== i && t !== this.i7; ) t = t.Next;
			t.Next === i &&
				((t.Next = i.Next), i === this.i7 && (this.i7 = t), --this.s7);
		}
	}
	GetHeadNextNode() {
		return this.t7.Next;
	}
	RemoveAllNodeWithoutHead() {
		(this.t7.Next = void 0), (this.i7 = this.t7), (this.s7 = 1);
	}
}
exports.default = LinkedList;
//# sourceMappingURL=List.js.map
