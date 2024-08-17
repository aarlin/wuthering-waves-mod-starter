"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayAbilityVisionBase = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class GameplayAbilityVisionBase {
	constructor(t) {
		this.VisionComponent = t;
	}
	static Create(t) {
		return (t = new this(t)).OnCreate(), t;
	}
	Destroy() {
		this.OnDestroy();
	}
	Tick(t) {
		this.OnTick(t);
	}
	ActivateAbility() {
		return this.OnActivateAbility();
	}
	EndAbility() {
		return this.OnEndAbility();
	}
	OnVisionChanged() {}
	OnCreate() {}
	OnDestroy() {}
	OnTick(t) {}
	OnActivateAbility() {
		return !0;
	}
	OnEndAbility() {
		return !0;
	}
	get Entity() {
		return this.VisionComponent.Entity;
	}
	get EntityHandle() {
		return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
			this.VisionComponent.Entity.Id,
		);
	}
	get CreatureDataComponent() {
		return this.Entity.GetComponent(0);
	}
	get ActorComponent() {
		return this.Entity.GetComponent(3);
	}
	get AttributeComponent() {
		return this.Entity.GetComponent(156);
	}
	get GameplayTagComponent() {
		return this.Entity.GetComponent(185);
	}
	get SkillComponent() {
		return this.Entity.GetComponent(33);
	}
	get BuffComponent() {
		return this.Entity.GetComponent(157);
	}
	get MoveComponent() {
		return this.Entity.GetComponent(161);
	}
	get AudioComponent() {
		return this.Entity.GetComponent(42);
	}
	get TeamComponent() {
		return this.Entity.GetComponent(81);
	}
}
exports.GameplayAbilityVisionBase = GameplayAbilityVisionBase;
