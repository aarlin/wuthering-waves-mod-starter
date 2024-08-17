"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonPanel = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	InputEnums_1 = require("../../../../Input/InputEnums"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	BattleSkillExploreItem_1 = require("../BattleSkillExploreItem"),
	BattleSkillItem_1 = require("../BattleSkillItem"),
	BehaviorButton_1 = require("../BehaviorButton"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
	INIT_OFFSET_X = -86,
	ITEM_WIDTH = 144,
	MOBILE_INDEX_EXPLORE_ITEM = 3,
	actionNameList = [
		InputMappingsDefine_1.actionMappings.大招,
		InputMappingsDefine_1.actionMappings.幻象1,
		InputMappingsDefine_1.actionMappings.幻象2,
		InputMappingsDefine_1.actionMappings.技能1,
		InputMappingsDefine_1.actionMappings.闪避,
		InputMappingsDefine_1.actionMappings.瞄准,
		InputMappingsDefine_1.actionMappings.锁定目标,
	];
class SkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.JJe = []),
			(this._Ze = new Map()),
			(this.uZe = void 0),
			(this.cZe = void 0),
			(this.GKe = !1),
			(this.mZe = (e) => {
				if (e) for (const e of this.JJe) e.RefreshEnable(!0);
			}),
			(this.gKe = (e, t) => {
				10031 === e && this.dZe(102)?.SetActive(t);
			}),
			(this.ZJe = (e) => {
				3 !== e && 2 !== e && (this.eze(), this.CZe());
			}),
			(this.tze = () => {
				this.ize();
			}),
			(this.oze = () => {
				this.eze(), this.CZe();
			}),
			(this.rze = (e, t) => {
				(e = this.GetBattleSkillItemByButtonType(e)) &&
					e.GetSkillButtonData() &&
					e.RefreshEnable();
			}),
			(this.sze = (e) => {
				(e = this.GetBattleSkillItemByButtonType(e)) &&
					e.GetSkillButtonData() &&
					(e.RefreshVisible(),
					e.RefreshKey(),
					ModelManager_1.ModelManager.PlatformModel.IsMobile() || this.CZe());
			}),
			(this.aze = (e) => {
				(e = this.GetBattleSkillItemByButtonType(e)) &&
					e.GetSkillButtonData() &&
					e.RefreshDynamicEffect();
			}),
			(this.lze = (e) => {
				var t =
					ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
						e,
					);
				t &&
					(e = this.GetBattleSkillItemByButtonType(e)) &&
					(t.GetSkillId() ? e.Refresh(t) : e.Deactivate(),
					ModelManager_1.ModelManager.PlatformModel.IsMobile() || this.CZe());
			}),
			(this.uze = (e) => {
				(e = this.GetBattleSkillItemByButtonType(e)) && e.RefreshAttribute(!0);
			}),
			(this.cze = (e) => {
				(e = this.GetBattleSkillItemByButtonType(e)) &&
					(e.RefreshSkillIcon(), e.RefreshSkillName());
			}),
			(this.mze = (e) => {
				(e = this.GetBattleSkillItemByButtonType(e)) &&
					e.RefreshSkillCoolDown();
			}),
			(this.Cze = (e) => {
				(e = this.dZe(e)) && e.RefreshVisible();
			}),
			(this.gZe = () => {
				this.fZe();
			}),
			(this.xie = (e, t) => {
				this.pZe(), this.fZe();
			}),
			(this.dze = (e) => {
				for (const t of this.JJe) t.PauseGame(e);
			}),
			(this.kJe = () => {
				for (const e of this.JJe) e.RefreshTimeDilation();
			}),
			(this.dKe = (e, t, n) => {
				this.SetVisible(
					5,
					!ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
				),
					this.eze(),
					this.CZe();
			}),
			(this.vZe = (e) => {
				if (e) for (const e of this.JJe) e.RefreshEnable(!0);
				else for (const e of this.JJe) e.DisableButton();
			}),
			(this.MZe = (e) => {
				ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList &&
					!ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom() &&
					this.GKe !== e &&
					this.SZe(e, !0);
			}),
			(this.bMe = (e, t) => {
				if (0 === t)
					if (e === InputMappingsDefine_1.actionMappings.瞄准)
						this._Ze.get(101)?.OnInputAction();
					else if (e === InputMappingsDefine_1.actionMappings.锁定目标)
						this._Ze.get(102)?.OnInputAction();
					else
						for (const t of this.JJe) {
							var n = t.GetSkillButtonData();
							if (n && n.GetActionName() === e) return void t.OnInputAction();
						}
			});
	}
	OnRegisterComponent() {
		switch (this.GetOperationType()) {
			case 2:
				this.ComponentRegisterInfos = [
					[0, UE.UIItem],
					[1, UE.UIItem],
					[2, UE.UIItem],
					[3, UE.UIItem],
					[4, UE.UIItem],
					[5, UE.UIItem],
					[6, UE.UIItem],
					[7, UE.UIItem],
				];
				break;
			case 1:
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
					[9, UE.UIItem],
					[10, UE.UIItem],
				];
		}
	}
	async InitializeAsync() {
		await Promise.all([this.NewAllBattleSkillItems(), this.EZe()]),
			this.SetVisible(
				5,
				!ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
			),
			this.eze(),
			this.pZe(),
			this.fZe(),
			this.CZe();
	}
	Reset() {
		(this.JJe.length = 0), super.Reset(), (this.cZe = void 0);
	}
	OnAfterShow() {
		for (const e of this.JJe) e.RefreshEnable(!0), e.UpdateAlpha();
		for (const e of this._Ze.values()) e.UpdateAlpha();
	}
	OnHideBattleChildViewPanel() {
		for (const e of this.JJe) e.IsShowOrShowing && e.TryReleaseButton();
	}
	OnShowBattleChildViewPanel() {
		for (const e of this.JJe) e.RefreshSkillCoolDownOnShow();
	}
	OnTickBattleChildViewPanel(e) {
		if (this.Visible) for (const t of this.JJe) t.Tick(e);
	}
	eze() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel,
			t = e.GetButtonTypeList();
		for (let a = 0; a < this.JJe.length; a++) {
			var n = t[a],
				i = this.JJe[a],
				s = e.GetSkillButtonDataByButton(n);
			s
				? !n || n < 0 || !s.GetSkillId()
					? i.Deactivate()
					: i.Refresh(s)
				: i.Deactivate();
		}
	}
	ize() {
		for (const e of this.JJe) e.Deactivate();
	}
	async NewAllBattleSkillItems() {
		let e;
		var t = this.GetOperationType();
		2 === t
			? (e = [
					this.GetItem(0).GetOwner(),
					this.GetItem(1).GetOwner(),
					this.GetItem(2).GetOwner(),
					this.GetItem(3).GetOwner(),
					this.GetItem(4).GetOwner(),
					this.GetItem(5).GetOwner(),
				])
			: 1 === t &&
				(e = [
					this.GetItem(0).GetOwner(),
					this.GetItem(1).GetOwner(),
					this.GetItem(2).GetOwner(),
					this.GetItem(3).GetOwner(),
					this.GetItem(4).GetOwner(),
					this.GetItem(5).GetOwner(),
					this.GetItem(6).GetOwner(),
					this.GetItem(9).GetOwner(),
					this.GetItem(10).GetOwner(),
				]);
		const n = 1 === t;
		await Promise.all(e.map(async (e, t) => this.Uze(e, t, n)));
	}
	async Uze(e, t, n) {
		let i;
		return (
			(i =
				n && 3 === t
					? await this.NewStaticChildViewAsync(
							e,
							BattleSkillExploreItem_1.BattleSkillExploreItem,
							t,
						)
					: await this.NewStaticChildViewAsync(
							e,
							BattleSkillItem_1.BattleSkillItem,
							t,
						)),
			this.JJe.push(i),
			i
		);
	}
	Aze(e) {
		return this.JJe[e];
	}
	GetBattleSkillItemByButtonType(e) {
		if (
			!(
				(e =
					ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonIndexByButton(
						e,
					)) < 0
			)
		)
			return this.Aze(e);
	}
	async EZe() {
		var e,
			t,
			n = this.GetOperationType();
		2 === n
			? ((e = this.GetItem(6)),
				(t = this.GetItem(7)),
				await Promise.all([
					this.yZe(
						e.GetOwner(),
						101,
						InputEnums_1.EInputAction[InputEnums_1.EInputAction.瞄准],
						!0,
					),
					this.yZe(
						t.GetOwner(),
						102,
						InputEnums_1.EInputAction[InputEnums_1.EInputAction.锁定目标],
					),
				]))
			: 1 === n &&
				((e = this.GetItem(8)),
				(t = this.GetItem(7)),
				await Promise.all([
					this.yZe(e.GetOwner(), 101, void 0, !0),
					this.yZe(t.GetOwner(), 102),
				]));
	}
	async yZe(e, t, n, i = !1) {
		return (
			(n = { InputActionType: t, ActionName: n, IsToggle: i }),
			(i = await this.NewStaticChildViewAsync(
				e,
				BehaviorButton_1.BehaviorButton,
				n,
			)),
			this._Ze.set(t, i),
			i
		);
	}
	pZe() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel;
		for (const n of this._Ze.values()) {
			var t = e.GetBehaviorButtonDataByButton(n.BehaviorType);
			n.Refresh(t);
		}
	}
	fZe() {
		var e,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t?.Valid &&
			((t = t.Entity.GetComponent(158).DirectionState),
			(e = this.dZe(101)) &&
				(t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
					? e.SetBehaviorToggleState(1)
					: e.SetBehaviorToggleState(0)),
			(e = this.dZe(102))) &&
			(t === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection
				? e.SetBehaviorToggleState(1)
				: e.SetBehaviorToggleState(0));
	}
	dZe(e) {
		return this._Ze.get(e);
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
			this.mZe,
		),
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
				EventDefine_1.EEventName.OnAimStateChanged,
				this.gZe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
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
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
				this.vZe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiExploreModeChanged,
				this.MZe,
			),
			2 === this.GetOperationType() &&
				InputDistributeController_1.InputDistributeController.BindActions(
					actionNameList,
					this.bMe,
				);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
			this.mZe,
		),
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
				EventDefine_1.EEventName.OnAimStateChanged,
				this.gZe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
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
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
				this.vZe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiExploreModeChanged,
				this.MZe,
			),
			2 === this.GetOperationType() &&
				InputDistributeController_1.InputDistributeController.UnBindActions(
					actionNameList,
					this.bMe,
				);
	}
	CZe() {
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetIsInExploreMode();
		if (
			ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList ||
			ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom()
		)
			return this.GKe === e &&
				ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? void 0
				: void this.SZe(e);
		this.GKe && this.SZe(!1);
	}
	SZe(e, t = !1) {
		var n = !(this.GKe = e);
		this._Ze.get(101)?.SetVisibleByExploreMode(n, t),
			this._Ze.get(102)?.SetVisibleByExploreMode(n, t),
			this.JJe[1]?.SetVisibleByExploreMode(n, t),
			this.JJe[2]?.SetVisibleByExploreMode(n, t),
			ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? this.JJe[4]?.SetVisibleByExploreMode(n, t)
				: (this.JJe[3]?.SetVisibleByExploreMode(n, t), this.IZe(e, t));
	}
	IZe(e, t = !1) {
		let n = -86;
		if (e) {
			let e = 0;
			for (let t = 1; t < 4; t++) this.JJe[t].IsShowOrShowing && e++;
			n += 144 * e;
		}
		t
			? (this.cZe
					? this.cZe.Stop()
					: (this.cZe = this.RootActor.GetComponentByClass(
							UE.LGUIPlayTweenComponent.StaticClass(),
						)),
				((e = this.cZe.GetPlayTween()).from = this.RootItem.GetAnchorOffsetX()),
				(e.to = n),
				this.cZe.Play())
			: (this.cZe && this.cZe.Stop(), this.RootItem?.SetAnchorOffsetX(n));
	}
}
(exports.SkillButtonPanel = SkillButtonPanel).RKe = void 0;
