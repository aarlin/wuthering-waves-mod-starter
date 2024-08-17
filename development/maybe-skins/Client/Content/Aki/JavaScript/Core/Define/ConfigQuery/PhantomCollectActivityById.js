"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomCollectActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomCollectActivity_1 = require("../Config/PhantomCollectActivity"),
	DB = "db_activity.db",
	FILE = "s.声骸收集活动.xlsx",
	TABLE = "PhantomCollectActivity",
	COMMAND = "select BinData from `PhantomCollectActivity` where Id=?",
	KEY_PREFIX = "PhantomCollectActivityById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPhantomCollectActivityById.GetConfig(";
exports.configPhantomCollectActivityById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, t = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (t) {
				var i = KEY_PREFIX + `#${o})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (e) return e;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var n,
					i = void 0;
				if (
					(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					n)
				) {
					const e =
						PhantomCollectActivity_1.PhantomCollectActivity.getRootAsPhantomCollectActivity(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						t &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomCollectActivityById.js.map
