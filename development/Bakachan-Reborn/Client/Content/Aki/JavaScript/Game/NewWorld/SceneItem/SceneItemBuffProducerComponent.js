"use strict";
var SceneItemBuffProducerComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, n) {
			var r,
				i = arguments.length,
				s =
					i < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, o, n);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(r = t[a]) &&
						(s = (i < 3 ? r(s) : 3 < i ? r(e, o, s) : r(e, o)) || s);
			return 3 < i && s && Object.defineProperty(e, o, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemBuffProducerComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	BulletController_1 = require("../Bullet/BulletController"),
	SceneItemBuffController_1 = require("./Controller/SceneItemBuffController"),
	DISTANCE_THRESHOLD = 100,
	NORMALIZE = 0.01,
	SPEED = 600,
	MAX_BULLET_HIT_TIME = 5e3;
let SceneItemBuffProducerComponent =
	(SceneItemBuffProducerComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Mne = 0),
				(this.Hte = void 0),
				(this.zsn = void 0),
				(this.mBe = void 0),
				(this.ktn = void 0),
				(this.Bdn = !1),
				(this.bdn = !1),
				(this.qdn = 1),
				(this.i_n = !0),
				(this.vbr = !1),
				(this.mvr = !1),
				(this.MHr = BigInt(0)),
				(this.Lo = void 0),
				(this.jDn = void 0),
				(this.Gdn = (t) => {
					(this.i_n = t), this.mvr && 2 === this.qdn && !this.i_n && this.Ndn();
				}),
				(this.G_n = () => {
					if (this.mvr)
						switch (((this.qdn = this.mBe.State), this.mBe.State)) {
							case 2:
								this.wdn() || (this.Bdn = !0);
								break;
							case 1:
								this.Ndn();
						}
				}),
				(this.Adn = (t, e) => {
					this.bdn = !1;
				}),
				(this.nCt = void 0),
				(this.U7o = void 0),
				(this.Odn = void 0),
				(this.Tdn = ""),
				(this.kdn = void 0),
				(this.TDe = void 0),
				(this.lHo = (t, e) => {
					var o = Global_1.Global.BaseCharacter;
					o &&
						((o = o.CharacterActorComponent.Entity), t.Target === o) &&
						(this.TDe &&
							(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
						EventSystem_1.EventSystem.RemoveWithTarget(
							this.kdn,
							EventDefine_1.EEventName.BulletHit,
							this.lHo,
						),
						(this.kdn = void 0),
						this.Pdn());
				}),
				(this.xdn = () => {
					EventSystem_1.EventSystem.HasWithTarget(
						this,
						EventDefine_1.EEventName.BulletHit,
						this.lHo,
					) &&
						EventSystem_1.EventSystem.RemoveWithTarget(
							this,
							EventDefine_1.EEventName.BulletHit,
							this.lHo,
						),
						(this.TDe = void 0),
						(this.kdn = void 0),
						this.Pdn();
				});
		}
		OnInitData(t) {
			var e = t.GetParam(SceneItemBuffProducerComponent_1)[0];
			switch (
				((this.Lo = e), (this.MHr = BigInt(e.BuffId)), e.AddBuffMode.Type)
			) {
				case "Adsorb":
					(this.nCt = Vector_1.Vector.Create()),
						(this.U7o = Vector_1.Vector.Create());
					break;
				case "Immediate":
					break;
				case "FireBullet":
					(this.Tdn = e.AddBuffMode.BulletId.toString()),
						(this.Odn = Vector_1.Vector.Create(
							e.AddBuffMode.BulletOffset.X ?? 0,
							e.AddBuffMode.BulletOffset.Y ?? 0,
							e.AddBuffMode.BulletOffset.Z ?? 0,
						));
			}
			return (
				(t = this.Entity.GetComponent(0)?.ComponentDataMap.get("Ips")),
				(this.jDn = MathUtils_1.MathUtils.LongToBigInt(t?.Ips?.S4n)),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				this.Hte
					? ((this.Mne = this.Hte.CreatureData.GetPbDataId()),
						(this.zsn = this.Entity.GetComponent(177)),
						this.zsn
							? ((this.mBe = this.Entity.GetComponent(117)),
								this.mBe
									? ((this.i_n = !0),
										(this.mvr = !0),
										ModelManager_1.ModelManager.GameModeModel.IsMulti &&
										ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
											ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
											? !(this.mvr = !1)
											: ((this.ktn = this.Entity.GetComponent(74)),
												this.ktn &&
													((this.i_n = !1),
													this.ktn.AddOnPlayerOverlapCallback(this.Gdn)),
												(this.qdn = this.mBe.State),
												this.Ore(),
												!0))
									: (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"SceneGameplay",
												40,
												"[BuffProducerComp] 组件初始化失败 实体缺少SceneItemStateComponent",
												[
													"CreatureDataId",
													this.Hte.CreatureData.GetCreatureDataId(),
												],
												["PbDataId", this.Mne],
												["PlayerId", this.Hte.CreatureData.GetPlayerId()],
											),
										!1))
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"SceneGameplay",
										30,
										"[BuffProducerComp] 组件初始化失败 实体缺少LevelTagComponent",
										[
											"CreatureDataId",
											this.Hte.CreatureData.GetCreatureDataId(),
										],
										["PbDataId", this.Mne],
										["PlayerId", this.Hte.CreatureData.GetPlayerId()],
									),
								!1))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneGameplay",
								30,
								"[BuffProducerComp] 组件初始化失败 Actor Component Undefined",
							),
						!1)
			);
		}
		OnActivate() {
			this.mBe.IsInState(0) || this.G_n();
		}
		OnTick(t) {
			this.mvr &&
				2 === this.qdn &&
				(this.Bdn ? this.Fdn(t) : this.i_n || this.Ndn());
		}
		OnEnd() {
			return (
				this.ktn && this.ktn.RemoveOnPlayerOverlapCallback(this.Gdn),
				this.kre(),
				!0
			);
		}
		Ore() {
			this.vbr ||
				(EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.G_n,
				),
				(this.vbr = !0));
		}
		kre() {
			this.vbr &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.G_n,
				),
				(this.vbr = !1));
		}
		Fdn(t) {
			switch (this.Lo?.AddBuffMode.Type) {
				case "Adsorb":
					this.Vdn(t);
					break;
				case "Immediate":
					this.Pdn();
					break;
				case "FireBullet":
					this.szo(t);
			}
		}
		Pdn() {
			(this.Bdn = !1), this.Hdn();
		}
		wdn() {
			if (!(t = Global_1.Global.BaseCharacter)) return !1;
			var t,
				e = (t = t.CharacterActorComponent.Entity).CheckGetComponent(157);
			if (!e) return !1;
			let o = 0 < e.GetBuffTotalStackById(this.MHr);
			return (
				(e = t.CheckGetComponent(171)) &&
					(o ||=
						0 <
						(e.GetFormationBuffComp()?.GetBuffTotalStackById(this.MHr) ?? 0)),
				o
			);
		}
		Ndn() {
			!this.bdn &&
				this.wdn() &&
				((this.bdn = !0),
				SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
					this.Entity.Id,
					Protocol_1.Aki.Protocol.nGs.Proto_UndoBuff,
					this.Adn,
				));
		}
		Hdn() {
			this.bdn ||
				this.wdn() ||
				((this.bdn = !0),
				SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
					this.Entity.Id,
					Protocol_1.Aki.Protocol.nGs.Proto_AddBuff,
					this.Adn,
				));
		}
		Vdn(t) {
			var e, o;
			Global_1.Global.BaseCharacter &&
				((o = Global_1.Global.BaseCharacter.CharacterActorComponent),
				this.Hte.Owner.IsValid()) &&
				o.Owner.IsValid() &&
				((t *= MathUtils_1.MathUtils.MillisecondToSecond),
				(e = this.Hte.ActorLocationProxy),
				o.ActorLocationProxy.Subtraction(e, this.nCt),
				this.nCt.SizeSquared() < 100
					? ((o = this.Hte.CreatureData.GetInitLocation()),
						(this.U7o.X = o.X ?? 0),
						(this.U7o.Y = o.Y ?? 0),
						(this.U7o.Z = o.Z ?? 0),
						this.Hte.SetActorLocation(this.U7o.ToUeVector()),
						this.nCt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
						this.U7o.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
						this.Pdn())
					: (this.nCt.Normalize(0.01),
						this.nCt.MultiplyEqual(600 * t),
						this.U7o.DeepCopy(this.Hte.ActorLocationProxy),
						this.U7o.AdditionEqual(this.nCt),
						this.Hte.SetActorLocation(this.U7o.ToUeVector())));
		}
		szo(t) {
			var e, o, n, r;
			this.Tdn &&
				(e = Global_1.Global.BaseCharacter) &&
				((e = e.CharacterActorComponent),
				(o = this.Hte.ActorTransform),
				(n = new UE.Transform(
					o.GetRotation(),
					o.GetTranslation(),
					o.GetScale3D(),
				)),
				(r = Vector_1.Vector.Create()).DeepCopy(
					o.GetRotation().RotateVector(this.Odn.ToUeVector()),
				),
				n.AddToTranslation(r.ToUeVector()),
				(this.kdn =
					BulletController_1.BulletController.CreateBulletCustomTarget(
						e.Actor,
						this.Tdn,
						n,
						{},
						this.jDn,
					)),
				(this.TDe = TimerSystem_1.TimerSystem.Delay(this.xdn, 5e3)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.kdn,
					EventDefine_1.EEventName.BulletHit,
					this.lHo,
				),
				(this.Bdn = !1));
		}
	});
(SceneItemBuffProducerComponent = SceneItemBuffProducerComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(129)],
		SceneItemBuffProducerComponent,
	)),
	(exports.SceneItemBuffProducerComponent = SceneItemBuffProducerComponent);
