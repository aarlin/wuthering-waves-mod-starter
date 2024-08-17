"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class InfluenceModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.UnlockCountry = new Set()),
			(this.UnlockInfluence = new Set()),
			(this.CurrentSelectAreaId = 0),
			(this.CurrentSelectInfluenceId = 0);
	}
	AddUnlockCountry(e) {
		for (let n = 0; n < e.length; n++)
			this.UnlockCountry.has(e[n]) || this.UnlockCountry.add(e[n]);
	}
	AddUnlockInfluence(e) {
		for (let n = 0; n < e.length; n++)
			this.UnlockInfluence.has(e[n]) || this.UnlockInfluence.add(e[n]);
	}
}
exports.InfluenceModel = InfluenceModel;
