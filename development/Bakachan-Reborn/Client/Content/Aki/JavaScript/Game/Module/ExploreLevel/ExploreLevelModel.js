"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreLevelModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CountryExploreLevelData_1 = require("./CountryExploreLevelData");
class ExploreLevelModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.u5t = new Map()),
			(this.ExploreScoreItemTexturePath = "");
	}
	OnInit() {
		for (const e of ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList())
			this.AddCountryExploreLevelData(e.Id);
		var e =
				ConfigManager_1.ConfigManager.ExploreLevelConfig.GetExploreScoreConfigList(),
			r = ConfigManager_1.ConfigManager.AreaConfig;
		for (const i of e) {
			var o,
				t,
				a = i.Area,
				n = r.GetAreaInfo(a).CountryId,
				l = this.GetCountryExploreLevelData(n);
			let e = 0;
			for ([o, t] of i.ExploreScore) l.AddExploreScoreData(a, o, e, t), (e = o);
		}
		return (
			(this.ExploreScoreItemTexturePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"T_IconA_currency_5_UI",
				)),
			!0
		);
	}
	OnClear() {
		return this.u5t.clear(), !0;
	}
	AddCountryExploreLevelData(e) {
		var r =
				ConfigManager_1.ConfigManager.ExploreLevelConfig.GetExploreRewardListByCountry(
					e,
				),
			o = new CountryExploreLevelData_1.CountryExploreLevelData();
		return o.Initialize(e, r), this.u5t.set(e, o), o;
	}
	GetCountryExploreLevelData(e) {
		return this.u5t.get(e);
	}
	GetCurrentCountryExploreLevelData() {
		var e = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId();
		return this.GetCountryExploreLevelData(e);
	}
	SetCountryExploreLevel(e, r) {
		(e = this.GetCountryExploreLevelData(e)) && e.SetExploreLevel(r);
	}
	SetCountryExploreScore(e, r) {
		(e = this.GetCountryExploreLevelData(e)) && e.SetExploreScore(r);
	}
	SetCountryExploreScoreReceived(e, r, o) {
		var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
		t &&
			((t = t.CountryId), (t = this.GetCountryExploreLevelData(t))) &&
			t.SetExploreScoreDataReceived(e, r, o);
	}
}
exports.ExploreLevelModel = ExploreLevelModel;
