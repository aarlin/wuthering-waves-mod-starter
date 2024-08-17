"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneTeamModel = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../Common/StatDefine"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent"),
	GameModePromise_1 = require("../../World/Define/GameModePromise"),
	WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
	WorldGlobal_1 = require("../../World/WorldGlobal"),
	UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary"),
	SceneTeamData_1 = require("./SceneTeamData"),
	SceneTeamDefine_1 = require("./SceneTeamDefine"),
	SceneTeamItem_1 = require("./SceneTeamItem");
class SceneTeamModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Jfo = void 0),
			(this.zfo = new Map()),
			(this.PPr = new Array()),
			(this.epo = new Set()),
			(this.CurrentGroupType = void 0),
			(this.Wfo = void 0),
			(this.tpo = void 0),
			(this.Ywi = void 0),
			(this.IsTeamReady = !1),
			(this.GoBattleInvincible = !1),
			(this.ChangingRole = !1),
			(this.IsPhantomTeam = !1),
			(this.ChangeCreatureDataIdCache = 0),
			(this.ChangeRoleCooldown = -0),
			(this.ipo = void 0),
			(this.LastEntityIsOnGround = !0),
			(this.LoadTeamPromise = void 0);
	}
	OnInit() {
		return (
			(this.ChangeRoleCooldown =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"change_role_cooldown",
				)),
			!(this.Jfo = void 0)
		);
	}
	OnLeaveLevel() {
		return this.opo(), !0;
	}
	OnChangeMode() {
		return this.opo(), !0;
	}
	opo() {
		(this.ChangeCreatureDataIdCache = 0), (this.ipo = void 0);
		for (const e of this.zfo.values()) e.Clear();
		this.zfo.clear();
		for (const e of this.PPr) e.Reset();
		(this.PPr.length = 0),
			this.epo.clear(),
			(this.Wfo = void 0),
			(this.Ywi = void 0),
			(this.IsPhantomTeam = !1),
			(this.tpo = void 0);
	}
	SwitchGroup(e, t, o = !1) {
		var r,
			a = this.zfo.get(e);
		a
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneTeam",
						49,
						"切换编队组",
						["PlayerId", e],
						["GroupType", t],
					),
				t !== a.GetCurrentGroupType() &&
					((r = this.CurrentGroupType),
					a.SwitchGroup(t),
					e === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
						((this.CurrentGroupType = t), (this.IsPhantomTeam = 2 === t)),
					this.rpo(r, o)))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneTeam", 49, "切换编队组玩家不存在", [
					"PlayerId",
					e,
				]);
	}
	UpdateAllPlayerGroup(e) {
		for (const e of this.zfo.values()) e.ResetServerGroupData();
		for (const t of e) this.ZEn(t);
		this.rpo();
	}
	UpdateGroup(e) {
		this.ZEn(e),
			e.GroupType === this.zfo.get(e.PlayerId)?.GetCurrentGroupType() &&
				this.rpo();
	}
	ZEn({
		PlayerId: e,
		GroupType: t,
		GroupRoleList: o,
		CurrentRoleId: r,
		IsRetain: a = !1,
	}) {
		let n = this.zfo.get(e);
		n || ((n = SceneTeamData_1.SceneTeamPlayer.Create(e)), this.zfo.set(e, n)),
			n.UpdateGroup(t, o, r, a);
	}
	rpo(e = this.CurrentGroupType ?? 0, t = !1) {
		let o;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，开始"),
			(this.IsTeamReady = !1),
			this.RefreshLastTransform(),
			(this.PPr.length = 0),
			this.epo.clear(),
			this.LoadTeamPromise ||
				(this.LoadTeamPromise = new GameModePromise_1.GameModePromise()),
			this.Wfo &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，中断等待"),
				this.Wfo.Cancel());
		var r = [];
		const a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
		for (const e of ModelManager_1.ModelManager.GameModeModel.IsMulti
			? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
			: [a]) {
			var n = this.zfo.get(e)?.GetCurrentGroup(),
				i = n?.GetRoleList();
			if (i && 0 !== i.length) {
				var l = n.GetGroupType(),
					s = n.GetCurrentRole();
				for (const t of i) {
					var d,
						u,
						h = t.CreatureDataId;
					h <= 0 ||
						((u = t.RoleId),
						(d = t === s),
						(u = SceneTeamItem_1.SceneTeamItem.Create(l, e, u, h)),
						this.PPr.push(u),
						this.epo.add(e),
						r.push(h),
						u.IsMyRole() ? d && (o = u) : u.SetRemoteIsControl(d));
				}
			}
		}
		this.GetTeamItems(!0).length <= 0
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，当前玩家无角色实体")
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载开始"),
				(this.Wfo = WaitEntityTask_1.WaitEntityTask.Create(
					r,
					(r) => {
						r ||
							(Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，加载角色失败")),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载结束");
						for (const e of this.PPr) e.UpdateEntityHandle();
						var n = (r = this.CurrentGroupType) && r !== e,
							i = this.Ywi?.EntityHandle?.Entity;
						const l = o?.EntityHandle?.Entity;
						if (
							((i = i && i.Id !== l?.Id),
							n &&
								i &&
								((n = l?.CheckGetComponent(81)),
								SceneTeamDefine_1.innerGroupType.includes(e) ||
								SceneTeamDefine_1.innerGroupType.includes(r)
									? n?.SetTeamTag(2)
									: (n?.SetTeamTag(0), (this.Ywi = void 0))),
							o && !o.IsDead())
						) {
							const e = o.EntityHandle;
							e && e.Id === this.Ywi?.EntityHandle?.Id
								? (this.Ywi = o)
								: this.ChangeRole(o.GetCreatureDataId(), t),
								this.H4s();
						} else {
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"SceneTeam",
									49,
									"刷新出战编队，当前角色不可上阵",
								);
							for (const e of this.PPr)
								if (e.IsMyRole() && !e.IsDead())
									return (
										ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
											e.GetCreatureDataId(),
											!1,
										),
										void this.H4s()
									);
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，未找到存活角色"),
								o
									? (this.ChangeRole(o.GetCreatureDataId(), !1, 0, !1, !0),
										l &&
											ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
												l,
												!1,
												"SceneTeamControl.SwitchRoleAllDead",
											))
									: Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"SceneTeam",
											49,
											"刷新出战编队，数据错误，当前玩家找不到可上阵角色",
											[
												"CurrentRole",
												this.zfo.get(a)?.GetCurrentGroup()?.GetCurrentRole(),
											],
										),
								this.H4s();
						}
					},
					!0,
					-1,
				)));
	}
	H4s() {
		(this.Wfo = void 0),
			(this.IsTeamReady = !0),
			this.LoadTeamPromise?.SetResult(!0),
			(this.LoadTeamPromise = void 0),
			this.npo(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，结束");
	}
	npo() {
		var e = this.CurrentGroupType;
		if (e && !SceneTeamDefine_1.innerGroupType.includes(e)) {
			if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && 1 === e) {
				var t = this.tpo ?? [],
					o = [];
				for (const e of this.GetTeamItems()) o.push(e.GetConfigId);
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
					var r = t[e],
						a = o[e];
					r !== a &&
						(r &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RedDotRoleChange,
								r,
							),
						a) &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RedDotRoleChange,
							a,
						);
				}
				this.tpo = o;
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
			),
				GlobalData_1.GlobalData.GameInstance &&
					GlobalData_1.GlobalData.BpEventManager.当编队更新时.Broadcast();
		}
	}
	AddEntity(e) {
		if (
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			(e = e.Entity.GetComponent(0)).GetEntityType() ===
				Protocol_1.Aki.Protocol.wks.Proto_Player
		) {
			var t,
				o,
				r = e.GetCreatureDataId(),
				a = ModelManager_1.ModelManager.CreatureModel;
			for (const e of this.GetTeamItems())
				r === e.GetCreatureDataId() &&
					((t = a.GetEntity(r)?.Entity),
					(o = a.GetScenePlayerData(e.GetPlayerId())?.IsRemoteSceneLoading()),
					t && o) &&
					ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						t,
						!1,
						"模拟端加载中，暂时隐藏实体",
					);
			if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady)
				for (const e of this.PPr)
					if (e.GetCreatureDataId() === r) {
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "更新联机场景队伍"),
							e.UpdateEntityHandle(),
							this.npo();
						break;
					}
		}
	}
	get GetCurrentTeamItem() {
		return this.Ywi;
	}
	get GetCurrentEntity() {
		return this.Ywi?.EntityHandle;
	}
	GetTeamLength() {
		return this.PPr.length;
	}
	GetTeamPlayerSize() {
		return this.epo.size;
	}
	GetTeamItem(e, t) {
		for (const o of this.PPr) if (this.spo(o, e, t)) return o;
	}
	spo(e, t, o) {
		if (o.OnlyMyRole && !e.IsMyRole()) return !1;
		if (o.IsControl && !e.IsControl()) return !1;
		switch (o.ParamType) {
			case 0:
				return e.GetConfigId === t;
			case 1:
				return e.EntityHandle?.Id === t;
			case 2:
				return e.GetPlayerId() === t;
			case 3:
				return e.GetCreatureDataId() === t;
			default:
				return !1;
		}
	}
	GetTeamItems(e = !1) {
		var t = [];
		for (const o of this.PPr) (e && !o.IsMyRole()) || t.push(o);
		return t;
	}
	GetTeamItemsByPlayer(e) {
		var t = [];
		for (const o of this.PPr) o.GetPlayerId() === e && t.push(o);
		return t;
	}
	GetTeamEntities(e = !1) {
		var t,
			o = [];
		for (const r of this.PPr)
			(e && !r.IsMyRole()) || ((t = r.EntityHandle) && o.push(t));
		return o;
	}
	GetAllGroupEntities(e) {
		var t = [];
		if ((e = this.zfo.get(e))) {
			var o = ModelManager_1.ModelManager.CreatureModel;
			for (const a of e.GetGroupList())
				for (const e of a.GetRoleList()) {
					var r = o.GetEntity(e.CreatureDataId);
					r?.IsInit && t.push(r);
				}
		}
		return t;
	}
	GetTeamItemsInRange(e, t) {
		var o,
			r = [],
			a = t * t;
		for (const t of this.PPr)
			t.EntityHandle?.Entity &&
				(o = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
					t.GetPlayerId(),
				)?.GetLocation()) &&
				Vector_1.Vector.DistSquared(e, o) <= a &&
				r.push(t);
		return r;
	}
	GetTeamPlayerData(e) {
		return this.zfo.get(e);
	}
	ChangeRole(e, t, o = 0, r = !1, a = !1) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneTeam", 49, "开始切换角色", ["CreatureDataId", e]);
		var n = this.GetTeamItem(e, { ParamType: 3 });
		if (n && n.IsMyRole())
			if (!a && n.IsDead())
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("SceneTeam", 49, "角色已经死亡", [
						"CreatureDataId",
						e,
					]);
			else {
				a = this.GetCurrentTeamItem;
				var i,
					l = a?.EntityHandle,
					s = n.EntityHandle;
				if (s)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneTeam", 49, "角色上阵", [
								"CreatureDataId",
								e,
							]),
						(i = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
						ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
							i,
						)?.ControlRole(n.GetCreatureDataId()),
						this.zfo
							.get(i)
							?.GetCurrentGroup()
							?.SetCurrentRole(n.GetCreatureDataId()),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"SceneTeam",
								49,
								"替换队伍当前角色",
								["LastEntity", l?.Id],
								["NewEntity", s.Id],
							),
						(this.Ywi = n),
						RoleTeamComponent_1.RoleTeamComponent.OnChangeRole(l, s, t, o, r),
						l &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnRoleGoDown,
								l.Id,
							),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnChangeRole,
							s,
							l,
						),
						a
					);
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("SceneTeam", 49, "角色实体无效", [
						"CreatureDataId",
						e,
					]);
			}
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneTeam", 49, "队伍实例不存在或非本机角色", [
					"CreatureDataId",
					e,
				]);
	}
	OtherPlayerChangeRole(e, t) {
		this.zfo.get(e)?.GetCurrentGroup()?.SetCurrentRole(t);
	}
	RefreshLastTransform() {
		var e = this.GetCurrentEntity;
		e?.Valid
			? (e = CharacterController_1.CharacterController.GetActor(e))?.IsValid()
				? ((e = e.GetTransform()),
					(this.ipo = e),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("SceneTeam", 8, "刷新上一个角色的位置信息成功", [
							"transform",
							e.ToString(),
						]))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneTeam",
						8,
						"刷新上一个角色的位置信息时，当前角色Actor已失效",
					)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"SceneTeam",
					8,
					"刷新上一个角色的位置信息时，当前角色实体已失效",
				);
	}
	SetLastTransform(e) {
		this.ipo = e;
	}
	GetSpawnTransform() {
		var e = this.ipo;
		if (e) return e;
		if (((e = this.GetCurrentEntity), e?.Valid))
			return e.Entity.GetComponent(3).Actor.GetTransform();
		if ((e = GlobalData_1.GlobalData.World)) {
			let o, r;
			var t;
			return (t =
				(0 ===
				(t =
					UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TestSceneLoadBornMode())
					? ((o =
							UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempLocation.ToUeVector()),
						((r =
							UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempRotator.ToUeRotator()).Roll =
							0),
						(r.Pitch = 0))
					: 1 === t &&
						((t = (0, puerts_1.$ref)(void 0)),
						UE.GameplayStatics.GetAllActorsOfClass(
							e,
							UE.PlayerStart.StaticClass(),
							t,
						),
						(o = (e = (0, puerts_1.$unref)(t)
							.Get(0)
							.GetTransform()).GetLocation()),
						(r = e.Rotator())),
				UE.KismetMathLibrary.MakeTransform(o, r, new UE.Vector(1, 1, 1))));
		}
	}
	IsAllDid() {
		for (const e of this.PPr) if (!e.IsDead()) return !1;
		return !0;
	}
	IsAnyRoleDead() {
		for (const e of this.PPr) if (e.IsDead()) return !0;
		return !1;
	}
	InitializeOfflineSceneTeam(e, t, o) {
		if (1 !== UE.Actor.GetKuroNetMode()) {
			var r = [
					ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
					ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
					ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
				],
				a = 100003,
				n = [0 < e ? e : a, 0 < t ? t : a, 0 < o ? o : a],
				i = this.GetSpawnTransform();
			if (i) {
				const e = [];
				var l = n.length;
				let t = l;
				for (let o = 1; o <= l; ++o) {
					var s = r[o - 1];
					const a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
					var d = n[o - 1],
						u = Protocol_1.Aki.Protocol.fqs.create();
					(u.Ekn = MathUtils_1.MathUtils.NumberToLong(s)),
						(u.M3n = WorldGlobal_1.WorldGlobal.ToTsVector(i.GetLocation())),
						(u.S3n = WorldGlobal_1.WorldGlobal.ToTsRotator(
							i.GetRotation().Rotator(),
						)),
						(u.d4n = !0),
						(u.aFn = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
						(u.cVn = Protocol_1.Aki.Protocol.wks.Proto_Player),
						(u.mVn = Protocol_1.Aki.Protocol.USs.Proto_Character),
						(u.R5n = n[o - 1]);
					const l =
						ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
							u,
						);
					((u = new SceneTeamData_1.SceneTeamRole()).CreatureDataId = s),
						(u.RoleId = d),
						e.push(u),
						ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
							l,
							(o) => {
								o &&
									(t--,
									(o = l?.Entity) &&
										(o.CheckGetComponent(81)?.SetTeamTag(2),
										ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
											o,
											!1,
											"InitOfflineTeam",
										)),
									0 === t) &&
									(this.UpdateGroup({
										PlayerId: a,
										GroupType: 1,
										GroupRoleList: e,
										CurrentRoleId: e[0].RoleId,
									}),
									this.SwitchGroup(a, 1));
							},
						);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneTeam",
						49,
						"初始化失败队伍失败，GetSpawnTransform为空。",
					);
		}
	}
}
exports.SceneTeamModel = SceneTeamModel;
