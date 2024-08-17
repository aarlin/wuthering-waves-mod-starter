"use strict";
var SceneItemNearbyTrackingComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, i) {
			var r,
				o = arguments.length,
				s =
					o < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, n, i);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(r = e[a]) &&
						(s = (o < 3 ? r(s) : 3 < o ? r(t, n, s) : r(t, n)) || s);
			return 3 < o && s && Object.defineProperty(t, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemNearbyTrackingComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
let SceneItemNearbyTrackingComponent =
	(SceneItemNearbyTrackingComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Qvn = !1),
				(this.Xvn = void 0),
				(this.Xte = void 0),
				(this.S9 = void 0),
				(this.$vn = void 0),
				(this.Yvn = void 0),
				(this.e_n = (e) => {
					this.Xte && this.Jvn(e);
				}),
				(this.zvn = () => {
					this.Lo?.IsEnbaleWhileHoming &&
						"Icon" === this.Xvn?.Type &&
						this.Xvn.Duration &&
						((this.EnableTracking = !0),
						this.$vn &&
							TimerSystem_1.TimerSystem.Has(this.$vn) &&
							(TimerSystem_1.TimerSystem.Remove(this.$vn), (this.$vn = void 0)),
						(this.$vn = TimerSystem_1.TimerSystem.Delay(() => {
							this.EnableTracking = !1;
						}, this.Xvn.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND)));
				});
		}
		get ShowRange() {
			return "Icon" === this.Xvn?.Type
				? this.Xvn.ShowRange
				: this.Xvn?.FarRadius;
		}
		get HideRange() {
			return "Icon" === this.Xvn?.Type
				? this.Xvn.HideRange
				: this.Xvn?.FarRadius;
		}
		get IconOffset() {
			return this.Yvn;
		}
		get EnableTracking() {
			return this.Qvn;
		}
		set EnableTracking(e) {
			(this.Qvn = e),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnUpdateNearbyEnable,
					e,
				),
				e ||
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RemoveNearbyTrack,
						this.Entity,
					);
		}
		get IconPath() {
			if ("Icon" === this.Xvn?.Type) return this.b$i(this.Xvn.TexturePath);
		}
		get TrackType() {
			return this.S9;
		}
		get AudioPointNearRadius() {
			if ("AudioPoint" === this.Xvn?.Type) return this.Xvn.NearRadius;
		}
		get AudioPointMiddleRadius() {
			if ("AudioPoint" === this.Xvn?.Type) return this.Xvn.MiddleRadius;
		}
		get AudioPointFarRadius() {
			if ("AudioPoint" === this.Xvn?.Type) return this.Xvn.FarRadius;
		}
		OnInitData(e) {
			e = e.GetParam(SceneItemNearbyTrackingComponent_1)[0];
			var t = this.Entity.GetComponent(0);
			return (
				(this.Qvn = t.GetTrackingIsEnable()),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						32,
						"[NearbyTracking OnCreate]",
						["EntityId", t.GetPbDataId()],
						["IsEnableValue", this.Qvn],
					),
				(this.Lo = e),
				(this.Xvn = e.TrackingType),
				(this.S9 = this.Zvn(this.Xvn)),
				void 0 !== this.S9 ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							40,
							"组件OnCreate失败，追踪类型无法确定",
							["EntityId", t.GetPbDataId()],
						),
					!1)
			);
		}
		OnStart() {
			return (
				this.Lo?.IsEnableWhileUnlock &&
					!this.Lo?.IsEnable &&
					((this.Xte = this.Entity?.GetComponent(177)),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemLockPropChange,
						this.e_n,
					)),
				this.Lo?.IsEnbaleWhileHoming &&
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnManipulatedItemPosReset,
						this.zvn,
					),
				!0
			);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemLockPropChange,
					this.e_n,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemLockPropChange,
						this.e_n,
					),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnManipulatedItemPosReset,
					this.zvn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnManipulatedItemPosReset,
						this.zvn,
					),
				this.$vn &&
					TimerSystem_1.TimerSystem.Has(this.$vn) &&
					(TimerSystem_1.TimerSystem.Remove(this.$vn), (this.$vn = void 0)),
				!0
			);
		}
		Zvn(e) {
			return "Icon" === e?.Type
				? ((this.Yvn = Vector_1.Vector.Create(0, 0, 0)),
					e.UiOffset && this.Yvn.Set(e.UiOffset.X, e.UiOffset.Y, e.UiOffset.Z),
					0)
				: "AudioPoint" === e?.Type
					? 1
					: void 0;
		}
		b$i(e) {
			if (
				(e =
					GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
						"ENearbyTrackingTexture." + e,
					))
			)
				return e.Value;
		}
		Jvn(e) {
			this.EnableTracking = !e;
		}
	});
(SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(144)],
		SceneItemNearbyTrackingComponent,
	)),
	(exports.SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent);
