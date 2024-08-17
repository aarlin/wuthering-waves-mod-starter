"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTrailPhantomPropById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TrailPhantomProp_1 = require("../Config/TrailPhantomProp"),
	DB = "db_trial_role.db",
	FILE = "s.试用角色.xlsx",
	TABLE = "TrailPhantomProp",
	COMMAND = "select BinData from `TrailPhantomProp` where Id = ?",
	KEY_PREFIX = "TrailPhantomPropById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configTrailPhantomPropById.GetConfig(";
exports.configTrailPhantomPropById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (e) return e;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var r,
					i = void 0;
				if (
					(([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					r)
				) {
					const e =
						TrailPhantomProp_1.TrailPhantomProp.getRootAsTrailPhantomProp(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						n &&
							((r = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TrailPhantomPropById.js.map
