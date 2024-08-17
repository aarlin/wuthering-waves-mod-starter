"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelGpuParticle extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.Scale = void 0),
			(this.Data = void 0),
			(this.TimeScaler = void 0),
			(this.Loop = !1),
			(this.EnablePingPong = !1),
			(this.PingPongTime = 1),
			(this.ReversePlay = !1);
	}
}
exports.default = EffectModelGpuParticle;
