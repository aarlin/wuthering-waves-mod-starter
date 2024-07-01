"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiSceneRoleActorManager = void 0);
const ue_1 = require("ue"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
class UiSceneRoleActorManager {
	static CreateUiSceneRoleActor(e) {
		this.CWe++;
		var t = ActorSystem_1.ActorSystem.Get(
			UE.TsUiSceneRoleActor_C.StaticClass(),
			new ue_1.Transform(),
			void 0,
		);
		return t.Init(this.CWe, e), this.APo.set(this.CWe, t), t;
	}
	static DestroyUiSceneRoleActor(e) {
		var t = this.APo.get(e);
		return !t || (t.Destroy(), this.APo.delete(e));
	}
	static ClearAllUiSceneRoleActor() {
		for (const e of this.APo.values()) e.Destroy();
		this.APo.clear();
	}
}
((exports.UiSceneRoleActorManager = UiSceneRoleActorManager).CWe = 0),
	(UiSceneRoleActorManager.APo = new Map());
