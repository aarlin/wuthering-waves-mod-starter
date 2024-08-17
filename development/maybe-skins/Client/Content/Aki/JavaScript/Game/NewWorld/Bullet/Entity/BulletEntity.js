"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletEntity = void 0);
const Entity_1 = require("../../../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator"),
	BulletActionLogicComponent_1 = require("../Component/BulletActionLogicComponent"),
	BulletActorComponent_1 = require("../Component/BulletActorComponent"),
	BulletInfo_1 = require("../Model/BulletInfo");
class BulletEntity extends Entity_1.Entity {
	constructor() {
		super(...arguments),
			(this.UsePool = !0),
			(this.LAe = new BulletInfo_1.BulletInfo());
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsAlwaysTickConfig;
	}
	GetBulletInfo() {
		return this.LAe;
	}
	get Data() {
		return this.LAe.BulletDataMain;
	}
	get BulletOwner() {
		return this.LAe.BulletInitParams.Owner;
	}
	get NeedDestroy() {
		return this.LAe.NeedDestroy;
	}
	OnCreate() {
		return (
			!!this.AddComponent(BulletActorComponent_1.BulletActorComponent) &&
			!!this.AddComponent(
				BulletActionLogicComponent_1.BulletActionLogicComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnClear() {
		return this.LAe.Clear(), !0;
	}
	Respawn() {
		return this.RegisterToGameBudgetController(void 0), super.Respawn();
	}
}
exports.BulletEntity = BulletEntity;
