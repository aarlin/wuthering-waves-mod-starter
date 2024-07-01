"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSkillGamepadItem = void 0);
const InputEnums_1 = require("../../../Input/InputEnums"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	BattleSkillItem_1 = require("./BattleSkillItem"),
	BattleSkillSecondCdItem_1 = require("./BattleSkillSecondCdItem"),
	MAIN_KEY_NUM = 4;
class BattleSkillGamepadItem extends BattleSkillItem_1.BattleSkillItem {
	constructor() {
		super(...arguments),
			(this.GamepadData = void 0),
			(this.IsMainButton = !1),
			(this.HSe = ""),
			(this.Fet = !1),
			(this.Vet = void 0),
			(this.EPe = void 0),
			(this.Het = !1),
			(this.jet = void 0);
	}
	Initialize(t) {
		super.Initialize(t), (this.IsMainButton = t < 4);
	}
	async InitializeAsync() {
		await super.InitializeAsync(),
			this.IsMainButton &&
				((this.jet = new BattleSkillSecondCdItem_1.BattleSkillSecondCdItem()),
				this.jet.SetIndex(this.GetInputIndex()),
				await this.jet.CreateByResourceIdAsync(
					"UiItem_BattleSkillSecondCdItem",
					this.GetExtraContainer(),
				));
	}
	SetKeyName(t) {
		this.HSe = t;
	}
	Tick(t) {
		super.Tick(t), this.jet?.Tick(t);
	}
	Refresh(t) {
		var e = void 0 !== this.SkillButtonData || void 0 !== this.Vet;
		(this.Vet = void 0),
			t
				? (this.SkillButtonData !== t &&
						(this.OnCoolDownFinishedCallback = void 0),
					super.Refresh(t))
				: (!e && this.Fet) || ((this.Fet = !0), this.Wet());
	}
	Wet() {
		this.IsMainButton
			? ((this.SkillButtonData = void 0),
				this.SetSkillIcon(this.GamepadData.NoneIcon),
				this.RefreshSkillName(),
				this.ResetSkillCoolDown(),
				(this.SetTextureHandleId = 0),
				(this.OnCoolDownFinishedCallback = void 0),
				(this.KeyActionName = void 0),
				(this.KeyOperationType = void 0),
				(this.PressActionType = InputEnums_1.EInputAction.None),
				this.RefreshDynamicEffect(),
				this.CancelLoadDynamicEffectNiagara(),
				this.CancelLoadCdCompletedNiagara(),
				this.UltraComponent && this.UltraComponent.SetComponentActive(!1),
				this.NumComponent && this.NumComponent.SetComponentActive(!1),
				this.SwitchComponent && this.SwitchComponent.SetComponentActive(!1),
				this.IsShowOrShowing || this.Show())
			: this.Deactivate();
	}
	RefreshVisible() {
		this.IsMainButton
			? this.IsVisible()
				? this.IsShowOrShowing || this.Show()
				: this.Wet()
			: super.RefreshVisible();
	}
	RefreshEnable(t = !1) {
		this.Vet
			? this.SetSkillItemEnable(this.Vet.IsEnable, t)
			: super.RefreshEnable(t);
	}
	RefreshSkillCoolDown() {
		this.SkillButtonData
			? super.RefreshSkillCoolDown()
			: this.FinishSkillCoolDown();
	}
	RefreshByBehaviorButtonData(t) {
		(this.SkillButtonData = void 0),
			(this.Vet = t),
			this.ResetSkillCoolDown(),
			(this.SetTextureHandleId = 0),
			(this.OnCoolDownFinishedCallback = void 0),
			(this.PressActionType = InputEnums_1.EInputAction.None),
			this.RefreshDynamicEffect(),
			this.CancelLoadDynamicEffectNiagara(),
			this.CancelLoadCdCompletedNiagara(),
			this.UltraComponent && this.UltraComponent.SetComponentActive(!1),
			this.NumComponent && this.NumComponent.SetComponentActive(!1),
			this.SwitchComponent && this.SwitchComponent.SetComponentActive(!1),
			this.RefreshVisible(),
			this.RefreshSkillIcon(),
			this.RefreshSkillName(),
			this.RefreshKey(),
			this.RefreshEnable();
	}
	CheckSkillIconIsTexture(t) {
		return !!this.SkillButtonData && super.CheckSkillIconIsTexture(t);
	}
	RefreshSkillIcon() {
		this.Vet
			? this.SetSkillIcon(this.Vet.SkillIconPathList[this.Vet.State])
			: this.GamepadData.InWater && 5 === this.SkillButtonData?.GetButtonType()
				? this.SetSkillIcon(this.GamepadData.SwimIcon)
				: super.RefreshSkillIcon();
	}
	IsVisible() {
		return (
			!(
				this.GamepadData.GetIsPressCombineButton() &&
				("Gamepad_LeftTrigger" === this.HSe ||
					"Gamepad_RightTrigger" === this.HSe) &&
				!this.GamepadData.IsAim()
			) &&
			(this.Vet
				? this.Vet.IsVisible
				: !(
						11 !== this.SkillButtonData?.GetButtonType() ||
						!this.GamepadData.IsAim()
					) || super.IsVisible())
		);
	}
	Deactivate() {
		super.Deactivate(), (this.Fet = !1);
	}
	Reset() {
		this.EPe?.Clear(), (this.EPe = void 0), super.Reset();
	}
	RefreshKey() {
		if (this.IsMainButton) this.KeyItem.SetActive(!1);
		else {
			let e;
			if (this.Vet)
				(e = this.Vet.ActionName),
					this.KeyActionName !== e &&
						((t = { ActionOrAxisName: e }),
						this.KeyItem.RefreshByActionOrAxis(t),
						this.KeyItem.SetActive(!0),
						(this.KeyActionName = e));
			else if (
				((e = this.SkillButtonData.GetActionName()), this.KeyActionName !== e)
			) {
				let i = 0;
				e === InputMappingsDefine_1.actionMappings.攻击 &&
					"Gamepad_RightTrigger" === this.HSe &&
					(t =
						InputSettingsManager_1.InputSettingsManager.GetActionBinding(e)) &&
					(t.GetGamepadKeyNameList((t = [])), t) &&
					0 < t.length &&
					(i = t.indexOf(this.HSe)) < 0 &&
					(i = 0);
				var t = { ActionOrAxisName: e, Index: i };
				this.KeyItem.RefreshByActionOrAxis(t),
					this.KeyItem.SetActive(!0),
					(this.KeyActionName = e);
			}
		}
	}
	OnInputAction(t = !1) {
		this.Vet
			? this.Vet.IsEnable && this.Vet.IsVisible && this.ClickEffect?.Play()
			: super.OnInputAction(t);
	}
	PlayPressCombineButtonSeq() {
		this.Ket(),
			this.EPe.StopCurrentSequence(),
			this.EPe.PlaySequencePurely("ClickLbIn"),
			this.CombinePressTipSprite.SetUIActive(!0),
			(this.Het = !0),
			this.ClickEffect?.Stop();
	}
	PlayReleaseCombineButtonSeq() {
		this.Het &&
			((this.Het = !1),
			this.Ket(),
			this.EPe.StopCurrentSequence(),
			this.EPe.PlaySequencePurely("ClickLbOut"),
			this.CombinePressTipSprite.SetUIActive(!1),
			this.ClickEffect?.Stop());
	}
	Ket() {
		this.EPe ||
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	RefreshSecondCd(t) {
		this.jet?.RefreshSkillCoolDown(t);
	}
}
exports.BattleSkillGamepadItem = BattleSkillGamepadItem;
