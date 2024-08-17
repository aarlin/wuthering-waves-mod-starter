"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMappingBySheetNameAndFieldName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Mapping_1 = require("../Config/Mapping"),
	DB = "db_mapping.db",
	FILE = "s.数据枚举对应关系.xlsx",
	TABLE = "Mapping",
	COMMAND = "select BinData from `Mapping` where SheetName=? AND FieldName=?",
	KEY_PREFIX = "MappingBySheetNameAndFieldName",
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
		"configMappingBySheetNameAndFieldName.GetConfigList(";
exports.configMappingBySheetNameAndFieldName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e, o, n = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${e}#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (t) return t;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, o, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["SheetName", e],
							["FieldName", o],
						)
					)
						break;
					var r = void 0;
					if (
						(([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["SheetName", e],
							["FieldName", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = Mapping_1.Mapping.getRootAsMapping(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					n &&
						((a = KEY_PREFIX + `#${e}#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(a, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MappingBySheetNameAndFieldName.js.map
