"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	SELF_MASK = 1,
	ALLY_MASK = 2,
	ENEMY_MASK = 4,
	NEUTRAL_MASK = 8;
class TsTaskCheckTarget extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.CheckSight = !1),
			(this.CheckDistance = 0),
			(this.CheckAngle = 0),
			(this.CheckHeight = 0),
			(this.NeedCheckAutonomous = !1),
			(this.CheckCampRelevance = 0),
			(this.CheckCamp = 0),
			(this.CheckTags = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsCheckSight = !1),
			(this.TsNeedCheckAutonomous = !1),
			(this.TsCheckCampRelevance = 0),
			(this.TsCheckCamp = 0),
			(this.DistanceRange = void 0),
			(this.AngleRange = void 0),
			(this.HeightRange = void 0),
			(this.CheckTagsCopy = void 0),
			(this.NeedOneTag = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsCheckSight = this.CheckSight),
			(this.TsNeedCheckAutonomous = this.NeedCheckAutonomous),
			(this.TsCheckCampRelevance = this.CheckCampRelevance),
			(this.TsCheckCamp = this.CheckCamp));
	}
	static SwapAndClearTmpTargets() {
		var e = TsTaskCheckTarget.TmpTargets;
		(TsTaskCheckTarget.TmpTargets = TsTaskCheckTarget.TmpTargets2),
			(TsTaskCheckTarget.TmpTargets2 = e),
			TsTaskCheckTarget.TmpTargets.clear();
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables(),
			this.DistanceRange ||
				((this.DistanceRange = [
					-MathUtils_1.MathUtils.LargeNumber,
					this.CheckDistance,
				]),
				(this.AngleRange = [-this.CheckAngle, this.CheckAngle]),
				(this.HeightRange = [-this.CheckHeight, this.CheckHeight]));
	}
	ReceiveTickAI(e, t, a) {
		var s = e.AiController;
		if (s) {
			var r = s.CharActorComp;
			if (
				(BlackboardController_1.BlackboardController.RemoveValueByEntity(
					r.Entity.Id,
					"TargetArray",
				),
				BlackboardController_1.BlackboardController.RemoveValueByEntity(
					r.Entity.Id,
					"Target",
				),
				TsTaskCheckTarget.TmpTargets
					? (TsTaskCheckTarget.TmpTargets.clear(),
						TsTaskCheckTarget.TmpTargets2.clear())
					: ((TsTaskCheckTarget.TmpTargets = new Set()),
						(TsTaskCheckTarget.TmpTargets2 = new Set())),
				this.RelevanceAndCamp(s, r),
				0 === TsTaskCheckTarget.TmpTargets.size)
			)
				this.FinishExecute(!1);
			else if ((this.Tags(), 0 === TsTaskCheckTarget.TmpTargets.size))
				this.FinishExecute(!1);
			else {
				if (this.TsCheckSight) {
					TsTaskCheckTarget.SwapAndClearTmpTargets();
					for (const e of TsTaskCheckTarget.TmpTargets2)
						MathUtils_1.MathUtils.LocationInRangeArray(
							r.FloorLocation,
							r.ActorRotationProxy,
							e.FloorLocation,
							r.ScaledRadius + e.ScaledRadius,
							this.DistanceRange,
							this.AngleRange,
							this.HeightRange,
						) && TsTaskCheckTarget.TmpTargets.add(e);
				}
				var T = new Array();
				for (const e of TsTaskCheckTarget.TmpTargets)
					(!this.TsNeedCheckAutonomous ||
						e.Entity.GetComponent(3)?.IsAutonomousProxy) &&
						T.push(e.Entity.Id);
				0 === T.length
					? this.FinishExecute(!1)
					: (BlackboardController_1.BlackboardController.SetIntValuesByEntity(
							r.Entity.Id,
							"TargetArray",
							T,
						),
						(s = Math.floor(
							MathUtils_1.MathUtils.GetRandomRange(0, T.length - 1),
						)),
						BlackboardController_1.BlackboardController.SetEntityIdByEntity(
							r.Entity.Id,
							"Target",
							T[s],
						),
						this.FinishExecute(!0));
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	RelevanceAndCamp(e, t) {
		if (
			(0 < (1 & this.TsCheckCampRelevance) &&
				TsTaskCheckTarget.TmpTargets.add(t),
			0 < (2 & this.TsCheckCampRelevance))
		) {
			var a,
				s = e.CharAiDesignComp.Entity.Id;
			for (const t of e.AiPerception.Allies)
				t !== s &&
					(a =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							t,
						)) &&
					TsTaskCheckTarget.TmpTargets.add(a);
		}
		if (0 < (4 & this.TsCheckCampRelevance))
			for (const t of e.AiPerception.AllEnemies) {
				var r =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						t,
					);
				r && TsTaskCheckTarget.TmpTargets.add(r);
			}
		if (0 < (8 & this.TsCheckCampRelevance))
			for (const t of e.AiPerception.Neutrals) {
				var T =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						t,
					);
				T && TsTaskCheckTarget.TmpTargets.add(T);
			}
		if (13 !== this.TsCheckCamp) {
			TsTaskCheckTarget.SwapAndClearTmpTargets();
			for (const e of TsTaskCheckTarget.TmpTargets2)
				e.Actor.Camp === this.TsCheckCamp &&
					TsTaskCheckTarget.TmpTargets.add(e);
		}
	}
	Tags() {
		if (!this.CheckTagsCopy) {
			(this.NeedOneTag = !1), (this.CheckTagsCopy = new Array());
			for (let a = this.CheckTags.Num() - 1; 0 <= a; --a) {
				var e = this.CheckTags.GetKey(a),
					t = this.CheckTags.Get(e);
				this.CheckTagsCopy.push([e, t]), t && (this.NeedOneTag = !0);
			}
		}
		if (this.CheckTagsCopy.length) {
			TsTaskCheckTarget.SwapAndClearTmpTargets();
			for (const e of TsTaskCheckTarget.TmpTargets2) {
				var a = e.Entity.GetComponent(185);
				if (a?.Valid) {
					let t = !0;
					for (var [s, r] of this.CheckTagsCopy)
						if (a.HasTag(s?.TagId) !== r) {
							t = !1;
							break;
						}
					t && TsTaskCheckTarget.TmpTargets.add(e);
				} else this.NeedOneTag || TsTaskCheckTarget.TmpTargets.add(e);
			}
		}
	}
}
exports.default = TsTaskCheckTarget;
