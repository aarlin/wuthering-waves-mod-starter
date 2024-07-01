"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiWanderInfos = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiWanderInfos {
	constructor() {
		(this.AiWander = void 0),
			(this.AiBattleWanderGroups = void 0),
			(this.CurrentBattleWanderIndex = 0),
			(this.wre = void 0),
			(this.Bre = void 0),
			(this.BattleWanderAddTime = 0);
	}
	SetOverrideBattleWanderTime(e, t) {
		(this.wre = e), (this.Bre = t);
	}
	GetCurrentBattleWander() {
		return this.AiBattleWanderGroups[this.CurrentBattleWanderIndex];
	}
	RandomBattleWanderEndTime() {
		var e;
		return this.wre && this.wre <= this.Bre
			? MathUtils_1.MathUtils.GetRandomRange(this.wre, this.Bre)
			: ((e = this.GetCurrentBattleWander().SumWanderTime),
				MathUtils_1.MathUtils.GetRandomRange(e.Min, e.Max));
	}
}
exports.AiWanderInfos = AiWanderInfos;
