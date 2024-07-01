"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiDataControl = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
class BattleUiDataControl extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.UKe),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
				this.AKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.fIe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				this.PKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OpenView,
			this.UKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
				this.AKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.fIe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				this.PKe,
			);
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
		InputDistributeController_1.InputDistributeController.UnBindActions(
			e,
			this.bMe,
		);
	}
}
((exports.BattleUiDataControl = BattleUiDataControl).UKe = (e) => {
	"GuideFocusView" === e &&
		ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
			!0,
		);
}),
	(BattleUiDataControl.$Ge = (e) => {
		"GuideFocusView" === e &&
			ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
				!1,
			);
	}),
	(BattleUiDataControl.AKe = (e, t) => {
		if (e && 6 === e.Type && t.Wfs) {
			let n;
			switch (e.BtType) {
				case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
					n = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(
						e.TreeConfigId,
						e.NodeId,
					);
					break;
				case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
					n = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
						e.TreeConfigId,
						e.NodeId,
					);
			}
			var o;
			n &&
				"ChildQuest" === n.Type &&
				"MonsterCreator" === (o = n.Condition).Type &&
				o.ShowMonsterMergedHpBar &&
				ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.UpdateProgress(
					e.TreeIncId,
					e.NodeId,
					t.Wfs,
					o.TidMonsterGroupName,
				);
		}
	}),
	(BattleUiDataControl.fIe = (e, t, o) => {
		e instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
			((o !== Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed &&
				o !== Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess &&
				o !== Protocol_1.Aki.Protocol.N2s.Proto_Destroy) ||
				ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveNode(
					e.TreeIncId,
					e.NodeId,
				));
	}),
	(BattleUiDataControl.PKe = (e) => {
		ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveTree(e);
	}),
	(BattleUiDataControl.bMe = (e, t) => {
		ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
			e,
			0 === t,
		);
	});
