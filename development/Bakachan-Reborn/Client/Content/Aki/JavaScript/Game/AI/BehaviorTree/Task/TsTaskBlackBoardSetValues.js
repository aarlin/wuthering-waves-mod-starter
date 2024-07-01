"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBlackBoardSetValues extends TsTaskAbortImmediatelyBase_1.default {
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
			(this.TsVectorMap = void 0);
	}
	InitTsVariables() {
		if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
			(this.IsInitTsVariables = !0),
				(this.TsStringMap = new Map()),
				(this.TsFloatMap = new Map()),
				(this.TsIntMap = new Map()),
				(this.TsBooleanMap = new Map()),
				(this.TsVectorMap = new Map());
			for (let e = 0, o = this.StringMap.Num(); e < o; e++) {
				var t = this.StringMap.GetKey(e),
					a = this.StringMap.Get(t);
				this.TsStringMap.set(t, a);
			}
			for (let t = 0, a = this.FloatMap.Num(); t < a; t++) {
				var e = this.FloatMap.GetKey(t),
					o = this.FloatMap.Get(e);
				this.TsFloatMap.set(e, o);
			}
			for (let t = 0, a = this.IntMap.Num(); t < a; t++) {
				var r = this.IntMap.GetKey(t),
					s = this.IntMap.Get(r);
				this.TsIntMap.set(r, s);
			}
			for (let t = 0, a = this.BooleanMap.Num(); t < a; t++) {
				var i = this.BooleanMap.GetKey(t),
					l = this.BooleanMap.Get(i);
				this.TsBooleanMap.set(i, l);
			}
			for (let t = 0, a = this.VectorMap.Num(); t < a; t++) {
				var n = this.VectorMap.GetKey(t),
					p = this.VectorMap.Get(n);
				p = Vector_1.Vector.Create(p);
				this.TsVectorMap.set(n, p);
			}
		}
	}
	ReceiveExecuteAI(t, a) {
		var e = t.AiController;
		e
			? (this.InitTsVariables(),
				(e = e.CharActorComp.Entity.Id),
				this.ExecuteStringMap(e),
				this.ExecuteFloatMap(e),
				this.ExecuteIntMap(e),
				this.ExecuteBooleanMap(e),
				this.ExecuteVectorMap(e),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ExecuteStringMap(t) {
		for (var [a, e] of this.TsStringMap)
			BlackboardController_1.BlackboardController.SetStringValueByEntity(
				t,
				a,
				e,
			);
	}
	ExecuteFloatMap(t) {
		for (var [a, e] of this.TsFloatMap)
			BlackboardController_1.BlackboardController.SetFloatValueByEntity(
				t,
				a,
				e,
			);
	}
	ExecuteIntMap(t) {
		for (var [a, e] of this.TsIntMap)
			BlackboardController_1.BlackboardController.SetIntValueByEntity(t, a, e);
	}
	ExecuteBooleanMap(t) {
		for (var [a, e] of this.TsBooleanMap)
			BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
				t,
				a,
				e,
			);
	}
	ExecuteVectorMap(t) {
		for (var [a, e] of this.TsVectorMap)
			BlackboardController_1.BlackboardController.SetVectorValueByEntity(
				t,
				a,
				e.X,
				e.Y,
				e.Z,
			);
	}
}
exports.default = TsTaskBlackBoardSetValues;
