"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	MAX_ERROR = 10;
class TsDecoratorBlackboardDistanceCompare extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.CompareType = 0),
			(this.OtherLocationKey = ""),
			(this.CompareValue = 0),
			(this.LocationCache = void 0),
			(this.OtherLocationCache = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsCompareType = 0),
			(this.TsOtherLocationKey = ""),
			(this.TsCompareValue = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsCompareType = this.CompareType),
			(this.TsOtherLocationKey = this.OtherLocationKey),
			(this.TsCompareValue = this.CompareValue));
	}
	PerformConditionCheckAI(e, r) {
		if (!(e instanceof TsAiController_1.default))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1
			);
		var t = e.GetEntity();
		if (!t) return !1;
		this.InitTsVariables();
		var o = e.AiController.CharActorComp;
		if (
			(this.LocationCache || (this.LocationCache = Vector_1.Vector.Create()),
			this.LocationCache.DeepCopy(o.ActorLocationProxy),
			this.OtherLocationCache ||
				(this.OtherLocationCache = Vector_1.Vector.Create()),
			this.TsOtherLocationKey)
		) {
			if (
				!(t =
					BlackboardController_1.BlackboardController.GetVectorValueByEntity(
						t.Id,
						this.TsOtherLocationKey,
					))
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 30, "不存在BlackboardKey", [
							"Key",
							this.TsOtherLocationKey,
						]),
					!1
				);
			this.OtherLocationCache.DeepCopy(t);
		} else {
			if (!(t = o.CreatureData.GetInitLocation())) return !1;
			this.OtherLocationCache.DeepCopy(t);
		}
		if (!this.LocationCache || !this.OtherLocationCache) return !1;
		var a = Vector_1.Vector.DistSquared(
				this.LocationCache,
				this.OtherLocationCache,
			),
			i = this.TsCompareValue * this.TsCompareValue;
		switch (this.TsCompareType) {
			case 0:
				return Math.abs(a - i) <= 10;
			case 1:
				return Math.abs(a - i) > 10;
			case 2:
				return a < i;
			case 3:
				return a <= i;
			case 4:
				return i < a;
			case 5:
				return i <= a;
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 30, "不支持的比较类型", [
							"Type",
							e.GetClass().GetName(),
						]),
					!1
				);
		}
	}
}
exports.default = TsDecoratorBlackboardDistanceCompare;
