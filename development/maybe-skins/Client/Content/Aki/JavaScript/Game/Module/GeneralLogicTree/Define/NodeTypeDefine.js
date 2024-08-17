"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.newNodeObj =
		exports.childQuestNodeType =
		exports.NodeTypeData =
			void 0);
const CheckCombatStateBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckCombatStateBehaviorNode"),
	CheckEntityStateNode_1 = require("../BehaviorNode/ChildQuestNode/CheckEntityStateNode"),
	CheckLevelPlayBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckLevelPlayBehaviorNode"),
	CommunicateNode_1 = require("../BehaviorNode/ChildQuestNode/CommunicateNode"),
	DeliverBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/DeliverBehaviorNode"),
	EntityPhotoBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode"),
	GuideFinishBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/GuideFinishBehaviorNode"),
	InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode"),
	KillBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/KillBehaviorNode"),
	MonsterCreatorBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/MonsterCreatorBehaviorNode"),
	ParallaxBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParallaxBehaviorNode"),
	ParkourBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParkourBehaviorNode"),
	PlayFlowBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/PlayFlowBehaviorNode"),
	ReachAreaBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode"),
	ReadMailBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReadMailBehaviorNode"),
	ServerAchieveChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/ServerAchieveChildQuestNode"),
	ShowUiBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ShowUiBehaviorNode"),
	UseItemBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/UseItemBehaviorNode"),
	ParallelSelectNode_1 = require("../BehaviorNode/LogicNode/ParallelSelectNode"),
	SequenceNode_1 = require("../BehaviorNode/LogicNode/SequenceNode"),
	QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode");
class NodeTypeData {
	constructor(e) {
		this.Ctor = e;
	}
}
function newNodeObj(e) {
	if (e) {
		let i;
		var o = e.Id;
		switch (e.Type) {
			case "ChildQuest":
				var d = e.Condition.Type;
				i = new exports.childQuestNodeType[d].Ctor(o);
				break;
			case "QuestFailed":
				i = new QuestFailedBehaviorNode_1.QuestFailedBehaviorNode(o);
				break;
			case "ParallelSelect":
				i = new ParallelSelectNode_1.ParallelSelectNode(o);
				break;
			case "Sequence":
				i = new SequenceNode_1.SequenceNode(o);
		}
		return i;
	}
}
(exports.NodeTypeData = NodeTypeData),
	(exports.childQuestNodeType = {
		DoInteract: new NodeTypeData(InteractBehaviorNode_1.InteractBehaviorNode),
		Kill: new NodeTypeData(KillBehaviorNode_1.KillBehaviorNode),
		ReachArea: new NodeTypeData(ReachAreaBehaviorNode_1.ReachAreaBehaviorNode),
		PlayFlow: new NodeTypeData(PlayFlowBehaviorNode_1.PlayFlowBehaviorNode),
		GetItem: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		UseSkill: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		GetSkill: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		DetectCombatState: new NodeTypeData(
			CheckCombatStateBehaviorNode_1.CheckCombatStateBehaviorNode,
		),
		Timer: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		Parkour: new NodeTypeData(ParkourBehaviorNode_1.ParkourBehaviorNode),
		MonsterCreator: new NodeTypeData(
			MonsterCreatorBehaviorNode_1.MonsterCreatorBehaviorNode,
		),
		HandInItems: new NodeTypeData(DeliverBehaviorNode_1.DeliverBehaviorNode),
		InformationViewCheck: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		UseItem: new NodeTypeData(UseItemBehaviorNode_1.UseItemBehaviorNode),
		CheckLevelPlay: new NodeTypeData(
			CheckLevelPlayBehaviorNode_1.CheckLevelPlayBehaviorNode,
		),
		CheckEntityState: new NodeTypeData(
			CheckEntityStateNode_1.CheckEntityStateNode,
		),
		FinishDungeon: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		WaitTime: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		ScheduleTime: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		ReadMail: new NodeTypeData(ReadMailBehaviorNode_1.ReadMailBehaviorNode),
		Guide: new NodeTypeData(GuideFinishBehaviorNode_1.GuideFinishBehaviorNode),
		EnterDungeon: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		LeaveDungeon: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		CheckTargetBattleAttribute: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		CompareVar: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		CheckUiGame: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		ReceiveTelecom: new NodeTypeData(CommunicateNode_1.CommunicateNode),
		ShowUi: new NodeTypeData(ShowUiBehaviorNode_1.ShowUiBehaviorNode),
		WaitBattleCondition: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		TakePhoto: new NodeTypeData(
			EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode,
		),
		VisionSystem: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
		ParallaxAlign: new NodeTypeData(
			ParallaxBehaviorNode_1.ParallaxBehaviorNode,
		),
		CheckConditionGroup: new NodeTypeData(
			ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
		),
	}),
	(exports.newNodeObj = newNodeObj);
