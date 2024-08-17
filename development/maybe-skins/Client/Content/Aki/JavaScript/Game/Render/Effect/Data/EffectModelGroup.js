"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelGroup extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.Scale = void 0),
			(this.EffectData = void 0);
	}
}
exports.default = EffectModelGroup;
