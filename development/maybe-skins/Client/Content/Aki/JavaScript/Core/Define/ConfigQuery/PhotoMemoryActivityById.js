"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhotoMemoryActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhotoMemoryActivity_1 = require("../Config/PhotoMemoryActivity"),
	DB = "db_fragmentmemory.db",
	FILE = "j.记忆手册活动.xlsx",
	TABLE = "PhotoMemoryActivity",
	COMMAND = "select BinData from `PhotoMemoryActivity` where Id=?",
	KEY_PREFIX = "PhotoMemoryActivityById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPhotoMemoryActivityById.GetConfig(";
exports.configPhotoMemoryActivityById = {
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
					const n =
						PhotoMemoryActivity_1.PhotoMemoryActivity.getRootAsPhotoMemoryActivity(
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
//# sourceMappingURL=PhotoMemoryActivityById.js.map
