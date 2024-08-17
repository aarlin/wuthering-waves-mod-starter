"use strict";
var SceneItemTurntableControllerComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, i) {
			var o,
				s = arguments.length,
				r =
					s < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, n, i);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(o = t[a]) &&
						(r = (s < 3 ? o(r) : 3 < s ? o(e, n, r) : o(e, n)) || r);
			return 3 < s && r && Object.defineProperty(e, n, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemTurntableControllerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
class RotatingRing {
	constructor() {
		(this.Index = 0),
			(this.ControllerRingActor = void 0),
			(this.RingRotator = void 0),
			(this.CurSpeed = -0),
			(this.AccumulateAngle = -0),
			(this.IsSelected = !1),
			(this.IsAtTarget = !1),
			(this.IsRotating = !1);
	}
}
let SceneItemTurntableControllerComponent =
	(SceneItemTurntableControllerComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.O_n = void 0),
				(this.k_n = void 0),
				(this.Rne = void 0),
				(this.Xte = void 0),
				(this.zht = void 0),
				(this.F_n = !1),
				(this.Qnn = () => {
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
						this.Qnn,
					),
						this.V_n() &&
							(this.H_n(), (this.F_n = !0), this.UpdateAllRingsAtTarget(!0)) &&
							!this.Xte?.HasTag(1298716444) &&
							this.j_n();
				}),
				(this.B1n = (t, e) => {
					if (this.F_n && 1298716444 === t) {
						this.SetAllowRotate(!1);
						for (const t of this.k_n) {
							var n = this.O_n.ItemConfig[t.Index];
							t?.IsAtTarget ||
								(this.W_n(t, n.TargetAngle),
								this.UpdateRingAtTarget(t.Index, !1));
						}
						this.UpdateAllRingsAtTargetEffect(),
							e &&
								EventSystem_1.EventSystem.EmitWithTarget(
									this.Entity,
									EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
									!1,
									!1,
								);
					}
				});
		}
		OnInitData(t) {
			t = t.GetParam(SceneItemTurntableControllerComponent_1)[0];
			var e = this.Entity?.GetComponent(0);
			if (!e) return !1;
			if (t) {
				var n = t.Config.ItemConfig?.length;
				if (void 0 === n || n <= 0)
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							40,
							"稷廷开门机关组件创建错误，圈数不对",
						);
				else {
					(this.zht = e), (this.O_n = t.Config), (this.k_n = []);
					for (let t = 0; t < n; t++) {
						var i = new RotatingRing();
						(i.Index = t),
							(i.IsAtTarget = !1),
							(i.IsSelected = !1),
							(i.IsRotating = !1),
							(i.CurSpeed = 0),
							(i.AccumulateAngle = 0),
							this.k_n.push(i);
					}
					this.F_n = !1;
				}
			}
			return !0;
		}
		OnStart() {
			return (
				(this.Xte = this.Entity.GetComponent(177)),
				this.Xte
					? (this.O_n &&
							EventSystem_1.EventSystem.AddWithTarget(
								this.Entity,
								EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
								this.Qnn,
							),
						!0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"稷廷开门机关组件初始化错误，找不到LevelTagComponent",
							),
						!1)
			);
		}
		OnActivate() {
			this.SetAllowRotate(!1),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.B1n,
				);
		}
		OnTick(t) {
			this.F_n &&
				(this.GetControlType() === IComponent_1.EControllerType.FixedAngle
					? this.K_n(t)
					: this.Q_n(t),
				this.X_n(t));
		}
		OnEnd() {
			return (
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
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Qnn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
						this.Qnn,
					),
				!0
			);
		}
		V_n() {
			var t = this.Entity?.GetComponent(182);
			if (!t)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							40,
							"稷廷开门机关组件初始化错误，SceneItemActorComponent组件获取失败",
						),
					!1
				);
			for (const i of this.k_n) {
				var e = "Ring" + i.Index,
					n = t.GetActorInSceneInteraction(e);
				if (!n?.IsValid())
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"稷廷开门机关组件初始化错误，对应Actor无效",
								["key", e],
							),
						!1
					);
				i.ControllerRingActor = n;
			}
			return !0;
		}
		H_n() {
			var t = this.Xte?.HasTag(1298716444) ?? !1;
			for (const n of this.k_n) {
				var e = this.O_n.ItemConfig[n.Index];
				t ? this.W_n(n, e.TargetAngle) : this.W_n(n, e.InitAngle);
			}
		}
		DeselectAllRings(t) {
			for (const t of this.k_n) t.IsSelected = !1;
			t && this.UpdateAllRingsSelectedEffect();
		}
		SelectRingByIndex(t, e) {
			(t = this.k_n[t]) &&
				((t.IsSelected = !0), e) &&
				this.UpdateRingSelectedEffectByIndex(t.Index);
		}
		DeselectRingByIndex(t, e) {
			(t = this.k_n[t]) &&
				((t.IsSelected = !1), e) &&
				this.UpdateRingSelectedEffectByIndex(t.Index);
		}
		$_n(t) {
			switch (t) {
				case 0:
					return 981971147;
				case 1:
					return 965193528;
				case 2:
					return 1015526385;
			}
			return 0;
		}
		Y_n(t) {
			switch (t) {
				case 0:
					return -639326900;
				case 1:
					return -622549281;
				case 2:
					return -605771662;
			}
			return 0;
		}
		J_n(t, e) {
			(t = this.k_n[t]) &&
				this.F_n &&
				this.GetRotateAllowed() &&
				!this.IsBusyRotating() &&
				((t.AccumulateAngle = 0),
				(t.CurSpeed =
					(Math.abs(this.O_n.RotationSpeed) * (e ? 1 : -1)) /
					CommonDefine_1.MILLIONSECOND_PER_SECOND),
				(t.IsRotating = !0));
		}
		z_n(t) {
			(t = this.k_n[t]) &&
				this.F_n &&
				this.GetRotateAllowed() &&
				((t.AccumulateAngle = 0), (t.CurSpeed = 0), (t.IsRotating = !1));
		}
		TriggerStartSelectedRingsRotate() {
			this.O_n.Type === IComponent_1.EControllerType.FixedAngle
				? this.Z_n()
				: this.eun();
		}
		Z_n() {
			this.F_n &&
				this.GetRotateAllowed() &&
				this.O_n.Type === IComponent_1.EControllerType.FixedAngle &&
				(this.k_n.forEach((t) => {
					var e;
					t.IsSelected &&
						((e = 0 < this.O_n.RotationSpeed), this.J_n(t.Index, e));
				}),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
					!0,
					!1,
				));
		}
		eun() {
			this.F_n &&
				this.GetRotateAllowed() &&
				this.O_n.Type === IComponent_1.EControllerType.FreeAngle &&
				(this.k_n.forEach((t) => {
					var e;
					t.IsSelected &&
						((e = 0 < this.O_n.RotationSpeed), this.J_n(t.Index, e));
				}),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
					!0,
					!1,
				));
		}
		TriggerStopAllRingsRotate() {
			this.O_n.Type === IComponent_1.EControllerType.FixedAngle
				? this.tun()
				: this.iun();
		}
		tun() {
			this.F_n &&
				this.GetRotateAllowed() &&
				this.IsBusyRotating() &&
				this.O_n.Type === IComponent_1.EControllerType.FixedAngle &&
				(this.k_n.forEach((t) => {
					t.IsRotating && this.oun(t, -t.AccumulateAngle), this.z_n(t.Index);
				}),
				this.UpdateAllRingsAtTarget(!0) && this.j_n(),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
					!1,
					this.IsAllRingsAtTarget(),
				));
		}
		iun() {
			this.F_n &&
				this.GetRotateAllowed() &&
				this.IsBusyRotating() &&
				this.O_n.Type === IComponent_1.EControllerType.FreeAngle &&
				(this.k_n.forEach((t) => {
					this.z_n(t.Index);
				}),
				this.UpdateAllRingsAtTarget(!0) && this.j_n(),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
					!1,
					this.IsAllRingsAtTarget(),
				));
		}
		TriggerResetAllRingsToInitAngle(t = !1) {
			!this.F_n ||
				!this.GetRotateAllowed() ||
				this.IsBusyRotating() ||
				(this.IsAllRingsAtTarget() && !t) ||
				(this.k_n.forEach((t) => {
					var e = this.O_n.ItemConfig[t.Index];
					this.W_n(t, e.InitAngle);
				}),
				this.UpdateAllRingsAtTarget(!0));
		}
		K_n(t) {
			if (this.F_n) {
				var e = this.O_n;
				if (e)
					for (const s of this.k_n)
						if (s.IsRotating) {
							let r = s.CurSpeed * t;
							var n,
								i = s.AccumulateAngle + r,
								o = e.ItemConfig[s.Index].RotateAngle;
							Math.abs(i) >= Math.abs(o)
								? ((n = 0 < s.CurSpeed),
									(r -= i - Math.abs(o) * (n ? 1 : -1)),
									this.oun(s, r),
									(s.AccumulateAngle += r),
									this.z_n(s.Index),
									this.IsBusyRotating()
										? this.UpdateRingAtTarget(s.Index, !0)
										: (this.UpdateAllRingsAtTarget(!0) && this.j_n(),
											EventSystem_1.EventSystem.EmitWithTarget(
												this.Entity,
												EventDefine_1.EEventName
													.OnTurntableControllerBusyStateChange,
												!1,
												this.IsAllRingsAtTarget(),
											)))
								: (this.oun(s, r),
									(s.AccumulateAngle += r),
									s.IsAtTarget && this.UpdateRingAtTarget(s.Index, !0));
						}
			}
		}
		Q_n(t) {
			if (this.F_n)
				for (const n of this.k_n) {
					var e;
					n.IsRotating &&
						((e = n.CurSpeed * t), this.oun(n, e), n.IsAtTarget) &&
						this.UpdateRingAtTarget(n.Index, !0);
				}
		}
		X_n(t) {
			if (this.F_n)
				for (const o of this.k_n) {
					var e, n, i;
					o.IsRotating ||
						!o.IsAtTarget ||
						((i = this.O_n.ItemConfig[o.Index]),
						(i = this.run(this.nun(o), i.TargetAngle)),
						MathUtils_1.MathUtils.IsNearlyZero(i)) ||
						((e = 0 < i),
						(n =
							this.O_n.RotationSpeed / CommonDefine_1.MILLIONSECOND_PER_SECOND),
						(i = Math.min(Math.abs(i), Math.abs(n * t)) * (e ? 1 : -1)),
						this.oun(o, i));
				}
		}
		nun(t) {
			if (t?.ControllerRingActor?.IsValid())
				return (
					t.RingRotator ||
						(t.RingRotator = Rotator_1.Rotator.Create(
							t.ControllerRingActor.RootComponent.GetRelativeTransform().Rotator(),
						)),
					-t.RingRotator.Pitch
				);
		}
		W_n(t, e) {
			t.ControllerRingActor?.IsValid() &&
				(t.RingRotator || (t.RingRotator = Rotator_1.Rotator.Create()),
				(t.RingRotator.Pitch = -e),
				t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(
					t.RingRotator.ToUeRotator(),
					!1,
					void 0,
					!1,
				));
		}
		oun(t, e) {
			t.ControllerRingActor?.IsValid() &&
				(t.RingRotator || (t.RingRotator = Rotator_1.Rotator.Create()),
				(t.RingRotator.Pitch -= e),
				t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(
					t.RingRotator.ToUeRotator(),
					!1,
					void 0,
					!1,
				));
		}
		UpdateAllRingsAtTarget(t) {
			let e = !0;
			for (const t of this.k_n)
				this.UpdateRingAtTarget(t.Index, !1) || (e = !1);
			return t && this.UpdateAllRingsAtTargetEffect(), e;
		}
		UpdateRingAtTarget(t, e) {
			var n, i, o;
			return (
				!(!(t = this.k_n[t]) || !this.F_n || !t?.RingRotator) &&
				((o = this.nun(t)),
				(n = (i = this.O_n).ItemConfig[t.Index]?.TargetAngle),
				(i =
					this.O_n.Type === IComponent_1.EControllerType.FixedAngle
						? 1
						: i.IntervalAngle),
				(o = Math.abs(this.run(o, n))),
				(t.IsAtTarget = o <= i),
				e && this.UpdateRingAtTargetEffectByIndex(t.Index),
				t.IsAtTarget)
			);
		}
		IsBusyRotating() {
			for (const t of this.k_n) if (t.IsRotating) return !0;
			return !1;
		}
		IsRingRotatingByIndex(t) {
			return !(!(t = this.k_n[t]) || !this.F_n) && t.IsRotating;
		}
		GetRingsNum() {
			return this.k_n?.length;
		}
		GetControlType() {
			return this.O_n.Type;
		}
		IsAllRingsAtTarget() {
			for (const t of this.k_n) if (!t.IsAtTarget) return !1;
			return !0;
		}
		IsRingAtTargetByIndex(t) {
			return !(!(t = this.k_n[t]) || !this.F_n) && t.IsAtTarget;
		}
		IsRingSelectedByIndex(t) {
			return !(!(t = this.k_n[t]) || !this.F_n) && t.IsSelected;
		}
		UpdateAllRingsAtTargetEffect() {
			if (this.Xte) {
				this.Xte.NotifyLock++;
				for (const e of this.k_n) {
					var t;
					e.IsAtTarget
						? ((t = this.Y_n(e.Index)),
							this.Xte.HasTag(t) || this.Xte.AddTag(t))
						: ((t = this.Y_n(e.Index)),
							this.Xte.HasTag(t) && this.Xte.RemoveTag(t));
				}
				this.Xte.NotifyLock--;
			}
		}
		UpdateRingAtTargetEffectByIndex(t) {
			var e;
			(t = this.k_n[t]) &&
				this.F_n &&
				(t.IsAtTarget
					? ((e = this.Y_n(t.Index)), this.Xte.HasTag(e) || this.Xte.AddTag(e))
					: ((e = this.Y_n(t.Index)),
						this.Xte.HasTag(e) && this.Xte.RemoveTag(e)));
		}
		UpdateAllRingsSelectedEffect() {
			if (this.Xte) {
				this.Xte.NotifyLock++;
				for (const e of this.k_n) {
					var t;
					e.IsSelected
						? ((t = this.$_n(e.Index)),
							this.Xte.HasTag(t) || this.Xte.AddTag(t))
						: ((t = this.$_n(e.Index)),
							this.Xte.HasTag(t) && this.Xte.RemoveTag(t));
				}
				this.Xte.NotifyLock--;
			}
		}
		UpdateRingSelectedEffectByIndex(t) {
			var e;
			(t = this.k_n[t]) &&
				this.F_n &&
				(t.IsSelected
					? ((e = this.$_n(t.Index)), this.Xte.HasTag(e) || this.Xte.AddTag(e))
					: ((e = this.$_n(t.Index)),
						this.Xte.HasTag(e) && this.Xte.RemoveTag(e)));
		}
		SetAllowRotate(t) {
			t && !this.GetRotateAllowed()
				? (this.Enable(
						this.Rne,
						"SceneItemTurntableControllerComponent.SetAllowRotate",
					),
					(this.Rne = void 0))
				: !t &&
					this.GetRotateAllowed() &&
					(this.Rne = this.Disable("稷廷开门主控机关: 旋转被禁止，禁用组件"));
		}
		GetRotateAllowed() {
			return void 0 === this.Rne;
		}
		j_n() {
			var t;
			this.zht &&
				(((t = Protocol_1.Aki.Protocol.Ccs.create()).rkn =
					MathUtils_1.MathUtils.NumberToLong(this.zht.GetCreatureDataId())),
				Net_1.Net.Call(9599, t, (t) => {
					t?.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
						t?.X5n !==
							Protocol_1.Aki.Protocol.lkn.Proto_ErrStateEntityStateNoChange &&
						(this.F_n &&
							this.GetRotateAllowed() &&
							this.IsBusyRotating() &&
							this.TriggerStopAllRingsRotate(),
						this.TriggerResetAllRingsToInitAngle(!0),
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
							!1,
							!1,
						));
				}));
		}
		run(t, e) {
			return this.sun(e - t, -180, 180);
		}
		sun(t, e, n) {
			let i = t;
			for (; i < e; ) i += 360;
			for (; i >= n; ) i -= 360;
			return i;
		}
	});
(SceneItemTurntableControllerComponent =
	SceneItemTurntableControllerComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(119)],
			SceneItemTurntableControllerComponent,
		)),
	(exports.SceneItemTurntableControllerComponent =
		SceneItemTurntableControllerComponent);
