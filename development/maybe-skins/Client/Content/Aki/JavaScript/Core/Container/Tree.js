"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Tree = void 0);
const Log_1 = require("../Common/Log");
class Tree {
	constructor(t, e = void 0) {
		(this.Element = t),
			(this.Parent = void 0),
			(this.Q7 = void 0),
			(this.Parent = e);
	}
	get ChildMap() {
		return this.Q7 || (this.Q7 = new Map()), this.Q7;
	}
	AddChild(t) {
		var e = t.Element;
		this.ChildMap.has(e)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("RedDot", 17, "重复添加子节点！", ["element", e])
			: (t.Parent = this).ChildMap.set(e, t);
	}
	AddChildElement(t) {
		var e;
		this.ChildMap.has(t)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("RedDot", 17, "重复添加子节点！", ["element", t])
			: ((e = new Tree(t, this)).Parent = this).ChildMap.set(t, e);
	}
	AddParent(t) {
		void 0 !== this.Parent
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("RedDot", 17, "该节点已存在父节点！", [
					"element",
					this.Element,
				])
			: (this.Parent = t).ChildMap.set(this.Element, this);
	}
	AddParentElement(t) {
		void 0 !== this.Parent
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("RedDot", 17, "该节点已存在父节点！", [
					"element",
					this.Element,
				])
			: ((this.Parent = new Tree(t)),
				this.Parent.ChildMap.set(this.Element, this));
	}
	GetRoot() {
		return this.Parent ? this.Parent.GetRoot() : this;
	}
	IsRoot() {
		return void 0 === this.Parent;
	}
	IsLeaf() {
		return this.ChildMap.size <= 0;
	}
}
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map
