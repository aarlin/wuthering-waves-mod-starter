"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGatherActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GatherActivity_1 = require("../Config/GatherActivity"),
	DB = "db_collectionactivity.db",
	FILE = "s.收集活动.xlsx",
	TABLE = "GatherActivity",
	COMMAND = "select BinData from `GatherActivity` where Id=?",
	KEY_PREFIX = "GatherActivityById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configGatherActivityById.GetConfig(";
exports.configGatherActivityById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var t = KEY_PREFIX + `#${o})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (n) return n;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var e,
					t = void 0;
				if (
					(([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const n = GatherActivity_1.GatherActivity.getRootAsGatherActivity(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					return (
						i &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=GatherActivityById.js.map
