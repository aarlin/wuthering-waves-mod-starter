"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletPersistentTimeScale =
		exports.BulletModel =
		exports.BulletInitParams =
			void 0);
const UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../../Common/StatDefine"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	BulletActorPool_1 = require("../BulletActorPool"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletMoveInfo_1 = require("./BulletMoveInfo"),
	BulletPool_1 = require("./BulletPool"),
	BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletInitParams {
	constructor(
		e,
		t,
		o,
		l,
		i = 0,
		s = 0,
		r = 0,
		n = 0,
		a = 0,
		u = void 0,
		B = !1,
		h = 0,
		c = void 0,
		d = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
		m = void 0,
		g = -1,
	) {
		(this.Owner = e),
			(this.BulletRowName = t),
			(this.InitialTransform = o),
			(this.InitTargetLocation = l),
			(this.SkillId = i),
			(this.ParentId = s),
			(this.TargetId = r),
			(this.BaseTransformId = n),
			(this.BaseVelocityId = a),
			(this.Size = u),
			(this.FromRemote = B),
			(this.SyncType = h),
			(this.ContextId = c),
			(this.Source = d),
			(this.LocationOffset = m),
			(this.DtType = g);
	}
}
exports.BulletInitParams = BulletInitParams;
class BulletModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.iHo = new Map()),
			(this.oHo = new Array()),
			(this.rHo = new Map()),
			(this.nHo = new Set()),
			(this.sHo = void 0),
			(this.nye = () => {
				ConfigManager_1.ConfigManager.BulletConfig.PreloadCommonBulletData(),
					BulletActorPool_1.BulletActorPool.Preload();
			}),
			(this.hHo = new Map()),
			(this.lHo = (e) => {
				this.hHo.set(e.BulletEntityId, !0);
			}),
			(this._Ho = new Map()),
			(this.uHo = new Map()),
			(this.cHo = new Map()),
			(this.mHo = new Map()),
			(this.dHo = new Map()),
			(this.SelfAdaptBeHitAnim = void 0),
			(this.HeavyHitAnim = void 0),
			(this.Index2LightHitAnimMap = void 0),
			(this.Index2HeavyHitAnimMap = void 0),
			(this.CHo = new Set()),
			(this.gHo = !1),
			(this.fHo = () => {
				this.gHo = !0;
				for (const e of this.CHo) this.DestroyBullet(e, !1, 0);
				this.CHo.clear();
			}),
			(this.pHo = () => {
				this.gHo = !1;
			}),
			(this.PersistentTimeScaleMap = new Map()),
			(this.PersistentTimeScaleId = 0);
	}
	GetBulletEntityMap() {
		return this.iHo;
	}
	GetBulletEntityById(e) {
		return this.iHo.get(e);
	}
	GetBulletSetByAttacker(e) {
		return this.rHo.get(e);
	}
	GetAttackerBulletIterator() {
		return this.rHo.values();
	}
	OnInit() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			"/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
			UE.BulletCommonDataAsset_C,
			(e, t) => {
				this.sHo = e;
			},
		),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Bullet", 5, "BulletManagerTs Init Finish");
		for (let e = 0; e < 20; e++) this.oHo.push(new Set());
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.fHo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.pHo,
			),
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.BulletHit,
					this.lHo,
				),
			this.vHo(),
			!0
		);
	}
	IsBulletHit(e) {
		return this.hHo.get(e) ?? !1;
	}
	OnLeaveLevel() {
		for (const e of this.iHo.values())
			BulletPool_1.BulletPool.RecycleBulletEntity(e);
		this.iHo.clear();
		for (const e of this.rHo.values()) e.clear(), this.oHo.push(e);
		return (
			this.rHo.clear(),
			this._Ho.clear(),
			this.uHo.clear(),
			BulletActorPool_1.BulletActorPool.Clear(),
			BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
			(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace = void 0),
			this.MHo(),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.fHo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.pHo,
			),
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.BulletHit,
					this.lHo,
				),
			(BulletModel.DefaultBulletSceneInteraction = void 0),
			(this.sHo = void 0),
			BulletActorPool_1.BulletActorPool.Clear(),
			BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
			this.cHo.clear(),
			(this.oHo.length = 0),
			this.SHo(),
			!0
		);
	}
	CreateBullet(
		e,
		t,
		o,
		l,
		i = 0,
		s,
		r = !1,
		n = 0,
		a,
		u,
		B,
		h,
		c = 0,
		d = void 0,
		m = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
		g = void 0,
		H = -1,
		_ = void 0,
		y = void 0,
	) {
		var v = this.EHo(t);
		if (!this.gHo || !v)
			if (e?.Valid) {
				if (
					(h =
						h ??
						ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
							e,
							t,
							!0,
							H,
						))
				) {
					if (!r) {
						var S = e.GetComponent(185),
							E = h.Base.BornForbidTagIds;
						if (E)
							for (const e of E)
								if (S.HasTag(e))
									return void (
										Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Bullet",
											18,
											"BulletModel.InitBullet 中止，攻击者存在该子弹禁止生成Tag ",
											["子弹名称:", t],
										)
									);
						if ((E = h.Base.BornRequireTagIds))
							for (const e of E)
								if (!S.HasTag(e))
									return void (
										Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Bullet",
											18,
											"BulletModel.InitBullet 中止，攻击者不存在该子弹生成所需Tag",
											["子弹名称:", t],
										)
									);
					}
					let f = i;
					if (
						(0 === f &&
							((E = e.GetComponent(33)), (f = E.CurrentSkill?.SkillId ?? 0)),
						(i = new BulletInitParams(
							e,
							t,
							o,
							l,
							f,
							s,
							n,
							3 !== h.Base.BornPositionStandard &&
								2 !== h.Base.BornPositionStandard
								? a
								: 0,
							u,
							B,
							r,
							c,
							d,
							m,
							g,
							H,
						)),
						(E = BulletPool_1.BulletPool.CreateBulletEntity()),
						E?.Valid)
					)
						return (
							BulletConstant_1.BulletConstant.OpenCreateLog &&
								Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Bullet",
									18,
									"创建子弹",
									["BulletId", t],
									["EntityId", E.Id],
								),
							(o = E.GetBulletInfo()),
							r &&
								(_ && o.RandomPosOffset.FromUeVector(_), y) &&
								o.RandomInitSpeedOffset.FromUeVector(y),
							o.Init(i, h),
							o.InitEntity(E),
							this.iHo.set(E.Id, E),
							(l = o.AttackerId),
							(
								this.rHo.get(l) ||
								((s = this.oHo.pop() ?? new Set()), this.rHo.set(l, s), s)
							).add(E),
							EntitySystem_1.EntitySystem.Start(E),
							EntitySystem_1.EntitySystem.Activate(E),
							BulletController_1.BulletController.AddSimpleAction(o, 1),
							v && this.CHo.add(E.Id),
							E
						);
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							5,
							"BulletModel.InitBullet error, 子弹创建 失败!",
							["子弹创建者:", e.GetComponent(1)?.Owner.GetName()],
							["子弹名称:", t],
						);
				}
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Bullet",
						5,
						"BulletModel.InitBullet 中止，攻击者已不存在",
						["子弹名称:", t],
					);
	}
	DestroyBullet(e, t, o = 0) {
		var l,
			i = this.iHo.get(e);
		i &&
			((i = i.GetBulletInfo()),
			(2 === o && 1 !== i.BulletDataMain?.Base.SyncType) ||
				i.NeedDestroy ||
				((i.NeedDestroy = !0),
				BulletConstant_1.BulletConstant.OpenCreateLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						18,
						"销毁子弹开始",
						["BulletId", i.BulletRowName],
						["EntityId", i.BulletEntityId],
					),
				i.BulletRowName,
				StatDefine_1.BATTLESTAT_ENABLED,
				((l =
					BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
						13,
					)).SummonChild = t),
				(l.DestroyReason = o),
				this.nHo.add(e),
				BulletController_1.BulletController.GetActionRunner().AddAction(i, l),
				StatDefine_1.BATTLESTAT_ENABLED));
	}
	DestroyAllBullet(e = !1) {
		for (var [t] of this.iHo) this.DestroyBullet(t, e, 0);
	}
	ClearDestroyedBullets() {
		for (const i of this.nHo) {
			var e,
				t,
				o,
				l = this.iHo.get(i);
			l &&
				((o = (e = l.GetBulletInfo()).AttackerId),
				(t = this.rHo.get(o))
					? (t.delete(l), t.size || (this.rHo.delete(o), this.oHo.push(t)))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Bullet",
							5,
							"BulletModel.DestroyBullet Warn, 获取被销毁子弹所在集合 失败！ ",
							["子弹创建者Id:", o],
							["子弹:", l],
						),
				(t = this.GetBulletHandleById(i)) &&
					(((o = Protocol_1.Aki.Protocol.j2n.create()).E4n = t),
					CombatMessage_1.CombatNet.Call(29700, e.Attacker, o),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Bullet",
							20,
							"删除子弹Request",
							["handleId", t?.y4n],
							["playerId", t?.aFn],
						),
					this.DeregisterBullet(t)),
				BulletConstant_1.BulletConstant.OpenCreateLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						18,
						"销毁子弹完成",
						["BulletId", e.BulletRowName],
						["EntityId", e.BulletEntityId],
					),
				this.iHo.delete(i),
				BulletPool_1.BulletPool.RecycleBulletEntity(l));
		}
		this.nHo.clear();
	}
	GetFastMoveTrace(e, t) {
		switch (e) {
			case "Bullet_Type1":
				return this.sHo.FastMoveTraceBullet_Type1;
			case "Bullet_Type2":
				return this.sHo.FastMoveTraceBullet_Type2;
			case "Bullet_Type3":
				return this.sHo.FastMoveTraceBullet_Type3;
			case "Bullet_Type1_Special":
				return this.sHo.FastMoveTraceBullet_Type1_Special;
			case "Bullet_Type2_Special":
				return this.sHo.FastMoveTraceBullet_Type2_Special;
			case "Bullet_OnlyBullet":
				return this.sHo.FastMoveTraceBullet_Only_Bullet;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Bullet",
				21,
				"找不到快速移动对应的检测类型配置",
				["bulletRowName", t],
				["profileName", e],
			);
	}
	get ObjectTypeTakeAim() {
		return this.sHo.TakeAim;
	}
	get ObjectTypeObstacles() {
		return this.sHo.Obstacles;
	}
	get ObjectTypeHitPoint() {
		return this.sHo.HitPoint;
	}
	RegisterBullet(e, t) {
		var o, l;
		e &&
			(({ aFn: o, y4n: l } = e),
			this.uHo.set(t, e),
			this._Ho.has(o) || this._Ho.set(o, new Map()),
			this._Ho.get(o)?.set(l, t));
	}
	DeregisterBullet(e) {
		var t, o;
		e &&
			((t = this.GetIdByBulletHandle(e)),
			this._Ho.has(t) && this.uHo.delete(t),
			this._Ho.has(e.aFn)) &&
			(({ aFn: t, y4n: e } = e),
			(o = this._Ho.get(t)).delete(e),
			o.size <= 0) &&
			this._Ho.delete(t);
	}
	GetIdByBulletHandle(e) {
		var t;
		return e ? (({ aFn: e, y4n: t } = e), this._Ho.get(e)?.get(t) ?? 0) : 0;
	}
	GetBulletHandleById(e) {
		return this.uHo.get(e);
	}
	DestroyBulletRemote(e, t) {
		var o;
		e &&
			this._Ho.has(e.aFn) &&
			0 !== (o = this.GetIdByBulletHandle(e)) &&
			(this.DeregisterBullet(e), this.DestroyBullet(o, t, 2));
	}
	NewTraceElement(e, t, o, l = 0) {
		var i = UE.NewObject(e);
		if (((i.WorldContextObject = GlobalData_1.GlobalData.World), t))
			for (let e = 0; e < t.Num(); e++) {
				var s = t.Get(e);
				o?.has(s) || i.AddObjectTypeQuery(s);
			}
		return (i.bTraceComplex = !1), (i.bIgnoreSelf = !0), i;
	}
	GetEntityIdByCustomKey(e, t, o) {
		return (
			(t = t.concat(e.toString())),
			(e = this.cHo.get(t)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 21, "自定义目标表不存在攻击者", [
						"Bullet.Data.RowName",
						o,
					]),
				0)
		);
	}
	SetEntityIdByCustomKey(e, t, o) {
		(t = t.concat(e.toString())), this.cHo.set(t, o);
	}
	ShowBulletCollision(e = 0) {
		return this.mHo.has(e) && (this.mHo.get(e) ?? !1);
	}
	ShowBulletTrace(e = 0) {
		return this.dHo.has(e) && (this.dHo.get(e) ?? !1);
	}
	SetBulletCollisionDraw(e, t) {
		this.mHo.set(e, t);
	}
	SetBulletTraceDraw(e, t) {
		this.dHo.set(e, t);
	}
	vHo() {
		(this.SelfAdaptBeHitAnim = new Set([0, 1, 2, 3, 8, 9, 10, 11])),
			(this.HeavyHitAnim = new Set([2, 3, 10, 11])),
			(this.Index2LightHitAnimMap = [8, 1, 9, 0]),
			(this.Index2HeavyHitAnimMap = [10, 3, 11, 2]);
	}
	SHo() {
		(this.SelfAdaptBeHitAnim = void 0),
			(this.HeavyHitAnim = void 0),
			(this.Index2LightHitAnimMap = void 0),
			(this.Index2HeavyHitAnimMap = void 0);
	}
	EHo(e) {
		return "310000001" === e;
	}
	SetAllBulletTimeScale(e, t, o, l, i, s, r) {
		this.PersistentTimeScaleId--;
		var n = this.PersistentTimeScaleId;
		for (const r of this.GetBulletEntityMap().values()) {
			var a = r.GetBulletInfo();
			if (
				a.IsInit &&
				!a.NeedDestroy &&
				!a.BulletDataMain.TimeScale.TimeScaleWithAttacker
			) {
				if (e) {
					var u = a.CollisionInfo.LastFramePosition;
					if (!u) continue;
					if (
						Math.abs(u.X - e.X) > t ||
						Math.abs(u.Y - e.Y) > t ||
						Math.abs(u.Z - e.Z) > t
					)
						continue;
				}
				BulletUtil_1.BulletUtil.SetTimeScale(a, o, l, i, s, 5, 0, n);
			}
		}
		return (
			r &&
				this.PersistentTimeScaleMap.set(
					n,
					new BulletPersistentTimeScale(
						e,
						t,
						Time_1.Time.WorldTimeSeconds,
						o,
						l,
						i,
						s,
						5,
						n,
					),
				),
			n
		);
	}
	RemoveAllBulletTimeScale(e, t) {
		for (const t of this.GetBulletEntityMap().values()) {
			var o = t.GetBulletInfo();
			o.IsInit && BulletUtil_1.BulletUtil.RemoveTimeScale(o, e);
		}
		t && this.PersistentTimeScaleMap.delete(e);
	}
	MHo() {
		(this.PersistentTimeScaleId = 0), this.PersistentTimeScaleMap.clear();
	}
}
((exports.BulletModel = BulletModel).DefaultBulletSceneInteraction = void 0),
	(BulletModel.aHo = void 0),
	(BulletModel.yHo = void 0),
	(BulletModel.IHo = void 0),
	(BulletModel.THo = void 0);
class BulletPersistentTimeScale {
	constructor(e, t, o, l, i, s, r, n, a) {
		(this.CenterLocation = e),
			(this.Radius = t),
			(this.StartTime = o),
			(this.Priority = l),
			(this.TimeDilation = i),
			(this.Curve = s),
			(this.Duration = r),
			(this.SourceType = n),
			(this.TimeScaleId = a);
	}
}
exports.BulletPersistentTimeScale = BulletPersistentTimeScale;
