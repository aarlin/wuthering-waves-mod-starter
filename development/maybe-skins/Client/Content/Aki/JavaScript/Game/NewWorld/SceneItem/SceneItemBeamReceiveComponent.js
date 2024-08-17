"use strict";
var SceneItemBeamReceiveComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, i, n) {
			var o,
				a = arguments.length,
				s =
					a < 3
						? t
						: null === n
							? (n = Object.getOwnPropertyDescriptor(t, i))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, i, n);
			else
				for (var r = e.length - 1; 0 <= r; r--)
					(o = e[r]) &&
						(s = (a < 3 ? o(s) : 3 < a ? o(t, i, s) : o(t, i)) || s);
			return 3 < a && s && Object.defineProperty(t, i, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemBeamReceiveComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine"),
	castingPerformTag = -308662637,
	stopCastingPerformTag = -1101371633;
let SceneItemBeamReceiveComponent =
	(SceneItemBeamReceiveComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.SIe = void 0),
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.fdn = 0),
				(this.pdn = 0),
				(this.vdn = void 0),
				(this.Mdn = (e) => {
					var t = this.SIe.GetEntityOnlineInteractType();
					LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
						t,
					) &&
						1 !== this.fdn &&
						((this.fdn = 1),
						this.Sdn(1),
						this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_BeginAction),
						0 === this.pdn
							? this.ydn(e)
							: (this.vdn && TimerSystem_1.TimerSystem.Has(this.vdn)) ||
								(this.vdn = TimerSystem_1.TimerSystem.Delay(() => {
									this.ydn(e);
								}, this.pdn)));
				}),
				(this.Idn = (e) => {
					var t = this.SIe.GetEntityOnlineInteractType();
					LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
						t,
					) &&
						0 !== this.fdn &&
						((this.fdn = 0),
						this.Sdn(0),
						this.vdn &&
							TimerSystem_1.TimerSystem.Has(this.vdn) &&
							TimerSystem_1.TimerSystem.Remove(this.vdn),
						(this.vdn = void 0),
						this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_StopAction));
				}),
				(this.ydn = (e) => {
					var t = this.SIe.GetEntityOnlineInteractType();
					LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
						t,
					) &&
						2 !== this.fdn &&
						((this.fdn = 2),
						this.Sdn(2),
						this.vdn &&
							TimerSystem_1.TimerSystem.Has(this.vdn) &&
							TimerSystem_1.TimerSystem.Remove(this.vdn),
						(this.vdn = void 0),
						this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_CompleteAction));
				});
		}
		OnInitData(e) {
			return (
				(this.SIe = this.Entity.GetComponent(0)),
				(e = e.GetParam(SceneItemBeamReceiveComponent_1)[0])
					? ((this.Lo = e),
						(this.pdn =
							this.Lo.Duration * BattleUiDefine_1.SECOND_TO_MILLISECOND),
						!0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"[BeamReceiveComp] 组件配置缺失",
								["PbDataId", this.SIe?.GetPbDataId()],
							),
						!1)
			);
		}
		OnActivate() {
			(this.Hte = this.Entity.GetComponent(182)),
				(this.Lie = this.Entity.GetComponent(177)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BeamCastStart,
					this.Mdn,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BeamCastStop,
					this.Idn,
				);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BeamCastStart,
					this.Mdn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.BeamCastStart,
						this.Mdn,
					),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BeamCastStop,
					this.Idn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.BeamCastStop,
						this.Idn,
					),
				!0
			);
		}
		Sdn(e) {
			switch (e) {
				case 0:
					this.Lie?.HasTag(-308662637) && this.Lie?.RemoveTag(-308662637),
						this.Lie?.HasTag(-1101371633) || this.Lie?.AddTag(-1101371633),
						this.Hte?.SetActiveTagSequencePlaybackProgress(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								-308662637,
							),
							1,
						);
					break;
				case 1:
					this.Lie?.HasTag(-1101371633) && this.Lie?.RemoveTag(-1101371633),
						this.Lie?.HasTag(-308662637) || this.Lie?.AddTag(-308662637),
						this.Hte?.SetActiveTagSequenceDurationTime(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								-308662637,
							),
							this.Lo.Duration,
						),
						this.Hte?.SetActiveTagSequencePlaybackProgress(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								-308662637,
							),
							0,
						);
					break;
				case 2:
					this.Hte?.SetActiveTagSequencePlaybackProgress(
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-308662637),
						1,
					),
						this.Lie?.HasTag(-308662637) && this.Lie?.RemoveTag(-308662637),
						this.Lie?.HasTag(-1101371633) && this.Lie?.RemoveTag(-1101371633);
			}
		}
		Edn(e) {
			var t = Protocol_1.Aki.Protocol.dds.create();
			(t.rkn = this.SIe.GetCreatureDataId()),
				(t.AFn = e),
				Net_1.Net.Call(1508, t, (t) => {
					t?.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"SceneItem",
							40,
							"[BeamReceiveComp] 请求执行光线接收行为出错",
							["PbDataId", this.SIe?.GetPbDataId()],
							["CreatureDataId", this.SIe?.GetCreatureDataId()],
							["EntityBeamReceiveType", e],
							["Response", t],
						);
				});
		}
		GetBeamReceiveActions(e) {
			switch (e) {
				case Protocol_1.Aki.Protocol.CBs.Proto_BeginAction:
					return this.Lo?.BeginActions;
				case Protocol_1.Aki.Protocol.CBs.Proto_CompleteAction:
					return this.Lo?.CompleteActions;
				case Protocol_1.Aki.Protocol.CBs.Proto_StopAction:
					return this.Lo?.StopActions;
				default:
					return;
			}
		}
	});
(SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(190)],
		SceneItemBeamReceiveComponent,
	)),
	(exports.SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent);
