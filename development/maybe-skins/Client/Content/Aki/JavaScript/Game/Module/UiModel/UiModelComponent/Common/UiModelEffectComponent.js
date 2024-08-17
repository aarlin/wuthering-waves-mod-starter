"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, n) {
		var f,
			s = arguments.length,
			i =
				s < 3
					? e
					: null === n
						? (n = Object.getOwnPropertyDescriptor(e, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(t, e, o, n);
		else
			for (var r = t.length - 1; 0 <= r; r--)
				(f = t[r]) && (i = (s < 3 ? f(i) : 3 < s ? f(e, o, i) : f(e, o)) || i);
		return 3 < s && i && Object.defineProperty(e, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelEffectComponent = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelEffectComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Clo = new Array()),
			(this.MBr = new Map()),
			(this.SBr = void 0),
			(this.lHs = !0),
			(this._Hs = 0.5),
			(this.uHs = 0.5),
			(this.$wr = (t) => {
				t || this.DestroyAllEffect();
			}),
			(this.cHs = (t) => {
				t > this._Hs &&
					!this.lHs &&
					((this.lHs = !0), this.SetAllEffectShowState(this.lHs)),
					t < this.uHs &&
						this.lHs &&
						((this.lHs = !1), this.SetAllEffectShowState(this.lHs));
			}),
			(this.OnAnsBegin = (t) => {
				this.PlayEffectByAnsContext(t);
			}),
			(this.OnAnsEnd = (t) => {
				this.StopEffectByAnsContext(t);
			});
	}
	OnInit() {
		this.SBr = this.Owner.CheckGetComponent(6);
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.cHs,
			),
			this.SBr?.RegisterAnsTrigger(
				"UiEffectAnsContext",
				this.OnAnsBegin,
				this.OnAnsEnd,
			);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.cHs,
			),
			this.DestroyAllEffect();
	}
	PlayEffectOnRoot(t, e, o) {
		this.PlayEffectByPath(
			t,
			e,
			o,
			!0,
			!1,
			Vector_1.Vector.ZeroVector,
			Rotator_1.Rotator.ZeroRotator,
			Vector_1.Vector.OneVector,
		);
	}
	PlayEffectByPath(t, e, o, n, f, s, i, r, c) {
		return (
			(t = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				MathUtils_1.MathUtils.DefaultTransform,
				t,
				"[RoleAnimStateEffectManager.PlayEffect]",
				new EffectContext_1.EffectContext(void 0, e),
				1,
				(t) => {
					var c;
					(t = EffectSystem_1.EffectSystem.GetEffectActor(t)) &&
						t.IsValid() &&
						(n && !f
							? (t.K2_AttachToComponent(e, o, 0, 0, 0, !1),
								(c = new UE.Transform(i, s, r)),
								t.K2_SetActorRelativeTransform(c, !1, void 0, !0))
							: ((c = e.GetSocketTransform(o, 0)),
								t.K2_SetActorLocationAndRotation(
									c.TransformPosition(s),
									c.TransformRotation(i.Quaternion()).Rotator(),
									!1,
									void 0,
									!0,
								),
								t.SetActorScale3D(r)),
						t.SetActorHiddenInGame(!this.lHs));
				},
				c,
			)),
			EffectSystem_1.EffectSystem.IsValid(t) && this.Clo.push(t),
			t
		);
	}
	PlayEffectByAnsContext(t) {
		var e;
		this.MBr.has(t) ||
			t.PlayOnEnd ||
			((e = this.PlayEffectByPath(
				t.EffectPath,
				t.MeshComponent,
				t.Socket,
				t.Attached,
				t.AttachLocationOnly,
				t.Location,
				t.Rotation,
				t.Scale,
			)),
			this.MBr.set(t, e));
	}
	StopEffectByAnsContext(t) {
		var e;
		t.PlayOnEnd
			? this.PlayEffectByPath(
					t.EffectPath,
					t.MeshComponent,
					t.Socket,
					t.Attached,
					t.AttachLocationOnly,
					t.Location,
					t.Rotation,
					t.Scale,
				)
			: (e = this.MBr.get(t)) && (this.StopEffect(e), this.MBr.delete(t));
	}
	AttachEffect(t) {
		this.Clo.push(t);
	}
	DestroyAllEffect() {
		this.Clo &&
			0 !== this.Clo.length &&
			(this.Clo.forEach((t) => {
				EffectSystem_1.EffectSystem.IsValid(t) &&
					EffectSystem_1.EffectSystem.StopEffectById(
						t,
						"[RoleAnimStateEffectManager.RecycleEffect]",
						!0,
					);
			}),
			(this.Clo.length = 0),
			this.MBr.clear());
	}
	SetAllEffectShowState(t) {
		this.Clo.forEach((e) => {
			(e = EffectSystem_1.EffectSystem.GetEffectActor(e)) &&
				e.SetActorHiddenInGame(!t);
		});
	}
	StopEffect(t) {
		EffectSystem_1.EffectSystem.IsValid(t) &&
			EffectSystem_1.EffectSystem.StopEffectById(
				t,
				"[RoleAnimStateEffectManager.StopEffect]",
				!0,
			);
	}
};
(UiModelEffectComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(4)],
	UiModelEffectComponent,
)),
	(exports.UiModelEffectComponent = UiModelEffectComponent);
