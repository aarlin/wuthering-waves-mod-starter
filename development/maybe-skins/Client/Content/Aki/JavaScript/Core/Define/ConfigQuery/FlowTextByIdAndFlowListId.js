"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFlowTextByIdAndFlowListId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FlowText_1 = require("../Config/FlowText"),
	DB = "db_flow_text.db",
	FILE = "k.可视化编辑/j.剧情/Text_剧情*",
	TABLE = "FlowText",
	COMMAND = "select BinData from `FlowText` where Id=? AND FlowListId=?",
	KEY_PREFIX = "FlowTextByIdAndFlowListId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configFlowTextByIdAndFlowListId.GetConfig(";
exports.configFlowTextByIdAndFlowListId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, e = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + `#${o}#${n})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (d) return d;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["Id", o],
							["FlowListId", n],
						))
			) {
				var t,
					i = void 0;
				if (
					(([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
						["FlowListId", n],
					)),
					t)
				) {
					const d = FlowText_1.FlowText.getRootAsFlowText(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						e &&
							((t = KEY_PREFIX + `#${o}#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FlowTextByIdAndFlowListId.js.map
