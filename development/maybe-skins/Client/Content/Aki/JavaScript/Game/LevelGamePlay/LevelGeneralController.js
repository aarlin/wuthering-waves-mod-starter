"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGeneralController = void 0);
const Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	ConditionById_1 = require("../../Core/Define/ConfigQuery/ConditionById"),
	ConditionGroupById_1 = require("../../Core/Define/ConfigQuery/ConditionGroupById"),
	GeneralActionById_1 = require("../../Core/Define/ConfigQuery/GeneralActionById"),
	GeneralActionGroupById_1 = require("../../Core/Define/ConfigQuery/GeneralActionGroupById"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	ErrorCodeController_1 = require("../Module/ErrorCode/ErrorCodeController"),
	CodeDefineLevelConditionInfo_1 = require("./LevelConditions/CodeDefineLevelConditionInfo"),
	LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
	LevelConditionRegistry_1 = require("./LevelConditions/LevelConditionRegistry"),
	LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter"),
	LevelGeneralCommons_1 = require("./LevelGeneralCommons"),
	LevelGeneralNetworks_1 = require("./LevelGeneralNetworks");
class LevelGeneralController extends ControllerBase_1.ControllerBase {
	static pie() {
		(this.PUe = new Map()),
			(this.xUe = new Map()),
			(this.wUe = new Map()),
			(this.LevelEventLogOpen = !0),
			Info_1.Info.IsBuildDevelopmentOrDebug || (this.LevelEventLogOpen = !1);
	}
	static OnInit() {
		return (
			LevelGeneralCommons_1.LevelGeneralCommons.Init(),
			LevelGeneralNetworks_1.LevelGeneralNetworks.Register(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddToTickList,
				this.BUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HandleNextAction,
				this.bUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HandleActionFailure,
				this.qUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
			this.pie(),
			!0
		);
	}
	static OnClear() {
		return (
			LevelGeneralCommons_1.LevelGeneralCommons.Clear(),
			LevelGeneralNetworks_1.LevelGeneralNetworks.UnRegister(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddToTickList,
				this.BUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HandleNextAction,
				this.bUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HandleActionFailure,
				this.qUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
			!0
		);
	}
	static GetBehaviorTreeRunningActions() {
		if (this.PUe.size) {
			var e = new Array();
			for (const t of this.PUe.values())
				for (const n of t) 6 === n.Context.Type && e.push(n);
			return e;
		}
	}
	static ExecuteActions(e, t, n) {
		if (0 !== e) {
			var o,
				i = GeneralActionGroupById_1.configGeneralActionGroupById.GetConfig(e);
			if (i)
				return (o = --this.NUe), n && this.xUe.set(o, n), this.OUe(o, i, t), !0;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelEvent", 7, "行为组配置不存在，请检查配置", [
					"GroupId",
					e,
				]);
		}
		return !1;
	}
	static ExecuteActionsByString(e, t, n) {
		if (
			!StringUtils_1.StringUtils.IsEmpty(e) &&
			e !== StringUtils_1.ZERO_STRING
		) {
			var o,
				i = GeneralActionGroupById_1.configGeneralActionGroupById.GetConfig(
					Number(e),
				);
			if (i)
				return (
					(o = --this.NUe), n && this.xUe.set(i.Id, n), this.OUe(o, i, t), !0
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelEvent", 7, "行为组配置不存在，请检查配置", [
					"GroupId",
					e,
				]);
		}
		return !1;
	}
	static ExecuteActionsNew(e, t, n) {
		var o = --this.NUe;
		if (1 === (n = (n && this.xUe.set(o, n), e.length))) {
			var i = e[0],
				r = EventTempData.Create();
			(r.EventType = i.Name || i.Params.constructor.name),
				(r.EventParamsNew = i.Params),
				(r.IsAsync = i.Async ?? !1),
				1 === t.Type && (r.EventEntityId = t.EntityId),
				(r.Context = t),
				(r.ActionIndex = 0),
				(r.ActionId = i.ActionId ?? 0),
				(r.ActionGuid = i.ActionGuid ?? ""),
				this.kUe(o, r);
		} else {
			var s = new Array();
			this.PUe.set(o, s);
			let i = n;
			for (let o = n - 1; -1 < o; o--) {
				var a = e[o],
					l = EventTempData.Create();
				(l.EventType = a.Name || a.Params.constructor.name),
					(l.EventParamsNew = a.Params),
					(l.IsAsync = a.Async ?? !1),
					1 === t.Type && (l.EventEntityId = t.EntityId),
					(l.Context = t),
					(l.ActionIndex = --i),
					(l.ActionId = a.ActionId ?? 0),
					s.push(l);
			}
			this.HandleNextAction(o);
		}
	}
	static ExecuteActionsByServerNotify(e, t, n, o, i, r, s) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Level",
				7,
				"开始执行行为组",
				["PlayerId", n],
				["SessionId", o],
				["StartIndex", i],
				["EndIndex", r],
			);
		var a = e.length;
		if (a <= i || a <= r)
			this.HandleFinishActions(
				n,
				o,
				i,
				`行为组开始节点超过数组上限  StartIndex：${i}，EndIndex：${r}，ActionsLen：` +
					a,
			);
		else {
			if (this.LevelEventLogOpen) {
				let s = "";
				try {
					s = JSON.stringify(t);
				} catch (n) {
					s = "无法JSON序列化的Context";
				}
				let a = "";
				try {
					a = JSON.stringify(e);
				} catch (n) {
					a = "无法JSON序列化的Actions";
				}
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						7,
						"开始执行行为组",
						["PlayerId", n],
						["SessionId", o],
						["StartIndex", i],
						["EndIndex", r],
						["Context", s],
						["Actions", a],
					);
			}
			(a = o), s && this.xUe.set(a, s);
			let C = this.PUe.get(a);
			if (C)
				for (let n = i; n <= r; n++) {
					var l = e[n],
						v = EventTempData.Create();
					(v.EventType = l.Name || l.Params.constructor.name),
						(v.EventParamsNew = l.Params),
						(v.IsAsync = l.Async ?? !1),
						1 === t.Type && (v.EventEntityId = t.EntityId),
						(v.Context = t),
						(v.ActionIndex = n),
						(v.ActionId = l.ActionId ?? 0),
						(v.SessionId = o),
						C.unshift(v);
				}
			else {
				(C = new Array()), this.PUe.set(a, C);
				for (let n = r; n >= i; n--) {
					var d = e[n],
						c = EventTempData.Create();
					(c.EventType = d.Name || d.Params.constructor.name),
						(c.EventParamsNew = d.Params),
						(c.IsAsync = d.Async ?? !1),
						1 === t.Type && (c.EventEntityId = t.EntityId),
						(c.Context = t),
						(c.ActionIndex = n),
						(c.ActionId = d.ActionId ?? 0),
						(c.SessionId = o),
						C.push(c);
				}
				(s = new Array()).push(n),
					s.push(o),
					s.push(i),
					this.wUe.set(a, s),
					this.HandleNextAction(a);
			}
		}
	}
	static OUe(e, t, n) {
		var o = t.ActionIdGroup.length;
		if (1 === o) {
			var i = t.ActionIdGroup[0];
			(i = this.FUe(i, n)) && ((i.ActionIndex = 0), this.kUe(e, i));
		} else {
			var r = new Array();
			this.PUe.set(e, r);
			let i = o;
			for (let e = o - 1; -1 < e; e--) {
				var s = t.ActionIdGroup[e];
				(s = this.FUe(s, n)) && ((s.ActionIndex = --i), r.push(s));
			}
			this.HandleNextAction(e);
		}
	}
	static FUe(e, t) {
		var n;
		if (
			(e = GeneralActionById_1.configGeneralActionById.GetConfig(e)) &&
			ModelManager_1.ModelManager.LevelGeneralModel.GetActionTypeConfig(
				e.ActionType,
			)?.IsClientTrigger
		)
			return (
				((n = EventTempData.Create()).EventType = e.ActionType),
				(n.EventParams = e.LimitParams),
				(n.EventTrigger = t),
				n
			);
	}
	static HandleNextAction(e) {
		var t = this.PUe.get(e);
		this.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("LevelEvent", 7, "执行下一个行为", [
				"行为组剩余个数",
				t?.length,
			]),
			t && 0 < t.length
				? ((t = t.pop()), this.kUe(e, t))
				: (this.PUe.delete(e), this.VUe(e));
	}
	static VUe(e, t = "") {
		var n,
			o = this.wUe.get(e);
		if (this.LevelEventLogOpen) {
			let e = "";
			(e = o
				? `PlayerId：${o[0]} SessionId：${o[1]} StartIndex：` + o[2]
				: "空"),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("LevelEvent", 7, "行为组为空，准备删除", [
						"ContextArray",
						e,
					]);
		}
		o &&
			(this.wUe.delete(e),
			(i = o[0]),
			(n = o[1]),
			(o = o[2]),
			this.HandleFinishActions(i, n, o, t));
		var i = this.xUe.get(e);
		i && (i(1), this.xUe.delete(e));
	}
	static HandleActionsFailure(e, t, n, o) {
		var i = this.PUe.get(e);
		if (i)
			for (; 0 < i.length; ) {
				var r = i.pop();
				EventTempData.Release(r);
			}
		var s,
			a = this.wUe.get(e),
			l =
				(a &&
					((l = `PlayerId：${a[0]} SessionId：${a[1]} StartIndex：` + a[2]),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("LevelEvent", 7, "行为组执行失败，准备删除", [
							"ContextArray",
							l,
						]),
					this.wUe.delete(e),
					(l = a[0]),
					(s = a[1]),
					(a = a[2]),
					this.HandleFinishActions(l, s, a, "行为:" + t + " 执行失败")),
				this.xUe.get(e));
		l && (l(n ? 3 : 2), this.xUe.delete(e)),
			LevelEventCenter_1.LevelEventCenter.RemoveEventGroup(e),
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"LevelEvent",
					7,
					"行为组执行失败（定位问题专用日志，不是报错信息）",
					["Msg", t],
				);
	}
	static HandleFinishActions(e, t, n, o) {
		this.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Level", 7, "请求完成行为组", ["SessionId", t]),
			LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActionsFinish(
				e,
				t,
				n,
				o,
				(e) => {},
			);
	}
	static CheckCondition(e, t, n = !0, ...o) {
		if ("None" === e) return !0;
		var i = ConditionGroupById_1.configConditionGroupById.GetConfig(Number(e));
		if (i) {
			let n,
				r = !1;
			if (i.Relation) {
				for (const s of i.GroupId)
					if (
						(n = ConditionById_1.configConditionById.GetConfig(s)) &&
						(r = this.HandleCondition(n, t, e, ...o))
					)
						return r;
			} else
				for (const s of i.GroupId)
					if (
						(n = ConditionById_1.configConditionById.GetConfig(s)) &&
						!(r = this.HandleCondition(n, t, e, ...o))
					)
						return r;
			return r;
		}
		return n;
	}
	static CheckConditionNew(e, t, n) {
		if (!e || !e.Conditions || 0 === e.Conditions.length) return !0;
		let o = !1;
		if (0 === e.Type) {
			for (const i of e.Conditions) if (!(o = this.HUe(i, t, n))) return o;
		} else for (const i of e.Conditions) if ((o = this.HUe(i, t, n))) return o;
		return o;
	}
	static kUe(e, t) {
		var n = t.EventType;
		-1 === t.SessionId || LevelEventCenter_1.LevelEventCenter.HasAction(n)
			? this.jUe(e, t)
			: (this.LevelEventLogOpen &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						7,
						`服务端驱动执行一个纯服务端逻辑的行为(${t.EventType})`,
						["PlayerId", t.PlayerId],
						["SessionId", t.SessionId],
						["ActionIndex", t.ActionIndex],
					),
				EventTempData.Release(t),
				this.HandleNextAction(e));
	}
	static jUe(e, t) {
		this.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				`执行行为组节点(${t.EventType})`,
				["PlayerId", t.PlayerId],
				["SessionId", t.SessionId],
				["ActionIndex", t.ActionIndex],
			);
		var n = t.EventType,
			o = LevelEventCenter_1.LevelEventCenter.GetEvent(n);
		if (o) {
			(o.GroupId = e),
				(o.IsAsync = t.IsAsync),
				(o.SessionId = t.SessionId),
				(o.ActionIndex = t.ActionIndex),
				LevelEventCenter_1.LevelEventCenter.IsNeedTick(n) && o.OpenTick();
			try {
				t.EventParamsNew
					? o.ExecuteAction(t.EventParamsNew, t.Context, t.ActionId)
					: o.Execute(t.EventParams, t.EventTrigger),
					o.IsWaitEnd || o.Finish();
			} catch (e) {
				o.Failure(),
					(o = "行为节点：" + n + "逻辑执行异常，请检查报错信息"),
					ErrorCodeController_1.ErrorCodeController.OpenConfirmBoxByText(o),
					e instanceof Error &&
						Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack("LevelEvent", 7, o, e, [
							"Details",
							e.message,
						]);
			}
		} else this.HandleNextAction(e);
		EventTempData.Release(t);
	}
	static HandleCondition(e, t, n, ...o) {
		var i = LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type);
		return i
			? i.Check(e, t, ...o)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelCondition",
						17,
						"条件组使用场合不恰当!!!\n            该组中包含的条件类型必须要有客户端实现，\n            否则条件组的判定结果始终为false，可能会出现不合预期的情况",
						["有问题的条件组id", n],
						["有问题的条件id", e.Id],
						["缺乏客户端实现的条件类型", e.Type],
					),
				!1);
	}
	static HUe(e, t, n) {
		let o;
		return (
			!!(o =
				e instanceof CodeDefineLevelConditionInfo_1.CodeCondition
					? LevelConditionCenter_1.LevelConditionCenter.GetCodeCondition(
							e.CodeType,
						)
					: LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type)) &&
			o.CheckNew(e, t, n)
		);
	}
	static OnTick(e) {
		LevelEventCenter_1.LevelEventCenter.Tick(e);
	}
}
(LevelGeneralController.IsTickEvenPausedInternal = !0),
	(LevelGeneralController.NUe = 0),
	(LevelGeneralController.LevelEventLogOpen = !1),
	(LevelGeneralController.BUe = (e, t) => {
		e
			? LevelEventCenter_1.LevelEventCenter.AddToTickList(!0, t)
			: LevelEventCenter_1.LevelEventCenter.AddToTickList(!1, t);
	}),
	(LevelGeneralController.bUe = (e) => {
		TimerSystem_1.TimerSystem.Next(() => {
			LevelGeneralController.HandleNextAction(e);
		});
	}),
	(LevelGeneralController.qUe = (e, t, n, o) => {
		LevelGeneralController.HandleActionsFailure(e, t, n, o);
	}),
	(LevelGeneralController.GUe = (e, t, n) => {
		LevelConditionRegistry_1.LevelConditionRegistry.RegisterEntityPawnRange(
			t.Entity,
		);
	}),
	__decorate(
		[(0, Stats_1.statDecorator)("LevelGeneralController.HandleCondition")],
		LevelGeneralController,
		"HandleCondition",
		null,
	),
	(exports.LevelGeneralController = LevelGeneralController);
class EventTempData {
	constructor() {
		(this.EventType = ""),
			(this.EventParams = void 0),
			(this.EventParamsNew = void 0),
			(this.EventEntityId = 0),
			(this.Context = void 0),
			(this.PlayerId = -1),
			(this.SessionId = -1),
			(this.ActionIndex = -1),
			(this.ActionId = 0),
			(this.ActionGuid = ""),
			(this.IsAsync = !1),
			(this.EventTrigger = void 0);
	}
	Reset() {
		(this.EventType = ""),
			(this.EventParams = void 0),
			(this.EventParamsNew = void 0),
			(this.EventType = ""),
			(this.Context = void 0),
			(this.PlayerId = -1),
			(this.SessionId = -1),
			(this.ActionIndex = -1),
			(this.ActionId = 0),
			(this.EventEntityId = 0),
			(this.EventTrigger = void 0),
			(this.IsAsync = !1);
	}
	static Create() {
		return 0 < this.RUe.length ? this.RUe.pop() : new EventTempData();
	}
	static Release(e) {
		e.Reset(), this.RUe.push(e);
	}
}
EventTempData.RUe = new Array();
