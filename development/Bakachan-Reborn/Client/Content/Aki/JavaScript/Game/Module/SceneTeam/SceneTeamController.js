"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneTeamController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IMatch_1 = require("../../../UniverseEditor/Interface/IMatch"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../Common/StatDefine"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	FormationDataController_1 = require("../Abilities/FormationDataController"),
	BuffItemControl_1 = require("../BuffItem/BuffItemControl"),
	CombatMessage_1 = require("../CombatMessage/CombatMessage"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	SceneTeamData_1 = require("./SceneTeamData"),
	SceneTeamDefine_1 = require("./SceneTeamDefine"),
	SceneTeamEvent_1 = require("./SceneTeamEvent");
class SceneTeamController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.Rfo = void 0),
			(this.Ufo = void 0),
			(this.Afo = void 0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				SceneTeamController.uht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				SceneTeamController.GUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				SceneTeamController.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				SceneTeamController.xfo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			Net_1.Net.Register(15312, SceneTeamController.wfo),
			Net_1.Net.Register(18054, SceneTeamController.Bfo),
			Net_1.Net.Register(25495, SceneTeamController.bfo),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				SceneTeamController.uht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				SceneTeamController.GUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				SceneTeamController.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				SceneTeamController.xfo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenSet,
				this.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			Net_1.Net.UnRegister(15312),
			Net_1.Net.UnRegister(18054),
			Net_1.Net.UnRegister(25495),
			this.qfo &&
				(TimerSystem_1.TimerSystem.Remove(this.qfo), (this.qfo = void 0)),
			!0
		);
	}
	static ShowControlledRole(e) {
		for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
			e,
		)) {
			var o,
				t = n.EntityHandle;
			t &&
				((o = t.Entity.GetComponent(89)), n.IsControl()) &&
				!o?.IsInGame &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("SceneTeam", 49, "复活显示角色", ["EntityId", t.Id]),
				ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					n.EntityHandle.Entity,
					!0,
					"SceneTeamControl.ShowControlledRole",
				));
		}
	}
	static RoleDeathEnded(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneTeam", 49, "开始执行队伍角色死亡逻辑", [
				"EntityId",
				e,
			]);
		var o = ModelManager_1.ModelManager.SceneTeamModel,
			t = ((e = o.GetTeamItem(e, { ParamType: 1 })), e?.EntityHandle?.Entity);
		if (t)
			if (
				ModelManager_1.ModelManager.DeadReviveModel.IsPlayerDead(
					e.GetPlayerId(),
				)
			)
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "隐藏死亡角色"),
					ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						t,
						!1,
						"SceneTeamControl.RoleDeathEnded",
					);
			else if (t.GetComponent(3)?.IsAutonomousProxy)
				if ((e = o.GetCurrentTeamItem))
					if (e.IsDead()) {
						for (const e of o.GetTeamItems(!0))
							if (!e.IsDead()) {
								var n = e.GetCreatureDataId();
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("SceneTeam", 49, "前台角色死亡进行切人", [
										"CreatureDataId",
										n,
									]),
									(o.GoBattleInvincible = !0),
									SceneTeamController.RequestChangeRole(n);
								break;
							}
					} else
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "当前角色未死亡");
				else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SceneTeam", 49, "死亡时编队无当前角色");
			else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "非逻辑主控死亡不进行切人");
		else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SceneTeam", 49, "无法获取死亡角色Entity");
	}
	static RequestChangeRole(e, o = !0, t = !1) {
		const n = ModelManager_1.ModelManager.SceneTeamModel;
		var a,
			r = n.GetCurrentTeamItem,
			l = n.GetTeamItem(e, { ParamType: 3 });
		!l ||
			(o && r?.GetCreatureDataId() === e) ||
			((o = SceneTeamController.Gfo()) !==
				Protocol_1.Aki.Protocol.Sks.Proto_SignleWorld ||
			GlobalData_1.GlobalData.Networking()
				? l.IsDead()
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SceneTeam", 49, "角色已经死亡", [
							"CreatureDataId",
							e,
						])
					: (ModelManager_1.ModelManager.GameModeModel.IsMulti ||
							this.ResponseChangeRole(e, t),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "请求切换当前角色", [
								"CreatureDataId",
								e,
							]),
						(n.ChangingRole = !0),
						((a = new Protocol_1.Aki.Protocol.Bzn()).l3n = l.GetConfigId),
						(a.aVn = o),
						Net_1.Net.Call(12642, a, (o) => {
							var a;
							o &&
								(Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("SceneTeam", 49, "切换当前角色响应"),
								(n.ChangingRole = !1),
								o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
									? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
										this.ResponseChangeRole(e, t)
									: (o = o.l3n) && 0 !== o
										? (a = n
												.GetTeamItem(o, { ParamType: 0, OnlyMyRole: !0 })
												?.GetCreatureDataId())
											? (Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"SceneTeam",
														49,
														"请求换人失败，已更换正确角色",
														["角色Id", o],
													),
												this.ResponseChangeRole(a, t))
											: Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"SceneTeam",
													49,
													"请求换人失败，在队伍中未找到角色",
													["角色Id", o],
												)
										: Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"SceneTeam",
												49,
												"请求换人失败，全角色已死亡",
												["角色Id", o],
											));
						}))
				: ((l = r?.EntityHandle?.Entity?.GetComponent(86)?.IsInQte ?? !1),
					(o = ModelManager_1.ModelManager.SceneTeamModel.ChangeRoleCooldown),
					n.ChangeRole(e, !l, o, t)));
	}
	static Gfo() {
		return ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon
			? Protocol_1.Aki.Protocol.Sks.Proto_FbInstance
			: ModelManager_1.ModelManager.GameModeModel.IsMulti
				? Protocol_1.Aki.Protocol.Sks.Proto_MultiWorld
				: Protocol_1.Aki.Protocol.Sks.Proto_SignleWorld;
	}
	static ResponseChangeRole(e, o = !1) {
		var t, n, a;
		ModelManager_1.ModelManager.GameModeModel.IsTeleport
			? (ModelManager_1.ModelManager.SceneTeamModel.ChangeCreatureDataIdCache =
					e)
			: ((t =
					ModelManager_1.ModelManager.SceneTeamModel).RefreshLastTransform(),
				(n = (a = t.GetTeamItem(e, { ParamType: 3 }))?.EntityHandle.Entity) &&
				a.IsMyRole()
					? ((a = n.GetComponent(86)),
						t.ChangeRole(e, !a.IsInQte, t.ChangeRoleCooldown, o) ||
							(ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "队伍实体无法获取或非本机", [
								"CreatureDataId",
								e,
							]),
						(ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1)));
	}
	static TryChangeRoleOrQte(e) {
		if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SceneTeam", 49, "在换人请求返回前尝试换人");
		else {
			var o = (l = ModelManager_1.ModelManager.SceneTeamModel).GetTeamItem(e, {
					ParamType: 3,
				}),
				t = o?.EntityHandle,
				n = l.GetCurrentTeamItem,
				a = n?.EntityHandle;
			if (a && n.GetCreatureDataId() !== e)
				if (t)
					if (o.IsMyRole()) {
						if (
							!(i = a.Entity.CheckGetComponent(185)).HasTag(1008164187) &&
							!i.HasTag(191377386)
						) {
							var r = ModelManager_1.ModelManager.TowerModel.CheckInTower();
							if (i.HasTag(-1697149502))
								r &&
									!FormationDataController_1.FormationDataController
										.GlobalIsInFight &&
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"CannotChangeRoleBeforeStartBattle",
									);
							else if (-1 === l.CurrentGroupType)
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"SceneTeam",
										29,
										"当前正在操控幻象，不能切角色",
									);
							else {
								var l = i.HasTag(504239013) || i.HasTag(855966206),
									i = t.Entity.CheckGetComponent(185),
									m = a.Entity.GetComponent(86),
									g = t.Entity.GetComponent(86),
									s = ((l = !l && g.IsQteReady(a)), i.HasTag(-2107968822));
								if (l) {
									if (s)
										return void (
											i.HasTag(1414093614) || g.TryExecuteQte(a, !0)
										);
									if (
										ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
											o.GetConfigId,
										).Intervene
									)
										return void g.TryExecuteQte(a);
								}
								if (!s) {
									if (o.IsDead())
										return ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
											r
											? void (
													r &&
													ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
														"InstanceDungeonShieldViewCantOpen",
													)
												)
											: void BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(
													o.GetConfigId,
												);
									(i = t.Entity.CheckGetComponent(81).IsChangeRoleCoolDown()),
										!l && i
											? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
													"EditBattleTeamInCD",
												)
											: 0 !== (s = n.CanGoDown(l))
												? Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"SceneTeam",
														49,
														"下场角色无法换人",
														["Result", s],
														["roleId", n.GetConfigId],
													)
												: 0 !== (r = o.CanGoBattle())
													? Log_1.Log.CheckInfo() &&
														Log_1.Log.Info(
															"SceneTeam",
															49,
															"上场角色无法换人",
															["Result", r],
															["roleId", o.GetConfigId],
														)
													: (l &&
															(SceneTeamController.Nfo(t.Id, a.Id),
															m.UseExitSkill(t),
															g.TryExecuteQte(a)),
														SceneTeamController.RequestChangeRole(
															o.GetCreatureDataId(),
															!0,
															!0,
														));
								}
							}
						}
					} else
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "上场角色为其他玩家的角色", [
								"CreatureDataId",
								e,
							]),
							SceneTeamController.TryUseMultiQte(t);
				else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SceneTeam", 49, "上场角色实体不存在", [
							"CreatureDataId",
							e,
						]);
			else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "下场角色实体不存在或相同", [
						"CreatureDataId",
						e,
					]);
		}
	}
	static TryUseMultiQte(e) {
		var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem,
			t = o.EntityHandle.Entity.GetComponent(86);
		return t.IsQteReady(e)
			? (e.Entity.GetComponent(86).UseExitSkill(o.EntityHandle),
				t.TryExecuteQte(e),
				!0)
			: (e.Entity.GetComponent(185).HasTag(166024319) ||
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"TeammateQteDisable",
					),
				!1);
	}
	static IsMatchRoleOption(e) {
		var o = ModelManager_1.ModelManager.SceneTeamModel,
			t = o.IsPhantomTeam,
			n = o.GetTeamItems();
		for (const o of e)
			switch (o.Type) {
				case IMatch_1.EMatchRoleType.Player:
					if (t) break;
					return !0;
				case IMatch_1.EMatchRoleType.Phantom:
					if (t) for (const e of n) if (e.GetConfigId === o.Id) return !0;
			}
		return !1;
	}
	static Nfo(e, o) {
		var t = new Protocol_1.Aki.Protocol.wNn(),
			n =
				((e = MathUtils_1.MathUtils.NumberToLong(
					ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
				)),
				MathUtils_1.MathUtils.NumberToLong(
					ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(o),
				));
		(t.hVn = e),
			(t.lVn = n),
			CombatMessage_1.CombatNet.Call(28906, o, t, (e) => {});
	}
	static EmitEvent(e, o, ...t) {
		e &&
			(EventSystem_1.EventSystem.EmitWithTarget(e, o, ...t),
			(e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
				ParamType: 1,
			}))) &&
			(e.IsMyRole() &&
				EventSystem_1.EventSystem.EmitWithTarget(
					SceneTeamEvent_1.SceneTeam.Local,
					o,
					...t,
				),
			EventSystem_1.EventSystem.EmitWithTarget(
				SceneTeamEvent_1.SceneTeam.All,
				o,
				...t,
			));
	}
}
(exports.SceneTeamController = SceneTeamController),
	((_a = SceneTeamController).Rfo = void 0),
	(SceneTeamController.Ufo = void 0),
	(SceneTeamController.Afo = void 0),
	(SceneTeamController.qfo = void 0),
	(SceneTeamController.gKe = (e, o) => {
		10036 === e &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnConcertoResponseOpen,
				o,
			);
	}),
	(SceneTeamController.Zpe = (e) => {
		GlobalData_1.GlobalData.BpEventManager.小队战斗状态改变时.Broadcast(e);
	}),
	(SceneTeamController.xfo = () => {
		_a.qfo ||
			(_a.qfo = TimerSystem_1.TimerSystem.Forever(
				_a.Ofo,
				SceneTeamDefine_1.CHECK_ROLE_INTERVAL,
			));
	}),
	(SceneTeamController.uht = () => {
		var e,
			o = ModelManager_1.ModelManager.SceneTeamModel;
		o.RefreshLastTransform(),
			0 < o.ChangeCreatureDataIdCache &&
				((e = o.ChangeCreatureDataIdCache),
				(o.ChangeCreatureDataIdCache = 0),
				(ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1),
				o.ChangeRole(e, !1));
	}),
	(SceneTeamController.GUe = (e, o, t) => {
		ModelManager_1.ModelManager.SceneTeamModel.AddEntity(o);
	}),
	(SceneTeamController.zpe = (e, o) => {
		var t = ModelManager_1.ModelManager.SceneTeamModel;
		o.Id === t.GetCurrentEntity?.Id &&
			((t.LastEntityIsOnGround =
				o.Entity.GetComponent(89).PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
			ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				t.RefreshLastTransform());
	}),
	(SceneTeamController.bfo = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneTeam", 5, "9603 换人同步", ["massage", e]);
		var o = MathUtils_1.MathUtils.LongToNumber(e.VLs),
			t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
			n = t.Entity.GetComponent(0);
		if (t?.Valid) {
			var a = n.GetRoleId();
			if (e.aFn === ModelManager_1.ModelManager.PlayerInfoModel.GetId())
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 5, "通过换人同步切换角色", [
						"massage",
						e,
					]),
					SceneTeamController.ResponseChangeRole(o);
			else {
				var r = MathUtils_1.MathUtils.LongToNumber(e.$Ls),
					l = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
				if (l?.Valid) {
					t.IsInit &&
						t.Entity.GetComponent(3).SetActorTransform(
							l.Entity.GetComponent(3).ActorTransform,
							"SwitchRoleNotify",
							!1,
						),
						n.SetVisible(!0),
						ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
							t.Entity,
							!0,
							"SceneTeamControl.SwitchRoleNotify",
						);
					n = t.Entity.GetComponent(160).MainAnimInstance;
					var i = l.Entity.GetComponent(160).MainAnimInstance,
						m =
							((n =
								(UE.KuroStaticLibrary.IsObjectClassByName(
									n,
									CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
								) &&
									UE.KuroStaticLibrary.IsObjectClassByName(
										i,
										CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
									) &&
									n.替换角色时同步动作数据(i),
								t.Entity.GetComponent(57))),
							(i = l.Entity.GetComponent(57)),
							n.CloneMoveSampleInfos(i),
							l.Entity.GetComponent(0));
					m.SetVisible(!1),
						ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(
							e.aFn,
							o,
						);
					for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
						e.aFn,
					))
						o.GetConfigId === m.GetRoleId()
							? o.SetRemoteIsControl(!1)
							: o.GetConfigId === a && o.SetRemoteIsControl(!0);
					ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						l.Entity,
						!1,
						"SceneTeamControl.SwitchRoleNotify",
					),
						ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
							e.aFn,
						)?.ControlRole(o),
						GlobalData_1.GlobalData.GameInstance &&
							GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnOtherChangeRole,
						);
				} else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneTeam",
							5,
							"[SceneTeam.SwitchRoleNotify] 不存在下阵的Entity。",
							["DownCreatureDataId", r],
						);
			}
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"SceneTeam",
					5,
					"[SceneTeam.SwitchRoleNotify] 不存在上阵的Entity。",
					["UpCreatureId", o],
				);
	}),
	(SceneTeamController.Bfo = (e) => {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 49, "切换编队组推送"),
			ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.aFn, e.afs);
	}),
	(SceneTeamController.wfo = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneTeam", 49, "更新编队组推送", ["Data", e]);
		var o = new Array();
		for (const r of e.JEs) {
			var t = r.aFn;
			for (const e of r.YEs) {
				var n = [];
				for (const o of e.HEs) {
					var a = new SceneTeamData_1.SceneTeamRole();
					(a.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(o.rkn)),
						(a.RoleId = o.l3n),
						n.push(a);
				}
				o.push({
					PlayerId: t,
					GroupType: e.afs,
					GroupRoleList: n,
					CurrentRoleId: e.Y4n,
					IsRetain: e.QEs,
				});
			}
		}
		ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerGroup(o);
	}),
	(SceneTeamController.Ofo = () => {
		var e, o, t;
		Net_1.Net.IsServerConnected() &&
			((e = (o = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem)
				? (o = o.CurrentGroupType) && -1 !== o
					? (((t = new Protocol_1.Aki.Protocol.IZn()).aFn = e.GetPlayerId()),
						(t._Vn = e.GetConfigId),
						(t.uVn = e.GetCreatureDataId()),
						Net_1.Net.Call(3989, t, () => {}))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SceneTeam", 49, "检查当前角色，控制特殊角色中", [
							"groupType",
							o,
						])
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "检查当前角色，无法获取队伍实例"));
	});
