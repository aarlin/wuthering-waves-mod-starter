"use strict";
var PawnAdsorbComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var r,
				a = arguments.length,
				i =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(t, e, n, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(r = t[s]) &&
						(i = (a < 3 ? r(i) : 3 < a ? r(e, n, i) : r(e, n)) || i);
			return 3 < a && i && Object.defineProperty(e, n, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnAdsorbComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	Global_1 = require("../../../Global"),
	LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	SENSORY_RANGE = 1500,
	MAX_SPEED = 1500,
	NORMALIZE = 0.01,
	CONDITION_CHECK_TIME = 2e3;
let PawnAdsorbComponent = (PawnAdsorbComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Jsn = void 0),
			(this.zsn = void 0),
			(this.o1n = void 0),
			(this.Zsn = -0),
			(this.ean = -0),
			(this.ian = -0),
			(this.oan = void 0),
			(this.nCt = void 0),
			(this.ran = !1),
			(this.nan = !1),
			(this.san = !1),
			(this.aan = void 0),
			(this.U7o = void 0),
			(this.han = void 0),
			(this.lan = -0),
			(this._an = -0),
			(this.uan = !1),
			(this.can = -0),
			(this.Izr = void 0),
			(this.IsInSensoryRange = !1),
			(this.RHt = !1),
			(this.Mne = 0),
			(this.man = void 0),
			(this.dan = 0),
			(this.Can = !1),
			(this.gan = !1),
			(this.fan = () => {
				this.IsInSensoryRange = !0;
			}),
			(this.Ozr = () => {
				this.IsInSensoryRange = !1;
			}),
			(this.gIe = (t, e) => {
				!this.ran &&
					this.zsn &&
					(t.includes(-662723379)
						? ((this.RHt = !0), this.xk())
						: e.includes(-662723379) && ((this.RHt = !1), this.xk()));
			});
	}
	OnInitData(t) {
		return (
			(t = t.GetParam(PawnAdsorbComponent_1)[0]),
			(this.Zsn = t.Range),
			(this.ean = t.StartVelocity),
			(this.ian = t.Acceleration),
			(this.Izr = this.Entity.GetComponent(106)),
			this.Izr.SetLogicRange(1500),
			this.Ore(),
			!0
		);
	}
	OnStart() {
		if (((this.Hte = this.Entity.GetComponent(1)), !this.Hte))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						30,
						"[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Actor Component Undefined",
					),
				!1
			);
		if (((this.Jsn = this.Entity.GetComponent(103)), !this.Jsn))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						30,
						"[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Pawn Interact Component Undefined",
					),
				!1
			);
		var t = this.Hte.CreatureData,
			e = t.GetPbEntityInitData();
		return e
			? ((this.Mne = t.GetPbDataId()),
				(t = t.GetBaseInfo()),
				(this.man = t.OnlineInteractType ?? 0),
				(this.zsn = this.Entity.GetComponent(177)),
				this.zsn
					? (this.zsn.HasTag(-662723379) && (this.RHt = !0),
						(t = ((this.can = 0), IComponent_1.getComponent)(
							e.ComponentsData,
							"InteractComponent",
						)) && (this.can = t.Range * t.Range),
						(this.o1n = this.Entity.GetComponent(142)),
						this.o1n?.TryDisable("[PawnAdsorbComponent] OnStart"),
						(this.nCt = Vector_1.Vector.Create()),
						(this.aan = Vector_1.Vector.Create()),
						(this.U7o = Vector_1.Vector.Create()),
						(this.han = Vector_1.Vector.Create()),
						(this.lan = 0),
						!(this._an = 0))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Interaction",
								30,
								"[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 LevelTagComponent Undefined",
								["EntityConfigID:", this.Mne],
							),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						30,
						"[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Config Invalid",
						["CreatureGenID:", t.GetOwnerId()],
						["PbDataId:", t.GetPbDataId()],
					),
				!1);
	}
	OnTick(t) {
		this.RHt ||
			this.san ||
			(this.van() &&
				this.Man() &&
				(this.ran || (this.San(), this.o1n?.TryEnable()),
				this.Ean(t),
				Vector_1.Vector.DistSquared(
					this.Hte.ActorLocationProxy,
					this.oan.ActorLocationProxy,
				) < this.can) &&
				(this.yan(),
				this.Ian(),
				this.Tan(),
				this.Jsn.ForceUpdate(),
				this.o1n?.TryDisable(
					"[PawnAdsorbComponent] (distance < this.InteractRangeSquared",
				)));
	}
	Tan() {
		var t = Protocol_1.Aki.Protocol.els.create(),
			e = ((t.m4n = new Array()), Protocol_1.Aki.Protocol.hOs.create()),
			n =
				((e.$kn = Protocol_1.Aki.Protocol.VBs.create()),
				(e.D3n = Protocol_1.Aki.Protocol.iws.create()),
				this.Hte.ActorLocationProxy),
			o = this.Hte.ActorRotationProxy;
		(e.$kn.X = n.X),
			(e.$kn.Y = n.Y),
			(e.$kn.Z = n.Z),
			(e.D3n.Pitch = o.Pitch),
			(e.D3n.Roll = o.Roll),
			(e.D3n.Yaw = o.Yaw),
			(e.h4n = Time_1.Time.NowSeconds),
			t.m4n.push(e),
			CombatMessage_1.CombatNet.Send(26540, this.Entity, t);
	}
	OnEnd() {
		return this.kre(), !0;
	}
	van() {
		var t, e;
		return (
			!(!this.ran && !this.Can) ||
			(!(
				!this.Hte ||
				!Global_1.Global.BaseCharacter ||
				!(t = Global_1.Global.BaseCharacter.CharacterActorComponent)
			) &&
				((e = this.Hte.ActorLocationProxy),
				(t = t.ActorLocationProxy),
				(e = Vector_1.Vector.DistSquared(e, t)),
				(this.uan = e <= this.Zsn * this.Zsn),
				this.uan))
		);
	}
	Lan() {
		return (
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
			ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
		);
	}
	Man() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
		switch (this.man) {
			case 2:
				return !1;
			case 0:
				return this.Lan();
			case 1:
				return this.Dan(), this.gan;
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Interaction",
							30,
							"[PawnAdsorbComponent] 不支持的联机模式配置",
						),
					!1
				);
		}
	}
	Dan() {
		var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
		t - this.dan > 2e3 &&
			((this.Can = !0),
			LevelGamePlayController_1.LevelGamePlayController.EntityAdsorbRequest(
				this.Mne,
				(t) => {
					t &&
						(t.lkn === Protocol_1.Aki.Protocol.lkn.Sys && (this.gan = !0),
						(this.Can = !1));
				},
			),
			(this.dan = t));
	}
	San() {
		if (!this.ran && !this.san) {
			if (!Global_1.Global.BaseCharacter) return !1;
			if (
				((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
				!this.Hte.Owner.IsValid() || !this.oan.Owner.IsValid())
			)
				return !1;
			var t = this.Hte.ActorLocationProxy;
			this.oan.ActorLocationProxy.Subtraction(t, this.nCt),
				this.nCt.Normalize(0.01),
				(this.han = this.nCt.MultiplyEqual(this.ean)),
				(this.lan = this.ean),
				(this._an = 0),
				(this.ran = !0);
		}
		return !0;
	}
	Ean(t) {
		var e;
		this.ran &&
			!this.san &&
			Global_1.Global.BaseCharacter &&
			((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
			this.Hte.Owner.IsValid()) &&
			this.oan.Owner.IsValid() &&
			((e = this.Hte.ActorLocationProxy),
			this.oan.ActorLocationProxy.Subtraction(e, this.nCt),
			this.nCt.Normalize(0.01),
			(e = t * MathUtils_1.MathUtils.MillisecondToSecond),
			(this._an = this.ian * e),
			(this.lan += this._an),
			this.han.DeepCopy(this.nCt),
			this.lan > 1500
				? ((this.lan = 1500), this.han.MultiplyEqual(1500))
				: this.han.MultiplyEqual(this.lan),
			this.han.Multiply(e, this.aan),
			(t = this.Entity.GetComponent(36))
				? t.MoveCharacter(this.aan, e, "Pawn吸附更新")
				: this.Hte.AddActorWorldOffset(
						this.aan.ToUeVector(),
						"Pawn吸附更新",
						!0,
					));
	}
	Ian() {
		this.nan || (this.zsn?.AddTag(1286772724), (this.nan = !0));
	}
	yan() {
		Global_1.Global.BaseCharacter &&
			((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
			this.Hte.Owner.IsValid()) &&
			this.oan.Owner.IsValid() &&
			(this.Hte.Owner.K2_AttachToActor(this.oan.Owner, void 0, 2, 1, 1, !1),
			this.nCt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			this.han.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			(this.lan = 0),
			(this._an = 0),
			(this.san = !0));
	}
	Ore() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Entity,
			EventDefine_1.EEventName.EnterLogicRange,
			this.fan,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
				this.Ozr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnLevelTagChanged,
				this.gIe,
			);
	}
	kre() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.EnterLogicRange,
			this.fan,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
				this.Ozr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnLevelTagChanged,
				this.gIe,
			);
	}
	xk() {
		this.nCt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			this.aan.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			this.U7o.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			this.han.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
			(this.lan = 0),
			(this._an = 0);
	}
});
(PawnAdsorbComponent = PawnAdsorbComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(100)],
		PawnAdsorbComponent,
	)),
	(exports.PawnAdsorbComponent = PawnAdsorbComponent);
