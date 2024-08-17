"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFormationPropertyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FormationProperty_1 = require("../Config/FormationProperty"),
	DB = "db_formationproperty.db",
	FILE = "d.队伍属性表.xlsx",
	TABLE = "FormationProperty",
	COMMAND = "select BinData from `FormationProperty` where Id=?",
	KEY_PREFIX = "FormationPropertyById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configFormationPropertyById.GetConfig(";
exports.configFormationPropertyById = {
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
				var r = KEY_PREFIX + `#${o})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (i) return i;
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
					r = void 0;
				if (
					(([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const i =
						FormationProperty_1.FormationProperty.getRootAsFormationProperty(
							new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
						);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FormationPropertyById.js.map
