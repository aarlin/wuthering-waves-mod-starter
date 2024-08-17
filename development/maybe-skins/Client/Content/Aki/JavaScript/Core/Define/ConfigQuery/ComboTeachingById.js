"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configComboTeachingById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ComboTeaching_1 = require("../Config/ComboTeaching"),
	DB = "db_combo_teaching.db",
	FILE = "j.角色出招教学.xlsx",
	TABLE = "ComboTeaching",
	COMMAND = "select BinData from `ComboTeaching` where Id=?",
	KEY_PREFIX = "ComboTeachingById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configComboTeachingById.GetConfig(";
exports.configComboTeachingById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (C) return C;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var i,
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					i)
				) {
					const C = ComboTeaching_1.ComboTeaching.getRootAsComboTeaching(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, C)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						C
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ComboTeachingById.js.map
