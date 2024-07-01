"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffItemConfig = void 0);
const BuffById_1 = require("../../../Core/Define/ConfigQuery/BuffById"),
	BuffItemById_1 = require("../../../Core/Define/ConfigQuery/BuffItemById"),
	BuffItemByPublicCdGroup_1 = require("../../../Core/Define/ConfigQuery/BuffItemByPublicCdGroup"),
	BuffItemCdGroupById_1 = require("../../../Core/Define/ConfigQuery/BuffItemCdGroupById"),
	DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class BuffItemConfig extends ConfigBase_1.ConfigBase {
	GetDamageConfig(f, e) {
		return DamageById_1.configDamageById.GetConfig(e);
	}
	GetBuffItemBuffConfig(f) {
		if ((f = this.GetBuffItemConfig(f)) && f.Buffs?.length) {
			var e = new Array();
			for (const u of f.Buffs) {
				var t = BuffById_1.configBuffById.GetConfig(u);
				t && e.push(t);
			}
			return e;
		}
	}
	GetBuffConfig(f, e) {
		return BuffById_1.configBuffById.GetConfig(e);
	}
	GetBuffConfigs(f, e) {
		if (e && e?.length) {
			var t = new Array();
			for (const f of e) {
				var u = BuffById_1.configBuffById.GetConfig(f);
				u && t.push(u);
			}
			return t;
		}
	}
	IsResurrectionItem(f) {
		if ((f = this.GetBuffItemBuffConfig(f)))
			for (const e of f) if (101 === e.ExtraEffectID) return !0;
		return !1;
	}
	IsTeamBuffItem(f) {
		var e = ItemInfoById_1.configItemInfoById.GetConfig(f);
		return (
			!!e && !!e.IsBuffItem && !!(e = this.GetBuffItemConfig(f)) && e.Share
		);
	}
	GetBuffItemTotalCdTime(f) {
		if (!(f = this.GetBuffItemConfig(f))) return 0;
		var e = f.PublicCdGroup;
		return 0 < e && (e = this.GetBuffItemCdGroup(e)) ? e.CoolDownTime : f.Cd;
	}
	GetBuffItemConfig(f) {
		return BuffItemById_1.configBuffItemById.GetConfig(f);
	}
	GetBuffItemConfigByPublicCdGroup(f) {
		return BuffItemByPublicCdGroup_1.configBuffItemByPublicCdGroup.GetConfigList(
			f,
		);
	}
	GetBuffItemCdGroup(f) {
		return BuffItemCdGroupById_1.configBuffItemCdGroupById.GetConfig(f);
	}
	IsBuffItem(f) {
		var e = ItemInfoById_1.configItemInfoById.GetConfig(f);
		return !!e && !!e.IsBuffItem && void 0 !== this.GetBuffItemConfig(f);
	}
}
exports.BuffItemConfig = BuffItemConfig;
