"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackboardMap = exports.BlackboardParam = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils");
class BlackboardParam {
	constructor(r) {
		(this.jSe = ""),
			(this.epr = 0),
			(this.tpr = void 0),
			(this.ipr = !1),
			(this.rpr = 0),
			(this.npr = ""),
			(this.IGe = void 0),
			(this.spr = void 0),
			(this.apr = void 0),
			(this.hpr = void 0),
			(this.S9 = r);
	}
	static CreateByProtocol(r) {
		if (void 0 !== r) {
			var t = r,
				a = new BlackboardParam(t.Ikn);
			r = (a.SetKey(t.Ckn), Protocol_1.Aki.Protocol.u2s);
			switch (t.Ikn) {
				case r.Proto_BlackboardParamType_Int:
					return a.SetIntValue(t.Z3n), a;
				case r.Proto_BlackboardParamType_IntArray:
					return a.SetIntValues(t.D7n.A7n), a;
				case r.Proto_BlackboardParamType_Long:
					return a.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(t.U7n)), a;
				case r.Proto_BlackboardParamType_LongArray:
					var o = t.R7n.A7n,
						e = new Array();
					for (const r of o) e.push(MathUtils_1.MathUtils.LongToBigInt(r));
					return a.SetLongValues(e), a;
				case r.Proto_BlackboardParamType_Boolean:
					return a.SetBooleanValue(t.x7n), a;
				case r.Proto_BlackboardParamType_String:
					return a.SetStringValue(t.t4n), a;
				case r.Proto_BlackboardParamType_StringArray:
					return a.SetStringValues(t.w7n.A7n), a;
				case r.Proto_BlackboardParamType_Float:
					return a.SetFloatValue(t.P7n), a;
				case r.Proto_BlackboardParamType_FloatArray:
					return a.SetFloatValues(t.B7n.A7n), a;
				case r.Proto_BlackboardParamType_Vector:
					return a.SetVectorValue(t.b7n.X, t.b7n.Y, t.b7n.Z), a;
				case r.Proto_BlackboardParamType_VectorArray:
					return a.SetVectorValues(t.q7n.A7n), a;
				case r.Proto_BlackboardParamType_Rotator:
					return a.SetRotatorValue(t.G7n.Pitch, t.G7n.Roll, t.G7n.Yaw), a;
				case r.Proto_BlackboardParamType_RotatorArray:
					return a.SetRotatorValues(t.O7n.A7n), a;
				case r.Proto_BlackboardParamType_Entity:
					return a.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(t.U7n)), a;
				case r.Proto_BlackboardParamType_EntityArray:
					o = t.R7n.A7n;
					var l = new Array();
					for (const r of o) l.push(MathUtils_1.MathUtils.LongToBigInt(r));
					return a.SetLongValues(l), a;
				default:
					return;
			}
		}
	}
	GetKey() {
		return this.jSe;
	}
	GetType() {
		return this.S9;
	}
	SetKey(r) {
		this.jSe = r;
	}
	GetIntValue() {
		return this.epr;
	}
	SetIntValue(r) {
		this.epr = r;
	}
	GetIntValues() {
		return this.lpr;
	}
	SetIntValues(r) {
		this.lpr = r;
	}
	GetLongValue() {
		return this.tpr;
	}
	SetLongValue(r) {
		this.tpr = r;
	}
	GetLongValues() {
		return this._pr;
	}
	SetLongValues(r) {
		this._pr = r;
	}
	GetBooleanValue() {
		return this.ipr;
	}
	SetBooleanValue(r) {
		this.ipr = r;
	}
	GetFloatValue() {
		return this.rpr;
	}
	SetFloatValue(r) {
		this.rpr = r;
	}
	GetFloatValues() {
		return this.upr;
	}
	SetFloatValues(r) {
		this.upr = r;
	}
	GetStringValue() {
		return this.npr;
	}
	SetStringValue(r) {
		this.npr = r;
	}
	GetStringValues() {
		return this.cpr;
	}
	SetStringValues(r) {
		this.cpr = r;
	}
	GetVectorValue() {
		return this.IGe;
	}
	SetVectorValue(r, t, a) {
		this.IGe || (this.IGe = Protocol_1.Aki.Protocol.VBs.create()),
			(this.IGe.X = r),
			(this.IGe.Y = t),
			(this.IGe.Z = a);
	}
	GetVectorValues() {
		return this.spr;
	}
	SetVectorValues(r) {
		this.spr = r;
	}
	GetRotatorValue() {
		return this.apr;
	}
	SetRotatorValue(r, t, a) {
		this.apr || (this.apr = Protocol_1.Aki.Protocol.iws.create()),
			(this.apr.Pitch = r),
			(this.apr.Roll = t),
			(this.apr.Yaw = a);
	}
	GetRotatorValues() {
		return this.hpr;
	}
	SetRotatorValues(r) {
		this.hpr = r;
	}
	ToString() {
		var r = Protocol_1.Aki.Protocol.u2s;
		switch (this.S9) {
			case r.Proto_BlackboardParamType_Int:
				return this.epr.toString();
			case r.Proto_BlackboardParamType_IntArray: {
				let r = "[";
				if (void 0 !== this.lpr) {
					var t = this.lpr.length;
					for (let a = 0; a < t; a++)
						(r += this.lpr[a]), a !== t - 1 && (r += ", ");
				}
				return (r += "]");
			}
			case r.Proto_BlackboardParamType_Long:
				return this.tpr.toString();
			case r.Proto_BlackboardParamType_LongArray: {
				let r = "[";
				if (void 0 !== this._pr) {
					var a = this._pr.length;
					for (let t = 0; t < a; t++)
						(r += this._pr[t]), t !== a - 1 && (r += ", ");
				}
				return (r += "]");
			}
			case r.Proto_BlackboardParamType_Boolean:
				return this.ipr.toString();
			case r.Proto_BlackboardParamType_String:
				return this.npr;
			case r.Proto_BlackboardParamType_StringArray: {
				let r = "[";
				if (void 0 !== this.cpr) {
					var o = this.cpr.length;
					for (let t = 0; t < o; t++)
						(r += this.cpr[t]), t !== o - 1 && (r += ", ");
				}
				return (r += "]");
			}
			case r.Proto_BlackboardParamType_Float:
				return this.rpr.toString();
			case r.Proto_BlackboardParamType_FloatArray: {
				let r = "[";
				if (void 0 !== this.upr) {
					var e = this.upr.length;
					for (let t = 0; t < e; t++)
						(r += this.upr[t]), t !== e - 1 && (r += ", ");
				}
				return (r += "]");
			}
			case r.Proto_BlackboardParamType_Vector: {
				let r = "";
				return (
					void 0 !== this.IGe &&
						(r += `X:${this.IGe.X} Y:${this.IGe.Y} Z:` + this.IGe.Z),
					r
				);
			}
			case r.Proto_BlackboardParamType_VectorArray: {
				let r = "[";
				if (void 0 !== this.spr) {
					var l = this.spr.length;
					for (let t = 0; t < l; t++) {
						var s = this.spr[t];
						(r += `X:${s.X} Y:${s.Y} Z:` + s.Z), t !== l - 1 && (r += ", ");
					}
				}
				return (r += "]");
			}
			case r.Proto_BlackboardParamType_Rotator: {
				let r = "";
				return (
					void 0 !== this.apr &&
						(r +=
							`Pitch:${this.apr.Pitch} Roll:${this.apr.Roll} Yaw:` +
							this.apr.Yaw),
					r
				);
			}
			case r.Proto_BlackboardParamType_RotatorArray: {
				let r = "[";
				if (void 0 !== this.hpr) {
					var c = this.hpr.length;
					for (let t = 0; t < c; t++) {
						var i = this.hpr[t];
						(r += `Pitch:${i.Pitch} Roll:${i.Roll} Yaw:` + i.Yaw),
							t !== c - 1 && (r += ", ");
					}
				}
				return (r += "]");
			}
			default:
				return "";
		}
	}
}
exports.BlackboardParam = BlackboardParam;
class BlackboardMap {
	constructor() {
		this.BlackboardMap = new Map();
	}
	GetValue(r) {
		return (r = this.BlackboardMap.get(r)) || void 0;
	}
	HasValue(r) {
		return this.BlackboardMap.has(r);
	}
	SetValue(r, t) {
		this.BlackboardMap.set(r, t);
	}
	RemoveValue(r) {
		return this.BlackboardMap.delete(r);
	}
	Clear() {
		this.BlackboardMap.clear();
	}
	ToString() {
		let r = "";
		for (const a of this.BlackboardMap.keys()) {
			var t = this.BlackboardMap.get(a);
			r += `key:${a}  type:${BlackboardMap.mpr(t.GetType())}  value:${t?.ToString()}\n`;
		}
		return r;
	}
	static CheckValueType(r, t, a) {
		return (
			t.GetType() === a ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[BlackboardMap.CheckValue] 设置黑板值失败,因为相同的Key使用了不同的数据类型。",
					["Key", r],
					["Old字段类型", BlackboardMap.mpr(t.GetType())],
					["New字段类型", BlackboardMap.mpr(a)],
				),
			!1)
		);
	}
	static mpr(r) {
		switch (r) {
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None:
				return "none";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int:
				return "int";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray:
				return "array<int>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long:
				return "long";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray:
				return "array<long>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean:
				return "boolean";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String:
				return "string";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray:
				return "array<string>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float:
				return "float";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray:
				return "array<float>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector:
				return "vector";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray:
				return "array<vector>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator:
				return "rotator";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray:
				return "array<rotator>";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity:
				return "entity";
			case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray:
				return "array<entity>";
			default:
				return;
		}
	}
}
exports.BlackboardMap = BlackboardMap;
