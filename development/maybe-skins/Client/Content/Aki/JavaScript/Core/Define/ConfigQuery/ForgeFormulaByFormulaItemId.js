"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configForgeFormulaByFormulaItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ForgeFormula_1 = require("../Config/ForgeFormula"),
	DB = "db_forge.db",
	FILE = "d.锻造.xlsx",
	TABLE = "ForgeFormula",
	COMMAND = "select BinData from `ForgeFormula` where FormulaItemId=?",
	KEY_PREFIX = "ForgeFormulaByFormulaItemId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configForgeFormulaByFormulaItemId.GetConfig(";
exports.configForgeFormulaByFormulaItemId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var r = KEY_PREFIX + `#${o})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (i) return i;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"FormulaItemId",
							o,
						]))
			) {
				var n,
					r = void 0;
				if (
					(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["FormulaItemId", o],
					)),
					n)
				) {
					const i = ForgeFormula_1.ForgeFormula.getRootAsForgeFormula(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					return (
						e &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ForgeFormulaByFormulaItemId.js.map
