"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorActorsLocation extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.KeyActorA = ""),
			(this.KeyActorB = ""),
			(this.DistanceRange = void 0),
			(this.AngleRange = void 0),
			(this.HeightRange = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsKeyActorA = ""),
			(this.TsKeyActorB = ""),
			(this.TsDistanceRange = void 0),
			(this.TsAngleRange = void 0),
			(this.TsHeightRange = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsKeyActorA = this.KeyActorA),
			(this.TsKeyActorB = this.KeyActorB),
			(this.TsDistanceRange = new MathUtils_1.FastUeFloatRange(
				this.DistanceRange,
			)),
			(this.TsAngleRange = new MathUtils_1.FastUeFloatRange(this.AngleRange)),
			(this.TsHeightRange = new MathUtils_1.FastUeFloatRange(
				this.HeightRange,
			)));
	}
	PerformConditionCheckAI(t, e) {
		var r = t.AiController;
		if (!r)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				!1
			);
		this.InitTsVariables();
		var o = r.CharActorComp,
			a = o.Entity.Id;
		let i = o;
		if (this.TsKeyActorA) {
			if (
				!(o = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					a,
					this.TsKeyActorA,
				))
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"不存在BlackboardKey",
							["Key", this.TsKeyActorA],
							["AI", t.GetName()],
						),
					!1
				);
			var s =
				CharacterController_1.CharacterController.GetCharacterActorComponentById(
					o,
				);
			if (!s)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "不存在Entity", ["Id", o]),
					!1
				);
			i = s;
		}
		let n,
			l = r.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(2);
		if (this.TsKeyActorB) {
			if (
				!(o = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					a,
					this.TsKeyActorB,
				))
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"不存在BlackboardKey",
							["Key", this.TsKeyActorB],
							["AI", t.GetName()],
						),
					!1
				);
			if (!(s = EntitySystem_1.EntitySystem.GetComponent(o, 2)))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "不存在Entity", ["Id", o]),
					!1
				);
			l = s;
		}
		return (
			!!l &&
			((n = (0, RegisterComponent_1.isComponentInstance)(l, 3)
				? l.FloorLocation
				: l.ActorLocationProxy),
			MathUtils_1.MathUtils.LocationInFastUeRange(
				i.FloorLocation,
				i.ActorRotationProxy,
				n,
				i.ScaledRadius + l.ScaledRadius,
				this.TsDistanceRange,
				this.TsAngleRange,
				this.TsHeightRange,
			))
		);
	}
}
exports.default = TsDecoratorActorsLocation;
