"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskMoveToLocation extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.NavigationOn = !1),
			(this.BlackboardLocation = ""),
			(this.EndDistance = 0),
			(this.TurnSpeed = 0),
			(this.OpenDebugNode = !1),
			(this.LimitTime = 0),
			(this.IsFly = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMoveState = 0),
			(this.TsNavigationOn = !1),
			(this.TsBlackboardLocation = ""),
			(this.TsOpenDebugNode = !1),
			(this.TsLimitTime = -0),
			(this.TsIsFly = !1),
			(this.EndTime = -0),
			(this.MoveComp = void 0),
			(this.HandleMoveEnd = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveState = this.MoveState),
			(this.TsNavigationOn = this.NavigationOn),
			(this.TsBlackboardLocation = this.BlackboardLocation),
			(this.TsOpenDebugNode = this.OpenDebugNode),
			(this.TsLimitTime = this.LimitTime),
			(this.TsIsFly = this.IsFly));
	}
	ReceiveExecuteAI(e, i) {
		this.InitTsVariables();
		var t,
			o = e.AiController;
		o
			? ((o = o.CharActorComp.Entity),
				(t = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
					o.Id,
					this.TsBlackboardLocation,
				))
					? ((t = Vector_1.Vector.Create(t)),
						this.HandleMoveEnd ||
							(this.HandleMoveEnd = (e) => {
								1 === e ? this.Finish(!0) : this.Finish(!1);
							}),
						(this.MoveComp = o.GetComponent(36)),
						(o = {
							Points: [{ Index: 0, Position: t, MoveState: this.TsMoveState }],
							Navigation: this.TsNavigationOn,
							IsFly: this.TsIsFly,
							DebugMode: this.TsOpenDebugNode,
							Loop: !1,
							Callback: this.HandleMoveEnd,
							ReturnFalseWhenNavigationFailed: !0,
						}),
						this.MoveComp.MoveAlongPath(o),
						-1 < this.TsLimitTime &&
							(this.EndTime = Time_1.Time.WorldTime + this.TsLimitTime))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"BehaviorTree",
								6,
								"TsTaskMoveToLocation没有获取到目标坐标",
								["BehaviorTree", this.TreeAsset.GetName()],
								["BlackboardLocation", this.TsBlackboardLocation],
							),
						this.Finish(!1)))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ReceiveTickAI(e, i, t) {
		e instanceof TsAiController_1.default
			? -1 < this.TsLimitTime &&
				this.EndTime < Time_1.Time.WorldTime &&
				this.Finish(!0)
			: this.Finish(!1);
	}
	OnClear() {
		this.MoveComp && (this.MoveComp.StopMove(!0), (this.MoveComp = void 0)),
			(this.EndTime = 0);
	}
}
exports.default = TsTaskMoveToLocation;
