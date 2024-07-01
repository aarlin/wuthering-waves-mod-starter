"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaConfig = void 0);
const AreaAtmosphereInfoById_1 = require("../../../Core/Define/ConfigQuery/AreaAtmosphereInfoById"),
	AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId"),
	AreaByCountryAndLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByCountryAndLevel"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class AreaConfig extends ConfigBase_1.ConfigBase {
	GetAreaLocalName(e) {
		let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
		return r || "";
	}
	GetParentAreaId(e) {
		return void 0 !==
			(e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e)) && 0 < e.length
			? e[0].Father
			: 0;
	}
	GetAreaInfo(e) {
		if (
			void 0 !== (e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e)) &&
			0 < e.length
		)
			return e[0];
	}
	GetAreaAtmosphereInfo(e) {
		return AreaAtmosphereInfoById_1.configAreaAtmosphereInfoById.GetConfig(e);
	}
	GetAreaConfigByCountryAndLevel(e, r) {
		return AreaByCountryAndLevel_1.configAreaByCountryAndLevel.GetConfigList(
			e,
			r,
		);
	}
	GetLevelOneAreaId(e) {
		var r = this.GetAreaInfo(e);
		if (!r || r.Level < 2) return 0;
		let n = 0;
		switch (r.Level) {
			case 2:
				n = e;
				break;
			case 3:
				var t = r.Father,
					o = this.GetAreaInfo(t);
				o && (n = 2 === o.Level ? t : 0);
		}
		return n;
	}
}
exports.AreaConfig = AreaConfig;
