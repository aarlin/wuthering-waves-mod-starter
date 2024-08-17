"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigCommon = exports.ConfigBase = exports.dataRef = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	LanguageSystem_1 = require("../Common/LanguageSystem"),
	Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	Time_1 = require("../Common/Time"),
	TrimLru_1 = require("../Container/TrimLru"),
	PerfSight_1 = require("../PerfSight/PerfSight");
exports.dataRef = (0, puerts_1.$ref)(void 0);
class ConfigBase {
	constructor() {
		this.RowId = 0;
	}
}
exports.ConfigBase = ConfigBase;
class ConfigCommon {
	static SetLruCapacity(o) {
		this.G9.Capacity = o;
	}
	static SaveConfig(o, n, e = 1) {
		this.G9.Put(o, n, e);
	}
	static GetConfig(o) {
		return this.G9.Get(o);
	}
	static ToList(n) {
		if (n) {
			var e = n.length,
				i = new Array(e);
			for (let o = 0; o < e; o++) i[o] = n[o];
			return i;
		}
	}
	static GetProjectContentDir() {
		return (
			ConfigCommon.N9 ||
				(ConfigCommon.N9 = "" + UE.BlueprintPathsLibrary.ProjectContentDir()),
			ConfigCommon.N9
		);
	}
	static InitDataStatement(o, n, e) {
		if (0 !== o) return o;
		n.length <= 0 &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Config",
				2,
				"dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
			);
		var i = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n,
			o = UE.KuroPrepareStatementLib.CreateStatement(i, e);
		switch (o) {
			case -1:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", i]);
				break;
			case -2:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"创建语句失败",
						["path", i],
						["command", e],
					);
		}
		return o;
	}
	static GetLangStatementId(o, n, e, i = "") {
		n.length <= 0 &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Config",
				2,
				"dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
			);
		i =
			i && 0 !== i.length ? i : LanguageSystem_1.LanguageSystem.PackageLanguage;
		let t = ConfigCommon.F9.get(o),
			r = (t || ((t = new Map()), ConfigCommon.F9.set(o, t)), t.get(i));
		if (!r) {
			var g = ConfigCommon.GetProjectContentDir() + `Aki/ConfigDB/${i}/` + n;
			switch ((r = UE.KuroPrepareStatementLib.CreateStatement(g, e))) {
				case -1:
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", g]);
					break;
				case -2:
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"创建语言表语句失败",
							["path", g],
							["command", e],
						);
			}
			t.set(i, r);
		}
		return r;
	}
	static CheckStatement(o, ...n) {
		let e = !0,
			i = "";
		switch (o) {
			case 0:
				i = "语句未初始化！";
				break;
			case -1:
				i = "找不到该语句的 DB 连接！";
				break;
			case -2:
				i = "语句创建不成功！";
		}
		return (
			i &&
				((e = !1), Log_1.Log.CheckError()) &&
				Log_1.Log.Error("Config", 2, i, ...n),
			e
		);
	}
	static BindBigInt(o, n, e, ...i) {
		return "bigint" != typeof e
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"绑定参数 int64 失败",
						["handleId", o],
						["bindingIndex", n],
						["value", e],
						...i,
					),
				!1)
			: ((e = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, e)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"绑定参数 int64 失败",
							["handleId", o],
							["bindingIndex", n],
							...i,
						)),
				e);
	}
	static BindInt(o, n, e, ...i) {
		e = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"绑定参数 int32 失败",
						["handleId", o],
						["bindingIndex", n],
						...i,
					)),
			e
		);
	}
	static BindFloat(o, n, e, ...i) {
		e = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"绑定参数 float 失败",
						["handleId", o],
						["bindingIndex", n],
						...i,
					)),
			e
		);
	}
	static BindBool(o, n, e, ...i) {
		e = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"绑定参数 bool 失败",
						["handleId", o],
						["bindingIndex", n],
						...i,
					)),
			e
		);
	}
	static BindString(o, n, e, ...i) {
		e = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"绑定参数 string 失败",
						["handleId", o],
						["bindingIndex", n],
						...i,
					)),
			e
		);
	}
	static ClearBind(o) {
		UE.KuroPrepareStatementLib.ClearBindings(o);
	}
	static Reset(o, ...n) {
		var e = UE.KuroPrepareStatementLib.Reset(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"重置语句失败！",
						["handleId", o],
						...n,
					)),
			e
		);
	}
	static Step(o, n = !1, ...e) {
		var i = cpp_1.KuroTime.GetMilliseconds64(),
			t = UE.KuroPrepareStatementLib.Step(o),
			i = cpp_1.KuroTime.GetMilliseconds64() - i;
		PerfSight_1.PerfSight.PostValueF1(
			"CustomPerformance",
			"SQL_Step",
			i,
			Time_1.Time.Frame,
		);
		let r = "";
		switch (t) {
			case 0:
				r = n
					? "配置表中没有该数据，请确认该问题，或修改为合理的查询！"
					: void 0;
				break;
			case -1:
				r = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
				break;
			case -2:
				r = "创建的语句无效或已被释放！";
				break;
			case -3:
				r = "事务繁忙中，查询失败！";
				break;
			case -4:
				r = "执行查询出错！";
		}
		return (
			r &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Config", 2, r, ["handleId", o], ...e),
			t
		);
	}
	static GetValue(o, n, ...e) {
		(n = UE.KuroPrepareStatementLib.GetColumnValueBytes(o, n, exports.dataRef)),
			n ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						2,
						"获取配置表字段数值出错",
						["handleId", o],
						...e,
					)),
			(o = n
				? new DataView((0, puerts_1.$unref)(exports.dataRef).slice(0))
				: void 0);
		return [n, o];
	}
}
((exports.ConfigCommon = ConfigCommon).N9 = void 0),
	(ConfigCommon.F9 = new Map()),
	(ConfigCommon.G9 = new TrimLru_1.TrimLru(3e3)),
	(ConfigCommon.O9 = void 0),
	(ConfigCommon.k9 = void 0),
	(ConfigCommon.V9 = void 0),
	(ConfigCommon.H9 = void 0),
	(ConfigCommon.j9 = void 0),
	(ConfigCommon.W9 = void 0),
	(ConfigCommon.K9 = void 0),
	(ConfigCommon.Q9 = void 0),
	(ConfigCommon.AllConfigStatementStat = void 0);
//# sourceMappingURL=ConfigCommon.js.map
