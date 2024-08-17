"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceConfig = void 0);
const CountryAll_1 = require("../../../../Core/Define/ConfigQuery/CountryAll"),
	CountryById_1 = require("../../../../Core/Define/ConfigQuery/CountryById"),
	InfluenceAll_1 = require("../../../../Core/Define/ConfigQuery/InfluenceAll"),
	InfluenceById_1 = require("../../../../Core/Define/ConfigQuery/InfluenceById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
	InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceConfig extends ConfigBase_1.ConfigBase {
	GetCountriesByIds(e) {
		if (0 < e.length) {
			var n = new Array();
			for (let i = 0, r = e.length; i < r; ++i) {
				var t = CountryById_1.configCountryById.GetConfig(e[i]);
				n.push(t);
			}
			return n.sort((e, n) => e.Id - n.Id), n;
		}
		return [];
	}
	GetCountryList() {
		return CountryAll_1.configCountryAll
			.GetConfigList()
			.filter(
				(e) =>
					e.Id !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID &&
					e.Id !== InfluenceReputationDefine_1.NO_COUNTRY_ID,
			);
	}
	GetCountryConfig(e) {
		if ((e = CountryById_1.configCountryById.GetConfig(e))) return e;
	}
	GetCountryInfluence(e) {
		var n = new Array();
		if (0 === e) {
			var t = this.GetInfluenceConfig(0);
			n.push(t);
		} else {
			var i = this.GetCountryConfig(e);
			if (0 === i.Influences.length) {
				var r = InfluenceAll_1.configInfluenceAll.GetConfigList();
				for (let e = 0; e < r.length; e++) n.push(r[e]);
			} else
				for (let e = 0; e < i.Influences.length; e++) {
					var u = this.GetInfluenceConfig(i.Influences[e]);
					n.push(u);
				}
		}
		return n;
	}
	GetCountryTitle(e) {
		return (e = this.GetCountryConfig(e))
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)
			: "";
	}
	GetInfluenceConfig(e) {
		if ((e = InfluenceById_1.configInfluenceById.GetConfig(e))) return e;
	}
	GetInfluenceTitle(e) {
		return (e = this.GetInfluenceConfig(e))
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)
			: "";
	}
	GetInfluenceIfShowInDailyTask(e) {
		return !!(e = this.GetInfluenceConfig(e)) && 1 === e.DailyTaskShow;
	}
	GetCountryIfShowInDailyTask(e) {
		return !!(e = this.GetCountryConfig(e)) && 1 === e.DailyTaskShow;
	}
}
exports.InfluenceConfig = InfluenceConfig;
