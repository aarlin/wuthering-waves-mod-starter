"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTrainRoleDialogByRoleIdAndTrainType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TrainRoleDialog_1 = require("../Config/TrainRoleDialog"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "TrainRoleDialog",
	COMMAND =
		"select BinData from `TrainRoleDialog` where RoleId=? AND TrainType=?",
	KEY_PREFIX = "TrainRoleDialogByRoleIdAndTrainType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configTrainRoleDialogByRoleIdAndTrainType.GetConfig(";
exports.configTrainRoleDialogByRoleIdAndTrainType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, i = !0) => {
		if (
			(a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o}#${n})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(a =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["RoleId", o],
							["TrainType", n],
						))
			) {
				var a,
					e = void 0;
				if (
					(([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["RoleId", o],
						["TrainType", n],
					)),
					a)
				) {
					const r = TrainRoleDialog_1.TrainRoleDialog.getRootAsTrainRoleDialog(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						i &&
							((a = KEY_PREFIX + `#${o}#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(a, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TrainRoleDialogByRoleIdAndTrainType.js.map
