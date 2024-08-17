module.exports = Long;
var wasm = null;
function Long(t, o, r) {
	(this.low = 0 | t), (this.high = 0 | o), (this.unsigned = !!r);
}
function isLong(t) {
	return !0 === (t && t.__isLong__);
}
Long.prototype.__isLong__,
	Object.defineProperty(Long.prototype, "__isLong__", { value: !0 }),
	(Long.isLong = isLong);
var INT_CACHE = {},
	UINT_CACHE = {};
function fromInt(t, o) {
	var r, n, i;
	return o
		? (i = 0 <= (t >>>= 0) && t < 256) && (n = UINT_CACHE[t])
			? n
			: ((r = fromBits(t, (0 | t) < 0 ? -1 : 0, !0)),
				i && (UINT_CACHE[t] = r),
				r)
		: (i = -128 <= (t |= 0) && t < 128) && (n = INT_CACHE[t])
			? n
			: ((r = fromBits(t, t < 0 ? -1 : 0, !1)), i && (INT_CACHE[t] = r), r);
}
function fromNumber(t, o) {
	if (isNaN(t)) return o ? UZERO : ZERO;
	if (o) {
		if (t < 0) return UZERO;
		if (TWO_PWR_64_DBL <= t) return MAX_UNSIGNED_VALUE;
	} else {
		if (t <= -TWO_PWR_63_DBL) return MIN_VALUE;
		if (TWO_PWR_63_DBL <= t + 1) return MAX_VALUE;
	}
	return t < 0
		? fromNumber(-t, o).neg()
		: fromBits((t % TWO_PWR_32_DBL) | 0, (t / TWO_PWR_32_DBL) | 0, o);
}
function fromBigInt(t, o) {
	return fromBits(
		Number(t % BigInt_TWO_PWR_32_DBL),
		Number(t / BigInt_TWO_PWR_32_DBL),
		o,
	);
}
function fromBits(t, o, r) {
	return new Long(t, o, r);
}
(Long.fromInt = fromInt),
	(Long.fromBigInt = fromBigInt),
	(Long.fromNumber = fromNumber),
	(Long.fromBits = fromBits);
var pow_dbl = Math.pow;
function fromString(t, o, r) {
	if (0 === t.length) throw Error("empty string");
	if ("NaN" === t || "Infinity" === t || "+Infinity" === t || "-Infinity" === t)
		return ZERO;
	if (
		((o = "number" == typeof o ? ((r = o), !1) : !!o),
		(r = r || 10) < 2 || 36 < r)
	)
		throw RangeError("radix");
	var n;
	if (0 < (n = t.indexOf("-"))) throw Error("interior hyphen");
	if (0 === n) return fromString(t.substring(1), o, r).neg();
	for (
		var i = fromNumber(pow_dbl(r, 8)), s = ZERO, e = 0;
		e < t.length;
		e += 8
	) {
		var h = Math.min(8, t.length - e),
			L = parseInt(t.substring(e, e + h), r);
		s = (
			h < 8 ? ((h = fromNumber(pow_dbl(r, h))), s.mul(h)) : (s = s.mul(i))
		).add(fromNumber(L));
	}
	return (s.unsigned = o), s;
}
function fromValue(t, o) {
	return "number" == typeof t
		? fromNumber(t, o)
		: "string" == typeof t
			? fromString(t, o)
			: "bigint" == typeof t
				? fromBigInt(t, o)
				: fromBits(t.low, t.high, "boolean" == typeof o ? o : t.unsigned);
}
(Long.fromString = fromString), (Long.fromValue = fromValue);
var BigInt_TWO_PWR_32_DBL = 1n << 32n,
	TWO_PWR_16_DBL = 65536,
	TWO_PWR_24_DBL = 1 << 24,
	TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL,
	TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL,
	TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2,
	TWO_PWR_24 = fromInt(TWO_PWR_24_DBL),
	ZERO = fromInt(0),
	UZERO = ((Long.ZERO = ZERO), fromInt(0, !0)),
	ONE = ((Long.UZERO = UZERO), fromInt(1)),
	UONE = ((Long.ONE = ONE), fromInt(1, !0)),
	NEG_ONE = ((Long.UONE = UONE), fromInt(-1)),
	MAX_VALUE = ((Long.NEG_ONE = NEG_ONE), fromBits(-1, 2147483647, !1)),
	MAX_UNSIGNED_VALUE = ((Long.MAX_VALUE = MAX_VALUE), fromBits(-1, -1, !0)),
	MIN_VALUE =
		((Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE),
		fromBits(0, -2147483648, !1)),
	LongPrototype = ((Long.MIN_VALUE = MIN_VALUE), Long.prototype);
(LongPrototype.toInt = function t() {
	return this.unsigned ? this.low >>> 0 : this.low;
}),
	(LongPrototype.toNumber = function t() {
		return this.unsigned
			? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0)
			: this.high * TWO_PWR_32_DBL + (this.low >>> 0);
	}),
	(LongPrototype.toString = function t(o) {
		if ((o = o || 10) < 2 || 36 < o) throw RangeError("radix");
		if (this.isZero()) return "0";
		var r, n;
		if (this.isNegative())
			return this.eq(MIN_VALUE)
				? ((n = fromNumber(o)),
					(n = (r = this.div(n)).mul(n).sub(this)),
					r.toString(o) + n.toInt().toString(o))
				: "-" + this.neg().toString(o);
		for (
			var i = fromNumber(pow_dbl(o, 6), this.unsigned), s = this, e = "";
			;
		) {
			var h = s.div(i),
				L = (s.sub(h.mul(i)).toInt() >>> 0).toString(o);
			if ((s = h).isZero()) return L + e;
			for (; L.length < 6; ) L = "0" + L;
			e = "" + L + e;
		}
	}),
	(LongPrototype.getHighBits = function t() {
		return this.high;
	}),
	(LongPrototype.getHighBitsUnsigned = function t() {
		return this.high >>> 0;
	}),
	(LongPrototype.getLowBits = function t() {
		return this.low;
	}),
	(LongPrototype.getLowBitsUnsigned = function t() {
		return this.low >>> 0;
	}),
	(LongPrototype.getNumBitsAbs = function t() {
		if (this.isNegative())
			return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
		for (
			var o = 0 != this.high ? this.high : this.low, r = 31;
			0 < r && 0 == (o & (1 << r));
			r--
		);
		return 0 != this.high ? r + 33 : r + 1;
	}),
	(LongPrototype.isZero = function t() {
		return 0 === this.high && 0 === this.low;
	}),
	(LongPrototype.eqz = LongPrototype.isZero),
	(LongPrototype.isNegative = function t() {
		return !this.unsigned && this.high < 0;
	}),
	(LongPrototype.isPositive = function t() {
		return this.unsigned || 0 <= this.high;
	}),
	(LongPrototype.isOdd = function t() {
		return 1 == (1 & this.low);
	}),
	(LongPrototype.isEven = function t() {
		return 0 == (1 & this.low);
	}),
	(LongPrototype.equals = function t(o) {
		return (
			isLong(o) || (o = fromValue(o)),
			(this.unsigned === o.unsigned ||
				this.high >>> 31 != 1 ||
				o.high >>> 31 != 1) &&
				this.high === o.high &&
				this.low === o.low
		);
	}),
	(LongPrototype.eq = LongPrototype.equals),
	(LongPrototype.notEquals = function t(o) {
		return !this.eq(o);
	}),
	(LongPrototype.neq = LongPrototype.notEquals),
	(LongPrototype.ne = LongPrototype.notEquals),
	(LongPrototype.lessThan = function t(o) {
		return this.comp(o) < 0;
	}),
	(LongPrototype.lt = LongPrototype.lessThan),
	(LongPrototype.lessThanOrEqual = function t(o) {
		return this.comp(o) <= 0;
	}),
	(LongPrototype.lte = LongPrototype.lessThanOrEqual),
	(LongPrototype.le = LongPrototype.lessThanOrEqual),
	(LongPrototype.greaterThan = function t(o) {
		return 0 < this.comp(o);
	}),
	(LongPrototype.gt = LongPrototype.greaterThan),
	(LongPrototype.greaterThanOrEqual = function t(o) {
		return 0 <= this.comp(o);
	}),
	(LongPrototype.gte = LongPrototype.greaterThanOrEqual),
	(LongPrototype.ge = LongPrototype.greaterThanOrEqual),
	(LongPrototype.compare = function t(o) {
		var r, n;
		return (
			isLong(o) || (o = fromValue(o)),
			this.eq(o)
				? 0
				: ((r = this.isNegative()),
					(n = o.isNegative()),
					r && !n
						? -1
						: !r && n
							? 1
							: this.unsigned
								? o.high >>> 0 > this.high >>> 0 ||
									(o.high === this.high && o.low >>> 0 > this.low >>> 0)
									? -1
									: 1
								: this.sub(o).isNegative()
									? -1
									: 1)
		);
	}),
	(LongPrototype.comp = LongPrototype.compare),
	(LongPrototype.negate = function t() {
		return !this.unsigned && this.eq(MIN_VALUE)
			? MIN_VALUE
			: this.not().add(ONE);
	}),
	(LongPrototype.neg = LongPrototype.negate),
	(LongPrototype.add = function t(o) {
		isLong(o) || (o = fromValue(o));
		var r = this.high >>> 16,
			n = 65535 & this.high,
			i = this.low >>> 16,
			s = 65535 & this.low,
			e = o.high >>> 16,
			h = 65535 & o.high,
			L = o.low >>> 16,
			f = 0,
			u = 0,
			g = 0,
			_ = 0;
		return (
			(u += (g = g + ((_ += s + (65535 & o.low)) >>> 16) + (i + L)) >>> 16),
			fromBits(
				((g &= 65535) << 16) | (_ &= 65535),
				((((f += (u += n + h) >>> 16) + (r + e)) & 65535) << 16) | (u &= 65535),
				this.unsigned,
			)
		);
	}),
	(LongPrototype.subtract = function t(o) {
		return isLong(o) || (o = fromValue(o)), this.add(o.neg());
	}),
	(LongPrototype.sub = LongPrototype.subtract),
	(LongPrototype.multiply = function t(o) {
		var r, n, i, s, e, h, L, f, u, g, _;
		return this.isZero()
			? ZERO
			: (isLong(o) || (o = fromValue(o)),
				wasm
					? fromBits(
							wasm.mul(this.low, this.high, o.low, o.high),
							wasm.get_high(),
							this.unsigned,
						)
					: o.isZero()
						? ZERO
						: this.eq(MIN_VALUE)
							? o.isOdd()
								? MIN_VALUE
								: ZERO
							: o.eq(MIN_VALUE)
								? this.isOdd()
									? MIN_VALUE
									: ZERO
								: this.isNegative()
									? o.isNegative()
										? this.neg().mul(o.neg())
										: this.neg().mul(o).neg()
									: o.isNegative()
										? this.mul(o.neg()).neg()
										: this.lt(TWO_PWR_24) && o.lt(TWO_PWR_24)
											? fromNumber(
													this.toNumber() * o.toNumber(),
													this.unsigned,
												)
											: ((r = this.high >>> 16),
												(n = 65535 & this.high),
												(i = this.low >>> 16),
												(s = 65535 & this.low),
												(e = o.high >>> 16),
												(h = 65535 & o.high),
												(L = o.low >>> 16),
												(_ =
													(_ = g = u = f = 0) +
													((u =
														u +
														((g += s * (o = 65535 & o.low)) >>> 16) +
														i * o) >>>
														16) +
													((u = (u & 65535) + s * L) >>> 16)),
												fromBits(
													((u &= 65535) << 16) | (g &= 65535),
													((f =
														((f =
															(f += (_ += n * o) >>> 16) +
															((_ = (_ & 65535) + i * L) >>> 16) +
															((_ = (_ & 65535) + s * h) >>> 16)) +
															(r * o + n * L + i * h + s * e)) &
														65535) <<
														16) |
														(_ &= 65535),
													this.unsigned,
												)));
	}),
	(LongPrototype.mul = LongPrototype.multiply),
	(LongPrototype.divide = function t(o) {
		if ((o = isLong(o) ? o : fromValue(o)).isZero())
			throw Error("division by zero");
		var r, n, i;
		if (wasm)
			return this.unsigned ||
				-2147483648 !== this.high ||
				-1 !== o.low ||
				-1 !== o.high
				? fromBits(
						(this.unsigned ? wasm.div_u : wasm.div_s)(
							this.low,
							this.high,
							o.low,
							o.high,
						),
						wasm.get_high(),
						this.unsigned,
					)
				: this;
		if (this.isZero()) return this.unsigned ? UZERO : ZERO;
		if (this.unsigned) {
			if ((o = o.unsigned ? o : o.toUnsigned()).gt(this)) return UZERO;
			if (o.gt(this.shru(1))) return UONE;
			n = UZERO;
		} else {
			if (this.eq(MIN_VALUE))
				return o.eq(ONE) || o.eq(NEG_ONE)
					? MIN_VALUE
					: o.eq(MIN_VALUE)
						? ONE
						: (i = this.shr(1).div(o).shl(1)).eq(ZERO)
							? o.isNegative()
								? ONE
								: NEG_ONE
							: ((r = this.sub(o.mul(i))), i.add(r.div(o)));
			if (o.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
			if (this.isNegative())
				return o.isNegative()
					? this.neg().div(o.neg())
					: this.neg().div(o).neg();
			if (o.isNegative()) return this.div(o.neg()).neg();
			n = ZERO;
		}
		for (r = this; r.gte(o); ) {
			i = Math.max(1, Math.floor(r.toNumber() / o.toNumber()));
			for (
				var s = Math.ceil(Math.log(i) / Math.LN2),
					e = s <= 48 ? 1 : pow_dbl(2, s - 48),
					h = fromNumber(i),
					L = h.mul(o);
				L.isNegative() || L.gt(r);
			)
				L = (h = fromNumber((i -= e), this.unsigned)).mul(o);
			h.isZero() && (h = ONE), (n = n.add(h)), (r = r.sub(L));
		}
		return n;
	}),
	(LongPrototype.div = LongPrototype.divide),
	(LongPrototype.modulo = function t(o) {
		return (
			isLong(o) || (o = fromValue(o)),
			wasm
				? fromBits(
						(this.unsigned ? wasm.rem_u : wasm.rem_s)(
							this.low,
							this.high,
							o.low,
							o.high,
						),
						wasm.get_high(),
						this.unsigned,
					)
				: this.sub(this.div(o).mul(o))
		);
	}),
	(LongPrototype.mod = LongPrototype.modulo),
	(LongPrototype.rem = LongPrototype.modulo),
	(LongPrototype.not = function t() {
		return fromBits(~this.low, ~this.high, this.unsigned);
	}),
	(LongPrototype.and = function t(o) {
		return (
			isLong(o) || (o = fromValue(o)),
			fromBits(this.low & o.low, this.high & o.high, this.unsigned)
		);
	}),
	(LongPrototype.or = function t(o) {
		return (
			isLong(o) || (o = fromValue(o)),
			fromBits(this.low | o.low, this.high | o.high, this.unsigned)
		);
	}),
	(LongPrototype.xor = function t(o) {
		return (
			isLong(o) || (o = fromValue(o)),
			fromBits(this.low ^ o.low, this.high ^ o.high, this.unsigned)
		);
	}),
	(LongPrototype.shiftLeft = function t(o) {
		return (
			isLong(o) && (o = o.toInt()),
			0 == (o &= 63)
				? this
				: o < 32
					? fromBits(
							this.low << o,
							(this.high << o) | (this.low >>> (32 - o)),
							this.unsigned,
						)
					: fromBits(0, this.low << (o - 32), this.unsigned)
		);
	}),
	(LongPrototype.shl = LongPrototype.shiftLeft),
	(LongPrototype.shiftRight = function t(o) {
		return (
			isLong(o) && (o = o.toInt()),
			0 == (o &= 63)
				? this
				: o < 32
					? fromBits(
							(this.low >>> o) | (this.high << (32 - o)),
							this.high >> o,
							this.unsigned,
						)
					: fromBits(
							this.high >> (o - 32),
							0 <= this.high ? 0 : -1,
							this.unsigned,
						)
		);
	}),
	(LongPrototype.shr = LongPrototype.shiftRight),
	(LongPrototype.shiftRightUnsigned = function t(o) {
		var r;
		return (
			isLong(o) && (o = o.toInt()),
			0 === (o &= 63)
				? this
				: ((r = this.high),
					o < 32
						? fromBits(
								(this.low >>> o) | (r << (32 - o)),
								r >>> o,
								this.unsigned,
							)
						: fromBits(32 === o ? r : r >>> (o - 32), 0, this.unsigned))
		);
	}),
	(LongPrototype.shru = LongPrototype.shiftRightUnsigned),
	(LongPrototype.shr_u = LongPrototype.shiftRightUnsigned),
	(LongPrototype.toSigned = function t() {
		return this.unsigned ? fromBits(this.low, this.high, !1) : this;
	}),
	(LongPrototype.toUnsigned = function t() {
		return this.unsigned ? this : fromBits(this.low, this.high, !0);
	}),
	(LongPrototype.toBytes = function t(o) {
		return o ? this.toBytesLE() : this.toBytesBE();
	}),
	(LongPrototype.toBytesLE = function t() {
		var o = this.high,
			r = this.low;
		return [
			255 & r,
			(r >>> 8) & 255,
			(r >>> 16) & 255,
			r >>> 24,
			255 & o,
			(o >>> 8) & 255,
			(o >>> 16) & 255,
			o >>> 24,
		];
	}),
	(LongPrototype.toBytesBE = function t() {
		var o = this.high,
			r = this.low;
		return [
			o >>> 24,
			(o >>> 16) & 255,
			(o >>> 8) & 255,
			255 & o,
			r >>> 24,
			(r >>> 16) & 255,
			(r >>> 8) & 255,
			255 & r,
		];
	}),
	(Long.fromBytes = function t(o, r, n) {
		return n ? Long.fromBytesLE(o, r) : Long.fromBytesBE(o, r);
	}),
	(Long.fromBytesLE = function t(o, r) {
		return new Long(
			o[0] | (o[1] << 8) | (o[2] << 16) | (o[3] << 24),
			o[4] | (o[5] << 8) | (o[6] << 16) | (o[7] << 24),
			r,
		);
	}),
	(Long.fromBytesBE = function t(o, r) {
		return new Long(
			(o[4] << 24) | (o[5] << 16) | (o[6] << 8) | o[7],
			(o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3],
			r,
		);
	}),
	(Long.prototype.toString = function t() {
		return "(low: " + this.low + ", high: " + this.high + ")";
	});
//# sourceMappingURL=long.js.map
