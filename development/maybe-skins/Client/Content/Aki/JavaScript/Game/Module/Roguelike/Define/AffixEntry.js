"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AffixEntry = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RoguelikeDefine_1 = require("./RoguelikeDefine");
class AffixEntry {
	constructor(e) {
		(this.Id = e.Ekn ?? void 0),
			(this.IsUnlock = e.m3n ?? void 0),
			(this.ElementDict = new Map());
		for (const r of Object.keys(e.aws ?? {})) {
			var n = e.aws[r] ?? 0;
			n && this.ElementDict.set(Number(r), n);
		}
	}
	GetSortElementInfoArrayByCount(e = !1) {
		var n,
			r,
			o = new Array();
		for ([n, r] of this.ElementDict)
			(e && 9 === n) || o.push(new RoguelikeDefine_1.ElementInfo(n, r));
		return o.sort((e, n) => n.Count - e.Count), o;
	}
	GetAffixDesc() {
		var e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueAffixConfig(
			this.Id,
		);
		return 0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
			? e?.AffixDescSimple ?? ""
			: e?.AffixDesc ?? "";
	}
}
exports.AffixEntry = AffixEntry;
