"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationAttributeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
class FormationAttributeController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.ConfigList =
				FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			(this.zVs = this.zVs - 1e3 * Math.random()),
			(this.ZVs = this.ZVs - 1e3 * Math.random()),
			!(this.e9s = !1)
		);
	}
	static OnTick(e) {
		if (this.ConfigList)
			for (const e of this.ConfigList.values()) this.OBe(e.Id);
	}
	static OnClear() {
		return (
			this.kBe(),
			void 0 !== this.FBe && TimerSystem_1.TimerSystem.Remove(this.FBe),
			!(this.FBe = void 0)
		);
	}
	static GetPredictedServerStopTime() {
		return Time_1.Time.WorldTime + this.VBe + Net_1.Net.RttMs / 2;
	}
	static GetPredictedServerTime() {
		return Time_1.Time.Now + this.HBe + Net_1.Net.RttMs / 2;
	}
	static t9s(e) {
		var t = Time_1.Time.ServerTimeStamp,
			r = t - e;
		!this.e9s &&
			((0 < r && r > this.ZVs) || (r < 0 && Math.abs(r) > this.zVs)) &&
			(EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TimeValidError),
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"TimeUtil",
					38,
					"校准时间存在过大误差,退出登录重连",
					["clientTime", t],
					["ServerTime", e],
				),
			(this.e9s = !0));
	}
	static OnFormationAttrChanged(e) {
		var t,
			r,
			i = this.Model?.GetData(e);
		i &&
			((t = Protocol_1.Aki.Protocol.zns.create()),
			(r = Protocol_1.Aki.Protocol.NOs.create()),
			(t.qFn = [r]),
			(t.GFn = i.Timestamp),
			(r.OFn = e),
			(r.NFn = i.Value),
			(r.kFn = i.Max),
			(r.FFn = i.BaseMax),
			(r.VFn = i.Speed),
			Net_1.Net.Call(16761, t, () => {}),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Battle",
				20,
				"发送队伍属性变化push",
				["clientTime", i.Timestamp],
				["data", JSON.stringify(r)],
			);
	}
	static SetValue(e, t) {
		var r;
		this.WBe(e) &&
			((r = this.GetValue(e)),
			this.Model.SetValue(e, t),
			this.OBe(e),
			this.GetValue(e) !== r) &&
			this.OnFormationAttrChanged(e);
	}
	static AddValue(e, t) {
		this.WBe(e) && this.SetValue(e, this.Model.GetValue(e) + t);
	}
	static GetValue(e) {
		var t = this.KBe.get(e);
		return void 0 !== t ? t : this.Model.GetValue(e);
	}
	static GetMax(e) {
		return this.Model.GetMax(e);
	}
	static GetBaseMax(e) {
		return this.Model.GetBaseMax(e);
	}
	static GetSpeed(e) {
		return this.Model.GetSpeed(e);
	}
	static GetRatio(e) {
		return (
			(this.GetValue(e) / this.GetMax(e)) *
			CharacterAttributeTypes_1.PER_TEN_THOUSAND
		);
	}
	static AddModifier(e, t, r, i) {
		let o = this.Modifiers.get(t);
		o || this.Modifiers.set(t, (o = new Map())),
			o.set(e, { Type: r, Value: i }),
			this.RefreshSpeed(t);
	}
	static RemoveModifier(e, t) {
		var r = this.Modifiers.get(t);
		r &&
			(r.delete(e),
			0 === r.size && this.Modifiers.delete(t),
			this.RefreshSpeed(t));
	}
	static AddBoundsLocker(e, t, r) {
		return this.Model?.AddBoundsLocker(e, t, r) ?? -1;
	}
	static RemoveBoundsLocker(e, t) {
		return this.Model?.RemoveBoundsLocker(e, t) ?? !1;
	}
	static AddPauseLock(e) {
		this.PauseLocks.add(e), this.RefreshAllSpeed();
	}
	static RemovePauseLock(e) {
		this.PauseLocks.delete(e), this.RefreshAllSpeed();
	}
	static IsPaused() {
		return 0 < this.PauseLocks.size;
	}
	static WBe(e) {
		return 1 === e;
	}
	static QBe(e) {
		let t = this.XBe.get(e);
		return (
			t ||
				((t = () => {
					var t =
							ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
								185,
							),
						r = this.Model.GetConfig(e);
					r &&
						t &&
						(t.HasAnyTag(r.ForbidIncreaseTags)
							? this.AddModifier("TagForbidIncrease", e, 1, -1 / 0)
							: this.RemoveModifier("TagForbidIncrease", e),
						t.HasAnyTag(r.ForbidDecreaseTags)
							? this.AddModifier("TagForbidDecrease", e, 2, -1 / 0)
							: this.RemoveModifier("TagForbidDecrease", e));
				}),
				this.XBe.set(e, t)),
			t
		);
	}
	static get Model() {
		return ModelManager_1.ModelManager.FormationAttributeModel;
	}
	static OnSetMax(e, t, r) {
		if (t !== r) {
			var i = this.$Be.get(e);
			if (i) for (const o of i.values()) o(e, t, r);
		}
	}
	static RefreshAllSpeed() {
		if (this.ConfigList)
			for (const e of this.ConfigList.values()) this.RefreshSpeed(e.Id);
	}
	static RefreshSpeed(e) {
		var t = this.Modifiers.get(e);
		let r = this.Model.GetBaseRate(e),
			i = r;
		var o = this.Model.GetSpeed(e);
		if (FormationAttributeController.IsPaused()) i = 0;
		else if (t) {
			let e = 0,
				o = 0;
			for (const i of t.values())
				switch (i.Type) {
					case 0:
						r = i.Value;
						break;
					case 1:
						e += i.Value;
						break;
					case 2:
						o += i.Value;
				}
			i =
				r *
				(t = Math.max(
					1 + (0 < r ? e : o) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
					0,
				));
		}
		i !== o && (this.Model.SetSpeed(e, i), this.OnFormationAttrChanged(e));
	}
	static OBe(e) {
		var t = this.Model.GetValue(e);
		let r = this.KBe.get(e);
		if ((void 0 === r && this.KBe.set(e, (r = t)), t !== r)) {
			this.KBe.set(e, t);
			var i = this.YBe.get(e);
			if (i)
				for (const a of i.values())
					try {
						a(e, t, r);
					} catch (i) {
						var o = [
							["attrId", e],
							["newValue", t],
							["oldValue", r],
						];
						i instanceof Error
							? Log_1.Log.CheckError() &&
								Log_1.Log.ErrorWithStack(
									"Event",
									20,
									"队伍属性回调异常",
									i,
									...o,
								)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Event", 20, "队伍属性回调异常", ...o);
					}
			if ((i = this.JBe.get(e))) {
				var a = this.GetRatio(e);
				for (const t of i) {
					var s = a >= t.Min && a <= t.Max;
					if (s !== t.InInterval) {
						t.InInterval = s;
						try {
							t.Func(e, s, a);
						} catch (i) {
							(s = [
								["attrId", e],
								["inInterval", s],
								["ratio", a],
							]),
								i instanceof Error
									? Log_1.Log.CheckError() &&
										Log_1.Log.ErrorWithStack(
											"Event",
											20,
											"队伍属性回调异常",
											i,
											...s,
										)
									: Log_1.Log.CheckError() &&
										Log_1.Log.Error("Event", 20, "队伍属性回调异常", ...s);
						}
					}
				}
			}
		}
	}
	static kBe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			this.nye,
		),
			this.YBe.clear(),
			this.JBe.clear(),
			this.$Be.clear();
	}
	static AddValueListener(e, t, r) {
		let i = this.YBe.get(e);
		i || this.YBe.set(e, (i = new Set())), i.add(t);
	}
	static RemoveValueListener(e, t) {
		var r = this.YBe.get(e);
		r && (r.delete(t), 0 === r.size) && this.YBe.delete(e);
	}
	static AddThresholdListener(e, t, r, i, o) {
		if (r < i)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Formation",
					20,
					"尝试添加的阈值监听器上限小于下限",
					["attrId", e],
					["区间上限", r],
					["区间下限", i],
				);
		else {
			let o = this.JBe.get(e);
			o || this.JBe.set(e, (o = [])),
				o.some((e) => e.Func === t) ||
					((e = this.GetRatio(e)),
					o.push({ Func: t, Max: r, Min: i, InInterval: i <= e && e <= r }));
		}
	}
	static RemoveThresholdListener(e, t) {
		var r;
		(e = this.JBe.get(e)) &&
			void 0 !== (r = e.findIndex((e) => e.Func === t)) &&
			0 <= r &&
			e.splice(r, 1);
	}
	static AddMaxListener(e, t, r) {
		let i = this.$Be.get(e);
		i || this.$Be.set(e, (i = new Set())), i.add(t);
	}
	static RemoveMaxListener(e, t) {
		this.$Be.get(e)?.delete(t);
	}
}
(exports.FormationAttributeController = FormationAttributeController),
	((_a = FormationAttributeController).ConfigList = void 0),
	(FormationAttributeController.e9s = !1),
	(FormationAttributeController.zVs = 432e5),
	(FormationAttributeController.ZVs = 6e4),
	(FormationAttributeController.HBe = 0),
	(FormationAttributeController.VBe = 0),
	(FormationAttributeController.FBe = void 0),
	(FormationAttributeController.FormationAttrNotify = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.GFn ?? 0);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				20,
				"收到队伍属性变化通知",
				["serverTime", t],
				["notify", JSON.stringify(e.qFn)],
			);
		for (const s of e.qFn) {
			var r = s.OFn ?? 0,
				i = _a.Model.GetMax(s.OFn ?? 0),
				o = s.kFn ?? 0,
				a = s.FFn ?? 0;
			let e = s.NFn ?? 0,
				n = s.VFn ?? 0;
			_a.WBe(r) && ((e = _a.GetValue(r) ?? 0), (n = _a.GetSpeed(r) ?? 0)),
				_a.Model.SetData(r, o, a, e, n, t),
				_a.OnSetMax(r, o, i);
		}
	}),
	(FormationAttributeController.TimeCheck = (e, t, r) => {
		(_a.HBe = t - Time_1.Time.Now),
			(_a.VBe = Number(r) - Time_1.Time.WorldTime),
			Time_1.Time.SetServerTimeOffset(Number(_a.HBe)),
			Time_1.Time.SetTimeCheckServerStopTimeStamp(Number(_a.VBe)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					36,
					"对时通知",
					["clientTime", e],
					["serverTime", t],
					["serverStopTime", r],
					["PredictedServerTimeOffset", _a.HBe],
					["PredictedServerStopTimeOffset", _a.VBe],
				);
	}),
	(FormationAttributeController.TimeCheckNotify = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.HFn),
			r = MathUtils_1.MathUtils.LongToNumber(e.Kxs);
		e = MathUtils_1.MathUtils.LongToNumber(e.Qxs);
		_a.TimeCheck(t, r, e);
	}),
	(FormationAttributeController.TimeCheckRequest = () => {
		var e;
		Net_1.Net.IsServerConnected() &&
			(((e = Protocol_1.Aki.Protocol.Hus.create()).HFn = Time_1.Time.WorldTime),
			(e.jFn = Time_1.Time.TimeDilation),
			(e.WFn = ModelManager_1.ModelManager.GeneralLogicTreeModel?.TimeStop
				? 0
				: 1),
			Net_1.Net.Call(21928, e, (e) => {
				var t, r;
				e &&
					((t = MathUtils_1.MathUtils.LongToNumber(e.HFn)),
					(r = MathUtils_1.MathUtils.LongToNumber(e.Kxs)),
					(e = MathUtils_1.MathUtils.LongToNumber(e.Qxs)),
					_a.TimeCheck(t, r, e),
					_a.t9s(r));
			}));
	}),
	(FormationAttributeController.Modifiers = new Map()),
	(FormationAttributeController.PauseLocks = new Set()),
	(FormationAttributeController.XBe = new Map()),
	(FormationAttributeController.xie = (e, t) => {
		if (_a.ConfigList)
			for (const t of _a.ConfigList.values()) {
				var r = t.Id,
					i = e.Entity.CheckGetComponent(185),
					o = _a.Model.GetConfig(r);
				for (const e of o?.ForbidIncreaseTags)
					i?.AddTagAddOrRemoveListener(e, _a.QBe(r));
				for (const e of o?.ForbidDecreaseTags)
					i?.AddTagAddOrRemoveListener(e, _a.QBe(r));
				_a.QBe(r)();
			}
	}),
	(FormationAttributeController.nye = () => {
		_a.FBe ||
			(_a.FBe = TimerSystem_1.TimerSystem.Forever(_a.TimeCheckRequest, 3e3));
	}),
	(FormationAttributeController.KBe = new Map()),
	(FormationAttributeController.YBe = new Map()),
	(FormationAttributeController.JBe = new Map()),
	(FormationAttributeController.$Be = new Map());
