"use strict";
var SceneItemResetSelfPositionComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, i, n) {
			var o,
				s = arguments.length,
				r =
					s < 3
						? t
						: null === n
							? (n = Object.getOwnPropertyDescriptor(t, i))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(e, t, i, n);
			else
				for (var m = e.length - 1; 0 <= m; m--)
					(o = e[m]) &&
						(r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
			return 3 < s && r && Object.defineProperty(t, i, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemResetSelfPositionComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	TICK_CHECK_INTERVAL = 500,
	FIX_DELAY = 0.35;
let SceneItemResetSelfPositionComponent =
	(SceneItemResetSelfPositionComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Hte = void 0),
				(this.HMn = 0),
				(this.j6 = 0),
				(this.jMn = !0),
				(this.WMn = void 0),
				(this.KMn = !1),
				(this.TDe = void 0),
				(this.LDe = void 0),
				(this.QMn = (e, t) => {
					this.Hte.IsMoveAutonomousProxy &&
						((!this.XMn(e) && "BeDropping" !== e) ||
							this.KMn ||
							(this.$Mn(
								"[SceneItemResetSelfPositionComponent] 结束被当前主控移动，停止检查距离Tick",
							),
							this.YMn()),
						"BeDrawing" === t && this.JMn(),
						this.Lo?.IsDisableResetPosAfterThrow &&
							this.XMn(t) &&
							(this.$Mn(
								"[SceneItemResetSelfPositionComponent] 被控物配置丢出时停止检测",
							),
							(this.KMn = !0)),
						this.Lo?.IsResetPosAfterThrow &&
							"BeDropping" === t &&
							(void 0 !== this.TDe &&
								(TimerSystem_1.TimerSystem.Remove(this.TDe),
								(this.TDe = void 0)),
							(this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
								(this.TDe = void 0), this.zMn("ResetPositionTip2");
							}, 0.35 * TimeUtil_1.TimeUtil.InverseMillisecond))),
						void 0 !== this.Lo?.ResetPosDelayTime) &&
						"BeCastingFree" === t &&
						(void 0 !== this.TDe &&
							(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
						(this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
							(this.TDe = void 0), this.zMn(void 0);
						}, this.Lo.ResetPosDelayTime *
							TimeUtil_1.TimeUtil.InverseMillisecond)));
				});
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemResetSelfPositionComponent_1)[0]),
				(this.Lo = e),
				(this.HMn = this.Lo.ResetRadius * this.Lo.ResetRadius),
				(this.j6 = 500),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.CheckGetComponent(182)),
				this.Entity.CheckGetComponent(140)
					? (this.$Mn(
							"[SceneItemResetSelfPositionComponent] 初始关闭检查距离Tick",
						),
						EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnManipulatableItemStateModified,
							this.QMn,
						),
						!0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"[SceneItemResetSelfPositionComponent] OnStart失败，实体不是可被控物",
								["PbDataID", this.Hte.CreatureData.GetPbDataId()],
							),
						!1)
			);
		}
		OnActivate() {
			this.LDe = TimerSystem_1.TimerSystem.Forever(() => {
				this.YMn();
			}, this.j6);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnManipulatableItemStateModified,
					this.QMn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnManipulatableItemStateModified,
						this.QMn,
					),
				void 0 !== this.LDe &&
					(TimerSystem_1.TimerSystem.Remove(this.LDe), (this.LDe = void 0)),
				!0
			);
		}
		JMn() {
			this.ZMn() || this.LDe?.Resume();
		}
		$Mn(e) {
			this.ZMn() && this.LDe?.Pause();
		}
		ZMn() {
			return !this.LDe?.IsPause() ?? !1;
		}
		YMn() {
			var e = this.jMn;
			!this.eSn() && e && this.zMn(void 0);
		}
		eSn() {
			var e,
				t = this.Hte.ActorLocationProxy;
			return (
				t !== this.WMn &&
					((this.WMn = Vector_1.Vector.Create(t)),
					(e = this.Hte.CreatureData.GetInitLocation())) &&
					((e = Vector_1.Vector.Create(e)),
					(this.jMn = Vector_1.Vector.DistSquared(e, t) <= this.HMn)),
				this.jMn
			);
		}
		zMn(e) {
			void 0 !== this.TDe &&
				(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
				LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
					this.Entity,
					e,
					0,
					!0,
				);
		}
		XMn(e) {
			return (
				"BeCastingToTarget" === e ||
				"BeCastingToOutlet" === e ||
				"BeCastingFree" === e
			);
		}
	});
(SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(149)],
		SceneItemResetSelfPositionComponent,
	)),
	(exports.SceneItemResetSelfPositionComponent =
		SceneItemResetSelfPositionComponent);
