"use strict";
var CharacterMovementSyncComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, r) {
			var i,
				n = arguments.length,
				a =
					n < 3
						? e
						: null === r
							? (r = Object.getOwnPropertyDescriptor(e, o))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, o, r);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(a = (n < 3 ? i(a) : 3 < n ? i(e, o, a) : i(e, o)) || a);
			return 3 < n && a && Object.defineProperty(e, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterMovementSyncComponent = void 0);
const Cpp = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Deque_1 = require("../../../../../Core/Container/Deque"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	GlobalData_1 = require("../../../../GlobalData"),
	InputEnums_1 = require("../../../../Input/InputEnums"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	CombatDebugDrawController_1 = require("../../../../Utils/CombatDebugDrawController"),
	TsBaseItem_1 = require("../../../SceneItem/BaseItem/TsBaseItem"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
class FastMoveSample {
	constructor() {
		(this.Location = Vector_1.Vector.Create()),
			(this.Rotation = Rotator_1.Rotator.Create()),
			(this.LinearVelocity = Vector_1.Vector.Create()),
			(this.MovementMode = 0);
	}
	ClearObject() {
		return !0;
	}
}
class ReadOnlyFastMoveSample {
	constructor() {
		(this.Location = Vector_1.Vector.Create()),
			(this.Rotation = Rotator_1.Rotator.Create()),
			(this.LinearVelocity = Vector_1.Vector.Create()),
			(this.MovementMode = 0),
			(this.IsInit = !1);
	}
	ClearObject() {
		return (
			(this.IsInit = !1),
			(this.Location = Vector_1.Vector.Create()),
			(this.Rotation = Rotator_1.Rotator.Create()),
			(this.LinearVelocity = Vector_1.Vector.Create()),
			!0
		);
	}
}
class RelativeMove {
	constructor() {
		(this.BaseMovementEntityId = 0),
			(this.RelativeLocation = void 0),
			(this.RelativeRotation = void 0);
	}
}
class ReplaySample {
	constructor(t, e, o) {
		(this.$kn = Vector_1.Vector.Create()),
			(this.D3n = Rotator_1.Rotator.Create()),
			(this.A3n = Vector_1.Vector.Create()),
			(this.K9n = Vector_1.Vector.Create()),
			(this.ControllerPitch = 0),
			(this.r5n = 0),
			(this.Q9n = 0),
			(this.h4n = 0),
			(this.$9n = void 0),
			(this.X9n = 0),
			(this.Y9n = 1),
			(this.J9n = 0),
			(this.z9n = 0);
		const r = t.$kn,
			i = t.D3n;
		var n = t.A3n,
			a = t.K9n;
		if (
			(n =
				(this.$kn.Set(r.X, r.Y, r.Z),
				this.D3n.Set(i.Pitch, i.Yaw, i.Roll),
				this.A3n.Set(n.X, n.Y, n.Z),
				a && this.K9n.Set(a.X, a.Y, a.Z),
				(this.ControllerPitch = t.ControllerPitch),
				(this.r5n = t.r5n),
				(this.Q9n = t.xgs),
				(this.Y9n = t.Y9n),
				(this.h4n = o),
				(this.X9n = e),
				(this.J9n = MathUtils_1.MathUtils.LongToNumber(t.J9n)),
				(this.z9n = t.Z9n),
				t.e7n))
		) {
			(this.$9n = new RelativeMove()),
				(this.$9n.BaseMovementEntityId = MathUtils_1.MathUtils.LongToNumber(
					n.t7n,
				));
			const t = n.i7n,
				e = n.r7n;
			(this.$9n.RelativeRotation = Rotator_1.Rotator.Create(
				t.Pitch,
				t.Yaw,
				t.Roll,
			)),
				(this.$9n.RelativeLocation = Vector_1.Vector.Create(e.X, e.Y, e.Z));
		}
	}
}
let CharacterMovementSyncComponent =
	(CharacterMovementSyncComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Hte = void 0),
				(this.OHr = void 0),
				(this.Gce = void 0),
				(this.Nce = void 0),
				(this.aYo = void 0),
				(this.cBe = void 0),
				(this.SIe = void 0),
				(this.kHr = void 0),
				(this.FHr = !1),
				(this.CacheLocation = Vector_1.Vector.Create()),
				(this.Fuo = Rotator_1.Rotator.Create()),
				(this.VHr = Vector_1.Vector.Create()),
				(this.ControllerPlayerId = 0),
				(this.HHr = 255),
				(this.jHr = 65535),
				(this.WHr = 1),
				(this.KHr = 0),
				(this.QHr = 1),
				(this.XHr = !1),
				(this.$Hr = void 0),
				(this.YHr = !1),
				(this.JHr = !1),
				(this.zHr = !1),
				(this.VVt = 0),
				(this.ZHr = 0),
				(this.ejr = Vector_1.Vector.Create()),
				(this.tjr = Rotator_1.Rotator.Create()),
				(this.LastLocation = Vector_1.Vector.Create()),
				(this.ijr = Rotator_1.Rotator.Create()),
				(this.ojr = !1),
				(this.rjr = 0),
				(this.PendingMoveInfos = []),
				(this.njr = void 0),
				(this.sjr = void 0),
				(this.ajr = void 0),
				(this.hjr = !1),
				(this.ljr = 0),
				(this._jr = 0),
				(this.ujr = 0),
				(this.cjr = (t) => {
					var e;
					this.Hte.IsMoveAutonomousProxy ||
						this.Entity.GetComponent(185).HasTag(-648310348) ||
						((this.ojr = !1),
						(this.PendingMoveInfos.length = 0),
						this.TickReplaySamples(),
						this.YHr &&
							((e = Vector_1.Vector.Dist(
								this.LastLocation,
								this.Hte.ActorLocationProxy,
							)),
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"MultiplayerCombat",
									15,
									"ChangeControl",
									["control", this.Hte.IsMoveAutonomousProxy],
									["diffDistance", e],
								),
							this.ReportMoveDataDragDistance(e, !1)));
				}),
				(this.mjr = new FastMoveSample()),
				(this.djr = new ReadOnlyFastMoveSample()),
				(this.Cjr = this.djr),
				(this.$9r = (t) => {
					if ((this.gjr(t), this.fjr && this.Hte.IsMoveAutonomousProxy)) {
						if (!(0 < this.ujr && this.ujr === this.ljr)) {
							(this.ujr = this.ljr),
								(this.ControllerPlayerId =
									ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
								this.ClearReplaySamples();
							t = this.Cjr.MovementMode;
							var e =
									this.Entity.TimeDilation * (this.OHr?.CurrentTimeScale ?? 1),
								o =
									this.KHr !== t ||
									this.aYo?.DirectionState ===
										CharacterUnifiedStateTypes_1.ECharDirectionState
											.AimDirection ||
									this.XHr ||
									!this.Cjr.LinearVelocity.IsZero() ||
									!this.LastLocation.Equals(this.Cjr.Location) ||
									!this.ijr.Equals(this.Cjr.Rotation) ||
									this.QHr !== e;
							t =
								this.KHr !== t ||
								this.XHr !== this.Gce.HasBaseMovement ||
								this.QHr !== e;
							if (
								((t ||= !o && this.zHr),
								(this.QHr = e),
								ModelManager_1.ModelManager.GameModeModel.IsMulti)
							)
								if (
									(this.YHr ||
										((e = Vector_1.Vector.Dist(
											this.LastLocation,
											this.Cjr.Location,
										)),
										this.ReportMoveDataDragDistance(e, !0),
										CombatDebugController_1.CombatDebugController.CombatInfo(
											"Move",
											this.Entity,
											"移动来源切换自身",
											["上个控制者", this.ControllerPlayerId],
											[
												"当前控制者",
												ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
											],
											["位移距离", e.toFixed()],
										)),
									(e = this.Entity.GetComponent(0)),
									CombatDebugDrawController_1.CombatDebugDrawController
										.DebugMonsterMovePath &&
										e.GetEntityType() ===
											Protocol_1.Aki.Protocol.wks.Proto_Monster &&
										UE.KismetSystemLibrary.DrawDebugLine(
											GlobalData_1.GlobalData.World,
											this.LastLocation.ToUeVector(),
											this.Cjr.Location.ToUeVector(),
											new UE.LinearColor(0, 1, 0, 1),
											15,
										),
									ModelManager_1.ModelManager.CombatMessageModel
										.MoveSyncUdpMode)
								)
									t
										? this.CollectSampleAndSend(!0)
										: o && this.CollectSampleAndSendUdp();
								else {
									if (!this.ojr) {
										if (!o) return void this.pjr(o);
										(this.ojr = !0),
											(this.rjr = Time_1.Time.NowSeconds),
											(this.PendingMoveInfos.length = 0);
									}
									const t = this.GetCurrentMoveSample();
									(new ReplaySample(
										t,
										ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
										Time_1.Time.NowSeconds,
									).h4n = Time_1.Time.NowSeconds),
										this.PendingMoveInfos.push(t),
										(Time_1.Time.NowSeconds >=
											this.rjr +
												CharacterMovementSyncComponent_1.PendingMoveCacheTime ||
											!o) &&
											(ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
												!0);
								}
							else {
								(e =
									Time_1.Time.NowSeconds - this.VVt >=
									CharacterMovementSyncComponent_1.SingleModeSendInterval),
									(t =
										!this.ejr.Equals(
											this.Cjr.Location,
											CharacterMovementSyncComponent_1.SingleModeSendLocationTolerance,
										) ||
										!this.tjr.Equals(
											this.Cjr.Rotation,
											CharacterMovementSyncComponent_1.SingleModeSendRotationTolerance,
										));
								var r = this.cBe?.CurrentSkill?.SkillId ?? 0;
								r = this.ajr && r !== this.ajr.vkn;
								if (!o && this.zHr) {
									const t = this.GetCurrentMoveSample();
									this.PendingMoveInfos.push(t),
										(ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
											!0);
								} else if (o && t)
									if (e) {
										const t = this.GetCurrentMoveSample();
										this.PendingMoveInfos.push(t),
											(ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
												!0);
									} else if (r || this.ajr?.F9n !== this.aYo.MoveState) {
										const t = this.GetCurrentMoveSample();
										this.PendingMoveInfos.push(t);
									}
							}
							this.pjr(o);
						}
					} else this.pjr();
				}),
				(this.vjr = new Deque_1.Deque()),
				(this.TmpLocation = Vector_1.Vector.Create()),
				(this.TmpLocation2 = Vector_1.Vector.Create()),
				(this.TmpRotation = Rotator_1.Rotator.Create());
		}
		static get Dependencies() {
			return [3];
		}
		get fjr() {
			return this.FHr;
		}
		set fjr(t) {
			this.FHr !== t &&
				(t
					? (CombatMessageController_1.CombatMessageController.RegisterPreTick(
							this,
							this.cjr,
						),
						CombatMessageController_1.CombatMessageController.RegisterAfterTick(
							this,
							this.$9r,
						))
					: (CombatMessageController_1.CombatMessageController.UnregisterPreTick(
							this,
						),
						CombatMessageController_1.CombatMessageController.UnregisterAfterTick(
							this,
						)),
				(this.FHr = t));
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(3)),
				(this.OHr = this.Entity.GetComponent(162)),
				(this.Gce = this.Entity.GetComponent(36)),
				(this.Nce = this.Entity.GetComponent(52)),
				(this.aYo = this.Entity.GetComponent(89)),
				(this.cBe = this.Entity.GetComponent(33)),
				(this.SIe = this.Entity.GetComponent(0)),
				(this.kHr = this.Entity.GetComponent(32)),
				(this.fjr = !0),
				ModelManager_1.ModelManager.CombatMessageModel.AddMoveSync(this) ||
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Move",
						this.Entity,
						"重复添加移动同步",
					),
				!0
			);
		}
		OnEnd() {
			return (
				ModelManager_1.ModelManager.CombatMessageModel.DeleteMoveSync(this) ||
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Move",
						this.Entity,
						"移除移动同步失败",
					),
				!(this.fjr = !1)
			);
		}
		Mjr(t, e) {
			var o, r;
			this.Nce &&
				(t !== this.jHr
					? ((o = t & this.HHr),
						(t = this.Sjr(t >> 8)),
						(r = this.Sjr(o)),
						this.Nce.SetMoveVectorCache(t, r),
						this.Hte.SetInputRotatorByNumber(0, (o / this.HHr) * 360, 0))
					: (this.Nce.SetMoveVectorCache(
							Vector2D_1.Vector2D.ZeroVector,
							Vector2D_1.Vector2D.ZeroVector,
						),
						this.Hte.SetInputRotator(e)));
		}
		Sjr(t) {
			var e;
			return t === this.HHr
				? Vector2D_1.Vector2D.ZeroVector
				: ((t = MathUtils_1.MathUtils.RangeClamp(
						t,
						0,
						this.HHr,
						0,
						2 * Math.PI,
					)),
					((e = new UE.Vector2D()).X = Math.cos(t)),
					(e.Y = Math.sin(t)),
					e);
		}
		OnActivate() {
			return (
				this.njr && Time_1.Time.NowSeconds >= this.njr.h4n
					? (this.Hte.SetActorLocationAndRotation(
							this.njr.$kn.ToUeVector(),
							this.njr.D3n.ToUeRotator(),
							"角色移动同步.处理出生位置刷新",
							!1,
						),
						this.LastLocation.DeepCopy(this.njr.$kn),
						this.ijr.DeepCopy(this.njr.D3n))
					: (this.LastLocation.DeepCopy(this.Hte.Actor.K2_GetActorLocation()),
						this.ijr.DeepCopy(this.Hte.Actor.K2_GetActorRotation())),
				this.Hte.IsMoveAutonomousProxy && this.CollectSampleAndSend(),
				(this.YHr = this.Hte.IsMoveAutonomousProxy),
				!0
			);
		}
		GetCurrentMoveSample() {
			var t = Protocol_1.Aki.Protocol.JBs.create(),
				e =
					((t.$kn = { X: 0, Y: 0, Z: 0 }),
					(t.A3n = { X: 0, Y: 0, Z: 0 }),
					(t.D3n = { Pitch: 0, Roll: 0, Yaw: 0 }),
					this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0),
				o = this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
			return (
				Cpp.FFastMoveReplaySample.UpdateFastMoveSampleInput(
					t,
					t.$kn,
					t.D3n,
					t.A3n,
					this.Hte.Actor,
					this.Gce.CharacterMovement,
					e,
					o,
					this.HHr,
					CameraController_1.CameraController.CameraRotator.Yaw,
				),
				0 === t.r5n &&
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Move",
						this.Entity,
						"获取当前的MovementMode为0",
					),
				(t.F9n = this.aYo?.MoveState ?? 0),
				(t.J9n = Time_1.Time.CombatServerTime),
				(t.h4n = Time_1.Time.NowSeconds),
				1 < this.Entity.GetTickInterval() &&
					0 < this._jr &&
					0 < this.ljr &&
					(t.o7n = 1e3 * (this.ljr - this._jr)),
				(t.Z9n = Net_1.Net.RttMs),
				(t.Y9n = this.Entity.TimeDilation * (this.OHr?.CurrentTimeScale ?? 1)),
				this.kHr &&
					((e = this.kHr.SlideForward), (t.K9n = { X: e.X, Y: e.Y, Z: e.Z })),
				this.Gce?.HasBaseMovement && this.Gce?.BasePlatform
					? (t.e7n = this.Ejr(this.Gce.BasePlatform))
					: this.XHr &&
						(this.$Hr?.IsValid()
							? (t.e7n = this.Ejr(this.$Hr, !0))
							: (this.XHr = !1)),
				(t.vkn = this.cBe?.CurrentSkill?.SkillId ?? 0),
				(this.ajr = t)
			);
		}
		Ejr(t, e = !1) {
			if (t?.IsValid()) {
				var o = t.RootComponent.AttachParent?.GetOwner();
				if (o?.IsValid()) {
					let i = !1;
					if (!(o instanceof TsBaseCharacter_1.default)) {
						if (!(o instanceof TsBaseItem_1.default)) return;
						i = !0;
					}
					let n,
						a = new UE.Transform();
					if (i) {
						var r = o;
						r = ActorUtils_1.ActorUtils.GetEntityByActor(r);
						if (!r?.Valid) return;
						(n = r.Entity.GetComponent(0).GetCreatureDataId()),
							(a = r.Entity.GetComponent(182).ActorTransform);
					} else {
						if (
							((r = o),
							0 ===
								(n = r
									.GetEntityNoBlueprint()
									?.GetComponent(0)
									?.GetCreatureDataId()))
						)
							return;
						a = r.Mesh.GetSocketTransform(t.RootComponent.AttachSocketName);
					}
					return e &&
						((o = UE.KismetMathLibrary.TransformLocation(
							a,
							t.LeaveSphereCenter,
						)),
						this.CacheLocation.DeepCopy(o),
						(r = Vector_1.Vector.DistSquared(
							this.Cjr.Location,
							this.CacheLocation,
						)) >
							t.LeaveSphereRadius * t.LeaveSphereRadius)
						? ((this.XHr = !1), void (this.$Hr = void 0))
						: ((e =
								this.Hte.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
							((o = this.Hte.Actor.K2_GetActorLocation()).Z -= e),
							(r = UE.KismetMathLibrary.InverseTransformLocation(a, o)),
							(t = this.Hte.Actor.K2_GetActorRotation()),
							(e = UE.KismetMathLibrary.InverseTransformRotation(a, t)),
							((o = Protocol_1.Aki.Protocol.e7n.create()).t7n =
								MathUtils_1.MathUtils.NumberToLong(n)),
							(o.r7n = { X: r.X, Y: r.Y, Z: r.Z }),
							(o.i7n = { Pitch: e.Pitch, Roll: e.Roll, Yaw: e.Yaw }),
							o);
				}
			}
		}
		pjr(t = !1) {
			(this.KHr = this.Cjr.MovementMode),
				this.Gce?.HasBaseMovement &&
					this.Gce?.BasePlatform &&
					((this.XHr = this.Gce.HasBaseMovement),
					(this.$Hr = this.Gce.BasePlatform)),
				this.LastLocation.DeepCopy(this.Cjr.Location),
				this.ijr.DeepCopy(this.Cjr.Rotation),
				(this.YHr = this.Hte.IsMoveAutonomousProxy),
				(this.zHr = t);
		}
		OnTick(t) {
			(this._jr = this.ljr), (this.ljr = Time_1.Time.NowSeconds);
		}
		gjr(t) {
			this.Hte?.IsActorMoveInfoCache
				? (this.djr.IsInit ||
						((this.djr.IsInit = !0),
						(this.djr.Location = this.Hte?.ActorLocationProxy),
						(this.djr.Rotation = this.Hte?.ActorRotationProxy),
						(this.djr.LinearVelocity = this.Hte?.ActorVelocityProxy)),
					(this.djr.MovementMode = this.Gce.CharacterMovement.MovementMode),
					(this.Cjr = this.djr))
				: (Cpp.FFastMoveReplaySample.UpdateFastMoveSampleBase(
						this.mjr,
						this.mjr.Location,
						this.mjr.Rotation,
						this.mjr.LinearVelocity,
						this.Hte.Actor,
						this.Gce.CharacterMovement,
					),
					(this.Cjr = this.mjr));
		}
		CollectSampleAndSend(t = !1) {
			var e = this.GetCurrentMoveSample();
			this.PendingMoveInfos.push(e),
				t
					? ((e = Protocol_1.Aki.Protocol.Xhs.create()).Mys.push(
							this.CollectPendingMoveInfos(),
						),
						Net_1.Net.Send(29494, e),
						(this.VVt = Time_1.Time.NowSeconds))
					: (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !0);
		}
		CollectSampleAndSendUdp() {
			if (
				Time_1.Time.NowSeconds - this.VVt <
				ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpSendInterval
			) {
				if (
					ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpFullSampling
				) {
					const t = this.GetCurrentMoveSample();
					this.PendingMoveInfos.push(t);
				}
			} else {
				const e = this.GetCurrentMoveSample();
				this.PendingMoveInfos.push(e);
				var t = Protocol_1.Aki.Protocol.Jhs.create();
				t.Mys.push(this.CollectPendingMoveInfos()),
					Net_1.Net.Send(17208, t),
					(this.VVt = Time_1.Time.NowSeconds);
			}
		}
		CollectPendingMoveInfos() {
			let t = 0;
			for (const e of this.PendingMoveInfos) {
				if (
					Time_1.Time.NowSeconds <
					e.h4n + CharacterMovementSyncComponent_1.MaxPendingMoveCacheTime
				)
					break;
				t++;
			}
			var e, o;
			if (
				(0 < t &&
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"MultiplayerCombat",
							15,
							"移动包过期",
							["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].h4n],
							["NowSeconds", Time_1.Time.NowSeconds],
							["TimeStamp", this.PendingMoveInfos[0].h4n],
						),
					this.PendingMoveInfos.splice(0, t)),
				0 !== this.PendingMoveInfos.length)
			)
				return (
					((e = Protocol_1.Aki.Protocol.aOs.create()).rkn =
						MathUtils_1.MathUtils.NumberToLong(
							this.Hte.CreatureData.GetCreatureDataId(),
						)),
					(e.a4n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
					(e.m4n = this.PendingMoveInfos),
					CombatDebugController_1.CombatDebugController.CombatDebugEx(
						"Move",
						this.Entity,
						"发移动包" + this.MoveInfosToString(this.PendingMoveInfos),
					),
					(o = this.PendingMoveInfos[this.PendingMoveInfos.length - 1]),
					(this.ejr.X = o.$kn.X),
					(this.ejr.Y = o.$kn.Y),
					(this.ejr.Z = o.$kn.Z),
					(this.tjr.Roll = o.D3n.Roll),
					(this.tjr.Pitch = o.D3n.Pitch),
					(this.tjr.Yaw = o.D3n.Yaw),
					(this.ojr = !1),
					(this.VVt = Time_1.Time.NowSeconds),
					(this.PendingMoveInfos = []),
					e
				);
		}
		ReceiveMoveInfos(t, e, o) {
			if (0 === t.length)
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"Move",
					this.Entity,
					"收移动包失败，移动包长度为0",
				);
			else {
				var r =
					ModelManager_1.ModelManager.CombatMessageModel.GetMessageBufferByEntityId(
						this.Entity.Id,
					);
				if (r) {
					CombatDebugController_1.CombatDebugController.CombatDebugEx(
						"Move",
						this.Entity,
						"收移动包" + this.MoveInfosToString(t),
					);
					var i = o + r.TimelineOffset,
						n =
							(Time_1.Time.NowSeconds > i &&
								((i = Time_1.Time.NowSeconds - i),
								CombatDebugController_1.CombatDebugController.CombatWarn(
									"Move",
									this.Entity,
									"移动缓冲不足",
									["missTime", i],
									["TimeStamp", o],
								),
								this.ReportMoveDataBufferMissTime(1e3 * i)),
							MathUtils_1.MathUtils.LongToNumber(e));
					this.ZHr !== n &&
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"Move",
							this.Entity,
							"移动协议包切换",
							["上个控制者", this.ZHr],
							["当前控制者", n],
							["TimeStamp", o],
						);
					for (const e of t) {
						(!e.h4n || e.h4n <= 0) &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"MultiplayerCombat",
								15,
								"[CharacterMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0",
								["TimeStamp", e.h4n ?? void 0],
							);
						let t = 0 < e.o7n ? 0.001 * e.o7n : 0;
						0 < t &&
							((t = MathUtils_1.MathUtils.Clamp(t, 0, this.WHr)),
							CombatDebugController_1.CombatDebugController.CombatInfo(
								"Move",
								this.Entity,
								"额外移动缓冲",
								["extraOffset", t],
							));
						var a = new ReplaySample(e, n, e.h4n + r.TimelineOffset + t);
						this.AddReplaySample(a);
					}
					this.ZHr = n;
				} else
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Move",
						this.Entity,
						"收移动包失败，缓冲器查询失败",
					);
			}
		}
		ReceiveServerMovementData(t, e = 0) {}
		GetEnableMovementSync() {
			return this.fjr;
		}
		SetEnableMovementSync(t) {
			this.fjr = t;
		}
		AddReplaySample(t) {
			for (
				0 === t.r5n &&
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"Move",
					this.Entity,
					"收到移动包的MovementMode为0",
				);
				!this.vjr.Empty && this.vjr.Rear.h4n > t.h4n;
			)
				this.vjr.RemoveRear();
			this.vjr.AddRear(t), (this.njr = t);
		}
		ClearReplaySamples() {
			this.vjr.Clear(), (this.sjr = void 0);
		}
		CloneMoveSampleInfos(t) {
			this.vjr.Clone(t.vjr);
		}
		yjr(t, e, o, r, i, n) {
			if (((0, puerts_1.$set)(n, !1), !t.$9n || !e.$9n)) return !1;
			let a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
				t.$9n.BaseMovementEntityId,
			);
			if (
				!(a =
					a ||
					ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
						t.$9n.BaseMovementEntityId,
					))
			)
				return !1;
			let s,
				h = !1;
			if (a.Entity.GetComponent(182)) {
				h = !0;
				var l = a.Entity.GetComponent(182),
					c =
						((0, puerts_1.$set)(n, l.IsMoveAutonomousProxy),
						l.GetInteractionMainActor());
				if (!(s = c.BasePlatform)?.IsValid()) return !1;
				this.TmpLocation.DeepCopy(s.K2_GetActorLocation()),
					this.TmpRotation.DeepCopy(s.K2_GetActorRotation()),
					this.Gce?.CharacterMovement.AddTickPrerequisiteComponent(
						l.GetPrimitiveComponent(),
					);
			} else {
				(l = (c = a.Entity.GetComponent(3)).Actor),
					(0, puerts_1.$set)(n, c.IsMoveAutonomousProxy);
				const t = l.BasePlatform;
				if (!t?.IsValid()) return !1;
				a.Entity.GetComponent(99)?.SetTakeOverTick(!0),
					this.TmpLocation.DeepCopy(t.K2_GetActorLocation()),
					this.TmpRotation.DeepCopy(t.K2_GetActorRotation()),
					this.Gce?.CharacterMovement.AddTickPrerequisiteComponent(l.Mesh);
			}
			Vector_1.Vector.Lerp(
				t.$9n.RelativeLocation,
				e.$9n.RelativeLocation,
				o,
				r,
			),
				Rotator_1.Rotator.Lerp(
					t.$9n.RelativeRotation,
					e.$9n.RelativeRotation,
					o,
					i,
				);
			let C = new UE.Transform();
			return (
				(C = h
					? a.Entity.GetComponent(182).ActorTransform
					: a.Entity.GetComponent(3).Actor.Mesh.GetSocketTransform(
							s.RootComponent.AttachSocketName,
						)),
				(n = UE.KismetMathLibrary.TransformLocation(C, r.ToUeVector())),
				r.DeepCopy(n),
				(c = this.Hte.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
				(r.Z += c),
				(l = UE.KismetMathLibrary.TransformRotation(C, i.ToUeRotator())),
				i.DeepCopy(l),
				!0
			);
		}
		TickReplaySamples() {
			var t = Time_1.Time.NowSeconds;
			for (
				this.sjr &&
				1 < t - this.sjr.h4n &&
				(CombatDebugController_1.CombatDebugController.CombatInfo(
					"Move",
					this.Entity,
					"不连贯的样条点丢弃",
					["diff", t - this.sjr.h4n],
				),
				(this.sjr = void 0));
				!this.vjr.Empty;
			) {
				var e = this.sjr,
					o = this.vjr.Front;
				if (!(t >= o.h4n)) {
					if (!e) break;
					var r = MathUtils_1.MathUtils.RangeClamp(t, e.h4n, o.h4n, 0, 1),
						i = (0, puerts_1.$ref)(void 0);
					i =
						(this.yjr(e, o, r, this.CacheLocation, this.Fuo, i)
							? (this.JHr, (this.JHr = !0))
							: (Vector_1.Vector.Lerp(e.$kn, o.$kn, r, this.CacheLocation),
								Rotator_1.Rotator.Lerp(e.D3n, o.D3n, r, this.Fuo),
								this.JHr,
								(this.JHr = !1)),
						Vector_1.Vector.Lerp(e.A3n, o.A3n, r, this.VHr),
						CombatDebugController_1.CombatDebugController.CombatDebugEx(
							"Move",
							this.Entity,
							`执行移动包 {${this.MoveInfoToString(e)}} {${this.MoveInfoToString(o)}}`,
						),
						MathUtils_1.MathUtils.Lerp(
							MathCommon_1.MathCommon.WrapAngle(e.ControllerPitch),
							MathCommon_1.MathCommon.WrapAngle(o.ControllerPitch),
							r,
						));
					this.Ijr(
						e.r5n,
						this.CacheLocation,
						this.Fuo,
						e.A3n,
						e.K9n,
						o.X9n,
						e.Q9n,
						i,
						e.Y9n,
						e.J9n,
						e.z9n,
					),
						(this.hjr = !0);
					break;
				}
				(this.sjr = o), (this.hjr = !1), this.vjr.RemoveFront();
			}
			this.vjr.Empty &&
				!this.hjr &&
				this.sjr &&
				(CombatDebugController_1.CombatDebugController.CombatDebugEx(
					"Move",
					this.Entity,
					"执行最后一个移动包" + this.MoveInfoToString(this.sjr),
				),
				this.Ijr(
					this.sjr.r5n,
					this.sjr.$kn,
					this.sjr.D3n,
					this.sjr.A3n,
					this.sjr.K9n,
					this.sjr.X9n,
					this.sjr.Q9n,
					this.sjr.ControllerPitch,
					this.sjr.Y9n,
					this.sjr.J9n,
					this.sjr.z9n,
				),
				(this.hjr = !0));
		}
		Ijr(t, e, o, r, i, n, a, s, h, l, c) {
			(!this.YHr && this.ControllerPlayerId === n) ||
				((C = Vector_1.Vector.Dist(this.LastLocation, this.CacheLocation)),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Move",
					this.Entity,
					"移动来源切换",
					["上个控制者", this.ControllerPlayerId],
					["当前控制者", n],
					["位移距离", C.toFixed()],
				));
			var C = this.Entity.GetComponent(0);
			CombatDebugDrawController_1.CombatDebugDrawController
				.DebugMonsterMovePath &&
				C.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Monster &&
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.World,
					this.LastLocation.ToUeVector(),
					this.CacheLocation.ToUeVector(),
					new UE.LinearColor(1, 0, 0, 1),
					15,
				),
				this.Gce?.SetForceSpeed(r),
				(this.ControllerPlayerId = n),
				this.Hte.SetActorLocationAndRotation(
					e.ToUeVector(),
					o.ToUeRotator(),
					"角色移动同步.添加简单位移",
					!1,
				),
				this.kHr?.SlideForward.DeepCopy(i),
				this.Gce.CharacterMovement.SetMovementMode(t),
				this.Mjr(a, o),
				this.Fuo.Reset(),
				(this.Fuo.Pitch = s),
				this.Hte.Actor.Controller?.SetControlRotation(this.Fuo.ToUeRotator()),
				this.OHr?.SetMoveSyncTimeScale(h);
			let m = 0;
			this.njr && (m = 1e3 * (this.njr.h4n - Time_1.Time.NowSeconds)),
				this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - l, m, c);
		}
		VectorToString(t) {
			return `[${t.X.toFixed()},${t.Y.toFixed()},${t.Z.toFixed()}]`;
		}
		MoveInfosToString(t) {
			var e = t[0],
				o = t[t.length - 1];
			return (
				`length:${t.length}, t:${e.h4n.toFixed(3)}-${o.h4n.toFixed(3)}, position:${this.VectorToString(e.$kn)}-${this.VectorToString(o.$kn)}, r:${e.D3n?.Yaw.toFixed()}-${o.D3n?.Yaw.toFixed()}, timeScale:` +
				o.Y9n
			);
		}
		MoveInfoToString(t) {
			return (
				`t:${t.h4n.toFixed(3)}, position:${this.VectorToString(t.$kn)}, timeScale:` +
				t.Y9n
			);
		}
		ReportMoveDataApplyInfo(t, e, o) {
			(o = {
				udp_mode:
					ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
				creature_id: this.SIe.GetCreatureDataId(),
				pb_data_id: this.SIe.GetPbDataId(),
				rtt: Net_1.Net.RttMs,
				rtt_total: Net_1.Net.RttMs + o,
				delay: t,
				buffer_time: e,
			}),
				(t = JSON.stringify(o)),
				CombatDebugController_1.CombatDebugController.DataReport(
					"MOVE_SYNC_INFO",
					t,
				);
		}
		ReportMoveDataDragDistance(t, e) {
			(e = {
				udp_mode:
					ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
				creature_id: this.SIe.GetCreatureDataId(),
				pb_data_id: this.SIe.GetPbDataId(),
				rtt: Net_1.Net.RttMs,
				to_self: e,
				distance: t,
			}),
				(t = JSON.stringify(e)),
				CombatDebugController_1.CombatDebugController.DataReport(
					"MOVE_SYNC_DRAG_DISTANCE",
					t,
				);
		}
		ReportMoveDataBufferMissTime(t) {
			(t = {
				udp_mode:
					ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
				creature_id: this.SIe.GetCreatureDataId(),
				pb_data_id: this.SIe.GetPbDataId(),
				rtt: Net_1.Net.RttMs,
				miss_time: t,
			}),
				(t = JSON.stringify(t)),
				CombatDebugController_1.CombatDebugController.DataReport(
					"MOVE_SYNC_BUFFER_MISS_TIME",
					t,
				);
		}
		ReportMoveDataInnerBufferMissTime(t) {
			(t = {
				udp_mode:
					ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
				creature_id: this.SIe.GetCreatureDataId(),
				pb_data_id: this.SIe.GetPbDataId(),
				rtt: Net_1.Net.RttMs,
				miss_time: t,
			}),
				(t = JSON.stringify(t)),
				CombatDebugController_1.CombatDebugController.DataReport(
					"MOVE_SYNC_INNER_BUFFER_MISS_TIME",
					t,
				);
		}
	});
(CharacterMovementSyncComponent.PendingMoveCacheTime = 0.08),
	(CharacterMovementSyncComponent.MaxPendingMoveCacheTime = 1),
	(CharacterMovementSyncComponent.SingleModeSendInterval = 1),
	(CharacterMovementSyncComponent.SingleModeSendLocationTolerance = 10),
	(CharacterMovementSyncComponent.SingleModeSendRotationTolerance = 5),
	(CharacterMovementSyncComponent = CharacterMovementSyncComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(57)],
			CharacterMovementSyncComponent,
		)),
	(exports.CharacterMovementSyncComponent = CharacterMovementSyncComponent);
