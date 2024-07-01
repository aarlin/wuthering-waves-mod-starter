"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
	IconKeyComponent_1 = require("../KeyComponent/IconKeyComponent"),
	UiNavigationUtil_1 = require("../UiNavigationUtil");
class HotKeyComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.HotKeyMapIndex = 0),
			(this.CurComponent = void 0),
			(this.IsPress = !1),
			(this.IsAction = !0),
			(this.hbo = void 0),
			(this.lbo = 0),
			(this.HotKeyTextId = void 0),
			(this.w9t = void 0),
			(this._bo = void 0),
			(this.c_t = (e) => {
				var t = this.GetActionName();
				StringUtils_1.StringUtils.IsEmpty(t) || t !== e || this.ubo();
			}),
			(this.cbo = !1),
			(this.mbo = !1),
			(this.HotKeyMapIndex = e),
			(this.hbo =
				ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(
					this.HotKeyMapIndex,
				));
	}
	OnBeforeCreateImplement() {
		this.OnInit();
	}
	async OnBeforeStartAsync() {
		(this.mbo = "LongTimeToTrigger" === this.w9t),
			(this.CurComponent = new IconKeyComponent_1.IconKeyComponent()),
			this.CurComponent.SetIsNeedLongPress(this.mbo),
			this.CurComponent.SetKeyName(this.dbo()),
			await this.CurComponent.CreateThenShowByActorAsync(this.RootActor),
			(this._bo = UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
				this.CurComponent.GetRootActor(),
			));
	}
	dbo() {
		var e = this.GetHotKeyConfig();
		return e && 2 !== ModelManager_1.ModelManager.PlatformModel.InputController
			? this.uot(e)
			: "";
	}
	Cbo() {
		return 0 === this.lbo;
	}
	gbo(e) {
		e ? this.OnRefreshMode() : this.IsPress && this.ReleaseWithoutCheck(),
			this.CurComponent.SetActive(e);
	}
	OnRefreshMode() {
		this.fbo(), this.RefreshHotKeyNameText();
	}
	fbo() {
		var e = this.GetHotKeyConfig();
		e &&
			(2 === ModelManager_1.ModelManager.PlatformModel.InputController
				? this.CurComponent.SetActive(!1)
				: ((e = this.uot(e)),
					this.CurComponent.RefreshKeyIcon(e),
					this.CurComponent.SetActive(!0)));
	}
	ubo() {
		var e = this.GetHotKeyConfig();
		e &&
			2 !== ModelManager_1.ModelManager.PlatformModel.InputController &&
			((e = this.uot(e)), this.CurComponent.RefreshKeyIcon(e));
	}
	GetHotKeyConfig() {
		return this.hbo;
	}
	uot(e) {
		var t = e.ActionName;
		e = e.AxisName;
		return !StringUtils_1.StringUtils.IsEmpty(t) && this.IsAction
			? InputSettingsManager_1.InputSettingsManager.GetActionBinding(
					t,
				).GetCurrentPlatformKeyByIndex(0)?.KeyName
			: StringUtils_1.StringUtils.IsEmpty(e)
				? void 0
				: InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
						e,
					).GetCurrentPlatformKeyByIndex(0)?.KeyName;
	}
	pbo(e, t) {
		ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiNavigationHotKey",
				11,
				"[LogicMode]模式设置",
				["配置id", this.HotKeyMapIndex],
				["Tag", this.GetBindButtonTag()],
				["模式", HotKeyViewDefine_1.logicModeLogString[e]],
				["值", t],
			),
			t ? this.lbo & e && (this.lbo = this.lbo ^ e) : (this.lbo = this.lbo | e);
	}
	RefreshHotKeyNameText() {
		var e = this.HotKeyTextId ?? this.GetHotKeyConfig().TextId;
		this.CurComponent.RefreshNameText(e);
	}
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetActiveListenerByTag(t)), this.SetVisibleMode(2, void 0 !== e));
	}
	OnRefreshHotKeyText(e) {}
	OnRefreshHotKeyTextId(e) {
		var t;
		this.CurComponent.GetIsForceSetText() ||
			((t = this.GetBindButtonTag()), StringUtils_1.StringUtils.IsEmpty(t)) ||
			((e = e.GetActiveListenerByTag(t)?.GetTipsTextIdByState()),
			this.SetHotKeyTextId(e),
			this.RefreshHotKeyNameText());
	}
	OnRefreshHotKeyShield(e) {
		(e = e.GetFocusListener()),
			this.SetVisibleMode(
				8,
				!e?.ShieldHotKeyIndexArray.Contains(this.HotKeyMapIndex),
			);
	}
	vbo(e = !1) {
		var t,
			o = this.hbo.ApplicableType;
		0 === o
			? this.SetVisibleMode(64, !0, !0)
			: 1 === o
				? this.SetVisibleMode(
						64,
						ModelManager_1.ModelManager.PlatformModel.IsPc(),
						e,
					)
				: 2 === o
					? this.SetVisibleMode(
							64,
							ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
							e,
						)
					: 3 === o
						? ((t = ModelManager_1.ModelManager.PlatformModel.IsPc()),
							this.RootItem.SetAlpha(t ? 0 : 1),
							this.SetVisibleMode(64, !0, e),
							ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiNavigationHotKey",
									11,
									"仅键鼠透明",
									["配置id", this.HotKeyMapIndex],
									["Tag", this.GetBindButtonTag()],
								))
						: 4 === o
							? ((t = ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
								this.RootItem.SetAlpha(t ? 0 : 1),
								this.SetVisibleMode(64, !0, e),
								ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"UiNavigationHotKey",
										11,
										"仅手柄透明",
										["配置id", this.HotKeyMapIndex],
										["Tag", this.GetBindButtonTag()],
									))
							: 5 === o &&
								((t = ModelManager_1.ModelManager.PlatformModel.IsPc()),
								(e = ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
								this.RootItem.SetAlpha(t || e ? 0 : 1),
								this.SetVisibleMode(64, !0, !0),
								ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog) &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiNavigationHotKey",
									11,
									"键盘和手柄透明",
									["配置id", this.HotKeyMapIndex],
									["Tag", this.GetBindButtonTag()],
								);
	}
	InitHotKeyLogicMode() {
		var e = ModelManager_1.ModelManager.PlatformModel.InputController;
		this.SetVisibleMode(16, 2 !== e),
			this.SetVisibleMode(2, !1, !0),
			this.vbo();
	}
	RegisterMe() {
		this.AddEventListener(), this.ubo();
	}
	UnRegisterMe() {
		this.RemoveEventListener(),
			this.OnUnRegisterMe(),
			this.Mbo(this.GetAxisName());
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnActionKeyChanged,
			this.c_t,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnActionKeyChanged,
			this.c_t,
		);
	}
	SetVisibleMode(e, t, o = !1) {
		var i = this.lbo;
		this.pbo(e, t),
			(this.lbo === i && !o) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiNavigationHotKey",
						11,
						"[LogicMode]当前设置可见性模式",
						["配置id", this.HotKeyMapIndex],
						["this.LogicMode", MathUtils_1.MathUtils.DecimalToBinary(this.lbo)],
						["lastLogicMode", MathUtils_1.MathUtils.DecimalToBinary(i)],
						["Tag", this.GetBindButtonTag()],
						["Path", this._bo],
					),
				this.gbo(this.Cbo()));
	}
	SetHotKeyDescTextForce(e) {
		this.CurComponent.SetNameTextForce(!0), this.CurComponent.SetNameText(e);
	}
	ResetHotKeyDescTextForce() {
		this.CurComponent.SetNameTextForce(!1);
	}
	SetHotKeyTextId(e) {
		StringUtils_1.StringUtils.IsEmpty(e)
			? (this.HotKeyTextId = void 0)
			: (this.HotKeyTextId = e);
	}
	IsHotKeyActive() {
		return 0 === this.lbo;
	}
	IsAllowTickContinue() {
		return 0 === this.lbo || this.cbo;
	}
	RefreshMode() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiNavigationHotKey", 11, "切换了控制器,强制刷新表现"),
			this.vbo(!0);
	}
	Press() {
		this.Cbo() && ((this.IsPress = !0), this.OnPress(this.GetHotKeyConfig()));
	}
	Release() {
		this.Cbo() && this.IsPress && this.ReleaseWithoutCheck();
	}
	ReleaseWithoutCheck() {
		this.IsPress = !1;
		var e = this.GetHotKeyConfig();
		this.OnRelease(e);
	}
	InputAxis(e, t) {
		this.Cbo() ? (this.Sbo(e), this.OnInputAxis(e, t)) : this.Mbo(e);
	}
	Sbo(e) {
		this.cbo || ((this.cbo = !0), this.OnStartInputAxis(e));
	}
	Mbo(e) {
		this.cbo && ((this.cbo = !1), this.OnFinishInputAxis(e));
	}
	GetBindButtonTag() {
		return this.hbo?.BindButtonTag;
	}
	GetActionName() {
		return this.hbo?.ActionName;
	}
	GetAxisName() {
		return this.hbo?.AxisName;
	}
	IsAxisAllDirection() {
		return 0 === this.hbo?.AxisDirection;
	}
	IsAxisPositive() {
		return 1 !== this.hbo?.AxisDirection;
	}
	IsAxisReverse() {
		return 2 !== this.hbo?.AxisDirection;
	}
	SetHotKeyFunctionType(e) {
		this.w9t = e;
	}
	GetHotKeyFunctionType() {
		return this.w9t;
	}
	RefreshSelfHotKeyState(e) {
		this.OnRefreshHotKeyShield(e), this.OnRefreshSelfHotKeyState(e), this.vbo();
	}
	RefreshSelfHotKeyText(e) {
		this.OnRefreshHotKeyText(e), this.OnRefreshHotKeyTextId(e);
	}
	SetHotKeyType(e) {
		this.CurComponent.SetHotKeyType(e);
	}
	Clear() {
		this.OnClear();
	}
	OnInit() {}
	OnUnRegisterMe() {}
	OnClear() {}
	OnPress(e) {}
	OnRelease(e) {}
	OnInputAxis(e, t) {}
	OnStartInputAxis(e) {}
	OnFinishInputAxis(e) {}
	ResetPressState() {
		!this.mbo && this.IsPress && (this.IsPress = !1);
	}
}
exports.HotKeyComponent = HotKeyComponent;
