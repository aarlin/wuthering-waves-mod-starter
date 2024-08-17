"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeyItemBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	InputSettings_1 = require("../../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	DISABLE_ALPHA = 0.2;
class KeyItemBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.ActionName = void 0),
			(this.AxisName = void 0),
			(this.u_t = void 0),
			(this.HSe = void 0),
			(this.IsEnable = !1),
			(this.IsGray = !1),
			(this.dKe = () => {
				StringUtils_1.StringUtils.IsEmpty(this.ActionName)
					? StringUtils_1.StringUtils.IsEmpty(this.AxisName) ||
						this.RefreshAxis(this.AxisName)
					: this.RefreshAction(this.ActionName);
			}),
			(this.c_t = (t) => {
				StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
					this.ActionName !== t ||
					this.RefreshAction(this.ActionName);
			}),
			(this.m_t = (t) => {
				StringUtils_1.StringUtils.IsEmpty(this.AxisName) ||
					this.AxisName !== t ||
					this.RefreshAxis(this.AxisName);
			}),
			(this.d_t = (t, e) => {
				this.OnInputAction(t, e);
			});
	}
	OnStartImplement() {
		this.Ore();
	}
	OnBeforeDestroyImplement() {
		this.UnBindAction(), this.kre();
	}
	Reset() {
		(this.u_t = void 0),
			(this.HSe = void 0),
			(this.ActionName = void 0),
			(this.AxisName = void 0);
	}
	SetCustomKeyName(t) {
		this.u_t = t;
	}
	RefreshAction(t) {
		if (
			(this.UnBindAction(),
			(this.ActionName = t),
			(this.AxisName = void 0),
			this.u_t)
		)
			this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.u_t));
		else {
			if (
				!(t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
					this.ActionName,
				))
			)
				return void (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"[KeyItem]刷新按键图标时找不到对应Action",
						["actionName", this.ActionName],
					)
				);
			if (!(t = t.GetCurrentPlatformKey()))
				return void (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"[KeyItem]刷新按键图标时Action没有对应按键",
						["actionName", this.ActionName],
					)
				);
			this.RefreshKey(t);
		}
		this.BindAction();
	}
	RefreshAxis(t) {
		this.UnBindAction(),
			(this.AxisName = t),
			(this.ActionName = void 0),
			this.u_t
				? this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.u_t))
				: (t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t)) &&
					(t = t.GetCurrentPlatformKey()) &&
					this.RefreshKey(t.GetKey());
	}
	BindAction() {
		StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
			InputDistributeController_1.InputDistributeController.BindAction(
				this.ActionName,
				this.d_t,
			);
	}
	UnBindAction() {
		StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
			InputDistributeController_1.InputDistributeController.UnBindAction(
				this.ActionName,
				this.d_t,
			);
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActionKeyChanged,
				this.c_t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAxisKeyChanged,
				this.m_t,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActionKeyChanged,
				this.c_t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAxisKeyChanged,
				this.m_t,
			);
	}
	OnInputAction(t, e) {}
	RefreshKey(t) {
		var e = t.GetKeyName();
		this.HSe !== e &&
			((t = t.GetKeyIconPath()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					8,
					"[KeyItem]设置按键图片",
					["actionName", this.ActionName],
					["keyName", e],
					["keyTexturePath", t],
				),
			StringUtils_1.StringUtils.IsEmpty(t) ? this.SetKeyText(e) : this.C_t(t),
			(this.HSe = e));
	}
	RefreshKeyByName(t) {
		(t = InputSettings_1.InputSettings.GetKey(t)) && this.RefreshKey(t);
	}
	SetKeyText(t) {
		var e = this.GetKeyText();
		this.GetKeyTexture()?.SetUIActive(!1),
			e &&
				(StringUtils_1.StringUtils.IsEmpty(t)
					? e.SetUIActive(!1)
					: (e.SetText(t), e.SetUIActive(!0)));
	}
	SetLocalText(t, ...e) {
		var i = this.GetKeyText();
		this.GetKeyTexture()?.SetUIActive(!1),
			i &&
				(StringUtils_1.StringUtils.IsEmpty(t)
					? i.SetUIActive(!1)
					: (LguiUtil_1.LguiUtil.SetLocalText(i, t, ...e), i.SetUIActive(!0)));
	}
	C_t(t) {
		this.GetKeyText()?.SetUIActive(!1);
		const e = this.GetKeyTexture();
		e &&
			(e.SetUIActive(!1),
			StringUtils_1.StringUtils.IsEmpty(t) ||
				this.SetTextureByPath(t, e, void 0, () => {
					e.SetSizeFromTexture(), e.SetUIActive(!0);
				}));
	}
	SetEnable(t, e = !1) {
		(this.IsEnable === t && !e) ||
			(t ? this.RootItem.SetAlpha(1) : this.RootItem.SetAlpha(0.2),
			(this.IsEnable = t));
	}
	SetGray(t) {
		this.IsGray !== t && ((this.IsGray = t), this.OnSetGray());
	}
	OnSetGray() {}
}
exports.KeyItemBase = KeyItemBase;
