"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBattlePassUnlockPopByBattlePassTypeId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BattlePassUnlockPop_1 = require("../Config/BattlePassUnlockPop"),
	DB = "db_battle_pass.db",
	FILE = "z.战令.xlsx",
	TABLE = "BattlePassUnlockPop",
	COMMAND = "select BinData from `BattlePassUnlockPop` where TpyeID=?",
	KEY_PREFIX = "BattlePassUnlockPopByBattlePassTypeId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configBattlePassUnlockPopByBattlePassTypeId.GetConfig(";
exports.configBattlePassUnlockPopByBattlePassTypeId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"TpyeID",
							o,
						]))
			) {
				var t,
					n = void 0;
				if (
					(([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["TpyeID", o],
					)),
					t)
				) {
					const a =
						BattlePassUnlockPop_1.BattlePassUnlockPop.getRootAsBattlePassUnlockPop(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						e &&
							((t = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BattlePassUnlockPopByBattlePassTypeId.js.map
