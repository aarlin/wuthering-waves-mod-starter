"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	NEAR_ZERO = 1e-6,
	NAVIGATION_COMPLETE_DISTANCE = 50,
	EDGE_Z = 100;
class TsTaskFlee extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.TargetKey = ""),
			(this.OverrideTurnSpeed = !1),
			(this.TurnSpeed = 0),
			(this.ForceNavigation = !1),
			(this.LeapMode = !1),
			(this.LeapDistance = 0),
			(this.IsInitTsVariables = !1),
			(this.TsTargetKey = ""),
			(this.TsOverrideTurnSpeed = !1),
			(this.TsTurnSpeed = 0),
			(this.TsForceNavigation = !1),
			(this.TsLeapMode = !1),
			(this.TsLeapDistance = 0),
			(this.FoundPath = !1),
			(this.NavigationPath = void 0),
			(this.CurrentNavigationIndex = 0),
			(this.NavigationEndTime = -0),
			(this.IsFlying = !1),
			(this.MoveComp = void 0),
			(this.CompleteDistance = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsTargetKey = this.TargetKey),
			(this.TsOverrideTurnSpeed = this.OverrideTurnSpeed),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TsForceNavigation = this.ForceNavigation),
			(this.TsLeapMode = this.LeapMode),
			(this.TsLeapDistance = this.LeapDistance));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var i = e.AiController;
		if (i)
			if (i.AiFlee) {
				let t;
				if (this.TsTargetKey) {
					if (
						(r =
							BlackboardController_1.BlackboardController.GetEntityIdByEntity(
								i.CharActorComp.Entity.Id,
								this.TsTargetKey,
							))
					) {
						const e = EntitySystem_1.EntitySystem.Get(r);
						e && (t = e.GetComponent(3));
					}
				} else
					(r = i.AiHateList.GetCurrentTarget()),
						(t = r?.Entity?.GetComponent(3));
				if (t)
					if ((r = i.CharActorComp)) {
						const l = r.Entity;
						if (l)
							if (((this.MoveComp = l.GetComponent(161)), this.MoveComp)) {
								5 === this.MoveComp.CharacterMovement.MovementMode &&
									(this.IsFlying = !0);
								var r = r.ActorLocationProxy,
									o = Vector_1.Vector.Create(),
									a =
										(r.Subtraction(t.ActorLocationProxy, o),
										(o.Z = 0),
										o.Normalize(1e-6),
										new UE.Vector(-o.Y, o.X, 0)),
									s =
										MathUtils_1.MathUtils.GetRandomRange(
											i.AiFlee.FleeAngle.Min,
											i.AiFlee.FleeAngle.Max,
										) * MathUtils_1.MathUtils.DegToRad,
									n = Math.cos(s),
									h =
										((s = Math.sin(s)),
										MathUtils_1.MathUtils.GetRandomRange(
											i.AiFlee.FleeDistance.Min,
											i.AiFlee.FleeDistance.Max,
										));
								let l = 0;
								this.IsFlying && (l = i.AiFlee.FleeHeight),
									(o = new UE.Vector(
										r.X + (o.X * n + a.X * s) * h,
										r.Y + (o.Y * n + a.Y * s) * h,
										r.Z + l,
									)),
									this.NavigationPath || (this.NavigationPath = new Array()),
									this.IsFlying
										? ((n = Vector_1.Vector.Create(r)),
											(this.FoundPath = !0),
											this.NavigationPath.splice(0, this.NavigationPath.length),
											this.NavigationPath.push(n),
											this.NavigationPath.push(Vector_1.Vector.Create(o)))
										: (this.FoundPath =
												AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
													e,
													r.ToUeVector(),
													o,
													this.NavigationPath,
												)),
									this.TsForceNavigation ||
										this.FoundPath ||
										((a = Vector_1.Vector.Create(r)),
										(this.FoundPath = !0),
										this.NavigationPath.splice(0, this.NavigationPath.length),
										this.NavigationPath.push(a),
										this.NavigationPath.push(Vector_1.Vector.Create(o))),
									this.FoundPath ||
										((s = (0, puerts_1.$ref)(void 0)),
										UE.NavigationSystemV1.K2_ProjectPointToNavigation(
											GlobalData_1.GlobalData.World,
											o,
											s,
											void 0,
											void 0,
											new UE.Vector(h, h, 100),
										) &&
											(this.FoundPath =
												AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
													e,
													r.ToUeVector(),
													(0, puerts_1.$unref)(s),
													this.NavigationPath,
												))),
									this.FoundPath
										? ((this.CurrentNavigationIndex = 1),
											(this.NavigationEndTime =
												Time_1.Time.WorldTime + i.AiFlee.TimeMilliseconds),
											(n = i.CharAiDesignComp.Entity.GetComponent(89))?.Valid &&
												n.SetMoveState(
													CharacterUnifiedStateTypes_1.ECharMoveState.Run,
												))
										: this.Finish(!0);
							} else
								Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"BehaviorTree",
										30,
										"CharacterMoveComponent Invalid",
										["Type", e.GetClass().GetName()],
									);
						else
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("BehaviorTree", 30, "Entity Invalid", [
									"Type",
									e.GetClass().GetName(),
								]);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"BehaviorTree",
								30,
								"CharacterActorComponent Invalid",
								["Type", e.GetClass().GetName()],
							);
				else (this.FoundPath = !1), this.Finish(!0);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "没有配置逃跑", [
						"AiBaseId",
						i.AiBase.Id,
					]);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]);
	}
	ReceiveTickAI(e, t, i) {
		var r, o, a;
		(e = e.AiController)
			? Time_1.Time.WorldTime > this.NavigationEndTime ||
				((r = e.CharActorComp),
				5 === this.MoveComp.CharacterMovement.MovementMode
					? (this.IsFlying = !0)
					: (this.IsFlying = !1),
				(o = Vector_1.Vector.Create(
					this.NavigationPath[this.CurrentNavigationIndex],
				)).Subtraction(r.ActorLocationProxy, o),
				this.IsFlying || (o.Z = 0),
				(a = o.Size()),
				(this.CompleteDistance = this.TsLeapMode ? this.TsLeapDistance : 50),
				a < this.CompleteDistance &&
					(this.CurrentNavigationIndex++,
					this.CurrentNavigationIndex === this.NavigationPath.length))
				? this.Finish(!0)
				: ((o.Z /= a),
					(o.X /= a),
					(o.Y /= a),
					r.SetInputDirect(o),
					this.TsOverrideTurnSpeed
						? AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
								r,
								o,
								this.TsTurnSpeed,
							)
						: AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
								r,
								o,
								e.AiWanderInfos?.AiWander
									? e.AiWanderInfos.AiWander.TurnSpeed
									: 360,
							))
			: this.FinishExecute(!1);
	}
	OnClear() {
		this.AIOwner instanceof TsAiController_1.default &&
			AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
			(this.MoveComp = void 0),
			(this.NavigationPath = void 0),
			(this.FoundPath = !1);
	}
}
exports.default = TsTaskFlee;
