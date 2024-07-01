"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialSaveData =
		exports.TutorialItemData =
		exports.TutorialUtils =
		exports.ETutorialType =
			void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
var ETutorialType;
!(function (t) {
	(t[(t.All = 0)] = "All"),
		(t[(t.QteReaction = 1)] = "QteReaction"),
		(t[(t.Enemy = 2)] = "Enemy"),
		(t[(t.System = 3)] = "System"),
		(t[(t.Adventure = 4)] = "Adventure");
})((ETutorialType = exports.ETutorialType || (exports.ETutorialType = {})));
class TutorialUtils {
	static AddSearchHighlight(t) {
		return `<color=${CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor").toLowerCase()}>${t}</color>`;
	}
	static get MaxLatestTutorial() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"MaxLatestTutorial",
		);
	}
	static GetTutorialTypeIconPath(t) {
		if (this.qDo.has(t))
			return (
				(t = TutorialUtils.qDo.get(t)),
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)
			);
	}
	static GetTutorialTypeTxt(t) {
		if (this.GDo.has(t)) return TutorialUtils.GDo.get(t);
	}
}
((exports.TutorialUtils = TutorialUtils).FixedDropDropShowPlanId = 2),
	(TutorialUtils.qDo = new Map([
		[ETutorialType.All, "SP_TutorialIconAll"],
		[ETutorialType.QteReaction, "SP_TutorialIconQteReaction"],
		[ETutorialType.Enemy, "SP_TutorialIconEnemy"],
		[ETutorialType.System, "SP_TutorialIconSystem"],
		[ETutorialType.Adventure, "SP_TutorialIconAdventure"],
	])),
	(TutorialUtils.GDo = new Map([
		[ETutorialType.All, "GuideTutorialType_0"],
		[ETutorialType.QteReaction, "GuideTutorialType_1"],
		[ETutorialType.Enemy, "GuideTutorialType_2"],
		[ETutorialType.System, "GuideTutorialType_3"],
		[ETutorialType.Adventure, "GuideTutorialType_4"],
	]));
class TutorialItemData {
	constructor() {
		(this.IsTypeTitle = !1),
			(this.TextId = void 0),
			(this.Text = void 0),
			(this.SavedData = void 0),
			(this.Selected = !1),
			(this.OwnerType = void 0);
	}
}
exports.TutorialItemData = TutorialItemData;
class TutorialSaveData {
	constructor() {
		(this.TimeStamp = 0), (this.TutorialId = 0), (this.HasRedDot = !1);
	}
	get TutorialData() {
		return ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
			this.TutorialId,
		);
	}
	GetTutorialTitle() {
		return (
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				this.TutorialData.GroupName,
			) ?? ""
		);
	}
}
exports.TutorialSaveData = TutorialSaveData;
