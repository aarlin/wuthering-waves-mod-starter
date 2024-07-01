"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerEntity = void 0);
const Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Entity_1 = require("../../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
	CharacterGasDebugComponent_1 = require("../Character/Common/Component/Abilities/CharacterGasDebugComponent"),
	PlayerAttributeComponent_1 = require("./Component/PlayerAttributeComponent"),
	PlayerBuffComponent_1 = require("./Component/PlayerBuffComponent"),
	PlayerTagComponent_1 = require("./Component/PlayerTagComponent");
class PlayerEntity extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.PlayerId = 0);
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsPlayerAlwaysTickConfig;
	}
	OnCreate(e) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Formation", 20, "PlayerEntity OnCreate", [
					"PlayerId",
					e?.PlayerId,
				]),
			!(
				!this.AddComponent(
					PlayerAttributeComponent_1.PlayerAttributeComponent,
					void 0,
					e,
				) ||
				!this.AddComponent(
					PlayerTagComponent_1.PlayerTagComponent,
					void 0,
					e,
				) ||
				!this.AddComponent(
					PlayerBuffComponent_1.PlayerBuffComponent,
					void 0,
					e,
				) ||
				(Info_1.Info.IsBuildDevelopmentOrDebug &&
					!this.AddComponent(
						CharacterGasDebugComponent_1.CharacterGasDebugComponent,
					)) ||
				(this.RegisterToGameBudgetController(void 0), 0)
			)
		);
	}
	OnClear() {
		return !0;
	}
	Respawn() {
		return this.RegisterToGameBudgetController(void 0), super.Respawn();
	}
}
exports.PlayerEntity = PlayerEntity;
