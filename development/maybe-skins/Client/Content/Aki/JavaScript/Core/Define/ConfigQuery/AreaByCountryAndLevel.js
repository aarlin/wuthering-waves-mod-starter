"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAreaByCountryAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Area_1 = require("../Config/Area"),
	DB = "db_area.db",
	FILE = "q.区域.xlsx",
	TABLE = "Area",
	COMMAND = "select BinData from `Area` where CountryId=? And Level=?",
	KEY_PREFIX = "AreaByCountryAndLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configAreaByCountryAndLevel.GetConfigList(";
exports.configAreaByCountryAndLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e, n = !0) => {
		var r;
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o}#${e})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (t) return t;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["CountryId", o],
							["Level", e],
						)
					)
						break;
					var a = void 0;
					if (
						(([r, a] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["CountryId", o],
							["Level", e],
						)),
						!r)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					a = Area_1.Area.getRootAsArea(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					t.push(a);
				}
				return (
					n &&
						((i = KEY_PREFIX + `#${o}#${e})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AreaByCountryAndLevel.js.map
