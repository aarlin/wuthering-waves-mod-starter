"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorTagCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyTarget = ""),
			(this.Checks = void 0),
			(this.Logic = 0),
			(this.IsBattleTag = !0),
			(this.IsInitTsVariables = !1),
			(this.TsCheckTags = void 0),
			(this.TsCheckTagValues = void 0),
			(this.TsLogic = void 0),
			(this.TsBlackBoardKeyTarget = "");
	}
	InitTsVariables() {
		if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
			(this.IsInitTsVariables = !0),
				(this.TsLogic = this.Logic),
				(this.TsBlackBoardKeyTarget = this.BlackboardKeyTarget),
				(this.TsCheckTags = new Array()),
				(this.TsCheckTagValues = new Array());
			for (let r = this.Checks.Num() - 1; 0 <= r; --r) {
				var e = this.Checks.GetKey(r),
					t = this.Checks.Get(e);
				this.TsCheckTags.push(e?.TagId), this.TsCheckTagValues.push(t);
			}
		}
	}
	PerformConditionCheckAI(e, t) {
		var r = e.AiController;
		if (!r)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1
			);
		if (!r.CharActorComp)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"错误的Controller类型",
						["Type", e.GetClass().GetName()],
						["Id", e.GetEntity().Id],
					),
				!1
			);
		this.InitTsVariables();
		let s = r.CharActorComp.Entity;
		if (this.TsBlackBoardKeyTarget) {
			if (
				!(e = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					s.Id,
					this.TsBlackBoardKeyTarget,
				))
			)
				return !1;
			if (!(s = EntitySystem_1.EntitySystem.Get(e))?.Valid) return !1;
		}
		var a = s.GetComponent(185);
		if (1 === this.TsLogic) {
			for (let e = this.TsCheckTags.length - 1; 0 <= e; --e) {
				var o = this.TsCheckTags[e],
					i = this.TsCheckTagValues[e];
				if (a?.HasTag(o) === i) return !0;
			}
			return !1;
		}
		for (let e = this.TsCheckTags.length - 1; 0 <= e; --e) {
			var h = this.TsCheckTags[e],
				l = this.TsCheckTagValues[e];
			if (a?.HasTag(h) !== l) return !1;
		}
		return !0;
	}
}
exports.default = TsDecoratorTagCheck;
