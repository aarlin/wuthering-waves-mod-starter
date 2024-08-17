"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CountryExploreScoreData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class CountryExploreScoreData {
	constructor() {
		(this.CountryId = 0),
			(this.AreaId = 0),
			(this.Progress = 0),
			(this.LastProgress = 0),
			(this.Score = 0),
			(this.a5t = !1),
			(this.h5t = void 0);
	}
	Initialize(e, r, t, s, a) {
		(this.CountryId = e),
			(this.AreaId = r),
			(this.Progress = t),
			(this.LastProgress = s),
			(this.Score = a),
			(this.a5t = !1),
			(this.h5t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r));
	}
	SetReceived(e) {
		this.a5t = e;
	}
	GetIsReceived() {
		return this.a5t;
	}
	GetAreaNameTextId() {
		return this.h5t.Title;
	}
	GetAreaConfig() {
		return this.h5t;
	}
	CanReceive() {
		return this.GetAreaProgress() >= this.Progress && !this.a5t;
	}
	GetAreaProgress() {
		return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
			this.AreaId,
		).GetProgress();
	}
}
exports.CountryExploreScoreData = CountryExploreScoreData;
