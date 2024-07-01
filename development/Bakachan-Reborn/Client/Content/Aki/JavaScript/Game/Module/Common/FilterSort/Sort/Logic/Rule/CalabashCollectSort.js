"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashCollectSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonSort_1 = require("./CommonSort");
class CalabashCollectSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.VLt = (e, t, a) => (
				(e = e.DevelopRewardData.MonsterId),
				(e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(e)),
				(t = t.DevelopRewardData.MonsterId),
				e !==
				(t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(t))
					? (e - t) * (a ? -1 : 1)
					: 0
			)),
			(this.jLt = (e, t, a) =>
				(e = e.DevelopRewardData.SortId) !== (t = t.DevelopRewardData.SortId)
					? (e - t) * (a ? -1 : 1)
					: 0),
			(this.WLt = (e, t, a) =>
				(e = e.DevelopRewardData.MonsterId) !==
				(t = t.DevelopRewardData.MonsterId)
					? (e - t) * (a ? -1 : 1)
					: 0),
			(this.KLt = (e, t, a) => (
				(e = e.DevelopRewardData.MonsterId),
				(t = t.DevelopRewardData.MonsterId),
				(e =
					ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(
						e,
					)) !==
				(t =
					ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(
						t,
					))
					? (e - t) * (a ? 1 : -1)
					: 0
			)),
			(this.QLt = (e, t, a) => (
				(e = e.DevelopRewardData.MonsterId),
				(t = t.DevelopRewardData.MonsterId),
				(e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
						e,
					)?.length ?? 0) !==
				(t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
						t,
					)?.length ?? 0)
					? (e - t) * (a ? 1 : -1)
					: 0
			));
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.VLt),
			this.SortMap.set(2, this.jLt),
			this.SortMap.set(3, this.WLt),
			this.SortMap.set(4, this.KLt),
			this.SortMap.set(5, this.QLt);
	}
}
exports.CalabashCollectSort = CalabashCollectSort;
