"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGamePlayConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	GamePlayScanByUid_1 = require("../../../Core/Define/ConfigQuery/GamePlayScanByUid"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelGamePlayConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.eIe = void 0),
			(this.ScanMaxDistance = 0),
			(this.ScanShowInteractionEffectMaxDistance = 0),
			(this.ScanDetectConcealedDistance = 0),
			(this.InteractInputCacheTime = 0),
			(this.GenExtraGuideEffectMaxDist = 0),
			(this.GenExtraGuideEffectMinDist = 0),
			(this.ExtraGuideEffectRaiseDist = 0);
	}
	OnInit() {
		return (
			(this.eIe = new Map()),
			(this.ScanMaxDistance =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"scan_max_distance",
				) ?? 0),
			(this.ScanShowInteractionEffectMaxDistance =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"scan_interaction_effect_max_distance",
				) ?? 0),
			(this.ScanDetectConcealedDistance =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"scan_detect_concealed_distance",
				) ?? 0),
			(this.InteractInputCacheTime =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"interact_input_cache_time",
				) ?? 0),
			(this.GenExtraGuideEffectMaxDist =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MaxNavigateToGuideEffectDist",
				) ?? 0),
			(this.GenExtraGuideEffectMinDist =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MinNavigateToGuideEffectDist",
				) ?? 0),
			(this.ExtraGuideEffectRaiseDist =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"GuideEffectRaiseDist",
				) ?? 0),
			!0
		);
	}
	OnClear() {
		return !(this.eIe = void 0);
	}
	GetScanInfoById(e) {
		var a = this.eIe?.get(e);
		return (
			a ||
				((a = GamePlayScanByUid_1.configGamePlayScanByUid.GetConfig(e)) &&
					this.eIe.set(e, a)),
			a
		);
	}
}
exports.LevelGamePlayConfig = LevelGamePlayConfig;
