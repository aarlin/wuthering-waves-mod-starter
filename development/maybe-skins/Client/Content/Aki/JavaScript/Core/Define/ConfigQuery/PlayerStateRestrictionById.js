"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPlayerStateRestrictionById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PlayerStateRestriction_1 = require("../Config/PlayerStateRestriction"),
	DB = "db_playerstaterestriction.db",
	FILE = "k.可视化编辑/c.Csv/w.玩家状态限制/*.csv*",
	TABLE = "PlayerStateRestriction",
	COMMAND = "select BinData from `PlayerStateRestriction` where Id=?",
	KEY_PREFIX = "PlayerStateRestrictionById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPlayerStateRestrictionById.GetConfig(";
exports.configPlayerStateRestrictionById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var t = KEY_PREFIX + `#${e})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (n) return n;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var i,
					t = void 0;
				if (
					(([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					i)
				) {
					const n =
						PlayerStateRestriction_1.PlayerStateRestriction.getRootAsPlayerStateRestriction(
							new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
						);
					return (
						o &&
							((i = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PlayerStateRestrictionById.js.map
