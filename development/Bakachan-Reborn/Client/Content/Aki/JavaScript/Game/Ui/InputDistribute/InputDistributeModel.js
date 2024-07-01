"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../../Game/Manager/ConfigManager"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	InputActionHandle_1 = require("./InputActionHandle"),
	InputAxisHandle_1 = require("./InputAxisHandle"),
	InputDistributeDefine_1 = require("./InputDistributeDefine"),
	InputDistributeDelay_1 = require("./InputDistributeDelay"),
	InputDistributeSetupDefine_1 = require("./InputDistributeSetupDefine"),
	InputDistributeTag_1 = require("./InputDistributeTag"),
	InputKeyHandle_1 = require("./InputKeyHandle"),
	InputTouchHandle_1 = require("./InputTouchHandle"),
	EMIT_EVENT_AXIS_DELTA = 0.05;
class InputDistributeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Zcr = []),
			(this.emr = new Set()),
			(this.tmr = []),
			(this.imr = new Map()),
			(this.omr = new Map()),
			(this.rmr = new Map()),
			(this.nmr = new Map()),
			(this.smr = new Map()),
			(this.amr = new Map()),
			(this.hmr = new Set()),
			(this.lmr = void 0),
			(this._mr = void 0),
			(this.umr = 0);
	}
	OnInit() {
		return (
			this.cmr(),
			this.mmr(),
			this.dmr(),
			this.Cmr(),
			this.gmr(),
			this.fmr(),
			this.SetInputDistributeTag(
				InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
			),
			!0
		);
	}
	OnClear() {
		this.ClearAllNotAllowFightInputViewNames(),
			this.imr.clear(),
			(this.tmr.length = 0);
		for (const t of this.nmr.values()) t.Reset();
		this.nmr.clear();
		for (const t of this.smr.values()) t.Reset();
		this.smr.clear();
		for (const t of this.rmr.values()) t.Reset();
		return this.rmr.clear(), !0;
	}
	fmr() {
		for (const i of InputDistributeSetupDefine_1.inputDistributeSetups) {
			var t = new i();
			this.tmr.push(t);
		}
	}
	RefreshInputDistributeTag() {
		for (const t of this.tmr) if (t.OnRefresh()) return;
	}
	mmr() {
		for (var [t, i] of InputDistributeDefine_1.actionTagMap) this.pmr(t, i);
	}
	dmr() {
		for (var [t, i] of InputDistributeDefine_1.axisTagMap) this.vmr(t, i);
	}
	Cmr() {
		for (var [t, i] of InputDistributeDefine_1.touchTagMap) this.Mmr(t, i);
	}
	gmr() {
		for (var [t, i] of InputDistributeDefine_1.keyTagMap) this.Smr(t, i);
	}
	InputAction(t, i) {
		var e = this.Emr(t);
		if (!e)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Input", 8, "输入Action时，没有对应的ActionHandle", [
						"actionName",
						t,
					]),
				!1
			);
		if (InputDistributeDelay_1.delayInput.includes(t)) {
			let e;
			this.omr.has(t)
				? (e = this.omr.get(t))
				: ((e = new InputDistributeDelay_1.InputDistributeDelay()),
					this.omr.set(t, e)),
				e.CheckCondition(t, i) &&
					e.StartDelay(
						ConfigManager_1.ConfigManager.LevelGamePlayConfig
							.InteractInputCacheTime,
						i,
					);
		}
		if (this.HasActionLimitSet()) {
			if (!this.IsActionInLimitSet(t)) return !1;
		} else {
			var n = e.GetInputDistributeTag();
			if (n && !this.IsTagMatchAnyCurrentInputTag(n)) return !1;
			if (!this.ymr(t, n)) return !1;
		}
		return (
			e.InputAction(i),
			i ? (this.lmr = t) : this.lmr && (this.lmr = void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputChangeForCond,
			),
			!0
		);
	}
	ymr(t, i) {
		return (
			!(i = this.Imr(i)) ||
			!(
				!i.MatchTag(
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.MouseInputTag,
				) &&
				!i.MatchTag(
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.NavigationTag,
				) &&
				(i = ModelManager_1.ModelManager.UiNavigationModel) &&
				i.CheckKeyNameListInNavigation(t)
			)
		);
	}
	GetCurrentActionName() {
		return this.lmr;
	}
	InputCacheAxisValue(t, i) {
		(t = this.Tmr(t)) && t.InputCacheAxisValue(i);
	}
	InputAxis(t, i) {
		var e = this.Tmr(t);
		if (e) {
			if (this.HasActionLimitSet()) {
				if (!this.IsActionInLimitSet(t)) return;
			} else {
				var n = e.GetInputDistributeTag();
				if (n && !this.IsTagMatchAnyCurrentInputTag(n)) return;
			}
			e.InputAxis(i),
				this.Lmr(t, i),
				0 < Math.abs(i) ? (this._mr = t) : this._mr && (this._mr = void 0);
		}
	}
	Lmr(t, i) {
		this.lmr !== t && (this.umr = 0),
			Math.abs(i) &&
				Math.abs(i - this.umr) > 0.05 &&
				((this.lmr = t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnInputChangeForCond,
				),
				(this.umr = i));
	}
	GetCurrentAxisName() {
		return this._mr;
	}
	InputTouch(t, i) {
		var e,
			n = this.Dmr(t);
		n
			? ((e = n.GetInputDistributeTag()) &&
					!this.IsTagMatchAnyCurrentInputTag(e)) ||
				n.InputTouch(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "输入Action时，没有对应的ActionHandle", [
					"touchId",
					t,
				]);
	}
	BindAction(t, i) {
		var e = this.Emr(t);
		e
			? e.BindAction(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "绑定Action回调时，没有对应的ActionHandle", [
					"actionName",
					t,
				]);
	}
	ExecuteDelayInputAction(t) {
		var i = this.Emr(t);
		i &&
			this.omr.has(t) &&
			this.omr.get(t).IsInputActive(!1) &&
			i.InputAction(!1);
	}
	BindActions(t, i) {
		for (const e of t) this.BindAction(e, i);
	}
	UnBindAction(t, i) {
		var e = this.Emr(t);
		e
			? e.UnBindAction(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Input",
					8,
					"取消绑定Action回调时，没有对应的ActionHandle",
					["actionName", t],
				);
	}
	UnBindActions(t, i) {
		for (const e of t) this.UnBindAction(e, i);
	}
	pmr(t, i) {
		return (
			(i = new InputActionHandle_1.InputActionHandle(i, t)),
			this.nmr.set(t, i),
			i
		);
	}
	Emr(t) {
		return this.nmr.get(t);
	}
	BindAxis(t, i) {
		var e = this.Tmr(t);
		e
			? e.BindAxis(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "绑定Axis回调时，没有对应的ActionHandle", [
					"axisName",
					t,
				]);
	}
	BindAxes(t, i) {
		for (const e of t) this.BindAxis(e, i);
	}
	GetAxisValue(t) {
		return (t = this.Tmr(t)) ? t.GetCacheAxisValue() : 0;
	}
	UnBindAxis(t, i) {
		var e = this.Tmr(t);
		e
			? e.UnBindAxis(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Input",
					8,
					"取消绑定Action回调时，没有对应的ActionHandle",
					["axisName", t],
				);
	}
	UnBindAxes(t, i) {
		for (const e of t) this.UnBindAxis(e, i);
	}
	BindTouch(t, i) {
		var e = this.Dmr(t);
		e
			? e.BindTouch(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "绑定Touch回调时，没有对应的ActionHandle", [
					"axisName",
					t,
				]);
	}
	BindTouches(t, i) {
		for (const e of t) this.BindTouch(e, i);
	}
	UnBindTouch(t, i) {
		var e = this.Dmr(t);
		e
			? e.UnBindTouch(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Input",
					8,
					"取消绑定Touch回调时，没有对应的ActionHandle",
					["axisName", t],
				);
	}
	UnBindTouches(t, i) {
		for (const e of t) this.UnBindTouch(e, i);
	}
	vmr(t, i) {
		return (
			(i = new InputAxisHandle_1.InputAxisHandle(i, t)), this.smr.set(t, i), i
		);
	}
	Tmr(t) {
		return this.smr.get(t);
	}
	Mmr(t, i) {
		return (
			(i = new InputTouchHandle_1.InputTouchHandle(i, t.toString())),
			this.amr.set(t, i),
			i
		);
	}
	Dmr(t) {
		return this.amr.get(t);
	}
	Smr(t, i) {
		return (
			(i = new InputKeyHandle_1.InputKeyHandle(i, t)), this.rmr.set(t, i), i
		);
	}
	Rmr(t) {
		return this.rmr.get(t);
	}
	BindKey(t, i) {
		var e = this.Rmr(t);
		e
			? e.BindAction(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "绑定Key回调时，没有对应的KeyHandle", [
					"keyName",
					t,
				]);
	}
	UnBindKey(t, i) {
		var e = this.Rmr(t);
		e
			? e.UnBindAction(i)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Input", 8, "取消绑定Key回调时，没有对应的KeyHandle", [
					"keyName",
					t,
				]);
	}
	InputKey(t, i) {
		var e;
		!(t = this.Rmr(t)) ||
			((e = t.GetInputDistributeTag()) &&
				!this.IsTagMatchAnyCurrentInputTag(e)) ||
			t.InputKey(i);
	}
	HasAnyNotAllowFightInputViewIsOpen() {
		return 0 < this.hmr.size;
	}
	AddNotAllowFightInputViewName(t) {
		this.hmr.add(t);
	}
	RemoveNotAllowFightInputViewName(t) {
		this.hmr.delete(t);
	}
	ClearAllNotAllowFightInputViewNames() {
		this.hmr.clear();
	}
	GetNotAllowFightInputViewNameSet() {
		return this.hmr;
	}
	cmr() {
		for (const e of InputDistributeDefine_1.initializeInputDistributeTagDefine) {
			var t = e.Tag,
				i = e.ParentTag;
			i = this.Imr(i);
			this.Umr(t, i);
		}
	}
	Umr(t, i) {
		return (
			(i = new InputDistributeTag_1.InputDistributeTag(t, i)),
			this.imr.set(t, i),
			i
		);
	}
	Imr(t) {
		return this.imr.get(t);
	}
	MatchTag(t, i, e = !1) {
		return (t = this.Imr(t)), !!i && t.MatchTag(i.TagName, e);
	}
	IsTagMatchAnyCurrentInputTag(t, i = !1) {
		return this.IsTagMatchAnyInputDistributeTags(t, this.Zcr, i);
	}
	IsAnyInputDistributeTagsMatchTag(t, i, e = !1) {
		for (const n of t) if (n.MatchTag(i, e)) return !0;
		return !1;
	}
	IsTagMatchAnyInputDistributeTags(t, i, e = !1) {
		var n = this.Imr(t);
		for (const t of i) if (n.MatchTag(t.TagName, e)) return !0;
		return !1;
	}
	AddToLimitInputDistributeActions(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发限制Action", [
				"actionName",
				t,
			]),
			this.emr.add(t);
	}
	ClearLimitInputDistributeActions() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Input", 8, "[InputDistribute]清除输入分发限制Action"),
			this.emr.clear();
	}
	HasActionLimitSet() {
		return 0 < this.emr.size;
	}
	IsActionInLimitSet(t) {
		return this.emr.has(t);
	}
	AddInputDistributeTag(t) {
		this.Amr(t) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Input", 8, "[InputDistribute]添加输入分发Tag", [
					"tagName",
					t,
				]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.Zcr,
			));
	}
	Amr(t) {
		return !!(t = this.Imr(t)) && (this.Zcr.push(t), !0);
	}
	SetInputDistributeTag(t) {
		var i = this.Imr(t);
		i &&
			((this.Zcr = [i]),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发Tag", [
					"tagName",
					t,
				]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.Zcr,
			));
	}
	SetInputDistributeTags(t) {
		this.ClearInputDistributeTag();
		for (const i of t) this.Amr(i);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发Tag", [
				"tagNames",
				t,
			]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.Zcr,
			);
	}
	RemoveInputDistributeTag(t, i = !1) {
		var e = this.Imr(t);
		if (e)
			if (i) {
				var n = [];
				for (const t of this.Zcr) t.MatchTag(e.TagName) && n.push(t);
				for (const t of n) {
					var r = this.Zcr.indexOf(t);
					r < 0 || this.Zcr.splice(r, 1);
				}
			} else (t = this.Zcr.indexOf(e)) < 0 || this.Zcr.splice(t, 1);
	}
	ClearInputDistributeTag() {
		this.Zcr.length = 0;
	}
	IsAllowFightInput() {
		return this.IsAnyInputDistributeTagsMatchTag(
			this.Zcr,
			InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
		);
	}
	IsAllowFightMoveInput() {
		return this.IsTagMatchAnyInputDistributeTags(
			InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
				.MoveInputTag,
			this.Zcr,
		);
	}
	IsAllowFightActionInput() {
		return this.IsTagMatchAnyInputDistributeTags(
			InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
				.ActionInputTag,
			this.Zcr,
		);
	}
	IsAllowFightCameraRotationInput() {
		return this.IsTagMatchAnyInputDistributeTags(
			InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
				.CameraInput.CameraRotationTag,
			this.Zcr,
		);
	}
	IsAllowFightCameraZoomInput() {
		return this.IsTagMatchAnyInputDistributeTags(
			InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
				.CameraInput.CameraZoomTag,
			this.Zcr,
		);
	}
	IsAllowHeadRotation() {
		return (
			this.IsAllowFightInput() ||
			this.IsTagMatchAnyInputDistributeTags(
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
					.MouseInputTag,
				this.Zcr,
			)
		);
	}
	IsAllowUiInput() {
		return this.IsTagMatchAnyInputDistributeTags(
			InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
			this.Zcr,
		);
	}
	GetActionInputDistributeTagName(t) {
		return InputDistributeDefine_1.actionTagMap.get(t);
	}
}
exports.InputDistributeModel = InputDistributeModel;
