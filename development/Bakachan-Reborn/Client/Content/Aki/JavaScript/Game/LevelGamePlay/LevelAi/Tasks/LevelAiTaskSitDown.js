"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskSitDown = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiTask_1 = require("../LevelAiTask"),
	LevelAiTaskMoveTo_1 = require("./LevelAiTaskMoveTo"),
	LevelAiTaskSetItemCollision_1 = require("./LevelAiTaskSetItemCollision"),
	LevelAiTaskSuccess_1 = require("./LevelAiTaskSuccess"),
	LevelAiTaskTurnAndPlayMontage_1 = require("./LevelAiTaskTurnAndPlayMontage"),
	NEARBY_CHAIR_OFFSET = 100,
	MOVE_TO_NEARBY_CHAIR_SPEED = 100,
	MOVE_TO_CHAIR_SPEED = 70;
class LevelAiTaskSitDown extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments),
			(this.CanRecordPlanProgress = !1),
			(this.Cost = 0),
			(this.gU = !1),
			(this.jTe = void 0);
	}
	MakePlanExpansions(e, t) {
		this.PrintDescription(
			"Sit Down Task Make Plan Expansions",
			["LevelIndex", e.CurrentLevelIndex],
			["StepIndex", e.CurrentStepIndex],
		),
			this.gU || this.Init(),
			this.CreatePlanSteps(e, t.MakeCopy());
	}
	Init() {
		if (!this.gU) {
			var e = this.Params;
			if (e) {
				var t = e.Option.PosEntityId;
				if (
					((this.jTe =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)),
					this.jTe)
				)
					if ((o = this.jTe.Entity.GetComponent(178))) {
						var o = o.GetSubEntityInteractLogicController(),
							i = this.CreatureDataComponent.Entity.GetComponent(1),
							a = this.CreatureDataComponent.GetPbDataId(),
							n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
							r =
								(n.Serialize(
									this.CharacterPlanComponent,
									this.CreatureDataComponent,
									this.Description,
								),
								o.GetInteractPoint()),
							s = ((o = o.GetForwardDirection()), Vector_1.Vector.Create()),
							l = Vector_1.Vector.Create(),
							C =
								((s =
									((C =
										((s =
											(o.Multiply(100, s),
											r.Addition(s, l),
											new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo())).Serialize(
											this.CharacterPlanComponent,
											this.CreatureDataComponent,
											this.Description +
												" Move To Nearby Chair Location: " +
												l.ToString(),
										),
										(s.Target = Vector_1.Vector.Create()),
										s.Target.DeepCopy(l),
										(s.MoveState = 1),
										(s.MoveSpeed = 100),
										n.NextNodes.push(s),
										new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision())).Serialize(
										this.CharacterPlanComponent,
										this.CreatureDataComponent,
										this.Description + " Ignore Actor Collision",
									),
									(C.ItemEntity = this.jTe),
									(C.IsIgnore = !0),
									s.NextNodes.push(C),
									i.ActorLocationProxy)),
								(i = Vector_1.Vector.Create(r.X, r.Y, s.Z)),
								(s =
									((r = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo()).Serialize(
										this.CharacterPlanComponent,
										this.CreatureDataComponent,
										this.Description +
											" Move To Interact Location: " +
											i.ToString(),
									),
									(r.Target = Vector_1.Vector.Create()),
									r.Target.DeepCopy(i),
									(r.MoveState = 1),
									(r.MoveSpeed = 70),
									C.NextNodes.push(r),
									Vector_1.Vector.Create())),
								(i = Vector_1.Vector.Create()),
								o.Multiply(200, i),
								l.Addition(i, s),
								{
									EntityId: a,
									Pos: s,
									MontageId: e.Option.MontageId.MontageId,
									IsAbpMontage: e.Option.MontageId.IsAbp,
									LoopDuration: e.Option.Duration,
								}),
							T =
								((i =
									((o =
										new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage()).Serialize(
										this.CharacterPlanComponent,
										this.CreatureDataComponent,
										this.Description +
											" Turn To Chair And Play Sit Down Montage",
										C,
									),
									r.NextNodes.push(o),
									new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo())).Serialize(
									this.CharacterPlanComponent,
									this.CreatureDataComponent,
									this.Description +
										" Move Back To Nearby Chair Location: " +
										l.ToString(),
								),
								(i.Target = Vector_1.Vector.Create()),
								i.Target.DeepCopy(l),
								(i.MoveState = 1),
								(i.MoveSpeed = 70),
								o.NextNodes.push(i),
								new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision());
						if (
							(T.Serialize(
								this.CharacterPlanComponent,
								this.CreatureDataComponent,
								this.Description + " Reset Actor Collision",
							),
							(T.ItemEntity = this.jTe),
							(T.IsIgnore = !1),
							i.NextNodes.push(T),
							this.NextNodes.length)
						) {
							for (const e of this.NextNodes) T.NextNodes.push(e);
							this.NextNodes.length = 0;
						}
						this.NextNodes.push(n), (this.gU = !0);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelAi",
								51,
								`[LevelAiTaskSitDown] Item Entity ${t} has no PawnInteractNewComponent`,
							);
				else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelAi",
							51,
							"[LevelAiTaskSitDown] Cannot Find Corresponding Item Entity for: " +
								t,
						);
			}
		}
	}
}
exports.LevelAiTaskSitDown = LevelAiTaskSitDown;
