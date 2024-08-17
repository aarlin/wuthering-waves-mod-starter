"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	AnimalMoveToController_1 = require("../../../../NewWorld/Character/Animal/Controller/AnimalMoveToController"),
	CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	DEFAULT_DISTANCE_ERROR_THRESHOLD = 100;
class TsTaskAnimalMoveTo extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 2),
			(this.NavigationOn = !1),
			(this.TargetLocation = ""),
			(this.TurnSpeed = 0),
			(this.LimitTime = 0),
			(this.RootMotion = !0),
			(this.DistanceErrorThreshold = 0),
			(this.IsInitTsVariables = !1),
			(this.TsLimitTime = -0),
			(this.TsTurnSpeed = 0),
			(this.TsMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
			(this.TsNavigationOn = !1),
			(this.TsTargetLocation = ""),
			(this.TsRootMotion = !1),
			(this.TsDistanceErrorThreshold = 0),
			(this.AnimalMoveToController = void 0),
			(this.TargetCache = void 0),
			(this.EndTime = -0);
	}
	static InitStaticVariables() {
		(TsTaskAnimalMoveTo.AnimalValidMoveState = new Set()),
			TsTaskAnimalMoveTo.AnimalValidMoveState.add(
				CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
			),
			TsTaskAnimalMoveTo.AnimalValidMoveState.add(
				CharacterUnifiedStateTypes_1.ECharMoveState.Run,
			),
			TsTaskAnimalMoveTo.AnimalValidMoveState.add(
				CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim,
			),
			(TsTaskAnimalMoveTo.StaticVariablesInited = !0);
	}
	InitTsVariables(e) {
		this.IsInitTsVariables ||
			((this.TsMoveState = this.MoveState),
			(this.TsNavigationOn = this.NavigationOn),
			(this.TsTargetLocation = this.TargetLocation),
			(this.TsLimitTime =
				this.LimitTime * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TargetCache = Vector_1.Vector.Create()),
			(this.TsRootMotion = this.RootMotion),
			(this.TsDistanceErrorThreshold =
				this.TsMoveState ===
				CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
					? this.DistanceErrorThreshold
					: Math.max(100, this.DistanceErrorThreshold)),
			(this.IsInitTsVariables = !0));
	}
	ReceiveExecuteAI(e, t) {
		TsTaskAnimalMoveTo.StaticVariablesInited ||
			TsTaskAnimalMoveTo.InitStaticVariables();
		var i,
			o = e.AiController;
		o
			? (o = o.CharActorComp?.Entity)?.Valid
				? (this.InitTsVariables(o),
					TsTaskAnimalMoveTo.AnimalValidMoveState.has(this.TsMoveState)
						? ((i =
								BlackboardController_1.BlackboardController.GetVectorValueByEntity(
									o.Id,
									this.TsTargetLocation,
								)),
							this.TargetCache.DeepCopy(i),
							(this.AnimalMoveToController =
								new AnimalMoveToController_1.AnimalMoveToController(o)),
							this.AnimalMoveToController.Init(
								this.TsMoveState,
								this.TsRootMotion,
							),
							this.AnimalMoveToController.Start(
								this.TargetCache,
								this.TsNavigationOn,
								this.TsTurnSpeed,
								this.TsDistanceErrorThreshold,
							),
							(this.EndTime = Number.MAX_VALUE),
							0 < this.TsLimitTime &&
								(this.EndTime = Time_1.Time.WorldTime + this.TsLimitTime))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("BehaviorTree", 30, "错误的移动状态", [
									"Type",
									e.GetClass().GetName(),
								]),
							this.FinishExecute(!1)))
				: this.FinishExecute(!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ReceiveTickAI(e, t, i) {
		if (0 < this.TsLimitTime && this.EndTime < Time_1.Time.WorldTime)
			this.AnimalMoveToController.Stop(), this.Finish(!0);
		else
			switch (this.AnimalMoveToController.Update(i)) {
				case 1:
					this.Finish(!0);
					break;
				case 2:
					this.Finish(!1);
			}
	}
	OnClear() {
		this.AnimalMoveToController?.Finish(),
			(this.AnimalMoveToController = void 0);
	}
}
(TsTaskAnimalMoveTo.StaticVariablesInited = !1),
	(TsTaskAnimalMoveTo.AnimalValidMoveState = new Set()),
	(exports.default = TsTaskAnimalMoveTo);
