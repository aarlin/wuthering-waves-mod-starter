"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogProfiler = void 0);
const Stack_1 = require("../Container/Stack"),
	StringUtils_1 = require("../Utils/StringUtils"),
	Log_1 = require("./Log"),
	ONE_SECOND = 1e3;
class LogProfiler {
	constructor(r, o = !1) {
		(this.u9 = void 0),
			(this.he = r),
			(this.B8 = 0),
			(this.c9 = -1),
			(this.Time = 0),
			(this.t6 = 0),
			(this.m9 = o),
			(this.d9 = "");
	}
	static Create(r) {
		return new LogProfiler(r);
	}
	SetDescribe(r) {
		this.d9 = r;
	}
	CreateChild(r, o = !1) {
		this.u9 || (this.u9 = new Array());
		r = new LogProfiler(r, o);
		return (r.B8 = this.B8 + 1), this.u9.push(r), r;
	}
	Reset() {
		if (((this.c9 = -1), (this.Time = 0), (this.t6 = 0), this.u9)) {
			for (let r = this.u9.length - 1; 0 <= r; --r)
				this.u9[r].m9 && (this.u9[r].Reset(), this.u9.splice(r, 1));
			for (const r of this.u9) r.Reset();
		}
	}
	Start() {
		-1 !== this.c9 &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Log",
				3,
				"[LogProfiler.Start] error, repeat start, name: ",
				["this.Name", this.he],
			),
			(this.c9 = Date.now());
	}
	Restart() {
		this.Reset(), this.Start();
	}
	Stop() {
		-1 === this.c9 &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Log",
				3,
				"[LogProfiler.Stop] error, repeat stop, name: ",
				["this.Name", this.he],
			),
			(this.Time += Date.now() - this.c9),
			(this.t6 += 1),
			(this.c9 = -1);
	}
	C9() {
		LogProfiler.g9.push("\n");
		for (let r = 0; r < this.B8; ++r) LogProfiler.g9.push("    ");
		var r;
		LogProfiler.g9.push(this.he),
			this.t6 <= 0 ||
				(LogProfiler.g9.push(", "),
				LogProfiler.g9.push("Describe"),
				LogProfiler.g9.push(": "),
				LogProfiler.g9.push(this.d9),
				LogProfiler.g9.push(" ["),
				LogProfiler.g9.push("Count"),
				LogProfiler.g9.push(": "),
				LogProfiler.g9.push(this.t6),
				LogProfiler.g9.push(", "),
				LogProfiler.g9.push("Time"),
				LogProfiler.g9.push(": "),
				this.Time < ONE_SECOND
					? (LogProfiler.g9.push(this.Time), LogProfiler.g9.push(" ms"))
					: (LogProfiler.g9.push(this.Time / ONE_SECOND),
						LogProfiler.g9.push(" s")),
				1 < this.t6 &&
					(LogProfiler.g9.push(", Average: "),
					(r = this.Time / this.t6),
					this.Time < ONE_SECOND
						? (LogProfiler.g9.push(r), LogProfiler.g9.push(" ms"))
						: (LogProfiler.g9.push(r / ONE_SECOND), LogProfiler.g9.push(" s"))),
				LogProfiler.g9.push("]"));
	}
	ToString() {
		if (LogProfiler.f9) return this.p9();
		for (
			LogProfiler.g9.length = 0,
				LogProfiler.v9.Clear(),
				LogProfiler.v9.Push(this);
			0 < LogProfiler.v9.Size;
		) {
			var r = LogProfiler.v9.Pop(),
				o = (r.C9(), r.u9);
			if (o && 0 !== o.length)
				for (let r = o.length - 1; 0 <= r; --r) LogProfiler.v9.Push(o[r]);
		}
		var i = LogProfiler.g9.join(StringUtils_1.EMPTY_STRING);
		return (LogProfiler.g9.length = 0), i;
	}
	p9() {
		(LogProfiler.g9.length = 0), LogProfiler.v9.Clear();
		var r = new Stack_1.Stack();
		for (
			LogProfiler.v9.Push(this), r.Push(this.B8);
			0 < LogProfiler.v9.Size;
		) {
			var i = LogProfiler.v9.Pop(),
				o = (i.M9(), i.u9);
			if (o?.length)
				for (let r = o.length - 1; 0 <= r; --r) LogProfiler.v9.Push(o[r]);
			var e = LogProfiler.v9.Peek();
			if (e && e.B8 < i.B8) {
				var t = i.B8 - e.B8;
				LogProfiler.g9.push("\n");
				for (let o = 0; o < t; ++o) {
					for (let r = 0; r < i.B8 - 1 - o; ++r) LogProfiler.g9.push("    ");
					LogProfiler.g9.push("</Element>\n");
				}
			}
		}
		LogProfiler.g9.push(this.u9?.length ? "\n</Element>\n" : "");
		r = LogProfiler.g9.join(StringUtils_1.EMPTY_STRING);
		return (LogProfiler.g9.length = 0), r;
	}
	M9() {
		LogProfiler.g9.push("\n");
		for (let r = 0; r < this.B8; ++r) LogProfiler.g9.push("    ");
		var r;
		LogProfiler.g9.push("<Element "),
			LogProfiler.g9.push(`Name="${this.he}"`),
			this.t6 <= 0 ||
				(LogProfiler.g9.push(` Count="${this.t6}"`),
				LogProfiler.g9.push(' Time="'),
				this.Time < ONE_SECOND
					? (LogProfiler.g9.push(this.Time), LogProfiler.g9.push("ms"))
					: (LogProfiler.g9.push(this.Time / ONE_SECOND),
						LogProfiler.g9.push("s")),
				LogProfiler.g9.push('" '),
				1 < this.t6 &&
					(LogProfiler.g9.push('Average="'),
					(r = this.Time / this.t6),
					this.Time < ONE_SECOND
						? (LogProfiler.g9.push(r), LogProfiler.g9.push("ms"))
						: (LogProfiler.g9.push(r / ONE_SECOND), LogProfiler.g9.push("s")),
					LogProfiler.g9.push('" ')),
				LogProfiler.g9.push(` Des="${this.d9}"`)),
			LogProfiler.g9.push(this.u9?.length ? ">" : "/>");
	}
}
((exports.LogProfiler = LogProfiler).f9 = !1),
	(LogProfiler.g9 = new Array()),
	(LogProfiler.v9 = new Stack_1.Stack());
//# sourceMappingURL=LogProfiler.js.map
