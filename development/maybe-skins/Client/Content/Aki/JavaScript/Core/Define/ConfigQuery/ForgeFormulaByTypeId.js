"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configForgeFormulaByTypeId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ForgeFormula_1 = require("../Config/ForgeFormula"),
	DB = "db_forge.db",
	FILE = "d.锻造.xlsx",
	TABLE = "ForgeFormula",
	COMMAND = "select BinData from `ForgeFormula` where TypeId=?",
	KEY_PREFIX = "ForgeFormulaByTypeId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configForgeFormulaByTypeId.GetConfigList(";
exports.configForgeFormulaByTypeId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var r = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (a) return a;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"TypeId",
							o,
						])
					)
						break;
					var i = void 0;
					if (
						(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["TypeId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					i = ForgeFormula_1.ForgeFormula.getRootAsForgeFormula(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					a.push(i);
				}
				return (
					e &&
						((r = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(r, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ForgeFormulaByTypeId.js.map
