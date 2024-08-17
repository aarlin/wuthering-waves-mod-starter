"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DoublyLinkedNode = void 0);
class DoublyLinkedNode {
	constructor(t) {
		(this.Element = void 0),
			(this.Pre = void 0),
			(this.Next = void 0),
			(this.Element = t);
	}
}
exports.DoublyLinkedNode = DoublyLinkedNode;
class DoublyLinkedList {
	constructor(t) {
		(this.t7 = void 0),
			(this.s7 = 0),
			(this.t7 = new DoublyLinkedNode(t)),
			(this.t7.Next = this.t7),
			(this.t7.Pre = this.t7),
			(this.s7 = 1);
	}
	static From(t) {
		var i = t["length"],
			s = new DoublyLinkedList(t.shift());
		return (
			(s.s7 = i),
			t.reduce((t, i) => {
				if (t) return (t.Next = new DoublyLinkedNode(i)), (t.Next.Pre = t).Next;
			}, s.t7),
			s
		);
	}
	get CountWithHead() {
		return this.s7 - 1;
	}
	Find(t) {
		let i = 0,
			s = this.t7;
		if (s) {
			for (i = 0; i < this.s7 && !t.call(this, s); i++) s = s.Next;
			return i !== this.s7 ? s : void 0;
		}
	}
	Insert(t, i) {
		var s,
			t = new DoublyLinkedNode(t),
			e = this.Find((t) => t === i);
		return (
			e &&
				((s = e.Next),
				((e.Next = t).Pre = e),
				(t.Next = s) && (s.Pre = t),
				this.s7++),
			t
		);
	}
	Remove(i) {
		var t = this.Find((t) => t === i);
		t &&
			(this.t7 === t && (this.t7 = t.Next),
			t.Pre && (t.Pre.Next = t.Next),
			t.Next && (t.Next.Pre = t.Pre),
			this.s7--);
	}
	RemoveThis(t) {
		this.t7 !== t &&
			(t.Pre && (t.Pre.Next = t.Next),
			t.Next && (t.Next.Pre = t.Pre),
			this.s7--);
	}
	AddTail(t) {
		var t = new DoublyLinkedNode(t),
			i = this.t7?.Pre,
			s = i?.Next;
		return (
			i && (i.Next = t), (t.Pre = i), (t.Next = s) && (s.Pre = t), this.s7++, t
		);
	}
	GetHeadNode() {
		return this.t7;
	}
	RemoveAllNodeWithoutHead() {
		this.t7 &&
			((this.t7.Next = this.t7), (this.t7.Pre = this.t7), (this.s7 = 1));
	}
}
exports.default = DoublyLinkedList;
//# sourceMappingURL=DoublyList.js.map
