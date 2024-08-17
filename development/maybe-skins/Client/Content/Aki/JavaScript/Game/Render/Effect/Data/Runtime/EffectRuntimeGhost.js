"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectRuntimeDataBase_1 = require("./EffectRuntimeDataBase");
class EffectRuntimeGhost extends EffectRuntimeDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.OverrideSpawnRate = !1),
			(this.SpawnRate = -0),
			(this.OverrideGhostLifeTime = !1),
			(this.GhostLifeTime = -0);
	}
}
exports.default = EffectRuntimeGhost;
