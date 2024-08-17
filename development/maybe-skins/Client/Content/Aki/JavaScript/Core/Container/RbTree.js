"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RbTree = void 0);
const Json_1 = require("../Common/Json"),
	Log_1 = require("../Common/Log"),
	Queue_1 = require("./Queue");
class RbNode {
	constructor() {
		(this.Parent = void 0),
			(this.Left = void 0),
			(this.Right = void 0),
			(this.Item = void 0),
			(this.IsRed = !1);
	}
	BreakChildLink(i) {
		this.Left === i
			? (this.Left = void 0)
			: this.Right === i
				? (this.Right = void 0)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 6, "待移除的节点并非其子节点");
	}
	Clear() {
		(this.Parent = void 0),
			(this.Left = void 0),
			(this.Right = void 0),
			(this.Item = void 0),
			(this.IsRed = !1);
	}
}
class RbTree {
	constructor(i) {
		(this.E7 = i),
			(this.q7 = new Array()),
			(this.G7 = new Map()),
			(this.t6 = 0),
			(this.gc = void 0),
			(this.N7 = void 0);
	}
	Clear() {
		for (var [, i] of this.G7) i.Clear(), this.q7.push(i);
		this.G7.clear(), (this.t6 = 0), (this.gc = void 0), (this.N7 = void 0);
	}
	get IsEmpty() {
		return !this.gc;
	}
	get Size() {
		return this.t6;
	}
	get ExtremelyLeft() {
		return this.N7?.Item;
	}
	RemoveExtremelyLeft() {
		this.O7(this.N7);
	}
	Insert(t) {
		if (this.G7.has(t))
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 6, "Item已经在RbTree里面了", ["Item", t]);
		else {
			let i = this.q7.pop();
			((i = i || new RbNode()).Item = t), (i.IsRed = !0), this.k7(i);
		}
	}
	Remove(i) {
		var t = this.G7.get(i);
		void 0 === t
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 6, "Item不在RbTree里面", ["Item", i])
			: this.O7(t);
	}
	k7(t) {
		if ((++this.t6, this.G7.set(t.Item, t), this.gc)) {
			let i = this.gc;
			for (;;)
				if (this.E7(t.Item, i.Item) < 0) {
					if (!i.Left) {
						(i.Left = t).Parent = i;
						break;
					}
					i = i.Left;
				} else {
					if (!i.Right) {
						(i.Right = t).Parent = i;
						break;
					}
					i = i.Right;
				}
			this.F7(t), this.V7();
		} else (this.gc = t), (this.gc.IsRed = !1), (this.N7 = t);
	}
	O7(i) {
		--this.t6, this.G7.delete(i.Item);
		let r = i;
		for (; r.Left || r.Right; ) {
			let i = 0,
				t = r.Left;
			if (t) for (i = 1; t.Right; ) i++, (t = t.Right);
			let e = 0,
				s = r.Right;
			if (s) for (e = 1; s.Left; ) ++e, (s = s.Left);
			r =
				i >= e
					? ((r.Item = t.Item), this.G7.set(r.Item, r), t)
					: ((r.Item = s.Item), this.G7.set(r.Item, r), s);
		}
		var t,
			i = r.Parent;
		i
			? (this.N7 === r && (this.N7 = i),
				r.IsRed
					? (i.BreakChildLink(r), r.Clear(), this.q7.push(r))
					: ((t = i.Left === r),
						i.BreakChildLink(r),
						r.Clear(),
						this.q7.push(r),
						this.H7(i, t),
						this.V7()))
			: ((this.gc = void 0), (this.N7 = void 0), r.Clear(), this.q7.push(r));
	}
	F7(i) {
		this.gc.IsRed = !1;
		let t = i;
		for (; t.IsRed && t.Parent; ) {
			var e = t.Parent;
			if (!e.IsRed) {
				if (e.Left?.IsRed && e.Right?.IsRed) {
					(e.Left.IsRed = !1), (e.Right.IsRed = !1), (e.IsRed = !0), (t = e);
					continue;
				}
				break;
			}
			var s = e.Parent;
			s.Left?.IsRed && s.Right?.IsRed
				? ((s.Left.IsRed = !1), (s.Right.IsRed = !1), (s.IsRed = !0), (t = s))
				: t === e.Left
					? s.Left === e
						? ((t.IsRed = !1), this.j7(s), (t = e))
						: ((e.IsRed = !1), this.j7(e), this.W7(s))
					: s.Left === e
						? ((e.IsRed = !1), this.W7(e), this.j7(s))
						: ((t.IsRed = !1), this.W7(s), (t = e));
		}
	}
	H7(i, t) {
		let e = t,
			s = i;
		for (; s; ) {
			if (s.IsRed) {
				e
					? ((s.IsRed = !1),
						(s.Right.IsRed = !0),
						s.Right.Left?.IsRed
							? this.F7(s.Right.Left)
							: s.Right.Right?.IsRed && this.F7(s.Right.Right))
					: ((s.IsRed = !1),
						(s.Left.IsRed = !0),
						s.Left.Left?.IsRed
							? this.F7(s.Left.Left)
							: s.Left.Right?.IsRed && this.F7(s.Left.Right));
				break;
			}
			if (e) {
				if (s.Right.IsRed) {
					s.Right.IsRed = !1;
					var r = s.Right.Left;
					(r.IsRed = !0),
						this.W7(s),
						r.Left?.IsRed
							? this.F7(r.Left)
							: r.Right?.IsRed && this.F7(r.Right);
					break;
				}
				if (s.Right.Right?.IsRed) {
					(s.Right.Right.IsRed = !1), this.W7(s);
					break;
				}
				if (s.Right.Left?.IsRed) {
					(s.Right.Left.IsRed = !1), this.j7(s.Right), this.W7(s);
					break;
				}
				s.Right.IsRed = !0;
			} else {
				if (s.Left.IsRed) {
					s.Left.IsRed = !1;
					r = s.Left.Right;
					(r.IsRed = !0),
						this.j7(s),
						r.Right?.IsRed
							? this.F7(r.Right)
							: r.Left?.IsRed && this.F7(r.Left);
					break;
				}
				if (s.Left.Left?.IsRed) {
					(s.Left.Left.IsRed = !1), this.j7(s);
					break;
				}
				if (s.Left.Right?.IsRed) {
					(s.Left.Right.IsRed = !1), this.W7(s.Left), this.j7(s);
					break;
				}
				s.Left.IsRed = !0;
			}
			if (!s.Parent) break;
			(e = s.Parent.Left === s), (s = s.Parent);
		}
	}
	V7() {
		for (; this.gc.Parent; ) this.gc = this.gc.Parent;
		for (this.gc.IsRed = !1; this.N7.Parent?.Right === this.N7; )
			this.N7 = this.N7.Parent;
		for (; this.N7.Left; ) this.N7 = this.N7.Left;
	}
	j7(i) {
		var t = i.Parent,
			e = i.Left,
			s = e.Right;
		(e.Parent = t),
			((e.Right = i).Parent = e),
			(i.Left = s) && (s.Parent = i),
			t && (t.Left === i ? (t.Left = e) : (t.Right = e));
	}
	W7(i) {
		var t = i.Parent,
			e = i.Right,
			s = e.Left;
		(e.Parent = t),
			((e.Left = i).Parent = e),
			(i.Right = s) && (s.Parent = i),
			t && (t.Left === i ? (t.Left = e) : (t.Right = e));
	}
	ForEach(t) {
		if (this.gc) {
			let i = this.N7;
			for (; i; ) {
				if (!t(i.Item)) return;
				if (i.Right) for (i = i.Right; i.Left; ) i = i.Left;
				else {
					if (!i.Parent) break;
					for (; i.Parent; ) {
						if (i === i.Parent.Left) {
							i = i.Parent;
							break;
						}
						if (((i = i.Parent), this.gc === i)) return;
					}
				}
			}
		}
	}
	CheckRbTree() {
		if (this.gc) {
			if (this.gc.Parent || this.gc.IsRed) return !1;
			let i = this.gc;
			for (; i.Left; ) i = i.Left;
			if (i !== this.N7)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 6, "Extremely Left Error."),
					!1
				);
			var e = new Queue_1.Queue(),
				s = (e.Push(this.gc), new Queue_1.Queue());
			s.Push(1);
			let t = -1;
			for (; !e.Empty; ) {
				var r = e.Pop(),
					h = s.Pop();
				if (!r.Left || !r.Right)
					if (t < 0) t = h;
					else if (t !== h) return !1;
				if (r.Left) {
					if (r.Left.IsRed && r.IsRed) return !1;
					e.Push(r.Left), s.Push(r.Left.IsRed ? h : h + 1);
				}
				if (r.Right) {
					if (r.Right.IsRed && r.IsRed) return !1;
					e.Push(r.Right), s.Push(r.Right.IsRed ? h : h + 1);
				}
			}
		}
		return !0;
	}
	PrintRbTree() {
		if (this.gc) {
			let t = new Queue_1.Queue(),
				e = (t.Push(this.gc), 1),
				s = new Queue_1.Queue();
			for (; 0 < e; ) {
				e = 0;
				let i = "";
				for (; !t.Empty; ) {
					var r = t.Pop();
					r
						? (r.IsRed
								? (i += `		(${Json_1.Json.Encode(r.Item)})`)
								: (i += `		` + Json_1.Json.Encode(r.Item)),
							s.Push(r.Left),
							s.Push(r.Right),
							r.Left && e++,
							r.Right && e++)
						: ((i += "\t\tNA"), s.Push(void 0), s.Push(void 0));
				}
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("Core", 6, i);
				var h = t;
				(t = s), (s = h);
			}
		} else Log_1.Log.CheckDebug() && Log_1.Log.Debug("Core", 6, "EmptyTree");
	}
}
exports.RbTree = RbTree;
//# sourceMappingURL=RbTree.js.map
