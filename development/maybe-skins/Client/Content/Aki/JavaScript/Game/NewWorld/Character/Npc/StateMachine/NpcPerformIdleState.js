"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformIdleState = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	AiAlertById_1 = require("../../../../../Core/Define/ConfigQuery/AiAlertById"),
	AiSenseById_1 = require("../../../../../Core/Define/ConfigQuery/AiSenseById"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent"),
	IDLE_MONTAGE_CD_MIN = 2,
	IDLE_MONTAGE_CD_MAX = 4,
	INITIAL_IDLE_MONTAGE_CD_MIN = 0,
	INITIAL_IDLE_MONTAGE_CD_MAX = 10,
	IMMEDIATE_PLAY_PROBABILITY = 0.1,
	ALERT_TURN_SPEED = 2e4;
class NpcPerformIdleState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.Mne = 0),
			(this.HZo = !1),
			(this.jZo = -0),
			(this.WZo = -0),
			(this.KZo = -0),
			(this.QZo = -0),
			(this.b7s = !1),
			(this.XZo = !1),
			(this.$Zo = !1),
			(this.GTe = void 0),
			(this.YZo = void 0),
			(this.JZo = void 0),
			(this.zZo = -0),
			(this.ZZo = -0),
			(this.eer = void 0),
			(this.ter = IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly),
			(this.ier = 0),
			(this.oer = !1),
			(this.rer = !1),
			(this.ner = !1),
			(this.ser = void 0),
			(this.aer = void 0),
			(this.her = void 0),
			(this.ler = !1),
			(this.i4s = 0),
			(this._er = !1),
			(this.uer = void 0),
			(this.awn = void 0),
			(this.mer = (t, e) => {
				t === this.YZo &&
					(this.ser.RemoveOnMontageEnded(this.mer),
					(this.HZo = !0),
					(this.b7s = !1),
					(this.XZo = !1),
					(this.YZo = void 0),
					(this.JZo = void 0),
					(this.oer = !1),
					this.der(),
					(this.Owner.Entity.GetComponent(168).AnyIdleLoopMontagePlaying = !1));
			}),
			(this.Cer = !1),
			(this.ger = !1),
			(this.fer = !1),
			(this.per = void 0),
			(this.ver = !1),
			(this.OnLoopMontageEndForTurning = (t, e) => {
				var i = this.Owner.Entity.GetComponent(0);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						51,
						"[NpcPerformIdleState.OnLoopMontageEndForTurning][交互转身] Montage播放完毕",
						["PbDataID", i?.GetPbDataId()],
					),
					this.ser?.RemoveOnMontageEnded(this.OnLoopMontageEndForTurning),
					this.uer.TurnToInteractTarget();
			}),
			(this.Mer = () => {
				this.StateMachine.Switch(2);
			}),
			(this.Ser = () => {
				var t, e;
				this.XZo && this.Eer(),
					this.Owner.Entity.GetComponent(168)?.PauseAi("StalkAlert"),
					(this.fer = !0),
					Global_1.Global.BaseCharacter &&
						((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
						(e = this.Owner.Entity.GetComponent(3)),
						AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
							e,
							t.ActorLocationProxy,
							2e4,
						));
			}),
			(this.VZo = () => {
				this.XZo && this.Eer(),
					this.Owner.Entity.GetComponent(168)?.ResumeAi("StalkAlert"),
					(this.fer = !1);
			}),
			(this.xZt = () => {
				this.XZo && this.Eer(),
					this.Owner.Entity?.GetComponent(168)?.ResumeAi("LeaveLogicRange"),
					(this.fer = !1);
			}),
			(this.yer = () => {
				this.Owner.Entity?.GetComponent(168)?.PauseAi("LeaveLogicRange"),
					(this.fer = !0);
			});
	}
	get NpcMontageController() {
		return this.ser;
	}
	set NpcMontageController(t) {
		this.ser = t;
	}
	get NpcTurnActionController() {
		return this.uer;
	}
	set NpcTurnActionController(t) {
		this.uer = t;
	}
	get NpcMoveComp() {
		return this.awn;
	}
	set NpcMoveComp(t) {
		this.awn = t;
	}
	OnCreate(t) {
		if (
			((this.Mne = this.Owner.Entity.GetComponent(0).GetPbDataId()),
			t?.ShowOnStandby)
		)
			if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Loop)
				(this.$Zo = !0), (this.GTe = t.ShowOnStandby.Montage);
			else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Sit)
				(this.$Zo = !0),
					(this.GTe = t.ShowOnStandby.Montage),
					(this.aer = t.ShowOnStandby.PosEntityId);
			else {
				this.eer = new Array();
				for (const e of t.ShowOnStandby.Montages) this.eer.push(e);
				(this.ter = t.ShowOnStandby.PlayMode),
					(t = Math.random()),
					(this.rer = t < 0.1);
			}
		else this.ner = !0;
	}
	OnStart() {
		this.Ier(),
			this.Ore(),
			this.ner ||
				this.Owner.Entity.GetComponent(168)?.IsInPlot ||
				this.fer ||
				this.awn?.IsMoving ||
				(this.$Zo
					? ((this.ler = !0), this.Ter(this.GTe))
					: (this.rer
							? (this.jZo = 0)
							: (this.jZo = MathUtils_1.MathUtils.GetRandomRange(0, 10)),
						(this.WZo = Time_1.Time.WorldTimeSeconds)));
	}
	OnEnter(t) {
		var e = this.Owner.Entity.GetComponent(168);
		e?.ResumeAi("NpcPerformIdleState"),
			this.Ore(),
			this.ner ||
				((this.HZo = !0), this.der(), e?.IsInPlot) ||
				this.fer ||
				this.ver ||
				(this.awn?.IsMoving
					? this.XZo && this.Eer()
					: this.$Zo
						? this.Ler(this.GTe)
						: this.b7s &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"NPC",
								30,
								"NPC逻辑状态机切换过快，请联系相关人员检查",
								["ConfigId", this.Mne],
							));
	}
	Der() {
		return Time_1.Time.WorldTimeSeconds > this.KZo + this.QZo;
	}
	OnUpdate(t) {
		this.ner ||
			(this.Rer(), this.r4s(), this.Owner.Entity.GetComponent(168)?.IsInPlot) ||
			this.fer ||
			this.ver ||
			(this.awn?.IsMoving
				? this.XZo && this.Eer()
				: this.$Zo
					? (this.XZo && this.JZo !== this.GTe && this.Eer(),
						!this.b7s && this.Der() && this.Ler(this.GTe))
					: this.XZo
						? Time_1.Time.WorldTimeSeconds > this.ZZo + this.zZo && this.Eer()
						: this.HZo
							? this.Der() && this.Ler()
							: this.rer
								? this.Ter()
								: Time_1.Time.WorldTimeSeconds > this.WZo + this.jZo &&
									this.Ler());
	}
	OnExit(t) {
		this.XZo && this.Eer(),
			this.kre(),
			this.Owner.Entity.GetComponent(168)?.PauseAi("NpcPerformIdleState");
	}
	OnDestroy() {
		this.ser?.RemoveOnMontageEnded(this.mer),
			(this.ser = void 0),
			(this.uer = void 0),
			(this.awn = void 0),
			this.kre();
	}
	Rer() {
		var t, e, i, n, r, o, s;
		this.aer &&
			!this._er &&
			((this.her =
				ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					this.aer,
				)),
			this.her) &&
			(t =
				this.her.Entity.GetComponent(
					178,
				)?.GetSubEntityInteractLogicController()) &&
			t.IsSceneInteractionLoadCompleted() &&
			((this._er = !0),
			(e = this.Owner.Entity),
			t.Possess(e),
			t.IgnoreCollision(),
			(n = (i = e.GetComponent(2)).CreatureData.GetPbDataId()),
			(r = t.GetInteractPoint()),
			(o = i.HalfHeight),
			(r = Vector_1.Vector.Create(r.X, r.Y, r.Z + o)),
			(o = t.GetForwardDirection()),
			(s = Rotator_1.Rotator.Create()),
			o.ToOrientationRotator(s),
			i.SetActorLocationAndRotation(
				r.ToUeVector(),
				s.ToUeRotator(),
				"Npc椅子交互位置修正",
				!1,
			),
			i instanceof CharacterActorComponent_1.CharacterActorComponent &&
				i.SetInputRotator(s),
			e?.GetComponent(98)?.Disable("NPC以坐下出生默认不移动"),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"AI",
				51,
				"[HandleLeisureInteract] 修正坐下位置和朝向",
				["Location", r],
				["Rotation", s],
				["chairPbDataId", this.aer],
				["npcPbDataId", n],
			);
	}
	Uer() {
		if (this.ler) {
			let t;
			(this.ler = !1),
				(t =
					1 ===
					this.Owner.Entity.GetComponent(2).CreatureData.GetSubEntityType()
						? this.Owner.Entity.GetComponent(176)
						: this.Owner.Entity.GetComponent(160)),
				(this.i4s = 3),
				t.StartForceDisableAnimOptimization(4);
		}
	}
	r4s() {
		if (!(this.i4s <= 0) && 0 == --this.i4s) {
			let t;
			(t =
				1 === this.Owner.Entity.GetComponent(2).CreatureData.GetSubEntityType()
					? this.Owner.Entity.GetComponent(176)
					: this.Owner.Entity.GetComponent(
							160,
						)).CancelForceDisableAnimOptimization(4);
		}
	}
	Ter(t) {
		if (!this.b7s) {
			let e = t;
			if (e) {
				if ("Empty" === e) return;
			} else {
				if (
					!(t = this.Aer()) ||
					!t.Montage ||
					"" === t.Montage ||
					"Empty" === t.Montage
				)
					return;
				(e = t.Montage), (this.zZo = t.Time);
			}
			const i = this.Owner.Entity.GetComponent(168);
			(i.AnyIdleLoopMontagePlaying = !0),
				(this.b7s = !0),
				this.ser.LoadAsync(e, (t, e) => {
					this?.Owner?.Valid &&
						(t?.IsValid()
							? (this.ser?.PlayFromLoop(t, this.mer),
								(this.ZZo = Time_1.Time.WorldTimeSeconds),
								(this.YZo = t),
								(this.JZo = e),
								(this.XZo = !0),
								this.Uer(),
								(i.AnyIdleLoopMontagePlaying = !0))
							: ((this.b7s = !1), (i.AnyIdleLoopMontagePlaying = !1)));
				});
		}
	}
	Ler(t) {
		if (!this.b7s) {
			let e = t;
			if (e) {
				if ("Empty" === e) return;
			} else {
				if (
					!(t = this.Aer()) ||
					!t.Montage ||
					"" === t.Montage ||
					"Empty" === t.Montage
				)
					return;
				(e = t.Montage), (this.zZo = t.Time);
			}
			(this.b7s = !0),
				this.ser.LoadAsync(e, (t, e) => {
					this?.Owner?.Valid &&
						(t?.IsValid()
							? (this.ser?.Play(t, this.mer),
								(this.ZZo = Time_1.Time.WorldTimeSeconds),
								(this.YZo = t),
								(this.JZo = e),
								(this.XZo = !0))
							: (this.b7s = !1));
				});
		}
	}
	Eer(t = !1) {
		this.oer || ((this.oer = !0), this.ser?.Stop(t, this.YZo));
	}
	aWo() {
		(this.oer = !0), this.ser?.ForceStop(0.1, this.YZo);
	}
	Per() {
		(this.oer = !0), this.ser?.ForceStop(0.5, this.YZo);
	}
	der() {
		(this.KZo = MathUtils_1.MathUtils.GetRandomRange(2, 4)),
			(this.QZo = Time_1.Time.WorldTimeSeconds);
	}
	Aer() {
		if (this.eer?.length) {
			switch (this.ter) {
				case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly:
					this.ier = Math.floor(Math.random() * this.eer.length);
					break;
				case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Orderly:
					this.ier = (this.ier + 1) % this.eer.length;
			}
			return this.eer[this.ier];
		}
	}
	Ier() {
		var t,
			e,
			i = this.Owner.Entity.GetComponent(38);
		i?.IsEnabled() &&
			((t = i.AiController?.AiBase?.SubBehaviorConfigs?.get("AiSense")) &&
				((e = this.Owner.Entity.GetComponent(106)),
				(t = AiSenseById_1.configAiSenseById.GetConfig(Number(t)))) &&
				((t = Math.max(t.SenseDistanceRange.Max, 0)),
				e.SetLogicRange(t),
				(this.Cer = 0 < t)),
			(e = i.AiController?.AiBase?.SubBehaviorConfigs?.get("AiAlert"))) &&
			AiAlertById_1.configAiAlertById.GetConfig(Number(e)) &&
			(this.ger = !0);
	}
	Ore() {
		(this.per = this.Owner.Entity),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner.Entity,
				EventDefine_1.EEventName.OnInteractPlotStart,
				this.Mer,
			),
			this.Cer &&
				this.ger &&
				(EventSystem_1.EventSystem.AddWithTarget(
					this.Owner.Entity,
					EventDefine_1.EEventName.OnStalkAlert,
					this.Ser,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Owner.Entity,
					EventDefine_1.EEventName.OnStalkAlertLifted,
					this.VZo,
				)),
			this.Cer &&
				!this.ger &&
				(EventSystem_1.EventSystem.AddWithTarget(
					this.Owner.Entity,
					EventDefine_1.EEventName.EnterLogicRange,
					this.xZt,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Owner.Entity,
					EventDefine_1.EEventName.LeaveLogicRange,
					this.yer,
				),
				this.Owner.Entity.GetComponent(106)?.IsInLogicRange || this.yer());
	}
	kre() {
		this.per &&
			(EventSystem_1.EventSystem.RemoveWithTarget(
				this.per,
				EventDefine_1.EEventName.OnInteractPlotStart,
				this.Mer,
			),
			this.Cer &&
				this.ger &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.per,
					EventDefine_1.EEventName.OnStalkAlert,
					this.Ser,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.per,
					EventDefine_1.EEventName.OnStalkAlertLifted,
					this.VZo,
				)),
			this.Cer &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.per,
					EventDefine_1.EEventName.EnterLogicRange,
					this.xZt,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.per,
					EventDefine_1.EEventName.LeaveLogicRange,
					this.yer,
				)),
			(this.per = void 0));
	}
	OnPlayerInteractTurnActionStart() {
		this.Owner.Entity.GetComponent(168)?.PauseAi("PlayerInteractTurnAction"),
			(this.ver = !0);
		var t = this.Owner.Entity.GetComponent(0),
			e =
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						51,
						"[NpcPerformIdleState.OnPlayerInteractTurnActionStart] 开始执行交互转身",
						["PbDataID", t?.GetPbDataId()],
					),
				this.Owner?.Entity?.GetComponent(35));
		e?.MainAnimInstance?.IsAnyMontagePlaying() && this.uer.NeedTurn
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"NPC",
						51,
						"[NpcPerformIdleState.OnPlayerInteractTurnActionStart][交互转身] 停止播放Montage",
						["PbDataID", t?.GetPbDataId()],
						["IsIdleMontage", this.b7s],
						[
							"CurrentMontage",
							e?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
						],
					),
				this.ser?.AddOnMontageEnded(this.OnLoopMontageEndForTurning),
				this.Per())
			: this.uer.TurnToInteractTarget();
	}
	OnPlayerInteractTurnActionEnd() {
		var t = this.Owner.Entity.GetComponent(0),
			e = this.Owner.Entity.GetComponent(35);
		e.MainAnimInstance.IsAnyMontagePlaying() &&
			this.uer.NeedTurn &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"NPC",
					51,
					"[NpcPerformIdleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage",
					["PbDataID", t?.GetPbDataId()],
					["IsIdleMontage", this.b7s],
					[
						"CurrentMontage",
						e?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
					],
				),
			this.Per()),
			(this.uer.OnTurnToDefaultForwardEndHandle = () => {
				this?.Owner?.Valid &&
					(this.Owner.Entity.GetComponent(168)?.ResumeAi(
						"PlayerInteractTurnAction",
					),
					(this.uer.NeedTurn = !1));
			}),
			this.uer.TurnToDefaultForward(),
			(this.ver = !1),
			this.der();
	}
	OnPlayerAttack() {
		this.fer || (this.b7s && this.aWo(), this.StateMachine.Switch(3));
	}
	OnMonsterNearby() {
		return (
			!this.fer && (this.b7s && this.aWo(), this.StateMachine.Switch(7), !0)
		);
	}
	OnPlayerImpact() {
		this.fer || (this.b7s && this.aWo(), this.StateMachine.Switch(4));
	}
}
exports.NpcPerformIdleState = NpcPerformIdleState;
