"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceNpcPerceptionDecision extends UE.BTService_BlueprintBase {
	ReceiveTickAI(e, r, o) {
		if (e instanceof TsAiController_1.default) {
			var t = (e = e.AiController).CharActorComp.Entity.Id,
				l = e.AiPerception.AllEnemies;
			let r = 0,
				o = 0;
			if (l && 0 < l.size)
				for (const e of l)
					switch (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(e)) {
						case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
							r++;
							break;
						case Protocol_1.Aki.Protocol.HBs.Proto_Player:
							o = e;
					}
			for (const r of e.AiPerception.Allies) {
				const e = EntitySystem_1.EntitySystem.Get(r);
				if (e?.GetComponent(0)?.IsRole()) {
					o = r;
					break;
				}
			}
			(l = e.AiPerception.Neutrals.size),
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					t,
					"MonsterCount",
					r,
				),
				BlackboardController_1.BlackboardController.SetEntityIdByEntity(
					t,
					"NearerPlayerId",
					o,
				),
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					t,
					"NeutralCount",
					l,
				);
		}
	}
}
exports.default = TsServiceNpcPerceptionDecision;
