"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configElementReactionMatrixAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ElementReactionMatrix_1 = require("../Config/ElementReactionMatrix"),
	DB = "db_element_info.db",
	FILE = "y.元素属性.xlsx",
	TABLE = "ElementReactionMatrix",
	COMMAND = "select BinData from `ElementReactionMatrix`",
	KEY_PREFIX = "ElementReactionMatrixAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configElementReactionMatrixAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			const t = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([o, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					ElementReactionMatrix_1.ElementReactionMatrix.getRootAsElementReactionMatrix(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				t.push(i);
			}
			return (
				e &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=ElementReactionMatrixAll.js.map
