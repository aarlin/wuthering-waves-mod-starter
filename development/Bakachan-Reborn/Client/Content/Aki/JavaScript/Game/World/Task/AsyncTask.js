"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AsyncTask = void 0);
const TaskBase_1 = require("./TaskBase");
class AsyncTask extends TaskBase_1.TaskBase {
	constructor(s, e, a, r) {
		super(s, a, r), (this.QMr = e);
	}
	async OnRun() {
		return this.QMr();
	}
}
exports.AsyncTask = AsyncTask;
