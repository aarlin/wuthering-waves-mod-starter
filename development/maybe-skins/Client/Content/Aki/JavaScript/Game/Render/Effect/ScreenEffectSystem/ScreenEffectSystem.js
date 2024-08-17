"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScreenEffectSystem = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class ScreenEffectSystem {
	static GetInstance() {
		return (
			this.Me?.IsValid() ||
				(this.Me = ActorSystem_1.ActorSystem.Get(
					UE.BP_ScreenEffectSystem_C.StaticClass(),
					MathUtils_1.MathUtils.DefaultTransform,
				)),
			this.Me
		);
	}
}
exports.ScreenEffectSystem = ScreenEffectSystem;
