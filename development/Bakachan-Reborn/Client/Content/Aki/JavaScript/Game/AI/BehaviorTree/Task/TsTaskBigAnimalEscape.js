"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	FRONT_RANDOM_RAD = 0.26,
	HALF_PI_DEG = 90,
	DOUBLE_PI_DEG = 360,
	INSPECTION_INTERVAL = 200,
	DEBUG_SEGMENTS = 10,
	DEBUG_RADIUS = 30,
	DEBUG_TIME = 2.5,
	TURN_COMPLETE_DEG = 30,
	NAVIGATION_COMPLETE_DISTANCE = 2500,
	DEBUG_MODE = !0;
class TsTaskBigAnimalEscape extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.EnemyKey = ""),
			(this.TurnSpeed = 0),
			(this.IsInitTsVariables = !1),
			(this.TsEnemyKey = ""),
			(this.TsTurnSpeed = 0),
			(this.ActorComp = void 0),
			(this.TargetActorComp = void 0),
			(this.Initialized = !1),
			(this.AngleMin = 0),
			(this.AngleMax = 0),
			(this.InnerDiameter = 0),
			(this.OuterDiameter = 0),
			(this.EscapeEndTime = 0),
			(this.FoundLocation = !1),
			(this.EscapeLocation = void 0),
			(this.OptimalDirections = void 0),
			(this.FoundPath = !1),
			(this.MovePath = void 0),
			(this.CurrentMoveIndex = 0),
			(this.NeedTurn = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsEnemyKey = this.EnemyKey),
			(this.TsTurnSpeed = this.TurnSpeed));
	}
	ReceiveExecuteAI(t, e) {
		var i, o;
		t instanceof TsAiController_1.default
			? ((i = t.AiController),
				this.InitConfig(i)
					? (this.InitTsVariables(),
						(this.ActorComp = i.CharActorComp),
						this.TsEnemyKey &&
							(o =
								BlackboardController_1.BlackboardController.GetEntityIdByEntity(
									this.ActorComp.Entity.Id,
									this.TsEnemyKey,
								)) &&
							(o = EntitySystem_1.EntitySystem.Get(o)) &&
							(this.TargetActorComp = o.GetComponent(3)),
						this.TargetActorComp ||
							(this.TargetActorComp =
								Global_1.Global.BaseCharacter.CharacterActorComponent),
						this.InitData(),
						(o = Vector_1.Vector.Create()),
						this.ActorComp.ActorLocationProxy.Subtraction(
							this.TargetActorComp.ActorLocationProxy,
							o,
						),
						(o.Z = 0),
						o.Normalize(),
						this.FindOptimalDirections(o),
						0 === this.OptimalDirections.length
							? (Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"BehaviorTree",
										30,
										"无可行方向，请检查逻辑和配置",
										["EntityId: ", this.ActorComp.Entity.Id],
									),
								this.Finish(!0))
							: (this.FindEscapeLocation(),
								this.FindMovePath(),
								(this.EscapeEndTime =
									Time_1.Time.WorldTime + i.AiFlee.TimeMilliseconds)))
					: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	InitConfig(t) {
		if (!this.Initialized) {
			var e = t.AiFlee;
			if (!e)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 30, "没有配置逃跑", [
							"AiBaseId",
							t.AiBase.Id,
						]),
					!1
				);
			(this.AngleMin = e.FleeAngle.Min),
				(this.AngleMax = e.FleeAngle.Max),
				(this.InnerDiameter = e.FleeDistance.Min),
				(this.OuterDiameter = e.FleeDistance.Max),
				(this.Initialized = !0);
		}
		return !0;
	}
	InitData() {
		this.OptimalDirections || (this.OptimalDirections = new Array()),
			this.EscapeLocation || (this.EscapeLocation = new UE.Vector()),
			this.MovePath || (this.MovePath = new Array()),
			(this.CurrentMoveIndex = 1);
	}
	FindOptimalDirections(t) {
		var e = this.ActorComp.ActorForwardProxy,
			i = Math.max(this.AngleMax - this.AngleMin, 90),
			o = Vector_1.Vector.Create(),
			r = (t.Multiply(-1, o), 4),
			a = new Array();
		for (let h = 0; h < r; h++) {
			var s = 90 * h,
				n = Vector_1.Vector.Create();
			(s =
				(e.RotateAngleAxis(s, this.ActorComp.ActorUpProxy, n),
				MathUtils_1.MathUtils.GetAngleByVectorDot(o, n))) < 90 ||
				i < (s = MathUtils_1.MathUtils.GetAngleByVectorDot(t, n)) ||
				a.push([n, s]);
		}
		a.sort((t, e) => t[1] - e[1]);
		for (const t of a) this.OptimalDirections.push(t[0]);
	}
	FindEscapeLocation() {
		var t = Vector_1.Vector.Create(),
			e = (0, puerts_1.$ref)(void 0);
		for (const o of this.OptimalDirections) {
			for (let r = this.OuterDiameter; r >= this.InnerDiameter; r -= 200) {
				o.Multiply(r, t), t.AdditionEqual(this.ActorComp.ActorLocationProxy);
				var i = r * Math.sin(0.26);
				if (
					((this.FoundLocation =
						UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
							GlobalData_1.GlobalData.World,
							t.ToUeVector(),
							e,
							i,
						)),
					this.FoundLocation)
				)
					break;
			}
			if (this.FoundLocation) {
				(this.EscapeLocation.X = (0, puerts_1.$unref)(e).X),
					(this.EscapeLocation.Y = (0, puerts_1.$unref)(e).Y),
					(this.EscapeLocation.Z = (0, puerts_1.$unref)(e).Z);
				break;
			}
		}
		if (!this.FoundLocation) {
			var o = this.OptimalDirections[0];
			for (let i = this.InnerDiameter; 0 < i; i -= 200)
				if (
					(o.Multiply(i, t),
					t.AdditionEqual(this.ActorComp.ActorLocationProxy),
					(this.FoundLocation =
						UE.NavigationSystemV1.K2_ProjectPointToNavigation(
							GlobalData_1.GlobalData.World,
							t.ToUeVector(),
							e,
							void 0,
							void 0,
						)),
					this.FoundLocation)
				) {
					(this.EscapeLocation.X = (0, puerts_1.$unref)(e).X),
						(this.EscapeLocation.Y = (0, puerts_1.$unref)(e).Y),
						(this.EscapeLocation.Z = (0, puerts_1.$unref)(e).Z);
					break;
				}
		}
	}
	FindMovePath() {
		if (this.FoundLocation) {
			if (
				((this.FoundPath =
					AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
						GlobalData_1.GlobalData.World,
						this.ActorComp.ActorLocation,
						this.EscapeLocation,
						this.MovePath,
					)),
				GlobalData_1.GlobalData.IsPlayInEditor && this.FoundPath)
			)
				for (let t = 0, e = this.MovePath.length; t < e; ++t)
					UE.KismetSystemLibrary.DrawDebugSphere(
						this,
						this.MovePath[t].ToUeVector(),
						30,
						10,
						ColorUtils_1.ColorUtils.LinearGreen,
						2.5,
					);
			this.FoundPath || this.GenerateFailurePath();
		} else this.GenerateFailurePath();
	}
	GenerateFailurePath() {
		var t = Vector_1.Vector.Create(),
			e =
				(this.OptimalDirections[0].Multiply(200, t),
				t.AdditionEqual(this.ActorComp.ActorLocationProxy),
				Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy));
		this.MovePath.splice(0, this.MovePath.length),
			this.MovePath.push(e),
			this.MovePath.push(t),
			(this.FoundPath = !0),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				UE.KismetSystemLibrary.DrawDebugSphere(
					this,
					this.EscapeLocation,
					30,
					10,
					ColorUtils_1.ColorUtils.LinearRed,
					2.5,
				);
	}
	ReceiveTickAI(t, e, i) {
		var o, r, a;
		t.AiController && this.ActorComp?.Valid
			? Time_1.Time.WorldTime > this.EscapeEndTime
				? this.Finish(!0)
				: ((t = this.ActorComp.Entity.GetComponent(89)),
					(o = Vector_1.Vector.Create(
						this.MovePath[this.CurrentMoveIndex],
					)).SubtractionEqual(this.ActorComp.ActorLocationProxy),
					(o.Z = 0),
					(r = o.SizeSquared()),
					o.Normalize(),
					(a = MathUtils_1.MathUtils.GetAngleByVectorDot(
						this.ActorComp.ActorForwardProxy,
						o,
					)),
					(this.NeedTurn = a > 30),
					1 === this.CurrentMoveIndex && this.NeedTurn
						? (t?.Valid &&
								t.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
								),
							this.ActorComp.ClearInput(),
							AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
								this.ActorComp,
								o,
								this.TsTurnSpeed,
							))
						: (t?.Valid &&
								t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run),
							r < 2500 &&
							(this.CurrentMoveIndex++,
							this.CurrentMoveIndex === this.MovePath.length)
								? this.Finish(!0)
								: (this.ActorComp.SetInputDirect(o),
									AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
										this.ActorComp,
										o,
										this.TsTurnSpeed,
									))))
			: this.Finish(!1);
	}
	OnClear() {
		(this.OptimalDirections.length = 0),
			(this.FoundLocation = !1),
			(this.FoundPath = !1),
			(this.MovePath.length = 0);
	}
}
exports.default = TsTaskBigAnimalEscape;
