"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleTeamView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	MiniElementItem_1 = require("../../Common/MiniElementItem"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
	EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
	ExitSkillView_1 = require("../../EditFormation/View/ExitSkill/ExitSkillView"),
	FormationRoleView_1 = require("../../EditFormation/View/FormationRoleView"),
	InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	OnlineController_1 = require("../../Online/OnlineController"),
	QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
	TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
	RoleDefine_1 = require("../../RoleUi/RoleDefine"),
	SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	TowerController_1 = require("../../TowerDetailUi/TowerController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	EditBattleTeamController_1 = require("../EditBattleTeamController"),
	MAX_FORMATION_ID = 6;
class EditBattleTeamView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.h3t = []),
			(this.l3t = []),
			(this._3t = [25, 26, 27]),
			(this.u3t = 0),
			(this.cpt = void 0),
			(this.EPe = void 0),
			(this.c3t = !1),
			(this.m3t = !1),
			(this.d3t = () => {
				this.C3t(), this.RefreshEnterButton(), this.g3t(), this.f3t();
			}),
			(this.p3t = (e) => {
				var t = ModelManager_1.ModelManager.EditBattleTeamModel;
				return !t.IsInEditBattleTeam(e) && t.CanAddRoleToEditTeam(e);
			}),
			(this.v3t = (e) => this.M3t(e)),
			(this.S3t = (e) => {
				var t, o, n;
				return this.M3t(e)
					? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
					: ((o = (t = ModelManager_1.ModelManager.EditBattleTeamModel)
							.GetCurrentEditRoleSlotData),
						-1 !== (n = t.GetParentRolePositionInEditBattleTeam(e)) &&
						n !== o.GetPosition
							? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"SameRole",
								),
								!1)
							: !(
									t.IsMultiInstanceDungeon &&
									o?.GetRoleConfigId === e &&
									t.GetPlayerRoleNumber(o?.GetRoleData?.PlayerId) < 2 &&
									(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"BattleTeamCanNotDownAllRole",
									),
									1)
								));
			}),
			(this.E3t = (e) => {
				this.RefreshEnterButton();
			}),
			(this.y3t = (e) => {
				this.RefreshEnterButton(), this.g3t(), this.I3t(e);
			}),
			(this.JYe = (e) => {
				var t = e.TargetPlayerId;
				if (
					!ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(t) &&
					e.IsVisible
				) {
					var o = 1 === e.ContentChatRoomType;
					let l = e.SenderPlayerName;
					o &&
						(t = ModelManager_1.ModelManager.FriendModel.GetFriendById(t)) &&
						(l = t.PlayerName),
						this.c3t ||
							(this.GetItem(9).SetUIActive(!0),
							this.EPe.PlayLevelSequenceByName("NoticeIn"),
							(this.c3t = !0)),
						this.EPe.PlayLevelSequenceByName("NewMassageIn");
					t = this.GetText(10);
					var n =
						ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
						e.SenderPlayerId;
					let r,
						i = e.Content;
					if (e.ContentType === Protocol_1.Aki.Protocol.U3n.nMs)
						r = o
							? n
								? "Text_TalkToFriend_Text"
								: "Text_FriendTalkToMe_Text"
							: "Text_TeamTalk_Text";
					else if (e.ContentType === Protocol_1.Aki.Protocol.U3n.Proto_Emoji) {
						e = Number(e.Content);
						var a =
							ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e);
						if (!a)
							return void (
								Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("Formation", 49, "表情缺少配置", ["表情Id", e])
							);
						LguiUtil_1.LguiUtil.SetLocalTextNew(t, a.Name),
							(i = t.GetText()),
							(r = o
								? n
									? "Text_TalkToFriend_Text_Match"
									: "Text_FriendTalkToMe_Text_Match"
								: "Text_TeamTalk_Text_Match");
					}
					LguiUtil_1.LguiUtil.SetLocalTextNew(t, r, l, i);
				}
			}),
			(this.T3t = () => {
				var e =
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime;
				for (const t of this.h3t) t.SetMatchTime(e);
			}),
			(this.L3t = (e, t) => {
				this.RefreshEnterButton(), this.g3t();
			}),
			(this.D3t = (e) => {
				for (const t of this.h3t)
					((t.GetPlayer() ?? -1) === e ||
						e ===
							ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
								.Q4n) &&
						t.RefreshPrepareState();
			}),
			(this.R3t = () => {
				var e = ModelManager_1.ModelManager.EditBattleTeamModel,
					t = e.GetLeaderIsSelf,
					o = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
					n = e.GetOwnRoleCountInRoleSlot;
				0 === n
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"NoRole",
						)
					: e.IsInLimitRoleCount(n)
						? e.IsMultiInstanceDungeon
							? t
								? ModelManager_1.ModelManager.InstanceDungeonEntranceModel
										.EditBattleTeamMatching
									? (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
											!1,
										),
										this.RefreshEnterButton(),
										InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(
											ModelManager_1.ModelManager.InstanceDungeonEntranceModel
												.EditBattleTeamMatching,
										))
									: e.GetIsAllReady
										? e.HasSameRole
											? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
													"SameRole",
												)
											: e.GetAllRoleCanAddToTeam().CanAdd
												? e.IsAllRoleDie
													? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
															"AllRoleDie",
														)
													: ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <=
															2
														? ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
																102,
															)).FunctionMap.set(2, () => {
																this.U3t();
															}),
															ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
																n,
															))
														: this.U3t()
												: ((t = e.GetCurrentFightFormation.Content),
													(n =
														MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
															t,
														)),
													ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
														n,
													))
										: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
												"NoReady",
											)
								: !(t = e.GetSelfIsReady) && e.HasSameRole
									? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"SameRole",
										)
									: (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Formation",
												8,
												"[EditBattleTeam]玩家{PlayerId} 请求准备游戏,是否准备:{SelfIsReady}",
												["{PlayerId}", o],
												["{SelfIsReady}", !t],
											),
										InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeReadyRequest(
											!t,
										))
							: e.GetIsAllReady
								? e.HasSameRole
									? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"SameRole",
										)
									: !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
											e.IsAllRoleDie
										? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
												"AllRoleDie",
											)
										: e.GetAllRoleCanAddToTeam().CanAdd
											? ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
												? TowerController_1.TowerController.TowerStartRequest(
														ModelManager_1.ModelManager.TowerModel
															.CurrentSelectFloor,
														ModelManager_1.ModelManager.EditBattleTeamModel
															.GetOwnRoleConfigIdList[0],
													)
												: ModelManager_1.ModelManager.EditBattleTeamModel
															.NeedEntrance
													? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
													: ((ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance =
															!0),
														InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
															ModelManager_1.ModelManager
																.InstanceDungeonEntranceModel.InstanceId,
															ModelManager_1.ModelManager.EditBattleTeamModel
																.GetOwnRoleConfigIdList[0],
															0,
															0,
															ModelManager_1.ModelManager
																.InstanceDungeonEntranceModel.TransitionOption,
														))
											: ((n = e.GetCurrentFightFormation.Content),
												(o =
													MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
														n,
													)),
												ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
													o,
												))
								: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"NoReady",
									)
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"LimitCount",
							);
			}),
			(this.A3t = () => {
				this.C3t(),
					ModelManager_1.ModelManager.EditBattleTeamModel
						.IsMultiInstanceDungeon &&
						ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderPlayerId &&
						OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.EditBattleTeamMatching
								? Protocol_1.Aki.Protocol.FNs.Proto_Matching
								: Protocol_1.Aki.Protocol.FNs.Proto_Wait,
						);
			}),
			(this.P3t = () => {
				var e;
				if (
					(t = ModelManager_1.ModelManager.EditBattleTeamModel)
						.IsMultiInstanceDungeon
				) {
					let e = 6;
					var t;
					t.GetLeaderIsSelf && (e = 7),
						(t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e)).FunctionMap.set(
							2,
							() => {
								EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
							},
						),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							t,
						);
				} else
					(t = ModelManager_1.ModelManager.TowerModel.CheckInTower()),
						(e = UiManager_1.UiManager.GetViewByName("TowerFloorView")),
						t &&
							!e &&
							((t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
								ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
							)),
							UiManager_1.UiManager.OpenView("TowerFloorView", t.AreaNum)),
						EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
			}),
			(this.x3t = () => {
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
					!0,
				),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(
						ModelManager_1.ModelManager.InstanceDungeonEntranceModel
							.EditBattleTeamMatching,
					);
			}),
			(this.w3t = () => {
				var e = TimeUtil_1.TimeUtil.GetServerTime();
				e - this.u3t > ModelManager_1.ModelManager.OnlineModel.ApplyCd
					? (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchInviteRequest(),
						(this.u3t = e),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"HaveMatched",
						))
					: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"MatchingInviteCd",
						);
			}),
			(this.B3t = () => {
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon()
					? UiManager_1.UiManager.OpenView(
							"InstanceDungeonMonsterPreView",
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel
								.SelectInstanceId,
						)
					: UiManager_1.UiManager.OpenView("TowerFloorDetailView");
			}),
			(this.b3t = () => {
				TowerController_1.TowerController.TowerFormationRecommendRequest(
					ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
				).finally(() => {
					UiManager_1.UiManager.OpenView("TowerRecommendView");
				});
			}),
			(this.q3t = () => {
				if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
					var e = ModelManager_1.ModelManager.EditBattleTeamModel,
						t = new Array(),
						o = e.GetAllRoleSlotData;
					if (o)
						for (const e of o) {
							var n = e.GetRoleData;
							n && t.push(n.ConfigId);
						}
					(o = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
						? 29
						: 4),
						(e = e.GetRoleList()),
						((o = new QuickRoleSelectView_1.QuickRoleSelectViewData(
							o,
							t,
							e,
						)).OnConfirm = this.G3t),
						(o.CanConfirm = this.pHs),
						(o.OnBack = this.N3t),
						(o.OnHideFinish = this.A3t),
						UiManager_1.UiManager.OpenView("QuickRoleSelectView", o),
						this.O3t(!1);
				}
			}),
			(this.G3t = (e) => {
				this.O3t(!0);
				var t = ModelManager_1.ModelManager.EditBattleTeamModel;
				for (let a = 1; a <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; a++) {
					var o,
						n = t.GetRoleSlotData(a);
					n.IsProhibit || a > e.length
						? n.ResetRoleData()
						: ((o = e[a - 1]),
							(o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)),
							(o = t.CreateRoleDataFromRoleInstance(o)),
							n.SetRoleData(o));
				}
				this.g3t();
			}),
			(this.pHs = (e) => {
				var t = ModelManager_1.ModelManager.EditBattleTeamModel;
				for (const n of e)
					if (t.IsTrialRole(n)) {
						var o =
							ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
								n,
							).ParentId;
						for (const t of e)
							if (o === t)
								return (
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"SameRole",
									),
									!1
								);
					}
				return !0;
			}),
			(this.k3t = () => {
				if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
					var e = new ExitSkillView_1.ExitSkillViewData();
					for (const a of this.h3t) {
						var t = a.GetConfigId(),
							o = a.GetOnlineIndex(),
							n = a.GetPlayer();
						e.AddData(t, o, n);
					}
					UiManager_1.UiManager.OpenView("ExitSkillView", e);
				}
			}),
			(this.F3t = () => {
				UiManager_1.UiManager.IsViewShow("ChatView") ||
					UiManager_1.UiManager.OpenView("ChatView");
			}),
			(this.V3t = (e) => {
				var t = ModelManager_1.ModelManager.EditBattleTeamModel;
				if (t.GetCurrentFightFormation.ChooseRole) {
					t.SetCurrentEditPosition(e);
					var o,
						n = t.GetRoleSlotData(e);
					if (n) {
						const a = n?.GetRoleData;
						if (a) {
							if (
								ModelManager_1.ModelManager.EditBattleTeamModel
									.IsMultiInstanceDungeon &&
								ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() &&
								!a.IsSelf
							)
								return (
									(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
										101,
									)).FunctionMap.set(2, () => {
										InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.KickMatchTeamPlayerRequest(
											a.PlayerId,
										);
									}),
									void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
										o,
									)
								);
							if (!n.CanEditRoleSlot)
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"BattleTeamNotMyRole",
								);
							if (!t.GetLeaderIsSelf && a?.IsReady)
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"BattleTeamReadyRole",
								);
						} else {
							if (
								ModelManager_1.ModelManager.EditBattleTeamModel
									.IsMultiInstanceDungeon &&
								!ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
							)
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"BattleTeamNotMyRole",
								);
							if (n.IsProhibit)
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"BattleTeamPositionCanNotEdit",
								);
						}
						this.H3t(e), this.O3t(!1);
					}
				} else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"NoChangeRole",
					);
			}),
			(this.j3t = (e) => {
				var t = ModelManager_1.ModelManager.EditBattleTeamModel,
					o = t.GetCurrentEditRoleSlotData.GetRoleData;
				if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
					return !1;
				switch (this.W3t(e)) {
					case 2:
					case 1:
					default:
						return !0;
					case 3:
						return !!o;
				}
			}),
			(this.K3t = (e) => {
				if (e) {
					if (this.M3t(e)) return "EditBattleTeamRevive";
					var t = ModelManager_1.ModelManager.EditBattleTeamModel,
						o = t.GetCurrentEditRoleSlotData;
					if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
						return "JoinText";
					switch (this.W3t(e)) {
						case 2:
							return "GoDownText";
						case 1:
							return o.HasRole ? "ChangeText" : "JoinText";
						case 3:
							return "ChangeText";
						default:
							return "JoinText";
					}
				}
			}),
			(this.Q3t = (e) => {
				var t = ModelManager_1.ModelManager.EditBattleTeamModel,
					o = t.GetCurrentEditRoleSlotData,
					n = o.GetRoleData;
				if (n && !n.IsSelf)
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Formation",
							8,
							"[EditBattleTeam]无法改变别的玩家的角色",
						),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"EditBattleTeamLastRole",
						);
				else {
					this.O3t(!0);
					var a = e;
					const M = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a);
					if (M && (M.IsTrialRole() || t.CanAddRoleToEditTeam(a))) {
						switch (this.W3t(a)) {
							case 2:
								o.ResetRoleData();
								break;
							case 3:
								if (o) {
									var l = t.GetSlotDataByConfigId(a);
									if (!l) return;
									var r = l.GetRoleData;
									if (!r) return;
									var i = o.GetRoleData;
									if (!i) return void l.ResetRoleData();
									l.SetRoleData(i), o.SetRoleData(r);
									break;
								}
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"IsInTeam",
								);
							case 4:
								return;
							default: {
								const e =
									ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a);
								l = e.GetLevelData();
								let n = o.GetRoleData;
								((n = n || t.CreateRoleDataFromRoleInstance(e)).ConfigId = a),
									(n.Level = l.GetLevel()),
									o.SetRoleData(n);
								break;
							}
						}
						t.IsMultiInstanceDungeon
							? ((n = t.GetOwnRoleConfigIdList),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Formation",
										8,
										"[EditBattleTeam]请求改变战前编队角色:RoleConfigList",
										["RoleConfigList", n],
									),
								InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
									t.GetOwnRoleConfigIdList[0],
								))
							: this.g3t();
					}
				}
			}),
			(this.N3t = () => {
				this.O3t(!0);
			}),
			(this.dVe = (e, t) => new EditFormationTabItem_1.EditFormationTabItem()),
			(this.yqe = (e) => {
				var t = EditFormationDefine_1.FORMATION_SPRITES[e],
					o =
						((t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								t,
							)),
						(e = e + 1),
						ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
							"TeamText",
						));
				return (
					(t = new CommonTabData_1.CommonTabData(
						t,
						new CommonTabTitleData_1.CommonTabTitleData(o, e),
					)).SetSmallIcon(
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_TeamTitle",
						),
					),
					t
				);
			}),
			(this.X3t = (e) => {
				if (this.m3t) this.m3t = !1;
				else {
					e = e + 1;
					var t =
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Formation", 5, "当点击编队按钮时", [
									"formationId",
									e,
								]),
							ModelManager_1.ModelManager.EditBattleTeamModel),
						o = ModelManager_1.ModelManager.RoleModel,
						n =
							ModelManager_1.ModelManager.EditFormationModel.GetFormationData(
								e,
							)?.GetRoleIdList;
					for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
						var a,
							l = t.GetRoleSlotData(e);
						n && !l.IsProhibit && (a = n[e - 1])
							? ((a = o.GetRoleDataById(a)),
								(a = t.CreateRoleDataFromRoleInstance(a)),
								l.SetRoleData(a))
							: l.ResetRoleData();
					}
					this.C3t(), this.g3t();
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[4, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIText],
			[7, UE.UIButtonComponent],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIButtonComponent],
			[15, UE.UIButtonComponent],
			[16, UE.UIText],
			[17, UE.UISprite],
			[18, UE.UIButtonComponent],
			[19, UE.UIText],
			[20, UE.UIButtonComponent],
			[21, UE.UIItem],
			[22, UE.UIItem],
			[23, UE.UIItem],
			[24, UE.UIItem],
			[25, UE.UISpriteTransition],
			[26, UE.UISpriteTransition],
			[27, UE.UISpriteTransition],
		]),
			(this.BtnBindInfo = [
				[4, this.R3t],
				[3, this.P3t],
				[6, this.x3t],
				[7, this.w3t],
				[14, this.B3t],
				[15, this.b3t],
				[18, this.k3t],
				[8, this.F3t],
				[20, this.q3t],
			]);
	}
	async OnBeforeStartAsync() {
		var e =
				((e =
					ModelManager_1.ModelManager
						.EditBattleTeamModel).InitAllRoleSlotData(),
				e.IsMultiInstanceDungeon),
			t = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
			o =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon();
		this.GetButton(20).RootUIComp.SetUIActive(!e),
			this.GetButton(8).RootUIComp.SetUIActive(e),
			this.GetItem(12).SetUIActive(!e && !t && !o),
			this.GetButton(14).RootUIComp.SetUIActive(t || o),
			this.GetButton(15).RootUIComp.SetUIActive(t),
			this.GetItem(13).SetUIActive(t || o),
			e
				? (this.GetItem(12).SetUIActive(!1), this.GetItem(9).SetUIActive(!1))
				: t
					? (this.GetItem(12).SetUIActive(!1),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(19),
							"EditBattleTeamTitle",
						))
					: ((this.m3t = !0), await this.$3t()),
			this.O3t(!0),
			this.Y3t(),
			this.C3t(),
			this.g3t(),
			this.RefreshEnterButton(),
			this.mGe(t),
			this.Ore(),
			this.f3t(),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnBeforeDestroy() {
		for (const e of this.h3t) e.Destroy();
		this.h3t.length = 0;
		for (const e of this.l3t) e.Destroy();
		this.l3t.splice(0, this.l3t.length),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
				!1,
			);
		var e = ModelManager_1.ModelManager.TowerModel.CheckInTower();
		ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon ||
			e ||
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
			this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			this.kre(),
			this.EPe?.Clear(),
			(this.EPe = void 0),
			(this.m3t = !1);
	}
	OnBeforeShow() {
		var e;
		this.cpt &&
			((e =
				ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId),
			this.cpt.SelectToggleByIndex(e - 1),
			this.cpt.GetTabItemByIndex(e - 1).ShowTeamBattleTips());
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
				this.L3t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshPlayerUiState,
				this.D3t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ScenePlayerLeaveScene,
				this.E3t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MatchTeamFlagChange,
				this.y3t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPushChatRowData,
				this.JYe,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
				this.L3t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshPlayerUiState,
				this.D3t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ScenePlayerLeaveScene,
				this.E3t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MatchTeamFlagChange,
				this.y3t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPushChatRowData,
				this.JYe,
			);
	}
	H3t(e) {
		(e = this.J3t(e)) &&
			!UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") &&
			(ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon &&
				OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
					Protocol_1.Aki.Protocol.FNs.Proto_Selecting,
				),
			UiManager_1.UiManager.OpenView("TeamRoleSelectView", e));
	}
	J3t(e) {
		var t = ModelManager_1.ModelManager.EditBattleTeamModel,
			o = t.GetRoleList(),
			n = t.GetRoleSlotData(e)?.GetRoleData?.ConfigId,
			a =
				((n = new TeamRoleSelectView_1.TeamRoleSelectViewData(
					ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
						? 29
						: 4,
					n,
					o,
					this.Q3t,
					this.N3t,
					e,
				)).SetGetConfirmButtonEnableFunction(this.j3t),
				n.SetGetConfirmButtonTextFunction(this.K3t),
				n.SetHideFinishCallBack(this.A3t),
				ModelManager_1.ModelManager.EditBattleTeamModel
					.IsMultiInstanceDungeon &&
					n.SetOtherTeamSlotData(
						ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
					),
				n.SetConfirmCheckFunction(this.S3t),
				(n.IsNeedRevive = this.v3t),
				(n.CanJoinTeam = this.p3t),
				new Array());
		for (const e of t.GetAllRoleSlotData) {
			var l = e.GetRoleData;
			!l ||
				(t.IsMultiInstanceDungeon &&
					l.PlayerId !==
						ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
				a.push(l.ConfigId);
		}
		return (n.FormationRoleList = a), n;
	}
	I3t(e) {
		if (e) {
			var t = (e = ModelManager_1.ModelManager.EditBattleTeamModel)
					.GetAllRoleSlotData,
				o = new Array(),
				n = e.GetLeaderPlayerId;
			let s = !1;
			for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
				var a = t[e - 1],
					l = this.z3t(e);
				a &&
					l &&
					((a = a.GetRoleData)
						? a.PlayerId === n && (s ? o.push(l) : (s = !0))
						: o.push(l));
			}
			var r =
				ModelManager_1.ModelManager.InstanceDungeonModel.GetNeedMatchSize();
			const d = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
			var i = d.MatchingTime;
			for (let e = 0; e < r; e++) {
				var M = o.pop();
				M?.SetMatchState(!0), M?.SetMatchTime(i);
			}
			(d.MatchingTime = 0),
				(d.OnStopTimer = () => !d.EditBattleTeamMatching),
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
					this.T3t,
				);
		} else for (const e of this.h3t) e.SetMatchState(!1);
	}
	U3t() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Formation",
				8,
				"[EditBattleTeam]队长{PlayerId} 请求进入副本",
				["{PlayerId}", ModelManager_1.ModelManager.PlayerInfoModel.GetId()],
			),
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterMatchInstRequest().then(
				(e) => {
					e &&
						EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
				},
				() => {},
			);
	}
	RefreshEnterButton() {
		var e = this.GetText(5),
			t = this.GetButton(6).RootUIComp,
			o = this.GetButton(7).RootUIComp,
			n = ModelManager_1.ModelManager.EditBattleTeamModel;
		if (n.IsMultiInstanceDungeon) {
			var a = ModelManager_1.ModelManager.InstanceDungeonModel;
			if (a.IsMatchTeamHost()) {
				var l =
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel
						.EditBattleTeamMatching;
				const n = l ? "EditBattleTeamCancelMatch" : "MatchingButtonLeader";
				LguiUtil_1.LguiUtil.SetLocalText(e, n),
					(l = a.IsTeamNotFull() && !l),
					t.SetUIActive(l),
					(l = !a.IsAllPlayerInMatchTeam()),
					o.SetUIActive(l);
			} else {
				const a = n.GetSelfIsReady
					? "MatchingButtonMemberCancel"
					: "MatchingButtonMember";
				LguiUtil_1.LguiUtil.SetLocalText(e, a),
					t.SetUIActive(!1),
					o.SetUIActive(!1);
			}
		} else
			LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingButtonLeader"),
				t.SetUIActive(!1),
				o.SetUIActive(!1);
	}
	Y3t() {
		var e = this.GetItem(0),
			t = this.GetItem(1),
			o = this.GetItem(2);
		this.Z3t(e, 1),
			this.Z3t(t, 2),
			this.Z3t(o, 3),
			this.GetButton(18).RootUIComp.SetUIActive(!1);
	}
	Z3t(e, t) {
		(e = new FormationRoleView_1.FormationRoleView(e, t)).BindOnSelectRole(
			this.V3t,
		),
			this.h3t.push(e),
			this.e4t(t),
			e.SetCanAddRole(!0);
	}
	C3t() {
		var e = ModelManager_1.ModelManager.EditBattleTeamModel,
			t = (e.RefreshAllEmptySlotData(), this.GetButton(18).RootUIComp),
			o = e.GetAllRoleSlotData;
		if (o) {
			let s = !1;
			for (const e of o)
				if (e.GetRoleData) {
					s = !0;
					break;
				}
			t.SetUIActive(s);
			for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
				var n,
					a,
					l,
					r,
					i,
					M = o[e - 1];
				M &&
					(n = this.z3t(e)) &&
					(M.IsProhibit
						? (this.e4t(e), n.SetCanAddRole(!1))
						: (n.SetCanAddRole(!0),
							(a =
								ModelManager_1.ModelManager.EditBattleTeamModel
									.IsMultiInstanceDungeon),
							(M = M.GetRoleData)
								? ((l = M.ConfigId),
									(r = M.Level),
									(i = ModelManager_1.ModelManager.RoleModel.GetRoleName(l)),
									a
										? (this.e4t(
												e,
												l,
												r,
												M.PlayerName,
												M.OnlineIndex ?? 1,
												M.PlayerId,
											),
											n.RefreshPrepareState())
										: this.e4t(e, l, r, i, 0, 0))
								: (this.e4t(e), a && n.RefreshPrepareState())));
			}
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel
					.EditBattleTeamMatching),
				this.I3t(e),
				this.f3t();
		} else t.SetUIActive(!1);
	}
	e4t(e, t = 0, o = 0, n = "", a = 0, l = 0) {
		var r = e - 1;
		if ((e = this.z3t(e))) {
			const i = this.GetUiSpriteTransition(this._3t[r]);
			let M = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_TeamRoleSkillNone",
			);
			if (t) {
				if (
					(e.Refresh(t, o, n, a, l),
					(r =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.SkillId),
					r)
				)
					for (const e of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
						r,
					))
						if (e.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
							M = e.Icon;
							break;
						}
			} else e.ResetRole();
			ResourceSystem_1.ResourceSystem.LoadAsync(
				M,
				UE.LGUISpriteData_BaseObject,
				(e, t) => {
					i.SetAllTransitionSprite(e);
				},
				102,
			);
		}
	}
	g3t() {
		var e,
			t = this.GetButton(4),
			o = ModelManager_1.ModelManager.EditBattleTeamModel;
		if (
			o.IsMultiInstanceDungeon &&
			ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
		)
			return ModelManager_1.ModelManager.InstanceDungeonEntranceModel
				.EditBattleTeamMatching
				? void t.SetSelfInteractive(!0)
				: void (o.GetIsAllReady
						? t.SetSelfInteractive(!0)
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Formation",
									49,
									"[EditBattleTeam] 有玩家未准备",
								),
							t.SetSelfInteractive(!1)));
		!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
		o.IsAllRoleDie
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Formation", 49, "[EditBattleTeam] 全角色已死亡"),
				t.SetSelfInteractive(!1))
			: o.GetAllRoleCanAddToTeam()
				? ((e = o.GetRoleCountInRoleSlot()),
					o.IsMultiInstanceDungeon && !o.IsInLimitRoleCount(e)
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Formation",
									49,
									"[EditBattleTeam] 角色人数不符合要求",
								),
							t.SetSelfInteractive(!1))
						: t.SetSelfInteractive(!0))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Formation",
							49,
							"[EditBattleTeam] 未通过副本条件检测",
						),
					t.SetSelfInteractive(!1));
	}
	O3t(e) {
		var t = this.GetButton(3)
			.GetOwner()
			.GetComponentByClass(UE.UIItem.StaticClass());
		t && t.SetUIActive(e);
	}
	z3t(e) {
		if (!(e > this.h3t.length)) return this.h3t[e - 1];
	}
	W3t(e) {
		var t;
		return e
			? (t =
					ModelManager_1.ModelManager.EditBattleTeamModel
						.GetCurrentEditRoleSlotData)
				? t.GetRoleConfigId === e
					? 2
					: ModelManager_1.ModelManager.EditBattleTeamModel.HasSameConfigIdInAnyOwnRoleSlot(
								e,
							)
						? 3
						: 1
				: 0
			: 4;
	}
	async $3t() {
		var e = this.GetItem(11),
			t =
				ModelManager_1.ModelManager.EditBattleTeamModel
					.GetCurrentFightFormation;
		ModelManager_1.ModelManager.GameModeModel.IsMulti || !t.ChooseRole
			? this.GetItem(12).SetUIActive(!1)
			: ((t = new CommonTabComponentData_1.CommonTabComponentData(
					this.dVe,
					this.X3t,
					this.yqe,
				)),
				(this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(e, t)),
				await this.cpt.RefreshTabItemAsync(5));
	}
	M3t(e) {
		var t;
		return (
			!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
			!(
				!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				((t =
					ModelManager_1.ModelManager.EditBattleTeamModel.IsInEditBattleTeam(
						e,
					)),
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
					e,
				)?.IsTrialRole()) ||
				t ||
				!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e)
			)
		);
	}
	mGe(e) {
		var t = ModelManager_1.ModelManager.EditBattleTeamModel,
			o = this.GetText(16);
		let n;
		n = (
			e
				? ((e = ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor),
					(a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
					(e =
						ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(e)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(16),
						"Text_TowerAreaFloor_Text",
						e,
						a.Floor,
					),
					a)
				: ((e = t.GetCurrentDungeonConfig),
					LguiUtil_1.LguiUtil.SetLocalTextNew(o, e.MapName),
					e)
		).RecommendElement;
		var a = this.GetItem(23);
		if (!n || n.length <= 0) a.SetUIActive(!1);
		else {
			a.SetUIActive(!0);
			var l = this.GetItem(21),
				r = this.GetItem(22);
			for (const e of n) {
				var i = LguiUtil_1.LguiUtil.CopyItem(r, l);
				i = new MiniElementItem_1.MiniElementItem(e, i, i.GetOwner());
				this.l3t.push(i);
			}
			r.SetUIActive(!1);
		}
	}
	f3t() {
		var e = this.GetItem(24),
			t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
		!t ||
		-1 !== ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor ||
		ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon
			? e.SetUIActive(!1)
			: ((t =
					ModelManager_1.ModelManager.InstanceDungeonModel.CheckPrewarFormationAverageLowLevel(
						t,
					)),
				e.SetUIActive(t));
	}
}
exports.EditBattleTeamView = EditBattleTeamView;
