"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeserializeConfig = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	RATE_10000 = 1e-4,
	MAX_CODES = 65535,
	tempCodes = new Array();
class DeserializeConfig {
	static ParseInt(e, o = 0, ...i) {
		var t = { Success: !0, Value: 0, Position: o };
		return (
			e.byteLength >= o + 4
				? ((e = e.getInt32(o, !0)), (t.Position = o + 4), (t.Value = e))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"配置表序列化 int32 类型出错，请检查配置表定义与配置表数据是否一致！",
							...i,
						),
					(t.Success = !1)),
			t
		);
	}
	static ParseBigInt(e, o = 0, ...i) {
		var t = { Success: !0, Value: 0n, Position: o };
		return (
			e.byteLength >= o + 8
				? ((e = e.getBigInt64(o, !0)), (t.Position = o + 8), (t.Value = e))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"配置表序列化 int64 类型出错，请检查配置表定义与配置表数据是否一致！",
							...i,
						),
					(t.Success = !1)),
			t
		);
	}
	static ParseFloat(e, o = 0, ...i) {
		var t = { Success: !0, Value: 0, Position: o };
		return (
			e.byteLength >= o + 4
				? ((e = e.getInt32(o, !0)),
					(t.Position = o + 4),
					(t.Value = e * RATE_10000))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"配置表序列化 float 类型出错，请检查配置表定义与配置表数据是否一致！",
							...i,
						),
					(t.Success = !1)),
			t
		);
	}
	static ParseBoolean(e, o = 0, ...i) {
		var t = { Success: !0, Value: !1, Position: o };
		return (
			e.byteLength >= o + 1
				? ((t.Value = 1 === e.getInt8(o)), (t.Position = o + 1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"配置表序列化 bool 类型出错，请检查配置表定义与配置表数据是否一致！",
							...i,
						),
					(t.Success = !1)),
			t
		);
	}
	static ParseStringRange(t, s, r, ...n) {
		var a = { Success: !1, Value: "", Position: s };
		if (t.byteLength < s + r)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Config",
					2,
					"配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！",
					...n,
				);
		else {
			if (0 !== r) {
				let o = 0;
				var g;
				let i = void 0;
				for (let e = s; e < s + r; )
					(g = t.getUint8(e)) >>> 7 == 0
						? (tempCodes.push(t.getUint8(e)), (e += 1))
						: 252 == (252 & g)
							? ((o = (3 & t.getUint8(e)) << 30),
								(o =
									(o =
										(o =
											(o =
												(o |= (63 & t.getUint8(e + 1)) << 24) |
												((63 & t.getUint8(e + 2)) << 18)) |
											((63 & t.getUint8(e + 3)) << 12)) |
										((63 & t.getUint8(e + 4)) << 6)) |
									(63 & t.getUint8(e + 5))),
								tempCodes.push(o),
								(e += 6))
							: 248 == (248 & g)
								? ((o = (7 & t.getUint8(e)) << 24),
									(o =
										(o =
											(o =
												(o |= (63 & t.getUint8(e + 1)) << 18) |
												((63 & t.getUint8(e + 2)) << 12)) |
											((63 & t.getUint8(e + 3)) << 6)) |
										(63 & t.getUint8(e + 4))),
									tempCodes.push(o),
									(e += 5))
								: 240 == (240 & g)
									? ((o = (15 & t.getUint8(e)) << 18),
										(o =
											(o =
												(o |= (63 & t.getUint8(e + 1)) << 12) |
												((63 & t.getUint8(e + 2)) << 6)) |
											(63 & t.getUint8(e + 3))),
										tempCodes.push(o),
										(e += 4))
									: 224 == (224 & g)
										? ((o = (31 & t.getUint8(e)) << 12),
											(o =
												(o |= (63 & t.getUint8(e + 1)) << 6) |
												(63 & t.getUint8(e + 2))),
											tempCodes.push(o),
											(e += 3))
										: 192 == (192 & g)
											? ((o = (63 & t.getUint8(e)) << 6),
												(o |= 63 & t.getUint8(e + 1)),
												tempCodes.push(o),
												(e += 2))
											: (tempCodes.push(t.getUint8(e)), (e += 1)),
						tempCodes.length === MAX_CODES &&
							((g = String.fromCharCode.apply(void 0, tempCodes)),
							(tempCodes.length = 0),
							i ? i.push(g) : (i = [g]));
				let e = i ? i.join("") : void 0;
				0 < tempCodes.length &&
					((n = String.fromCharCode.apply(void 0, tempCodes)),
					(tempCodes.length = 0),
					e ? (e += n) : (e = n)),
					(a.Value = e),
					(a.Position = s + r);
			}
			a.Success = !0;
		}
		return a;
	}
	static ParseString(e, o = 0, ...i) {
		let t = { Success: !1, Value: "", Position: o };
		o = DeserializeConfig.ParseInt(e, o);
		if (o.Success && void 0 !== o.Value && void 0 !== o.Position) {
			var s = o.Value,
				o = o.Position;
			if (((t.Position = o), s < 0))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							2,
							"配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！",
							...i,
						),
					t
				);
			if (0 === s) return (t.Success = !0), t;
			t = DeserializeConfig.ParseStringRange(e, o, s, ...i);
		}
		return t;
	}
}
((exports.DeserializeConfig = DeserializeConfig).X9 = void 0),
	(DeserializeConfig.Y9 = void 0),
	(DeserializeConfig.J9 = void 0),
	(DeserializeConfig.z9 = void 0),
	(DeserializeConfig.Z9 = void 0),
	(DeserializeConfig.e7 = void 0);
//# sourceMappingURL=DeserializeConfig.js.map
