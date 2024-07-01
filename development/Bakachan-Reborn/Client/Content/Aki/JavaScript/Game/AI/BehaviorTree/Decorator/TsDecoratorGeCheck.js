"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorGeCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyTarget = ""),
			(this.Checks = void 0),
			(this.Logic = 0),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKeyTarget = ""),
			(this.TsChecks = void 0),
			(this.TsLogic = void 0);
	}
	InitTsVariables() {
		if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
			(this.IsInitTsVariables = !0),
				(this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
				(this.TsChecks = new Map());
			var r = this.Checks.Num();
			if (0 < r)
				for (let o = 0; o < r; o++) {
					var e = this.Checks.GetKey(o),
						t = this.Checks.Get(e);
					this.TsChecks.set(e, t);
				}
			this.TsLogic = this.Logic;
		}
	}
	PerformConditionCheckAI(r, e) {
		var t = r.AiController;
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						r.GetClass().GetName(),
					]),
				!1
			);
		this.InitTsVariables();
		let o = t.CharActorComp;
		if (this.TsBlackboardKeyTarget) {
			if (
				!(r = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					t.CharAiDesignComp.Entity.Id,
					this.TsBlackboardKeyTarget,
				))
			)
				return !1;
			if (
				!(t =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						r,
					))
			)
				return !1;
			o = t;
		}
		var a = o.Entity.CheckGetComponent(157);
		if (!a) return !1;
		if (1 === this.TsLogic) {
			for (var [s, i] of this.TsChecks)
				if (0 < a.GetBuffTotalStackById(s) === i) return !0;
			return !1;
		}
		for (let r = 0; r < this.Checks.Num(); ++r) {
			var l = this.Checks.GetKey(r),
				h = this.Checks.Get(l);
			if (0 < a.GetBuffTotalStackById(l) !== h) return !1;
		}
		return !0;
	}
}
exports.default = TsDecoratorGeCheck;
