"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionSummonEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonEntity extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var o = this.BulletInfo.Attacker,
			t = this.BulletInfo.AttackerCreatureDataComp;
		let e = 0;
		var r = t.GetEntityType();
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			if (
				!(
					(r !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
						r !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
					this.BulletInfo.AttackerActorComp.IsAutonomousProxy
				)
			)
				return;
			r === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
				0 === (e = t.GetSummonsVersion()) &&
				(e = t.ComponentDataMap.get("sps")?.sps?.o8n ?? 1);
		}
		(this.BulletInfo.SummonAttackerId = o.Id),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Bullet", 21, "子弹召唤", ["Version", e]),
			(this.BulletInfo.SummonServerEntityId =
				ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(
					this.BulletInfo.BulletInitParams.SkillId,
					!0,
					this.BulletInfo.ActorComponent.ActorTransform,
					this.BulletInfo.SummonAttackerId,
					this.BulletInfo.BulletDataMain.Summon.EntityId,
					e,
				)),
			0 < e && t.SetSummonsVersion(e + 1);
	}
}
exports.BulletActionSummonEntity = BulletActionSummonEntity;
