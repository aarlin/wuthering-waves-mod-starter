"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configQuestDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	QuestData_1 = require("../Config/QuestData"),
	DB = "db_questdata.db",
	FILE = "UniverseEditor/Quest/任务_*",
	TABLE = "QuestData",
	COMMAND = "select BinData from `QuestData` where QuestId=?",
	KEY_PREFIX = "QuestDataById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configQuestDataById.GetConfig(";
exports.configQuestDataById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var t = KEY_PREFIX + `#${o})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (i) return i;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"QuestId",
							o,
						]))
			) {
				var n,
					t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["QuestId", o],
					)),
					n)
				) {
					const i = QuestData_1.QuestData.getRootAsQuestData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					return (
						e &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=QuestDataById.js.map
