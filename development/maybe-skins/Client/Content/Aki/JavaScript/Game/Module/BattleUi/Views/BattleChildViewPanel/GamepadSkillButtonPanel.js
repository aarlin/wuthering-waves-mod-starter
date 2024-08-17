"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamepadSkillButtonPanel = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	InputController_1 = require("../../../../Input/InputController"),
	InputEnums_1 = require("../../../../Input/InputEnums"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	BattleSkillCombineItem_1 = require("../BattleSkillCombineItem"),
	BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
	MAIN_KEY_NUM = 4;
class GamepadSkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.YJe = void 0),
			(this.JJe = []),
			(this.zJe = void 0),
			(this.ZJe = (e) => {
				this.eze();
			}),
			(this.tze = () => {
				this.ize();
			}),
			(this.oze = () => {
				this.zJe.RefreshButtonData(), this.eze();
			}),
			(this.rze = (e, t) => {
				this.Visible &&
					(e = this.nze(e)) &&
					e.GetSkillButtonData() &&
					e.RefreshEnable();
			}),
			(this.sze = (e) => {
				(e = this.nze(e))
					? (e.RefreshVisible(), e.RefreshKey())
					: (this.zJe.RefreshButtonData(), this.eze());
			}),
			(this.aze = (e) => {
				var t = this.nze(e);
				t ? t.GetSkillButtonData() && t.RefreshDynamicEffect() : this.hze(e);
			}),
			(this.lze = (e) => {
				var t,
					n =
						ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
							e,
						);
				n && ((t = this.nze(e)) ? t.Refresh(n) : this._ze(e));
			}),
			(this.uze = (e) => {
				(e = this.nze(e)) && e.RefreshAttribute(!0);
			}),
			(this.cze = (e) => {
				(e = this.nze(e)) && (e.RefreshSkillIcon(), e.RefreshSkillName());
			}),
			(this.mze = (e) => {
				var t = this.nze(e);
				t ? t.RefreshSkillCoolDown() : this._ze(e);
			}),
			(this.dze = (e) => {
				for (const t of this.JJe) t.PauseGame(e);
			}),
			(this.Cze = (e) => {
				101 === e &&
					(this.zJe.RefreshButtonData(),
					this.zJe.RefreshAimButtonVisible(),
					this.eze());
			}),
			(this.kJe = () => {
				for (const e of this.JJe) e.RefreshTimeDilation();
			}),
			(this.dKe = (e, t, n) => {
				this.SetVisible(
					5,
					ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
				),
					this.eze();
			}),
			(this.gze = (e) => {
				this.eze(), this.fze(), this.pze(e), this.vze();
			}),
			(this.bMe = (e, t) => {
				if (0 === t && e !== InputMappingsDefine_1.actionMappings.攻击) {
					let t,
						n = !1;
					if (e === InputMappingsDefine_1.actionMappings.手柄主攻击) t = 4;
					else if (e === InputMappingsDefine_1.actionMappings.手柄副攻击) {
						if (!this.zJe.IsAim()) return;
						(t = 11), (n = !0);
					} else t = this.zJe.GetButtonTypeByActionName(e);
					this.nze(t)?.OnInputAction(n);
				}
			}),
			(this.Mze = (e, t) => {
				this.Sze() &&
					InputController_1.InputController.InputAxis(
						InputEnums_1.EInputAxis.LookUp,
						-t,
					);
			}),
			(this.Eze = (e, t) => {
				this.Sze() &&
					InputController_1.InputController.InputAxis(
						InputEnums_1.EInputAxis.Turn,
						t,
					);
			}),
			(this.yze = (e) => {
				"InteractionHintView" === e && this.Ize();
			}),
			(this.$Ge = (e) => {
				"InteractionHintView" === e && this.Ize();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		];
	}
	InitializeTemp() {
		this.zJe = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
	}
	async InitializeAsync() {
		await this.Tze(),
			await this.NewAllBattleSkillItems(),
			this.Lze(),
			this.eze(),
			this.fze(),
			this.Ize();
	}
	Reset() {
		(this.JJe.length = 0), super.Reset();
	}
	OnAfterShow() {
		for (const e of this.JJe) e.RefreshEnable(!0);
	}
	OnShowBattleChildViewPanel() {
		for (const e of this.JJe) e.RefreshSkillCoolDownOnShow();
		this.vze();
	}
	OnTickBattleChildViewPanel(e) {
		if (this.Visible) for (const t of this.JJe) t.Tick(e);
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSkillButtonDataRefresh,
			this.ZJe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonDataClear,
				this.tze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
				this.oze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
				this.rze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
				this.sze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
				this.aze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
				this.lze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
				this.uze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
				this.cze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillButtonCdRefresh,
				this.mze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
				this.Cze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PauseGame,
				this.dze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				this.kJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
				this.kJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnViewDone,
				this.yze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
				this.gze,
			),
			InputDistributeController_1.InputDistributeController.BindActions(
				this.zJe.GetAllActionNameList(),
				this.bMe,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.MoveForward,
				this.Mze,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.MoveRight,
				this.Eze,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSkillButtonDataRefresh,
			this.ZJe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonDataClear,
				this.tze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
				this.oze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
				this.rze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
				this.sze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
				this.aze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
				this.lze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
				this.uze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
				this.cze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillButtonCdRefresh,
				this.mze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
				this.Cze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PauseGame,
				this.dze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				this.kJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
				this.kJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnViewDone,
				this.yze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
				this.gze,
			),
			InputDistributeController_1.InputDistributeController.UnBindActions(
				this.zJe.GetAllActionNameList(),
				this.bMe,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.MoveForward,
				this.Mze,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.MoveRight,
				this.Eze,
			);
	}
	Lze() {
		this.SetVisible(5, ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
			this.zJe.RefreshInteractBehaviorData(),
			this.zJe.RefreshAimState();
	}
	eze() {
		this.Dze(), this.Rze(), this.vze(), this.hze(7);
	}
	Dze() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel,
			t = this.zJe.CurButtonTypeList;
		for (let a = 0; a < 4; a++) {
			var n,
				i = t[a],
				s = this.JJe[a];
			i
				? (n = e.GetSkillButtonDataByButton(i))
					? n.GetSkillId() && n.IsVisible()
						? s.Refresh(n)
						: s.Refresh(void 0)
					: (n = this.zJe.GetBehaviorButtonDataByButtonType(i))?.IsVisible
						? s.RefreshByBehaviorButtonData(n)
						: s.Refresh(void 0)
				: s.Refresh(void 0);
		}
	}
	Rze() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel,
			t = this.zJe.CurButtonTypeList;
		for (let a = 4; a < this.JJe.length; a++) {
			var n,
				i = t[a],
				s = this.JJe[a];
			i
				? (n = e.GetSkillButtonDataByButton(i))
					? n.GetSkillId()
						? s.Refresh(n)
						: s.Deactivate()
					: ((n = this.zJe.GetBehaviorButtonDataByButtonType(i)),
						s.RefreshByBehaviorButtonData(n))
				: s.Deactivate();
		}
	}
	vze() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel,
			t = this.zJe.CurButtonTypeList,
			n = this.zJe.MainSkillCombineButtonTypeList;
		for (let l = 0; l < 4; l++) {
			var i = t[l],
				s = n[l],
				a = this.JJe[l];
			s && i !== s && (i = e.GetSkillButtonDataByButton(s))
				? a.RefreshSecondCd(i)
				: a.RefreshSecondCd(void 0);
		}
	}
	ize() {
		for (const e of this.JJe) e.Deactivate();
	}
	async NewAllBattleSkillItems() {
		var e = void 0;
		e = [
			this.GetItem(0).GetOwner(),
			this.GetItem(1).GetOwner(),
			this.GetItem(2).GetOwner(),
			this.GetItem(3).GetOwner(),
			this.GetItem(4).GetOwner(),
			this.GetItem(5).GetOwner(),
			this.GetItem(6).GetOwner(),
			this.GetItem(7).GetOwner(),
		];
		await Promise.all(
			e.map(async (e, t) => {
				(e = await this.Uze(e, t)).IsMainButton ||
					e.SetKeyName(this.zJe.ButtonKeyList[t]);
			}),
		);
	}
	async Tze() {
		var e = this.GetItem(8)?.GetOwner();
		e &&
			((this.YJe = new BattleSkillCombineItem_1.BattleSkillCombineItem()),
			await this.YJe.CreateByActorAsync(e));
	}
	async Uze(e, t) {
		return (
			((e = await this.NewStaticChildViewAsync(
				e,
				BattleSkillGamepadItem_1.BattleSkillGamepadItem,
				t,
			)).GamepadData = this.zJe),
			(this.JJe[t] = e)
		);
	}
	Aze(e) {
		return this.JJe[e];
	}
	nze(e) {
		if (
			!(
				(e =
					ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData.CurButtonTypeList.indexOf(
						e,
					)) < 0
			)
		)
			return this.Aze(e);
	}
	_ze(e) {
		var t;
		this.zJe.GetIsPressCombineButton() ||
			(0 <= (t = this.zJe.MainSkillCombineButtonTypeList.indexOf(e)) &&
				((t = this.Aze(t)),
				(e =
					ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
						e,
					)),
				t?.RefreshSecondCd(e)));
	}
	hze(e) {
		7 === e &&
			(!(0 < this.zJe.MainSkillButtonTypeList.indexOf(e)) &&
			0 <= this.zJe.MainSkillCombineButtonTypeList.indexOf(e)
				? ((e =
						ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
							e,
						)),
					this.YJe?.RefreshDynamicEffect(e))
				: this.YJe?.RefreshDynamicEffect(void 0));
	}
	fze() {
		this.YJe?.SetVisible(!this.zJe.GetIsPressCombineButton());
	}
	pze(e) {
		if (e)
			for (let e = 0; e < 4; e++)
				this.zJe.MainSkillCombineButtonTypeList[e] !==
					this.zJe.MainSkillButtonTypeList[e] &&
					this.JJe[e].PlayPressCombineButtonSeq();
		else for (let e = 0; e < 4; e++) this.JJe[e].PlayReleaseCombineButtonSeq();
	}
	Sze() {
		return (
			ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
			this.zJe.ControlCameraByMoveAxis
		);
	}
	Ize() {
		this.zJe.RefreshInteractBehaviorData();
		var e = this.nze(104);
		e && (e.IsMainButton || e.RefreshVisible(), e.RefreshEnable());
	}
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
