"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configVideoDataByCgNameAndGirlOrBoy = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	VideoData_1 = require("../Config/VideoData"),
	DB = "db_cgvedio.db",
	FILE = "g.过场cg.xlsx",
	TABLE = "VideoData",
	COMMAND = "select BinData from `VideoData` where CgName=? AND GirlOrBoy=?",
	KEY_PREFIX = "VideoDataByCgNameAndGirlOrBoy",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configVideoDataByCgNameAndGirlOrBoy.GetConfig(";
exports.configVideoDataByCgNameAndGirlOrBoy = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, e = !0) => {
		if (
			(a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o}#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			if (
				(a =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["CgName", o],
							["GirlOrBoy", i],
						))
			) {
				var a,
					n = void 0;
				if (
					(([a, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["CgName", o],
						["GirlOrBoy", i],
					)),
					a)
				) {
					const r = VideoData_1.VideoData.getRootAsVideoData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						e &&
							((a = KEY_PREFIX + `#${o}#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(a, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=VideoDataByCgNameAndGirlOrBoy.js.map
