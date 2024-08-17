"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPlayerExpByPlayerLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PlayerExp_1 = require("../Config/PlayerExp"),
	DB = "db_player_exp.db",
	FILE = "j.经验.xlsx",
	TABLE = "PlayerExp",
	COMMAND = "select BinData from `PlayerExp` where PlayerLevel=?",
	KEY_PREFIX = "PlayerExpByPlayerLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPlayerExpByPlayerLevel.GetConfig(";
exports.configPlayerExpByPlayerLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (i) return i;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"PlayerLevel",
							e,
						]))
			) {
				var r,
					n = void 0;
				if (
					(([r, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["PlayerLevel", e],
					)),
					r)
				) {
					const i = PlayerExp_1.PlayerExp.getRootAsPlayerExp(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						o &&
							((r = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PlayerExpByPlayerLevel.js.map
