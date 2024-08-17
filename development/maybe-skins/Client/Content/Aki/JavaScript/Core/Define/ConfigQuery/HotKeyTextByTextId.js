"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configHotKeyTextByTextId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	HotKeyText_1 = require("../Config/HotKeyText"),
	DB = "db_uihotkot.db",
	FILE = "j.界面快捷键.xlsx",
	TABLE = "HotKeyText",
	COMMAND = "select BinData from `HotKeyText` where TextId=?",
	KEY_PREFIX = "HotKeyTextByTextId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configHotKeyTextByTextId.GetConfig(";
exports.configHotKeyTextByTextId = {
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
				var t = KEY_PREFIX + `#${o})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (i) return i;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"TextId",
							o,
						]))
			) {
				var n,
					t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["TextId", o],
					)),
					n)
				) {
					const i = HotKeyText_1.HotKeyText.getRootAsHotKeyText(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
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
//# sourceMappingURL=HotKeyTextByTextId.js.map
