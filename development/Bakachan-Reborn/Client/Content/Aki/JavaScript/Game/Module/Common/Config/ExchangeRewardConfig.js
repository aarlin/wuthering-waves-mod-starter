"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangeRewardConfig = void 0);
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById"),
	ExchangeRewardById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
	ExchangeSharedById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeSharedById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardConfig extends ConfigBase_1.ConfigBase {
	GetExchangeRewardConfig(e) {
		if (e) return ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
	}
	GetExchangeShareConfig(e) {
		if (e) return ExchangeSharedById_1.configExchangeSharedById.GetConfig(e);
	}
	GetExchangeRewardPreviewRewardList(e) {
		if (!e) return [];
		var r = [];
		if ((e = this.GetExchangeRewardConfig(e))) {
			var a,
				n,
				t = e.PreviewReward,
				g = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
			let d;
			if (t.has(g)) d = t.get(g).MapIntInt;
			else
				for (let e = g - 1; 0 <= e; e--)
					if (t.has(e)) {
						d = t.get(e).MapIntInt;
						break;
					}
			if (!d) {
				var o = e.RewardId;
				let r = 0;
				if (o.has(g)) r = o.get(g);
				else
					for (let e = g - 1; 0 <= e; e--)
						if (o.has(e)) {
							r = o.get(e);
							break;
						}
				0 < r &&
					(e = DropPackageById_1.configDropPackageById.GetConfig(r)) &&
					(d = e.DropPreview);
			}
			for ([a, n] of d) {
				var i = [{ IncId: 0, ItemId: a }, n];
				r.push(i);
			}
		}
		return r;
	}
	GetExchangeRewardMaxCount(e) {
		return this.GetExchangeRewardConfig(e).MaxCount;
	}
	GetShareMaxCount(e) {
		return this.GetExchangeShareConfig(e).MaxCount;
	}
	GetShareCost(e) {
		return this.GetExchangeShareConfig(e).Cost;
	}
	GetExchangeCost(e) {
		return this.GetExchangeRewardConfig(e)?.Cost;
	}
	GetExchangeShareId(e) {
		return this.GetExchangeRewardConfig(e)?.SharedId;
	}
}
exports.ExchangeRewardConfig = ExchangeRewardConfig;
