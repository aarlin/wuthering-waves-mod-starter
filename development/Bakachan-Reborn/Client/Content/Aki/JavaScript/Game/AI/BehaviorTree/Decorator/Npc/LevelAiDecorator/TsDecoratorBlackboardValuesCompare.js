"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../../../GlobalData"),
	BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardValuesCompare extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.StringMap = void 0),
			(this.FloatMap = void 0),
			(this.IntMap = void 0),
			(this.BooleanMap = void 0),
			(this.VectorMap = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsStringMap = void 0),
			(this.TsFloatMap = void 0),
			(this.TsIntMap = void 0),
			(this.TsBooleanMap = void 0),
			(this.TsVectorMap = void 0),
			(this.EntityId = void 0),
			(this.TmpVector = void 0);
	}
	InitTsVariables() {
		if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
			(this.IsInitTsVariables = !0),
				(this.TsStringMap = new Map()),
				(this.TsFloatMap = new Map()),
				(this.TsIntMap = new Map()),
				(this.TsBooleanMap = new Map()),
				(this.TsVectorMap = new Map()),
				(this.TmpVector = Vector_1.Vector.Create());
			for (let r = 0, o = this.StringMap.Num(); r < o; r++) {
				var t = this.StringMap.GetKey(r),
					e = this.StringMap.Get(t);
				this.TsStringMap.set(t, e);
			}
			for (let t = 0, e = this.FloatMap.Num(); t < e; t++) {
				var r = this.FloatMap.GetKey(t),
					o = this.FloatMap.Get(r);
				this.TsFloatMap.set(r, o);
			}
			for (let t = 0, e = this.IntMap.Num(); t < e; t++) {
				var a = this.IntMap.GetKey(t),
					i = this.IntMap.Get(a);
				this.TsIntMap.set(a, i);
			}
			for (let t = 0, e = this.BooleanMap.Num(); t < e; t++) {
				var s = this.BooleanMap.GetKey(t),
					l = this.BooleanMap.Get(s);
				this.TsBooleanMap.set(s, l);
			}
			for (let t = 0, e = this.VectorMap.Num(); t < e; t++) {
				var n = this.VectorMap.GetKey(t),
					p = this.VectorMap.Get(n);
				p = Vector_1.Vector.Create(p);
				this.TsVectorMap.set(n, p);
			}
		}
	}
	ExecuteStringMapCompare() {
		for (var [t, e] of this.TsStringMap)
			if (
				BlackboardController_1.BlackboardController.GetStringValueByEntity(
					this.EntityId,
					t,
				) !== e
			)
				return !1;
		return !0;
	}
	ExecuteFloatMapCompare() {
		for (var [t, e] of this.TsFloatMap)
			if (
				BlackboardController_1.BlackboardController.GetFloatValueByEntity(
					this.EntityId,
					t,
				) !== e
			)
				return !1;
		return !0;
	}
	ExecuteIntMapCompare() {
		for (var [t, e] of this.TsIntMap)
			if (
				BlackboardController_1.BlackboardController.GetIntValueByEntity(
					this.EntityId,
					t,
				) !== e
			)
				return !1;
		return !0;
	}
	ExecuteBooleanMapCompare() {
		for (var [t, e] of this.TsBooleanMap)
			if (
				BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
					this.EntityId,
					t,
				) !== e
			)
				return !1;
		return !0;
	}
	ExecuteVectorMapCompare() {
		for (var [t, e] of this.TsVectorMap) {
			if (
				!(t =
					BlackboardController_1.BlackboardController.GetVectorValueByEntity(
						this.EntityId,
						t,
					))
			)
				return !1;
			if ((this.TmpVector.FromUeVector(t), !this.TmpVector.Equals(e)))
				return !1;
		}
		return !0;
	}
	PerformConditionCheckAI(t, e) {
		var r = t.AiController;
		return r
			? (this.InitTsVariables(),
				(this.EntityId = r.CharActorComp.Entity.Id),
				this.ExecuteIntMapCompare() &&
					this.ExecuteStringMapCompare() &&
					this.ExecuteBooleanMapCompare() &&
					this.ExecuteFloatMapCompare() &&
					this.ExecuteVectorMapCompare())
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorBlackboardValuesCompare;
