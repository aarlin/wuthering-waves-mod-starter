"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCircumFluenceTaskByTaskType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CircumFluenceTask_1 = require("../Config/CircumFluenceTask"),
	DB = "db_activity.db",
	FILE = "h.回流活动.xlsx",
	TABLE = "CircumFluenceTask",
	COMMAND = "select BinData from `CircumFluenceTask` where TaskType=?",
	KEY_PREFIX = "CircumFluenceTaskByTaskType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configCircumFluenceTaskByTaskType.GetConfigList(";
exports.configCircumFluenceTaskByTaskType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e, o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + `#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (a) return a;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"TaskType",
							e,
						])
					)
						break;
					var r = void 0;
					if (
						(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["TaskType", e],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = CircumFluenceTask_1.CircumFluenceTask.getRootAsCircumFluenceTask(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					a.push(r);
				}
				return (
					o &&
						((i = KEY_PREFIX + `#${e})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CircumFluenceTaskByTaskType.js.map
