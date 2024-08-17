"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BottomPanel = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleUiDefine_1 = require("../../BattleUiDefine"),
	ConcertoResponseItem_1 = require("../ConcertoResponseItem"),
	RoleBuffView_1 = require("../RoleBuffView"),
	RoleStateView_1 = require("../RoleStateView"),
	SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.J$e = void 0),
			(this.z$e = void 0),
			(this.Z$e = void 0),
			(this.eYe = void 0),
			(this.tYe = (e) => {
				this.Z$e?.RefreshVisible();
			}),
			(this.xie = () => {
				var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
				e &&
					(e.IsPhantom() && 0 < e.RoleConfig.SpecialEnergyBarId
						? (this.J$e.Refresh(void 0), this.Z$e.Refresh(void 0))
						: (this.J$e.Refresh(e), this.Z$e.Refresh(e)),
					this.z$e.Refresh(e),
					this.eYe.OnChangeRole(e));
			}),
			(this.zpe = (e) => {
				this.J$e.GetEntityId() === e.Id && this.J$e.Refresh(void 0),
					this.Z$e.GetEntityId() === e.Id && this.Z$e.Refresh(void 0),
					this.z$e.GetEntityId() === e.Id && this.z$e.Refresh(void 0),
					this.eYe.OnRemoveEntity(e.Id);
			}),
			(this.iYe = (e, t) => {
				var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				if (i?.Valid && t && i.Id === e)
					for (const e of t.dfs)
						e.Ugs === EAttributeId.Proto_Life &&
							this.J$e.RefreshHpAndShield(!0);
			}),
			(this.pKe = (e, t, i, n) => {
				this.z$e.GetEntityId() === e &&
					t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					(i
						? this.z$e.AddBuffItem(t, n, !0)
						: this.z$e.DeactivateBuffItem(n, !0));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	async InitializeAsync() {
		await Promise.all([this.oYe(), this.rYe(), this.nYe(), this.sYe()]);
		var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
		this.J$e.Refresh(e),
			this.Z$e.Refresh(e),
			this.z$e.Refresh(e),
			this.eYe.OnChangeRole(e);
	}
	Reset() {
		(this.J$e = void 0),
			(this.Z$e = void 0),
			(this.z$e = void 0),
			(this.eYe = void 0),
			super.Reset();
	}
	OnShowBattleChildViewPanel() {
		this.J$e?.SetNiagaraActive(!1);
	}
	OnTickBattleChildViewPanel(e) {
		this.J$e?.Tick(e), this.z$e?.Tick(e), this.eYe?.Tick(e);
	}
	async oYe() {
		var e = this.GetItem(0);
		(this.J$e = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			RoleStateView_1.RoleStateView,
		)),
			await this.J$e.ShowAsync();
	}
	async nYe() {
		var e = this.GetItem(1);
		this.Z$e = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			ConcertoResponseItem_1.ConcertoResponseItem,
		);
	}
	async rYe() {
		var e = this.GetItem(3);
		(this.z$e = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			RoleBuffView_1.RoleBuffView,
		)),
			await this.z$e.ShowAsync();
	}
	async sYe() {
		var e = this.GetItem(2);
		(this.eYe = await this.NewStaticChildViewAsync(
			e.GetOwner(),
			SpecialEnergyBarContainer_1.SpecialEnergyBarContainer,
			this.GetItem(4),
		)),
			await this.eYe.ShowAsync();
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
			this.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiRemoveRoleData,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.pKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnServerAttributeChange,
				this.iYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnConcertoResponseOpen,
				this.tYe,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
			this.xie,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiRemoveRoleData,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnServerAttributeChange,
				this.iYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.pKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnConcertoResponseOpen,
				this.tYe,
			);
	}
}
((exports.BottomPanel = BottomPanel).aYe = void 0), (BottomPanel.RKe = void 0);
