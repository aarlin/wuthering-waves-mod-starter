"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushConfig = void 0);
const BossRushActivityByActivityIdAndInstanceId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityByActivityIdAndInstanceId"),
	BossRushActivityById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityById"),
	BossRushBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushBuffById"),
	BossRushMapMarkByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushMapMarkByActivityId"),
	BossRushScoreById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushScoreById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BossRushConfig extends ConfigBase_1.ConfigBase {
	GetBossRushActivityConfigById(s) {
		return BossRushActivityById_1.configBossRushActivityById.GetConfig(s);
	}
	GetBossRushByActivityIdAndInstanceId(s, i) {
		if (
			void 0 !==
				(s =
					BossRushActivityByActivityIdAndInstanceId_1.configBossRushActivityByActivityIdAndInstanceId.GetConfigList(
						s,
						i,
					)) &&
			0 !== s.length
		)
			return s[0];
	}
	GetBossRushBuffConfigById(s) {
		return BossRushBuffById_1.configBossRushBuffById.GetConfig(s);
	}
	GetBossRushScoreConfigById(s) {
		return BossRushScoreById_1.configBossRushScoreById.GetConfig(s);
	}
	GetBossRushMarkTypeByActivityId(s) {
		return 0;
	}
	GetBossRushMarkByActivityId(s) {
		return BossRushMapMarkByActivityId_1.configBossRushMapMarkByActivityId.GetConfig(
			s,
		).MarkId;
	}
}
exports.BossRushConfig = BossRushConfig;
