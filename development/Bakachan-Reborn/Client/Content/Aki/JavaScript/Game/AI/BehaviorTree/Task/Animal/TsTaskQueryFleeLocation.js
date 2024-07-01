"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../../GlobalData"),
	ColorUtils_1 = require("../../../../Utils/ColorUtils"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../../Controller/AiContollerLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	BLACKBOARD_KEY_FLEE_LOCATION = "FleeLocation",
	ANGLE_INTERVAL = 30,
	RADIUS = 300,
	TURN_COST_WEIGHT = 0.25,
	TURN_COST_WEIGHT_2 = 0.75,
	TURN_COST_WEIGHT_3 = 1,
	TURN_COST_DIVIDING_LINE_2 = 0,
	TURN_COST_DIVIDING_LINE_3 = 0.707,
	TEST_MODE = !1,
	QUERY_LOCATION_CD = 0.5,
	Z_ALLOWABLE_DIFFERENCE = 45;
class QuatNode {
	constructor(t, e) {
		(this.Quaternion = Quat_1.Quat.Create(t)),
			(this.CostBase = e),
			(this.Cost = 0),
			(this.VectorCache = Vector_1.Vector.Create());
	}
}
class TsTaskQueryFleeLocation extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.TargetKey = ""),
			(this.DebugMode = !1),
			(this.Character = void 0),
			(this.TargetCharacter = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsTargetKey = ""),
			(this.VectorCache1 = void 0),
			(this.VectorCache2 = void 0),
			(this.VectorCache3 = void 0),
			(this.QuatNodeQueue = void 0),
			(this.NavigationPath = void 0),
			(this.FoundPath = !1),
			(this.CdInternal = -0);
	}
	static InitStaticVariables() {
		(TsTaskQueryFleeLocation.QuaternionQueue = new Array()),
			TsTaskQueryFleeLocation.QuaternionQueue.push(
				Quat_1.Quat.Create(0, 0, 0, 1),
			);
		var t = MathUtils_1.PI_DEG / 30;
		for (let r = 1; r < t; ++r) {
			var e = 30 * r * 0.5 * MathUtils_1.MathUtils.DegToRad,
				a = Quat_1.Quat.Create(0, 0, Math.sin(e), Math.cos(e));
			a =
				(TsTaskQueryFleeLocation.QuaternionQueue.push(a),
				Quat_1.Quat.Create(0, 0, Math.sin(-e), Math.cos(-e)));
			TsTaskQueryFleeLocation.QuaternionQueue.push(a);
		}
	}
	InitTsVariables(t) {
		if (!this.IsInitTsVariables) {
			(this.TsTargetKey = this.TargetKey),
				(this.VectorCache1 = Vector_1.Vector.Create()),
				(this.VectorCache2 = Vector_1.Vector.Create()),
				(this.VectorCache3 = Vector_1.Vector.Create()),
				(this.QuatNodeQueue = new Array());
			for (const t of TsTaskQueryFleeLocation.QuaternionQueue) {
				var e = new QuatNode(t, Math.abs(t.Z));
				this.QuatNodeQueue.push(e);
			}
			(this.NavigationPath = new Array()),
				(this.CdInternal = -1),
				(this.IsInitTsVariables = !0);
		}
	}
	ReceiveExecuteAI(t, e) {
		TsTaskQueryFleeLocation.StaticVariablesInited ||
			(TsTaskQueryFleeLocation.InitStaticVariables(),
			(TsTaskQueryFleeLocation.StaticVariablesInited = !0));
		var a = t.AiController;
		a
			? (this.InitTsVariables(a),
				Time_1.Time.WorldTimeSeconds < this.CdInternal ||
				((this.CdInternal = Time_1.Time.WorldTimeSeconds + 0.5),
				(this.Character = a.CharActorComp),
				!this.FindTarget()) ||
				!this.QueryFleeLocation()
					? this.Finish(!1)
					: ((a = this.NavigationPath.length),
						(a = this.NavigationPath[a - 1]),
						BlackboardController_1.BlackboardController.SetVectorValueByEntity(
							this.Character.Entity.Id,
							"FleeLocation",
							a.X,
							a.Y,
							a.Z,
						),
						this.Finish(!0)))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	FindTarget() {
		if (this.TsTargetKey) {
			var t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
				this.Character.Entity.Id,
				this.TsTargetKey,
			);
			if (t && (t = EntitySystem_1.EntitySystem.Get(t)))
				return (this.TargetCharacter = t.GetComponent(3)), !0;
		}
		return !1;
	}
	QueryFleeLocation() {
		var t = this.Character.ActorLocationProxy,
			e =
				(t.Subtraction(
					this.TargetCharacter.ActorLocationProxy,
					this.VectorCache1,
				),
				(this.VectorCache1.Z = 0),
				this.VectorCache1.Normalize(),
				this.VectorCache3.DeepCopy(this.VectorCache1),
				this.VectorCache1.MultiplyEqual(300),
				(this.FoundPath = !1),
				this.Character.ActorForwardProxy);
		for (const a of this.QuatNodeQueue)
			a.Quaternion.RotateVector(this.VectorCache1, this.VectorCache2),
				a.VectorCache.DeepCopy(this.VectorCache2),
				(this.VectorCache2.Z = 0),
				this.VectorCache2.Normalize(),
				(a.Cost = 0.5 * (1 - e.DotProduct(this.VectorCache2))),
				a.VectorCache.AdditionEqual(t);
		let a = 0.25;
		var r = this.VectorCache3.DotProduct(e);
		r > 0.707 ? (a = 1) : r > 0 && (a = 0.75),
			this.QuatNodeQueue.sort(
				(t, e) => a * (t.Cost - e.Cost) + (1 - a) * (t.CostBase - e.CostBase),
			),
			this.DebugDraw2();
		for (const e of this.QuatNodeQueue) {
			var o = (0, puerts_1.$ref)(void 0);
			if (
				UE.NavigationSystemV1.K2_ProjectPointToNavigation(
					GlobalData_1.GlobalData.World,
					e.VectorCache.ToUeVector(),
					o,
					void 0,
					void 0,
				)
			) {
				o = Vector_1.Vector.Create((0, puerts_1.$unref)(o));
				var i,
					s = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
						GlobalData_1.GlobalData.World,
						t.ToUeVector(),
						o.ToUeVector(),
						this.NavigationPath,
					);
				if (
					(s &&
						((i = this.CheckLegalZ(o, this.Character.FloorLocation)),
						(this.FoundPath = s && i)),
					this.FoundPath)
				) {
					GlobalData_1.GlobalData.IsPlayInEditor &&
						this.DebugMode &&
						this.DebugDraw(o.ToUeVector(), ColorUtils_1.ColorUtils.LinearGreen);
					break;
				}
			}
			GlobalData_1.GlobalData.IsPlayInEditor &&
				this.DebugMode &&
				this.DebugDraw(
					e.VectorCache.ToUeVector(),
					ColorUtils_1.ColorUtils.LinearRed,
				);
		}
		return this.FoundPath;
	}
	CheckLegalZ(t, e) {
		return Math.abs(t.Z - e.Z) <= 45;
	}
	DebugDraw(t, e) {
		UE.KismetSystemLibrary.DrawDebugSphere(this, t, 20, 10, e, 0.25);
	}
	DebugDraw2() {
		GlobalData_1.GlobalData.IsPlayInEditor;
	}
	OnClear() {
		(this.Character = void 0), (this.TargetCharacter = void 0);
	}
}
(TsTaskQueryFleeLocation.StaticVariablesInited = !1),
	(TsTaskQueryFleeLocation.QuaternionQueue = void 0),
	(exports.default = TsTaskQueryFleeLocation);
