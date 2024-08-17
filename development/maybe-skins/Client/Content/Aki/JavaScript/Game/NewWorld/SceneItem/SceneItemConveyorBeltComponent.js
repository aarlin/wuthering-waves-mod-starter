"use strict";
var SceneItemConveyorBeltComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, n) {
			var i,
				r = arguments.length,
				s =
					r < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, o, n);
			else
				for (var C = t.length - 1; 0 <= C; C--)
					(i = t[C]) &&
						(s = (r < 3 ? i(s) : 3 < r ? i(e, o, s) : i(e, o)) || s);
			return 3 < r && s && Object.defineProperty(e, o, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemConveyorBeltComponent = void 0);
const Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	CharacterUnifiedStateTypes_1 = require("../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	NORMALIZE = 0.01,
	DELTATIMECHANGEVALUE = 10;
let SceneItemConveyorBeltComponent =
	(SceneItemConveyorBeltComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.tCn = void 0),
				(this.iCn = void 0),
				(this.ktn = void 0),
				(this.oCn = void 0),
				(this.rCn = void 0),
				(this.nCn = []),
				(this.sCn = new Map()),
				(this.aCn = !1),
				(this.hCn = !1),
				(this.yun = Vector_1.Vector.Create(0, 0, 0)),
				(this.Qrr = 0),
				(this.jVr = 0),
				(this.Pun = 0),
				(this.cz = Vector_1.Vector.Create(0, 0, 0)),
				(this.kRe = Vector_1.Vector.Create(0, 0, 0)),
				(this.cjr = (t) => {
					if (this.hCn && this.tCn) {
						(!this.Pun || Math.abs(t - this.Pun) > 10) && (this.Pun = t);
						var e,
							o,
							n,
							i =
								this.tCn.FieldType.Type ===
								IComponent_1.EConveyorBeltFieldType.PointField,
							r = i ? this.Entity.GetComponent(1).ActorLocationProxy : void 0,
							s = this.Pun * MathUtils_1.MathUtils.MillisecondToSecond;
						for (const t of this.nCn)
							i &&
								(t.ActorLocationProxy.Subtraction(r, this.yun),
								this.yun.Normalize(0.01),
								this.yun.MultiplyEqual(this.Qrr)),
								this.cz.DeepCopy(this.yun),
								this.cz.MultiplyEqual(s),
								this.kRe.DeepCopy(t.ActorLocationProxy),
								this.kRe.AdditionEqual(this.cz),
								t.SetActorLocation(this.kRe.ToUeVector()) ||
									(Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn("SceneItem", 36, "传送带设置位置失败", [
											"loc",
											t.ActorLocationProxy,
										]));
						for ([e, o] of this.sCn)
							e.Valid &&
								(i &&
									(e.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
										r,
										this.yun,
									),
									this.yun.Normalize(0.01),
									this.yun.MultiplyEqual(this.Qrr),
									(e.DeltaConveyBeltSpeed = this.yun.ToUeVector())),
								(n = e.SetAddMoveWorld(
									this.yun.ToUeVector(),
									s,
									void 0,
									o,
									void 0,
									void 0,
									void 0,
								)),
								this.sCn.set(e, n));
						this.aCn &&
							this.oCn &&
							this.oCn.Valid &&
							this.rCn.PositionState ===
								CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
							(i &&
								(this.oCn.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
									r,
									this.yun,
								),
								this.yun.Normalize(0.01),
								this.yun.MultiplyEqual(this.Qrr),
								(this.oCn.DeltaConveyBeltSpeed = this.yun.ToUeVector())),
							(this.jVr = this.oCn.SetAddMoveWorld(
								this.yun.ToUeVector(),
								s,
								void 0,
								this.jVr,
								void 0,
								void 0,
								void 0,
							)));
					}
				}),
				(this.lCn = (t, e) => {
					const o = (e = e.Entity).GetComponent(1);
					var n = o?.CreatureData.GetEntityType();
					if (n === Protocol_1.Aki.Protocol.wks.Proto_Player)
						(this.aCn = t)
							? ((this.oCn = e.GetComponent(161)),
								(this.rCn = e.GetComponent(89)),
								(this.oCn.DeltaConveyBeltSpeed = this.yun.ToUeVector()))
							: ((this.oCn.DeltaConveyBeltSpeed = void 0),
								(this.oCn = void 0),
								(this.rCn = void 0));
					else if (
						n === Protocol_1.Aki.Protocol.wks.Proto_Npc ||
						n === Protocol_1.Aki.Protocol.wks.Proto_Monster ||
						n === Protocol_1.Aki.Protocol.wks.Proto_Animal ||
						n === Protocol_1.Aki.Protocol.wks.Proto_Vision
					) {
						var i = e.GetComponent(36);
						i &&
							((r = this.sCn.get(i)),
							t ? r || this.sCn.set(i, -1) : r && this.sCn.delete(i));
					} else if (
						n === Protocol_1.Aki.Protocol.wks.Proto_SceneItem &&
						e.GetComponent(140)
					) {
						const o = e.GetComponent(1);
						var r = this.nCn.indexOf(o);
						t
							? -1 === r && this.nCn.push(o)
							: -1 !== r && this.nCn.splice(r, 1);
					}
					this._Cn();
				}),
				(this.uCn = (t, e) => {
					(-1152559349 !== t && -3775711 !== t) || this.cCn();
				});
		}
		OnInitData(t) {
			var e = t.GetParam(SceneItemConveyorBeltComponent_1)[0],
				o = e.StateGroups.length;
			if (2 < o || o < 1)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("SceneItem", 36, "状态组配置数量不对", ["num", o]),
					!1
				);
			this.iCn = e.StateGroups;
			for (let t = 0; t < o; t++) {
				var n = e.StateGroups[t];
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Temp", 36, "s", [
						"configGroup.EntityState",
						n.EntityState,
					]);
			}
			return !0;
		}
		OnStart() {
			return (
				(this.ktn = this.Entity.GetComponent(74)),
				this.ktn && this.ktn.AddOnEntityOverlapCallback(this.lCn),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.uCn,
				),
				this.cCn(),
				!0
			);
		}
		OnClear() {
			return (
				this.ktn && this.ktn.RemoveOnEntityOverlapCallback(this.lCn),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.uCn,
				),
				!0
			);
		}
		OnForceTick(t) {
			this.cjr(t);
		}
		OnActivate() {
			!Info_1.Info.EnableForceTick &&
				this.Active &&
				ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.cjr,
				);
		}
		OnEnable() {
			!Info_1.Info.EnableForceTick &&
				this.Entity?.IsInit &&
				ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.cjr,
				);
		}
		OnEnd() {
			return (
				Info_1.Info.EnableForceTick ||
					ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
						this,
					),
				!0
			);
		}
		OnDisable(t) {
			Info_1.Info.EnableForceTick ||
				ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
					this,
				);
		}
		_Cn() {
			(this.hCn = 0 < this.nCn.length || this.aCn || 0 < this.sCn.size),
				this.hCn || (this.Pun = 0);
		}
		mCn() {
			this.tCn = void 0;
			var t = this.Entity.GetComponent(117).State;
			let e = "";
			1 === t ? (e = "常态") : 2 === t && (e = "激活");
			for (const t of this.iCn) t.EntityState.includes(e) && (this.tCn = t);
			this.tCn ||
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("SceneItem", 36, "传送带静止"));
		}
		cCn() {
			var t, e;
			this.mCn(),
				this.tCn &&
					((t = this.tCn.FieldType.Type) ===
					IComponent_1.EConveyorBeltFieldType.DirectionalField
						? ((this.Qrr = this.tCn.MoveType.Speed),
							(e = this.tCn.FieldType.Direction),
							(this.yun.X = e.X ?? 0),
							(this.yun.Y = e.Y ?? 0),
							(this.yun.Z = e.Z ?? 0),
							(e = this.Entity.GetComponent(1).ActorRotation.RotateVector(
								this.yun.ToUeVector(),
							)),
							this.yun.FromUeVector(e),
							this.yun.Normalize(0.01),
							this.yun.MultiplyEqual(this.Qrr))
						: t === IComponent_1.EConveyorBeltFieldType.PointField &&
							(this.Qrr = this.tCn.MoveType.Speed));
		}
	});
(SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(131)],
		SceneItemConveyorBeltComponent,
	)),
	(exports.SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent);
