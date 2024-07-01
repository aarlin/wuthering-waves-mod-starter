"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
	CursorData_1 = require("./Data/CursorData"),
	UiNavigationGlobalData_1 = require("./New/UiNavigationGlobalData");
class UiNavigationModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Lwo = new CursorData_1.Cursor()),
			(this.IsOpenLog = !1),
			(this.Fbo = new Map()),
			(this.Vbo = new Map()),
			(this.Hbo = new Set()),
			(this.jbo = void 0);
	}
	InputControllerModeChange() {
		for (const e of this.Fbo.values()) for (const t of e) t.RefreshMode();
		for (const e of this.Hbo) e.ChangeAlpha();
	}
	OnClear() {
		return (
			this.ClearCursor(),
			UiNavigationGlobalData_1.UiNavigationGlobalData.ClearBlockListener(),
			!0
		);
	}
	SetCursorFollowItem(e) {
		this.Lwo.SetFollowItem(e);
	}
	SetIsUseMouse(e) {
		this.Lwo.SetIsUseMouse(e);
	}
	MarkMoveInstantly() {
		this.Lwo.IsMoveInstantly = !0;
	}
	SetCursorActiveDelayTime(e) {
		this.Lwo.SetCursorActiveDelayTime(e);
	}
	RepeatMove() {
		this.Lwo.RepeatMove();
	}
	ClearCursor() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 11, "清理光标"),
			this.Lwo.Clear();
	}
	OnLeaveLevel() {
		return this.ClearCursor(), !0;
	}
	Tick(e) {
		this.Lwo.Tick(e);
	}
	AddActionHotKeyComponent(e, t) {
		this.Fbo.set(e, t);
	}
	GetActionHotKeyComponentSet(e) {
		return this.Fbo.get(e);
	}
	GetOrAddActionHotKeyComponentSet(e) {
		let t = this.Fbo.get(e);
		return t || ((t = new Set()), this.AddActionHotKeyComponent(e, t)), t;
	}
	Wbo(e, t) {
		var o = [];
		InputSettingsManager_1.InputSettingsManager.GetActionBinding(
			e,
		).GetCurrentPlatformKeyNameList(o);
		for (const e of o) if (t.has(e)) return !0;
		return !1;
	}
	Kbo(e) {
		var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(e);
		if (t) return t.GetCurrentPlatformKeyNameList((t = [])), t;
		InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
			e,
		);
	}
	CheckKeyNameListInNavigation(e) {
		var t = this.Kbo(e);
		if (t) {
			var o,
				i,
				n = new Set(t);
			for ([o, i] of this.Fbo)
				if (e !== o && this.Wbo(o, n))
					for (const t of i)
						if (t.IsHotKeyActive())
							return (
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"UiNavigation",
										11,
										"非导航输入被导航输入占用",
										["非导航输入", e],
										["导航输入", o],
									),
								!0
							);
		}
		return !1;
	}
	AddAxisHotKeyComponent(e, t) {
		this.Vbo.set(e, t);
	}
	GetAxisHotKeyComponentSet(e) {
		return this.Vbo.get(e);
	}
	GetOrAddAxisHotKeyComponentsSet(e) {
		let t = this.Vbo.get(e);
		return t || ((t = new Set()), this.AddAxisHotKeyComponent(e, t)), t;
	}
	AddPlatformListener(e) {
		this.Hbo.add(e);
	}
	RemovePlatformListener(e) {
		this.Hbo.delete(e);
	}
	get GuideFocusListener() {
		return this.jbo;
	}
	SetGuideFocusListener(e) {
		this.jbo = e;
	}
	ResetGuideFocusListener() {
		this.jbo = void 0;
	}
}
exports.UiNavigationModel = UiNavigationModel;
