"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
class BuffModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.FormationBuffMaps = new Map()),
			(this.HandlePrefix = 0),
			(this.LastHandle = 1),
			(this.TKo = new Map());
	}
	OnClear() {
		return this.TKo.clear(), this.FormationBuffMaps.clear(), !0;
	}
	Add(e, s) {
		this.TKo.set(e, s);
	}
	Get(e) {
		return this.TKo.get(e);
	}
}
exports.BuffModel = BuffModel;
