"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WaitEntityTaskModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class WaitEntityTaskModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.QY = void 0);
	}
	OnInit() {
		return (this.QY = new Map()), !0;
	}
	OnClear() {
		return this.QY.clear(), !0;
	}
	AddTask(e, t) {
		this.QY.set(e, t);
	}
	RemoveTask(e) {
		this.QY.set(e, void 0);
	}
	OnAddEntity(e, t) {
		for (let i = 0; i < this.QY.size; i++) {
			var s = this.QY.get(i);
			s && s.OnAddEntity(e, t);
		}
	}
	OnRemoveEntity(e, t) {
		for (let i = 0; i < this.QY.size; i++) {
			var s = this.QY.get(i);
			s && s.OnRemoveEntity(e, t);
		}
	}
}
exports.WaitEntityTaskModel = WaitEntityTaskModel;
