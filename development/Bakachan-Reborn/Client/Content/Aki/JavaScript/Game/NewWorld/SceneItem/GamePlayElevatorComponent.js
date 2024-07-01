"use strict";
var GamePlayElevatorComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var i,
				r = arguments.length,
				s =
					r < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, n, o);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(i = t[a]) &&
						(s = (r < 3 ? i(s) : 3 < r ? i(e, n, s) : i(e, n)) || s);
			return 3 < r && s && Object.defineProperty(e, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePlayElevatorComponent = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	TraceUtils_1 = require("../../Utils/TraceUtils"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	LogController_1 = require("../../World/Controller/LogController"),
	CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
	MIN_SPEED = 1,
	MTOCM = 100,
	NORMALIZE = 0.01,
	FOUR = 4,
	THOUSAND = 1e3,
	DELTATIMECHANGEVALUE = 10,
	NEGATIVEONE = -1,
	ACCELERATETIMERADIO = 1.5;
let GamePlayElevatorComponent = (GamePlayElevatorComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.DCo = void 0),
			(this.pun = void 0),
			(this.vun = void 0),
			(this.Mun = void 0),
			(this.Sun = void 0),
			(this.Eun = void 0),
			(this.cz = void 0),
			(this.kRe = void 0),
			(this.yun = void 0),
			(this.Iun = void 0),
			(this.Tun = void 0),
			(this.Lun = void 0),
			(this.Dun = -0),
			(this.Aun = void 0),
			(this.Uun = void 0),
			(this.Pun = -0),
			(this.ktn = void 0),
			(this.xun = void 0),
			(this.wun = -0),
			(this.Bun = -0),
			(this.bun = void 0),
			(this.qun = 1),
			(this.Gun = 1),
			(this.Nun = !1),
			(this.Oun = !1),
			(this.kun = !1),
			(this.Vun = !1),
			(this.Hun = !1),
			(this.jun = !1),
			(this.Wun = void 0),
			(this.Kun = void 0),
			(this.Qun = void 0),
			(this.xNi = void 0),
			(this.cjr = (t) => {
				this.Xun() ||
					(this.kun
						? this.$un(t)
						: !this.IsMove() ||
							(this.Oun && this.Yun()) ||
							(this.Jun(t), this.rzo(t), this.zun()));
			}),
			(this.Zun = () => {
				this.Uun = !1;
			}),
			(this.ecn = (t, e) => {
				var n;
				(e = e.Entity).GetComponent(140) &&
					((e = e.GetComponent(1)),
					(n = this.Kun.indexOf(e.Owner)),
					t
						? -1 === n && this.Kun.push(e.Owner)
						: -1 !== n && this.Kun.splice(n, 1),
					-1 !== (n = this.Wun.indexOf(e.Owner))) &&
					this.Wun.splice(n, 1);
			}),
			(this.tcn = (t) => {
				var e, n;
				this.IsMove() &&
					((n = void 0), (e = Global_1.Global.BaseCharacter)) &&
					(n = e.CharacterActorComponent.Entity.GetComponent(157)) &&
					(t
						? ((t = e.K2_GetActorLocation().Z),
							this.Entity.GetComponent(1)?.ActorLocationProxy.Z < t &&
								(n.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
									InstigatorId: n.CreatureDataId,
									Duration: this.icn(),
									Reason: "电梯添加buff",
								}),
								EventSystem_1.EventSystem.EmitWithTarget(
									n.Entity,
									EventDefine_1.EEventName.ElevatorMove,
								)))
						: n.RemoveBuff(
								CharacterBuffIds_1.buffId.ElevatorBuff,
								-1,
								"电梯移除buff",
							));
			}),
			(this.ocn = (t, e) => {
				var n = ActorUtils_1.ActorUtils.GetEntityByActor(e);
				n &&
					n.Entity.GetComponent(140) &&
					-1 === this.Wun.indexOf(e) &&
					(this.IsMove() && -1 !== this.Kun.indexOf(e) && this.rcn(e),
					this.Wun.push(e));
			}),
			(this.OnSceneInteractionLoadCompleted = () => {
				var t = this.Entity.GetComponent(182);
				t =
					SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
						t.GetSceneInteractionLevelHandleId(),
					);
				(this.Qun = t?.GetComponentByClass(
					UE.PrimitiveComponent.StaticClass(),
				)),
					this.Qun &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Temp", 32, "111", [
								"111",
								this.Qun.GetCollisionProfileName().toString(),
							]),
						t.OnActorHit.Add(this.ocn),
						this.Qun.SetNotifyRigidBodyCollision(!0));
			});
	}
	get CurLiftFloor() {
		return this.qun;
	}
	OnInitData(t) {
		if (!(t = t.GetParam(GamePlayElevatorComponent_1)[0]))
			throw Error("创建GamePlayElevatorComponent缺少配置参数");
		(this.Sun = t.UniformMovement),
			(this.Eun = t.TurnTime),
			(this.cz = Vector_1.Vector.Create(0, 0, 0)),
			(this.yun = Vector_1.Vector.Create(0, 0, 0)),
			(this.Lun = t.MaxSpeed),
			(this.vun = Vector_1.Vector.Create(0, 0, 0)),
			(this.Mun = Vector_1.Vector.Create(0, 0, 0)),
			(this.kRe = Vector_1.Vector.Create(0, 0, 0)),
			(this.Tun = Vector_1.Vector.Create(0, 0, 0)),
			(this.Iun = Vector_1.Vector.Create(0, 0, 0)),
			(this.Wun = []),
			(this.Kun = []);
		var e = this.Entity.GetComponent(0),
			n = e.GetInitLocation(),
			o = n.X || 0,
			i = n.Y || 0,
			r = n.Z || 0;
		if (((this.bun = []), t.StayPositions))
			for (const e of t.StayPositions)
				this.bun.push(
					Vector_1.Vector.Create(
						e.X ? o + e.X : o,
						e.Y ? i + e.Y : i,
						e.Z ? r + e.Z : r,
					),
				);
		return (
			(this.qun = e.LiftFloor ?? 1),
			(this.Gun = 0),
			(this.DCo = Vector_1.Vector.Create(0, 0, 0)),
			(this.pun = Vector_1.Vector.Create(0, 0, 0)),
			(this.Nun = !1),
			(this.Oun = !1),
			(this.kun = !1),
			(this.Vun = void 0 !== t.AutoConfig),
			(this.Hun = t.AutoConfig?.IsCircle ?? !1),
			(this.jun = !1),
			(this.Bun = t.AutoConfig?.Interval ?? 0),
			(this.wun = 0),
			t.SafePoint &&
				(this.Aun = Vector_1.Vector.Create(
					t.SafePoint.X ?? 0,
					t.SafePoint.Y ?? 0,
					t.SafePoint.Z ?? 0,
				)),
			!0
		);
	}
	OnStart() {
		return (
			this.WVo(),
			(this.ktn = this.Entity.GetComponent(74)),
			this.ktn &&
				(this.ktn.AddOnPlayerOverlapCallback(this.tcn),
				this.ktn.AddOnEntityOverlapCallback(this.ecn)),
			(this.xun = this.Entity.GetComponent(115)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				this.OnSceneInteractionLoadCompleted,
			),
			!0
		);
	}
	OnClear() {
		return (
			this.ktn &&
				(this.ktn.RemoveOnPlayerOverlapCallback(this.tcn),
				this.ktn.RemoveOnEntityOverlapCallback(this.ecn)),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				this.OnSceneInteractionLoadCompleted,
			),
			void 0 !== this.xNi && TimerSystem_1.TimerSystem.Remove(this.xNi),
			!0
		);
	}
	OnForceTick(t) {
		this.cjr(t);
	}
	Jun(t) {
		this.Sun ? this.ncn() : this.scn();
	}
	acn(t, e) {
		if (!this.Xun() && !this.Uun) {
			this.Uun = !0;
			let n = Protocol_1.Aki.Protocol.rks.Proto_End;
			e &&
				(n =
					this.Gun > this.qun
						? Protocol_1.Aki.Protocol.rks.BFn
						: Protocol_1.Aki.Protocol.rks.Proto_Reverse),
				LevelGamePlayController_1.LevelGamePlayController.ElevatorStateChangeRequest(
					this.Entity.Id,
					t,
					n,
					this.Zun,
				);
		}
	}
	zun() {
		var t = this.pun,
			e = this.Entity.GetComponent(1).ActorLocationProxy;
		t.Subtraction(e, this.cz),
			this.cz.MultiplyEqual(this.yun),
			(0 <= this.cz.X && 0 <= this.cz.Y && 0 <= this.cz.Z) || this.hcn();
	}
	hcn() {
		var t = this.pun,
			e = this.Entity.GetComponent(1);
		this.Iun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			this.Tun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			e.SetActorLocation(t.ToUeVector()),
			(this.Pun = 0),
			(this.Oun = !1),
			(this.Nun = !1),
			this.acn(this.Gun, !1),
			(this.qun = this.Gun),
			(this.Gun = 0),
			this.lcn(),
			this.Vun && (this.kun = !0),
			(this.xun.IsMoving = !1);
	}
	rzo(t) {
		(!this.Pun || Math.abs(t - this.Pun) > 10) && (this.Pun = t);
		t = this.Entity.GetComponent(1);
		var e = this.Pun * MathUtils_1.MathUtils.MillisecondToSecond,
			n =
				(this.cz.DeepCopy(this.Tun),
				this.cz.MultiplyEqual(e),
				this.Iun.Addition(this.cz, this.kRe),
				this.kRe);
		this.Mun.SizeSquared() > n.SizeSquared() || n.DotProduct(this.Iun) < 0
			? this.Iun.DeepCopy(this.Mun)
			: this.vun.SizeSquared() < n.SizeSquared()
				? this.Iun.DeepCopy(this.vun)
				: this.Iun.AdditionEqual(this.cz),
			this.cz.DeepCopy(this.Iun),
			this.cz.MultiplyEqual(e),
			this.kRe.DeepCopy(t.ActorLocationProxy),
			this.kRe.AdditionEqual(this.cz),
			t.SetActorLocation(this.kRe.ToUeVector());
	}
	$un(t) {
		(this.wun += t * MathUtils_1.MathUtils.MillisecondToSecond),
			this.wun > this.Bun &&
				((this.wun = 0),
				(this.kun = !1),
				(t = this._cn()),
				this.SetTargetFloor(t));
	}
	ncn() {}
	scn() {
		var t = this.DCo,
			e = this.pun,
			n = this.Entity.GetComponent(1).ActorLocationProxy,
			o = this.Dun;
		const i = Vector_1.Vector.DistSquared(n, t);
		t = MathUtils_1.MathUtils.Bisection((t) => t * t > i, 0, i, 1);
		const r = Vector_1.Vector.DistSquared(n, e);
		(n = MathUtils_1.MathUtils.Bisection((t) => t * t > r, 0, r, 1)),
			0 !== this.Tun.SizeSquared() &&
				t > (1 / 4) * o &&
				n > (1 / 4) * o &&
				this.Tun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			0 === this.Tun.SizeSquared() &&
				n < (1 / 4) * o &&
				this.Tun.DeepCopy(this.ucn().MultiplyEqual(-1));
	}
	ccn() {
		return (
			this.pun.Subtraction(this.DCo, this.cz),
			this.cz.Normalize(0.01),
			this.cz.MultiplyEqual(100 * this.Lun),
			this.cz
		);
	}
	ucn() {
		var t = this.DCo;
		this.pun.Subtraction(t, this.cz), (t = this.cz.Size());
		return (
			this.cz.Normalize(0.01),
			this.cz.MultiplyEqual((100 * this.Lun * this.Lun * 100 * 2) / t),
			this.cz
		);
	}
	IsMove() {
		return !(!this.Nun && !this.Oun);
	}
	WVo() {
		var t;
		this.Vun && ((t = this._cn()), this.SetTargetFloor(t));
	}
	SetTargetFloor(t) {
		var e, n;
		t < 1 || t > this.bun.length || this.qun === t
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneItem", 36, "SetTargetFloor Wrong Floor", [
					"targetFloor",
					t,
				])
			: 0 !== this.Gun
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("SceneItem", 36, "Elevator Running")
				: ((this.Gun = t),
					this.lcn(),
					this.Vun && this.acn(t, !0),
					this.Vun ||
						((e = Global_1.Global.BaseCharacter) &&
							((e = e.CharacterActorComponent.ActorLocationProxy),
							((n = new LogReportDefine_1.ElevatorUsedRecord()).i_config_id =
								this.Entity.GetComponent(0)?.GetPbDataId().toString() ?? ""),
							(n.i_area_id =
								ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId.toString()),
							(n.i_state_id = t.toString()),
							(n.f_player_pos_x = e.X.toFixed(2)),
							(n.f_player_pos_y = e.Y.toFixed(2)),
							(n.f_player_pos_z = e.Z.toFixed(2)),
							LogController_1.LogController.LogElevatorUsedPush(n))));
	}
	lcn() {
		if (!this.Xun()) {
			let e;
			var t = Global_1.Global.BaseCharacter;
			if (
				(t && (e = (t = t.CharacterActorComponent.Entity).GetComponent(157)),
				0 === this.Gun)
			) {
				if (
					(this.mcn() &&
						e &&
						e.RemoveBuff(
							CharacterBuffIds_1.buffId.ElevatorBuff,
							-1,
							"电梯移除buff",
						),
					0 < this.Wun.length)
				)
					for (const t of this.Wun)
						TimerSystem_1.TimerSystem.Next(() => {
							this.dcn(t);
						});
				GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
					?.GetCurrentQualityInfo()
					?.ApplyMotionBlur();
			} else if (
				(UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlur.Amount 0",
				),
				this.Ccn(),
				this.Eun
					? (this.xNi = TimerSystem_1.TimerSystem.Delay((t) => {
							this.gcn(), (this.xNi = void 0);
						}, 1e3 * this.Eun))
					: this.gcn(),
				this.mcn() &&
					e &&
					(e.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
						InstigatorId: e.CreatureDataId,
						Duration: this.icn() + this.Eun ?? 0,
						Reason: "电梯添加buff",
					}),
					EventSystem_1.EventSystem.EmitWithTarget(
						e.Entity,
						EventDefine_1.EEventName.ElevatorMove,
					)),
				0 < this.Wun.length)
			)
				for (const t of this.Wun) -1 !== this.Kun.indexOf(t) && this.rcn(t);
		}
	}
	Ccn() {
		this.DCo.DeepCopy(this.bun[this.qun - 1]),
			this.pun.DeepCopy(this.bun[this.Gun - 1]),
			this.pun.Subtraction(this.DCo, this.yun),
			(this.Dun = this.yun.Size()),
			this.cz.DeepCopy(this.yun),
			this.cz.Normalize(0.01),
			this.cz.Multiply(100 * this.Lun, this.vun),
			this.cz.Multiply(100, this.Mun);
	}
	gcn() {
		this.Sun ? this.Iun.DeepCopy(this.ccn()) : this.Tun.DeepCopy(this.ucn()),
			(this.Oun = this.qun > this.Gun),
			(this.Nun = this.qun < this.Gun),
			(this.xun.IsMoving = !0);
	}
	Xun() {
		return this.Entity.GetComponent(177).HasTag(-662723379);
	}
	Yun() {
		if (!this.ktn) return !1;
		var t,
			e,
			n,
			o,
			i = this.ktn.GetEntitiesInRangeLocal();
		if (!i) return !1;
		let r = !1;
		for (const s of i.values())
			s?.Valid &&
				s.Entity !== this.Entity &&
				((t = s.Entity.GetComponent(1)?.ActorLocationProxy),
				(e = s.Entity.GetComponent(1)?.HasMesh()),
				(n =
					void 0 !== (n = s.Entity.GetComponent(0)?.GetSummonerId()) &&
					0 !== n),
				(o = this.Entity.GetComponent(1)?.ActorLocationProxy),
				e) &&
				t &&
				t.Z < o.Z - 100 &&
				!n &&
				(s.Entity ===
					Global_1.Global.BaseCharacter.CharacterActorComponent.Entity &&
					s.Entity.GetComponent(55)?.StopManipualte(),
				this.fcn(s.Entity),
				(r = !0));
		return r;
	}
	fcn(t) {
		var e = t.GetComponent(1)?.ActorLocationProxy,
			n = this.Entity.GetComponent(1).ActorLocationProxy;
		if (e && n)
			if (this.Aun) {
				const e = t.GetComponent(1);
				var o,
					i = e.GetRadius(),
					r =
						((i = Vector_1.Vector.Create(
							n.X + this.Aun.X,
							n.Y + this.Aun.Y,
							n.Z + this.Aun.Z + i,
						)),
						t.GetComponent(3));
				r
					? ((o = e.DisableCollision(
							"[GamePlayElevatorComponent.SetEntitySafePos]",
						)),
						r.TeleportAndFindStandLocation(i),
						e.EnableCollision(o))
					: e.SetActorLocation(i.ToUeVector(), this.constructor.name, !1);
			} else {
				n.Subtraction(e, this.cz), (this.cz.Z = 0);
				const o = t.GetComponent(1);
				for (let n = 0; n <= 3; n++) {
					(this.kRe.X = e.X + this.cz.X * (n / 3)),
						(this.kRe.Y = e.Y + this.cz.Y * (n / 3)),
						(this.kRe.Z = e.Z);
					var [s, a] = TraceUtils_1.TraceUtils.LineTraceWithLocation(
						this.kRe,
						2e3,
						0,
					);
					if (s && !a.bStartPenetrating) {
						var h,
							a,
							s =
								ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
						a =
							(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(a, 0, s),
							o.GetRadius());
						(a = ((s.Z += a), t.GetComponent(3)))
							? ((h = o.DisableCollision(
									"[GamePlayElevatorComponent.SetEntitySafePos]",
								)),
								a.TeleportAndFindStandLocation(s),
								o.EnableCollision(h))
							: ((a = t.GetComponent(140)) && a.TryEnableTick(!0),
								o.SetActorLocation(s.ToUeVector(), this.constructor.name, !1));
						break;
					}
				}
			}
	}
	mcn() {
		if (!this.ktn) return !1;
		var t = this.ktn.GetEntitiesInRangeLocal();
		if (!t) return !1;
		let e = -1;
		var n = Global_1.Global.BaseCharacter;
		return n && (e = n.CharacterActorComponent.Entity.Id), t.has(e);
	}
	icn() {
		this.DCo.Subtraction(this.pun, this.cz);
		var t = this.cz.Size();
		if (this.Sun) {
			const e = t / 100 / this.Lun;
			return e > 1e3 ? 1e3 : e;
		}
		const e = (1.5 * t) / 100 / this.Lun;
		return e > 1e3 ? 1e3 : e;
	}
	_cn() {
		let t = this.jun ? this.qun - 1 : this.qun + 1;
		return this.Hun
			? (t = t > this.bun.length ? 1 : t)
			: (t > this.bun.length
					? ((t = this.bun.length - 1), (this.jun = !0))
					: t < 1 && ((t = 2), (this.jun = !1)),
				t);
	}
	rcn(t) {
		var e = ActorUtils_1.ActorUtils.GetEntityByActor(t);
		e &&
			(e = e.Entity.GetComponent(140)) &&
			(e.TryDisableTick("[GamePlayElevator.AttachToElevator] 上电梯关闭Tick"),
			(e = this.Entity.GetComponent(182)),
			ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
				t,
				e.Owner,
				2,
				"GamePlayElevatorComponent.AttachToElevator",
				void 0,
				1,
				1,
				1,
				!1,
			));
	}
	dcn(t) {
		ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
			t,
			!1,
			"GamePlayElevatorComponent.DetachFromElevator",
			1,
			1,
			1,
		),
			(t = ActorUtils_1.ActorUtils.GetEntityByActor(t)) &&
				(t = t.Entity.GetComponent(140)) &&
				t.TryEnableTick(!0);
	}
	OnActivate() {
		!Info_1.Info.EnableForceTick &&
			this.Active &&
			ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
				this,
				this.cjr,
			);
	}
	OnEnable() {
		!Info_1.Info.EnableForceTick &&
			this.Entity?.IsInit &&
			ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
				this,
				this.cjr,
			);
	}
	OnEnd() {
		return (
			Info_1.Info.EnableForceTick ||
				ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
					this.cjr,
				),
			!0
		);
	}
	OnDisable(t) {
		Info_1.Info.EnableForceTick ||
			ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
				this.cjr,
			);
	}
});
(GamePlayElevatorComponent = GamePlayElevatorComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(123)],
		GamePlayElevatorComponent,
	)),
	(exports.GamePlayElevatorComponent = GamePlayElevatorComponent);
