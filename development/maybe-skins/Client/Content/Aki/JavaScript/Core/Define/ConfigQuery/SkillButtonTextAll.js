"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillButtonTextAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SkillButtonText_1 = require("../Config/SkillButtonText"),
	DB = "db_skillbutton.db",
	FILE = "j.技能按钮.xlsx",
	TABLE = "SkillButtonText",
	COMMAND = "select BinData from `SkillButtonText`",
	KEY_PREFIX = "SkillButtonTextAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configSkillButtonTextAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var t = KEY_PREFIX + ")";
				const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (e) return e;
			}
			const e = new Array();
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
				i = SkillButtonText_1.SkillButtonText.getRootAsSkillButtonText(
					new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
				);
				e.push(i);
			}
			return (
				o &&
					((t = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(t, e, e.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				e
			);
		}
	},
};
//# sourceMappingURL=SkillButtonTextAll.js.map
