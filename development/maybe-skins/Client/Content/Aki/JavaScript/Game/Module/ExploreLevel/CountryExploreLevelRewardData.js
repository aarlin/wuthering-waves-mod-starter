"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CountryExploreLevelRewardData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CountryExploreLevelRewardData {
	constructor() {
		(this.rTn = ""),
			(this.nTn = ""),
			(this.sTn = ""),
			(this.i3i = 0),
			(this.aTn = 0),
			(this.hTn = 0),
			(this.lTn = ""),
			(this.Z4t = 0),
			(this._Tn = !1),
			(this.O3e = 0),
			(this.uTn = "");
	}
	Initialize(e) {
		(this.rTn = e.ScoreName),
			(this.nTn = e.Reward),
			(this.sTn = e.ScoreTexturePath),
			(this.i3i = e.ShowItem),
			(this.aTn = e.NeedScore),
			(this.hTn = e.Drop),
			(this.lTn = e.Pic),
			(this.Z4t = e.ExploreLevel),
			(this._Tn = e.Show),
			(this.O3e = e.Help),
			(e = e.Country),
			(e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e)),
			(this.uTn = e.Title);
	}
	GetScoreNameId() {
		return this.rTn;
	}
	GetRewardNameId() {
		return this.nTn;
	}
	GetScoreTexturePath() {
		return this.sTn;
	}
	GetPreviewItemConfigId() {
		return this.i3i;
	}
	GetMaxExploreScore() {
		return this.aTn;
	}
	GetCountryNameId() {
		return this.uTn;
	}
	GetDropItemNumMap() {
		return ConfigManager_1.ConfigManager.ExploreLevelConfig.GetDropShowInfo(
			this.hTn,
		);
	}
	GetExploreLevel() {
		return this.Z4t;
	}
	GetUnlockSpritePath() {
		return this.lTn;
	}
	IsShowUnlockSprite() {
		return this._Tn;
	}
	GetHelpId() {
		return this.O3e;
	}
}
exports.CountryExploreLevelRewardData = CountryExploreLevelRewardData;
