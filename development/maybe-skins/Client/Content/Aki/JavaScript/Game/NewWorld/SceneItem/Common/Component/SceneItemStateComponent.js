"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var o,
			a = arguments.length,
			s =
				a < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, i);
		else
			for (var r = e.length - 1; 0 <= r; r--)
				(o = e[r]) && (s = (a < 3 ? o(s) : 3 < a ? o(t, n, s) : o(t, n)) || s);
		return 3 < a && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemStateComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	Global_1 = require("../../../../Global"),
	LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BulletController_1 = require("../../../Bullet/BulletController"),
	MIN_DELAY_THRESHOLD = 0.1,
	RESET_LIMIT = 2,
	SERVER_DATA = "_ps";
let SceneItemStateComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this._ti = 1),
			(this.c_n = void 0),
			(this.jDn = void 0),
			(this.BehaviorMap = void 0),
			(this.Hte = void 0),
			(this.T_n = void 0),
			(this.StateConfig = void 0),
			(this.D_n = !1),
			(this.Xfo = void 0),
			(this.Xte = void 0),
			(this.TXr = void 0),
			(this.fXr = void 0),
			(this.R_n = void 0),
			(this.A_n = void 0),
			(this.U_n = void 0),
			(this.P_n = void 0),
			(this.Qnn = () => {
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Qnn,
				);
				var e = this.T_n?.CreateStageConfig.PerformDuration;
				e >= 0.1
					? TimerSystem_1.TimerSystem.Delay(() => {
							this.Xte?.RemoveTag(-991879492),
								(this.D_n = !0),
								LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
									this.Xfo,
								);
						}, e * TimeUtil_1.TimeUtil.InverseMillisecond)
					: (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
							this.Xfo,
						),
						(this.D_n = !0));
			}),
			(this.x_n = (e) => {
				TimerSystem_1.TimerSystem.Delay(() => {
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DelayRemoveEntityFinished,
						this.Entity,
					);
				}, 2 * TimeUtil_1.TimeUtil.InverseMillisecond);
			});
	}
	get IsInteractState() {
		return this.D_n && this.U_n;
	}
	get State() {
		return this._ti;
	}
	get StateTagId() {
		return this.c_n || 0;
	}
	OnInitData() {
		var e = this.Entity?.GetComponent(0);
		if (
			((this.Hte = this.Entity?.GetComponent(1)), e) &&
			((this.fXr = e.GetSummonerId()),
			(this.TXr = this.Hte?.CreatureData.GetModelConfig()),
			(this.D_n = !0),
			(this.U_n = !0),
			(t = e.GetPbEntityInitData()))
		) {
			(this.Xte = this.Entity?.GetComponent(177)),
				(this.Xfo = e.GetCreatureDataId()),
				(this.T_n = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"SceneItemLifeCycleComponent",
				)),
				(this.StateConfig = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"EntityStateComponent",
				));
			var t = (0, IComponent_1.getComponent)(
					t.ComponentsData,
					"EntityStateComponent",
				),
				n = ((this.BehaviorMap = new Map()), t),
				i = t?.StateChangeBehaviors;
			if (n && i) {
				let e = 0;
				for (const n of t.StateChangeBehaviors)
					this.BehaviorMap.set(e, n.Action), e++;
			}
			(n = e.ComponentDataMap.get("_ps")?._ps),
				(this.c_n = n._Fn),
				(i = e.ComponentDataMap.get("Eps")) &&
					(this.jDn = MathUtils_1.MathUtils.LongToBigInt(i.Eps?.S4n));
		}
		return !0;
	}
	OnStart() {
		return this.w_n(this.c_n), !0;
	}
	OnEnd() {
		return (
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
			void 0 !== this.R_n && TimerSystem_1.TimerSystem.Remove(this.R_n),
			!0
		);
	}
	IsInState(e) {
		return this._ti === e;
	}
	HandleDestroyState() {
		var e, t;
		if (
			((this.D_n = !1),
			this.Xte?.HasTag(-991879492) &&
				(this.Xte?.RemoveTag(-991879492), this.UpdateState(-1278190765, !0)),
			3 !== this._ti || !this.T_n)
		)
			return (t = this.Entity.GetComponent(147))
				? ((e = (e = this.StateConfig?.State)
						? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)
						: void 0),
					void (this.c_n !== e
						? t.ResetToInitState(this.StateConfig.State, this.x_n)
						: EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.DelayRemoveEntityFinished,
								this.Entity,
							)))
				: void 0;
		void 0 === this.P_n &&
			((e = this.T_n.DestroyStageConfig?.BulletId) &&
				void 0 !== this.fXr &&
				((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr)),
				BulletController_1.BulletController.CreateBulletCustomTarget(
					t ? t.Entity : Global_1.Global.BaseCharacter,
					e.toString(),
					this.Hte.ActorTransform,
					{},
					this.jDn,
				)),
			(t = this.T_n.DestroyStageConfig?.PerformDuration)
				? (this.P_n = TimerSystem_1.TimerSystem.Delay(() => {
						this.Entity?.Valid &&
							(EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.DelayRemoveEntityFinished,
								this.Entity,
							),
							(this.P_n = void 0));
					}, t * TimeUtil_1.TimeUtil.InverseMillisecond))
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DelayRemoveEntityFinished,
						this.Entity,
					));
	}
	w_n(e) {
		const t = this.T_n?.CreateStageConfig?.BulletConfig?.BulletId;
		if (
			t &&
			void 0 !== this.fXr &&
			ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr)
		) {
			var n = this.T_n?.CreateStageConfig?.BulletConfig?.Delay;
			const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr);
			n >= 0.1
				? (this.R_n = TimerSystem_1.TimerSystem.Delay(() => {
						BulletController_1.BulletController.CreateBulletCustomTarget(
							e ? e.Entity : Global_1.Global.BaseCharacter,
							t.toString(),
							this.Hte.ActorTransform,
							{},
							this.jDn,
						),
							(this.R_n = void 0);
					}, n * TimeUtil_1.TimeUtil.InverseMillisecond))
				: BulletController_1.BulletController.CreateBulletCustomTarget(
						e ? e.Entity : Global_1.Global.BaseCharacter,
						t.toString(),
						this.Hte.ActorTransform,
						{},
						this.jDn,
					);
		}
		if (((this.D_n = !1), 2096634051 !== e)) this.UpdateState(e, !0, !0);
		else {
			(this.c_n = e),
				(this._ti = 0),
				(n = this.T_n?.CreateStageConfig.PerformDuration),
				(e =
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-991879492));
			const t = void 0 !== this.TXr?.场景交互物状态列表.Get(e);
			t &&
			(this.Xte.AddTag(-991879492),
			!this.Entity.GetComponent(182).GetIsSceneInteractionLoadCompleted())
				? EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
						this.Qnn,
					)
				: n >= 0.1
					? TimerSystem_1.TimerSystem.Delay(() => {
							t && this.Xte?.RemoveTag(-991879492),
								(this.D_n = !0),
								LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
									this.Xfo,
								);
						}, n * TimeUtil_1.TimeUtil.InverseMillisecond)
					: (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
							this.Xfo,
						),
						(this.D_n = !0));
		}
	}
	UpdateState(e, t, n = !1) {
		switch (((this.D_n = t), (this.c_n = e), this.c_n)) {
			case -1152559349:
				this._ti = 1;
				break;
			case -3775711:
				this._ti = 2;
				break;
			case 1298716444:
				this._ti = 4;
				break;
			case -1278190765:
				return void (this._ti = 3);
			default:
				this._ti = 5;
		}
		n ||
			(t
				? EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						e,
						!0,
					)
				: EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStatePreChange,
						e,
					));
	}
	ChangePerformanceState(e, t = !1, n = !0) {
		(e === this.A_n && !t) ||
			((t = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)),
			!(0, IAction_1.isPerformanceTypeContainTag)(
				this.StateConfig.PrefabPerformanceType,
				t,
			) && n
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						7,
						"[ChangePerformanceTag] 传入的Tag与Entity设定的状态类型不匹配",
						["configComp", this.StateConfig.PrefabPerformanceType],
						["TagName", t],
						["CreatureDataId", this.Xfo],
					)
				: (this.A_n
						? ((n = this.A_n),
							(this.A_n = e),
							this.Xte?.ChangeLocalLevelTag(this.A_n, n))
						: ((this.A_n = e), this.Xte?.AddTag(e)),
					(this.U_n = -687845e3 !== e)));
	}
	GetLifeCycleStageActions(e) {
		return (e ? this.T_n?.CreateStageConfig : this.T_n?.DestroyStageConfig)
			.Actions;
	}
};
(SceneItemStateComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(117)],
	SceneItemStateComponent,
)),
	(exports.SceneItemStateComponent = SceneItemStateComponent);
