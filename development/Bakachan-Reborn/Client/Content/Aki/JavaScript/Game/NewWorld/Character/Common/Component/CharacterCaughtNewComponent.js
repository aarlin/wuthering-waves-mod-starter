"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, i) {
		var r,
			n = arguments.length,
			a =
				n < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, o))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, o, i);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(r = t[s]) && (a = (n < 3 ? r(a) : 3 < n ? r(e, o, a) : r(e, o)) || a);
		return 3 < n && a && Object.defineProperty(e, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterCaughtNewComponent =
		exports.CaughtBindingInfo =
		exports.CaughtTriggerInfo =
			void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	BulletController_1 = require("../../../Bullet/BulletController"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	BulletUtil_1 = require("../../../Bullet/BulletUtil"),
	DEFAULT_CAUGHT_LEVEL = 10,
	ZOOM_PRECENTAGE = 0.1,
	ADD_LENGTH = 5,
	IS_DEBUG = !1,
	PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Camera";
class CaughtTriggerInfo {
	constructor(t, e, o, i, r) {
		(this.Jh = void 0),
			(this.Index = 0),
			(this.CaughtId = ""),
			(this.w$o = void 0),
			(this.TriggerInfo = void 0),
			(this.CaughtActor = void 0),
			(this.BulletEntity = void 0),
			(this.BulletActorComponent = void 0),
			(this.Handle = void 0),
			(this.Jh = o.Entity),
			(this.CaughtId = t),
			(this.w$o = e),
			(this.TriggerInfo = this.w$o.TriggerInfo),
			(t = BulletUtil_1.BulletUtil.CreateBulletFromAN(
				o.Actor,
				this.TriggerInfo.BulletId,
				o.ActorTransform,
				r.toString(),
				!1,
			)),
			(this.BulletEntity =
				ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t)),
			(this.BulletActorComponent = this.BulletEntity?.GetComponent(152)),
			this.BulletEntity &&
				((this.Handle = (t) => {
					var e = t?.Target;
					this.BulletEntity &&
						e?.Valid &&
						this.BulletEntity.Id === t.BulletEntityId &&
						(((t = e.GetComponent(0)).GetEntityType() !==
							Protocol_1.Aki.Protocol.HBs.Proto_Player &&
							t.GetEntityType() !==
								Protocol_1.Aki.Protocol.HBs.Proto_Monster) ||
							i.TryCaught(this, e));
				}),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Jh,
					EventDefine_1.EEventName.CharHitLocal,
					this.Handle,
				));
	}
	Clear() {
		this.BulletEntity &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Jh,
				EventDefine_1.EEventName.CharHitLocal,
				this.Handle,
			),
			BulletController_1.BulletController.DestroyBullet(
				this.BulletEntity.Id,
				!1,
			),
			(this.Index = 0),
			(this.CaughtId = ""),
			(this.TriggerInfo = void 0),
			(this.w$o = void 0),
			this.CaughtActor && ActorSystem_1.ActorSystem.Put(this.CaughtActor),
			(this.CaughtActor = void 0),
			(this.BulletEntity = void 0),
			(this.BulletActorComponent = void 0),
			(this.Handle = void 0);
	}
}
exports.CaughtTriggerInfo = CaughtTriggerInfo;
class CaughtBindingInfo {
	constructor(t, e, o, i) {
		(this.CaughtId = ""),
			(this.w$o = void 0),
			(this.BindingInfo = void 0),
			(this.CaughtActor = void 0),
			(this.BulletEntityId = void 0),
			(this.BulletActorComponent = void 0),
			(this.Targets = []),
			(this.CaughtId = t),
			(this.w$o = e),
			(this.BindingInfo = this.w$o.BindingInfo),
			(this.BulletEntityId = BulletUtil_1.BulletUtil.CreateBulletFromAN(
				o.Actor,
				this.BindingInfo.BulletId,
				o.ActorTransform,
				i.toString(),
				!1,
			)),
			(this.BulletActorComponent = this.BulletEntity.GetComponent(152));
	}
	get BulletEntity() {
		return EntitySystem_1.EntitySystem.Get(this.BulletEntityId);
	}
	Clear() {
		(this.CaughtId = ""),
			(this.BindingInfo = void 0),
			(this.w$o = void 0),
			this.CaughtActor && ActorSystem_1.ActorSystem.Put(this.CaughtActor),
			(this.CaughtActor = void 0),
			(this.BulletEntityId = void 0),
			(this.BulletActorComponent = void 0);
	}
}
exports.CaughtBindingInfo = CaughtBindingInfo;
let CharacterCaughtNewComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.S4r = void 0),
			(this.elt = void 0),
			(this.Xte = void 0),
			(this.mbr = void 0),
			(this.Gce = void 0),
			(this.cBe = void 0),
			(this.Hte = void 0),
			(this.E4r = void 0),
			(this.y4r = void 0),
			(this.I4r = void 0),
			(this.T4r = void 0),
			(this.L4r = Vector_1.Vector.Create()),
			(this.D4r = new Map()),
			(this.R4r = new Map()),
			(this.A4r = void 0),
			(this.U4r = new Map()),
			(this.P4r = (t, e) => {
				e &&
					(this.InCaught && this.EndCaught(), this.BeCaught) &&
					this.EndBeCaught();
			}),
			(this.InCaught = !1),
			(this.BeCaught = !1),
			(this.RemoteBeCaught = !1),
			(this.PendingCaughtList = new Map()),
			(this.PendingRemoteCaughtList = new Map()),
			(this.Gco = 0),
			(this.x4r = !1),
			(this.Fse = void 0),
			(this.w4r = Vector_1.Vector.Create()),
			(this.uae = Vector_1.Vector.Create()),
			(this.pwr = Vector_1.Vector.Create()),
			(this.Cwr = !1),
			(this.B4r = !1),
			(this.Wse = Vector_1.Vector.Create()),
			(this.b4r = Vector_1.Vector.Create()),
			(this.q4r = Vector_1.Vector.Create()),
			(this.G4r = Vector_1.Vector.Create()),
			(this.r4t = Vector_1.Vector.Create()),
			(this.OnCatcherForceRemove = (t, e) => {
				(t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce &&
					t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal) ||
					(this.BeCaught && this.EndBeCaught()),
					EventSystem_1.EventSystem.HasWithTarget(
						e,
						EventDefine_1.EEventName.RemoveEntity,
						this.OnCatcherForceRemove,
					) &&
						EventSystem_1.EventSystem.RemoveWithTarget(
							e,
							EventDefine_1.EEventName.RemoveEntity,
							this.OnCatcherForceRemove,
						);
			});
	}
	OnInit() {
		return (
			(this.Xte = this.Entity.GetComponent(185)),
			(this.elt = this.Entity.GetComponent(157)),
			!0
		);
	}
	OnStart() {
		(this.S4r = this.Entity.GetComponent(47)),
			(this.mbr = this.Entity.GetComponent(158)),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.cBe = this.Entity.GetComponent(33)),
			(this.Hte = this.Entity.GetComponent(3));
		var t = this.Entity.GetComponent(0);
		return (
			(this.E4r = t?.GetEntityPropertyConfig()),
			this.N4r(),
			this.O4r(),
			(this.y4r = this.Xte.ListenForTagAddOrRemove(1008164187, this.P4r)),
			this.Iwr(),
			!0
		);
	}
	OnEnd() {
		for (var [, t] of (this.k4r(),
		this.Xte?.Valid &&
			(this.Xte.RemoveTag(665255436),
			this.Xte.RemoveTag(-648310348),
			this.Xte.RemoveTag(-1697149502)),
		this.y4r && this.y4r.EndTask(),
		(this.y4r = void 0),
		this.D4r))
			t.Clear();
		for (var [, e] of (this.D4r.clear(), this.R4r)) e.Clear();
		return this.R4r.clear(), !0;
	}
	OnActivate() {
		this.A4r = ConfigManager_1.ConfigManager.WorldConfig.GetCaughtDataInfo();
	}
	OnTick(t) {
		if (0 < this.PendingCaughtList.size) {
			var e,
				o,
				i,
				r = [];
			for ([e, [o, i]] of this.PendingCaughtList) {
				Time_1.Time.NowSeconds > i + 1 &&
					(r.push(e),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"超时移除抓取搁置",
					));
				var n = o?.GetComponent(43);
				n?.BeCaught && n?.CorrectPosition();
			}
			for (const t of r) this.PendingCaughtList.delete(t);
		}
		if (0 < this.PendingRemoteCaughtList.size) {
			var a,
				s,
				h,
				l = [];
			for ([a, [s, h]] of this.PendingRemoteCaughtList) {
				Time_1.Time.NowSeconds > h + 1 &&
					(l.push(a),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"超时移除远端抓取搁置",
					));
				var C = s?.GetComponent(43);
				C?.BeCaught && C?.CorrectPosition();
			}
			for (const t of l) this.PendingRemoteCaughtList.delete(t);
		}
		this.BeCaught && this.CorrectPosition();
	}
	O4r() {
		for (let e = 0; e < 33; e++) {
			var t =
				this.Entity.GetComponent(
					3,
				).Actor.CapsuleComponent.GetCollisionResponseToChannel(e);
			this.U4r.set(e, t);
		}
	}
	N4r() {
		switch (this.Entity.GetComponent(0).GetEntityType()) {
			case Protocol_1.Aki.Protocol.HBs.Proto_Player:
			case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
				this.T4r = this.E4r?.CaughtLevel;
				break;
			default:
				this.T4r = 10;
		}
	}
	F4r(t, e) {
		if (!t) return !0;
		if (0 === t.Num()) return !0;
		var o = e.GetComponent(185);
		for (let e = 0; e < t.Num(); e++) {
			var i = t.Get(e);
			if (i && o.HasTag(i.TagId)) return !0;
		}
		return !1;
	}
	V4r(t, e) {
		return !t || this.Entity.GetComponent(33).SkillTarget?.Id === e;
	}
	H4r(t, e) {
		this.Entity.GetComponent(
			3,
		).Actor.CapsuleComponent.SetCollisionResponseToChannel(t, e);
	}
	j4r(t) {
		if (t)
			for (let o = t.Num() - 1; 0 <= o; o--) {
				var e = t.GetKey(o);
				this.H4r(e, t.Get(e));
			}
	}
	W4r() {
		if (this.U4r) {
			var t,
				e,
				o = this.Entity.GetComponent(3).Actor.CapsuleComponent;
			for ([t, e] of this.U4r) o.SetCollisionResponseToChannel(t, e);
		}
	}
	K4r() {
		var t;
		this.I4r
			? "" !== (t = this.I4r.BindingInfo.TargetMontagePath) &&
				(this.Entity?.GetComponent(22)).PlayMontageAsync(t)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Character",
					23,
					"[Caught.PlayCaughtMontage] 没有CaughtInfoInternal数据",
					["EntityID:", this.Entity.Id],
				);
	}
	Q4r(t, e) {
		var o = Vector_1.Vector.Create(),
			i = Vector_1.Vector.Create(0, 0, 0);
		t.Subtraction(e, o),
			(t = Vector_1.Vector.Create()),
			(e = this.Entity.GetComponent(3));
		t.DeepCopy(e.ActorLocationProxy),
			t.Subtraction(o, o),
			e?.HalfHeight && i.Set(0, 0, e.HalfHeight / 2),
			o.Addition(i, o),
			e.SetActorLocation(o.ToUeVector(), "抓取.计算当前对象相对位置的坐标", !0);
	}
	X4r(t) {
		var e = Vector_1.Vector.Create();
		if (0 !== this.S4r.RoleId) {
			var o = this.S4r.RoleId,
				i = EntitySystem_1.EntitySystem.Get(o),
				r = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy),
				n = (o = this.Entity.GetComponent(3)).ActorLocationProxy;
			switch (t.BindingInfo.CaughtDirectionType) {
				case 0:
					e.DeepCopy(i.GetComponent(3).ActorLocationProxy),
						e.SubtractionEqual(n),
						MathUtils_1.MathUtils.LookRotationUpFirst(
							e,
							Vector_1.Vector.UpVectorProxy,
							r,
						);
					break;
				case 1:
					e.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
						e.SubtractionEqual(n),
						MathUtils_1.MathUtils.LookRotationUpFirst(
							e,
							Vector_1.Vector.UpVectorProxy,
							r,
						);
					break;
				case 2:
					e.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
						e.Subtraction(this.L4r, e),
						e.Set(-e.X, -e.Y, 0),
						MathUtils_1.MathUtils.LookRotationUpFirst(
							e,
							Vector_1.Vector.UpVectorProxy,
							r,
						);
			}
			o.SetActorRotation(r.ToUeRotator(), "抓取", !1);
		}
	}
	$4r(t) {
		t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
		var e = this.Entity.GetComponent(3).Actor.Mesh;
		if (e?.DoesSocketExist(t)) return e.GetSocketTransform(t, 0);
	}
	ResetPosition() {
		var t = this.Entity.GetComponent(3),
			e = this.I4r.BulletEntity?.GetComponent(152)?.ActorLocation;
		this.I4r.BulletEntity &&
			e &&
			(t.SetActorLocation(e, "抓取.重置抓取位置", !1), this.Y4r());
	}
	Y4r() {
		var t = this.$4r(this.I4r.BindingInfo.TargetBoneName);
		t &&
			this.Q4r(
				Vector_1.Vector.Create(t.GetLocation()),
				this.I4r.BulletEntity.GetComponent(152).ActorLocationProxy,
			);
	}
	BeginCaughtTrigger(t, e) {
		if (
			(CombatDebugController_1.CombatDebugController.CombatInfo(
				"Caught",
				this.Entity,
				"开始抓取触发器",
			),
			t)
		)
			for (let r = 0; r < t.Num(); r++) {
				var o = t.Get(r),
					i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
						this.A4r,
						o.toString(),
					);
				if (!i)
					return void CombatDebugController_1.CombatDebugController.CombatWarn(
						"Caught",
						this.Entity,
						"抓取失败，配置不存在",
						["caughtId", o],
					);
				(this.Gco = e),
					(i = new CaughtTriggerInfo(o, i, this.Hte, this, this.Gco)),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"创建触发器信息",
						["id", o],
					),
					this.D4r.set(o, i);
			}
	}
	EndCaughtTrigger() {
		for (var [, t] of (CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"结束抓取触发器",
		),
		this.D4r))
			t.Clear();
		this.D4r.clear();
	}
	CheckCaught(t, e) {
		var o = e.GetComponent(185),
			i = e.GetComponent(43);
		return o.HasTag(-648310348) ||
			!this.F4r(t.TriggerInfo.CaughtTargetTag, e) ||
			!this.V4r(t.TriggerInfo.CaughtAimTarget, e.Id) ||
			o.HasTag(943579542)
			? 2
			: o.HasTag(627353781) ||
					o.HasTag(501201e3) ||
					o.HasTag(-1800191060) ||
					i.J4r(this.Entity) ||
					t.TriggerInfo.CaughtLevel < i.T4r
				? 1
				: 0;
	}
	TryCaught(t, e) {
		switch (this.CheckCaught(t, e)) {
			case 0:
				var o = this.R4r.get(t.CaughtId);
				if (this.InCaught && o) {
					if (o.Targets.length >= t.TriggerInfo.CaughtMxNumber) return;
					this.CaughtTarget(o, e);
				} else
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"抓取目标至搁置",
						[
							"target",
							ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e.Id),
						],
					),
						this.PendingCaughtList.set(t.CaughtId, [e, Time_1.Time.NowSeconds]);
				GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
					this.Entity.Id,
					e.Id,
					t.CaughtId,
					0,
				),
					this.Entity.GetComponent(99)?.SetTakeOverTick(!0);
				break;
			case 1:
				GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
					this.Entity.Id,
					e.Id,
					t.CaughtId,
					1,
				);
				break;
			case 2:
				GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
					this.Entity.Id,
					e.Id,
					t.CaughtId,
					2,
				);
		}
	}
	BeginCaught(t, e) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"开始抓取绑定器",
		),
			(this.InCaught = !0),
			this.Xte?.AddTag(665255436);
		for (let n = 0; n < t.Num(); n++) {
			var o = t.Get(n);
			if (
				!(r = DataTableUtil_1.DataTableUtil.GetDataTableRow(
					this.A4r,
					o.toString(),
				))
			)
				return void CombatDebugController_1.CombatDebugController.CombatWarn(
					"Caught",
					this.Entity,
					"抓取失败，配置不存在",
					["caughtId", o],
				);
			this.Gco = e;
			var i,
				r = new CaughtBindingInfo(o, r, this.Hte, this.Gco);
			(i =
				((i =
					(CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"创建绑定信息",
						["id", o],
					),
					this.R4r.set(o, r),
					this.PendingCaughtList.get(o))) &&
					(CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"抓取搁置目标",
					),
					this.CaughtTarget(r, i[0])),
				this.PendingRemoteCaughtList.get(o))) &&
				(CombatDebugController_1.CombatDebugController.CombatInfo(
					"Caught",
					this.Entity,
					"抓取远端搁置目标",
				),
				i[0].GetComponent(43).z4r(r, this.Entity, !0));
		}
	}
	CaughtTarget(t, e) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"执行抓取目标",
		);
		var o = this.Entity.GetComponent(157);
		for (let e = 0; e < t.BindingInfo.SourceBuffIds.Num(); e++)
			o.AddBuffFromAnimNotify(t.BindingInfo.SourceBuffIds.Get(e), void 0, {
				InstigatorId: o.CreatureDataId,
				Reason: "抓取目标添加buff",
			});
		e.GetComponent(43).BeginBeCaught(t, this.Entity);
	}
	EndCaught() {
		for (var [, t] of (CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"结束抓取绑定器",
		),
		(this.InCaught = !1),
		this.R4r)) {
			for (const e of t.Targets) e.GetComponent(43).EndBeCaught();
			var e;
			"" !== t.BindingInfo.EndBulletId &&
				((e = this.Entity.GetComponent(3)),
				BulletUtil_1.BulletUtil.CreateBulletFromAN(
					e.Actor,
					t.BindingInfo.EndBulletId,
					e.ActorTransform,
					this.Gco.toString(),
					!1,
				)),
				t.BulletEntityId &&
					t.BindingInfo.DestroyBullet &&
					BulletController_1.BulletController.DestroyBullet(
						t.BulletEntityId,
						t.BindingInfo.SummonChildBullet,
					),
				t.Clear();
		}
		this.R4r.clear(), this.Xte.RemoveTag(665255436);
	}
	BeginBeCaught(t, e) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"开始被抓取",
			["CaughtId", t.CaughtId],
		);
		var o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e),
			i =
				(EventSystem_1.EventSystem.HasWithTarget(
					o,
					EventDefine_1.EEventName.RemoveEntity,
					this.OnCatcherForceRemove,
				) ||
					EventSystem_1.EventSystem.AddWithTarget(
						o,
						EventDefine_1.EEventName.RemoveEntity,
						this.OnCatcherForceRemove,
					),
				this.cBe.StopAllSkills("CharacterCaughtNewComponent.BeginBeCaught"),
				this.z4r(t, e),
				e.GetComponent(157));
		for (let e = 0; e < t.BindingInfo.TargetBuffIds.Num(); e++)
			this.elt.AddBuffFromAnimNotify(t.BindingInfo.TargetBuffIds.Get(e), i, {
				InstigatorId: this.elt.CreatureDataId,
				Reason: "被抓取者添加buff",
			});
		((o = Protocol_1.Aki.Protocol.ENn.create()).a5n =
			Protocol_1.Aki.Protocol.POs.create()),
			(o.a5n.m9n = MathUtils_1.MathUtils.NumberToLong(
				e.GetComponent(0).GetCreatureDataId(),
			)),
			(o.a5n.I9n = MathUtils_1.MathUtils.BigIntToLong(BigInt(t.CaughtId))),
			(o.a5n.T9n = !1),
			CombatMessage_1.CombatNet.Call(3959, this.Entity, o, () => {});
	}
	BeginBeCaughtHandle(t, e) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"远端被抓取",
		);
		var o = e.GetComponent(43),
			i = o.R4r.get(t);
		o.InCaught && i
			? this.z4r(i, e, !0)
			: (CombatDebugController_1.CombatDebugController.CombatInfo(
					"Caught",
					this.Entity,
					"远端被抓取至搁置",
					["CaughtId", t],
					["InCaught", o.InCaught],
					["bindingInfo", !!i],
				),
				o.PendingRemoteCaughtList.set(t, [
					this.Entity,
					Time_1.Time.NowSeconds,
				]));
	}
	z4r(t, e, o = !1) {
		(this.x4r = !1),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Caught",
				this.Entity,
				"执行被抓取",
			),
			t.Targets.push(this.Entity),
			this.r4t.Reset(),
			(this.BeCaught = !0),
			(this.RemoteBeCaught = o),
			(this.I4r = t),
			this.S4r.SetRoleId(e.Id, 3),
			this.Gce.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
			this.Gce.CharacterMovement.SetMovementMode(5, 0),
			this.mbr.SetMoveState(
				CharacterUnifiedStateTypes_1.ECharMoveState.Captured,
			);
		var i,
			r =
				((o = this.Entity.GetComponent(3)).SetEnableVoxelDetection(
					!1,
					"被抓取者关闭体素检测，防止因为穿地导致误检测",
				),
				this.j4r(t.BindingInfo.CollisionResponseToChannel),
				this.K4r(),
				this.Xte.AddTag(-648310348),
				this.Xte.AddTag(-1697149502),
				this.$4r(t.BindingInfo.TargetBoneName)),
			n = this.Entity.GetComponent(3),
			a = t.BulletEntity;
		a?.Valid
			? ((i = t.BulletActorComponent.Owner.K2_GetActorLocation()),
				n.SetActorLocation(i, "抓取.开始被抓取", !1),
				r
					? this.Q4r(
							Vector_1.Vector.Create(r.GetLocation()),
							Vector_1.Vector.Create(i),
						)
					: this.Q4r(
							Vector_1.Vector.Create(n.ActorLocationProxy),
							Vector_1.Vector.Create(i),
						),
				((r =
					BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
						14,
					)).IsParentActor = !1),
				(r.Actor = o.Actor),
				(r.LocationRule = 2),
				(r.RotationRule = 2),
				(r.ScaleRule = 2),
				(r.WeldSimulatedBodies = !0),
				BulletController_1.BulletController.GetActionRunner().AddAction(
					a.GetBulletInfo(),
					r,
				))
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"Caught",
					this.Entity,
					"抓取绑定失败",
				),
			this.X4r(t),
			(0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
				this.Hte.SetRadiusAndHalfHeight(
					0.1 * this.Hte.Radius,
					0.1 * this.Hte.HalfHeight,
					!1,
				),
			GlobalData_1.GlobalData.BpEventManager.抓取目标成功时.Broadcast(
				e.Id,
				this.Entity.Id,
				t.CaughtId,
			);
	}
	get IsContinue() {
		return this.x4r && !(this.x4r = !1);
	}
	EndBeCaught() {
		var t;
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"结束被抓取",
		),
			this.EndBeCaughtInternal(),
			this.RemoteBeCaught ||
				(((t = Protocol_1.Aki.Protocol.ENn.create()).a5n =
					Protocol_1.Aki.Protocol.POs.create()),
				(t.a5n.T9n = !0),
				CombatMessage_1.CombatNet.Call(3959, this.Entity, t, () => {}));
	}
	EndBeCaughtHandle() {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Caught",
			this.Entity,
			"远端结束被抓取",
		),
			this.EndBeCaughtInternal();
	}
	EndBeCaughtInternal() {
		(this.x4r = !0),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Caught",
				this.Entity,
				"执行结束被抓取",
			),
			(this.BeCaught = !1),
			this.Xte.RemoveTag(-648310348),
			this.Xte.RemoveTag(-1697149502);
		var t = this.Entity.GetComponent(3),
			e = (t?.ResetCapsuleRadiusAndHeight(), t?.Actor?.CapsuleComponent);
		let o = 0;
		e && (o = e.K2_GetComponentRotation().Yaw),
			(e = new UE.Rotator(0, o, 0)),
			t.Actor.CapsuleComponent.K2_SetWorldRotation(e, !1, void 0, !1),
			this.S4r.RoleId &&
				0 !== this.S4r.RoleId &&
				(this.Entity.GetComponent(3).Actor.K2_DetachFromActor(1, 1, 1),
				this.W4r()),
			this.Entity.GetComponent(161).CharacterMovement.SetMovementMode(3, 0),
			this.mbr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other),
			this.Z4r(),
			(this.I4r = void 0),
			t.SetEnableVoxelDetection(!0, "被抓取者结束被抓取状态，恢复体素检测"),
			this.S4r.SetRoleId(0, 0);
	}
	Z4r() {
		var t = this.Entity.GetComponent(3),
			e = EntitySystem_1.EntitySystem.Get(this.S4r.RoleId);
		if (e) {
			var o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e);
			EventSystem_1.EventSystem.HasWithTarget(
				o,
				EventDefine_1.EEventName.RemoveEntity,
				this.OnCatcherForceRemove,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					o,
					EventDefine_1.EEventName.RemoveEntity,
					this.OnCatcherForceRemove,
				),
				this.Fse.HitResult?.Clear(),
				(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
			const i = e.GetComponent(3).ActorLocation;
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, i),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.Fse,
					t.ActorLocation,
				),
				(this.Fse.Radius = 0.3),
				(this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.Fse,
					PROFILE_KEY2,
				)),
				this.Cwr &&
					(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
						this.Fse.HitResult,
						0,
						this.r4t,
					),
					(this.r4t = this.SetAddRadiusLocation(
						this.G4r,
						this.r4t,
						t.Radius + 5,
					)),
					this.r4t.IsZero() ||
						(t.SetActorLocation(this.r4t.ToUeVector(), "抓取.结束被抓取", !1),
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"Caught",
							this.Entity,
							"被抓取结束时与抓取者碰撞检测修正",
							["FixPos", this.r4t],
							["StartTrace", i],
							["EndTrace", t.ActorLocation],
							["Radius", t.Radius],
						)));
		} else
			CombatDebugController_1.CombatDebugController.CombatError(
				"Caught",
				this.Entity,
				"该实体被抓取结束时无法找到抓取者！",
				["BeCaughtEntity", this.Entity.Id],
			);
		this.Fse.HitResult?.Clear(),
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
		const i = Vector_1.Vector.Create(
			t.ActorLocation.X,
			t.ActorLocation.Y,
			t.ActorLocation.Z + t.Radius + 5,
		);
		(o = Vector_1.Vector.Create(
			t.ActorLocation.X,
			t.ActorLocation.Y,
			t.ActorLocation.Z - t.Radius - 5,
		)),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, i),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, o),
			(this.Fse.Radius = 0.3),
			(this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Fse,
				PROFILE_KEY2,
			)),
			this.Cwr &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.Fse.HitResult,
					0,
					this.r4t,
				),
				this.r4t.Addition(Vector_1.Vector.Create(0, 0, t.Radius + 5), this.r4t),
				this.r4t.IsZero() ||
					(t.SetActorLocation(this.r4t.ToUeVector(), "抓取.结束被抓取", !1),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Caught",
						this.Entity,
						"被抓取结束时地面碰撞检测修正",
						["FixPos", this.r4t],
						["StartTrace", i],
						["EndTrace", t.ActorLocation],
						["Radius", t.Radius],
					)));
	}
	e5r(t, e) {
		var o = t.GetComponent(160);
		o
			? o.GetCameraPosition(e)
			: e.DeepCopy(t.GetComponent(1).ActorLocationProxy);
	}
	J4r(t) {
		return (
			this.Fse.HitResult?.Clear(),
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
			this.e5r(t, this.pwr),
			this.w4r.DeepCopy(this.pwr),
			this.e5r(this.Entity, this.uae),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.Fse,
				this.w4r,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.Fse,
				this.uae,
			),
			(this.Fse.Radius = 0.3),
			(this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Fse,
				PROFILE_KEY2,
			)),
			(this.B4r = this.Cwr),
			this.B4r
		);
	}
	CorrectPosition() {
		this.Fse.HitResult?.Clear(),
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
		var t = this.Entity.GetComponent(47)?.RoleId;
		if ((t = EntitySystem_1.EntitySystem.Get(t)) && t.Valid)
			if (
				(this.e5r(t, this.pwr),
				this.w4r.DeepCopy(this.pwr),
				this.e5r(this.Entity, this.uae),
				this.B4r
					? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.Fse,
							this.uae,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.Fse,
							this.w4r,
						))
					: (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.Fse,
							this.w4r,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.Fse,
							this.uae,
						)),
				(this.Fse.Radius = 0.3),
				(this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.Fse,
					PROFILE_KEY2,
				)),
				this.Cwr)
			) {
				if (
					(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
						this.Fse.HitResult,
						0,
						this.Wse,
					),
					this.B4r)
				) {
					var e = this.Entity.GetComponent(3)?.ActorLocationProxy;
					if (
						(this.w4r.Subtraction(e, this.q4r),
						this.Wse.Subtraction(this.w4r, this.G4r),
						this.G4r.Size() + this.Entity.GetComponent(3).Radius / 0.1 >
							this.q4r.Size())
					)
						return (
							(this.r4t = this.SetAddRadiusLocation(
								this.G4r,
								this.Wse,
								this.Entity.GetComponent(3).Radius / 0.1 + 5,
							)),
							void this.Entity.GetComponent(3).SetActorLocation(
								this.r4t.ToUeVector(),
								"抓取.检测抓取者跟被抓取者之间是否有碰撞",
								!0,
							)
						);
				} else
					(e = this.Entity.GetComponent(3)?.ActorLocationProxy),
						this.w4r.Subtraction(e, this.q4r),
						this.w4r.Subtraction(this.Wse, this.G4r),
						this.Wse.Subtraction(e, this.b4r),
						this.G4r.Size() - this.Entity.GetComponent(3).Radius / 0.1 <
							this.q4r.Size() &&
							((this.r4t = this.SetAddRadiusLocation(
								this.G4r,
								this.Wse,
								this.Entity.GetComponent(3).Radius / 0.1 + 5,
							)),
							this.Entity.GetComponent(3).SetActorLocation(
								this.r4t.ToUeVector(),
								"抓取.检测抓取者跟被抓取者之间是否有碰撞",
								!0,
							));
				this.b4r.Size() <= t.GetComponent(3).Radius &&
					t.GetComponent(161).SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
			} else this.ResetPosition();
		else this.BeCaught && this.EndBeCaught();
	}
	Iwr() {
		(this.Fse = UE.NewObject(UE.TraceCapsuleElement.StaticClass())),
			(this.Fse.bIsSingle = !0),
			(this.Fse.bIgnoreSelf = !0),
			(this.Fse.bTraceComplex = !0),
			(0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
				((this.Fse.HalfHeight = this.Hte.DefaultHalfHeight),
				(this.Fse.Radius = this.Hte.DefaultRadius)),
			this.Fse.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			this.Fse.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
			);
	}
	k4r() {
		this.Fse && (this.Fse.Dispose(), (this.Fse = void 0));
	}
	GetBoneTransform(t, e) {
		if (
			((t = t.GetComponent(3)?.Actor?.Mesh),
			-1 !== t.GetAllSocketNames().FindIndex(e))
		)
			return t.GetSocketTransform(e, 0);
	}
	SetAddRadiusLocation(t, e, o) {
		var i = Vector_1.Vector.Create(),
			r = Vector_1.Vector.Create();
		return (
			r.DeepCopy(e),
			i.DeepCopy(t),
			i.Normalize(),
			i.Multiply(o, i),
			r.Addition(i, r),
			r
		);
	}
	static CaughtNotify(t, e) {
		var o;
		t = t?.GetComponent(43);
		t &&
			(e.a5n.T9n
				? t.EndBeCaughtHandle()
				: ((o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
						MathUtils_1.MathUtils.LongToNumber(e.a5n.m9n),
					)),
					t.BeginBeCaughtHandle(
						MathUtils_1.MathUtils.LongToBigInt(e.a5n.I9n).toString(),
						o.Entity,
					)));
	}
};
__decorate(
	[CombatMessage_1.CombatNet.SyncHandle("d2n")],
	CharacterCaughtNewComponent,
	"CaughtNotify",
	null,
),
	(CharacterCaughtNewComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(43)],
		CharacterCaughtNewComponent,
	)),
	(exports.CharacterCaughtNewComponent = CharacterCaughtNewComponent);
