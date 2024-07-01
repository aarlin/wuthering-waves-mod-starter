"use strict";
var SceneItemProgressControlComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, i) {
			var o,
				r = arguments.length,
				s =
					r < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, n, i);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(o = t[a]) &&
						(s = (r < 3 ? o(s) : 3 < r ? o(e, n, s) : o(e, n)) || s);
			return 3 < r && s && Object.defineProperty(e, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemProgressControlComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
let SceneItemProgressControlComponent =
	(SceneItemProgressControlComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Rne = void 0),
				(this.Lo = void 0),
				(this.SIe = void 0),
				(this.mBe = void 0),
				(this.Lie = void 0),
				(this.x1n = void 0),
				(this.w1n = void 0),
				(this.B1n = (t, e) => {
					switch (t) {
						case -1152559349:
							this.b1n(
								"[SceneItemProgressControlComponent.HandleUpdateState] 状态变为常态, 停止进度控制",
							),
								this.q1n(),
								this.Plt(),
								this.G1n();
							break;
						case -3775711:
							this.N1n();
							break;
						case 1298716444:
							this.b1n(
								"[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制",
							);
					}
				}),
				(this.ktn = void 0),
				(this.O1n = !1),
				(this.k1n = void 0),
				(this.F1n = 0),
				(this.V1n = (t) => {
					"CaptureStrategicPoint" === this.Lo.Control.Type &&
						this.O1n !== t &&
						((this.O1n = t), this.H1n());
				}),
				(this.j1n = (t, e) => {
					var n = this.Lo.Control;
					if ("CaptureStrategicPoint" === n.Type && e?.Valid) {
						var i = e.Entity.GetComponent(3);
						if (!i?.IsRoleAndCtrlByMe) {
							if (t) {
								if (
									((i = n.EnemyEntitiyMatch),
									(t = e.Entity.GetComponent(0).GetBaseInfo()?.Category),
									!t)
								)
									return;
								if (!(0, IUtil_1.isEntitiyMatch)(i, t)) return;
								this.k1n.add(e);
							} else this.k1n.delete(e);
							this.H1n();
						}
					}
				}),
				(this.zpe = (t, e) => {
					this.k1n.has(e) && this.j1n(!1, e);
				});
		}
		OnInitData(t) {
			return (
				(t = t.GetParam(SceneItemProgressControlComponent_1)[0]),
				(this.Lo = t),
				(this.SIe = this.Entity.GetComponent(0)),
				(this.w1n = new Set()),
				(this.Rne = void 0),
				this.q1n(),
				"CaptureStrategicPoint" !== (t = this.Lo.Control).Type
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelPlay",
								40,
								"[SceneItemProgressControlComponent.OnCreate] 不支持的进度控制类型",
								["PbDataId", this.SIe.GetPbDataId()],
								["ProgressCtrlType", t.Type],
							),
						!1)
					: ((this.O1n = !1), (this.k1n = new Set()), !0)
			);
		}
		OnStart() {
			if (
				((this.mBe = this.Entity.CheckGetComponent(117)),
				(this.Lie = this.Entity.CheckGetComponent(177)),
				!this.mBe || !this.Lie)
			)
				return !1;
			if ("CaptureStrategicPoint" === this.Lo.Control.Type) {
				if (((this.ktn = this.Entity.CheckGetComponent(74)), !this.ktn))
					return !1;
				this.ktn.AddOnPlayerOverlapCallback(this.V1n),
					this.ktn.AddOnEntityOverlapCallback(this.j1n),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.RemoveEntity,
						this.zpe,
					);
			}
			return !0;
		}
		OnActivate() {
			this.W1n(),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.B1n,
				),
				this.G1n();
		}
		OnEnd() {
			return (
				"CaptureStrategicPoint" === this.Lo.Control.Type &&
					(this.ktn &&
						(this.ktn.RemoveOnPlayerOverlapCallback(this.V1n),
						this.ktn.RemoveOnEntityOverlapCallback(this.j1n),
						(this.ktn = void 0)),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.RemoveEntity,
						this.zpe,
					)),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.B1n,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.B1n,
					),
				!(this.mBe = void 0)
			);
		}
		OnTick(t) {
			"CaptureStrategicPoint" === this.Lo.Control.Type && this.K1n(t);
		}
		W1n() {
			this.mBe?.IsInState(2)
				? this.N1n()
				: this.b1n(
						"[SceneItemProgressControlComponent.HandleUpdateState] 状态未激活, 停止进度控制",
					);
		}
		Q1n() {
			var t = Protocol_1.Aki.Protocol.Xns.create();
			(t.rkn = MathUtils_1.MathUtils.NumberToLong(
				this.SIe.GetCreatureDataId(),
			)),
				Net_1.Net.Call(9273, t, (t) => {});
		}
		G1n() {
			var t = this.Lo.Control;
			"CaptureStrategicPoint" !== t.Type ||
				this.x1n?.CurrentValue !== t.MaxValue ||
				this.mBe?.IsInState(4) ||
				this.Q1n();
		}
		X1n() {
			return void 0 === this.Rne;
		}
		N1n() {
			!this.X1n() &&
				this.Enable(
					this.Rne,
					"SceneItemProgressControlComponent.EnableProgressControl",
				) &&
				((this.Rne = void 0), this.$1n(!0));
		}
		b1n(t) {
			this.X1n() && ((this.Rne = this.Disable(t)), this.$1n(!1));
		}
		$1n(t) {
			"CaptureStrategicPoint" === this.Lo.Control.Type && this.H1n(),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
					this.Entity,
					t,
					this.x1n,
				);
		}
		Plt() {
			this.w1n.forEach((t) => {
				t?.(this.x1n);
			});
		}
		AddProgressDataChangedCallback(t) {
			return !(!t || !this.w1n || (this.w1n.add(t), 0));
		}
		RemoveProgressDataChangedCallback(t) {
			return !(!t || !this.w1n) && this.w1n.delete(t);
		}
		GetProgressData() {
			return this.x1n;
		}
		q1n() {
			var t = this.Lo.Control;
			"CaptureStrategicPoint" === t.Type &&
				(this.x1n = {
					ProgressCtrlType: t.Type,
					CurrentValue: t.InitValue,
					MaxValue: t.MaxValue,
				});
		}
		Y1n(t) {
			switch (t) {
				case 0:
					return;
				case 3:
					return 1803735224;
				default:
					return -1726296883;
			}
		}
		H1n() {
			var t,
				e = this.F1n;
			let n = 0;
			e !==
				(n = this.X1n()
					? 0 < this.k1n.size
						? this.O1n
							? 1
							: 2
						: this.O1n
							? 3
							: 4
					: n) &&
				((this.F1n = n), (e = this.Y1n(e)) !== (t = this.Y1n(n))) &&
				this.Lie &&
				(this.Lie.NotifyLock++,
				void 0 !== e && this.Lie.RemoveTag(e),
				void 0 !== t && this.Lie.AddTag(t),
				this.Lie.NotifyLock--);
		}
		K1n(t) {
			var e = this.Lo.Control;
			if ("CaptureStrategicPoint" === e.Type) {
				let n = 0;
				switch (this.F1n) {
					case 1:
					case 2:
						n = -e.DecreaseSpeed;
						break;
					case 3:
						n = e.IncreaseSpeed;
						break;
					default:
						return;
				}
				(t = MathUtils_1.MathUtils.Clamp(
					this.x1n.CurrentValue +
						(t / CommonDefine_1.MILLIONSECOND_PER_SECOND) * n,
					0,
					e.MaxValue,
				)) !== this.x1n.CurrentValue &&
					((this.x1n.CurrentValue = t), this.Plt(), this.G1n());
			}
		}
	});
(SceneItemProgressControlComponent = SceneItemProgressControlComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(114)],
		SceneItemProgressControlComponent,
	)),
	(exports.SceneItemProgressControlComponent =
		SceneItemProgressControlComponent);
