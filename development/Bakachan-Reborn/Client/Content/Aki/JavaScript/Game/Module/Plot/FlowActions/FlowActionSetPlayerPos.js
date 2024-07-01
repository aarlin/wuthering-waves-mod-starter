"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetPlayerPos = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSetPlayerPos extends FlowActionServerAction_1.FlowActionServerAction {
	constructor() {
		super(...arguments),
			(this.uht = () => {
				ModelManager_1.ModelManager.PlotModel.SetTemplatePlayerTransform({
					X: Global_1.Global.BaseCharacter.CharacterActorComponent
						?.ActorLocationProxy.X,
					Y: Global_1.Global.BaseCharacter.CharacterActorComponent
						?.ActorLocationProxy.Y,
					Z: Global_1.Global.BaseCharacter.CharacterActorComponent
						?.ActorLocationProxy.Z,
					A: Global_1.Global.BaseCharacter.CharacterActorComponent
						?.ActorRotationProxy.Yaw,
				}),
					this.FinishExecute(!0);
			});
	}
	OnExecute() {
		this.RequestServerAction(),
			EventSystem_1.EventSystem.Once(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			);
	}
	OnBackgroundExecute() {
		ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()
			? this.FinishExecute(!0)
			: this.OnExecute();
	}
}
exports.FlowActionSetPlayerPos = FlowActionSetPlayerPos;
