"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldEntity = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Entity_1 = require("../../../Core/Entity/Entity"),
	PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
	WorldEntityHelper_1 = require("./WorldEntityHelper");
class WorldEntity extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.UsePool = !0);
	}
	static StaticGameBudgetConfig(t) {
		let o = -1,
			e = -1;
		var r;
		switch (
			(t instanceof WorldEntity &&
				((o = (r = t.GetComponent(0)).GetEntityType()),
				(e = r.GetSummonerId())),
			o)
		) {
			case Protocol_1.Aki.Protocol.wks.Proto_Player:
			case Protocol_1.Aki.Protocol.wks.Proto_Vision:
				return GameBudgetAllocatorConfigCreator_1
					.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
			case Protocol_1.Aki.Protocol.wks.Proto_Monster:
				return t instanceof WorldEntity && 0 < e
					? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
							.TsPlayerAlwaysTickConfig
					: GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
							.TsCharacterEntityGroupConfig;
			case Protocol_1.Aki.Protocol.wks.Proto_Npc:
			case Protocol_1.Aki.Protocol.wks.Proto_Animal:
				return GameBudgetAllocatorConfigCreator_1
					.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
			default:
				return GameBudgetAllocatorConfigCreator_1
					.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig;
		}
	}
	OnRespawn(t) {
		return !0;
	}
	OnCreate(t) {
		for (const e of t.Components) {
			var o = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(e);
			this.AddComponent(e, o);
		}
		return !0;
	}
	OnInitData(t) {
		for (const o of this.Components) if (!o.InitData(t)) return !1;
		var o;
		return (
			t.RegisterToGameBudgetController &&
				this.RegisterToGameBudgetController(void 0, this),
			PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity &&
				(o = this.GetComponent(0)) &&
				(o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
					o.GetPbDataId(),
				)) &&
				ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
					o.BlueprintType,
				) &&
				((this.TickStatTdType = void 0),
				(this.AfterTickStatTdType = this.TickStatTdType)),
			!0
		);
	}
}
exports.WorldEntity = WorldEntity;
