"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletEffectInfo = void 0);
const EffectSystem_1 = require("../../../Effect/EffectSystem"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
class BulletEffectInfo {
	constructor() {
		(this.EffectData = void 0),
			(this.Effect = 0),
			(this.EffectExtremity = 0),
			(this.EffectBlock = 0),
			(this.HandOver = !1),
			(this.IsFinishAuto = !1),
			(this.EffectOriginSize = -0),
			(this.IsEffectDestroy = !1);
	}
	Clear() {
		BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(this),
			EffectSystem_1.EffectSystem.IsValid(this.EffectExtremity) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.EffectExtremity,
					"[BulletEffectInfo.Clear]",
					!0,
				),
			EffectSystem_1.EffectSystem.IsValid(this.EffectBlock) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.EffectBlock,
					"[BulletEffectInfo.Clear]",
					!0,
				),
			(this.EffectData = void 0),
			(this.Effect = 0),
			(this.EffectExtremity = 0),
			(this.EffectBlock = 0),
			(this.HandOver = !1),
			(this.IsFinishAuto = !1),
			(this.EffectOriginSize = 0),
			(this.IsEffectDestroy = !1);
	}
}
exports.BulletEffectInfo = BulletEffectInfo;
