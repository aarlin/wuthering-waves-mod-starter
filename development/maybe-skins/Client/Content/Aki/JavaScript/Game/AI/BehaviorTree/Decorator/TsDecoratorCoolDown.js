"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorCoolDown extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.Id = 0),
			(this.RandomCdTime = void 0),
			(this.ReturnTrueFirstTime = !1),
			(this.IsInitTsVariables = !1),
			(this.TsId = 0),
			(this.TsRandomCdTime = void 0),
			(this.TsReturnTrueFirstTime = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsId = this.Id),
			(this.TsRandomCdTime = new MathUtils_1.FastUeFloatRange(
				this.RandomCdTime,
			)),
			(this.TsReturnTrueFirstTime = this.ReturnTrueFirstTime));
	}
	PerformConditionCheckAI(e, i) {
		e = e.AiController;
		var t =
			(this.InitTsVariables(),
			ModelManager_1.ModelManager.GameModeModel.IsMulti
				? TimeUtil_1.TimeUtil.GetServerTimeStamp()
				: Time_1.Time.WorldTime);
		let s = e.GetCoolDownTime(this.TsId);
		return 0 === s
			? ((s =
					t +
					MathUtils_1.MathUtils.GetRandomRange(
						this.TsRandomCdTime.LowerBoundValue,
						this.TsRandomCdTime.UpperBoundValue,
					)),
				e.SetCoolDownTime(this.TsId, s, !0, "行为树"),
				this.TsReturnTrueFirstTime)
			: !(
					s > t ||
					((s =
						t +
						MathUtils_1.MathUtils.GetRandomRange(
							this.TsRandomCdTime.LowerBoundValue,
							this.TsRandomCdTime.UpperBoundValue,
						)),
					e.SetCoolDownTime(this.TsId, s, !0, "行为树"),
					0)
				);
	}
}
exports.default = TsDecoratorCoolDown;
