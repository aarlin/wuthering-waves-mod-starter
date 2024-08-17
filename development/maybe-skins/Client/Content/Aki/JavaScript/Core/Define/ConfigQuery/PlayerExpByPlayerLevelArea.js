"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPlayerExpByPlayerLevelArea = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PlayerExp_1 = require("../Config/PlayerExp"),
	DB = "db_player_exp.db",
	FILE = "j.经验.xlsx",
	TABLE = "PlayerExp",
	COMMAND =
		"select BinData from `PlayerExp` where PlayerLevel >= ? AND PlayerLevel < ?",
	KEY_PREFIX = "PlayerExpByPlayerLevelArea",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configPlayerExpByPlayerLevelArea.GetConfigList(";
exports.configPlayerExpByPlayerLevelArea = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e, o, r = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (r) {
				var i = KEY_PREFIX + `#${e}#${o})`;
				const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (l) return l;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair))
			) {
				const l = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["PlayerLevel", e],
							["PlayerLevel", o],
						)
					)
						break;
					var a = void 0;
					if (
						(([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["PlayerLevel", e],
							["PlayerLevel", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					a = PlayerExp_1.PlayerExp.getRootAsPlayerExp(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					l.push(a);
				}
				return (
					r &&
						((i = KEY_PREFIX + `#${e}#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, l, l.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					l
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PlayerExpByPlayerLevelArea.js.map
