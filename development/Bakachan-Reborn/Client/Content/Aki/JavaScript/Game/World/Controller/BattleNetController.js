"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleNetController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	REQUEST_TIME_GAP = 2e3;
class BattleNetController {
	static async RequestCaptureEntity(e) {
		if ((t = Time_1.Time.Now) - this.pgr < 2e3) return !1;
		this.pgr = t;
		var r,
			t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
		return ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
			? (((r = Protocol_1.Aki.Protocol.rls.create()).Ekn =
					MathUtils_1.MathUtils.NumberToLong(t)),
				!(
					!(r = await Net_1.Net.CallAsync(7703, r)) ||
					(0 !== r.X5n &&
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Level", 30, "幻象收复失败", ["ErrCode", r.X5n]),
						1))
				))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						30,
						"[CreatureController.RequestCaptureEntity] 请求幻象收复失败, Entity为空。",
						["CreatureDataId", t],
						["EntityId", e],
					),
				!1);
	}
}
(exports.BattleNetController = BattleNetController).pgr = 0;
