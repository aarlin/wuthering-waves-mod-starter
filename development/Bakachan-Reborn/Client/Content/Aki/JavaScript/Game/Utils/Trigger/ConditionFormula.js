"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Formula = void 0);
const Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log");
class Lexer {
	constructor(r) {
		(this.LCr = r), (this.cC = 0);
	}
	Tokenize() {
		for (var r = []; this.cC < this.LCr.length; ) {
			var e = this.LCr[this.cC];
			if (/\d/.test(e)) r.push(this.DCr());
			else if (/[a-zA-Z]/.test(e)) r.push(this.RCr());
			else if (/['"`]/.test(e)) r.push(this.UCr());
			else if (/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(e)) r.push(this.ACr());
			else {
				if ("," === e) r.push({ TokenType: 5, TokenString: "," });
				else if ("(" === e) r.push({ TokenType: 6, TokenString: "(" });
				else if (")" === e) r.push({ TokenType: 7, TokenString: ")" });
				else if ("[" === e) r.push({ TokenType: 8, TokenString: "[" });
				else if ("]" === e) r.push({ TokenType: 9, TokenString: "]" });
				else if (!/\s/.test(e)) throw new Error("Invalid character: " + e);
				this.cC++;
			}
		}
		return r.push({ TokenType: 10, TokenString: "" }), r;
	}
	DCr() {
		let r = "";
		for (; this.cC < this.LCr.length && /\d/.test(this.LCr[this.cC]); )
			(r += this.LCr[this.cC]), this.cC++;
		if ("." === this.LCr[this.cC])
			for (
				r += ".", this.cC++;
				this.cC < this.LCr.length && /\d/.test(this.LCr[this.cC]);
			)
				(r += this.LCr[this.cC]), this.cC++;
		return { TokenType: 0, TokenString: r };
	}
	RCr() {
		let r = "";
		for (; this.cC < this.LCr.length && /[a-zA-Z0-9]/.test(this.LCr[this.cC]); )
			r += this.LCr[this.cC++];
		return "TRUE" === r || "FALSE" === r
			? { TokenType: 1, TokenString: r.toLowerCase() }
			: "AND" === r
				? { TokenType: 4, TokenString: "&&" }
				: "OR" === r
					? { TokenType: 4, TokenString: "||" }
					: "XOR" === r
						? { TokenType: 4, TokenString: "!=" }
						: "NOT" === r
							? { TokenType: 4, TokenString: "!" }
							: { TokenType: 3, TokenString: r };
	}
	UCr() {
		var r = this.LCr[this.cC++];
		let e = "";
		for (; this.cC < this.LCr.length; ) {
			var t = this.LCr[this.cC++];
			if (t === r) return { TokenType: 2, TokenString: e };
			e += t;
		}
		throw new Error("Invalid string: " + e);
	}
	ACr() {
		let r = "";
		for (
			;
			this.cC < this.LCr.length &&
			/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(this.LCr[this.cC]);
		)
			(r += this.LCr[this.cC]), this.cC++;
		return { TokenType: 4, TokenString: r };
	}
}
class Parser {
	constructor(r) {
		(this.xCr = r), (this.PCr = ""), (this.cC = 0);
	}
	Parse(r) {
		this.PCr = r;
		var e = this.wCr();
		if (this.cC !== this.xCr.length - 1)
			throw new Error("Unexpected token when parsing expression " + r);
		return e;
	}
	wCr() {
		return this.BCr();
	}
	BCr() {
		let r = this.bCr();
		for (; this.qCr("||"); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.bCr()],
			};
		}
		return r;
	}
	bCr() {
		let r = this.NCr();
		for (; this.qCr("&&"); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.NCr()],
			};
		}
		return r;
	}
	NCr() {
		let r = this.OCr();
		for (; this.qCr("==", "!="); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.OCr()],
			};
		}
		return r;
	}
	OCr() {
		let r = this.kCr();
		for (; this.qCr(">", ">=", "<", "<="); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.kCr()],
			};
		}
		return r;
	}
	kCr() {
		let r = this.FCr();
		for (; this.qCr("+", "-"); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.FCr()],
			};
		}
		return r;
	}
	FCr() {
		let r = this.VCr();
		for (; this.qCr("*", "/", "%"); ) {
			r = {
				NodeType: 5,
				Operator: this.GCr().TokenString,
				Args: [r, this.VCr()],
			};
		}
		return r;
	}
	VCr() {
		return this.qCr("+", "-", "!")
			? { NodeType: 6, Operator: this.GCr().TokenString, Args: [this.VCr()] }
			: this.HCr();
	}
	HCr() {
		var r = this.jCr();
		if (0 === r.TokenType)
			return (
				this.WCr(),
				r.TokenString.includes(".")
					? { NodeType: 0, Value: parseFloat(r.TokenString) }
					: 10 < r.TokenString.length
						? { NodeType: 0, Value: BigInt(r.TokenString) }
						: { NodeType: 0, Value: parseInt(r.TokenString) }
			);
		if (1 === r.TokenType)
			return this.WCr(), { NodeType: 1, Value: "true" === r.TokenString };
		if (2 === r.TokenType)
			return this.WCr(), { NodeType: 2, Value: r.TokenString };
		if (3 === r.TokenType) {
			var e = r.TokenString;
			if ((this.WCr(), this.KCr(6))) return this.QCr(e);
			let s = { NodeType: 4, Value: e };
			for (; this.KCr(8); ) {
				var t = this.wCr();
				this.XCr(
					9,
					"Expected ']' after array when parsing expression " + this.PCr,
				),
					(s = { NodeType: 9, Value: s, Index: t });
			}
			return s;
		}
		if (this.KCr(6))
			return (
				(e = this.wCr()),
				this.XCr(7, "Expected ')' after expression when parsing " + this.PCr),
				{ NodeType: 8, Value: e }
			);
		if (this.KCr(8)) return this.$Cr();
		throw new Error(r.TokenString + " when parsing expression " + this.PCr);
	}
	QCr(r) {
		var e = [];
		if (!this.Ii(7)) for (; e.push(this.wCr()), this.KCr(5); );
		return (
			this.XCr(
				7,
				"Expected ')' after arguments when parsing expression " + this.PCr,
			),
			{ NodeType: 7, Value: r, Args: e }
		);
	}
	$Cr() {
		var r = [];
		if (!this.Ii(9)) for (; r.push(this.wCr()), this.KCr(5); );
		this.XCr(9, "Expected ']' after array when parsing expression " + this.PCr);
		let e = { NodeType: 3, Value: r };
		for (; this.KCr(8); ) {
			var t = this.wCr();
			this.XCr(
				9,
				"Expected ']' after array when parsing expression " + this.PCr,
			),
				(e = { NodeType: 9, Value: e, Index: t });
		}
		return e;
	}
	KCr(...r) {
		for (const e of r) if (this.Ii(e)) return this.WCr(), !0;
		return !1;
	}
	qCr(...r) {
		for (const e of r)
			if (this.Ii(4) && this.jCr().TokenString === e) return this.WCr(), !0;
		return !1;
	}
	XCr(r, e) {
		if (!this.Ii(r)) throw new Error(e);
		this.WCr();
	}
	Ii(r) {
		return !this.YCr() && this.jCr().TokenType === r;
	}
	WCr() {
		return this.YCr() || this.cC++, this.GCr();
	}
	YCr() {
		return 10 === this.jCr().TokenType;
	}
	jCr() {
		return this.xCr[this.cC];
	}
	GCr() {
		return this.xCr[this.cC - 1];
	}
}
class Formula {
	constructor(r) {
		(this.JCr = void 0),
			(this.PCr = ""),
			(this.Params = void 0),
			(this.nLt = void 0),
			(this.zCr = new Map()),
			(this.ujn = ""),
			(this.cjn = new Set()),
			(this.PCr = r);
		var e = new Lexer(r).Tokenize();
		e = new Parser(e);
		(this.JCr = e.Parse(r)), (this.Params = void 0);
	}
	SetBuiltinFunctions(r) {
		for (var [e, t] of (this.zCr.clear(), r)) this.zCr.set(e, t);
		return this;
	}
	AddBuiltinFunction(r, e) {
		return this.zCr.set(r, e), this;
	}
	SetDefaultParams(r) {
		return (this.Params = { ...r }), this;
	}
	ZCr(r) {
		switch (r.NodeType) {
			case 0:
			case 1:
			case 2:
				return r.Value;
			case 3:
				return r.Value.map((r) => this.ZCr(r));
			case 4:
				var e = this.Params?.[r.Value] ?? this.nLt?.[r.Value];
				if (void 0 === e) throw new Error("Undefined variable: " + r.Value);
				return (
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						!this.cjn.has(r.Value) &&
						(this.cjn.add(r.Value),
						(this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(e))),
					e
				);
			case 9:
				if (void 0 === (e = this.ZCr(r.Value)) || !Array.isArray(e))
					throw new Error("Variable is not a valid array");
				var t = this.ZCr(r.Index);
				if (void 0 === t || "number" != typeof t || t < 0 || t >= e.length)
					throw new Error("Invalid array index: " + String(t));
				return (
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						(this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(e[t])),
					e[t]
				);
			case 6:
				var s = this.ZCr(r.Args[0]);
				switch (r.Operator) {
					case "+":
						return +s;
					case "-":
						return -s;
					case "!":
						return !s;
					default:
						throw new Error("Invalid unary operator: " + r.Operator);
				}
			case 5:
				var i = this.ZCr(r.Args[0]),
					n = this.ZCr(r.Args[1]);
				try {
					switch (r.Operator) {
						case "+":
							return i + n;
						case "-":
							return i - n;
						case "*":
							return i * n;
						case "/":
							return i / n;
						case ">":
							return n < i;
						case ">=":
							return n <= i;
						case "<":
							return i < n;
						case "<=":
							return i <= n;
						case "==":
							return i === n;
						case "!=":
							return i !== n;
						case "&&":
							return i && n;
						case "||":
							return i || n;
						default:
							throw new Error("Invalid binary operator: " + r.Operator);
					}
				} catch (e) {
					throw new Error(`Invalid operation: ${i} ${r.Operator} ` + n);
				}
			case 7:
				return (
					(e = r.Args.map((r) => this.ZCr(r))),
					(t = this.zCr.get(r.Value)?.(...e)),
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						(this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(t)),
					t
				);
			case 8:
				return this.ZCr(r.Value);
			default:
				throw new Error("Invalid node type: " + r.NodeType);
		}
	}
	Evaluate(r) {
		let e;
		Info_1.Info.IsBuildDevelopmentOrDebug &&
			((this.ujn = ""), this.cjn.clear()),
			(this.nLt = r);
		try {
			(e = this.ZCr(this.JCr)),
				Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = this.ujn?.trim());
		} catch (r) {
			(e = void 0),
				r instanceof Error
					? (Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Event",
								20,
								"Trigger条件解析异常",
								r,
								["formula", this.PCr],
								["error", r.message],
							),
						Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = r.message))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								20,
								"Trigger条件解析异常",
								["formula", this.PCr],
								["error", r],
							),
						Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = String(r)));
		} finally {
			this.nLt = void 0;
		}
		return e;
	}
	GetFormulaString(r) {
		switch (r.NodeType) {
			case 0:
			case 1:
			case 2:
				return r.Value.toString();
			case 3:
				return `[${r.Value.map((r) => this.GetFormulaString(r)).join(",")}]`;
			case 4:
				return r.Value;
			case 9:
				return `${this.GetFormulaString(r.Value)}[${this.GetFormulaString(r.Index)}]`;
			case 6:
				return `${r.Operator}(${this.GetFormulaString(r.Args[0])})`;
			case 5:
				return (
					`${this.GetFormulaString(r.Args[0])} ${r.Operator} ` +
					this.GetFormulaString(r.Args[1])
				);
			case 7:
				return `${r.Value}(${r.Args.map((r) => this.GetFormulaString(r)).join(",")})`;
			case 8:
				return `(${this.GetFormulaString(r.Value)})`;
			default:
				return "";
		}
	}
	GetLastResult() {
		return this.ujn;
	}
}
exports.Formula = Formula;
