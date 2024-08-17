"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectRuntimeGhostEffectContext = void 0);
const SkeletalMeshEffectContext_1 = require("./SkeletalMeshEffectContext");
class EffectRuntimeGhostEffectContext extends SkeletalMeshEffectContext_1.SkeletalMeshEffectContext {
	constructor() {
		super(...arguments),
			(this.SpawnRate = -0),
			(this.UseSpawnRate = !1),
			(this.SpawnInterval = 0),
			(this.GhostLifeTime = -0);
	}
}
exports.EffectRuntimeGhostEffectContext = EffectRuntimeGhostEffectContext;
