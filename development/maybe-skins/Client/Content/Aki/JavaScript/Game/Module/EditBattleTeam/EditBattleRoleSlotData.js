"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleRoleSlotData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	EditBattleRoleData_1 = require("./EditBattleRoleData");
class EditBattleRoleSlotData {
	constructor(t) {
		(this.wnt = void 0), (this.cC = t);
	}
	SetRoleData(t) {
		this.wnt = t;
	}
	SetRoleDataByPrewarInfo(t) {
		var e = t.GetConfigId(),
			a = t.GetOnlineNumber(),
			o = t.GetPlayerName(),
			l = t.GetPlayerId(),
			i = t.GetLevel(),
			r = t.IsSelf();
		t = t.GetIsReady();
		this.wnt || (this.wnt = new EditBattleRoleData_1.EditBattleRoleData()),
			this.wnt.Init(l, e, a, o, i, r, t);
	}
	ResetRoleData() {
		this.wnt = void 0;
	}
	get GetRoleData() {
		return this.wnt;
	}
	get GetRoleConfigId() {
		var t = this.GetRoleData;
		if (t) return t.ConfigId;
	}
	get HasRole() {
		return void 0 !== this.GetRoleData;
	}
	get GetPosition() {
		return this.cC;
	}
	get IsProhibit() {
		var t,
			e = ModelManager_1.ModelManager.EditBattleTeamModel;
		return (
			!e.IsMultiInstanceDungeon &&
			(e.GetLeaderIsSelf
				? ((t = this.GetPosition),
					0 !== (e = e.GetMaxLimitRoleCount()) && e < t)
				: !this.HasRole || !this.GetRoleData.IsSelf)
		);
	}
	get CanEditRoleSlot() {
		return (
			!this.IsProhibit &&
			(this.HasRole
				? this.GetRoleData.IsSelf
				: ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderIsSelf)
		);
	}
}
exports.EditBattleRoleSlotData = EditBattleRoleSlotData;
