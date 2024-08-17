"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	SceneInteractionManager_1 = require("./SceneInteractionManager"),
	SceneObjectWaterEffect_1 = require("./SceneObjectWaterEffect");
class SceneInteractionDebugTool extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.Config = void 0),
			(this.TargetActor = void 0),
			(this.Interaction = void 0);
	}
	AttachInteraction() {
		this.TargetActor ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Render", 26, "SceneInteractionDebugTool缺少目标对象")),
			this.Interaction &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Render", 26, "SceneInteractionDebugTool勿重复添加"),
			(this.Interaction =
				new SceneObjectWaterEffect_1.SceneObjectWaterEffect()),
			this.Interaction.Start(
				this.Config,
				this.TargetActor.K2_GetRootComponent(),
			),
			SceneInteractionManager_1.SceneInteractionManager.Get().RegisterWaterEffectObject(
				this.Interaction,
			);
	}
	RemoveInteraction() {
		this.Interaction &&
			(SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterWaterEffectObject(
				this.Interaction,
			),
			(this.Interaction = void 0));
	}
}
exports.default = SceneInteractionDebugTool;
