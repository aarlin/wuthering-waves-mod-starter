"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGenderTextByMaleText = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GenderText_1 = require("../Config/GenderText"),
	DB = "db_gender_text.db",
	FILE = "k.可视化编辑/c.Csv/x.性别通配符表/*.csv*",
	TABLE = "GenderText",
	COMMAND = "select BinData from `GenderText` where MaleText=?",
	KEY_PREFIX = "GenderTextByMaleText",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configGenderTextByMaleText.GetConfig(";
exports.configGenderTextByMaleText = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (i) return i;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"MaleText",
							e,
						]))
			) {
				var t,
					n = void 0;
				if (
					(([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MaleText", e],
					)),
					t)
				) {
					const i = GenderText_1.GenderText.getRootAsGenderText(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						o &&
							((t = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=GenderTextByMaleText.js.map
