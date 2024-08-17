"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ParallelSelectNode = void 0);
const LogicNodeBase_1 = require("./LogicNodeBase");
class ParallelSelectNode extends LogicNodeBase_1.LogicNodeBase {
	constructor(e) {
		super(e), (this.NodeType = "ParallelSelect");
	}
}
exports.ParallelSelectNode = ParallelSelectNode;
