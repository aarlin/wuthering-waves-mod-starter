"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PcAndGamepadKeySettingPanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputSettings_1 = require("../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
	RouletteController_1 = require("../../Roulette/RouletteController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MenuController_1 = require("../MenuController"),
	KeySettingPanel_1 = require("./KeySettingPanel"),
	KeySettingRowData_1 = require("./KeySettingRowData"),
	PsGamepadItem_1 = require("./PsGamepadItem"),
	XboxGamepadItem_1 = require("./XboxGamepadItem");
class PcAndGamepadKeySettingPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.aPi = void 0),
			(this.hPi = void 0),
			(this.lPi = []),
			(this.gRn = []),
			(this.zGn = new Map()),
			(this.oPi = 0),
			(this.cPi = void 0),
			(this.mPi = void 0),
			(this.dPi = void 0),
			(this.CPi = new Map()),
			(this.gPi = 0),
			(this.fPi = []),
			(this.pPi = void 0),
			(this.vPi = void 0),
			(this.GamepadItem = void 0),
			(this.MPi = void 0),
			(this.Zbn = void 0),
			(this.SPi = () => {
				let e = this.oPi;
				(e = 1 === this.gPi ? this.EPi(2) : this.EPi(1)), this.Refresh(e);
			}),
			(this.yPi = () => {
				let e = this.oPi;
				(e = 1 === this.gPi ? this.EPi(2) : this.EPi(1)), this.Refresh(e);
			}),
			(this.IPi = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(179);
				e.FunctionMap.set(2, () => {
					InputSettingsManager_1.InputSettingsManager.ClearAllKeys(),
						InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(
							!0,
						),
						InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(!0),
						InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(
							!0,
						),
						InputSettings_1.InputSettings.SaveKeyMappings(),
						this.Refresh(this.oPi);
				}),
					ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
			}),
			(this.TPi = (e, t, i) => {
				this.aPi?.SelectKeySettingRow(i),
					0 !== (i = e.OpenViewType)
						? (1 === i &&
								RouletteController_1.RouletteController.OpenAssemblyView(1),
							this.LPi())
						: e.IsLock
							? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
									"KeyLock",
								),
								this.LPi())
							: ((this.cPi = e),
								(this.mPi = t),
								2 === e.BothActionName.length
									? ((i = {
											InputControllerType: this.oPi,
											KeySettingRowData: e,
											OnConfirmCallback: this.DPi,
										}),
										UiManager_1.UiManager.OpenView("ChangeActionTipsView", i),
										this.LPi())
									: this.RPi());
			}),
			(this.UPi = (e) => {
				1 !== this.oPi && (this.MPi = e) && (e = e.GetDisplayKeyName(this.oPi))
					? this.GamepadItem?.SetKeysEnable(e)
					: this.GamepadItem?.SetAllKeyDisable();
			}),
			(this.APi = (e) => {
				(1 !== this.oPi && this.MPi && this.MPi.ConfigId !== e?.ConfigId) ||
					this.GamepadItem?.SetAllKeyDisable();
			}),
			(this.PPi = (e, t, i) => {
				this.hPi?.SelectKeySettingRow(i),
					0 !== (i = e.OpenViewType)
						? (1 === i &&
								RouletteController_1.RouletteController.OpenAssemblyView(1),
							this.LPi())
						: e.IsLock
							? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
									"KeyLock",
								),
								this.LPi())
							: ((this.cPi = e),
								(this.mPi = t),
								2 === e.BothActionName.length
									? ((i = {
											InputControllerType: this.oPi,
											KeySettingRowData: e,
											OnConfirmCallback: this.DPi,
										}),
										UiManager_1.UiManager.OpenView("ChangeActionTipsView", i),
										this.LPi())
									: this.RPi());
			}),
			(this.DPi = (e) => {
				this.cPi &&
					e &&
					(this.cPi.ChangeBothAction(this.oPi),
					this.mPi?.Refresh(this.cPi, this.oPi),
					InputSettings_1.InputSettings.SaveKeyMappings()),
					this.LPi();
			}),
			(this.eUt = (e, t) => {
				if (
					!UiManager_1.UiManager.IsViewOpen("RepeatKeyTipsView") &&
					ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput
				) {
					t = t.KeyName.toString();
					var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
						InputMappingsDefine_1.actionMappings.放弃改键,
					);
					if (i && i.HasKey(t)) this.LPi();
					else if (this.cPi)
						if (this.cPi.IsLock)
							GenericPromptController_1.GenericPromptController.ShowPromptByCode(
								"KeyLock",
							),
								this.LPi();
						else if (e) this.xPi(t);
						else {
							if (1 < this.fPi.length) {
								if (!this.cPi.CanCombination)
									return (
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Test",
												8,
												"[KeySetting]改键失败，原因：该输入在配置上不允许修改成组合键",
												["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
											),
										GenericPromptController_1.GenericPromptController.ShowPromptByCode(
											"ErrorKey",
										),
										void this.wPi()
									);
								if (!this.cPi.IsAllowCombinationKey(this.fPi[0], this.fPi[1]))
									return (
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Test",
												8,
												"[KeySetting]改键失败，原因：尝试修改为组合输入，但不在允许设置的组合按键范围配置里内",
												["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
												["MainKey", this.fPi[0]],
												["SecondKey", this.fPi[1]],
											),
										GenericPromptController_1.GenericPromptController.ShowPromptByCode(
											"ErrorKey",
										),
										void this.wPi()
									);
							} else {
								if (!this.cPi.IsAllowKey(this.fPi[0]))
									return (
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Test",
												8,
												"[KeySetting]改键失败，原因：不在允许设置的组合按键范围配置里内",
												["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
												["this.EditKeyNameList[0]", this.fPi[0]],
											),
										GenericPromptController_1.GenericPromptController.ShowPromptByCode(
											"ErrorKey",
										),
										void this.wPi()
									);
								if (
									!MenuController_1.MenuController.IsInputControllerTypeIncludeKey(
										this.oPi,
										this.fPi[0],
									)
								)
									return (
										GenericPromptController_1.GenericPromptController.ShowPromptByCode(
											"ErrorKey",
										),
										void this.wPi()
									);
							}
							let n = this.gRn;
							(InputSettings_1.InputSettings.IsKeyboardKey(t) ||
								InputSettings_1.InputSettings.IsMouseButton(t)) &&
								(n = this.lPi);
							const s = this.BPi(n, this.fPi, this.cPi);
							if (s && s.IsCheckSameKey) {
								const t = [this.fPi[0]];
								(i = this.fPi[1]) && t.push(i),
									(e = {
										InputControllerType: this.oPi,
										CurrentKeySettingRowData: this.cPi,
										RepeatKeySettingRowData: s,
										OnCloseCallback: (e) => {
											var i, n, o, r, h;
											e
												? (this.LPi(),
													(e = this.cPi.GetCurrentKeyName(this.oPi)),
													s.IsActionOrAxis ||
													this.cPi.IsActionOrAxis ||
													s.GetActionOrAxisName() !==
														this.cPi.GetActionOrAxisName() ||
													s.IsCombination(this.oPi) ||
													this.cPi.IsCombination(this.oPi)
														? (s.SetKey(e, this.oPi),
															this.cPi.SetKey(t, this.oPi))
														: ((i = this.cPi.GetAxisKeyScaleMap()),
															(h = t[0]),
															(n = e[0]),
															(o = i.get(h)),
															(r = i.get(n)) && i.set(h, r),
															o && i.set(n, o),
															this.cPi.SetAxisBindingKeys(i)),
													(h = this.bPi())?.RefreshRow(this.cPi),
													h?.RefreshRow(s),
													this.ZGn(this.cPi, t),
													this.ZGn(s, e),
													InputSettings_1.InputSettings.SaveKeyMappings())
												: this.qPi(!0);
										},
									}),
									this.qPi(!1),
									UiManager_1.UiManager.OpenView("RepeatKeyTipsView", e);
							} else
								0 < this.fPi.length &&
									(this.cPi.SetKey(this.fPi, this.oPi),
									this.mPi?.Refresh(this.cPi, this.oPi),
									this.ZGn(this.cPi, this.fPi),
									InputSettings_1.InputSettings.SaveKeyMappings(),
									this.LPi());
						}
					else this.LPi();
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
			[10, UE.UIItem],
			[11, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.SPi],
				[1, this.yPi],
				[9, this.IPi],
			]);
	}
	async OnBeforeStartAsync() {
		(this.aPi = new KeySettingPanel_1.KeySettingPanel()),
			this.aPi.BindOnWaitInput(this.TPi),
			this.aPi.BindOnHover(this.UPi),
			this.aPi.BindOnUnHover(this.APi);
		var e = this.aPi.CreateByActorAsync(this.GetItem(6).GetOwner()),
			t =
				((this.hPi = new KeySettingPanel_1.KeySettingPanel()),
				this.hPi.BindOnWaitInput(this.PPi),
				this.hPi.BindOnHover(this.UPi),
				this.hPi.BindOnUnHover(this.APi),
				this.hPi.CreateByActorAsync(this.GetItem(5).GetOwner())),
			i =
				((this.pPi = new XboxGamepadItem_1.XboxGamepadItem()),
				this.pPi.CreateByResourceIdAsync(
					"UiItem_HandleSetXBox",
					this.GetItem(10),
				)),
			n =
				((this.vPi = new PsGamepadItem_1.PsGamepadItem()),
				this.vPi.CreateByResourceIdAsync(
					"UiItem_HandleSetPs",
					this.GetItem(10),
				));
		(this.Zbn = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7))),
			await Promise.all([e, t, i, n]);
	}
	OnStart() {
		var e = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
		e &&
			(this.zGn.clear(),
			this.GPi(),
			this.NPi(e),
			this.OPi(e),
			this.FPi(),
			this.Ore());
	}
	OnBeforeDestroy() {
		this.kre(),
			this.VPi(),
			this.Zbn?.Clear(),
			(this.Zbn = void 0),
			(this.aPi = void 0),
			(this.hPi = void 0),
			(this.cPi = void 0),
			(this.mPi = void 0),
			(this.pPi = void 0),
			(this.vPi = void 0),
			(this.GamepadItem = void 0),
			(this.MPi = void 0);
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnInputAnyKey,
			this.eUt,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnInputAnyKey,
			this.eUt,
		);
	}
	eOn(e, t) {
		var i = [];
		let n = e.ConnectedKeySettingId;
		for (; 0 !== n; ) {
			var s = this.tOn(n);
			if (!s) return i;
			s.SetKey(t, this.oPi), i.push(s), (n = s.ConnectedKeySettingId);
		}
		return i;
	}
	ZGn(e, t) {
		e = this.eOn(e, t);
		var i = this.bPi();
		for (const t of e) i?.RefreshRow(t);
	}
	GPi() {
		this.CPi.set(1, { DeviceType: 1, NameTextId: "Text_KeyBoard_Text" }),
			this.CPi.set(2, { DeviceType: 2, NameTextId: "Text_Handle_Text" });
	}
	NPi(e) {
		this.lPi.length = 0;
		var t = ConfigManager_1.ConfigManager.MenuBaseConfig;
		for (const o of e) {
			var i = o.TypeId,
				n = t.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 1) ?? [];
			i = t.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 0) ?? [];
			if (!((n = n.concat(i)).length <= 0)) {
				(i = new KeySettingRowData_1.KeySettingRowData()).InitializeKeyType(o),
					this.lPi.push(i),
					n.sort((e, t) => e.Id - t.Id);
				for (const e of n) {
					var s = new KeySettingRowData_1.KeySettingRowData();
					s.InitializeKeySetting(e), this.lPi.push(s), this.zGn.set(e.Id, s);
				}
			}
		}
	}
	OPi(e) {
		this.gRn.length = 0;
		var t = ConfigManager_1.ConfigManager.MenuBaseConfig;
		for (const o of e) {
			var i = o.TypeId,
				n = t.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 2) ?? [];
			i = t.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 0) ?? [];
			if (!((n = n.concat(i)).length <= 0)) {
				(i = new KeySettingRowData_1.KeySettingRowData()).InitializeKeyType(o),
					this.gRn.push(i),
					n.sort((e, t) => e.Id - t.Id);
				for (const e of n) {
					var s = new KeySettingRowData_1.KeySettingRowData();
					s.InitializeKeySetting(e), this.gRn.push(s), this.zGn.set(e.Id, s);
				}
			}
		}
	}
	Refresh(e) {
		this.oPi = e;
		var t = this.HPi(e);
		this.jPi(t), this.WPi(e), this.KPi(e);
	}
	jPi(e) {
		(this.gPi = e),
			(e = this.CPi.get(e)) &&
				((e = e.NameTextId),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e),
				1 === this.gPi
					? (this.GetButton(0)?.SetSelfInteractive(!1),
						this.GetButton(1)?.SetSelfInteractive(!0))
					: (this.GetButton(0)?.SetSelfInteractive(!0),
						this.GetButton(1)?.SetSelfInteractive(!1)));
	}
	WPi(e) {
		switch (e) {
			case 1:
				this.aPi?.Refresh(this.lPi, e),
					this.aPi?.SetActive(!0),
					this.hPi?.SetActive(!1),
					this.GetItem(4)?.SetUIActive(!0),
					this.GetItem(3)?.SetUIActive(!1);
				break;
			case 2:
				this.hPi?.Refresh(this.gRn, e),
					this.hPi?.SetActive(!0),
					this.aPi?.SetActive(!1),
					this.GetItem(4)?.SetUIActive(!1),
					this.GetItem(3)?.SetUIActive(!0);
		}
	}
	KPi(e) {
		(2 === e
			? 7 === ModelManager_1.ModelManager.PlatformModel.PlatformType
				? ((this.GamepadItem = this.vPi), this.vPi?.SetActive(!0), this.pPi)
				: ((this.GamepadItem = this.pPi), this.pPi?.SetActive(!0), this.vPi)
			: ((this.GamepadItem = void 0), this.vPi?.SetActive(!1), this.pPi)
		)?.SetActive(!1);
	}
	HPi(e) {
		switch (e) {
			case 1:
				return 1;
			case 2:
				return 2;
		}
		return 0;
	}
	EPi(e) {
		return 1 === e ? 1 : 2;
	}
	BPi(e, t, i) {
		if (!(t.length <= 0))
			for (const n of e) if (n !== i && n.HasKey(t, this.oPi)) return n;
	}
	RPi() {
		this.aPi?.StopScroll(),
			this.hPi?.StopScroll(),
			(this.dPi = TimerSystem_1.TimerSystem.Next(() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Test", 8, "[KeySetting]当等待键盘输入改键时"),
					this.GamepadItem?.SetAllKeyDisable(),
					(this.MPi = void 0),
					this.VPi(),
					this.qPi(!0),
					this.FPi("EditKey_Text");
			}));
	}
	LPi() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Test", 8, "[KeySetting]当输入改键结束时"),
			this.qPi(!1),
			this.VPi(),
			this.FPi(),
			this.bPi()?.SelectKeySettingRow(void 0),
			UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", !1);
	}
	xPi(e) {
		this.fPi.push(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[KeySetting]记录要设置的按键", [
					"EditKeyNameList",
					this.fPi,
				]);
	}
	qPi(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Test", 8, "[KeySetting]设置是否允许输入", ["isWait", e]),
			this.wPi(),
			(ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput = e),
			InputDistributeController_1.InputDistributeController.RefreshInputTag(),
			UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", e);
	}
	wPi() {
		this.fPi.length = 0;
	}
	VPi() {
		this.dPi &&
			TimerSystem_1.TimerSystem.Has(this.dPi) &&
			(TimerSystem_1.TimerSystem.Remove(this.dPi), (this.dPi = void 0));
	}
	FPi(e) {
		StringUtils_1.StringUtils.IsEmpty(e)
			? (this.GetItem(7)?.SetUIActive(!1),
				this.GetItem(11)?.SetUIActive(!0),
				this.Zbn.StopCurrentSequence())
			: (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e),
				this.GetItem(7)?.SetUIActive(!0),
				this.GetItem(11)?.SetUIActive(!1),
				this.Zbn.PlayLevelSequenceByName("Start"));
	}
	tOn(e) {
		return this.zGn.get(e);
	}
	bPi() {
		switch (this.oPi) {
			case 1:
				return this.aPi;
			case 2:
				return this.hPi;
		}
	}
}
exports.PcAndGamepadKeySettingPanel = PcAndGamepadKeySettingPanel;
