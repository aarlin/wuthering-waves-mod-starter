"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBase = exports.RedDotData = void 0);
const Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	RedDotSystem_1 = require("./RedDotSystem"),
	DEBUG_MODE = !1,
	STAT_MODE = !0;
class RedDotData {
	constructor() {
		(this.Dsr = 0), (this.Rsr = new Set());
	}
	get State() {
		return 0 < this.Dsr;
	}
	get StateCount() {
		return this.Dsr;
	}
	set StateCount(t) {
		(this.Dsr = t), this.Dsr < 0 && (this.Dsr = 0);
	}
	GetUiItemSet() {
		return this.Rsr;
	}
	ClearUiItem() {
		this.Rsr.clear();
	}
	SetUiItem(t) {
		this.Rsr.add(t);
	}
	DeleteUiItem(t) {
		this.Rsr.delete(t);
	}
	TryChangeState(t) {
		return (
			t !== this.State &&
			((this.StateCount += t ? 1 : -1), this.UpdateRedDotUIActive(), !0)
		);
	}
	UpdateRedDotUIActive() {
		this.SetUIItemActive(this.State);
	}
	SetUIItemActive(t) {
		for (const e of this.Rsr) e.IsValid() && e.SetUIActive(t);
	}
	OnChildrenStateChange(t) {
		var e = this.State;
		return (
			(this.StateCount += t ? 1 : -1),
			e !== this.State && (this.UpdateRedDotUIActive(), !0)
		);
	}
}
exports.RedDotData = RedDotData;
class RedDotBase {
	constructor() {
		(this.Name = void 0),
			(this.dce = !0),
			(this.NQ = new Map()),
			(this.Usr = void 0),
			(this.Asr = () => {
				this.Psr(!0);
			}),
			(this.xsr = () => {
				this.Psr(!1);
			}),
			(this.wsr = (...t) => {
				let e = 0;
				t && "number" == typeof t[0] && this.IsAllEventParamAsUId()
					? ((e = t[0]),
						this.Bsr(e),
						RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e))
					: this.IsMultiple()
						? this.NQ.forEach((t, e) => {
								RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e);
							})
						: (this.Bsr(e),
							RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e));
			}),
			(this.bsr = (t = 0) => {
				var e = this.OnCheck(t),
					s = this.wGo(t);
				s
					? s.TryChangeState(e) &&
						(this.Usr && this.Usr(s.State, t), this.qsr(e, t))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RedDot",
							17,
							"Check失败，红点数据未绑定到事件上！",
							["Name", this.Name],
							["uId", t],
						);
			}),
			this.Gsr();
		var t = this.GetActiveEvents();
		if (t) for (const e of t) EventSystem_1.EventSystem.Add(e, this.Asr);
		if ((t = this.GetDisActiveEvents()))
			for (const e of t) EventSystem_1.EventSystem.Add(e, this.xsr);
	}
	get Nsr() {
		return ModelManager_1.ModelManager.RedDotModel.GetRedDotTree(this.Name);
	}
	Gsr() {
		for (const t of this.Osr()) EventSystem_1.EventSystem.Add(t, this.wsr);
	}
	ksr(t) {
		if ((this.dce = t)) this.Gsr();
		else {
			var e;
			for (const t of this.Osr()) EventSystem_1.EventSystem.Remove(t, this.wsr);
			for ([, e] of this.NQ) e.SetUIItemActive(!1);
		}
		var s;
		for ([s] of this.Nsr.ChildMap) s.ksr(t);
	}
	Fsr(t) {
		return !(void 0 !== this.Nsr.Parent && !this.Nsr.Parent.Element.dce && t);
	}
	Psr(t) {
		t !== this.dce &&
			this.Fsr(t) &&
			(this.ksr(t), t && this.Vsr(), void 0 !== this.Nsr.Parent) &&
			this.Nsr.Parent.Element.Hsr(this, t);
	}
	Hsr(t, e) {
		for (var [s, r] of t.NQ)
			(s = this.NQ.get(s)) &&
				(e ? (s.StateCount += r.StateCount) : (s.StateCount -= r.StateCount)),
				s.UpdateRedDotUIActive();
		void 0 !== this.Nsr.Parent && this.Nsr.Parent.Element.Hsr(t, e);
	}
	Vsr() {
		for (var [t, e] of this.NQ) {
			var s = this.OnCheck(t);
			(e.StateCount = s ? 1 : 0), s && (e.SetUIItemActive(!0), this.qsr(s, t));
		}
		var r;
		for ([r] of this.Nsr.ChildMap) r.Vsr();
	}
	qsr(t, e = 0) {
		var s,
			r = this.Nsr.Parent?.Element;
		r &&
			((e = r.IsMultiple() ? e : 0),
			r.Bsr(e),
			(s = r.wGo(e)).OnChildrenStateChange(t)) &&
			(r.Usr && r.Usr(s.State, e), r.qsr(t, e));
	}
	wGo(t) {
		return this.NQ.get(t);
	}
	Bsr(t = 0) {
		let e = this.NQ.get(t);
		return e || ((e = new RedDotData()), this.NQ.set(t, e), this.bsr(t)), e;
	}
	Osr() {
		return this.OnGetEvents() ?? [];
	}
	BindUi(t = 0, e, s) {
		this.Bsr(t), this.wGo(t).SetUiItem(e), (this.Usr = s), this.UpdateState(t);
	}
	UnBindGivenUi(t = 0, e) {
		(t = this.wGo(t)) && t.DeleteUiItem(e);
	}
	UnBindUi() {
		this.NQ.forEach((t) => {
			t.ClearUiItem();
		}),
			(this.Usr = void 0);
	}
	UpdateState(t = 0) {
		var e = this.wGo(t);
		e.UpdateRedDotUIActive(), this.Usr && this.Usr(e.State, t);
	}
	IsRedDotActive() {
		for (const t of this.NQ.values()) if (t.State) return !0;
		return !1;
	}
	GetParentName() {
		return this.OnGetParentName();
	}
	OnGetEvents() {}
	GetActiveEvents() {}
	GetDisActiveEvents() {}
	OnCheck(t = 0) {
		return !1;
	}
	IsMultiple() {
		return !1;
	}
	OnGetParentName() {}
	IsAllEventParamAsUId() {
		return !0;
	}
	ToRedDotString() {
		var t,
			e,
			s = new StringBuilder_1.StringBuilder(),
			r = new StringBuilder_1.StringBuilder(),
			i = new StringBuilder_1.StringBuilder();
		for ([t, e] of this.NQ) {
			i.Clear();
			for (const t of e.GetUiItemSet()) i.Append(t.GetDisplayName() + ", ");
			r.Append(
				`{uid:${t}, stateCount:${e.StateCount} uiItem:[${i.ToString()}] }`,
			);
		}
		var o,
			n = new StringBuilder_1.StringBuilder();
		for ([o] of this.Nsr.ChildMap) n.Append(o.Name + ", ");
		return (
			s.Append(
				`[红点:${this.Name} 父红点:${this.Nsr.Parent?.Element.Name} 子红点:{${n.ToString()}}  数据:{ ${r.ToString()} }]\n`,
			),
			s.ToString()
		);
	}
	PrintStateDebugString() {
		for (var [t, e] of (Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RedDot", 8, "=======子红点状态打印开始=======：", [
				"Name",
				this.Name,
			]),
		this.NQ)) {
			var s = e.GetUiItemSet();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RedDot",
					8,
					"红点状态数据：",
					["Uid", t],
					["State", e.State],
					["StateCount", e.StateCount],
					["UiItemSize", s.size],
				);
			for (const t of s)
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("RedDot", 8, "受控制的UI对象", [
						"UiItem",
						t.GetDisplayName(),
					]);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RedDot", 8, "=======子红点状态打印结束=======：", [
				"Name",
				this.Name,
			]);
	}
}
(exports.RedDotBase = RedDotBase).MBo = void 0;
