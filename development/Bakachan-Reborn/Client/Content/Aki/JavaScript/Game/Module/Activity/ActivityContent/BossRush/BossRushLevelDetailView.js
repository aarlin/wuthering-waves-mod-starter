"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushTeamRoleItem = exports.BossRushLevelDetailView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem"),
	TeamRoleSelectView_1 = require("../../../RoleSelect/TeamRoleSelectView"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BossRushController_1 = require("./BossRushController");
class BossRushLevelDetailView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.RUr = void 0),
			(this.bAr = void 0),
			(this.qAr = void 0),
			(this.GAr = []),
			(this.NAr = void 0),
			(this.OAr = void 0),
			(this.kAr = []),
			(this.EPe = void 0),
			(this.FAr = void 0),
			(this.VAr = () => {
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
					this.RUr.GetCurrentSelectLevel().GetInstanceDungeonId()),
					UiManager_1.UiManager.OpenView(
						"InstanceDungeonMonsterPreView",
						this.RUr?.GetCurrentSelectLevel()?.GetInstanceDungeonId(),
					);
			}),
			(this.HAr = () => new BossRushTeamRoleItem()),
			(this.nNt = () => {
				var e = this.RUr.LevelInfo.GetInstanceDungeonFormationNumb();
				let t = 0;
				this.RUr?.GetCurrentTeamMembers().forEach((e) => {
					0 !== e && t++;
				}),
					0 === e
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
								"BossRushAtlestOneRole",
							)
						: e > t
							? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									188,
								)).FunctionMap.set(2, () => {
									BossRushController_1.BossRushController.RequestStartBossRushByTeamData(
										this.RUr,
									);
								}),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									e,
								))
							: BossRushController_1.BossRushController.RequestStartBossRushByTeamData(
									this.RUr,
								);
			}),
			(this.Jao = () => {
				this.jAr();
			}),
			(this.WAr = () => {
				this.KAr(), this.QAr();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIHorizontalLayout],
			[11, UE.UIButtonComponent],
			[12, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[1, this.nNt],
				[11, this.VAr],
			]);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeBossRushBuff,
			this.Jao,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeBossRushBuff,
			this.Jao,
		);
	}
	async OnBeforeStartAsync() {
		(this.bAr = new CommonSelectItem_1.CommonElementItem()),
			(this.qAr = new CommonSelectItem_1.CommonElementItem()),
			await this.bAr.CreateByActorAsync(this.GetItem(8).GetOwner()),
			this.bAr.SetActive(!0),
			await this.qAr.CreateByActorAsync(this.GetItem(9).GetOwner()),
			this.qAr.SetActive(!0),
			this.GAr.push(this.bAr),
			this.GAr.push(this.qAr),
			(this.NAr = new BuffEntry()),
			(this.OAr = new BuffEntry()),
			await this.NAr.CreateByActorAsync(this.GetItem(5).GetOwner()),
			await this.OAr.CreateByActorAsync(this.GetItem(6).GetOwner()),
			this.kAr.push(this.NAr),
			this.kAr.push(this.OAr);
		for (const e of this.kAr)
			(e.SlotIndex = this.kAr.indexOf(e) + 1), e.SetActive(!0);
		(this.FAr = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(10),
			this.HAr,
		)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnStart() {}
	OnBeforeShow() {
		(this.RUr = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo),
			this.Ebn(),
			this.KAr(),
			this.XAr(),
			this.$Ar(),
			this.jAr(),
			this.QAr(),
			this.YAr(),
			this.JAr(),
			this.MLn();
	}
	Ebn() {
		let e = "Start";
		ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
			(e = "ShowView"),
			this.EPe?.PlaySequencePurely(e),
			(ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
	}
	JAr() {
		var e = this.RUr?.GetCurrentSelectLevel()?.GetConfig()?.BossCount;
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "BossRushNumTips", e);
	}
	MLn() {
		var e =
			0 < this.RUr.GetCurrentSelectLevel().GetRecommendElementIdArray().length
				? "BossRushRecommendElement"
				: "BossRushRecommendElementNone";
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
	}
	YAr() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(7),
			"BossRushRecommendLevel",
			this.RUr.GetRecommendLevel().toString(),
		);
	}
	KAr() {
		var e = this.RUr.GetIfLevelTooLow();
		this.GetText(2).SetUIActive(e);
	}
	XAr() {
		this.GAr.forEach((e) => {
			e.SetActive(!1);
		});
		var e = this.RUr.GetCurrentSelectLevel().GetRecommendElementIdArray();
		for (let t = 0; t < e.length; t++)
			0 !== e[t] &&
				(this.GAr[t].SetActive(!0), this.GAr[t].Refresh(e[t], !1, t));
	}
	$Ar() {
		var e = this.RUr.GetCurrentSelectLevel();
		this.SetTextureByPath(
			e.GetBigMonsterTexturePath(),
			this.GetTexture(0),
			"BossRushMainView",
		),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetMonsterName());
	}
	jAr() {
		var e = this.RUr.GetPrepareSelectBuff();
		for (let t = 0; t < e.length; t++) this.kAr[t].Refresh(e[t]);
	}
	QAr() {
		var e = this.RUr.GetCurrentTeamMembers(),
			t = [];
		for (
			t.push(
				...e.map((e) => ({
					RoleId: e,
					TeamInfo: this.RUr,
					OnSelectRole: this.WAr,
				})),
			);
			t.length < 3;
		)
			t.push({ RoleId: 0, TeamInfo: this.RUr, OnSelectRole: this.WAr });
		this.FAr.RefreshByData(t);
	}
}
exports.BossRushLevelDetailView = BossRushLevelDetailView;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.SlotIndex = 0),
			(this.zAr = void 0),
			(this.ZAr = () => {
				this.zAr?.State === Protocol_1.Aki.Protocol.ABs.KPs
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
							"BossRushLock",
						)
					: this.zAr?.State !== Protocol_1.Aki.Protocol.ABs.Proto_Inactive &&
						((ModelManager_1.ModelManager.BossRushModel.CurrentChangeBuffSlot =
							this.SlotIndex),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RequestChangeBossRushView,
							"BossRushBuffSelectView",
						));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.ZAr],
				[7, this.ZAr],
			]);
	}
	Refresh(e) {
		(this.zAr = e).State === Protocol_1.Aki.Protocol.ABs.Proto_Inactive
			? this.GetButton(0)?.SetSelfInteractive(!1)
			: (this.GetButton(0)?.SetSelectionState(0),
				this.GetButton(0)?.SetSelfInteractive(!0)),
			this.ePr(),
			this.tPr(),
			this.lwn(),
			this.O0o(),
			this.EBn();
	}
	EBn() {
		let e = "";
		(e =
			this.zAr.State === Protocol_1.Aki.Protocol.ABs.KPs
				? "BossRushLock"
				: this.zAr.State === Protocol_1.Aki.Protocol.ABs.Proto_Inactive
					? "BossRushBuffDisableTips"
					: "BossRushBuffSelectTips"),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
	}
	lwn() {
		this.GetItem(8).SetUIActive(
			this.zAr.State === Protocol_1.Aki.Protocol.ABs.KPs,
		);
	}
	O0o() {
		this.GetItem(7).SetUIActive(
			0 !== this.zAr.BuffId &&
				this.zAr.State !== Protocol_1.Aki.Protocol.ABs.KPs,
		);
	}
	ePr() {
		this.GetItem(1).SetUIActive(0 === this.zAr.BuffId),
			this.GetItem(2).SetUIActive(0 !== this.zAr.BuffId);
	}
	tPr() {
		0 !== this.zAr.BuffId && (this.iPr(), this.oPr(), this.GUr());
	}
	GUr() {
		var e =
			ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
				this.zAr.BuffId,
			).Texture;
		this.SetTextureByPath(e, this.GetTexture(4));
	}
	oPr() {
		var e =
				ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
					this.zAr.BuffId,
				),
			t = [];
		for (const o of e.DescriptionParam) {
			var r = RegExp(/\[(.*?)\]/g).exec(o);
			r && 1 < r.length && t.push(...r[1].split(","));
		}
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Description, ...t);
	}
	iPr() {
		var e =
			ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
				this.zAr.BuffId,
			);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
	}
}
class BossRushTeamData {
	constructor() {
		(this.RoleId = 0), (this.TeamInfo = void 0), (this.OnSelectRole = void 0);
	}
}
class BossRushTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.rPr = new BossRushTeamData()),
			(this.nqe = () => {
				UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") ||
					UiManager_1.UiManager.OpenView("TeamRoleSelectView", this.D4t());
			}),
			(this.K3t = (e) => {
				var t, r;
				if (e)
					return (
						(t = this.rPr.TeamInfo.GetCurrentTeamMembers()[this.GridIndex]),
						(r = this.rPr.TeamInfo.GetCurrentTeamMembers().findIndex(
							(t) => t === e,
						)),
						0 === t && -1 === r
							? "JoinText"
							: t === e
								? "GoDownText"
								: "ChangeText"
					);
			}),
			(this.p3t = (e) =>
				-1 ===
				this.rPr.TeamInfo.GetCurrentTeamMembers().findIndex((t) => t === e)),
			(this.SLn = (e) => {
				if (this.rPr.TeamInfo.GetCurrentTeamMembers()[this.GridIndex] === e)
					return !0;
				var t = this.rPr.TeamInfo.GetCurrentTeamMembers().findIndex(
					(t) => t === e,
				);
				if (-1 !== t && t !== this.GridIndex) return !0;
				(t =
					this.rPr.TeamInfo.LevelInfo?.GetInstanceDungeonConfig()
						.FightFormationId),
					(t =
						ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
							t,
						));
				let r = e,
					o = !0;
				for (const o of t.TrialRole) {
					var i =
						ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
							o,
						);
					if (i?.Id === e) {
						r = i.ParentId;
						break;
					}
				}
				var s = this.rPr.TeamInfo.GetCurrentTeamMembers();
				for (let e = 0; e < s.length; e++) {
					var n = s[e];
					if (0 !== n && e !== this.GridIndex) {
						let e = n;
						if (
							(e = (n =
								ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
									n,
								))
								? n.ParentId
								: e) === r
						) {
							(o = !1),
								ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
									"BossRushSameFormation",
								);
							break;
						}
					}
				}
				return o;
			}),
			(this.Q3t = (e) => {
				var t = this.rPr.TeamInfo.GetCurrentTeamMembers()[this.GridIndex],
					r = this.rPr.TeamInfo.GetCurrentTeamMembers().findIndex(
						(t) => t === e,
					);
				0 === t && -1 === r
					? this.rPr.TeamInfo.SetIndexTeamMembers(this.GridIndex, e)
					: t === e
						? this.rPr.TeamInfo.SetIndexTeamMembers(this.GridIndex, 0)
						: (this.rPr.TeamInfo.SetIndexTeamMembers(r, t),
							this.rPr.TeamInfo.SetIndexTeamMembers(this.GridIndex, e)),
					this.rPr.TeamInfo.ReSortTeamMembers(),
					this.rPr.OnSelectRole();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UISprite],
			[2, UE.UITexture],
		]),
			(this.BtnBindInfo = [[0, this.nqe]]);
	}
	D4t() {
		var e =
				this.rPr.TeamInfo.LevelInfo?.GetInstanceDungeonConfig()
					.FightFormationId,
			t =
				((e =
					ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
						e,
					)),
				[]);
		for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList())
			0 !== e.GetRoleId() && t.push(e);
		for (const o of e.TrialRole) {
			var r =
				ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(o);
			r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.Id);
			t.push(r);
		}
		e =
			this.rPr.TeamInfo.GetCurrentTeamMembers().length > this.GridIndex
				? this.rPr.TeamInfo.GetCurrentTeamMembers()[this.GridIndex]
				: 0;
		var o =
				(((e = new TeamRoleSelectView_1.TeamRoleSelectViewData(
					5,
					e,
					t,
					this.Q3t,
					void 0,
					this.GridIndex + 1,
				)).CanConfirmFunc = this.SLn),
				(e.CanJoinTeam = this.p3t),
				e.SetGetConfirmButtonTextFunction(this.K3t),
				this.rPr.TeamInfo.GetCurrentTeamMembers()),
			i = [];
		for (const e of o) 0 !== e && i.push(e);
		return (
			(e.FormationRoleList = i),
			ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(
				this.rPr.TeamInfo.LevelInfo?.GetInstanceDungeonFormationId(),
			),
			e
		);
	}
	Refresh(e, t, r) {
		(this.rPr = e), this.SEt();
	}
	SEt() {
		var e;
		0 === this.rPr.RoleId
			? this.GetTexture(2).SetUIActive(!1)
			: (this.GetTexture(2).SetUIActive(!0),
				(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					this.rPr.RoleId,
				)),
				this.SetRoleIcon(
					e.RoleHeadIconCircle,
					this.GetTexture(2),
					this.rPr.RoleId,
				));
	}
}
exports.BossRushTeamRoleItem = BossRushTeamRoleItem;
