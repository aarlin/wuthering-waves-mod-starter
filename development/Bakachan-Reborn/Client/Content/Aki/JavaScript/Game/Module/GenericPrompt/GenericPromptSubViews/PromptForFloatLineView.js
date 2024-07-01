"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PromptForFloatLineView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class PromptForFloatLineView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Q$t = void 0),
			(this.X$t = void 0),
			(this.EPe = void 0),
			(this.ParamHub = void 0),
			(this.Wht = 0),
			(this.e8 = 0),
			(this.$$t = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.Q$t = this.GetText(0)
				.GetOwner()
				.GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
			(this.X$t = this.GetText(0)
				.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			this.Q$t?.SetSelectorOffset(1);
	}
	OnBeforeShow() {
		var e = ConfigManager_1.ConfigManager.GenericPromptConfig,
			t = this.ParamHub.TypeId;
		(e = e.GetPromptTypeMainTextColor(t)) && this.Y$t(e),
			this.Q$t?.SetSelectorOffset(1),
			this.X$t &&
				((e =
					0.5 *
					(t
						? ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(t)
						: ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
								t,
							)
					).Duration),
				(t =
					this.X$t.GetPlayTween().duration > e
						? e
						: this.X$t.GetPlayTween().duration),
				(this.X$t.GetPlayTween().duration = t),
				this.X$t?.Play());
	}
	async OnShowAsyncImplementImplement() {
		var e = new CustomPromise_1.CustomPromise();
		await this.EPe?.PlaySequenceAsync("Start", e);
	}
	async OnBeforeHideAsync() {
		this.Wht = 0;
		var e = new CustomPromise_1.CustomPromise();
		await this.EPe?.PlaySequenceAsync("Close", e);
	}
	OnAfterHide() {
		this.$$t?.(this);
	}
	Y$t(e) {
		var t = this.GetText(0)
			.GetOwner()
			.GetComponentByClass(UE.UIEffectOutline.StaticClass());
		t ? t.SetOutlineColor(e) : this.GetText(0).SetColor(e);
	}
	J$t(e, ...t) {
		var i = this.GetText(0);
		this.ParamHub.PromptId,
			LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TextKey, ...t);
	}
	z$t() {
		var e = ConfigManager_1.ConfigManager.GenericPromptConfig,
			t = this.ParamHub,
			i = t.MainTextParams ?? [];
		let o = t.MainTextObj;
		(o = t.PromptId
			? o ?? e.GetPromptMainTextObj(t.PromptId)
			: o ?? e.GetPromptTypeMainTextObj(t.TypeId)),
			i?.length || this.J$t(o),
			o || t.PromptId || !i?.length
				? this.J$t(o, ...i)
				: StringUtils_1.StringUtils.IsEmpty(i[0]) ||
					this.GetText(0).SetText(i[0]);
	}
	SetPromptHub(e) {
		(this.ParamHub = e),
			(e = ConfigManager_1.ConfigManager.GenericPromptConfig),
			(this.e8 = 0),
			(this.Wht = TimeUtil_1.TimeUtil.SetTimeMillisecond(
				e.GetPromptTypeInfo(this.ParamHub.TypeId).Duration,
			)),
			this.Z$t();
	}
	Z$t() {
		this.z$t(), this.RootItem.SetAsLastHierarchy();
	}
	SetHideCallback(e) {
		this.$$t = e;
	}
	ShowView() {
		if (this.IsShowOrShowing)
			return void 0 !== this.EPe?.GetCurrentSequence()
				? void this.EPe.ReplaySequenceByKey("Start")
				: void this.EPe.PlaySequencePurely("Start");
		this.SetActive(!0);
	}
	Tick(e) {
		this.Wht <= 0 || ((this.e8 += e), this.e8 > this.Wht && this.SetActive(!1));
	}
}
exports.PromptForFloatLineView = PromptForFloatLineView;
