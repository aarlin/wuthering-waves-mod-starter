"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, r) {
		var l,
			n = arguments.length,
			a =
				n < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, r);
		else
			for (var i = e.length - 1; 0 <= i; i--)
				(l = e[i]) && (a = (n < 3 ? l(a) : 3 < n ? l(t, o, a) : l(t, o)) || a);
		return 3 < n && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletController = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Entity_1 = require("../../../Core/Entity/Entity"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../Common/StatDefine"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
	BulletActionRunner_1 = require("./Action/BulletActionRunner"),
	BulletConfig_1 = require("./BulletConfig"),
	BulletConstant_1 = require("./BulletConstant"),
	BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
	BulletPool_1 = require("./Model/BulletPool"),
	BulletCollisionSystem_1 = require("./System/BulletCollisionSystem"),
	BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				((BulletConstant_1.BulletConstant.OpenCreateLog = !0),
				(BulletConstant_1.BulletConstant.OpenActionStat = !0)),
			BulletActionRunner_1.BulletActionRunner.InitStat(),
			this.Y8o || (this.Y8o = new BulletActionRunner_1.BulletActionRunner()),
			this.Y8o.Init(),
			BulletPool_1.BulletPool.Init(),
			(this.J8o.length = 0),
			this.J8o.push(new BulletMoveSystem_1.BulletMoveSystem()),
			this.J8o.push(new BulletCollisionSystem_1.BulletCollisionSystem()),
			this.sCe(),
			!0
		);
	}
	static OnTick(e) {
		if (this.Y8o) {
			this.Y8o.Pause();
			for (const t of this.J8o) t.OnTick(e);
			this.Y8o.Resume(),
				this.Y8o.Run(e),
				ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
		}
	}
	static OnAfterTick(e) {
		if (this.J8o && this.Y8o) {
			this.Y8o.Pause();
			for (const t of this.J8o) t.OnAfterTick(e);
			this.Y8o.Resume(),
				this.Y8o.Run(e, !0),
				BulletPool_1.BulletPool.CheckAtFrameEnd();
		}
	}
	static OnClear() {
		return (
			this.Y8o.Clear(),
			this.aCe(),
			BulletPool_1.BulletPool.Clear(),
			!(this.J8o.length = 0)
		);
	}
	static OnLeaveLevel() {
		return (
			BulletConfig_1.BulletConfig.ClearBulletDataCache(),
			ConfigManager_1.ConfigManager.BulletConfig.ClearPreload(),
			!0
		);
	}
	static GetActionCenter() {
		return this.Y8o.GetActionCenter();
	}
	static GetActionRunner() {
		return this.Y8o;
	}
	static sCe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSkillEnd,
			BulletController.yYe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				BulletController.zpe,
			);
	}
	static aCe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSkillEnd,
			BulletController.yYe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				BulletController.zpe,
			);
	}
	static HasAuthority(e) {
		return (
			(e instanceof Entity_1.Entity
				? e.GetComponent(3)?.Actor
				: e
			)?.IsAutonomousProxy() ?? !1
		);
	}
	static CreateBulletCustomTarget(
		e,
		t,
		o,
		{
			SkillId: r = 0,
			SyncType: l = 0,
			ParentVictimId: n = 0,
			ParentTargetId: a = 0,
			ParentId: i = 0,
			Size: u,
			InitTargetLocation: s,
			Source: d = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
			LocationOffset: M,
			DtType: c = -1,
		} = {},
		g = void 0,
	) {
		if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
			StatDefine_1.BATTLESTAT_ENABLED,
				e ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 21, "创建子弹时Owner为空", [
							"rowName",
							t,
						])),
				g ||
					(0, CharacterBuffIds_1.checkBulletInSpecialList)(t) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 36, "创建子弹时contextId为空", [
							"rowName",
							t,
						]));
			var B = e instanceof Entity_1.Entity ? e : e.GetEntityNoBlueprint(),
				C = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					B,
					t,
					!0,
					c,
				);
			if (C) {
				var _;
				if (
					1 !== (l = BulletController.Qqn(l, C)) ||
					BulletController.HasAuthority(e)
				)
					return (
						(e = this.Z8o(B, C, t, n, a)),
						(_ = this.e9o(B, C, t, n, a)),
						(n = this.$qn(B, C, t, n, a)),
						(a = this.CreateBullet(
							B,
							t,
							o,
							{
								SkillId: r,
								SyncType: l,
								ParentId: i,
								BulletData: C,
								TargetId: e,
								BaseTransformId: n,
								BaseVelocityId: _,
								Size: u,
								InitTargetLocation: s,
								Source: d,
								LocationOffset: M,
								DtType: c,
							},
							g,
						)),
						StatDefine_1.BATTLESTAT_ENABLED,
						a
					);
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						18,
						"等待远端创建同步子弹",
						["bulletRowName", t],
						["skillId", r],
					),
					StatDefine_1.BATTLESTAT_ENABLED;
			}
		}
	}
	static $qn(e, t, o, r, l) {
		var n = t.Base.BornPositionStandard;
		if (1 === n) return this.t9o(e, o);
		if (5 === n)
			return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
				e.Id,
				t.Base.BlackboardKey,
				o,
			);
		if (7 === n) return r;
		if (8 === n) return l;
		if (10 === n)
			return (r = parseInt(t.Base.BlackboardKey)), this.i9o(e, r, o);
		if (4 === n) {
			if (((l = e.GetComponent(29)?.GetCurrentTarget()), l?.Valid)) return l.Id;
		} else if (9 === n) return this.Xqn();
		return 0;
	}
	static Qqn(e, t) {
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti && 0 === e) {
			if (1 === t.Base.SyncType) return 1;
			var o = t.Base.BornPositionStandard;
			if (4 === o || 9 === o || 10 === o) return 1;
			if (10 === (o = t.Move.InitVelocityDirStandard) || 5 === o) return 1;
			if (4 === (o = t.Move.TrackTarget) || 3 === o) return 1;
		}
		return e;
	}
	static CreateBulletForDebug(e, t) {
		(e = e.GetEntityNoBlueprint()?.Id ?? 0),
			(e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
		var o = new Protocol_1.Aki.Protocol.qQn();
		return (
			(o.Z4n = 0),
			(o.H3n = `@gmcreatebullet ${e} ` + t),
			Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(o), () => {}),
			0
		);
	}
	static Z8o(e, t, o, r, l) {
		var n = t.Move.TrackTarget;
		if (4 === n || 3 === n) {
			var a = e.GetComponent(29)?.GetCurrentTarget();
			if (a?.Valid) return a.Id;
		} else {
			if (5 === n)
				return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
					e.Id,
					t.Move.TrackTargetBlackboardKey,
					o,
				);
			if (7 === n) {
				if (r) return r;
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 21, "父子弹受击者 VictimId为空", [
						"rowName",
						o,
					]);
			} else if (8 === n) {
				if (l) return l;
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 21, "父子弹目标为空", ["rowName", o]);
			} else {
				if (6 === n) return e.Id;
				if (2 === n) return BulletController.t9o(e, o);
				if (1 === n) {
					if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
						return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
					if (
						((a = e.GetComponent(0)),
						(t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
							a.GetPlayerId(),
							{ ParamType: 2, IsControl: !0 },
						).EntityHandle),
						t?.Valid)
					)
						return t.Id;
				} else if (9 === n) return this.Xqn();
			}
		}
		return 0;
	}
	static t9o(e, t) {
		var o;
		e = e.GetComponent(33)?.SkillTarget;
		return (
			BulletConstant_1.BulletConstant.OpenCreateLog &&
				((o = e?.Entity?.GetComponent(1)?.Owner?.GetName()),
				Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"获取技能目标",
					["BulletId", t],
					["Target", o ?? StringUtils_1.NONE_STRING],
				),
			e?.Valid ? e.Id : 0
		);
	}
	static Xqn() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				29,
			)?.GetCurrentTarget();
		return e?.Valid ? e.Id : 0;
	}
	static e9o(e, t, o, r, l) {
		var n = t.Move.InitVelocityDirStandard;
		if (5 === n) {
			var a = e.GetComponent(29)?.GetCurrentTarget();
			if (a?.Valid) return a.Id;
		} else {
			if (6 === n)
				return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
					e.Id,
					t.Move.TrackTargetBlackboardKey,
					o,
				);
			if (11 === n)
				return (a = parseInt(t.Move.InitVelocityDirParam)), this.i9o(e, a, o);
			if (10 === n) return this.Xqn();
			if (8 === n) return r;
			if (9 === n) return l;
		}
		return 0;
	}
	static CreateBullet(
		e,
		t,
		o,
		{
			SkillId: r = 0,
			SyncType: l = 0,
			ParentId: n,
			BulletData: a,
			TargetId: i = 0,
			BaseTransformId: u,
			BaseVelocityId: s,
			Size: d,
			InitTargetLocation: M,
			Source: c = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
			LocationOffset: g,
			DtType: B = -1,
			RandomPosOffset: C,
			RandomInitSpeedOffset: _,
		} = {},
		f = void 0,
	) {
		var m = 2 === l;
		e = ModelManager_1.ModelManager.BulletModel.CreateBullet(
			e,
			t,
			o,
			M,
			r,
			n,
			m,
			i,
			u,
			s,
			d,
			a,
			l,
			f,
			c,
			g,
			B,
			C,
			_,
		);
		if (e?.Valid) return e;
	}
	static DestroyBullet(e, t, o = 0) {
		StatDefine_1.BATTLESTAT_ENABLED,
			ModelManager_1.ModelManager.BulletModel.DestroyBullet(e, t, o),
			StatDefine_1.BATTLESTAT_ENABLED;
	}
	static DestroyAllBullet(e = !1) {
		ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(e);
	}
	static AddSimpleAction(e, t) {
		(t = this.GetActionCenter().CreateBulletActionInfo(t)),
			this.Y8o.AddAction(e, t);
	}
	static SetTimeDilation(e) {
		for (const t of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
			for (const o of t) o.SetTimeDilation(e);
	}
	static CreateBulletNotify(e, t) {
		if (ModelManager_1.ModelManager.GameModeModel.WorldDone && e) {
			var o = t.vkn,
				r = String(MathUtils_1.MathUtils.LongToBigInt(t.wVn)),
				l = t?.UIs,
				n =
					((l =
						(l
							? (l = ModelManager_1.ModelManager.CreatureModel.GetEntity(
									MathUtils_1.MathUtils.LongToNumber(l),
								)?.Entity?.GetComponent(3)) &&
								this.Mme.FromUeTransform(l.ActorTransform)
							: void 0 !== t?.$kn || void 0 !== t?.D3n
								? (this.Mme.Reset(),
									(l = t.$kn),
									(n = t.D3n) &&
										(this.cie.DeepCopy(n),
										this.cie.Quaternion(this.o9o),
										this.Mme.SetRotation(this.o9o)),
									l && this.Mme.SetLocation(l),
									this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy))
								: (n = e?.CheckGetComponent(3)) &&
									(this.Mme.SetLocation(n.ActorLocationProxy),
									this.cie.DeepCopy(n.ActorRotationProxy),
									this.Mme.SetRotation(n.ActorQuatProxy)),
						ModelManager_1.ModelManager.CreatureModel.GetEntityId(
							MathUtils_1.MathUtils.LongToNumber(t.qVn),
						))),
					ModelManager_1.ModelManager.CreatureModel.GetEntityId(
						MathUtils_1.MathUtils.LongToNumber(t.GVn),
					)),
				a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
					MathUtils_1.MathUtils.LongToNumber(t.L4n),
				);
			let i;
			t.PIs && (i = new UE.Vector(t.PIs.X, t.PIs.Y, t.PIs.Z)),
				(e = BulletController.r9o(
					e,
					r,
					this.Mme.ToUeTransform(),
					o,
					l,
					n,
					a,
					MathUtils_1.MathUtils.LongToBigInt(t.r4n.s4n),
					i,
					t.NVn,
					t.kVn,
					t.FVn,
				)) &&
					(ModelManager_1.ModelManager.BulletModel.RegisterBullet(t.E4n, e.Id),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Bullet",
							18,
							"创建子弹Notify",
							["bulletRowName", r],
							["skillId", o],
							["handleId", t.E4n?.y4n],
							["playerId", t.E4n?.aFn],
							["Location", this.Mme.GetLocation()],
							["Rotation", this.cie],
							["TargetId", t.L4n],
							["CurrentTargetId", a],
						),
					e.Data.Render.HandOverParentEffect) &&
					((l = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
						t.bVn,
					)),
					(n =
						ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
							l,
						)?.GetBulletInfo()),
					(r = e.GetBulletInfo()),
					n &&
						r &&
						BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(n, r),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug("Bullet", 18, "接手父子弹特效", [
						"parentBulletId",
						l,
					]);
		}
	}
	static DestroyBulletNotify(e, t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Bullet",
				18,
				"删除子弹Notify",
				["handleId", t?.E4n?.y4n],
				["playerId", t?.E4n?.aFn],
			),
			ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(t.E4n, t.wIs);
	}
	static ModifyBulletParamsNotify(e, t) {
		var o = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
				t?.VVn?.E4n,
			),
			r =
				((o = EntitySystem_1.EntitySystem.Get(o)),
				(t = MathUtils_1.MathUtils.LongToNumber(t.VVn.L4n)),
				ModelManager_1.ModelManager.CreatureModel.GetEntity(t));
		(t =
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"收到修改子弹目标通知",
					["新的目标id", r.Id],
					["CreatureId", t],
				),
			o.GetBulletInfo())) && t.SetTargetById(r.Id);
	}
	static r9o(e, t, o, r, l, n, a, i, u, s = -1, d = void 0, M = void 0) {
		return (
			StatDefine_1.BATTLESTAT_ENABLED,
			(e = this.CreateBullet(
				e,
				t,
				o,
				{
					SkillId: r,
					SyncType: 2,
					BaseTransformId: l,
					BaseVelocityId: n,
					TargetId: a,
					InitTargetLocation: u,
					DtType: s,
					RandomPosOffset: d,
					RandomInitSpeedOffset: M,
				},
				i,
			)),
			StatDefine_1.BATTLESTAT_ENABLED,
			e
		);
	}
	static i9o(e, t, o) {
		if (isNaN(t))
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 21, "pos NAN！", ["bulletRowName", o]);
		else if (
			t > (e = e.GetComponent(0).CustomServerEntityIds).length ||
			0 === t
		)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Bullet",
					21,
					"pos不合法！",
					["bulletRowName", o],
					["pos", t],
					["serverEntityIds", e],
				);
		else {
			var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e[t - 1]);
			if (r) return r.Id;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Bullet",
					21,
					"无法找到伴生物实体",
					["bulletRowName", o],
					["pos", t],
					["serverEntityIds", e],
				);
		}
		return 0;
	}
	static GetBulletCreateStat(e) {
		let t = this.n9o.get(e);
		return t || ((t = void 0), this.n9o.set(e, t)), t;
	}
	static GetBulletDestroyStat(e) {
		let t = this.s9o.get(e);
		return t || ((t = void 0), this.s9o.set(e, t)), t;
	}
	static GetBulletMoveTickStat(e) {
		let t = this.a9o.get(e);
		return t || ((t = void 0), this.a9o.set(e, t)), t;
	}
	static GetBulletCollisionTickStat(e) {
		let t = this.h9o.get(e);
		return t || ((t = void 0), this.h9o.set(e, t)), t;
	}
	static GetBulletCollisionAfterTickStat(e) {
		let t = this.l9o.get(e);
		return t || ((t = void 0), this.l9o.set(e, t)), t;
	}
}
(BulletController.J8o = []),
	(BulletController.Y8o = void 0),
	(BulletController.n9o = new Map()),
	(BulletController.s9o = new Map()),
	(BulletController.a9o = new Map()),
	(BulletController.h9o = new Map()),
	(BulletController.l9o = new Map()),
	(BulletController.yYe = (e, t) => {
		if (
			t &&
			(e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e))
		)
			for (const l of e) {
				var o,
					r = l.GetBulletInfo();
				t === r.BulletInitParams.SkillId &&
					((o = r.BulletDataMain).Move.IsDetachOnSkillEnd &&
						r.Actor.K2_DetachFromActor(1, 1, 1),
					o.Base.DestroyOnSkillEnd) &&
					((r.IsDestroyByCharSkillEnd = !0),
					BulletController.DestroyBullet(l.Id, !1));
			}
	}),
	(BulletController.zpe = (e, t) => {
		t && BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(t.Id);
	}),
	(BulletController.z8o = void 0),
	(BulletController.Mme = Transform_1.Transform.Create()),
	(BulletController.cie = Rotator_1.Rotator.Create()),
	(BulletController.o9o = Quat_1.Quat.Create()),
	__decorate(
		[(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1, 0)],
		BulletController,
		"CreateBullet",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("qOn")],
		BulletController,
		"CreateBulletNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("GOn")],
		BulletController,
		"DestroyBulletNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("r2n")],
		BulletController,
		"ModifyBulletParamsNotify",
		null,
	),
	(exports.BulletController = BulletController);
