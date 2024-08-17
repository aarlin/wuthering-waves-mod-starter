"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configReviveById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Revive_1 = require("../Config/Revive"),
	DB = "db_revive.db",
	FILE = "f.复活.xlsx",
	TABLE = "Revive",
	COMMAND = "select BinData from `Revive` where id=?",
	KEY_PREFIX = "ReviveById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configReviveById.GetConfig(";
exports.configReviveById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + `#${e})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (r) return r;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var n,
					i = void 0;
				if (
					(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					n)
				) {
					const r = Revive_1.Revive.getRootAsRevive(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						o &&
							((n = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ReviveById.js.map
