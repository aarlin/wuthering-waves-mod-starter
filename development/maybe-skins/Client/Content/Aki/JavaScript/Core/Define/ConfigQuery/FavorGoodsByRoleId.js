"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFavorGoodsByRoleId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FavorGoods_1 = require("../Config/FavorGoods"),
	DB = "db_favor.db",
	FILE = "h.好感度.xlsx",
	TABLE = "FavorGoods",
	COMMAND = "select BinData from `FavorGoods` where RoleId=? Order By Sort",
	KEY_PREFIX = "FavorGoodsByRoleId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configFavorGoodsByRoleId.GetConfigList(";
exports.configFavorGoodsByRoleId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (d) return d;
			}
			if (
				(e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const d = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"RoleId",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["RoleId", o],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = FavorGoods_1.FavorGoods.getRootAsFavorGoods(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					d.push(r);
				}
				return (
					n &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, d, d.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					d
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FavorGoodsByRoleId.js.map
