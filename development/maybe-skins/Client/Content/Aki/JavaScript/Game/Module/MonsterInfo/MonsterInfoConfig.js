"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterInfoConfig = void 0);
const MonsterBodyTypeConfigById_1 = require("../../../Core/Define/ConfigQuery/MonsterBodyTypeConfigById"),
	MonsterInfoById_1 = require("../../../Core/Define/ConfigQuery/MonsterInfoById"),
	MonsterPerchById_1 = require("../../../Core/Define/ConfigQuery/MonsterPerchById"),
	MonsterRarityById_1 = require("../../../Core/Define/ConfigQuery/MonsterRarityById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MonsterInfoConfig extends ConfigBase_1.ConfigBase {
	GetMonsterInfoConfig(e) {
		if ((e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e))) return e;
	}
	GetMonsterRarityConfig(e) {
		if ((e = MonsterRarityById_1.configMonsterRarityById.GetConfig(e)))
			return e;
	}
	GetMonsterIcon(e) {
		return this.GetMonsterInfoConfig(e).Icon;
	}
	GetMonsterBigIcon(e) {
		return this.GetMonsterInfoConfig(e).BigIcon;
	}
	GetMonsterName(e) {
		return (
			(e = this.GetMonsterInfoConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)
		);
	}
	GetMonsterTachine(e) {
		return this.GetMonsterInfoConfig(e).Tachine;
	}
	GetMonsterRarity(e) {
		return this.GetMonsterInfoConfig(e).RarityId;
	}
	GetMonsterPerch(e) {
		var n = [],
			o = this.GetMonsterInfoConfig(e).PerchId,
			t = o.length;
		for (let e = 0; e < t; e++) {
			var r = o[e];
			(r = MonsterPerchById_1.configMonsterPerchById.GetConfig(r)),
				(r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.PerchDes));
			n.push(r);
		}
		return n;
	}
	GetMonsterBodyTypeConfig(e) {
		if (
			(e =
				MonsterBodyTypeConfigById_1.configMonsterBodyTypeConfigById.GetConfig(
					e,
				))
		)
			return e;
	}
}
exports.MonsterInfoConfig = MonsterInfoConfig;
