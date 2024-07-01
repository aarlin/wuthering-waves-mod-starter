"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineFactory = void 0);
const AiStateMachineAction_1 = require("./Action/AiStateMachineAction"),
	AiStateMachineActionActivateSkillGroup_1 = require("./Action/AiStateMachineActionActivateSkillGroup"),
	AiStateMachineActionAddBuff_1 = require("./Action/AiStateMachineActionAddBuff"),
	AiStateMachineActionChangeInstState_1 = require("./Action/AiStateMachineActionChangeInstState"),
	AiStateMachineActionCue_1 = require("./Action/AiStateMachineActionCue"),
	AiStateMachineActionEnterFight_1 = require("./Action/AiStateMachineActionEnterFight"),
	AiStateMachineActionRemoveBuff_1 = require("./Action/AiStateMachineActionRemoveBuff"),
	AiStateMachineActionResetPart_1 = require("./Action/AiStateMachineActionResetPart"),
	AiStateMachineActionResetStatus_1 = require("./Action/AiStateMachineActionResetStatus"),
	AiStateMachineActionStopMontage_1 = require("./Action/AiStateMachineActionStopMontage"),
	AiStateMachineCondition_1 = require("./Condition/AiStateMachineCondition"),
	AiStateMachineConditionAnd_1 = require("./Condition/AiStateMachineConditionAnd"),
	AiStateMachineConditionAttribute_1 = require("./Condition/AiStateMachineConditionAttribute"),
	AiStateMachineConditionAttributeRate_1 = require("./Condition/AiStateMachineConditionAttributeRate"),
	AiStateMachineConditionBuffStack_1 = require("./Condition/AiStateMachineConditionBuffStack"),
	AiStateMachineConditionCheckInstState_1 = require("./Condition/AiStateMachineConditionCheckInstState"),
	AiStateMachineConditionCheckState_1 = require("./Condition/AiStateMachineConditionCheckState"),
	AiStateMachineConditionHate_1 = require("./Condition/AiStateMachineConditionHate"),
	AiStateMachineConditionLeaveFight_1 = require("./Condition/AiStateMachineConditionLeaveFight"),
	AiStateMachineConditionListenBeHit_1 = require("./Condition/AiStateMachineConditionListenBeHit"),
	AiStateMachineConditionMontageTimeRemaining_1 = require("./Condition/AiStateMachineConditionMontageTimeRemaining"),
	AiStateMachineConditionOr_1 = require("./Condition/AiStateMachineConditionOr"),
	AiStateMachineConditionPartLife_1 = require("./Condition/AiStateMachineConditionPartLife"),
	AiStateMachineConditionTag_1 = require("./Condition/AiStateMachineConditionTag"),
	AiStateMachineConditionTaskFinish_1 = require("./Condition/AiStateMachineConditionTaskFinish"),
	AiStateMachineConditionTimer_1 = require("./Condition/AiStateMachineConditionTimer"),
	AiStateMachineConditionTrue_1 = require("./Condition/AiStateMachineConditionTrue"),
	AiStateMachineState_1 = require("./State/AiStateMachineState"),
	AiStateMachineStateAiHateConfig_1 = require("./State/AiStateMachineStateAiHateConfig"),
	AiStateMachineStateAiSenseEnable_1 = require("./State/AiStateMachineStateAiSenseEnable"),
	AiStateMachineStateBoneCollision_1 = require("./State/AiStateMachineStateBoneCollision"),
	AiStateMachineStateBoneVisible_1 = require("./State/AiStateMachineStateBoneVisible"),
	AiStateMachineStateBuff_1 = require("./State/AiStateMachineStateBuff"),
	AiStateMachineStateCollisionChannel_1 = require("./State/AiStateMachineStateCollisionChannel"),
	AiStateMachineStateCue_1 = require("./State/AiStateMachineStateCue"),
	AiStateMachineStateDeathMontage_1 = require("./State/AiStateMachineStateDeathMontage"),
	AiStateMachineStateDisableActor_1 = require("./State/AiStateMachineStateDisableActor"),
	AiStateMachineStateDisableCollision_1 = require("./State/AiStateMachineStateDisableCollision"),
	AiStateMachineStateMeshVisible_1 = require("./State/AiStateMachineStateMeshVisible"),
	AiStateMachineStatePalsy_1 = require("./State/AiStateMachineStatePalsy"),
	AiStateMachineStatePartPanelVisible_1 = require("./State/AiStateMachineStatePartPanelVisible"),
	AiStateMachineStateTag_1 = require("./State/AiStateMachineStateTag"),
	AiStateMachineTask_1 = require("./Task/AiStateMachineTask"),
	AiStateMachineTaskLeaveFight_1 = require("./Task/AiStateMachineTaskLeaveFight"),
	AiStateMachineTaskMontage_1 = require("./Task/AiStateMachineTaskMontage"),
	AiStateMachineTaskMoveToTarget_1 = require("./Task/AiStateMachineTaskMoveToTarget"),
	AiStateMachineTaskPatrol_1 = require("./Task/AiStateMachineTaskPatrol"),
	AiStateMachineTaskRandomMontage_1 = require("./Task/AiStateMachineTaskRandomMontage"),
	AiStateMachineTaskSkill_1 = require("./Task/AiStateMachineTaskSkill");
class AiStateMachineFactory {
	CreateTask(e, t) {
		let i;
		try {
			switch (t.Type) {
				case 1:
				case 2:
					i = new AiStateMachineTaskSkill_1.AiStateMachineTaskSkill(e, t);
					break;
				case 101:
					i = new AiStateMachineTaskLeaveFight_1.AiStateMachineTaskLeaveFight(
						e,
						t,
					);
					break;
				case 102:
					i = new AiStateMachineTaskMontage_1.AiStateMachineTaskMontage(e, t);
					break;
				case 3:
					i =
						new AiStateMachineTaskRandomMontage_1.AiStateMachineTaskRandomMontage(
							e,
							t,
						);
					break;
				case 103:
					i =
						new AiStateMachineTaskMoveToTarget_1.AiStateMachineTaskMoveToTarget(
							e,
							t,
						);
					break;
				case 104:
					i = new AiStateMachineTaskPatrol_1.AiStateMachineTaskPatrol(e, t);
					break;
				default:
					i = new AiStateMachineTask_1.AiStateMachineTask(e, t);
			}
		} catch (t) {
			let i = "";
			t instanceof Error && (i = t.message),
				e.Owner.PushErrorMessage(
					`初始化主状态失败异常 [${e.Name}|${e.Uuid}]\nerror:` + i,
				);
		}
		return i?.Init(), i;
	}
	CreateState(e, t) {
		let i;
		try {
			switch (t.Type) {
				case 1:
					i = new AiStateMachineStateBuff_1.AiStateMachineStateBuff(e, t);
					break;
				case 3:
					i = new AiStateMachineStateTag_1.AiStateMachineStateTag(e, t);
					break;
				case 111:
					i =
						new AiStateMachineStatePartPanelVisible_1.AiStateMachineStatePartPanelVisible(
							e,
							t,
						);
					break;
				case 102:
					i =
						new AiStateMachineStateAiHateConfig_1.AiStateMachineStateAiHateConfig(
							e,
							t,
						);
					break;
				case 103:
					i =
						new AiStateMachineStateAiSenseEnable_1.AiStateMachineStateAiSenseEnable(
							e,
							t,
						);
					break;
				case 104:
					i = new AiStateMachineStateCue_1.AiStateMachineStateCue(e, t);
					break;
				case 105:
					i =
						new AiStateMachineStateDisableActor_1.AiStateMachineStateDisableActor(
							e,
							t,
						);
					break;
				case 108:
					i =
						new AiStateMachineStateBoneVisible_1.AiStateMachineStateBoneVisible(
							e,
							t,
						);
					break;
				case 109:
					i =
						new AiStateMachineStateMeshVisible_1.AiStateMachineStateMeshVisible(
							e,
							t,
						);
					break;
				case 110:
					i =
						new AiStateMachineStateBoneCollision_1.AiStateMachineStateBoneCollision(
							e,
							t,
						);
					break;
				case 112:
					i =
						new AiStateMachineStateDeathMontage_1.AiStateMachineStateDeathMontage(
							e,
							t,
						);
					break;
				case 113:
					i = new AiStateMachineStatePalsy_1.AiStateMachineStatePalsy(e, t);
					break;
				case 114:
					i =
						new AiStateMachineStateCollisionChannel_1.AiStateMachineStateCollisionChannel(
							e,
							t,
						);
					break;
				case 115:
					i =
						new AiStateMachineStateDisableCollision_1.AiStateMachineStateDisableCollision(
							e,
							t,
						);
					break;
				default:
					i = new AiStateMachineState_1.AiStateMachineState(e, t);
			}
		} catch (t) {
			let i = "";
			t instanceof Error && (i = t.message),
				e.Owner.PushErrorMessage(
					`初始化节点绑定状态异常 [${e.Name}|${e.Uuid}]\nerror:` + i,
				);
		}
		return i?.Init(), i;
	}
	CreateAction(e, t) {
		let i;
		try {
			switch (t.Type) {
				case 1:
					i = new AiStateMachineActionAddBuff_1.AiStateMachineActionAddBuff(
						e,
						t,
					);
					break;
				case 2:
					i =
						new AiStateMachineActionRemoveBuff_1.AiStateMachineActionRemoveBuff(
							e,
							t,
						);
					break;
				case 7:
					i =
						new AiStateMachineActionResetStatus_1.AiStateMachineActionResetStatus(
							e,
							t,
						);
					break;
				case 8:
					i =
						new AiStateMachineActionEnterFight_1.AiStateMachineActionEnterFight(
							e,
							t,
						);
					break;
				case 11:
					i =
						new AiStateMachineActionChangeInstState_1.AiStateMachineActionChangeInstState(
							e,
							t,
						);
					break;
				case 12:
					i = new AiStateMachineActionResetPart_1.AiStateMachineActionResetPart(
						e,
						t,
					);
					break;
				case 101:
					i = new AiStateMachineActionCue_1.AiStateMachineActionCue(e, t);
					break;
				case 14:
					i =
						new AiStateMachineActionActivateSkillGroup_1.AiStateMachineActionActivateSkillGroup(
							e,
							t,
						);
					break;
				case 102:
					i =
						new AiStateMachineActionStopMontage_1.AiStateMachineActionStopMontage(
							e,
							t,
						);
					break;
				default:
					i = new AiStateMachineAction_1.AiStateMachineAction(e, t);
			}
		} catch (t) {
			let i = "";
			t instanceof Error && (i = t.message),
				e.Owner.PushErrorMessage(
					`初始化节点Action失败，初始化异常，node[${e.Name}|${e.Uuid}]\nerror:` +
						i,
				);
		}
		return i?.Init(), i;
	}
	CreateCondition(e, t, i) {
		let a;
		try {
			switch (t.Type) {
				case 1:
					a = new AiStateMachineConditionAnd_1.AiStateMachineConditionAnd(
						e,
						t,
						i,
					);
					break;
				case 2:
					a = new AiStateMachineConditionOr_1.AiStateMachineConditionOr(
						e,
						t,
						i,
					);
					break;
				case 4:
					a = new AiStateMachineConditionTrue_1.AiStateMachineConditionTrue(
						e,
						t,
						i,
					);
					break;
				case 17:
					a =
						new AiStateMachineConditionAttribute_1.AiStateMachineConditionAttribute(
							e,
							t,
							i,
						);
					break;
				case 18:
					a =
						new AiStateMachineConditionAttributeRate_1.AiStateMachineConditionAttributeRate(
							e,
							t,
							i,
						);
					break;
				case 20:
					a = new AiStateMachineConditionHate_1.AiStateMachineConditionHate(
						e,
						t,
						i,
					);
					break;
				case 24:
				case 19:
					a =
						new AiStateMachineConditionCheckState_1.AiStateMachineConditionCheckState(
							e,
							t,
							i,
						);
					break;
				case 14:
					a = new AiStateMachineConditionTag_1.AiStateMachineConditionTag(
						e,
						t,
						i,
					);
					break;
				case 21:
					a =
						new AiStateMachineConditionLeaveFight_1.AiStateMachineConditionLeaveFight(
							e,
							t,
							i,
						);
					break;
				case 22:
					a = new AiStateMachineConditionTimer_1.AiStateMachineConditionTimer(
						e,
						t,
						i,
					);
					break;
				case 25:
					a =
						new AiStateMachineConditionCheckInstState_1.AiStateMachineConditionCheckInstState(
							e,
							t,
							i,
						);
					break;
				case 101:
					a =
						new AiStateMachineConditionTaskFinish_1.AiStateMachineConditionTaskFinish(
							e,
							t,
							i,
						);
					break;
				case 26:
					a =
						new AiStateMachineConditionBuffStack_1.AiStateMachineConditionBuffStack(
							e,
							t,
							i,
						);
					break;
				case 27:
					a =
						new AiStateMachineConditionPartLife_1.AiStateMachineConditionPartLife(
							e,
							t,
							i,
						);
					break;
				case 102:
					a =
						new AiStateMachineConditionMontageTimeRemaining_1.AiStateMachineConditionMontageTimeRemaining(
							e,
							t,
							i,
						);
					break;
				case 103:
					a =
						new AiStateMachineConditionListenBeHit_1.AiStateMachineConditionListenBeHit(
							e,
							t,
							i,
						);
					break;
				default:
					a = new AiStateMachineCondition_1.AiStateMachineCondition(e, t, i);
			}
		} catch (i) {
			let a = "";
			i instanceof Error && (a = i.message),
				e.Node.Owner.PushErrorMessage(
					`初始化节点条件失败，初始化异常，node[${e.Node.Name}|${e.Node.Uuid}]，name[${t.Name}]，type[${t.Type}]\nerror:` +
						a,
				);
		}
		return a?.Init(), a;
	}
}
exports.AiStateMachineFactory = AiStateMachineFactory;
