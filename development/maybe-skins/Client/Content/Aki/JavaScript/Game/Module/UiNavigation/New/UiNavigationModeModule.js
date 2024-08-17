"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationModeModule = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class UiNavigationModeModule {
	constructor(o) {
		(this.FPo = void 0),
			(this.Bwo = MathUtils_1.MathUtils.SmallNumber),
			(this.FPo = o),
			(this.Bwo =
				ConfigManager_1.ConfigManager.UiNavigationConfig.GetNavigateTolerance());
	}
	bwo(o, e, t) {
		var i = t.GetRootComponent().GetLocalSpaceCenter(),
			a = t.GetRootComponent().GetLocalSpaceLeftBottomPoint();
		t = t.GetRootComponent().GetLocalSpaceRightTopPoint();
		if (e) {
			if ((e = i.X - o.X) < a.X || e > t.X) return !1;
		} else if ((e = i.Y - o.Z) < a.Y || e > t.Y) return !1;
		return !0;
	}
	qwo(o, e) {
		return (
			(Math.abs(o - e) < MathUtils_1.MathUtils.KindaSmallNumber &&
				(UiNavigationModeModule.Gwo.X < 0 ||
					0 < UiNavigationModeModule.Gwo.Z)) ||
			e - o >= MathUtils_1.MathUtils.KindaSmallNumber
		);
	}
	Nwo(o, e, t, i) {
		var a = this.Owo(this.FPo);
		let r,
			n,
			s = 0,
			l = Number.MAX_VALUE,
			M = Number.MAX_VALUE,
			d = !1,
			h = 0,
			c = Number.MIN_VALUE;
		var u = Vector_1.Vector.Create(),
			v = Vector_1.Vector.Create();
		for (let e = 0, F = o.Num(); e < F; ++e) {
			var G = o.Get(e);
			if (G.GetNavigationComponent().CheckFindOpposite(this.FPo)) {
				this.Owo(G).Subtraction(a, u);
				var w = u.Size(),
					N =
						(v.DeepCopy(u),
						v.Normalize(),
						Vector_1.Vector.DotProduct(UiNavigationModeModule.Gwo, v));
				if (
					!MathUtils_1.MathUtils.IsNearlyEqual(
						N,
						0,
						MathUtils_1.MathUtils.KindaSmallNumber,
					)
				)
					if (0 < N) {
						var g = i ? Math.abs(u.Z) : Math.abs(u.X),
							U = MathUtils_1.MathUtils.IsNearlyEqual(N, 1, this.Bwo),
							m = MathUtils_1.MathUtils.IsNearlyEqual(s, 1, this.Bwo);
						let o = !1,
							e = !1;
						switch (t) {
							case 1:
								U && w < l && (o = !0);
								break;
							case 0:
								(e = this.bwo(u, i, G)) && d
									? MathUtils_1.MathUtils.IsNearlyEqual(g, M, 1)
										? this.qwo(w, l) && (o = !0)
										: g < M && (o = !0)
									: this.qwo(w, l) && (o = !0);
								break;
							case 2:
								U ? (!m || w < l) && (o = !0) : !m && w < l && (o = !0);
						}
						o && ((s = N), (l = w), (r = G), (M = g), (d = e));
					} else {
						var C = MathUtils_1.MathUtils.IsNearlyEqual(N, -1),
							p = MathUtils_1.MathUtils.IsNearlyEqual(h, -1);
						C
							? (!p || w > c) && ((h = N), (c = w), (n = G))
							: !p &&
								((!(C = MathUtils_1.MathUtils.IsNearlyEqual(N, h)) && N < h) ||
									(C && w > c)) &&
								((h = N), (c = w), (n = G));
					}
			}
		}
		return MathUtils_1.MathUtils.IsNearlyEqual(s, 0)
			? this.FPo.HasDynamicScrollView() || 1 !== e
				? void 0
				: n?.GetSelectableComponent()
			: r?.GetSelectableComponent();
	}
	kwo(o, e, t) {
		let i;
		var a;
		return (
			(i = this.FPo.HasLoopScrollView()
				? this.FPo.ScrollView.FindNavigationComponent(
						this.FPo.GetSelectableComponent(),
						UiNavigationModeModule.Gwo.ToUeVector(),
						o,
					)
				: i) ||
				((a = this.FPo.GetNavigationGroup()?.ListenerList),
				(i = this.Nwo(a, o, e, t))),
			!i && this.FPo.HasDynamicScrollView() && this.Kqn(this.FPo, t),
			i
		);
	}
	Kqn(o, e) {
		(o = o.ScrollView).Vertical === e &&
			(e
				? ((e = UiNavigationModeModule.Gwo.Z < 0), o.ScrollItemIndex(!e))
				: ((e = 0 < UiNavigationModeModule.Gwo.X), o.ScrollItemIndex(!e)),
			ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove());
	}
	Fwo() {
		if (this.FPo.HasLoopScrollView()) {
			UiNavigationModeModule.Gwo.Set(1, 0, 0);
			var o = this.FPo.ScrollView.FindNavigationComponent(
				this.FPo.GetSelectableComponent(),
				UiNavigationModeModule.Gwo.ToUeVector(),
				2,
			);
			if (o) return o;
		}
		var e = this.FPo.GetNavigationGroup()?.ListenerList,
			t = e.Num();
		if (t <= 0) return this.FPo.GetSelectableComponent();
		var i = e.FindIndex(this.FPo);
		if (-1 !== i) {
			for (let o = i + 1; o < t; o++) {
				var a = e.Get(o);
				if (a.IsCanFocus()) return a.GetSelectableComponent();
			}
			if (!this.FPo?.HasDynamicScrollView())
				for (let o = 0; o < i; o++) {
					var r = e.Get(o);
					if (r.IsCanFocus()) return r.GetSelectableComponent();
				}
		}
	}
	Vwo() {
		if (
			this.FPo.HasLoopScrollView() &&
			(UiNavigationModeModule.Gwo.Set(-1, 0, 0),
			(o = this.FPo.ScrollView.FindNavigationComponent(
				this.FPo.GetSelectableComponent(),
				UiNavigationModeModule.Gwo.ToUeVector(),
				2,
			)))
		)
			return o;
		var o,
			e = this.FPo.GetNavigationGroup()?.ListenerList;
		if ((o = e.Num()) <= 0) return this.FPo.GetSelectableComponent();
		var t = e.FindIndex(this.FPo);
		if (-1 !== t) {
			for (let o = t - 1; 0 <= o; o--) {
				var i = e.Get(o);
				if (i.IsCanFocus()) return i.GetSelectableComponent();
			}
			if (!this.FPo?.HasDynamicScrollView())
				for (let i = o - 1; i > t; i--) {
					var a = e.Get(i);
					if (a.IsCanFocus()) return a.GetSelectableComponent();
				}
		}
	}
	Hwo(o) {
		if (
			Math.abs(UiNavigationModeModule.Gwo.X) >=
			Math.abs(UiNavigationModeModule.Gwo.Z)
		)
			switch (o.HorizontalWrapMode) {
				case 2:
					return 0 < UiNavigationModeModule.Gwo.X ? this.Fwo() : this.Vwo();
				case 0:
				case 1:
					return (
						UiNavigationModeModule.Gwo.Set(
							Math.sign(UiNavigationModeModule.Gwo.X),
							0,
							0,
						),
						this.kwo(o.HorizontalWrapMode, o.HorizontalPriorityMode, !1)
					);
				default:
					return;
			}
		else
			switch (o.VerticalWrapMode) {
				case 2:
					return UiNavigationModeModule.Gwo.Z < 0 ? this.Fwo() : this.Vwo();
				case 0:
				case 1:
					return (
						UiNavigationModeModule.Gwo.Set(
							0,
							0,
							Math.sign(UiNavigationModeModule.Gwo.Z),
						),
						this.kwo(o.VerticalWrapMode, o.VerticalPriorityMode, !0)
					);
				default:
					return;
			}
	}
	jwo(o) {
		return 3 === o
			? this.FPo.NavigationMode.TopActor
			: 4 === o
				? this.FPo.NavigationMode.DownActor
				: 1 === o
					? this.FPo.NavigationMode.LeftActor
					: 2 === o
						? this.FPo.NavigationMode.RightActor
						: void 0;
	}
	Wwo(o) {
		return 3 === o
			? this.FPo.NavigationMode.TopMode
			: 4 === o
				? this.FPo.NavigationMode.DownMode
				: 1 === o
					? this.FPo.NavigationMode.LeftMode
					: 2 === o
						? this.FPo.NavigationMode.RightMode
						: void 0;
	}
	Kwo(o) {
		var e;
		3 === o &&
			((e = this.FPo.GetRootComponent().GetRightVector()),
			UiNavigationModeModule.Gwo.Set(e.X, e.Y, e.Z)),
			4 === o &&
				((e = this.FPo.GetRootComponent().GetRightVector()),
				UiNavigationModeModule.Gwo.Set(-e.X, -e.Y, -e.Z)),
			1 === o &&
				((e = this.FPo.GetRootComponent().GetForwardVector()),
				UiNavigationModeModule.Gwo.Set(-e.X, -e.Y, -e.Z)),
			2 === o &&
				((e = this.FPo.GetRootComponent().GetForwardVector()),
				UiNavigationModeModule.Gwo.Set(e.X, e.Y, e.Z));
	}
	Qwo() {
		var o = this.FPo.RootUIComp;
		if (o) {
			var e = o.GetRenderCanvas();
			if (void 0 !== e && void 0 !== e.GetRootCanvas())
				return o.IsScreenSpaceOverlayUI()
					? ((e = o.GetRootCanvas().GetOwner().RootComponent), this.Xwo(e))
					: this.Xwo(void 0);
		}
	}
	Xwo(o) {
		UiNavigationModeModule.Gwo.Normalize(0);
		var e = this.FPo.GetNavigationGroup();
		if (e) return this.Hwo(e);
		var t = this.Owo(this.FPo);
		let i = Number.MIN_VALUE,
			a = this.FPo.GetSelectableComponent();
		var r = UE.LGUIBPLibrary.GetComponentsInChildren(
			o.GetOwner(),
			UE.TsUiNavigationBehaviorListener_C.StaticClass(),
			!1,
		);
		for (let o = 0, e = r.Num(); o < e; ++o) {
			var n,
				s,
				l = r.Get(o);
			l.GroupName === this.FPo.GroupName &&
				l.IsCanFocus() &&
				((n = this.Owo(l)).Subtraction(t, n),
				(s = Vector_1.Vector.DotProduct(UiNavigationModeModule.Gwo, n)) <=
					0.1 ||
					((s /= n.SizeSquared()) > i &&
						((i = s), (a = l.GetSelectableComponent()))));
		}
		return a;
	}
	Owo(o) {
		var e = o.GetRootComponent().GetLocalSpaceCenter();
		e = Vector_1.Vector.Create(e.X, e.Y, 0);
		return (
			Transform_1.Transform.Create(
				o.GetRootSceneComponent().K2_GetComponentToWorld(),
			).TransformPosition(e, e),
			e
		);
	}
	FindActorByDirection(o, e = !0) {
		var t,
			i = this.Wwo(o);
		return 2 === i
			? ((t = this.FPo.RootUIComp),
				e && !t.IsUIActiveInHierarchy()
					? void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"UiNavigation",
								11,
								"当前选中的导航监听组件按钮不可视",
								["DisplayName", t.displayName],
							)
						)
					: (e = this.jwo(o).GetComponentByClass(
								UE.TsUiNavigationBehaviorListener_C.StaticClass(),
							)) && !e.IsCanFocus()
						? e.ModeModule?.FindActorByDirection(o, !1)
						: e.GetBehaviorComponent().GetRootSceneComponent())
			: 1 === i
				? (this.Kwo(o), this.Qwo()?.GetRootSceneComponent())
				: void 0;
	}
}
(exports.UiNavigationModeModule = UiNavigationModeModule).Gwo =
	Vector_1.Vector.Create();
