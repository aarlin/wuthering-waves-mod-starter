"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleTeamController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	EditBattleTeamModel_1 = require("./EditBattleTeamModel");
class EditBattleTeamController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			ModelManager_1.ModelManager.EditBattleTeamModel.CreateAllRoleSlotData(),
			!0
		);
	}
	static OnClear() {
		return (
			ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData(), !0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PrewarFormationChanged,
			this.KFt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PrewarReadyChanged,
				this.QFt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DissolvePrewar,
				this.XFt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleLevelUp,
				this.mKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PrewarFormationChanged,
			this.KFt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PrewarReadyChanged,
				this.QFt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.DissolvePrewar,
				this.XFt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleLevelUp,
				this.mKe,
			);
	}
	static PlayerOpenEditBattleTeamView(e, t = !1, a = !0) {
		t || (ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance = a),
			this.OpenEditBattleTeamView(e, t);
	}
	static OpenEditBattleTeamView(e, t = 0) {
		var a = ModelManager_1.ModelManager.EditBattleTeamModel;
		InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)
			? (a.SetInstanceDungeonId(e),
				ModelManager_1.ModelManager.EditBattleTeamModel
					.IsMultiInstanceDungeon &&
				ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <=
					0
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Formation",
								5,
								"打开战前编队时，数据已经被清理，操作中止",
							),
						a.SetInstanceDungeonId(void 0))
					: UiManager_1.UiManager.OpenView("EditBattleTeamView"))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Formation",
					8,
					"[EditBattleTeam]找不到副本数据，不能打开战前编队",
				);
	}
	static CloseEditBattleTeamView() {
		ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData(),
			UiManager_1.UiManager.CloseView("EditBattleTeamView");
	}
	static ExitEditBattleTeam(e = !0) {
		var t = ModelManager_1.ModelManager.EditBattleTeamModel;
		t.IsMultiInstanceDungeon &&
			e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Formation",
					8,
					"[EditBattleTeam]离开{DungeonId} 副本的战前编队",
					["{DungeonId}", t.GetInstanceDungeonId],
				),
			ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest()),
			t.SetInstanceDungeonId(void 0),
			t.SetLeaderPlayerId(void 0),
			UiManager_1.UiManager.CloseView("ChatView"),
			UiManager_1.UiManager.CloseView("TeamRoleSelectView"),
			this.CloseEditBattleTeamView();
	}
	static SetEditBattleTeamByRoleId(e) {
		ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData();
		var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
		for (let r = 0; r < e.length; r++) {
			var a = e[r],
				n = t[r],
				o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a),
				l = o.GetLevelData();
			let d = n.GetRoleData;
			((d =
				d ||
				ModelManager_1.ModelManager.EditBattleTeamModel.CreateRoleDataFromRoleInstance(
					o,
				)).ConfigId = a),
				(d.Level = l.GetLevel()),
				n.SetRoleData(d),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
				);
		}
	}
	static RefreshMainRoleInfo() {
		ModelManager_1.ModelManager.EditBattleTeamModel.ChangeMainRoleData();
	}
}
((exports.EditBattleTeamController = EditBattleTeamController).Model =
	EditBattleTeamModel_1.EditBattleTeamModel),
	(EditBattleTeamController.KFt = () => {
		ModelManager_1.ModelManager.EditBattleTeamModel.RefreshAllMultiRoleData();
	}),
	(EditBattleTeamController.QFt = (e, t) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Formation",
				8,
				"[EditBattleTeam]玩家{PlayerId} 返回准备游戏,是否准备:{IsReady}",
				["{PlayerId}", e],
				["{IsReady}", t],
			),
			ModelManager_1.ModelManager.EditBattleTeamModel.SetPlayerReady(e, t);
	}),
	(EditBattleTeamController.XFt = () => {
		EditBattleTeamController.CloseEditBattleTeamView();
	}),
	(EditBattleTeamController.mKe = (e, t, a) => {
		for (const t of ModelManager_1.ModelManager.EditBattleTeamModel
			.GetAllRoleSlotData) {
			var n = t.GetRoleData;
			n && n.ConfigId === e && (n.Level = a);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
		);
	});
