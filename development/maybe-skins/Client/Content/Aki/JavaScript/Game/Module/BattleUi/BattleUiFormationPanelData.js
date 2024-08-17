"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiFormationPanelData = exports.FormationItemData = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	actionNames = [
		InputMappingsDefine_1.actionMappings.切换角色1,
		InputMappingsDefine_1.actionMappings.切换角色2,
		InputMappingsDefine_1.actionMappings.切换角色3,
		InputMappingsDefine_1.actionMappings.切换角色4,
	];
class FormationItemData {
	constructor() {
		(this.PlayerId = 0), (this.RoleId = 0), (this.CreatureDataId = 0);
	}
}
exports.FormationItemData = FormationItemData;
class BattleUiFormationPanelData {
	constructor() {
		this.PositionItemMap = new Map();
	}
	Init() {}
	Clear() {
		this.PositionItemMap.clear();
	}
	UpdateFormationPanelData() {
		this.PositionItemMap.clear();
		let e = 1;
		var a = ModelManager_1.ModelManager.GameModeModel.IsMulti,
			t =
				!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
				a,
			o = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
		for (const M of a
			? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
			: [o]) {
			var n =
				ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(M);
			if (0 === n.length && t) {
				var r =
					ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
						M,
					)?.RoleInfos;
				if (r)
					for (const a of r) {
						var i = a.RoleId,
							l = new FormationItemData();
						(l.PlayerId = M),
							(l.RoleId = i),
							this.PositionItemMap.set(e, l),
							e++;
					}
			} else
				for (const a of n) {
					var s = new FormationItemData();
					(s.PlayerId = M),
						(s.RoleId = a.GetConfigId),
						(s.CreatureDataId = a.GetCreatureDataId()),
						this.PositionItemMap.set(e, s),
						e++;
				}
		}
	}
	GetItemData(e) {
		return this.PositionItemMap.get(e);
	}
	GetRolePosition(e, a) {
		for (var [t, o] of this.PositionItemMap)
			if (o.PlayerId === e && o.RoleId === a) return t;
		return 0;
	}
	GetActionNames() {
		return actionNames;
	}
}
exports.BattleUiFormationPanelData = BattleUiFormationPanelData;
