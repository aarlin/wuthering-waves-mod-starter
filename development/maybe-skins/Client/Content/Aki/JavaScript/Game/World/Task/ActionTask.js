"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActionTask = void 0);
const TaskBase_1 = require("./TaskBase");
class ActionTask extends TaskBase_1.TaskBase {
	constructor(s, e, t, a) {
		super(s, t, a), (this.QMr = e);
	}
	async OnRun() {
		return !!this.QMr();
	}
}
exports.ActionTask = ActionTask;
