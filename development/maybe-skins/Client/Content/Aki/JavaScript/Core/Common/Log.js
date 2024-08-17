"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Log = exports.levelName = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	LogDefine_1 = require("../Define/LogDefine"),
	Info_1 = require("./Info"),
	LogCaptureController_1 = require("./LogCaptureController"),
	Time_1 = require("./Time"),
	levelTrace =
		(cpp_1.FKuroUtilityForPuerts.IsBuildShipping() &&
			(cpp_1.KuroLoggingLibrary.RegisterTerminateDelegate(),
			cpp_1.KuroLoggingLibrary.PromoteGlobalLogVerbosity(4)),
		{ [0]: !0, 1: !1, 2: !1, 3: !1 }),
	logProxy =
		((exports.levelName = { [0]: "E", 1: "W", 2: "I", 3: "D" }),
		{
			[0]: puerts_1.logger.error,
			1: puerts_1.logger.warn,
			2: puerts_1.logger.info,
			3: puerts_1.logger.log,
		}),
	DEFAULT_SKIP_INDEX = 2;
class Log {
	static SetJsDebugId(r) {
		r && 0 < r.length && (Log.U8 = `(${r})`);
	}
	static Initialize() {}
	static InitStat(r) {
		(this.A8 = void 0),
			(this.P8 = void 0),
			(this.x8 = void 0),
			(this.w8 = void 0);
	}
	static SetLevel(r) {
		Log.B8 = r;
	}
	static CheckError() {
		return 0 <= Log.B8;
	}
	static CheckWarn() {
		return 1 <= Log.B8;
	}
	static CheckInfo() {
		return 2 <= Log.B8;
	}
	static CheckDebug() {
		return 3 <= Log.B8;
	}
	static Error(r, e, t, ...o) {
		Log.b8(0, r, e, t, o, levelTrace[0]);
	}
	static ErrorWithStack(r, e, t, o, ...i) {
		Log.b8(0, r, e, t, i, levelTrace[0], o);
	}
	static Warn(r, e, t, ...o) {
		Log.b8(1, r, e, t, o, levelTrace[1]);
	}
	static Info(r, e, t, ...o) {
		Log.b8(2, r, e, t, o, levelTrace[2]);
	}
	static Debug(r, e, t, ...o) {
		Log.b8(3, r, e, t, o, levelTrace[3]);
	}
	static b8(t, o, i, n, g, a, L) {
		if (((Log.o6 += 1), !(t > Log.B8))) {
			var [c, r] = LogDefine_1.logAuthorInfo[i];
			if (Log.q8 || r) {
				let r =
					`[${Log.o6}][${exports.levelName[t]}][${o}][${c}][${Time_1.Time.Frame}][${Log.ke()}] ` +
					n;
				var s = {};
				if (0 < g.length) {
					r += " ";
					for (const p of g) {
						var u = p[0],
							l = Log.G8(p[1]);
						(s[u] = l), (r += `[${u}: ${l}]`);
					}
				}
				let e = void 0;
				(e = a ? Log.N8(L, L ? 0 : DEFAULT_SKIP_INDEX) : e) &&
					(r = (r += "\n") + e),
					Log.Delegate?.(Log.o6, t, o, i, n, s, e),
					logProxy[t](r),
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						LogCaptureController_1.LogCaptureController.RegisterCapture[t] &&
						LogCaptureController_1.LogCaptureController.LogCapture(
							t,
							o,
							i,
							r,
							e ?? "",
						);
			}
		}
	}
	static ke() {
		var r = new Date();
		return (
			`${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:` +
			r.getMilliseconds()
		);
	}
	static O8(r) {
		try {
			return JSON.stringify(r, (r, e) => {
				if (void 0 === e) return "undefined";
				if (null === e) return "null";
				var t = typeof e;
				if ("bigint" == t) return e.toString() + "n";
				if ("function" == t) return e.toString();
				if ("function" == typeof e.ToString) return e.ToString();
				if (e instanceof Set) {
					let r = "";
					for (const o of e)
						0 === r.length ? (r += "Set(") : (r += ","),
							(r += JSON.stringify(o));
					return (r += ")");
				}
				if (e instanceof Map) {
					let r = "";
					for (const i of e)
						0 === r.length ? (r += "Map(") : (r += ","),
							(r += `[${JSON.stringify(i[0])}, ${JSON.stringify(i[1])}]`);
					return (r += ")");
				}
				return e;
			});
		} catch (r) {
			r instanceof Error
				? Log.CheckError() &&
					Log.ErrorWithStack("Log", 1, "Log 序列化异常", r, [
						"error",
						r.message,
					])
				: Log.CheckError() &&
					Log.Error("Log", 1, "Log 序列化异常", ["error", r]);
		}
	}
	static G8(r) {
		return void 0 === r
			? "undefined"
			: null === r
				? "null"
				: "string" == typeof r
					? r
					: Log.k8 && "object" == typeof r
						? Log.O8(r) ?? ""
						: r.toString();
	}
	static N8(o, i) {
		var r = Error.prepareStackTrace;
		Error.prepareStackTrace = Log.F8;
		let n = void 0;
		if (
			(o
				? (n = o.stack)
				: (Error.captureStackTrace(Log.V8, Log.N8),
					(n = Log.V8.stack),
					(Log.V8.stack = void 0)),
			(Error.prepareStackTrace = r),
			n && Array.isArray(n))
		) {
			let e = "",
				t = "";
			for (let r = i; r < n.length; ++r) {
				var g,
					a,
					L,
					c,
					s = n[r];
				s &&
					((g =
						((g = s.getTypeName()) ? g + "." : "") +
						(s.getFunctionName() ?? "")),
					(c = s.getFileName() ?? void 0),
					(a = s.getLineNumber() ?? -1),
					(s = s.getColumnNumber() ?? -1),
					(L = Log.H8(c, "JavaScript", 1)),
					(e += `	${g} (${L}:${a}:${s})
`),
					puerts_1.convertSourceMap) &&
					c &&
					0 !== c.length &&
					((L = (0, puerts_1.convertSourceMap)(c + ".map", a, s))
						? ((c = Log.H8(L.source, "Src", 1)),
							(t += `	${g} (${c}:${L.line}:${L.column})
`))
						: (t += "\tconvert source map fail\n"));
			}
			let r = `JS 堆栈${Log.U8}:
`;
			return (
				(r += e),
				0 < t.length && (r = (r += "TS 堆栈:a\n") + t),
				(r =
					UE.KuroStaticLibrary.GetBlueprintCallstack &&
					(o = UE.KuroStaticLibrary.GetBlueprintCallstack()) &&
					0 < o.length
						? r + "BP 堆栈:\n" + o
						: r)
			);
		}
	}
	static H8(r, e, t) {
		var o;
		return r && 0 !== r.length
			? 0 < (o = r.indexOf(e))
				? r.substring(o + e.length + t)
				: r
			: "unknown";
	}
	static GenLogId() {
		return ++Log.o6;
	}
}
((exports.Log = Log).B8 = 3),
	(Log.k8 = !0),
	(Log.q8 = !1),
	(Log.o6 = 0),
	(Log.Delegate = void 0),
	(Log.A8 = void 0),
	(Log.P8 = void 0),
	(Log.x8 = void 0),
	(Log.w8 = void 0),
	(Log.U8 = ""),
	(Log.F8 = (r, e) => e),
	(Log.V8 = { stack: void 0 });
//# sourceMappingURL=Log.js.map
