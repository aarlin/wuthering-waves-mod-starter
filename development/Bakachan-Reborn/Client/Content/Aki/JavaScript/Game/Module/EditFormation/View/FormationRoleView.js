"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationRoleView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	MiniElementItem_1 = require("../../Common/MiniElementItem"),
	TowerCostItem_1 = require("../../TowerDetailUi/View/TowerCostItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	EditFormationDefine_1 = require("../EditFormationDefine");
class FormationRoleView extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.b4t = void 0),
			(this.cC = 0),
			(this.q4t = void 0),
			(this.Mne = void 0),
			(this.G4t = void 0),
			(this.N4t = void 0),
			(this.O4t = void 0),
			(this.k4t = void 0),
			(this.EPe = void 0),
			(this.F4t = void 0),
			(this.V4t = void 0),
			(this.Mke = void 0),
			(this.H4t = !1),
			(this.j4t = !1),
			(this.W4t = () => {
				this.b4t && this.b4t(this.cC);
			}),
			(this.cC = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UITexture],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UISprite],
			[13, UE.UISprite],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIItem],
			[22, UE.UIText],
			[23, UE.UIItem],
			[24, UE.UIItem],
			[25, UE.UIItem],
			[26, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.W4t]]);
	}
	BindOnSelectRole(e) {
		this.b4t = e;
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.F4t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.V4t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.GetTexture(6).SetAlpha(0);
	}
	OnBeforeDestroy() {
		this.EPe?.Clear(), (this.EPe = void 0);
	}
	Refresh(e, t, i, o, n) {
		e &&
			this.Mne !== e &&
			(this.GetItem(5).SetUIActive(!0),
			this.V4t?.StopSequenceByKey("PlayerOut", !1, !1),
			this.F4t?.PlayLevelSequenceByName("PlayerIn")),
			this.U4t(e, t, i, n),
			this.RefreshTowerCost(e),
			this.EEt(o, n),
			(this.H4t = !1),
			this.K4t(!1),
			this.GetItem(14).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!0);
	}
	U4t(e, t, i, o) {
		this.Mne = e;
		var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		if (n) {
			var r = ((r = this.GetText(7)) && i && r.SetText(i), n.ElementId);
			this.N4t ||
				((i = this.GetItem(9)) &&
					(this.N4t = new MiniElementItem_1.MiniElementItem(
						r,
						i,
						i.GetOwner(),
					))),
				this.N4t?.RefreshMiniElement(r);
			const a = this.GetTexture(6);
			a.SetAlpha(0),
				this.SetRoleIcon(n.FormationRoleCard, a, e, void 0, () => {
					a.SetAlpha(1);
				}),
				(i = this.GetText(8)) &&
					LguiUtil_1.LguiUtil.SetLocalText(i, "LevelShow", t),
				this.GetItem(24).SetUIActive(!1),
				(r =
					!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					!ModelManager_1.ModelManager.EditBattleTeamModel
						.IsMultiInstanceDungeon &&
					ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
						e,
					).IsTrialRole()),
				this.GetItem(10).SetUIActive(r);
			let s = !0;
			(ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				ModelManager_1.ModelManager.EditBattleTeamModel
					.IsMultiInstanceDungeon) &&
				(s = o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
				(this.j4t = !1),
				!s ||
					r ||
					ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
					(this.j4t =
						ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e)),
				this.GetItem(23).SetUIActive(this.j4t);
		}
	}
	EEt(e, t) {
		var i = 0 < e;
		if (
			(this.GetItem(11).SetUIActive(i), this.GetSprite(13).SetUIActive(!1), i)
		) {
			let o;
			(o = (i = t === ModelManager_1.ModelManager.CreatureModel.GetPlayerId())
				? EditFormationDefine_1.SELF_ONLINE_INDEX
				: EditFormationDefine_1.OTHER_ONLINE_INDEX),
				this.EPe.StopSequenceByKey("LocationNotice", !1, !0),
				i &&
					this.q4t !== t &&
					this.EPe.PlayLevelSequenceByName("LocationNotice"),
				(i = StringUtils_1.StringUtils.Format(o, e.toString())),
				(i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
				this.SetSpriteByPath(i, this.GetSprite(12), !1),
				(i =
					ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
						t,
					)?.PingState),
				this.RefreshPing(i);
		}
		(this.G4t = e), (this.q4t = t);
	}
	Reset() {
		this.EPe?.Clear(),
			(this.EPe = void 0),
			(this.b4t = void 0),
			this.ResetRole();
	}
	GetPlayer() {
		return this.q4t;
	}
	GetConfigId() {
		return this.Mne;
	}
	GetOnlineIndex() {
		return this.G4t;
	}
	ResetRole() {
		this.Mne
			? (this.F4t?.StopSequenceByKey("PlayerIn", !1, !1),
				this.V4t?.PlayLevelSequenceByName("PlayerOut"))
			: this.GetItem(5).SetUIActive(!1),
			(this.q4t = void 0),
			(this.Mne = void 0),
			(this.G4t = void 0),
			(this.H4t = !1),
			this.K4t(!1),
			this.GetItem(11).SetUIActive(!1),
			this.GetSprite(13).SetUIActive(!1),
			this.GetItem(14).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(1).SetUIActive(!0);
	}
	RefreshPing(e) {
		let t;
		switch (e) {
			case Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN:
				t = "SP_SignalUnknown";
				break;
			case Protocol_1.Aki.Protocol.oFs.Proto_POOR:
				t = "SP_SignalPoor";
		}
		var i;
		e = this.GetSprite(13);
		t
			? ((i =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
				this.SetSpriteByPath(i, e, !1),
				e.SetUIActive(!0))
			: e.SetUIActive(!1);
	}
	SetCanAddRole(e) {
		this.GetItem(3).SetUIActive(e), this.GetItem(4).SetUIActive(!e);
	}
	RefreshPrepareState() {
		var e =
				ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon,
			t = this.GetItem(14),
			i = this.GetItem(16),
			o = this.GetItem(23);
		if ((i.SetUIActive(!1), t.SetUIActive(!1), e))
			if (
				ModelManager_1.ModelManager.EditBattleTeamModel.IsRoleConflict(
					this.q4t,
					this.Mne,
				)
			)
				o.SetUIActive(!1), i.SetUIActive(!0);
			else {
				o.SetUIActive(this.j4t);
				var n =
						ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
							.Q4n,
					r = this.q4t ?? n;
				switch (
					ModelManager_1.ModelManager.InstanceDungeonModel.GetPlayerUiState(r)
				) {
					case Protocol_1.Aki.Protocol.FNs.Proto_Selecting:
						t.SetUIActive(!0),
							this.GetItem(15).SetUIActive(!0),
							this.Mke !== Protocol_1.Aki.Protocol.FNs.Proto_Selecting &&
								this.EPe.PlayLevelSequenceByName("Connecting"),
							(this.Mke = Protocol_1.Aki.Protocol.FNs.Proto_Selecting);
						break;
					case Protocol_1.Aki.Protocol.FNs.WMs:
						r !== n &&
							(t.SetUIActive(!0),
							this.GetItem(15).SetUIActive(!1),
							this.Mke !== Protocol_1.Aki.Protocol.FNs.WMs &&
								this.EPe.PlayLevelSequenceByName("Match"),
							(this.Mke = Protocol_1.Aki.Protocol.FNs.WMs));
						break;
					default:
						this.Mke = Protocol_1.Aki.Protocol.FNs.Proto_Wait;
				}
			}
	}
	SetMatchState(e) {
		this.H4t !== e &&
			((this.H4t = e),
			this.Mne &&
				(e
					? (this.F4t?.StopSequenceByKey("PlayerIn", !1, !1),
						this.EPe?.StopSequenceByKey("LocationNotice", !1, !1),
						this.V4t?.PlayLevelSequenceByName("PlayerOut"))
					: (this.V4t?.StopSequenceByKey("PlayerOut", !1, !1),
						this.EPe?.StopSequenceByKey("LocationNotice", !1, !1),
						this.F4t?.PlayLevelSequenceByName("PlayerIn"))),
			this.K4t(e));
	}
	K4t(e) {
		this.GetItem(2).SetUIActive(e),
			this.GetItem(3).SetUIActive(!e),
			this.GetButton(0).SetSelfInteractive(!e),
			e
				? (this.V4t?.StopSequenceByKey("PlayerOut", !1, !0),
					this.EPe?.PlayLevelSequenceByName("Matching"))
				: this.EPe?.StopSequenceByKey("Matching", !1, !0);
	}
	SetMatchTime(e) {
		this.GetText(22).SetText(TimeUtil_1.TimeUtil.GetTimeString(e));
	}
	RefreshTowerCost(e) {
		if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
			var t = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
					e,
					ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
				),
				i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
				)?.Cost;
			const o = t < i,
				n = ModelManager_1.ModelManager.TowerModel.GetFloorIncludeRole(
					e,
					ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
				);
			(e = o && !n),
				this.GetItem(17).SetUIActive(!0),
				this.O4t ||
					((this.O4t = new TowerCostItem_1.TowerCostItem()),
					this.O4t.CreateThenShowByActorAsync(
						this.GetItem(20).GetOwner(),
					).finally(() => {
						this.O4t.SetUiActive(!o && !n);
					})),
				this.k4t ||
					((this.k4t = new TowerCostItem_1.TowerCostItem()),
					this.k4t
						.CreateThenShowByActorAsync(this.GetItem(21).GetOwner())
						.finally(() => {
							this.k4t.SetUiActive(!o || n);
						})),
				this.GetItem(18).SetUIActive(e),
				this.GetItem(19).SetUIActive(!e),
				this.O4t.SetUiActive(!o && !n),
				this.k4t.SetUiActive(!o || n),
				o || n
					? n && this.k4t.Update(t)
					: (this.O4t.Update(t), this.k4t.Update(t - i));
		} else this.GetItem(17).SetUIActive(!1);
	}
}
exports.FormationRoleView = FormationRoleView;
