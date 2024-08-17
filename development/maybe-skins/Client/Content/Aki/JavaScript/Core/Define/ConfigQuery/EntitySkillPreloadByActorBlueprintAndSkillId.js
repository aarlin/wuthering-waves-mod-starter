"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configEntitySkillPreloadByActorBlueprintAndSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	EntitySkillPreload_1 = require("../Config/EntitySkillPreload"),
	DB = "db_entity_skill_preload.db",
	FILE = "Preload/EntitySkillPreload.csv",
	TABLE = "EntitySkillPreload",
	COMMAND =
		"select BinData from `EntitySkillPreload` where ActorBlueprint=? AND SkillId=?",
	KEY_PREFIX = "EntitySkillPreloadByActorBlueprintAndSkillId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX =
		"configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig(";
exports.configEntitySkillPreloadByActorBlueprintAndSkillId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, n = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var l = KEY_PREFIX + `#${o}#${i})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(l);
				if (t) return t;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["ActorBlueprint", o],
							["SkillId", i],
						))
			) {
				var e,
					l = void 0;
				if (
					(([e, l] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ActorBlueprint", o],
						["SkillId", i],
					)),
					e)
				) {
					const t =
						EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(
							new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
						);
					return (
						n &&
							((e = KEY_PREFIX + `#${o}#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=EntitySkillPreloadByActorBlueprintAndSkillId.js.map
