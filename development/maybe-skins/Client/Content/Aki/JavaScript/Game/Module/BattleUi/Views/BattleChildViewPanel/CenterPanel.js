"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CenterPanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	AlterMarksView_1 = require("../AlterMarksView"),
	ExecutionPanel_1 = require("../Execution/ExecutionPanel"),
	GrapplingHookPoint_1 = require("../GrapplingHookPoint/GrapplingHookPoint"),
	Joystick_1 = require("../Joystick"),
	ScanTrackedMarksView_1 = require("../ScanTrackedMarksView"),
	TrackedMarksView_1 = require("../TrackedMarksView"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
	MoveSkillPanel_1 = require("./MoveSkillPanel"),
	GRAPPING_HOOK_SKILL_ID = 100020,
	HOOK_PHANTOM_ID = 1001,
	forbidMoveTagId = 1616400338;
class CenterPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.hYe = void 0),
			(this.lYe = void 0),
			(this._Ye = void 0),
			(this.uYe = []),
			(this.cYe = 0),
			(this.mYe = void 0),
			(this.dYe = void 0),
			(this.CYe = void 0),
			(this.gYe = !1),
			(this.fYe = void 0),
			(this.B8e = void 0),
			(this.pYe = void 0),
			(this.vYe = (e, t) => {
				var i = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
				i &&
					1001 === i &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Battle",
							18,
							"[HookPoint]角色发现钩锁点",
							["Found", e],
							["IsUsingHook", this.gYe],
						),
					this.gYe ||
						(e
							? (this.CYe && this.CYe.GetIsInterrupting()) || this.MYe(t)
							: this.SYe()));
			}),
			(this.EYe = (e, t, i) => {
				var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				n.Valid && e === n.Id && 100020 === t && (this.gYe = !0);
			}),
			(this.yYe = (e, t) => {
				!this.B8e?.Valid ||
					e !== this.B8e.Id ||
					100020 !== t ||
					((this.gYe = !1), this.CYe?.GetIsInterrupting()) ||
					this.IYe() ||
					this.SYe();
			}),
			(this.TYe = (e, t) => {
				var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				i.Valid && e === i.Id && 100020 === t && this.CYe?.Interrupt();
			}),
			(this.LYe = () => {
				this.B8e?.Valid &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Test",
							8,
							"[HookPoint]定点钩锁被打断后尝试激活定点钩锁Ui",
						),
					this.IYe() ||
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Test",
								8,
								"[HookPoint]定点钩锁被打断后找不到定点钩锁点",
							),
						this.SYe()));
			}),
			(this.DYe = () => {
				this.IYe() || this.SYe();
			}),
			(this.RYe = () => {
				var e = this.ChildViewData.GetChildVisible(17);
				this.GetItem(0).SetUIActive(e), this._Ye?.OnBattleHudVisibleChanged(e);
			}),
			(this.UYe = (e) => {
				this.GetItem(2).SetUIActive(e),
					this.GetItem(2).SetRaycastTarget(e),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"BattleUiSet",
							38,
							"轮盘界面显隐，设置CenterPanel遮罩",
							["bVisible", e],
						);
			}),
			(this.AYe = (e, t) => {
				e
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Battle", 18, "进入处决范围"),
						this.fYe ||
							((this.fYe = new ExecutionPanel_1.ExecutionPanel()),
							this.fYe.Init(this.RootItem)),
						this.fYe.ShowByEntity(t))
					: (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Battle", 18, "离开处决范围"),
						this.fYe?.HideByEntity(t));
			}),
			(this.PYe = (e) => {
				this.GetItem(0).SetUIActive(e),
					this.GetItem(1).SetUIActive(e),
					this.GetItem(2).SetUIActive(e);
			}),
			(this.o7e = () => {
				var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
				(this.B8e = e.EntityHandle),
					(this.pYe = this.B8e.Entity.GetComponent(87)),
					this.xYe();
			});
	}
	OnRegisterComponent() {
		var e = this.GetOperationType();
		2 === e
			? (this.ComponentRegisterInfos = [
					[0, UE.UIItem],
					[1, UE.UIItem],
					[2, UE.UIItem],
				])
			: 1 === e &&
				(this.ComponentRegisterInfos = [
					[0, UE.UIItem],
					[1, UE.UIItem],
					[2, UE.UIItem],
					[3, UE.UIItem],
				]);
	}
	InitializeTemp() {
		this.RYe(),
			(this.B8e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
			this.B8e?.Valid && (this.pYe = this.B8e.Entity.GetComponent(87));
	}
	async InitializeAsync() {
		await Promise.all([this.wYe(), this.BYe(), this.bYe(), this.qYe()]),
			this.GetItem(2).SetUIActive(!1),
			this.IYe();
	}
	OnShowBattleChildViewPanel() {
		this.mYe?.ShowBattleVisibleChildView(),
			this.hYe?.OnShowBattleChildViewPanel();
	}
	OnHideBattleChildViewPanel() {
		this.mYe?.HideBattleVisibleChildView(),
			this.hYe?.OnHideBattleChildViewPanel();
	}
	SetEventVisible(e) {}
	Reset() {
		(this.hYe = void 0),
			(this._Ye = void 0),
			(this.mYe = void 0),
			this.CYe?.Destroy(),
			(this.CYe = void 0),
			this.fYe?.Destroy(),
			(this.fYe = void 0),
			(this.uYe.length = 0),
			super.Reset();
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
			this.o7e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleFindFixHook,
				this.vYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUseSkill,
				this.EYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillEnd,
				this.yYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharInterruptSkill,
				this.TYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.DYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				this.UYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
				this.AYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GmOnlyShowJoyStick,
				this.PYe,
			),
			this.ChildViewData.AddCallback(17, this.RYe);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
			this.o7e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleFindFixHook,
				this.vYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharUseSkill,
				this.EYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillEnd,
				this.yYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharInterruptSkill,
				this.TYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.DYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				this.UYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
				this.AYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GmOnlyShowJoyStick,
				this.PYe,
			),
			this.ChildViewData.RemoveCallback(17, this.RYe);
	}
	OnTickBattleChildViewPanel(e) {
		this.mYe?.Tick(e), this.dYe?.Tick(e), this._Ye.Update(e);
	}
	OnAfterTickBattleChildViewPanel(e) {
		this.hYe?.Update(e), this.lYe.Update(), this.VYe();
	}
	MYe(e) {
		this.CYe && (this.CYe.Destroy(), (this.CYe = void 0));
		var t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
		(this.CYe = new GrapplingHookPoint_1.GrapplingHookPoint(e, t)),
			this.CYe.BindOnInterruptCompleted(this.LYe);
	}
	IYe() {
		var e;
		return !(
			!this.pYe?.Valid ||
			!this.HYe() ||
			!this.jYe(this.pYe) ||
			((e = this.pYe.GetNextTargetVector()), this.MYe(e), 0)
		);
	}
	GetExecutionItem() {
		return this.fYe?.GetExecutionItem();
	}
	jYe(e) {
		var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
		return !(
			!t ||
			1001 !== t ||
			!e.Valid ||
			!(t = e.GetNextTarget()) ||
			(t && !e.CanActivateFixHook()) ||
			!e.GetNextTargetVector()
		);
	}
	SYe() {
		this.CYe &&
			this.CYe.GetIsActivateHook() &&
			(this.CYe.Destroy(), (this.CYe = void 0));
	}
	HYe() {
		var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
		return !(!e || 1001 !== e);
	}
	VYe() {
		this.CYe &&
			this.pYe?.Valid &&
			(this.HYe() && this.jYe(this.pYe) ? this.CYe?.AfterTick() : this.SYe());
	}
	async wYe() {
		var e = this.GetItem(0);
		this.hYe = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			TrackedMarksView_1.TrackedMarksView,
		);
	}
	async BYe() {
		var e = this.GetItem(0);
		this.lYe = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			ScanTrackedMarksView_1.ScanTrackedMarksView,
		);
	}
	async bYe() {
		var e = this.GetItem(1);
		this._Ye = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			AlterMarksView_1.AlterMarksView,
		);
	}
	async qYe() {
		var e;
		1 === this.GetOperationType() &&
			((e = this.GetItem(3)),
			(this.mYe = await this.NewStaticChildViewAsync(
				e.GetOwner(),
				Joystick_1.Joystick,
			))),
			this.xYe();
	}
	xYe() {
		this.mYe &&
			(this.ClearAllTagSignificantChangedCallback(),
			this.ListenForTagSignificantChanged(this.B8e, 1616400338, (e, t) => {
				this.mYe.SetForbidMove(t);
			}),
			this.mYe.SetForbidMove(this.ContainsTag(this.B8e, 1616400338)));
		var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
		let t = 0;
		e?.RoleBattleViewInfo && (t = e.RoleBattleViewInfo.JoystickType),
			this.cYe !== t &&
				((this.cYe = t),
				this.mYe?.SetVisible(3, 0 === t),
				this.dYe && this.dYe.Destroy(),
				1 === t) &&
				((this.dYe = new MoveSkillPanel_1.MoveSkillPanel()),
				this.dYe.CreateDynamic(this.GetRootItem()));
	}
}
((exports.CenterPanel = CenterPanel).OYe = void 0),
	(CenterPanel.kYe = void 0),
	(CenterPanel.GYe = void 0),
	(CenterPanel.FYe = void 0),
	(CenterPanel.NYe = void 0);
