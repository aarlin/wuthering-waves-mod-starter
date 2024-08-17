"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCommunityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Community_1 = require("../Config/Community"),
	DB = "db_platformchannel.db",
	FILE = "p.平台渠道.xlsx",
	TABLE = "Community",
	COMMAND = "select BinData from `Community` where Id=?",
	KEY_PREFIX = "CommunityById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCommunityById.GetConfig(";
exports.configCommunityById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (m) return m;
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
					i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const m = Community_1.Community.getRootAsCommunity(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, m)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						m
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CommunityById.js.map
