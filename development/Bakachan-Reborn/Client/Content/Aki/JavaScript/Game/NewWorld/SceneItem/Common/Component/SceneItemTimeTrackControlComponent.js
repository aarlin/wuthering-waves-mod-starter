"use strict";
var SceneItemTimeTrackControlComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, i) {
			var o,
				s = arguments.length,
				r =
					s < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(e, t, n, i);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(o = e[a]) &&
						(r = (s < 3 ? o(r) : 3 < s ? o(t, n, r) : o(t, n)) || r);
			return 3 < s && r && Object.defineProperty(t, n, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemTimeTrackControlComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LevelGameplayActionsDefine_1 = require("../../../../LevelGamePlay/LevelGameplayActionsDefine"),
	performSeqTagId = -1438951185;
let SceneItemTimeTrackControlComponent =
	(SceneItemTimeTrackControlComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.mBe = void 0),
				(this.B_n = void 0),
				(this.b_n = void 0),
				(this.q_n = 0),
				(this.G_n = () => {
					var e =
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1438951185);
					this.Hte &&
						this.Lie &&
						e &&
						(2 === this.mBe.State
							? this.Lie.HasTag(-1438951185) ||
								(this.Lie.AddTag(-1438951185),
								this.Hte.SetActiveTagSequencePlaybackProgress(e, this.q_n),
								this.Hte.PauseActiveTagSequence(e))
							: this.Lie.HasTag(-1438951185) &&
								((this.q_n =
									this.Hte.GetActiveTagSequencePlaybackProgress(e) ?? 0),
								this.Hte.PauseActiveTagSequence(e)));
				});
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemTimeTrackControlComponent_1)[0]),
				(this.B_n = e.ControlGroups),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				(this.Lie = this.Entity.GetComponent(185)),
				(this.mBe = this.Entity.GetComponent(117)),
				!0
			);
		}
		OnActivate() {
			var e = this.Entity.GetComponent(178);
			if (e) {
				var t = e.GetInteractController();
				if (t) {
					let e = 0;
					for (const n of this.B_n) this.N_n(t, e, n), e++;
					EventSystem_1.EventSystem.HasWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.G_n,
					) ||
						EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnSceneItemStateChange,
							this.G_n,
						),
						0 !== this.mBe.State && this.G_n();
				}
			}
			return !0;
		}
		OnEnd() {
			return (
				this.b_n?.Valid() &&
					(TimerSystem_1.TimerSystem.Remove(this.b_n), (this.b_n = void 0)),
				this.Lie?.HasTag(-1438951185) && this.Lie.RemoveTag(-1438951185),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.G_n,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.G_n,
					),
				!0
			);
		}
		GetTimeTrackControlConfig(e) {
			if (!(this.B_n.length < e)) return this.B_n[e];
		}
		N_n(e, t, n) {
			var i = new LevelGameplayActionsDefine_1.ActionTimeTrackControl(),
				o =
					((i.ConfigIndex = t),
					(i.EntityId = this.Entity.GetComponent(0).GetCreatureDataId()),
					e.GetInteractiveOption());
			e.AddClientInteractOption(
				i,
				n.Condition,
				o ? o.DoIntactType : "Direct",
				void 0,
				this.B_n[t].TidContent,
			);
		}
		GetTargetActions(e) {
			if (e) {
				let t;
				for (const n of this.B_n[e.qCs].ControlPointEvents)
					if (n.Index === e.GCs) {
						t = n;
						break;
					}
				if (t) {
					let n;
					switch (e.OCs) {
						case Protocol_1.Aki.Protocol.mBs.Proto_LeftIn:
							n = t.LeftInEventActions;
							break;
						case Protocol_1.Aki.Protocol.mBs.Proto_LeftOut:
							n = t.LeftOutEventActions;
							break;
						case Protocol_1.Aki.Protocol.mBs.Proto_RightIn:
							n = t.RightInEventActions;
							break;
						case Protocol_1.Aki.Protocol.mBs.Proto_RightOut:
							n = t.RightOutEventActions;
					}
					return n;
				}
			}
		}
		PlayActiveSeqForDuration(e, t) {
			const n =
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1438951185);
			this.Hte &&
				this.Lie &&
				n &&
				(void 0 === this.Hte.GetActiveTagSequencePlaybackProgress(n) &&
					(this.Lie.HasTag(-1438951185) && this.Lie.RemoveTag(-1438951185),
					this.Lie.AddTag(-1438951185),
					this.Hte.SetActiveTagSequencePlaybackProgress(n, this.q_n),
					this.Hte.PauseActiveTagSequence(n)),
				this.b_n?.Valid() &&
					(TimerSystem_1.TimerSystem.Remove(this.b_n), (this.b_n = void 0)),
				0 !== t) &&
				(this.Hte.ResumeActiveTagSequence(n, e), 0 < t) &&
				(this.b_n = TimerSystem_1.TimerSystem.Delay(() => {
					this.Hte?.PauseActiveTagSequence(n), (this.b_n = void 0);
				}, t * CommonDefine_1.MILLIONSECOND_PER_SECOND));
		}
	});
(SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(118)],
		SceneItemTimeTrackControlComponent,
	)),
	(exports.SceneItemTimeTrackControlComponent =
		SceneItemTimeTrackControlComponent);
