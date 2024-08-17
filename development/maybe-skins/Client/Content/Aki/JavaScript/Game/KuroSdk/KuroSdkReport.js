"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SdkReportLevel =
		exports.SdkReportChapter =
		exports.SdkReportDirectBuy =
		exports.SdkReportPay =
		exports.SdkReportRecharge =
		exports.SdkReportStartFlow =
		exports.SdkReportQuestFinish =
		exports.SdkReportBattleTech =
		exports.SdkReportClickEnterGame =
		exports.SdkReportCreateRole =
		exports.SdkReportChangeAccount =
		exports.SdkReportOpenPrivacy =
		exports.SdkReportGameInitFinish =
		exports.KuroSdkReport =
			void 0);
const Protocol_1 = require("../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	HotPatchKuroSdk_1 = require("../../Launcher/HotPatchKuroSdk/HotPatchKuroSdk"),
	SdkReportData_1 = require("../../Launcher/HotPatchKuroSdk/SdkReportData"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	PayShopDefine_1 = require("../Module/PayShop/PayShopDefine"),
	KILLPHANTOMMISSION = 139000025,
	CAPTUREPHANTOMMISSION = 139000026,
	CHAPTERCPRE1 = 139000025,
	CHAPTERCPRE2 = 139000026,
	CHAPTERC11 = 139000027,
	CHAPTERC12 = 139000029,
	CHAPTERC13 = 139000030,
	CHAPTERC14 = 139000031,
	CHAPTERC15 = 114000020,
	CHAPTERC16 = 140000004,
	KILLPHANTOMSTEP1 = 6,
	KILLPHANTOMSTEP2 = 10,
	KILLPHANTOMSTEP3 = 91,
	KILLPHANTOMSTEP4 = 132,
	GOJINZHOU = 16,
	STARTFLOW = 1,
	STARTSTATE = 1,
	RECHARGEONE = 1,
	RECHARGETWO = 2,
	RECHARGETHREE = 3,
	RECHARGEFOUR = 4,
	RECHARGEFIVE = 5,
	RECHARGESIX = 6,
	REPORTLEVEL8 = 8,
	REPORTLEVEL10 = 10,
	REPORTLEVEL12 = 12,
	REPORTLEVEL15 = 15,
	REPORTLEVEL20 = 20,
	REPORTLEVEL25 = 25,
	REPORTLEVEL30 = 30,
	REPORTLEVEL35 = 35,
	REPORTLEVEL40 = 40,
	REPORTLEVEL45 = 45,
	CREATEROLEEVENTID = "101104",
	BATTLEEVENTID = "101803",
	QUESTEVENTID = "101805",
	FLOWEVENTID = "123000";
class KuroSdkReport {
	static Init() {
		this.mEe();
	}
	static Report(e) {
		HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(e);
	}
	static mEe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
				this.REe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPayItemSuccess,
				this.UEe,
			);
	}
	static OnPlayerLevelChange(e) {
		var t;
		SdkReportLevel.IfNeedReport(e) &&
			(((t = new SdkReportLevel(void 0)).Level = e), this.Report(t));
	}
	static OnPlotFinish(e) {
		var t;
		SdkReportStartFlow.IfNeedReport(e.FlowId, e.FlowStateId) &&
			(((t = new SdkReportStartFlow(void 0)).FlowId = e.FlowId),
			this.Report(t));
	}
	static OnSdkPay() {
		var e = new SdkReportPay(void 0);
		this.Report(e);
	}
	static OnPayShopDirectBuy(e) {
		var t;
		SdkReportDirectBuy.IfNeedReport(e) &&
			(((t = new SdkReportDirectBuy(void 0)).PayItemId = e), this.Report(t));
	}
	static OnChapterStart(e, t) {}
}
(exports.KuroSdkReport = KuroSdkReport),
	((_a = KuroSdkReport).UEe = (e) => {
		var t;
		SdkReportRecharge.IfNeedReport(e.PayItemId) &&
			(((t = new SdkReportRecharge(void 0)).PayItemId = e.PayItemId),
			_a.Report(t));
	}),
	(KuroSdkReport.DEe = (e, t) => {
		var r;
		SdkReportQuestFinish.IfNeedReport(e) &&
			(((r = new SdkReportQuestFinish(void 0)).QuestId = e), _a.Report(r)),
			SdkReportChapter.IfNeedReport(e, 0) &&
				t === Protocol_1.Aki.Protocol.kMs.Proto_Finish &&
				(((r = new SdkReportChapter(void 0)).TreeConfigId = e), _a.Report(r));
	}),
	(KuroSdkReport.REe = (e, t, r) => {
		var o;
		6 === e.Type &&
			((o = e.TreeConfigId),
			(e = e.NodeId),
			SdkReportBattleTech.IfNeedReport(o, e)) &&
			r === Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished &&
			(((r = new SdkReportBattleTech(void 0)).TreeConfigId = o),
			(r.NodeId = e),
			_a.Report(r));
	});
class SdkReportGameInitFinish extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "Game_Initialize" : "";
	}
}
exports.SdkReportGameInitFinish = SdkReportGameInitFinish;
class SdkReportOpenPrivacy extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "Game_Privacy" : "";
	}
}
exports.SdkReportOpenPrivacy = SdkReportOpenPrivacy;
class SdkReportChangeAccount extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "Change_account" : "";
	}
}
exports.SdkReportChangeAccount = SdkReportChangeAccount;
class SdkReportCreateRole extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "Completed_Registration" : "event_1";
	}
	GetEventDataJson() {
		return (
			this.IfGlobalSdk
				? ((this.EventData = new Map()),
					this.EventData.set("eventId", "101104"))
				: ((this.EventData = new Map()),
					this.EventData.set("param1", "101104")),
			super.GetEventDataJson()
		);
	}
}
exports.SdkReportCreateRole = SdkReportCreateRole;
class SdkReportClickEnterGame extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "click_entergame" : "event_2";
	}
}
exports.SdkReportClickEnterGame = SdkReportClickEnterGame;
class SdkReportBattleTech extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.TreeConfigId = 0), (this.NodeId = 0);
	}
	static IfNeedReport(e, t) {
		return (
			(139000025 === e && (6 === t || 10 === t || 91 === t)) ||
			(139000026 === e && 132 === t) ||
			(139000026 === e && 16 === t)
		);
	}
	GetEventName() {
		return (this.IfGlobalSdk && SdkReportBattleTech.AEe.get(this.NodeId)) || "";
	}
	GetEventDataJson() {
		return (
			(this.EventData = new Map()),
			this.EventData.set("eventId", "101803"),
			this.EventData.set("TreeId", this.TreeConfigId.toString()),
			this.EventData.set("StepId", this.NodeId.toString()),
			super.GetEventDataJson()
		);
	}
}
(exports.SdkReportBattleTech = SdkReportBattleTech).AEe = new Map([
	[6, "Beginner_level_Battle_Teach_Finish"],
	[10, "Intermediater_level_Battle_Teach_Finish"],
	[91, "Advanced_level_Battle_Teach_Finish"],
	[132, "capture_Teach_Finish"],
	[16, "Prologue_Task_Finish"],
]);
class SdkReportQuestFinish extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.QuestId = 0);
	}
	static IfNeedReport(e) {
		return (
			139000026 === e &&
			3 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)
		);
	}
	GetEventName() {
		return (
			(this.IfGlobalSdk && SdkReportQuestFinish.AEe.get(this.QuestId)) || ""
		);
	}
	GetEventDataJson() {
		return (
			139000026 === this.QuestId &&
				((this.EventData = new Map()),
				this.EventData.set("eventId", "101805"),
				this.EventData.set("QuestId", this.QuestId.toString())),
			super.GetEventDataJson()
		);
	}
}
(exports.SdkReportQuestFinish = SdkReportQuestFinish).AEe = new Map([
	[139000026, "Prologue_Task_Finish"],
]);
class SdkReportStartFlow extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.FlowId = 0);
	}
	GetEventName() {
		return this.IfGlobalSdk ? "Anime_end" : "";
	}
	static IfNeedReport(e, t) {
		return 1 === e && 1 === t;
	}
	GetEventDataJson() {
		return (
			(this.EventData = new Map()),
			this.EventData.set("eventId", "123000"),
			this.EventData.set("FlowId", this.FlowId.toString()),
			super.GetEventDataJson()
		);
	}
}
exports.SdkReportStartFlow = SdkReportStartFlow;
class SdkReportRecharge extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.PayItemId = 0);
	}
	static IfNeedReport(e) {
		return e >= 1 && e <= 6;
	}
	GetEventName() {
		if (this.IfGlobalSdk) {
			const e = SdkReportRecharge.AEe.get(this.PayItemId);
			return e || "";
		}
		return SdkReportRecharge.PEe.get(this.PayItemId) || "";
	}
}
((exports.SdkReportRecharge = SdkReportRecharge).AEe = new Map([
	[1, "Purchase_099"],
	[2, "Purchase_499"],
	[3, "Purchase_1499"],
	[4, "Purchase_2999"],
	[5, "Purchase_4999"],
	[6, "Purchase_9999"],
])),
	(SdkReportRecharge.PEe = new Map([
		[1, "event_5"],
		[2, "event_6"],
		[3, "event_7"],
		[4, "event_8"],
		[5, "event_9"],
		[6, "event_10"],
	]));
class SdkReportPay extends SdkReportData_1.SdkReportData {
	GetEventName() {
		return this.IfGlobalSdk ? "" : "event_4";
	}
}
exports.SdkReportPay = SdkReportPay;
class SdkReportDirectBuy extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.PayItemId = 0);
	}
	static IfNeedReport(e) {
		return (
			e === PayShopDefine_1.MONTH_CARD_SHOP_ID ||
			e === PayShopDefine_1.BATTLE_PASS_PRIMARY_ID ||
			e === PayShopDefine_1.BATTLE_PASS_HIGH_ID ||
			e === PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID
		);
	}
	GetEventName() {
		return (
			(this.IfGlobalSdk && SdkReportDirectBuy.AEe.get(this.PayItemId)) || ""
		);
	}
}
(exports.SdkReportDirectBuy = SdkReportDirectBuy).AEe = new Map([
	[PayShopDefine_1.MONTH_CARD_SHOP_ID, "Monthly_card"],
	[PayShopDefine_1.BATTLE_PASS_PRIMARY_ID, "BattlePass_Primary"],
	[PayShopDefine_1.BATTLE_PASS_HIGH_ID, "BattlePass_HIGH"],
	[
		PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID,
		"BattlePass_Primary_To_HIGH",
	],
]);
class SdkReportChapter extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.TreeConfigId = 0);
	}
	static IfNeedReport(e, t) {
		return (
			139000025 === e ||
			139000026 === e ||
			139000027 === e ||
			139000029 === e ||
			139000030 === e ||
			139000031 === e ||
			114000020 === e ||
			140000004 === e
		);
	}
	GetEventName() {
		if (this.IfGlobalSdk) {
			const e = SdkReportChapter.AEe.get(this.TreeConfigId);
			return e || "";
		}
		return SdkReportChapter.PEe.get(this.TreeConfigId) || "";
	}
}
((exports.SdkReportChapter = SdkReportChapter).AEe = new Map([
	[139000025, "Complete_pre_1"],
	[139000026, "Complete_pre_2"],
	[139000027, "Complete_C1_1"],
	[139000029, "Complete_C1_2"],
	[139000030, "Complete_C1_3"],
	[139000031, "Complete_C1_4"],
	[114000020, "Complete_C1_5"],
	[140000004, "Complete_C1_6"],
])),
	(SdkReportChapter.PEe = new Map([
		[139000025, "event_12"],
		[139000026, "event_13"],
		[139000027, "event_14"],
		[139000029, "event_15"],
		[139000030, "event_16"],
		[139000031, "event_17"],
		[114000020, "event_18"],
		[140000004, "event_19"],
	]));
class SdkReportLevel extends SdkReportData_1.SdkReportData {
	constructor() {
		super(...arguments), (this.Level = 0);
	}
	static IfNeedReport(e) {
		return !!SdkReportLevel.xEe.includes(e);
	}
	GetEventName() {
		return this.IfGlobalSdk
			? StringUtils_1.StringUtils.Format("Level_{0}", this.Level.toString())
			: SdkReportLevel.PEe.get(this.Level) || "";
	}
}
((exports.SdkReportLevel = SdkReportLevel).xEe = new Array(
	8,
	10,
	12,
	15,
	20,
	25,
	30,
	35,
	40,
	45,
)),
	(SdkReportLevel.PEe = new Map([
		[8, "event_20"],
		[10, "event_21"],
		[12, "event_22"],
		[15, "event_23"],
		[20, "event_24"],
		[25, "event_25"],
		[30, "event_26"],
		[35, "event_27"],
		[40, "event_28"],
		[45, "event_29"],
	]));
