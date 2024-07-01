"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityCacheData =
		exports.ActivityExData =
		exports.ActivityBaseData =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ACTIVITYFORCECLOSETIME = -1;
class ActivityBaseData {
	constructor() {
		(this.T2e = 0),
			(this.c3e = void 0),
			(this.m3e = -0),
			(this.d3e = -0),
			(this.U2e = -0),
			(this.A2e = -0),
			(this.C3e = !1),
			(this.g3e = !1),
			(this.f3e = 0),
			(this.p3e = new Array()),
			(this.v3e = 0),
			(this.M3e = ""),
			(this.LocalConfig = void 0);
	}
	get Id() {
		return this.T2e;
	}
	GetCacheKey() {
		return this.M3e;
	}
	get Type() {
		return this.c3e;
	}
	get Sort() {
		return this.f3e;
	}
	get BeginShowTime() {
		return this.m3e;
	}
	get EndShowTime() {
		return this.d3e;
	}
	get BeginOpenTime() {
		return this.U2e;
	}
	get EndOpenTime() {
		return this.A2e;
	}
	get RedPointShowState() {
		return !(
			!this.CheckIfInShowTime() ||
			!(this.g3e || (this.C3e && this.GetExDataRedPointShowState()))
		);
	}
	get ConditionGroupId() {
		return this.v3e;
	}
	CheckIfInShowTime() {
		return this.CheckIfInTimeInterval(this.m3e, this.d3e);
	}
	CheckIfClose() {
		return (-1 === this.U2e && -1 === this.A2e) || !this.CheckIfInOpenTime();
	}
	CheckIfInOpenTime() {
		return this.CheckIfInTimeInterval(this.U2e, this.A2e);
	}
	CheckIfInTimeInterval(e, t) {
		return (
			(-1 !== e || -1 !== t) &&
			((0 === e && 0 === t) ||
				(e <= (e = TimeUtil_1.TimeUtil.GetServerTime()) && e <= t))
		);
	}
	GetPreviewReward(e = this.LocalConfig.PreviewDrop) {
		var t =
				ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
					e,
				)?.DropPreview,
			i = [];
		if (t) for (var [r, n] of t) (r = [{ IncId: 0, ItemId: r }, n]), i.push(r);
		else
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Activity", 28, "找不到奖励配置", ["id", e]);
		return i;
	}
	GetTitle() {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			this.LocalConfig.Title,
		);
	}
	GetHelpId() {
		return this.LocalConfig.HelpId;
	}
	IsUnLock() {
		return !!this.C3e;
	}
	GetPreGuideQuestFinishState() {
		var e = this.p3e,
			t = e.length;
		for (let i = 0; i < t; i++)
			if (
				ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[i]) <
				Protocol_1.Aki.Protocol.kMs.Proto_Finish
			)
				return !1;
		return !!this.C3e;
	}
	GetUnFinishPreGuideQuestId() {
		var e = this.p3e,
			t = e.length;
		for (let i = 0; i < t; i++)
			if (
				ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[i]) <
				Protocol_1.Aki.Protocol.kMs.Proto_Finish
			)
				return e[i];
		return 0;
	}
	GetPreShowGuideQuestName() {
		var e = new StringBuilder_1.StringBuilder(),
			t = new Array(),
			i = this.p3e;
		let r = i.length;
		for (let e = 0; e < r; e++)
			ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(i[0]) ||
				t.push(i[e]);
		r = t.length;
		for (let i = 0; i < r; i++) {
			var n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
				ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(t[i]).TidName,
			);
			e.Append(n), i !== r - 1 && e.Append(",");
		}
		return e.ToString();
	}
	GetIfFirstOpen() {
		return this.g3e;
	}
	SetFirstOpenFalse() {
		this.g3e &&
			((this.g3e = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.T2e,
			));
	}
	GetExDataRedPointShowState() {
		return !1;
	}
	ForceClose() {
		(this.U2e = -1),
			(this.A2e = -1),
			(this.m3e = -1),
			(this.d3e = -1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.T2e,
			);
	}
	Phrase(e) {
		(this.T2e = e.Ekn),
			(this.c3e = e.Ikn),
			(this.m3e = Number(MathUtils_1.MathUtils.LongToBigInt(e.l0s))),
			(this.d3e = Number(MathUtils_1.MathUtils.LongToBigInt(e._0s))),
			(this.U2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.a0s))),
			(this.A2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.h0s))),
			(this.C3e = e.m3n),
			(this.g3e = e.c0s),
			(this.LocalConfig =
				ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(
					this.T2e,
				)),
			(this.v3e = this.LocalConfig.PreConditionGroupId),
			(this.f3e = this.LocalConfig.Sort),
			(this.p3e = this.LocalConfig.PreShowGuideQuest),
			ModelManager_1.ModelManager.QuestNewModel.SetActivityQuestData(
				this.T2e,
				this.p3e,
			);
		var t = new StringBuilder_1.StringBuilder();
		t.Append(e.Ekn),
			t.Append("_"),
			t.Append(this.U2e),
			(this.M3e = t.ToString()),
			this.PhraseEx(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Activity",
					38,
					"活动数据刷新",
					["Id", this.T2e],
					["Type", this.c3e],
					["IsUnlock", this.C3e],
					["ShowTime", [this.m3e, this.d3e]],
					["OpenTime", [this.U2e, this.A2e]],
					["HasRedDot", this.RedPointShowState],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.T2e,
			);
	}
	PhraseEx(e) {}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
}
exports.ActivityBaseData = ActivityBaseData;
class ActivityExData {
	constructor(e) {
		(this.ActivityId = 0), (this.ActivityId = e);
	}
	GetActivityId() {
		return this.ActivityId;
	}
	RefreshActivityRedPoint() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.ActivityId,
		);
	}
}
exports.ActivityExData = ActivityExData;
class ActivityCacheData {
	constructor() {
		(this.Key = 0), (this.Value = 0);
	}
}
exports.ActivityCacheData = ActivityCacheData;
