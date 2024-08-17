"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	WorldGlobal_1 = require("../../../World/WorldGlobal"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskRandomNavMeshPathMove extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.BlackboardLocation = ""),
			(this.Sampling = 0),
			(this.RandomRange = 0),
			(this.EndDistance = 0),
			(this.TurnSpeed = 0),
			(this.OpenDebugNode = !1),
			(this.SelectedTargetLocation = void 0),
			(this.FoundPath = !1),
			(this.NavigationPath = void 0),
			(this.CurrentNavigationIndex = 0),
			(this.IsEditor = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMoveState = 0),
			(this.TsBlackboardLocation = ""),
			(this.TsSampling = 0),
			(this.TsRandomRange = 0),
			(this.TsEndDistance = 0),
			(this.TsTurnSpeed = 0),
			(this.TsOpenDebugNode = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveState = this.MoveState),
			(this.TsBlackboardLocation = this.BlackboardLocation),
			(this.TsSampling = this.Sampling),
			(this.TsRandomRange = this.RandomRange),
			(this.TsEndDistance = this.EndDistance),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TsOpenDebugNode = this.OpenDebugNode));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var a = t.AiController;
		if (a) {
			var i = a.CharActorComp,
				o = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
					a.CharAiDesignComp.Entity.Id,
					this.TsBlackboardLocation,
				);
			if (o) {
				(this.SelectedTargetLocation = WorldGlobal_1.WorldGlobal.ToUeVector(o)),
					this.FindRandomPath(t, i.ActorLocation, this.SelectedTargetLocation),
					(this.FoundPath = 0 < this.NavigationPath.length),
					(this.CurrentNavigationIndex = 1);
				var r = a.CharAiDesignComp?.Entity.GetComponent(158);
				if (r?.Valid)
					switch (this.TsMoveState) {
						case 1:
							r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
							break;
						case 2:
							r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
							break;
						case 3:
							r.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
							);
					}
				this.IsEditor = GlobalData_1.GlobalData.IsPlayInEditor;
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"TsTaskMoveToLocation没有获取到目标坐标",
						["BehaviorTree", this.TreeAsset.GetName()],
						["BlackboardLocation", this.TsBlackboardLocation],
					),
					(this.FoundPath = !1);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	FindRandomPath(t, e, a) {
		this.NavigationPath || (this.NavigationPath = new Array());
		var i = Vector_1.Vector.Create(e),
			o = Vector_1.Vector.Create(a),
			r = Vector_1.Vector.Create(a);
		if (
			(i = (r.Subtraction(i, r), Vector_1.Vector.Dist(i, o))) <
				this.TsRandomRange ||
			this.TsSampling < 1
		)
			this.FoundPath =
				AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
					t,
					e,
					a,
					this.NavigationPath,
				);
		else {
			let l = e;
			var s = i / (this.TsSampling + 1);
			for (let a = 0; a < this.TsSampling; a++) {
				let i = Vector_1.Vector.Create();
				r.Multiply((a + 1) * s, i),
					i.Addition(Vector_1.Vector.Create(e), i),
					(i = this.CalculateRandomPosition(i));
				var n = new Array();
				AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
					t,
					l,
					i.ToUeVector(),
					n,
				) && this.NavigationPath.concat(n),
					(l = i.ToUeVector());
			}
			(o = new Array()),
				AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
					t,
					l,
					a,
					o,
				) && this.NavigationPath.concat(o);
		}
	}
	CalculateRandomPosition(t) {
		var e = MathUtils_1.MathUtils.GetRandomFloatNumber(
				0,
				MathUtils_1.PI_DEG_DOUBLE,
			),
			a = Vector_1.Vector.Create(Vector_1.Vector.ForwardVector);
		a.RotateAngleAxis(e, Vector_1.Vector.UpVectorProxy, a),
			(e = MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.TsRandomRange));
		return a.Multiply(e, a).Addition(t, a), a;
	}
	ReceiveTickAI(t, e, a) {
		var i, o;
		this.FoundPath && t instanceof TsAiController_1.default
			? ((t = t.AiController.CharActorComp),
				(i = this.NavigationPath[this.CurrentNavigationIndex]),
				this.TsOpenDebugNode &&
					this.IsEditor &&
					UE.KismetSystemLibrary.DrawDebugSphere(
						this,
						i.ToUeVector(),
						30,
						10,
						ColorUtils_1.ColorUtils.LinearRed,
					),
				(i = Vector_1.Vector.Create(i)).Subtraction(t.ActorLocationProxy, i),
				(i.Z = 0),
				(o = i.Size()),
				this.CurrentNavigationIndex === this.NavigationPath.length - 1 &&
				o < this.TsEndDistance
					? this.Finish(!0)
					: (o < 10 && this.CurrentNavigationIndex++,
						(i.Z = 0),
						(i.X /= o),
						(i.Y /= o),
						t.SetInputDirect(i),
						AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
							t,
							i,
							this.TsTurnSpeed,
						)))
			: this.Finish(!1);
	}
	OnClear() {
		this.AIOwner instanceof TsAiController_1.default &&
			AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
	}
}
exports.default = TsTaskRandomNavMeshPathMove;
