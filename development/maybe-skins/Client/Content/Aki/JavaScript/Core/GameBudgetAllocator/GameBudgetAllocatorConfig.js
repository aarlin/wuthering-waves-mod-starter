"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameBudgetAllocatorConfig =
		exports.TsGameBudgetAllocatorTickIntervalDetailConfig =
		exports.TsGameBudgetGroupConfigCache =
		exports.TsGameBudgetGroupConfig =
			void 0);
class TsGameBudgetGroupConfig {
	constructor(t, s) {
		(this.GroupName = t), (this.SignificanceGroup = s);
	}
}
exports.TsGameBudgetGroupConfig = TsGameBudgetGroupConfig;
class TsGameBudgetGroupConfigCache {
	constructor(t) {
		(this.ueGroupConfig = t),
			(this.GroupName = t.GroupName),
			(this.SignificanceGroup = t.SignificanceGroup),
			(this.DefaultDisableActorTickDistance = t.DisableActorTickDistance),
			(this.DefaultDisableActorTickStrategy = t.DisableActorTickStrategy);
	}
}
exports.TsGameBudgetGroupConfigCache = TsGameBudgetGroupConfigCache;
class TsGameBudgetAllocatorTickIntervalDetailConfig {
	constructor(t, s, o, i, e) {
		(this.GlobalMode = t),
			(this.ActorMode = s),
			(this.MaxInterval = o),
			(this.TickReductionStartSize = i),
			(this.TickReductionIntervalSize = e);
	}
}
exports.TsGameBudgetAllocatorTickIntervalDetailConfig =
	TsGameBudgetAllocatorTickIntervalDetailConfig;
class GameBudgetAllocatorConfig {
	constructor() {
		(this.Default = void 0),
			(this.Normal_Render = void 0),
			(this.Normal_NotRendered = void 0),
			(this.Normal_Fighting = void 0),
			(this.Fighting_Rendered = void 0),
			(this.Fighting_NotRendered = void 0),
			(this.Fighting_Fighting = void 0),
			(this.Cutscene_Rendered = void 0),
			(this.Cutscene_NotRendered = void 0);
	}
}
exports.GameBudgetAllocatorConfig = GameBudgetAllocatorConfig;
//# sourceMappingURL=GameBudgetAllocatorConfig.js.map
