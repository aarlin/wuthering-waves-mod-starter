"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	FilterTypeFunctionLibrary_1 = require("./FilterTypeFunctionLibrary"),
	CalabashCollectFilter_1 = require("./Rule/CalabashCollectFilter"),
	ComposeFilter_1 = require("./Rule/ComposeFilter"),
	CookFilter_1 = require("./Rule/CookFilter"),
	DungeonDetectFilter_1 = require("./Rule/DungeonDetectFilter"),
	InventoryFilter_1 = require("./Rule/InventoryFilter"),
	ItemFilter_1 = require("./Rule/ItemFilter"),
	MonsterDetectFilter_1 = require("./Rule/MonsterDetectFilter"),
	PhantomFetterFilter_1 = require("./Rule/PhantomFetterFilter"),
	PhantomFilter_1 = require("./Rule/PhantomFilter"),
	RoleFilter_1 = require("./Rule/RoleFilter"),
	SilentAreaDetectFilter_1 = require("./Rule/SilentAreaDetectFilter"),
	VisionDestroyFilter_1 = require("./Rule/VisionDestroyFilter");
class FilterLogic {
	constructor() {
		(this.NTt = {
			1: new RoleFilter_1.RoleFilter(),
			2: new PhantomFilter_1.PhantomFilter(),
			3: new PhantomFetterFilter_1.PhantomFetterFilter(),
			4: new CalabashCollectFilter_1.CalabashCollectFilter(),
			5: new ItemFilter_1.ItemFilter(),
			6: new MonsterDetectFilter_1.MonsterDetectFilter(),
			7: new SilentAreaDetectFilter_1.SilentAreaDetectFilter(),
			8: new DungeonDetectFilter_1.DungeonDetectFilter(),
			9: new CookFilter_1.CookFilter(),
			10: new ComposeFilter_1.ComposeFilter(),
			11: new ComposeFilter_1.ComposeFilter(),
			12: new InventoryFilter_1.InventoryFilter(),
			13: new VisionDestroyFilter_1.VisionDestroyFilter(),
		}),
			(this.OTt = {
				1: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetElementFilterData,
				2: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetWeaponFilterData,
				3: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomFilterData,
				4: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomFilterData,
				7: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetDetectFilterData,
				8: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetDetectFilterData,
				9: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetDetectFilterData,
				10: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetCookMenuFilterData,
				11: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetCookTypeFilterData,
				12: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetComposeFilterData,
				13: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetComposeFilterData,
				14: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomRarityFilterData,
				15: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomFettersEquipFilterData,
				16: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomFettersHasFilterData,
				17: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetDetectFilterData,
				18: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomRarityZeroFilterData,
				19: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomRarityOneFilterData,
				20: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomRarityTwoFilterData,
				21: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetPhantomRarityThreeFilterData,
				22: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetItemQualityFilterData,
				23: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetVisionDestroyCostData,
				24: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetVisionDestroyQualityData,
				25: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetVisionDestroyFetterGroupData,
				26: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetVisionDestroyAttribute,
				27: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
					.GetRoleTagFilterList,
			});
	}
	kTt(e) {
		return this.NTt[e].DefaultFilterList();
	}
	FTt(e, t) {
		var r;
		if ((r = ((r = this.NTt[e]).InitFilterMap(), r.GetFilterFunction(t))))
			return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Filter",
				11,
				"传入的筛选项id查找不到对应方法",
				["数据类型", e],
				["筛选表格类型", t],
			);
	}
	VTt(e, t, r, i) {
		var n = this.FTt(t, r);
		if (!n) return e;
		var o = [];
		for (const t of e) {
			var F = n(t, i);
			if (F instanceof Array) {
				for (const e of F)
					if (i.has(e)) {
						o.push(t);
						break;
					}
			} else i.has(F) && o.push(t);
		}
		return o;
	}
	HTt(e, t, r, i) {
		var n = this.FTt(t, r);
		if (!n) return { FindList: [], UnFindList: e };
		var o = [],
			F = [];
		for (const t of e) {
			var l = n(t, i);
			if (l instanceof Array) {
				let e = !1;
				for (const r of l)
					if (i.has(r)) {
						o.push(t), (e = !0);
						break;
					}
				e || F.push(t);
			} else (i.has(l) ? o : F).push(t);
		}
		return { FindList: o, UnFindList: F };
	}
	GetFilterList(e, t, r, i) {
		var n = [];
		let o = [];
		var F,
			l,
			a = this.kTt(t);
		0 === a.length && (o = e);
		for (const t of a) for (const r of e) (t(r) ? n : o).push(r);
		if (r) {
			let e = o;
			var y,
				u,
				c,
				s = [];
			let r = !1;
			for ([y, u] of i)
				u.size <= 0 ||
					((r = !0),
					(e = (c = this.HTt(e, t, y, u)).UnFindList),
					s.push(...c.FindList));
			return r ? s.concat(n) : e.concat(n);
		}
		let p = o;
		for ([F, l] of i) l.size <= 0 || (p = this.VTt(p, t, F, l));
		return p.concat(n);
	}
	GetFilterItemDataList(e, t) {
		var r = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(e),
			i = ((e = r.FilterType), this.OTt[e]);
		if (i) {
			var n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t);
			t = i(r.IdList);
			for (const e of t)
				e.SetIsShowIcon(n.IsShowIcon), (e.NeedChangeColor = r.NeedChangeColor);
			return t;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Filter",
				11,
				"传入的筛选表格类型未进行枚举定义以及方法实现",
				["EFilterType", e],
			);
	}
}
exports.FilterLogic = FilterLogic;
