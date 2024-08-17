"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RoleDefine_1 = require("../../RoleUi/RoleDefine"),
	SceneTeamController_1 = require("../../SceneTeam/SceneTeamController"),
	SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine"),
	BattleUiDefine_1 = require("../BattleUiDefine"),
	BattleUiRoleData_1 = require("../BattleUiRoleData"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView"),
	FormationLevelUpItem_1 = require("./FormationLevelUpItem"),
	FormationOnlineItem_1 = require("./FormationOnlineItem"),
	FormationTrialItem_1 = require("./FormationTrialItem"),
	CombineKeyItem_1 = require("./KeyItem/CombineKeyItem");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
	REFRESH_COOLDOWN_INTERVAL = 100,
	CURE_DELAY = 1e3,
	LOW_HP_PERCENT = 0.2,
	LEVE_UP_TIME = 5e3;
class FormationItem extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Art = void 0),
			(this.RoleData = void 0),
			(this.EntityId = void 0),
			(this.FormationIns = void 0),
			(this.RoleConfig = void 0),
			(this.jQe = []),
			(this.ast = 0),
			(this.hst = 0),
			(this.lst = 0),
			(this._st = void 0),
			(this.ust = void 0),
			(this.cst = void 0),
			(this.mst = ""),
			(this.dst = !1),
			(this.Cst = void 0),
			(this.gst = 0),
			(this.xet = void 0),
			(this.fst = void 0),
			(this.pst = void 0),
			(this.vst = void 0),
			(this.Mst = !1),
			(this.Sst = !1),
			(this.Est = !1),
			(this.yst = (t) => {
				2 === ModelManager_1.ModelManager.PlatformModel.OperationType &&
					((t *= TimeUtil_1.TimeUtil.InverseMillisecond), this.Ist(t, t));
			}),
			(this.ZQe = () => {
				this.RoleData && this.RefreshRoleHealthPercent();
			}),
			(this.YKe = (t) => {
				this.RoleData && this.EntityId === t && this.RefreshRoleHealthPercent();
			}),
			(this.Tst = () => {
				this.Lst();
			}),
			(this.XQe = (t, e, i) => {
				!this.FormationIns ||
					(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
						1 <
							ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
								.length) ||
					this.Dst();
			}),
			(this.QQe = (t, e, i) => {
				this.RefreshQteActive();
			}),
			(this.$Qe = (t, e, i) => {
				this.RefreshQteActive();
			}),
			(this.Rst = (t, e) => {
				this.RefreshQteActive();
			}),
			(this.Zpe = () => {
				this.RefreshQteActive();
			}),
			(this.Ust = (t, e) => {
				this.FormationIns && this.Ast();
			}),
			(this.Pst = (t, e) => {
				this.xst();
			}),
			(this.wst = () => {
				this.Bst();
			}),
			(this.bst = () => {
				this.GetItem(4).SetUIActive(!1);
			}),
			(this.qst = () => {
				this.Gst();
			}),
			(this.WQe = (t, e, i) => {
				t === this.EntityId && e === this.ust && this.RoleData && this.Gnt(i);
			}),
			(this.KQe = (t, e, i) => {
				t === this.EntityId && this.RefreshElementVisible();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UINiagara],
			[9, UE.UITexture],
			[12, UE.UISprite],
			[17, UE.UISprite],
			[13, UE.UISprite],
			[14, UE.UIItem],
			[15, UE.UITexture],
			[16, UE.UISprite],
			[6, UE.UIItem],
			[10, UE.UIItem],
			[7, UE.UINiagara],
			[8, UE.UIText],
			[11, UE.UISprite],
			[18, UE.UIItem],
			[19, UE.UIItem],
		]),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				this.ComponentRegisterInfos.push([20, UE.UIItem]);
	}
	Initialize(t) {
		super.Initialize(t),
			(this.gst =
				ModelManager_1.ModelManager.BattleUiModel.ConcertoChangeEffectDelay),
			this.GetTexture(9).SetUIActive(!1),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "FormationItem init", ["", t]),
			this.Ore();
	}
	async InitializeAsync(t) {
		var e;
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			(this.hnt(18),
			this.hnt(19),
			(e = this.GetItem(20)),
			(this.xet = new CombineKeyItem_1.CombineKeyItem()),
			await this.xet.CreateByActorAsync(e.GetOwner()));
	}
	RefreshOtherSceneRole(t, e, i) {
		this.ClearRoleData(),
			(this.FormationIns = void 0),
			(this.RoleConfig =
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
			this.Nst(),
			this.RefreshRoleHealthPercent(),
			this.GetItem(14).SetUIActive(!1),
			this.GetSprite(17).SetUIActive(!1),
			this.vst ||
				(this.vst = new FormationOnlineItem_1.FormationOnlineItem(
					this.RootItem,
				)),
			(t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)),
			this.vst.SetOnlineNumber(t?.PlayerNumber ?? -1),
			this.vst.SetNameText(t?.Name ?? ""),
			this.vst.SetIsGrayByOtherControl(!i),
			this.SetActive(!0);
	}
	Refresh(t) {
		if ((this.ClearRoleData(), t)) {
			var e = t.EntityHandle?.Entity;
			let s;
			if (e) {
				var i = (s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(
					e.Id,
				))?.RoleBattleViewInfo;
				if (i && !i.FormationVisible)
					return (this.FormationIns = void 0), void this.SetActive(!1);
			}
			this.FormationIns !== t &&
				((this.FormationIns = t),
				(this.RoleConfig =
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
						this.FormationIns.GetConfigId,
					)),
				this.Nst(),
				this.RefreshRoleName()),
				this.RefreshOnlineItem(),
				e &&
					((this.EntityId = e.Id),
					(this.RoleData = s),
					(this.Mst =
						this.RoleData?.GameplayTagComponent.HasTag(-2107968822) ?? !1),
					this.eXe(e)),
				this.RefreshRoleHealthPercent(),
				this.Ost(),
				this.Lst(),
				this.kst(),
				this.Fst(),
				this.Vst(),
				this.RefreshQteActive(!0),
				this.Hst(),
				this.SetActive(!0);
		} else (this.FormationIns = void 0), this.SetActive(!1);
	}
	ClearRoleData() {
		var t = this.RoleData?.EntityHandle?.Entity;
		t && this.RemoveEntityEvents(t),
			(this.RoleData = void 0),
			(this.EntityId = void 0);
	}
	Ore() {
		this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.wst),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiElementEnergyChanged,
				this.WQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiElementHideTagChanged,
				this.KQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiHealthChanged,
				this.YKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiShieldChanged,
				this.ZQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
				this.XQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiDeadTagChanged,
				this.QQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiQteCdTagChanged,
				this.$Qe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharInQteChanged,
				this.Rst,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			);
	}
	kre() {
		this.GetExtendToggle(0).OnPointDownCallBack.Unbind(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiElementEnergyChanged,
				this.WQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiElementHideTagChanged,
				this.KQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiHealthChanged,
				this.YKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiShieldChanged,
				this.ZQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
				this.XQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiDeadTagChanged,
				this.QQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiQteCdTagChanged,
				this.$Qe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharInQteChanged,
				this.Rst,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			);
	}
	eXe(t) {
		var e;
		EventSystem_1.EventSystem.AddWithTarget(
			t,
			EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
			this.yst,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				t,
				EventDefine_1.EEventName.CharHitLocal,
				this.Tst,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				t,
				EventDefine_1.EEventName.CharUseSkill,
				this.Tst,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				t,
				EventDefine_1.EEventName.OnSkillEnd,
				this.Tst,
			),
			this.FormationIns?.IsMyRole()
				? this.Mst &&
					((e = t.GetComponent(185)), this.iXe(e, 1414093614, this.Pst))
				: ((e = t.GetComponent(185)), this.iXe(e, 166024319, this.Ust));
	}
	RemoveEntityEvents(t) {
		EventSystem_1.EventSystem.RemoveWithTarget(
			t,
			EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
			this.yst,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				t,
				EventDefine_1.EEventName.CharHitLocal,
				this.Tst,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				t,
				EventDefine_1.EEventName.CharUseSkill,
				this.Tst,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				t,
				EventDefine_1.EEventName.OnSkillEnd,
				this.Tst,
			),
			this.jst();
	}
	iXe(t, e, i) {
		(t = t.ListenForTagAddOrRemove(e, i)) && this.jQe.push(t);
	}
	jst() {
		for (const t of this.jQe) t?.EndTask();
		this.jQe.length = 0;
	}
	OnShowBattleChildView() {
		this.Wst(!1);
	}
	Reset() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "FormationItem Reset"),
			(this.xet = void 0),
			this.kre(),
			(this.ast = 0),
			this.Kst(),
			this.Gst(),
			TimerSystem_1.TimerSystem.Has(this._st) &&
				TimerSystem_1.TimerSystem.Remove(this._st),
			this.pst && (this.pst.Destroy(), (this.pst = void 0)),
			this.fst && (this.fst.Destroy(), (this.fst = void 0)),
			this.vst && (this.vst.Destroy(), (this.vst = void 0)),
			super.Reset();
	}
	OnTick(t) {
		0 < this.ast &&
			((this.hst -= t * Time_1.Time.TimeDilation),
			this.hst <= 0
				? ((this.hst = 0), (this.ast = 0), this.Kst())
				: (Math.abs(this.lst - this.hst) >
						BattleUiDefine_1.CHANGE_COOLDOWN_INTERVAL &&
						((this.lst -= 100), this.Qst()),
					this.Xst()));
	}
	RefreshTimeRate() {}
	ResetAllConcertoNiagara() {
		this.$st(!1, !0, !1);
	}
	RefreshQteActive(t = 0) {
		this.FormationIns &&
			(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
				? this.Ast()
				: this.Dst());
	}
	Dst(t = !1) {
		if (this.FormationIns) {
			let i = !1;
			var e;
			this.dst &&
				(e =
					ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
						?.EntityHandle) &&
				this.RoleData &&
				this.RoleData.EntityHandle !== e &&
				(i = this.RoleData.RoleQteComponent.IsQteReady(e)),
				this.$st(i, t, !1);
		} else this.ResetAllConcertoNiagara();
	}
	Ast(t = !1) {
		if (!this.FormationIns || this.FormationIns.IsMyRole())
			this.ResetAllConcertoNiagara();
		else {
			let s = !1;
			var e =
					ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
						?.EntityHandle,
				i = this.FormationIns?.EntityHandle;
			e && i && (s = e.Entity.GetComponent(86).IsQteReady(i)),
				this.$st(s, t, !0);
		}
	}
	$st(t, e, i) {
		var s;
		this.Sst !== t &&
			((this.Sst = t),
			(s = this.GetUiNiagara(5)).SetUIActive(t),
			t
				? (s.ActivateSystem(!0),
					e || ModelManager_1.ModelManager.BattleUiModel.AudioData.PlayAudio(0))
				: s.Deactivate(),
			this.Yst()),
			this.Jst();
	}
	Vst() {
		var t = this.RoleData?.EntityHandle?.Entity?.GetComponent(81);
		!t || (t = t.GetChangeRoleCoolDown()) <= 0 || this.Ist(t, t);
	}
	zst(t) {
		this.Est !== t &&
			((this.Est = t)
				? (this.Irt(19), this.Ert(18))
				: (this.Irt(18), this.Ert(19)));
	}
	Bst() {
		var t, e;
		this.FormationIns
			? ((t = this.FormationIns.GetCreatureDataId()),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Formation", 8, "当点击阵容头像按钮时", [
						"CreatureDataId",
						t,
					]),
				(e = this.FormationIns.EntityHandle)?.Valid
					? GlobalData_1.GlobalData.GameInstance &&
						(this.FormationIns.IsMyRole()
							? SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(t)
							: SceneTeamController_1.SceneTeamController.TryUseMultiQte(e))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Formation",
							18,
							"当点击阵容头像按钮时，角色资源还没加载好",
							["CreatureDataId", t],
						))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Formation", 8, "当点击阵容头像按钮时，阵容实例不存在");
	}
	Kst() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 8, "重置换人冷却表现"),
			this.Wst(!1);
	}
	LevelUp(t) {
		(t = t.toString()),
			this.fst
				? this.fst.SetActive(!0)
				: (this.fst = new FormationLevelUpItem_1.FormationLevelUpItem(
						this.RootItem,
					)),
			this.fst.SetLevelText(t),
			this.Zst();
	}
	RefreshConcertoResponseModule(t) {
		(this.dst = t), this.RefreshElementVisible();
	}
	CureRole() {
		!this.RoleData ||
			this.FormationIns.IsControl() ||
			this.FormationIns.IsDead() ||
			this.eat();
	}
	Zst() {
		TimerSystem_1.TimerSystem.Delay(() => {
			this.fst && this.fst.SetActive(!1);
		}, 5e3);
	}
	PlayReviveSequence() {}
	eat() {
		this.GetItem(4).SetUIActive(!0),
			(this._st = TimerSystem_1.TimerSystem.Delay(this.bst, 1e3));
	}
	tat(t, e) {
		const i = this.GetTexture(9);
		if (i) {
			const s = this.GetTexture(2);
			s &&
				(this.SetRoleIcon(t, i, e, void 0, () => {
					i.SetUIActive(!0);
				}),
				s.SetUIActive(!1),
				this.SetRoleIcon(t, s, e, void 0, () => {
					s.SetUIActive(!0);
				}));
		}
	}
	iat(t) {
		let e;
		t <= 0.2
			? ((e = this.GetSprite(13)),
				this.GetSprite(12).SetUIActive(!1),
				this.GetSprite(13).SetUIActive(!0))
			: ((e = this.GetSprite(12)),
				this.GetSprite(12).SetUIActive(!0),
				this.GetSprite(13).SetUIActive(!1)),
			e && e.SetFillAmount(t);
	}
	RefreshRoleName() {
		if (this.FormationIns) {
			var t = this.FormationIns.GetConfigId;
			if (t <= RoleDefine_1.ROBOT_DATA_MIN_ID) this.pst?.SetActive(!1);
			else if (
				ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(t)
					?.HideTrialLabel
			)
				this.pst?.SetActive(!1);
			else {
				this.pst
					? this.pst.SetActive(!0)
					: (this.pst = new FormationTrialItem_1.FormationTrialItem(
							this.RootItem,
						));
				let e = "";
				(e = this.FormationIns.IsMyRole()
					? ModelManager_1.ModelManager.RoleModel.GetRoleName(t)
					: ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
							this.FormationIns.GetPlayerId(),
						)?.Name ?? ""),
					this.pst.SetNameText(e);
			}
		}
	}
	SetRoleSelected(t) {
		if (2 === ModelManager_1.ModelManager.PlatformModel.OperationType) {
			let e = !1;
			1 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() && (e = t),
				this.zst(e);
		} else this.zst(t);
		this.Lst();
	}
	RefreshCoolDownOnShow() {
		this.RoleData && (this.Vst(), this.xst());
	}
	Ist(t, e) {
		t <= 0
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Formation",
						8,
						"播放换人冷却CD时，CD时间小于0，不会播放换人冷却CD表现",
						["coolDownTime", t],
					),
				this.Kst())
			: ((this.ast = t),
				(this.hst = e),
				(this.lst = this.hst),
				this.Qst(),
				this.Xst(),
				this.Wst(!0));
	}
	Xst() {
		var t;
		this.ast <= 0 ||
			((t = this.hst / this.ast), this.GetTexture(2).SetFillAmount(t));
	}
	Qst() {
		this.GetText(3)?.SetText(
			(this.lst * TimeUtil_1.TimeUtil.Millisecond).toFixed(1),
		);
	}
	Wst(t) {
		this.GetItem(1)?.SetUIActive(t);
	}
	Nst() {
		var t;
		this.RoleConfig &&
			(t = this.RoleConfig.RoleHeadIconBig) &&
			0 !== t.length &&
			this.tat(t, this.RoleConfig.Id);
	}
	RefreshSelectedRole() {
		var t;
		this.FormationIns &&
			this.RoleData?.AttributeComponent &&
			(!this.FormationIns.IsMyRole() ||
			(this.Fst(),
			this.RoleData.AttributeComponent.GetCurrentValue(
				EAttributeId.Proto_Life,
			) <= 0)
				? this.SetRoleSelected(!1)
				: ((t = this.RoleData.IsCurEntity),
					this.SetRoleSelected(t),
					this.RefreshElementVisible()));
	}
	ActivateConcertoChangeEffect(t, e) {
		this.GetText(8).SetUIActive(!1), this.GetUiNiagara(7).ActivateSystem(!0);
		var i = this.GetItem(6);
		i.IsUIActiveSelf() || i.SetUIActive(!0),
			(this.Cst = TimerSystem_1.TimerSystem.Delay(this.qst, this.gst));
	}
	Gst() {
		var t = this.GetItem(6);
		t.IsUIActiveSelf() && t.SetUIActive(!1),
			this.GetUiNiagara(7).DeactivateSystem(),
			this.Cst &&
				TimerSystem_1.TimerSystem.Has(this.Cst) &&
				(TimerSystem_1.TimerSystem.Remove(this.Cst), (this.Cst = void 0));
	}
	Hst() {
		this.GetItem(10).SetUIActive(!this.Mst), this.Yst(), this.xst();
	}
	Yst() {}
	xst() {
		var t, e;
		this.Mst &&
			(!this.RoleData?.GameplayTagComponent.HasTag(1414093614) ||
			((t =
				(e = this.RoleData?.BuffComponent.GetBuffById(
					CharacterBuffIds_1.buffId.QteAssistCd,
				))?.GetRemainDuration() ?? 0),
			(e = e?.Duration ?? 0),
			t <= 0) ||
			e <= 0
				? this.Kst()
				: this.Ist(
						e * TimeUtil_1.TimeUtil.InverseMillisecond,
						t * TimeUtil_1.TimeUtil.InverseMillisecond,
					));
	}
	RefreshRoleHealthPercent() {
		var t,
			e,
			i,
			s,
			a = this.GetExtendToggle(0);
		a &&
			((t =
				this.RoleData?.AttributeComponent?.GetCurrentValue(
					EAttributeId.Proto_Life,
				) ?? 1),
			(e =
				this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.Tkn) ??
				1),
			(i = this.RoleData?.ShieldComponent.ShieldTotal ?? 0),
			t <= 0 || e <= 0
				? (a.SetToggleState(2, !1),
					this.GetTexture(9).SetIsGray(!0),
					this.GetTexture(2)?.SetIsGray(!0),
					this.GetSprite(11).SetUIActive(!1),
					this.iat(0))
				: (0 < i
						? ((s = this.GetSprite(11)).SetUIActive(!0), s.SetFillAmount(i / e))
						: this.GetSprite(11).SetUIActive(!1),
					a.SetToggleState(0, !1),
					this.GetTexture(9).SetIsGray(!1),
					this.GetTexture(2)?.SetIsGray(!1),
					this.iat(t / e),
					this.RefreshSelectedRole()));
	}
	Lst() {
		var t;
		2 === ModelManager_1.ModelManager.PlatformModel.OperationType &&
		this.RoleData?.IsCurEntity
			? this.GetSprite(17).SetUIActive(!1)
			: ((t = this.oat()), this.GetSprite(17).SetUIActive(t));
	}
	kst() {
		var t = this.RoleData?.ElementConfig;
		t &&
			this.mst !== t.UltimateSkillColor &&
			((this.mst = t.UltimateSkillColor),
			this.GetSprite(17).SetColor(this.RoleData.UltimateSkillColor));
	}
	Fst() {
		var t;
		2 === ModelManager_1.ModelManager.PlatformModel.OperationType &&
			(!this.FormationIns ||
			(this.RoleData && this.RoleData.IsCurEntity) ||
			(t =
				ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
					this.FormationIns.GetPlayerId(),
					this.FormationIns.GetConfigId,
				) ?? 0) <= 0
				? this.xet.SetActive(!1)
				: (this.xet.RefreshAction("切换角色" + t), this.xet.SetActive(!0)));
	}
	Jst() {
		if (this.xet) {
			let t = !1;
			this.FormationIns?.IsMyRole() || (t = !this.Sst), this.xet.SetGray(t);
		}
	}
	oat() {
		var t,
			e = this.RoleData?.AttributeComponent;
		return (
			!!e &&
			((t = e.GetCurrentValue(EAttributeId.Proto_Energy)),
			e.GetCurrentValue(EAttributeId.Proto_EnergyMax) <= t)
		);
	}
	Ost() {
		this.RoleData
			? (this.ust !== this.RoleData.ElementType &&
					((this.ust = this.RoleData.ElementType),
					(this.cst = this.RoleData.ElementConfig),
					this.Ont(this.cst, this.ust)),
				this.Gnt(this.GetElementValue()),
				this.RefreshElementVisible())
			: this.GetItem(14).SetUIActive(!1);
	}
	RefreshElementVisible() {
		if (this.RoleData) {
			var t = this.GetItem(14);
			if (this.dst)
				if (2 === this.RoleData.RoleConfig?.RoleType)
					t.SetUIActive(!1), this.ResetAllConcertoNiagara();
				else {
					if (
						2 === ModelManager_1.ModelManager.PlatformModel.OperationType &&
						this.RoleData.IsCurEntity
					)
						t.SetUIActive(!1);
					else {
						for (const e of BattleUiRoleData_1.BattleUiRoleData
							.HideElementTagList)
							if (this.RoleData.GameplayTagComponent?.HasTag(e))
								return void t.SetUIActive(!1);
						t.SetUIActive(!0);
					}
				}
			else t.SetUIActive(!1);
		}
	}
	Ont(t, e) {
		t = t.Icon5;
		var i = this.GetSprite(16),
			s = this.GetTexture(15);
		this.SetElementIcon(t, s, e),
			s.SetColor(this.RoleData.ElementColor),
			i.SetColor(this.RoleData.ElementColor);
	}
	Gnt(t) {
		var e = this.GetSprite(16);
		t /= SceneTeamDefine_1.MAX_ELEMENT_ENERGY;
		e.SetFillAmount(t);
	}
	GetElementValue() {
		var t;
		return this.RoleData && (t = this.RoleData.GetElementAttributeId())
			? this.RoleData.AttributeComponent.GetCurrentValue(t)
			: 0;
	}
	RefreshOnlineItem() {
		var t, e;
		ModelManager_1.ModelManager.GameModeModel.IsMulti
			? (t = this.FormationIns) &&
				(this.vst ||
					(this.vst = new FormationOnlineItem_1.FormationOnlineItem(
						this.RootItem,
					)),
				(e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
					t.GetPlayerId(),
				)) && this.RefreshPlayerPingState(e.PingState),
				t.IsMyRole()
					? (this.vst.SetOnlineNumber(-1), this.vst.SetNameText(""))
					: (this.vst.SetOnlineNumber(e?.PlayerNumber ?? -1),
						this.vst.SetNameText(e?.Name ?? ""),
						this.vst.SetIsGrayByOtherControl(!t.IsControl())))
			: (this.vst?.Destroy(), (this.vst = void 0));
	}
	RefreshPlayerPingState(t) {
		t === Protocol_1.Aki.Protocol.oFs.Proto_POOR
			? (this.vst.SetNetWeak(!0), this.vst.SetNetDisconnect(!1))
			: t === Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN
				? (this.vst.SetNetDisconnect(!0), this.vst.SetNetWeak(!1))
				: (this.vst.SetNetWeak(!1), this.vst.SetNetDisconnect(!1));
	}
	hnt(t) {
		var e = [],
			i = this.GetItem(t)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			s = i.Num();
		for (let t = 0; t < s; t++) e.push(i.Get(t));
		this.Art || (this.Art = new Map()), this.Art.set(t, e);
	}
	Ert(t) {
		if (((t = this.Art?.get(t)), t)) for (const e of t) e.Play();
	}
	Irt(t) {
		if (((t = this.Art?.get(t)), t)) for (const e of t) e.Stop();
	}
}
exports.FormationItem = FormationItem;
