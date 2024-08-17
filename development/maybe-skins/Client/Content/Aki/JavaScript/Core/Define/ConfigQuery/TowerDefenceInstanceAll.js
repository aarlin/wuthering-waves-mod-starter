"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTowerDefenceInstanceAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TowerDefenceInstance_1 = require("../Config/TowerDefenceInstance"),
	DB = "db_activity.db",
	FILE = "l.联机塔防活动.xlsx",
	TABLE = "TowerDefenceInstance",
	COMMAND = "select BinData from `TowerDefenceInstance`",
	KEY_PREFIX = "TowerDefenceInstanceAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configTowerDefenceInstanceAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var o = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (r) return r;
			}
			const r = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					TowerDefenceInstance_1.TowerDefenceInstance.getRootAsTowerDefenceInstance(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				r.push(i);
			}
			return (
				e &&
					((o = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(o, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=TowerDefenceInstanceAll.js.map
