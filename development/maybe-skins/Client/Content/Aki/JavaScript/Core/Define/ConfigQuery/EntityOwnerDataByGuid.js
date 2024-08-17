"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configEntityOwnerDataByGuid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	EntityOwnerData_1 = require("../Config/EntityOwnerData"),
	DB = "db_entityownerdata.db",
	FILE = "UniverseEditor/EntityOwnerConfig/EntityOwner.csv",
	TABLE = "EntityOwnerData",
	COMMAND = "select BinData from `EntityOwnerData` where Guid=?",
	KEY_PREFIX = "EntityOwnerDataByGuid",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configEntityOwnerDataByGuid.GetConfig(";
exports.configEntityOwnerDataByGuid = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + `#${n})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (e) return e;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Guid",
							n,
						]))
			) {
				var t,
					i = void 0;
				if (
					(([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Guid", n],
					)),
					t)
				) {
					const e = EntityOwnerData_1.EntityOwnerData.getRootAsEntityOwnerData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						o &&
							((t = KEY_PREFIX + `#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=EntityOwnerDataByGuid.js.map
