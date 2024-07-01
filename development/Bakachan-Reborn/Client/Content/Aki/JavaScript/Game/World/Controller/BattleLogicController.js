"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleLogicController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../Common/StatDefine"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager");
class BattleLogicController extends ControllerBase_1.ControllerBase {
	static ExecuteEntityLivingStatusNotify(e) {
		const t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			MathUtils_1.MathUtils.LongToNumber(e.Ekn),
		);
		switch (
			(t?.Valid ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						20,
						"[CreatureController.EntityLivingStatusNotify] EntityLivingStatusNotify失败, Entity无效或不存在。",
						["CreatureDataId", e.Ekn],
					)),
			e.Rvs)
		) {
			case Protocol_1.Aki.Protocol.Rvs.Proto_Dead: {
				this.mgr(t);
				let o = !1;
				e.BEs.forEach((e) => {
					e.qEs &&
						e.aFn === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
						(t.Entity.Disable(
							"[BattleLogicController.BattleLogicController] 被收服的Entity先隐藏",
						),
						(o = !0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.CharOnRoleDead,
							t.Id,
						),
						EventSystem_1.EventSystem.EmitWithTarget(
							t,
							EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnCharDeathLogicBegin,
							t.Id,
						));
				}),
					o || t?.Entity?.GetComponent(15)?.ExecuteDeath();
				break;
			}
			case Protocol_1.Aki.Protocol.Rvs.Proto_Alive:
				this.fgr(t);
		}
	}
	static fgr(e) {
		e?.Entity?.GetComponent(172)?.ExecuteReviveRemote();
	}
	static mgr(e) {
		(e = e.Entity.GetComponent(1)?.Owner),
			GlobalData_1.GlobalData.BpEventManager.当有角色死亡时.Broadcast(e);
	}
}
((exports.BattleLogicController = BattleLogicController).cgr = void 0),
	(BattleLogicController.dgr = void 0),
	(BattleLogicController.Cgr = void 0),
	(BattleLogicController.ggr = void 0);
