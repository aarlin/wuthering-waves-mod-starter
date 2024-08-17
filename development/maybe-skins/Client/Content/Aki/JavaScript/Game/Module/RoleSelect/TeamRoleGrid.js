"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamRoleGrid = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.IsHighlightIndex = void 0);
	}
	OnRefresh(e, o, l) {
		var t = e.GetLevelData(),
			a = e.GetDataId(),
			d = ModelManager_1.ModelManager.EditFormationModel,
			n = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(a);
		let r = !1;
		var i = e.IsTrialRole();
		i ||
			ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
			(r = d.IsRoleDead(a)),
			(d = this.IsHighlightIndex?.(n));
		let M = !1;
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId &&
			(M = (s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel
					.SelectInstanceId,
			).RecommendRole).includes(e.GetRoleId()));
		var s = {
			Type: 2,
			ItemConfigId: a,
			IsTrialRoleVisible: i,
			BottomTextId: "Text_LevelShow_Text",
			BottomTextParameter: [t.GetLevel()],
			Index: 0 < n ? n : void 0,
			HighlightIndex: d,
			ElementId: e.GetRoleConfig().ElementId,
			IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
			Data: e,
			IsDisable: r,
			IsRecommendVisible: M,
		};
		this.Apply(s),
			e.IsTrialRole()
				? this.SetLevelAndLock()
				: ((i =
						!e ||
						!ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(
							a,
						)),
					this.SetLevelAndLock(void 0, i)),
			(t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(a));
		this.SetSelected(t, !0);
	}
	OnForceSelected() {
		this.SetSelected(!0, !0);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
}
exports.TeamRoleGrid = TeamRoleGrid;
