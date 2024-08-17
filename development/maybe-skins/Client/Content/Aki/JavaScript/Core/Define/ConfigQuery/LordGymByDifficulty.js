"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLordGymByDifficulty = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LordGym_1 = require("../Config/LordGym"),
	DB = "db_lordgym.db",
	FILE = "l.领主道馆.xlsx",
	TABLE = "LordGym",
	COMMAND = "select BinData from `LordGym` where Difficulty=?",
	KEY_PREFIX = "LordGymByDifficulty",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configLordGymByDifficulty.GetConfigList(";
exports.configLordGymByDifficulty = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, i = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (f) return f;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const f = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Difficulty",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["Difficulty", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = LordGym_1.LordGym.getRootAsLordGym(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					f.push(r);
				}
				return (
					i &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					f
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LordGymByDifficulty.js.map
