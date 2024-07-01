"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScoreModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ScoreModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.D2e = 0), (this.apo = 0);
	}
	GetCurrentScore() {
		return this.D2e;
	}
	GetTargetScore() {
		return this.apo;
	}
	SetCurrentScore(e) {
		this.D2e = e;
	}
	SetTargetScore(e) {
		this.apo = e;
	}
	SetScore(e, o) {
		(this.D2e = e), (this.apo = o);
	}
	Reset() {
		(this.D2e = void 0), (this.apo = void 0);
	}
}
exports.ScoreModel = ScoreModel;
