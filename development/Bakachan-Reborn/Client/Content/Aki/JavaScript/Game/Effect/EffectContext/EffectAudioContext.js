"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectAudioContext = void 0);
const EffectContext_1 = require("./EffectContext");
class EffectAudioContext extends EffectContext_1.EffectContext {
	constructor() {
		super(...arguments), (this.FromPrimaryRole = !1);
	}
}
exports.EffectAudioContext = EffectAudioContext;
