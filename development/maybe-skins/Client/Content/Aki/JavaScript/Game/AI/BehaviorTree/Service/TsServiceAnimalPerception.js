"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceAnimalPerception extends UE.BTService_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.SenseRadius = void 0),
			(this.IsInitTsVariables = !1),
			(this.VectorCache = void 0),
			(this.MinRangeSquared = -0),
			(this.MaxRangeSquared = -0),
			(this.IsEnter = !1),
			(this.IsSetNearerPlayerId = !1);
	}
	InitTsVariables() {
		var e, r;
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((e = this.SenseRadius.LowerBound.Value),
			(r = this.SenseRadius.UpperBound.Value),
			(this.MinRangeSquared = e * e),
			(this.MaxRangeSquared = r * r),
			(this.VectorCache = Vector_1.Vector.Create()),
			(this.IsEnter = !1),
			(this.IsSetNearerPlayerId = !1),
			(this.IsInitTsVariables = !0));
	}
	ReceiveActivationAI(e, r) {
		e instanceof TsAiController_1.default && this.InitTsVariables();
	}
	ReceiveTickAI(e, r, t) {
		e instanceof TsAiController_1.default &&
			(e = e.AiController) &&
			((e = e.CharActorComp), this.HandlePerception(e));
	}
	HandlePerception(e) {
		var r = e.Entity;
		let t,
			a = MathUtils_1.MathUtils.MaxFloat;
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			var o = this.GetMinPlayerDistSquared(e.ActorLocationProxy);
			(t = o.PlayerEntity), (a = o.MinDistSquared);
		} else {
			if (((o = Global_1.Global.BaseCharacter), !o?.IsValid()))
				return void (
					this.IsSetNearerPlayerId &&
					((this.IsSetNearerPlayerId = !1),
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						r.Id,
						"NearerPlayerId",
					))
				);
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(o.EntityId)),
				o.CharacterActorComponent.ActorLocationProxy.Subtraction(
					e.ActorLocationProxy,
					this.VectorCache,
				),
				(a = this.VectorCache.SizeSquared());
		}
		if (t?.Valid) {
			o = t.Id;
			let l = 0;
			(e = a) > this.MaxRangeSquared
				? ((l = 0), this.IsEnter && (this.IsEnter = !1))
				: e > this.MinRangeSquared
					? (l = this.IsEnter ? o : 0)
					: ((l = o), this.IsEnter || (this.IsEnter = !0)),
				0 === l
					? this.IsSetNearerPlayerId &&
						((this.IsSetNearerPlayerId = !1),
						BlackboardController_1.BlackboardController.RemoveValueByEntity(
							r.Id,
							"NearerPlayerId",
						))
					: PerformanceController_1.PerformanceController
							.IsEntityPerformanceTest ||
						(BlackboardController_1.BlackboardController.SetEntityIdByEntity(
							r.Id,
							"NearerPlayerId",
							l,
						),
						(this.IsSetNearerPlayerId = !0));
		} else
			this.IsSetNearerPlayerId &&
				((this.IsSetNearerPlayerId = !1),
				BlackboardController_1.BlackboardController.RemoveValueByEntity(
					r.Id,
					"NearerPlayerId",
				));
	}
	GetMinPlayerDistSquared(e) {
		var r = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap,
			t = ModelManager_1.ModelManager.SceneTeamModel;
		let a,
			o = MathUtils_1.MathUtils.MaxFloat;
		for (const n of r) {
			var l,
				i = t.GetTeamItem(n[0], { ParamType: 2, IsControl: !0 })?.EntityHandle;
			i &&
				(i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(
					e,
					this.VectorCache,
				),
				(l = this.VectorCache.SizeSquared()) < o) &&
				((o = l), (a = i));
		}
		return { PlayerEntity: a, MinDistSquared: o };
	}
}
exports.default = TsServiceAnimalPerception;
