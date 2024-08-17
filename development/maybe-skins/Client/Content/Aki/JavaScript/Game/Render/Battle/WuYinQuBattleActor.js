"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController"),
	PostProcessTrigger_1 = require("../GI/PostProcessTrigger/PostProcessTrigger"),
	RenderModuleController_1 = require("../Manager/RenderModuleController"),
	WuYinQuBattleStateFighting1_1 = require("./States/WuYinQuBattleStateFighting1"),
	WuYinQuBattleStateFighting2_1 = require("./States/WuYinQuBattleStateFighting2"),
	WuYinQuBattleStateFighting3_1 = require("./States/WuYinQuBattleStateFighting3"),
	WuYinQuBattleStateFightingToFighting_1 = require("./States/WuYinQuBattleStateFightingToFighting"),
	WuYinQuBattleStateFightingToIdle_1 = require("./States/WuYinQuBattleStateFightingToIdle"),
	WuYinQuBattleStateIdle_1 = require("./States/WuYinQuBattleStateIdle"),
	WuYinQuBattleStateIdleToFighting_1 = require("./States/WuYinQuBattleStateIdleToFighting"),
	WuYinQuBattleConfig_1 = require("./WuYinQuBattleConfig");
class WuYinQuBattleActor extends UE.KuroWuYinQuActorBase {
	constructor() {
		super(...arguments),
			(this.当前状态 = "无"),
			(this.是否已经初始化 = "未初始化"),
			(this.ReferenceKuroLevelSequence = void 0),
			(this.Root = void 0),
			(this.IdleInnerBox1 = void 0),
			(this.IdleInnerBox2 = void 0),
			(this.IdleInnerPostProcess = void 0),
			(this.IdleOuterBox1 = void 0),
			(this.IdleOuterBox2 = void 0),
			(this.IdleOuterPostProcess = void 0),
			(this.FightingPhase1Box1 = void 0),
			(this.FightingPhase1Box2 = void 0),
			(this.FightingPhase1PostProcess = void 0),
			(this.FightingPhase2Box1 = void 0),
			(this.FightingPhase2Box2 = void 0),
			(this.FightingPhase2PostProcess = void 0),
			(this.FightingPhase3Box1 = void 0),
			(this.FightingPhase3Box2 = void 0),
			(this.FightingPhase3PostProcess = void 0),
			(this.WuYinQuFightingData = void 0),
			(this.CurrentBattleState = 4),
			(this.LastBattleState = 4),
			(this.IsInit = !1),
			(this.StateMachine = void 0),
			(this.IdleInnerPostProcessTrigger = void 0),
			(this.IdleOuterPostProcessTrigger = void 0),
			(this.FightingPhase1PostProcessTrigger = void 0),
			(this.FightingPhase2PostProcessTrigger = void 0),
			(this.FightingPhase3PostProcessTrigger = void 0),
			(this.StringKey = "");
	}
	手动初始化() {
		RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActor(this);
	}
	显示Debug线框() {
		RoleTriggerController_1.RoleTriggerController.DebugTestWorldDone(),
			(this.IdleOuterBox1.LineThickness = 20),
			(this.IdleOuterBox1.ShapeColor = new UE.Color(0, 223, 83, 255)),
			this.IdleOuterBox1.SetHiddenInGame(!1),
			(this.IdleOuterBox2.LineThickness = 10),
			(this.IdleOuterBox2.ShapeColor = new UE.Color(0, 223, 83, 255)),
			this.IdleOuterBox2.SetHiddenInGame(!1),
			(this.IdleInnerBox1.LineThickness = 20),
			(this.IdleInnerBox1.ShapeColor = new UE.Color(0, 223, 83, 255)),
			this.IdleInnerBox1.SetHiddenInGame(!1),
			(this.IdleInnerBox2.LineThickness = 10),
			(this.IdleInnerBox2.ShapeColor = new UE.Color(0, 223, 83, 255)),
			this.IdleInnerBox2.SetHiddenInGame(!1);
	}
	切换到清空状态() {
		RenderModuleController_1.RenderModuleController.SetBattleState(
			this.GetKey(),
			4,
		);
	}
	切换到静止状态() {
		RenderModuleController_1.RenderModuleController.SetBattleState(
			this.GetKey(),
			0,
		);
	}
	切换到战斗阶段1() {
		RenderModuleController_1.RenderModuleController.SetBattleState(
			this.GetKey(),
			1,
		);
	}
	切换到战斗阶段2() {
		RenderModuleController_1.RenderModuleController.SetBattleState(
			this.GetKey(),
			2,
		);
	}
	切换到战斗阶段3() {
		RenderModuleController_1.RenderModuleController.SetBattleState(
			this.GetKey(),
			3,
		);
	}
	ChangeState(t, e = !1) {
		this.IsInit
			? this.CurrentBattleState !== t &&
				((this.LastBattleState = this.CurrentBattleState),
				(this.CurrentBattleState = t),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderBattle",
						12,
						"BOSS战切换状态 from:",
						[" fromState:", this.LastBattleState],
						[" toState:", this.CurrentBattleState],
					),
				0 === t
					? (e ? this.StateMachine.Switch(0) : this.StateMachine.Switch(6),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"RenderBattle",
								12,
								"切换Fighting to Idle:",
								["Key:", this.Key],
								["Instant:", e],
							))
					: 1 === t
						? (e ? this.StateMachine.Switch(1) : this.StateMachine.Switch(4),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"RenderBattle",
									12,
									"切换Idle To Fighting1:",
									["Key:", this.Key],
									["Instant:", e],
								))
						: 2 === t
							? (e ? this.StateMachine.Switch(2) : this.StateMachine.Switch(5),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"RenderBattle",
										12,
										"切换Fighting1 to Fighting2:",
										["Key:", this.Key],
										["Instant:", e],
									))
							: 3 === t &&
								(e ? this.StateMachine.Switch(3) : this.StateMachine.Switch(5),
								Log_1.Log.CheckInfo()) &&
								Log_1.Log.Info(
									"RenderBattle",
									12,
									"切换Fighting2 to Fighting3:",
									["Key:", this.Key],
									["Instant:", e],
								))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderBattle", 12, "没有初始化WuYinQuBattle:", [
					"key:",
					this.Key,
				]);
	}
	ReceiveBeginPlay() {
		ModelManager_1.ModelManager.RenderModuleModel
			? RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActor(
					this,
				)
			: RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActorWaiting(
					this,
				);
	}
	ReceiveEndPlay() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderBattle", 12, "Receive End Play Battle Actor:", [
				"Key:",
				this.Key,
			]),
			RenderModuleController_1.RenderModuleController.RemoveWuYinQuBattleActor(
				this,
			),
			(this.IsInit = !1),
			(this.是否已经初始化 = "无"),
			(this.CurrentBattleState = 0),
			(this.LastBattleState = 0),
			this.IdleInnerPostProcessTrigger &&
				this.IdleInnerPostProcessTrigger.Dispose(),
			this.IdleOuterPostProcessTrigger &&
				this.IdleOuterPostProcessTrigger.Dispose(),
			this.FightingPhase1PostProcessTrigger &&
				this.FightingPhase1PostProcessTrigger.Dispose(),
			this.FightingPhase2PostProcessTrigger &&
				this.FightingPhase2PostProcessTrigger.Dispose(),
			this.FightingPhase3PostProcessTrigger &&
				this.FightingPhase3PostProcessTrigger.Dispose();
	}
	GetKuroLevelSequenceActor() {
		if (UE.KismetSystemLibrary.IsValid(this.ReferenceKuroLevelSequence))
			return this.ReferenceKuroLevelSequence;
	}
	GetCurrentBattleState() {
		return this.CurrentBattleState;
	}
	GetLastBattleState() {
		return this.LastBattleState;
	}
	IsInitialize() {
		return this.IsInit;
	}
	GetKey() {
		return (
			this.StringKey || (this.StringKey = this.Key.toString()), this.StringKey
		);
	}
	Tick(t) {
		this.IsInit &&
			(this.StateMachine.Update(t),
			this.IdleInnerPostProcessTrigger &&
				this.IdleInnerPostProcessTrigger.Tick(t),
			this.IdleOuterPostProcessTrigger &&
				this.IdleOuterPostProcessTrigger.Tick(t),
			this.FightingPhase1PostProcessTrigger &&
				this.FightingPhase1PostProcessTrigger.Tick(t),
			this.FightingPhase2PostProcessTrigger &&
				this.FightingPhase2PostProcessTrigger.Tick(t),
			this.FightingPhase3PostProcessTrigger) &&
			this.FightingPhase3PostProcessTrigger.Tick(t);
	}
	Init() {
		return this.IsInit
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderBattle", 12, "已经初始化过了 handleId:", [
						"Key:",
						this.Key,
					]),
				!1)
			: UE.KismetSystemLibrary.IsValid(this.WuYinQuFightingData)
				? ((this.CurrentBattleState = 0),
					(this.LastBattleState = 0),
					(this.StateMachine = new StateMachine_1.StateMachine(this)),
					this.StateMachine.AddState(0, WuYinQuBattleStateIdle_1.default),
					this.StateMachine.AddState(1, WuYinQuBattleStateFighting1_1.default),
					this.StateMachine.AddState(2, WuYinQuBattleStateFighting2_1.default),
					this.StateMachine.AddState(3, WuYinQuBattleStateFighting3_1.default),
					this.StateMachine.AddState(
						4,
						WuYinQuBattleStateIdleToFighting_1.default,
					),
					this.StateMachine.AddState(
						5,
						WuYinQuBattleStateFightingToFighting_1.default,
					),
					this.StateMachine.AddState(
						6,
						WuYinQuBattleStateFightingToIdle_1.default,
					),
					this.InitComponents(),
					this.StateMachine.Start(0),
					(this.IsInit = !0),
					(this.是否已经初始化 = "已经初始化"),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("RenderBattle", 12, "初始化无音区状态成功:", [
							"Key:",
							this.GetKey(),
						]),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderBattle",
							12,
							"无音区战斗数据无效 handleId:",
							["Key:", this.Key],
						),
					!1);
	}
	InitComponents() {
		var t, e;
		(this.IdleInnerPostProcess.BlendWeight = 0),
			(this.IdleOuterPostProcess.BlendWeight = 0),
			(this.FightingPhase1PostProcess.BlendWeight = 0),
			(this.FightingPhase2PostProcess.BlendWeight = 0),
			(this.FightingPhase3PostProcess.BlendWeight = 0),
			(this.IdleInnerPostProcess.bUnbound = !0),
			(this.IdleOuterPostProcess.bUnbound = !0),
			(this.FightingPhase1PostProcess.bUnbound = !0),
			(this.FightingPhase2PostProcess.bUnbound = !0),
			(this.FightingPhase3PostProcess.bUnbound = !0),
			this.WuYinQuFightingData?.WuYinQuIdleData?.IsValid() &&
				((this.IdleInnerPostProcess.WeatherDataAsset =
					this.WuYinQuFightingData.WuYinQuIdleData.AtmosInnerData),
				this.IdleInnerPostProcess.WeatherDataAsset?.IsValid() &&
					((t = this.WuYinQuFightingData.TriggerInnerSize),
					(e = new UE.Vector(
						t + WuYinQuBattleConfig_1.default.TriggerThreshold.X,
						t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y,
						t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z,
					)),
					this.IdleInnerBox1.SetRelativeScale3D(new UE.Vector(t, t, t)),
					this.IdleInnerBox2.SetRelativeScale3D(e),
					(this.IdleInnerPostProcessTrigger =
						new PostProcessTrigger_1.default()),
					this.IdleInnerPostProcessTrigger.Init(
						this.IdleInnerBox1,
						this.IdleInnerBox2,
						this.IdleInnerPostProcess,
						WuYinQuBattleConfig_1.default.TriggerTransitionTime,
						0,
						this.GetKey(),
					)),
				(this.IdleOuterPostProcess.WeatherDataAsset =
					this.WuYinQuFightingData.WuYinQuIdleData.AtmosOuterData),
				this.IdleOuterPostProcess.WeatherDataAsset?.IsValid()) &&
				((t = this.WuYinQuFightingData.TriggerOuterSize),
				(e = new UE.Vector(
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.X,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z,
				)),
				this.IdleOuterBox1.SetRelativeScale3D(new UE.Vector(t, t, t)),
				this.IdleOuterBox2.SetRelativeScale3D(e),
				(this.IdleOuterPostProcessTrigger = new PostProcessTrigger_1.default()),
				this.IdleOuterPostProcessTrigger.Init(
					this.IdleOuterBox1,
					this.IdleOuterBox2,
					this.IdleOuterPostProcess,
					WuYinQuBattleConfig_1.default.TriggerTransitionTime,
					0,
					this.GetKey(),
				)),
			this.WuYinQuFightingData?.WuYinQuFightingData1?.IsValid() &&
				((this.FightingPhase1PostProcess.WeatherDataAsset =
					this.WuYinQuFightingData.WuYinQuFightingData1.AtmosFightingData),
				this.FightingPhase1PostProcess.WeatherDataAsset?.IsValid()) &&
				((t = this.WuYinQuFightingData.TriggerOuterSize),
				(e = new UE.Vector(
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.X,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z,
				)),
				this.FightingPhase1Box1.SetRelativeScale3D(new UE.Vector(t, t, t)),
				this.FightingPhase1Box2.SetRelativeScale3D(e),
				(this.FightingPhase1PostProcessTrigger =
					new PostProcessTrigger_1.default()),
				this.FightingPhase1PostProcessTrigger.Init(
					this.FightingPhase1Box1,
					this.FightingPhase1Box2,
					this.FightingPhase1PostProcess,
					WuYinQuBattleConfig_1.default.TriggerTransitionTime,
					1,
					this.GetKey(),
				)),
			this.WuYinQuFightingData?.WuYinQuFightingData2?.IsValid() &&
				((this.FightingPhase2PostProcess.WeatherDataAsset =
					this.WuYinQuFightingData.WuYinQuFightingData2.AtmosFightingData),
				this.FightingPhase2PostProcess.WeatherDataAsset?.IsValid()) &&
				((t = this.WuYinQuFightingData.TriggerOuterSize),
				(e = new UE.Vector(
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.X,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z,
				)),
				this.FightingPhase2Box1.SetRelativeScale3D(new UE.Vector(t, t, t)),
				this.FightingPhase2Box2.SetRelativeScale3D(e),
				(this.FightingPhase2PostProcessTrigger =
					new PostProcessTrigger_1.default()),
				this.FightingPhase2PostProcessTrigger.Init(
					this.FightingPhase2Box1,
					this.FightingPhase2Box2,
					this.FightingPhase2PostProcess,
					WuYinQuBattleConfig_1.default.TriggerTransitionTime,
					2,
					this.GetKey(),
				)),
			this.WuYinQuFightingData?.WuYinQuFightingData3?.IsValid() &&
				((this.FightingPhase3PostProcess.WeatherDataAsset =
					this.WuYinQuFightingData.WuYinQuFightingData3.AtmosFightingData),
				this.FightingPhase3PostProcess.WeatherDataAsset?.IsValid()) &&
				((t = this.WuYinQuFightingData.TriggerOuterSize),
				(e = new UE.Vector(
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.X,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y,
					t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z,
				)),
				this.FightingPhase3Box1.SetRelativeScale3D(new UE.Vector(t, t, t)),
				this.FightingPhase3Box2.SetRelativeScale3D(e),
				(this.FightingPhase3PostProcessTrigger =
					new PostProcessTrigger_1.default()),
				this.FightingPhase3PostProcessTrigger.Init(
					this.FightingPhase3Box1,
					this.FightingPhase3Box2,
					this.FightingPhase3PostProcess,
					WuYinQuBattleConfig_1.default.TriggerTransitionTime,
					3,
					this.GetKey(),
				));
	}
}
exports.default = WuYinQuBattleActor;
