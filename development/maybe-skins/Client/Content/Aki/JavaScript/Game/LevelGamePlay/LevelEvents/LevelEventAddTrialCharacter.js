"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventAddTrialCharacter = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTrialCharacter extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.vLe = !1), (this.MLe = void 0);
	}
	ExecuteInGm(e, o) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Event", 49, "[AddTrialEvent] 开始"),
			(this.vLe = e.AutoChange ?? !1);
		var r = e.ActiveRange,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
		if (r && t) {
			var n = Vector_1.Vector.Create();
			(r = (n.FromConfigVector(r.CheckPoint), r.CheckEnterRange)),
				(t = t.CheckGetComponent(3).ActorLocationProxy);
			if (Vector_1.Vector.DistSquared(t, n) > r * r)
				return (
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Event",
							49,
							"[AddTrialEvent] 当前角色不在试用范围内，完成",
						),
					void this.FinishExecute(!0)
				);
		}
		!(t = e.CharacterGroup) || t.length <= 0
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Event", 49, "[AddTrialEvent] 无试用角色id，完成"),
				this.FinishExecute(!0))
			: ((this.MLe = t),
				this.SLe()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Event", 49, "[AddTrialEvent] 开始时编队已完成"),
						this.FinishExecute(!0))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Event",
							49,
							"[AddTrialEvent] 编队未完成，开始等待",
						));
	}
	OnTick(e) {
		this.MLe &&
			this.SLe() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Event", 49, "[AddTrialEvent] 编队完成"),
			this.FinishExecute(!0));
	}
	SLe() {
		if (!ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) return !1;
		for (const e of this.MLe) if (!this.TPr(e)) return !1;
		var e;
		return (
			!this.vLe ||
				(e = this.TPr(this.MLe[0])).IsControl() ||
				ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
					e.GetCreatureDataId(),
					!0,
					!1,
				),
			!0
		);
	}
	TPr(e) {
		for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
			!0,
		)) {
			var o = r.GetConfigId;
			if (
				!(o <= RoleDefine_1.ROBOT_DATA_MIN_ID) &&
				(o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o)) &&
				o.GroupId === e
			)
				return r;
		}
	}
}
exports.LevelEventAddTrialCharacter = LevelEventAddTrialCharacter;
