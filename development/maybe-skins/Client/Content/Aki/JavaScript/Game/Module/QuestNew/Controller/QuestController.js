"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestNewController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
	MapDefine_1 = require("../../Map/MapDefine"),
	DailyQuestAssistant_1 = require("./DailyQuestAssistant"),
	GuideEffectAssistant_1 = require("./GuideEffectAssistant"),
	GuideLineAssistant_1 = require("./GuideLineAssistant"),
	QuestTrackAssistant_1 = require("./QuestTrackAssistant"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	assistantMap = { 0: void 0, 1: void 0, 2: void 0, 3: void 0 };
class QuestNewController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
	static OnRegisterNetEvent() {
		super.OnRegisterNetEvent(),
			Net_1.Net.Register(1778, QuestNewController.qoo),
			Net_1.Net.Register(10591, QuestNewController.Goo),
			Net_1.Net.Register(10420, QuestNewController.Noo),
			Net_1.Net.Register(5625, QuestNewController.Ooo),
			Net_1.Net.Register(18439, QuestNewController.koo),
			Net_1.Net.Register(27879, QuestNewController.Voo);
	}
	static OnUnRegisterNetEvent() {
		super.OnUnRegisterNetEvent(),
			Net_1.Net.UnRegister(1778),
			Net_1.Net.UnRegister(10591),
			Net_1.Net.UnRegister(10420),
			Net_1.Net.UnRegister(5625),
			Net_1.Net.UnRegister(18439);
	}
	static OnAddEvents() {
		super.OnAddEvents(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
				QuestNewController.Hoo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQuestStateChange,
				this.DEe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeArea,
				this.joo,
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"QuestView",
				QuestNewController.V4e,
				"QuestNewController.CanOpenView",
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
			QuestNewController.Hoo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQuestStateChange,
				this.DEe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeArea,
				this.joo,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"QuestView",
				QuestNewController.V4e,
			),
			super.OnRemoveEvents();
	}
	static OnTick(e) {
		ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp &&
			(QuestNewController.c$t(0)?.Tick(e),
			QuestNewController.c$t(2)?.UpdateQuestGuideEffect(e));
	}
	static RegisterAssistant() {
		this.AddAssistant(0, new GuideLineAssistant_1.GuideLineAssistant()),
			this.AddAssistant(1, new QuestTrackAssistant_1.QuestTrackAssistant()),
			this.AddAssistant(2, new GuideEffectAssistant_1.GuideEffectAssistant()),
			this.AddAssistant(3, new DailyQuestAssistant_1.DailyQuestAssistant());
	}
	static c$t(e) {
		if (this.Assistants) return this.Assistants.get(e);
	}
	static AddQuestTraceEffect(e, t, o) {
		QuestNewController.c$t(2).AddQuestTraceEffect(e, t, o);
	}
	static RemoveQuestTraceEffect(e, t) {
		QuestNewController.c$t(2).RemoveQuestTraceEffect(e, t);
	}
	static ClearQuestTraceEffect(e) {
		QuestNewController.c$t(2).ClearQuestTraceEffect(e);
	}
	static Woo() {
		let e = 0;
		var t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
		return t &&
			(t = ModelManager_1.ModelManager.MapModel.GetMark(t[0], t[1])) instanceof
				MapDefine_1.QuestMarkCreateInfo
			? t.TreeId
			: e;
	}
	static RequestTrackQuest(e, t, o, r = 0, n) {
		QuestNewController.c$t(1).RequestTrackQuest(e, t, o, r, n);
	}
	static TryChangeTrackedQuest(e) {
		return QuestNewController.c$t(1).TryChangeTrackedQuest(e);
	}
	static RedDotRequest(e, t) {
		var o = Protocol_1.Aki.Protocol.Bss.create({ Xkn: e, A8n: t });
		Net_1.Net.Call(14850, o, (o) => {
			o.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					o.uvs,
					28838,
				),
				ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(e, 1 === t);
		});
	}
}
(exports.QuestNewController = QuestNewController),
	((_a = QuestNewController).Koo = void 0),
	(QuestNewController.Hoo = () => {
		QuestNewController.c$t(0).SpawnQuestGuideLine(),
			QuestNewController.c$t(1).RefreshCurTrackQuest(),
			QuestNewController.c$t(3).CreateMarksOnWakeUp(),
			_a.Koo && (_a.Voo(_a.Koo), (_a.Koo = void 0));
	}),
	(QuestNewController.qoo = (e) => {
		for (const o of e.TUs) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Quest", 19, "上线下发进行中的任务", ["任务id", o.Xkn]);
			var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(o.Xkn);
			t && t.UpdateState(o.n3n, 0);
		}
	}),
	(QuestNewController.Goo = (e) => {
		var t,
			o,
			r = QuestNewController.Woo(),
			n = ModelManager_1.ModelManager.QuestNewModel;
		for (const s of e.Xkn) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Quest", 19, "下发可接任务", ["任务id", s]);
			let e = n.GetQuest(s);
			e ||
				((t = n.GetQuestConfig(s)) &&
					(t = t.AddInteractOption) &&
					(t &&
					r !== s &&
					((t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
						t.EntityId,
					)),
					(t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t)),
					(o = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
					(o = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(o)),
					t) &&
					o &&
					t !== o
						? n.AddCanAcceptQuest(s)
						: (e = n.AddQuest(s))?.UpdateState(
								Protocol_1.Aki.Protocol.kMs.WMs,
								0,
							)));
		}
	}),
	(QuestNewController.joo = () => {
		var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
			t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(e);
		if (t) {
			var o,
				r,
				n = QuestNewController.Woo(),
				s = ModelManager_1.ModelManager.QuestNewModel;
			for ([o, r] of s.GetCanAcceptQuest())
				if (r) {
					var a = s.GetQuestConfig(o);
					if (a && (a = a.AddInteractOption))
						if (
							((a = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
								a.EntityId,
							)),
							ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(a) ===
								t || n === o)
						) {
							if (s.GetQuest(o)) return;
							s.AddQuest(o)?.UpdateState(Protocol_1.Aki.Protocol.kMs.WMs, 0);
						} else s.RemoveQuest(o);
				}
		}
	}),
	(QuestNewController.Noo = (e) => {
		for (const t of e.Xkn)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Quest", 19, "下发提前显示的任务", ["任务id", t]),
				ModelManager_1.ModelManager.QuestNewModel.AddQuest(t);
	}),
	(QuestNewController.koo = (e) => {
		for (const t of e.Xkn)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Quest", 19, "上线下发已完成任务", ["任务id", t]),
				ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(t);
	}),
	(QuestNewController.Ooo = (e) => {
		switch (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Quest",
					19,
					"任务状态更新",
					["任务Id", e.Xkn],
					["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.ckn],
				),
			e.ckn)
		) {
			case Protocol_1.Aki.Protocol.kMs.Proto_InActive:
			case Protocol_1.Aki.Protocol.kMs.WMs:
			case Protocol_1.Aki.Protocol.kMs.Gms:
				var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(e.Xkn);
				t
					? t.UpdateState(e.ckn, 1)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Quest",
							19,
							"任务状态更新时：任务不存在",
							["任务Id", e.Xkn],
							["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.ckn],
						);
				break;
			case Protocol_1.Aki.Protocol.kMs.Proto_Finish:
				ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.Xkn),
					(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.Xkn))
						? t.UpdateState(e.ckn, 1)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Quest",
								19,
								"任务状态更新时：任务不存在",
								["任务Id", e.Xkn],
								["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.ckn],
							);
				break;
			case Protocol_1.Aki.Protocol.kMs.Proto_Delete:
				(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.Xkn))
					? (ModelManager_1.ModelManager.QuestNewModel.RemoveQuest(e.Xkn),
						t.UpdateState(e.ckn, 1))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Quest",
							19,
							"任务状态更新时：任务不存在",
							["任务Id", e.Xkn],
							["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.ckn],
						);
		}
	}),
	(QuestNewController.V4e = (e) =>
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10004)),
	(QuestNewController.DEe = (e, t, o) => {
		var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
		if (
			r &&
			(r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(
				r.Type,
			)) &&
			r.NeedRedDot &&
			1 === o
		)
			switch (t) {
				case Protocol_1.Aki.Protocol.kMs.Gms:
					QuestNewController.RedDotRequest(e, 1);
					break;
				case Protocol_1.Aki.Protocol.kMs.Proto_Finish:
				case Protocol_1.Aki.Protocol.kMs.Proto_Delete:
					QuestNewController.RedDotRequest(e, 0);
			}
	}),
	(QuestNewController.Voo = (e) => {
		if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp)
			for (const t of e.Xkn)
				ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, !0);
		else _a.Koo = e;
	});
