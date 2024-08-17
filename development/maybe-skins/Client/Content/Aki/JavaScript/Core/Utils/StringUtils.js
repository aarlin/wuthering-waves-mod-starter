"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StringUtils =
		exports.GRATHER_EQUAL_THAN =
		exports.GRATHER_THAN =
		exports.LESS_EQUAL_THAN =
		exports.LESS_THAN =
		exports.NOT_EQUAL =
		exports.EQUAL =
		exports.NONE_STRING =
		exports.SPEED_STRING =
		exports.SLASH_STRING =
		exports.TAB_STRING =
		exports.LINE_BREAK_STRING =
		exports.EMPTY_STRING =
		exports.ONE_STRING =
		exports.ZERO_STRING =
			void 0);
const StringBuilder_1 = require("./StringBuilder"),
	REG_PATTERN =
		((exports.ZERO_STRING = "0"),
		(exports.ONE_STRING = "1"),
		(exports.EMPTY_STRING = ""),
		(exports.LINE_BREAK_STRING = "\n"),
		(exports.TAB_STRING = "\t"),
		(exports.SLASH_STRING = "/"),
		(exports.SPEED_STRING = "/s"),
		(exports.NONE_STRING = "None"),
		(exports.EQUAL = "="),
		(exports.NOT_EQUAL = "!="),
		(exports.LESS_THAN = "<"),
		(exports.LESS_EQUAL_THAN = "<="),
		(exports.GRATHER_THAN = ">"),
		(exports.GRATHER_EQUAL_THAN = ">="),
		"{[0-9]+}"),
	REG_FLAGS = "g",
	UTF8_BOM_HEAD = "\ufeff";
class StringUtils {
	static Format(t, ...r) {
		var e,
			s = new StringBuilder_1.StringBuilder();
		let o = 0;
		for (; null !== (e = StringUtils.Fz.exec(t)); ) {
			var i = parseInt(e[1]);
			s.Append(t.substring(o, e.index)),
				s.Append(r[i] ?? `{${i}}`),
				(o = e.index + e[0].length);
		}
		return s.Append(t.substring(o)), s.ToString();
	}
	static FormatStaticBuilder(t, ...e) {
		var s = t.split(StringUtils.Vz),
			o = this.jz;
		o.Clear();
		for (let t = 0, r = s.length; t < r; ++t)
			o.Append(s[t]), t !== s.length - 1 && o.Append(e[t] ?? `{${t}}`);
		return o.ToString();
	}
	static Uint8ArrayToString(t) {
		var r;
		let e = void 0;
		var s,
			o = new Array(),
			i = t.length;
		let n = 0;
		for (; n < i; )
			switch ((r = t[n++]) >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					o.push(String.fromCharCode(r));
					break;
				case 12:
				case 13:
					(e = t[n++]), o.push(String.fromCharCode(((31 & r) << 6) | (63 & e)));
					break;
				case 14:
					(e = t[n++]),
						(s = t[n++]),
						o.push(
							String.fromCharCode(
								((15 & r) << 12) | ((63 & e) << 6) | ((63 & s) << 0),
							),
						);
			}
		return o.join(exports.EMPTY_STRING);
	}
	static GetStringRealCount(r) {
		let e = 0;
		var s,
			o = r.length;
		for (let t = 0; t < o; t++)
			(s = r.charCodeAt(t)), (e += 0 <= s && s <= 128 ? 1 : 2);
		return e;
	}
	static IsEmpty(t) {
		return !t;
	}
	static ParseTabAndLine(t) {
		let r = t.split("\\n").join(exports.LINE_BREAK_STRING);
		return (r = (r = r.split("\\r").join(exports.EMPTY_STRING))
			.split("\\t")
			.join(exports.TAB_STRING));
	}
	static IsIpAddress(t) {
		return (
			null !==
			t.match(
				/((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])/g,
			)
		);
	}
	static IsBlank(t) {
		return !!StringUtils.IsEmpty(t) || !!t.match(/^\s*$/g);
	}
	static IsNothing(t) {
		return !!StringUtils.IsEmpty(t) || t === exports.NONE_STRING;
	}
	static ParseCsvContent(t) {
		let r = "",
			e = [""];
		var s,
			o = [e];
		let i = 0,
			n = 0,
			a = !0;
		for (s of t.startsWith(UTF8_BOM_HEAD) ? t.replace(/^\ufeff/, "") : t)
			'"' === s
				? (a && s === r && (e[i] += s), (a = !a))
				: "," === s && a
					? ((e[++i] = ""), (s = ""))
					: "\n" === s && a
						? ("\r" === r && (e[i] = e[i].slice(0, -1)),
							(e = [(s = "")]),
							(o[++n] = e),
							(i = 0))
						: (e[i] += s),
				(r = s);
		t = o[o.length - 1];
		return 1 === t.length && "" === t[0] && o.splice(o.length - 1, 1), o;
	}
	static CheckIsOnlyLettersAndNumbers(t) {
		return /^[A-Za-z0-9]*$/.test(t);
	}
}
((exports.StringUtils = StringUtils).Vz = new RegExp(REG_PATTERN, REG_FLAGS)),
	(StringUtils.jz = new StringBuilder_1.StringBuilder()),
	(StringUtils.Fz = /\{(\d+)\}/g);
//# sourceMappingURL=StringUtils.js.map
