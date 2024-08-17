"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayTagUtils = void 0);
const UE = require("ue"),
	GameplayTagDefine_1 = require("../../Game/Define/GameplayTagDefine"),
	Log_1 = require("../Common/Log");
class GameplayTagUtils {
	static GetTagIdByName(a) {
		var e = GameplayTagDefine_1.TagIdMap.get(a);
		if (e) return e;
		GameplayTagUtils.bJ.has(a) ||
			(GameplayTagUtils.bJ.add(a),
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Game",
					37,
					"TagName对应的TagId不存在，请检查GameplayTag设置",
					["TagName", a],
				));
	}
	static GetNameByTagId(a) {
		return GameplayTagUtils.GetGameplayTagById(a)?.TagName;
	}
	static GetGameplayTagByName(a) {
		a = GameplayTagUtils.GetTagIdByName(a);
		return GameplayTagUtils.GetGameplayTagById(a);
	}
	static GetGameplayTagById(a) {
		let e = this.qJ.get(a);
		if (
			(e ||
				((e = UE.GASBPLibrary.GetGameplayTagFromTagHash(a)), this.qJ.set(a, e)),
			e)
		)
			return e;
		GameplayTagUtils.GJ.has(a) ||
			(GameplayTagUtils.GJ.add(a),
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Game",
					37,
					"TagId对应的GameplayTag不存在，请检查GameplayTag设置",
					["TagId", a],
				));
	}
	static CheckGameplayTagIdUniqueness() {
		var a,
			e,
			t = new Map();
		for ([a, e] of Object.entries(GameplayTagDefine_1.TagIdMap))
			t.has(e) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					37,
					"导出GameplayTagId存在冲突，请重新命名tagName",
					["tagName1", t.get(e)],
					["tagName2", a],
					["hashId", e],
				),
				t.set(e, a);
	}
	static GetParentTag(a) {
		return GameplayTagDefine_1.ParentTagIdMap.get(a);
	}
	static IsChildTag(a, e) {
		return (
			a === e ||
			((a = this.GetNameByTagId(a)),
			(e = this.GetNameByTagId(e)),
			!(!a || !e) && a.startsWith(e))
		);
	}
	static Contains(a, e) {
		if (a) for (const t of a) if (GameplayTagUtils.IsChildTag(e, t)) return !0;
		return !1;
	}
	static ContainsExact(a, e) {
		if (a) for (const t of a) if (t === e) return !0;
		return !1;
	}
	static HasAll(a, e) {
		if (e) for (const t of e) if (!this.Contains(a, t)) return !1;
		return !0;
	}
	static HasAny(a, e) {
		if (e) for (const t of e) if (this.Contains(a, t)) return !0;
		return !1;
	}
	static ConvertFromUeContainer(e) {
		if (!e) return [];
		var t = [],
			i = e.GameplayTags.Num();
		for (let a = 0; a < i; a++) t.push(e.GameplayTags.Get(a).TagId);
		return t;
	}
}
((exports.GameplayTagUtils = GameplayTagUtils).bJ = new Set()),
	(GameplayTagUtils.GJ = new Set()),
	(GameplayTagUtils.qJ = new Map());
//# sourceMappingURL=GameplayTagUtils.js.map
