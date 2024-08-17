"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharSceneInteraction = void 0);
const RenderConfig_1 = require("../../../Config/RenderConfig"),
	SceneCharacterInteraction_1 = require("../../../Scene/Interaction/SceneCharacterInteraction"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharSceneInteraction extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.OwnerCharacter = void 0),
			(this.CharacterInteraction = void 0);
	}
	Start() {
		super.Start(),
			(this.OwnerCharacter = this.RenderComponent.GetOwner()),
			(this.CharacterInteraction = void 0),
			this.PossCharacter(this.RenderComponent.InteractionConfig),
			this.OnInitSuccess();
	}
	Update() {
		this.CharacterInteraction &&
			this.CharacterInteraction.Update(this.GetDeltaTime());
	}
	Destroy() {
		this.UnpossCharacter(), super.Destroy();
	}
	GetIsPossed() {
		return void 0 !== this.CharacterInteraction;
	}
	PossCharacter(e, t = 1) {
		e &&
			this.OwnerCharacter &&
			((this.CharacterInteraction = new SceneCharacterInteraction_1.default()),
			this.CharacterInteraction.Start(this.OwnerCharacter, e, t));
	}
	UnpossCharacter() {
		this.CharacterInteraction &&
			(this.CharacterInteraction.Destroy(),
			(this.CharacterInteraction = void 0));
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdSceneInteraction;
	}
	GetStatName() {
		return "CharSceneInteraction";
	}
	GetInWater(e) {
		return (
			!!this.CharacterInteraction &&
			this.CharacterInteraction.GetInWater() &&
			this.CharacterInteraction.GetWaterDepth() > e
		);
	}
}
exports.CharSceneInteraction = CharSceneInteraction;
