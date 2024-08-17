"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityDoubleRewardData = void 0);
const DoubleRewardActivityById_1 = require("../../../../../Core/Define/ConfigQuery/DoubleRewardActivityById"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	AdventureDefine_1 = require("../../../AdventureGuide/AdventureDefine"),
	ActivityData_1 = require("../../ActivityData");
class ActivityDoubleRewardData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.MOe = 0), (this.SOe = void 0);
	}
	PhraseEx(e) {
		this.MOe = e.g0s.KCs;
	}
	GetExDataRedPointShowState() {
		var e = this.WLn();
		return (
			1 !==
			ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
				this.Id,
				0,
				e,
				0,
				0,
			)
		);
	}
	WLn() {
		var e = new Date();
		return (
			e.getHours() < TimeUtil_1.TimeUtil.CrossDayHour &&
				e.setDate(e.getDate() - 1),
			e.setHours(TimeUtil_1.TimeUtil.CrossDayHour, 0, 0, 0),
			e.getTime()
		);
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	ReadDailyRedDot() {
		var e = this.WLn();
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.Id,
			e,
			0,
			0,
			1,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
	}
	get LeftUpCount() {
		return this.yOe - this.MOe;
	}
	get yOe() {
		return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(
			this.Id,
		).Count;
	}
	get SubType() {
		return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(
			this.Id,
		).Type;
	}
	get Prefab() {
		return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(
			this.Id,
		).Prefab;
	}
	get AdventureGuideUpList() {
		if (!this.SOe)
			switch (this.SubType) {
				case 1:
				default:
					this.SOe = [AdventureDefine_1.EDungeonType.Simulation];
					break;
				case 2:
					this.SOe = [
						AdventureDefine_1.EDungeonType.Mat,
						AdventureDefine_1.EDungeonType.Simulation,
					];
					break;
				case 3:
					this.SOe = [AdventureDefine_1.EDungeonType.NoSoundArea];
			}
		return this.SOe;
	}
	GetDungeonUpList(e) {
		switch (this.SubType) {
			case 1:
				return [1];
			case 2:
				return [1, 2];
			case 3:
				return e ? [] : [3];
		}
		return [];
	}
	GetNumTxtAndParam() {
		return [
			0 < this.LeftUpCount ? "Reward_doubling_time" : "Reward_doubling_end",
			this.LeftUpCount,
			this.yOe,
		];
	}
	GetFullTipNumTxtAndParam() {
		return [
			0 < this.LeftUpCount
				? "Reward_doubling_tips"
				: "Reward_doubling_end_tips",
			this.LeftUpCount,
			this.yOe,
		];
	}
	GetFullTip() {
		var e = this.GetFullTipNumTxtAndParam();
		return StringUtils_1.StringUtils.FormatStaticBuilder(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e[0]),
			e[1],
			e[2],
		);
	}
	JumpToDungeon() {
		ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
			"NewSoundAreaView",
			this.AdventureGuideUpList[0],
		);
	}
}
exports.ActivityDoubleRewardData = ActivityDoubleRewardData;
