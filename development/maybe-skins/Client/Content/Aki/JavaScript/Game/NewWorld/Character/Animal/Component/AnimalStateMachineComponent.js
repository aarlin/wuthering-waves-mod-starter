"use strict";
var AnimalStateMachineComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, a, r) {
			var n,
				i = arguments.length,
				o =
					i < 3
						? t
						: null === r
							? (r = Object.getOwnPropertyDescriptor(t, a))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				o = Reflect.decorate(e, t, a, r);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(n = e[s]) &&
						(o = (i < 3 ? n(o) : 3 < i ? n(t, a, o) : n(t, a)) || o);
			return 3 < i && o && Object.defineProperty(t, a, o), o;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalStateMachineComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
	AnimalPerformAlertState_1 = require("../StateMachine/AnimalPerformAlertState"),
	AnimalPerformBornState_1 = require("../StateMachine/AnimalPerformBornState"),
	AnimalPerformIdleState_1 = require("../StateMachine/AnimalPerformIdleState"),
	AnimalPerformInteractState_1 = require("../StateMachine/AnimalPerformInteractState"),
	AnimalPerformStandState_1 = require("../StateMachine/AnimalPerformStandState"),
	AnimalPerformSystemUiState_1 = require("../StateMachine/AnimalPerformSystemUiState"),
	AnimalPerformTakeOffState_1 = require("../StateMachine/AnimalPerformTakeOffState"),
	AnimalPerformUnderAttackState_1 = require("../StateMachine/AnimalPerformUnderAttackState"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let AnimalStateMachineComponent =
	(AnimalStateMachineComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Mne = 0),
				(this.oRe = void 0),
				(this.bbr = void 0),
				(this.Lle = void 0),
				(this.qbr = 0),
				(this.aGe = !1),
				(this.Pz = (e, t) => {});
		}
		OnInitData() {
			return (
				(this.Lle = new StateMachine_1.StateMachine(this.Entity, this.Pz)), !0
			);
		}
		OnStart() {
			var e = this.Entity.GetComponent(0);
			return (
				(e =
					((this.Mne = e.GetPbDataId()),
					(this.oRe = this.Entity.GetComponent(160)),
					this.oRe?.MainAnimInstance)) &&
				UE.KuroStaticLibrary.IsImplementInterface(
					e.GetClass(),
					UE.BPI_AnimalEcological_C.StaticClass(),
				)
					? ((this.bbr = e),
						UE.KuroStaticLibrary.IsObjectClassByName(
							e,
							CharacterNameDefines_1.CharacterNameDefines.ABP_BASEANIMAL,
						)
							? (this.Lle.AddState(
									0,
									AnimalPerformBornState_1.AnimalPerformBornState,
									this.bbr,
								),
								this.Lle.AddState(
									1,
									AnimalPerformStandState_1.AnimalPerformStandState,
									this.bbr,
								),
								this.Lle.AddState(
									2,
									AnimalPerformIdleState_1.AnimalPerformIdleState,
									this.bbr,
								),
								this.Lle.AddState(
									3,
									AnimalPerformInteractState_1.AnimalPerformInteractState,
									this.bbr,
								),
								this.Lle.AddState(
									4,
									AnimalPerformUnderAttackState_1.AnimalPerformUnderAttackState,
									this.bbr,
								),
								this.Lle.AddState(
									6,
									AnimalPerformAlertState_1.AnimalPerformAlertState,
									this.bbr,
								),
								this.Lle.AddState(
									5,
									AnimalPerformTakeOffState_1.AnimalPerformTakeOffState,
									this.bbr,
								),
								this.Lle.AddState(
									7,
									AnimalPerformSystemUiState_1.AnimalPerformSystemUiState,
									this.bbr,
								),
								this.StartStateMachine())
							: Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Animal",
									30,
									"动画蓝图不符合规范，不是ABP_BaseAnimal的实例，不能开启状态机",
									["ConfigID", this.Mne],
									["ABP", e?.GetName()],
								))
					: Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Animal",
							30,
							"动画蓝图不符合规范，缺少AnimalEcological接口，不能开启状态机",
							["ConfigID", this.Mne],
							["ABP", e?.GetName()],
						),
				!0
			);
		}
		OnTick(e) {
			this.aGe && this.Lle.Update(e);
		}
		OnEnd() {
			return (this.aGe = !1), this.Lle.Destroy(), !0;
		}
		StartStateMachine() {
			this.Lle.Start(this.qbr), (this.aGe = !0);
		}
		CurrentState() {
			return AnimalStateMachineComponent_1.GetUeState(this.Lle.CurrentState);
		}
		SwitchState(e) {
			this.aGe && this.Lle.Switch(e);
		}
		GetWaitTime() {
			return this.Lle.GetState(this.Lle.CurrentState)?.GetActionTime() ?? 0;
		}
		GetState(e) {
			if (this.aGe) return this.Lle.GetState(e);
		}
		GetCurrentState() {
			if (this.aGe) return this.GetState(this.Lle.CurrentState);
		}
		static GetStateName(e) {
			switch (e) {
				case 0:
				case 1:
				default:
					return "None";
				case 2:
					return "空闲";
				case 3:
					return "交互";
				case 6:
					return "警觉";
				case 4:
					return "受击";
				case 5:
					return "起飞";
				case 7:
					return "系统UI";
			}
		}
		static GetUeState(e) {
			switch (e) {
				case 0:
				case 1:
					return 0;
				case 2:
					return 1;
				case 3:
					return 5;
				case 6:
					return 2;
				case 4:
					return 3;
				case 5:
					return 4;
				case 7:
					return 6;
			}
			return 0;
		}
		static GetTsState(e) {
			switch (e) {
				case 0:
					return 1;
				case 1:
					return 2;
				case 2:
					return 6;
				case 3:
					return 4;
				case 4:
					return 5;
				case 5:
					return 3;
				case 6:
					return 7;
			}
			return 1;
		}
	});
(AnimalStateMachineComponent = AnimalStateMachineComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(14)],
		AnimalStateMachineComponent,
	)),
	(exports.AnimalStateMachineComponent = AnimalStateMachineComponent);
