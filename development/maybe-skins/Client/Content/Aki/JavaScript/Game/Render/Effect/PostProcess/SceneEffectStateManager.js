"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
class SceneEffectStateManager {
	static GetPostProcessVolume() {
		return (
			void 0 === this.PostProcessVolume &&
				(this.PostProcessVolume = ActorSystem_1.ActorSystem.Get(
					UE.SceneEffectStatePostVolume_C.StaticClass(),
					void 0,
				)),
			this.PostProcessVolume
		);
	}
	static SetSceneEffectState(e, t) {
		switch (e) {
			case 0:
				SceneEffectStateManager.SetAirWall(t);
				break;
			case 1:
				SceneEffectStateManager.SetToxicFog(t);
		}
	}
	static SetAirWall(e) {
		SceneEffectStateManager.GetPostProcessVolume()?.IsValid() &&
			SceneEffectStateManager.GetPostProcessVolume().SetAirWall(e);
	}
	static SetToxicFog(e) {
		SceneEffectStateManager.GetPostProcessVolume()?.IsValid() &&
			SceneEffectStateManager.GetPostProcessVolume().SetToxicFog(e);
	}
}
(SceneEffectStateManager.PostProcessVolume = void 0),
	(exports.default = SceneEffectStateManager);
