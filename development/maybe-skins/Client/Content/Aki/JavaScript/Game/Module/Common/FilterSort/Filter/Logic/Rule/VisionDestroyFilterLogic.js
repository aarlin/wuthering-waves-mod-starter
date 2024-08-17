"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDestroyFilterLogic = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	PhantomBattleConfig_1 = require("../../../../../Phantom/PhantomBattle/PhantomBattleConfig"),
	SUBATTRIBUTEID = 23;
class VisionDestroyFilterLogic {
	static ZTt(e, t, a = !1) {
		var o = e.length;
		for (let r = 0; r < o; r++)
			if (e[r].PhantomPropId === t) {
				if (a && e[r].IfPercentage) return e[r].Value;
				if (!a && !e[r].IfPercentage) return e[r].Value;
			}
		return 0;
	}
}
((exports.VisionDestroyFilterLogic =
	VisionDestroyFilterLogic).GetPhantomRarity = (e) =>
	ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
		e.GetConfigId(),
	).PhantomItem.Rarity),
	(VisionDestroyFilterLogic.GetPhantomCost = (e) => (
		(e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
			e.GetUniqueId(),
		)),
		PhantomBattleConfig_1.COSTLIST.indexOf(e.GetCost())
	)),
	(VisionDestroyFilterLogic.GetPhantomQuality = (e) =>
		ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
			e.GetConfigId(),
		).PhantomItem.QualityId),
	(VisionDestroyFilterLogic.GetVisionDestroyFetterGroup = (e) => (
		(e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
			e.GetUniqueId(),
		)),
		e ? e.GetFetterGroupId() : 0
	)),
	(VisionDestroyFilterLogic.GetVisionDestroyAttribute = (e, t) => {
		t = Array.from(t.keys());
		var a,
			o,
			r,
			n = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
				e.GetUniqueId(),
			);
		let i = !1;
		for (const e of t) {
			let t = 0;
			if (
				0 <
				(t =
					e >= 23
						? ((a = n?.GetSubPropArray()),
							(r =
								ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionSubPercentageAttributeSortArray().includes(
									e,
								)),
							(o =
								ModelManager_1.ModelManager.PhantomBattleModel.GetSubAttributeKey(
									e,
								)),
							VisionDestroyFilterLogic.ZTt(a, o, r))
						: ((a = n?.GetMainPropArray()),
							(o =
								ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionMainPercentageAttributeSortArray().includes(
									e,
								)),
							(r =
								ModelManager_1.ModelManager.PhantomBattleModel.GetMainAttributeKey(
									e,
								)),
							VisionDestroyFilterLogic.ZTt(a, r, o)))
			) {
				i = !0;
				break;
			}
		}
		return i ? t : [0];
	});
