"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionExParams =
		exports.LevelConditionBase =
		exports.CodeCondition =
		exports.LevelConditionGroup =
		exports.LevelEventBase =
			void 0);
const Log_1 = require("../../Core/Common/Log"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	EACH_WAIT_ENTITY_OVER_TIME = 3e4;
class LevelEventBase {
	constructor(e) {
		(this.Id = e),
			(this.GroupId = 0),
			(this.Type = ""),
			(this.IsWaitEnd = !1),
			(this.IsAsync = !1),
			(this.SessionId = -1),
			(this.ActionIndex = 0),
			(this.ActionGuid = ""),
			(this.yUe = !1),
			(this.BaseContext = void 0);
	}
	ExecuteAction(e, t, n) {
		(this.BaseContext = t),
			ControllerHolder_1.ControllerHolder.LevelGeneralController
				.LevelEventLogOpen &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("LevelEvent", 19, "LevelEvent:开始执行行为", [
					"行为类型",
					this.Type,
				]),
			ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()
				? this.ExecuteInGm(e, t, n)
				: this.ExecuteNew(e, t, n);
	}
	Execute(e, t) {}
	ExecuteNew(e, t, n) {}
	ExecuteInGm(e, t, n) {
		this.ExecuteNew(e, t, n);
	}
	CreateWaitEntityTask(e) {
		ControllerHolder_1.ControllerHolder.LevelGeneralController
			.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"等待实体创建",
				["行为类型", this.Type],
				["EntityIds", e.toString()],
			);
		let t = 1;
		Array.isArray(e) && (t = e.length),
			WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
				e,
				(e) => {
					e
						? this.ExecuteWhenEntitiesReady()
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", [
									"EntityCount",
									t,
								]),
							this.FinishExecute(!1));
				},
				!1,
				3e4 * t,
			);
	}
	CreateWaitEntityTaskBigInt(e) {
		ControllerHolder_1.ControllerHolder.LevelGeneralController
			.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"等待实体创建",
				["行为类型", this.Type],
				["EntityIds", e.toString()],
			);
		let t = 1;
		Array.isArray(e) && (t = e.length),
			WaitEntityTask_1.WaitEntityTask.Create(
				e,
				(e) => {
					e
						? this.ExecuteWhenEntitiesReady()
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Event", 7, "Entity加载超时或已被移除", [
									"EntityCount",
									t,
								]),
							this.FinishExecute(!1));
				},
				!1,
				3e4 * t,
			);
	}
	ExecuteWhenEntitiesReady() {}
	OpenTick() {
		(this.IsWaitEnd = !0),
			(this.yUe = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddToTickList,
				!0,
				this,
			);
	}
	Tick(e) {
		return this.OnTick(e), this.yUe;
	}
	OnTick(e) {}
	FinishExecute(e, t = !1, n = !0) {
		(this.yUe = e), this.yUe || this.Failure(t, n);
	}
	Finish() {
		this.OnFinish(),
			this.UpdateGuarantee(),
			this.Release(),
			ControllerHolder_1.ControllerHolder.LevelGeneralController
				.LevelEventLogOpen &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"LevelEvent",
					19,
					"LevelEvent:行为执行完毕_NodeFinished",
					["行为类型", this.Type],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HandleNextAction,
				this.GroupId,
			);
	}
	OnFinish() {}
	UpdateGuarantee() {
		this.OnUpdateGuarantee();
	}
	OnUpdateGuarantee() {}
	Failure(e = !1, t = !0) {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GmHandleActionFailed,
				this.BaseContext,
				this.ActionIndex,
			),
			this.OnFailure(),
			this.Release(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("LevelEvent", 19, "LevelEvent:行为执行失败", [
					"行为类型",
					this.Type,
				]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.HandleActionFailure,
				this.GroupId,
				this.Type,
				e,
				t,
			);
	}
	OnFailure() {}
	Release() {
		this.IsWaitEnd &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddToTickList,
				!1,
				this,
			);
	}
	Reset() {
		this.OnReset(),
			(this.GroupId = 0),
			(this.IsWaitEnd = !1),
			(this.yUe = !0),
			(this.IsAsync = !1),
			(this.SessionId = -1),
			(this.ActionIndex = -1);
	}
	OnReset() {}
}
exports.LevelEventBase = LevelEventBase;
class LevelConditionGroup {
	constructor() {
		(this.Type = 0), (this.Conditions = void 0);
	}
}
exports.LevelConditionGroup = LevelConditionGroup;
class CodeCondition {
	constructor() {
		(this.Type = void 0), (this.CodeType = void 0);
	}
}
exports.CodeCondition = CodeCondition;
class LevelConditionBase {
	Check(e, t) {
		return !1;
	}
	CheckNew(e, t) {
		return !1;
	}
	CheckCompareValue(e, t = 0, n = 0) {
		switch (e) {
			case "Eq":
				return t === n;
			case "Ne":
				return t !== n;
			case "Ge":
			default:
				return n <= t;
			case "Gt":
				return n < t;
			case "Le":
				return t <= n;
			case "Lt":
				return t < n;
		}
	}
}
exports.LevelConditionBase = LevelConditionBase;
class LevelConditionExParams {}
exports.LevelConditionExParams = LevelConditionExParams;
