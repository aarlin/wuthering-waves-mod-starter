"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configVideoSoundByCgNameAndGirlOrBoy = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	VideoSound_1 = require("../Config/VideoSound"),
	DB = "db_cgvedio.db",
	FILE = "g.过场cg.xlsx",
	TABLE = "VideoSound",
	COMMAND = "select BinData from `VideoSound` where CgName=? AND GirlOrBoy=?",
	KEY_PREFIX = "VideoSoundByCgNameAndGirlOrBoy",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX =
		"configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(";
exports.configVideoSoundByCgNameAndGirlOrBoy = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n, i = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var r = KEY_PREFIX + `#${o}#${n})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (C) return C;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
			) {
				const C = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["CgName", o],
							["GirlOrBoy", n],
						)
					)
						break;
					var d = void 0;
					if (
						(([e, d] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["CgName", o],
							["GirlOrBoy", n],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					d = VideoSound_1.VideoSound.getRootAsVideoSound(
						new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
					);
					C.push(d);
				}
				return (
					i &&
						((r = KEY_PREFIX + `#${o}#${n})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(r, C, C.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					C
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=VideoSoundByCgNameAndGirlOrBoy.js.map
