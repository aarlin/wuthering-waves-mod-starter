"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	PI = 3.14;
class TsTaskFindPositionInRange extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.RangeCenterKey = ""),
			(this.RangeRadius = 0),
			(this.BlackboardKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsRangeCenterKey = ""),
			(this.TsRangeRadius = 0),
			(this.TsBlackboardKey = ""),
			(this.RangeCenter = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsRangeCenterKey = this.RangeCenterKey),
			(this.TsRangeRadius = this.RangeRadius),
			(this.TsBlackboardKey = this.BlackboardKey));
	}
	ReceiveExecuteAI(e, t) {
		if ((this.InitTsVariables(), (a = e.AiController)))
			if (((a = a.CharActorComp), a?.Valid)) {
				var a,
					r = (a = a.Entity).Id;
				if (this.TsRangeCenterKey) {
					var s =
						BlackboardController_1.BlackboardController.GetVectorValueByEntity(
							r,
							this.TsRangeCenterKey,
						);
					if (!s)
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("BehaviorTree", 30, "不存在BlackboardKey", [
									"Key",
									this.TsRangeCenterKey,
								]),
							void this.FinishExecute(!1)
						);
					this.RangeCenter = Vector_1.Vector.Create(s);
				} else
					(s = a.GetComponent(0).GetInitLocation()),
						(this.RangeCenter = Vector_1.Vector.Create(s.X, s.Y, s.Z));
				(a = Vector_1.Vector.Create()),
					(s = this.RandomPointInCircle(this.TsRangeRadius)),
					(a.X = this.RangeCenter.X + s.X),
					(a.Y = this.RangeCenter.Y + s.Y),
					BlackboardController_1.BlackboardController.SetVectorValueByEntity(
						r,
						this.TsBlackboardKey,
						a.X,
						a.Y,
						a.Z,
					),
					this.FinishExecute(!0);
			} else this.FinishExecute(!1);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	RandomPointInCircle(e) {
		var t;
		return e <= 0
			? { X: 0, Y: 0 }
			: ((e = MathUtils_1.MathUtils.GetRandomRange(0, e * e)),
				(t = MathUtils_1.MathUtils.GetRandomRange(0, 6.28)),
				{ X: (e = Math.sqrt(e)) * Math.cos(t), Y: e * Math.sin(t) });
	}
}
exports.default = TsTaskFindPositionInRange;
