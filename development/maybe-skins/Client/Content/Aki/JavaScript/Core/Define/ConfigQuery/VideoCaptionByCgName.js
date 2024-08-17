"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configVideoCaptionByCgName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	VideoCaption_1 = require("../Config/VideoCaption"),
	DB = "db_cgvedio.db",
	FILE = "g.过场cg.xlsx",
	TABLE = "VideoCaption",
	COMMAND = "select BinData from `VideoCaption` where CgName=?",
	KEY_PREFIX = "VideoCaptionByCgName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configVideoCaptionByCgName.GetConfigList(";
exports.configVideoCaptionByCgName = {
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
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"CgName",
							o,
						])
					)
						break;
					var C = void 0;
					if (
						(([n, C] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["CgName", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					C = VideoCaption_1.VideoCaption.getRootAsVideoCaption(
						new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
					);
					a.push(C);
				}
				return (
					i &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=VideoCaptionByCgName.js.map
