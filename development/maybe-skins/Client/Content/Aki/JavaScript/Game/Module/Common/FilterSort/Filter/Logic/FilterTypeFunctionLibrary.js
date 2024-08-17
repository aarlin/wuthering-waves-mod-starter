"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterTypeFunctionLibrary = void 0);
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	FilterData_1 = require("../Model/FilterData");
class FilterTypeFunctionLibrary {
	static jTt(t, e) {
		var a = new Array();
		for (const i of t) {
			var r,
				n =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
						i,
					);
			n &&
				0 !== n.length &&
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
					n[0].Rarity,
				).Rare === e &&
				((r =
					ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(
						i,
					)),
				(n = n[0].SkillId),
				(n =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
						n,
					).BattleViewIcon),
				(r = new FilterData_1.FilterItemData(i, r, n)),
				a.push(r));
		}
		return a;
	}
}
(exports.FilterTypeFunctionLibrary = FilterTypeFunctionLibrary),
	((_a = FilterTypeFunctionLibrary).GetElementFilterData = (t) => {
		var e = new Array();
		for (const r of ConfigManager_1.ConfigManager.ElementInfoConfig.GetConfigList(
			t,
		)) {
			var a =
				ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
					r.Name,
				);
			e.push(new FilterData_1.FilterItemData(r.Id, a, r.Icon4));
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetWeaponFilterData = (t) => {
		var e,
			a = new Array();
		for (const r of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
			t.includes(r.Value) &&
				((e = ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfComment(
					r.Comment,
				)),
				a.push(new FilterData_1.FilterItemData(r.Value, e, r.Icon)));
		return a;
	}),
	(FilterTypeFunctionLibrary.GetPhantomFilterData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a =
					ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(
						n,
					),
				r =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
						n,
					)[0].SkillId;
			(r =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					r,
				).BattleViewIcon),
				(a = new FilterData_1.FilterItemData(n, a, r));
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetDetectFilterData = (t) => {
		var e = new Array();
		for (const r of t) {
			var a =
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetLocalFilterTextById(
					r,
				);
			a = new FilterData_1.FilterItemData(r, a, void 0);
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetCookMenuFilterData = (t) => {
		var e = new Array();
		for (const r of t) {
			var a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe");
			a = new FilterData_1.FilterItemData(r, a, void 0);
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetCookTypeFilterData = (t) => {
		var e = new Array();
		for (const r of t) {
			var a = 1 === r ? "Attack" : 2 === r ? "Defense" : "Explore";
			(a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(a)),
				(a = new FilterData_1.FilterItemData(r, a, void 0));
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetComposeFilterData = (t) => {
		var e = new Array();
		for (const r of t) {
			var a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula");
			a = new FilterData_1.FilterItemData(r, a, void 0);
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetPhantomRarityFilterData = (t) => {
		var e = new Array();
		for (const r of t) {
			var a = "CalabashCatchGain_" + r.toString();
			(a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(a)),
				(a = new FilterData_1.FilterItemData(r, a, void 0));
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = 1 === n ? "PhantomFettersEquip" : "PhantomFettersUnEquip",
				r =
					((a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(a)),
					1 === n
						? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterEquipTexture()
						: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNoEquipTexture());
			a = new FilterData_1.FilterItemData(n, a, r);
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetPhantomFettersHasFilterData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = 1 === n ? "PhantomFettersHas" : "PhantomFettersUnHas",
				r =
					((a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(a)),
					1 === n
						? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterOwnTexture()
						: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNotOwnTexture());
			a = new FilterData_1.FilterItemData(n, a, r);
			e.push(a);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetPhantomRarityZeroFilterData = (t) =>
		_a.jTt(t, 0)),
	(FilterTypeFunctionLibrary.GetPhantomRarityOneFilterData = (t) =>
		_a.jTt(t, 1)),
	(FilterTypeFunctionLibrary.GetPhantomRarityTwoFilterData = (t) =>
		_a.jTt(t, 2)),
	(FilterTypeFunctionLibrary.GetPhantomRarityThreeFilterData = (t) =>
		_a.jTt(t, 3)),
	(FilterTypeFunctionLibrary.GetItemQualityFilterData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(n),
				r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Name);
			e.push(new FilterData_1.FilterItemData(n, r, a?.FilterIconPath));
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetVisionDestroyCostData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
						n,
					).Cost,
				r = StringUtils_1.StringUtils.Format("Cost{0}", a.toString());
			(r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(r)),
				(a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDestroyCostSpriteByCost(
						a,
					)),
				(r = new FilterData_1.FilterItemData(n, r, a));
			e.push(r);
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetVisionDestroyQualityData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(n),
				r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Name);
			e.push(new FilterData_1.FilterItemData(n, r, a?.FilterIconPath));
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetVisionDestroyFetterGroupData = (t) => {
		var e = new Array();
		for (const n of t) {
			var a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
						n,
					),
				r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					a.FetterGroupName,
				);
			e.push(new FilterData_1.FilterItemData(n, r, a.FetterElementPath));
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetVisionDestroyAttribute = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
					n,
					4,
				),
				r =
					((a =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
							a,
						)),
					ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(n, 4));
			e.push(new FilterData_1.FilterItemData(n, r, a));
		}
		return e;
	}),
	(FilterTypeFunctionLibrary.GetRoleTagFilterList = (t) => {
		var e = new Array();
		for (const n of t) {
			var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(n),
				r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.TagName);
			e.push(new FilterData_1.FilterItemData(n, r, a.TagIcon));
		}
		return e;
	});
