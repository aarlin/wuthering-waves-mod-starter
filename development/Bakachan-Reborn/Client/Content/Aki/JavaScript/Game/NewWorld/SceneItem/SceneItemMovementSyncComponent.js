"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, n);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, o, s) : i(t, o)) || s);
		return 3 < r && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemMovementSyncComponent = void 0);
const Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../Core/Net/Net"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	CharacterMovementSyncComponent_1 = require("../Character/Common/Component/CharacterMovementSyncComponent");
class ReplaySample {
	constructor(e, t, o) {
		(this.Location = void 0),
			(this.Rotation = void 0),
			(this.LinearVelocity = void 0),
			(this.Time = -0),
			(this.ControllerPlayerId = 0),
			(this.Location = Vector_1.Vector.Create(e.$kn.X, e.$kn.Y, e.$kn.Z)),
			(this.Rotation = Rotator_1.Rotator.Create(
				e.D3n.Pitch,
				e.D3n.Yaw,
				e.D3n.Roll,
			)),
			(this.Time = o),
			(this.ControllerPlayerId = t);
	}
}
let SceneItemMovementSyncComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.fjr = void 0),
			(this.Hte = void 0),
			(this.SIe = void 0),
			(this.Info = void 0),
			(this.Svn = void 0),
			(this.LastSyncLocation = void 0),
			(this.LastSyncRotation = void 0),
			(this.Evn = !1),
			(this.ojr = !1),
			(this.LastMove = !1),
			(this.rjr = 0),
			(this.LastSendTime = 0),
			(this.LastMoveSample = void 0),
			(this.yvn = []),
			(this.Xrr = Vector_1.Vector.Create()),
			(this.ijr = Rotator_1.Rotator.Create()),
			(this.ejr = Vector_1.Vector.Create()),
			(this.tjr = Rotator_1.Rotator.Create()),
			(this.KCe = Vector_1.Vector.Create()),
			(this.Fuo = Rotator_1.Rotator.Create()),
			(this.Uxr = void 0),
			(this.DisableTick = !1),
			(this.$9r = () => {
				if (this.fjr && this.Hte.IsMoveAutonomousProxy) {
					var e =
						!this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
						!this.ijr.Equals(this.Hte.ActorRotationProxy);
					if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
						if (!this.ojr) {
							if (!e) return void this.pjr(e);
							(this.ojr = !0),
								(this.rjr = Time_1.Time.NowSeconds),
								(this.yvn.length = 0);
						}
						const o = this.Ivn();
						this.yvn.push(o),
							((t = new ReplaySample(
								o,
								ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
								Time_1.Time.NowSeconds,
							)).Time = Time_1.Time.NowSeconds),
							(this.LastMoveSample = t),
							(Time_1.Time.NowSeconds >=
								this.rjr +
									CharacterMovementSyncComponent_1
										.CharacterMovementSyncComponent.PendingMoveCacheTime ||
								!e) &&
								this.SendPendingMoveInfos(e);
					} else {
						var t =
								Time_1.Time.NowSeconds - this.LastSendTime >=
								CharacterMovementSyncComponent_1.CharacterMovementSyncComponent
									.SingleModeSendInterval,
							o =
								!this.ejr.Equals(
									this.Hte.ActorLocationProxy,
									CharacterMovementSyncComponent_1
										.CharacterMovementSyncComponent
										.SingleModeSendLocationTolerance,
								) ||
								!this.tjr.Equals(
									this.Hte.ActorRotationProxy,
									CharacterMovementSyncComponent_1
										.CharacterMovementSyncComponent
										.SingleModeSendRotationTolerance,
								);
						if ((e && t && o) || (!e && this.LastMove)) {
							const t = this.Ivn();
							this.yvn.push(t), this.SendPendingMoveInfos(e);
						}
					}
					this.pjr(e);
				} else this.pjr();
			}),
			(this.cjr = () => {
				this.Tvn(),
					this.Hte.IsMoveAutonomousProxy ||
						(this.fjr && ((this.ojr = !1), (this.yvn.length = 0), this.Lvn()));
			}),
			(this.Dvn = []);
	}
	Ivn() {
		var e = Protocol_1.Aki.Protocol.hOs.create();
		return (
			(e.$kn = Protocol_1.Aki.Protocol.VBs.create()),
			(e.D3n = Protocol_1.Aki.Protocol.iws.create()),
			this.Rvn(this.Hte.ActorLocationProxy, e.$kn),
			this.X4r(this.Hte.ActorRotationProxy, e.D3n),
			(e.h4n = Time_1.Time.NowSeconds),
			e
		);
	}
	pjr(e = !1) {
		this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
			this.ijr.DeepCopy(this.Hte.ActorRotationProxy),
			(this.LastMove = e);
	}
	SendPendingMoveInfos(e = !1) {
		let t = 0;
		for (const e of this.yvn) {
			if (
				Time_1.Time.NowSeconds <
				e.h4n +
					CharacterMovementSyncComponent_1.CharacterMovementSyncComponent
						.MaxPendingMoveCacheTime
			)
				break;
			t++;
		}
		var o;
		0 < t && this.yvn.splice(0, t),
			0 < this.yvn.length &&
				(((o = Protocol_1.Aki.Protocol.els.create()).m4n = this.yvn),
				(o.r4n = CombatMessage_1.CombatNet.CreateCombatCommon(this.Entity)),
				Net_1.Net.Send(26540, o),
				(o = this.yvn[this.yvn.length - 1]),
				(this.ejr.X = o.$kn.X),
				(this.ejr.Y = o.$kn.Y),
				(this.ejr.Z = o.$kn.Z),
				(this.tjr.Roll = o.D3n.Roll),
				(this.tjr.Pitch = o.D3n.Pitch),
				(this.tjr.Yaw = o.D3n.Yaw)),
			e ? (this.rjr = Time_1.Time.NowSeconds) : (this.ojr = !1),
			(this.LastSendTime = Time_1.Time.NowSeconds),
			(this.yvn.length = 0);
	}
	OnForceAfterTick() {
		this.$9r();
	}
	ForceSendPendingMoveInfos() {
		var e =
				!this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
				!this.ijr.Equals(this.Hte.ActorRotationProxy),
			t = this.Ivn();
		((t =
			(this.yvn.push(t),
			new ReplaySample(
				t,
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
				Time_1.Time.NowSeconds,
			))).Time = Time_1.Time.NowSeconds),
			(this.LastMoveSample = t),
			this.SendPendingMoveInfos(e);
	}
	OnInit() {
		return (
			(this.fjr = !0),
			(this.LastSyncLocation = Vector_1.Vector.Create()),
			(this.LastSyncRotation = Rotator_1.Rotator.Create()),
			!0
		);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(1)),
			(this.SIe = this.Entity.GetComponent(0)),
			(this.Info = Protocol_1.Aki.Protocol.hOs.create()),
			(this.Info.$kn = Protocol_1.Aki.Protocol.VBs.create()),
			(this.Info.D3n = Protocol_1.Aki.Protocol.iws.create()),
			(this.Info.A3n = Protocol_1.Aki.Protocol.VBs.create()),
			!0
		);
	}
	OnActivate() {
		this.LastMoveSample && Time_1.Time.NowSeconds > this.LastMoveSample.Time
			? (this.Hte.SetActorLocationAndRotation(
					this.LastMoveSample.Location.ToUeVector(),
					this.LastMoveSample.Rotation.ToUeRotator(),
				),
				this.Xrr.DeepCopy(this.LastMoveSample.Location),
				this.ijr.DeepCopy(this.LastMoveSample.Rotation))
			: (this.Xrr.DeepCopy(this.Hte.Owner.K2_GetActorLocation()),
				this.ijr.DeepCopy(this.Hte.Owner.K2_GetActorRotation())),
			this.Hte.SetAutonomous(
				this.SIe.GetPlayerId() ===
					ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			),
			Info_1.Info.EnableForceTick ||
				this.DisableTick ||
				(ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.cjr,
				),
				ComponentForceTickController_1.ComponentForceTickController.RegisterAfterTick(
					this,
					this.$9r,
				));
	}
	OnForceTick(e) {
		this.cjr();
	}
	OnEnable() {
		!Info_1.Info.EnableForceTick &&
			this.Entity?.IsInit &&
			(ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
				this,
				this.cjr,
			),
			ComponentForceTickController_1.ComponentForceTickController.RegisterAfterTick(
				this,
				this.$9r,
			));
	}
	OnDisable(e) {
		Info_1.Info.EnableForceTick ||
			(ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
				this,
			),
			ComponentForceTickController_1.ComponentForceTickController.UnregisterAfterTick(
				this,
			));
	}
	OnEnd() {
		return (
			Info_1.Info.EnableForceTick ||
				(ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
					this,
				),
				ComponentForceTickController_1.ComponentForceTickController.UnregisterAfterTick(
					this,
				)),
			!0
		);
	}
	GetEnableMovementSync() {
		return this.fjr;
	}
	SetEnableMovementSync(e) {
		(this.fjr = e),
			(e = this.Ivn()),
			this.yvn.push(e),
			this.SendPendingMoveInfos();
	}
	ReceiveServerItemMoveData(e) {
		this.syt(e.$kn, this.Hte.ActorLocation),
			this.Avn(e.D3n, this.Hte.ActorRotation),
			this.Evn && this.syt(e.A3n, this.Svn);
	}
	ReceiveServerItemMoveSample(e) {
		this.syt(e.$kn, this.Hte.ActorLocation),
			this.Avn(e.D3n, this.Hte.ActorRotation),
			this.Evn && this.syt(e.A3n, this.Svn);
	}
	Rvn(e, t) {
		(t.X = e.X), (t.Y = e.Y), (t.Z = e.Z);
	}
	syt(e, t) {
		(t.X = e.X), (t.Y = e.Y), (t.Z = e.Z);
	}
	X4r(e, t) {
		(t.Pitch = e.Pitch), (t.Yaw = e.Yaw), (t.Roll = e.Roll);
	}
	Avn(e, t) {
		(t.Pitch = e.Pitch), (t.Yaw = e.Yaw), (t.Roll = e.Roll);
	}
	AddReplaySample(e) {
		this.Dvn.push(e);
	}
	ClearReplaySamples() {
		this.Dvn.length = 0;
		var e = this.Ivn();
		((e = new ReplaySample(
			e,
			ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			Time_1.Time.NowSeconds,
		)).Time = Time_1.Time.NowSeconds),
			this.AddReplaySample(e);
	}
	Tvn() {
		var e = Time_1.Time.NowSeconds;
		let t = 0;
		for (const o of this.Dvn) {
			if (o.Time > e - 1) break;
			t++;
		}
		0 < t && this.Dvn.splice(0, t);
	}
	Lvn() {
		var e = Time_1.Time.NowSeconds;
		if (this.LastMoveSample && e >= this.LastMoveSample.Time)
			CombatDebugController_1.CombatDebugController.CombatDebugEx(
				"Move",
				this.Entity,
				"执行移动包",
				["t", this.LastMoveSample.Time],
			),
				this.Hte.SetActorLocationAndRotation(
					this.LastMoveSample.Location.ToUeVector(),
					this.LastMoveSample.Rotation.ToUeRotator(),
				);
		else
			for (let i = 0; i < this.Dvn.length - 1; i++) {
				var t,
					o = this.Dvn[i],
					n = this.Dvn[i + 1];
				e >= o.Time &&
					e <= n.Time &&
					((t =
						(t = n.Time - o.Time) > MathUtils_1.MathUtils.KindaSmallNumber
							? MathUtils_1.MathUtils.Clamp((e - o.Time) / t, 0, 1)
							: 1),
					Vector_1.Vector.Lerp(o.Location, n.Location, t, this.KCe),
					Rotator_1.Rotator.Lerp(o.Rotation, n.Rotation, t, this.Fuo),
					this.Hte.SetActorLocationAndRotation(
						this.KCe.ToUeVector(),
						this.Fuo.ToUeRotator(),
					));
			}
	}
	ReceiveMoveInfos(e, t) {
		if (0 !== e.length) {
			var o =
				ModelManager_1.ModelManager.CombatMessageModel.GetMessageBufferByEntityId(
					this.Entity.Id,
				);
			if (o) {
				Time_1.Time.NowSeconds > e[0].h4n + o.TimelineOffset &&
					((n = Time_1.Time.NowSeconds - e[0].h4n - o.TimelineOffset),
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Move",
						this.Entity,
						"移动缓冲不足",
						["missTime", n],
						["combatCommon", t.h4n],
					));
				var n,
					i = MathUtils_1.MathUtils.LongToNumber(t.a4n);
				for (const t of e) {
					t.h4n <= 0 &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"MultiplayerCombat",
							15,
							"[SceneItemMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0",
							["TimeStamp", t.h4n],
						);
					var r = new ReplaySample(t, i, t.h4n + o.TimelineOffset);
					this.AddReplaySample(r), (this.LastMoveSample = r);
				}
			}
		}
	}
	TryEnable() {
		void 0 !== this.Uxr &&
			(this.Enable(this.Uxr, "SceneItemMovementSyncComponent.TryEnable"),
			(this.Uxr = void 0),
			(this.DisableTick = !1));
	}
	TryDisable(e) {
		void 0 === this.Uxr &&
			((this.Uxr = this.Disable(e)),
			(this.DisableTick = !0),
			this.Hte &&
			!this.Hte?.IsMoveAutonomousProxy &&
			this.fjr &&
			this.LastMoveSample
				? this.Hte.SetActorLocationAndRotation(
						this.LastMoveSample.Location.ToUeVector(),
						this.LastMoveSample.Rotation.ToUeRotator(),
					)
				: this.Hte &&
					this.Hte?.IsMoveAutonomousProxy &&
					this.fjr &&
					this.ForceSendPendingMoveInfos());
	}
};
(SceneItemMovementSyncComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(142)],
	SceneItemMovementSyncComponent,
)),
	(exports.SceneItemMovementSyncComponent = SceneItemMovementSyncComponent);
