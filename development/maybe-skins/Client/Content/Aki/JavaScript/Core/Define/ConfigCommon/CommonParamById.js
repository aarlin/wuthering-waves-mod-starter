"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCommonParamById = void 0);
const Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
	FILE = "c.参数.xlsx",
	DB = "db_common_param.db",
	TABLE = "CommonParam",
	COMMAND = "select BinData from `CommonParam` where KeyName = ?",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const intCache = new Map(),
	floatCache = new Map(),
	boolCache = new Map(),
	stringCache = new Map(),
	intListCache = new Map(),
	floatListCache = new Map();
function getDataView(i) {
	var o, e;
	return (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, [
		"command",
		COMMAND,
	]))
		? (o =
				(o = ConfigCommon_1.ConfigCommon.BindString(
					handleId,
					1,
					i,
					...logPair,
					["Id", i],
				)) &&
				0 <
					ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", i]))
			? ((e = void 0),
				([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
					handleId,
					0,
					...logPair,
					["Id", i],
				)),
				ConfigCommon_1.ConfigCommon.Reset(handleId),
				[o, e])
			: (ConfigCommon_1.ConfigCommon.Reset(handleId), [!1, void 0])
		: [!1, void 0];
}
const initStat = void 0,
	getIntConfigStat = void 0,
	INT_STAT_PREFIX = "configCommonParamById.GetIntConfig(",
	getFloatConfigStat = void 0,
	FLOAT_STAT_PREFIX = "configCommonParamById.GetFloatConfig(",
	getBoolConfigStat = void 0,
	BOOL_STAT_PREFIX = "configCommonParamById.GetBoolConfig(",
	getStringConfigStat = void 0,
	STRING_STAT_PREFIX = "configCommonParamById.GetStringConfig(",
	getIntArrayConfigStat = void 0,
	INT_ARRAY_STAT_PREFIX = "configCommonParamById.GetIntArrayConfig(",
	getFloatArrayConfigStat = void 0,
	FLOAT_ARRAY_STAT_PREFIX = "configCommonParamById.GetFloatArrayConfig(";
exports.configCommonParamById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetIntConfig: (i) => {
		var o = intCache.get(i);
		if (o) return o;
		var [o, e] = getDataView(i);
		if (o) {
			o = DeserializeConfig_1.DeserializeConfig.ParseInt(e, 0, ...logPair, [
				"Id",
				i,
			]);
			if (o.Success) return intCache.set(i, o.Value), o.Value;
		}
	},
	GetFloatConfig: (i) => {
		var o = floatCache.get(i);
		if (o) return o;
		var [o, e] = getDataView(i);
		if (o) {
			o = DeserializeConfig_1.DeserializeConfig.ParseFloat(e, 0, ...logPair, [
				"Id",
				i,
			]);
			if (o.Success) return floatCache.set(i, o.Value), o.Value;
		}
	},
	GetBoolConfig: (i) => {
		var o = boolCache.get(i);
		if (o) return o;
		var [o, e] = getDataView(i);
		if (o) {
			o = DeserializeConfig_1.DeserializeConfig.ParseBoolean(e, 0, ...logPair, [
				"Id",
				i,
			]);
			if (o.Success) return boolCache.set(i, o.Value), o.Value;
		}
	},
	GetStringConfig: (i) => {
		var o = stringCache.get(i);
		if (o) return o;
		var [o, e] = getDataView(i);
		if (o) {
			o = DeserializeConfig_1.DeserializeConfig.ParseString(e, 0, ...logPair, [
				"Id",
				i,
			]);
			if (o.Success) return stringCache.set(i, o.Value), o.Value;
		}
	},
	GetIntArrayConfig: (e) => {
		if ((n = intListCache.get(e))) return n;
		var [i, a] = getDataView(e);
		if (i) {
			var n = new Array(),
				t = DeserializeConfig_1.DeserializeConfig.ParseInt(a, 0, ...logPair, [
					"Id",
					e,
				]);
			if (t.Success) {
				let o = t.Position;
				for (let i = 0; i < t.Value; i++) {
					var r = DeserializeConfig_1.DeserializeConfig.ParseInt(
						a,
						o,
						...logPair,
						["Id", e],
					);
					if (!r.Success) return;
					(o = r.Position), n.push(r.Value);
				}
				return intListCache.set(e, n), n;
			}
		}
	},
	GetFloatArrayConfig: (e) => {
		if ((n = floatListCache.get(e))) return n;
		var [i, a] = getDataView(e);
		if (i) {
			var n = new Array(),
				t = DeserializeConfig_1.DeserializeConfig.ParseInt(a, 0, ...logPair, [
					"Id",
					e,
				]);
			if (t.Success) {
				let o = t.Position;
				for (let i = 0; i < t.Value; i++) {
					var r = DeserializeConfig_1.DeserializeConfig.ParseFloat(
						a,
						o,
						...logPair,
						["Id", e],
					);
					if (!r.Success) return;
					(o = r.Position), n.push(r.Value);
				}
				return floatListCache.set(e, n), n;
			}
		}
	},
};
//# sourceMappingURL=CommonParamById.js.map
