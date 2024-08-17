const Long = require("./long");
!(function (undefined) {
	"use strict";
	!(function t(r, u, n) {
		var i = (function t(n) {
			var i = u[n];
			return (
				i || r[n][0].call((i = u[n] = { exports: {} }), t, i, i.exports),
				i.exports
			);
		})(n[0]);
		(i.util.global.protobuf = i),
			"function" == typeof define &&
				define.amd &&
				define(["long"], function (t) {
					return t && t.isLong && ((i.util.Long = t), i.configure()), i;
				}),
			"object" == typeof module &&
				module &&
				module.exports &&
				(module.exports = i);
	})(
		{
			1: [
				function (t, n, i) {
					n.exports = function t(n, i) {
						var r = new Array(arguments.length - 1),
							s = 0,
							u = 2,
							h = !0;
						for (; u < arguments.length; ) r[s++] = arguments[u++];
						return new Promise(function t(u, e) {
							r[s] = function t(n) {
								if (h)
									if (((h = !1), n)) e(n);
									else {
										for (
											var i = new Array(arguments.length - 1), r = 0;
											r < i.length;
										)
											i[r++] = arguments[r];
										u.apply(null, i);
									}
							};
							try {
								n.apply(i || null, r);
							} catch (t) {
								h && ((h = !1), e(t));
							}
						});
					};
				},
				{},
			],
			2: [
				function (t, n, i) {
					i.length = function t(n) {
						var i = n.length;
						if (!i) return 0;
						for (var r = 0; 1 < --i % 4 && "=" === n.charAt(i); ) ++r;
						return Math.ceil(3 * n.length) / 4 - r;
					};
					for (var c = new Array(64), f = new Array(123), r = 0; r < 64; )
						f[
							(c[r] =
								r < 26
									? r + 65
									: r < 52
										? r + 71
										: r < 62
											? r - 4
											: (r - 59) | 43)
						] = r++;
					i.encode = function t(n, i, r) {
						for (var u, e = null, s = [], h = 0, o = 0; i < r; ) {
							var f = n[i++];
							switch (o) {
								case 0:
									(s[h++] = c[f >> 2]), (u = (3 & f) << 4), (o = 1);
									break;
								case 1:
									(s[h++] = c[u | (f >> 4)]), (u = (15 & f) << 2), (o = 2);
									break;
								case 2:
									(s[h++] = c[u | (f >> 6)]), (s[h++] = c[63 & f]), (o = 0);
							}
							8191 < h &&
								((e = e || []).push(String.fromCharCode.apply(String, s)),
								(h = 0));
						}
						return (
							o && ((s[h++] = c[u]), (s[h++] = 61), 1 === o) && (s[h++] = 61),
							e
								? (h &&
										e.push(String.fromCharCode.apply(String, s.slice(0, h))),
									e.join(""))
								: String.fromCharCode.apply(String, s.slice(0, h))
						);
					};
					var a = "invalid encoding";
					(i.decode = function t(n, i, r) {
						for (var u, e = r, s = 0, h = 0; h < n.length; ) {
							var o = n.charCodeAt(h++);
							if (61 === o && 1 < s) break;
							if ((o = f[o]) === undefined) throw Error(a);
							switch (s) {
								case 0:
									(u = o), (s = 1);
									break;
								case 1:
									(i[r++] = (u << 2) | ((48 & o) >> 4)), (u = o), (s = 2);
									break;
								case 2:
									(i[r++] = ((15 & u) << 4) | ((60 & o) >> 2)),
										(u = o),
										(s = 3);
									break;
								case 3:
									(i[r++] = ((3 & u) << 6) | o), (s = 0);
							}
						}
						if (1 === s) throw Error(a);
						return r - e;
					}),
						(i.test = function t(n) {
							return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
								n,
							);
						});
				},
				{},
			],
			3: [
				function (t, n, i) {
					function r() {
						this._listeners = {};
					}
					((n.exports = r).prototype.on = function t(n, i, r) {
						return (
							(this._listeners[n] || (this._listeners[n] = [])).push({
								fn: i,
								ctx: r || this,
							}),
							this
						);
					}),
						(r.prototype.off = function t(n, i) {
							if (n === undefined) this._listeners = {};
							else if (i === undefined) this._listeners[n] = [];
							else
								for (var r = this._listeners[n], u = 0; u < r.length; )
									r[u].fn === i ? r.splice(u, 1) : ++u;
							return this;
						}),
						(r.prototype.emit = function t(n) {
							var i = this._listeners[n];
							if (i) {
								for (var r = [], u = 1; u < arguments.length; )
									r.push(arguments[u++]);
								for (u = 0; u < i.length; ) i[u].fn.apply(i[u++].ctx, r);
							}
							return this;
						});
				},
				{},
			],
			4: [
				function (t, n, i) {
					function r(t) {
						function n(t, n, i, r) {
							var u = n < 0 ? 1 : 0;
							0 === (n = u ? -n : n)
								? t(0 < 1 / n ? 0 : 2147483648, i, r)
								: isNaN(n)
									? t(2143289344, i, r)
									: t(
											34028234663852886e22 < n
												? ((u << 31) | 2139095040) >>> 0
												: n < 11754943508222875e-54
													? ((u << 31) |
															Math.round(n / 1401298464324817e-60)) >>>
														0
													: ((u << 31) |
															(((t = Math.floor(Math.log(n) / Math.LN2)) +
																127) <<
																23) |
															(8388607 &
																Math.round(n * Math.pow(2, -t) * 8388608))) >>>
														0,
											i,
											r,
										);
						}
						function i(t, n, i) {
							(t = t(n, i)),
								(n = 2 * (t >> 31) + 1),
								(i = (t >>> 23) & 255),
								(t &= 8388607);
							return 255 == i
								? t
									? NaN
									: (1 / 0) * n
								: 0 == i
									? 1401298464324817e-60 * n * t
									: n * Math.pow(2, i - 150) * (8388608 + t);
						}
						function r(t, n, i) {
							(h[0] = t),
								(n[i] = o[0]),
								(n[i + 1] = o[1]),
								(n[i + 2] = o[2]),
								(n[i + 3] = o[3]);
						}
						function u(t, n, i) {
							(h[0] = t),
								(n[i] = o[3]),
								(n[i + 1] = o[2]),
								(n[i + 2] = o[1]),
								(n[i + 3] = o[0]);
						}
						function e(t, n) {
							return (
								(o[0] = t[n]),
								(o[1] = t[n + 1]),
								(o[2] = t[n + 2]),
								(o[3] = t[n + 3]),
								h[0]
							);
						}
						function s(t, n) {
							return (
								(o[3] = t[n]),
								(o[2] = t[n + 1]),
								(o[1] = t[n + 2]),
								(o[0] = t[n + 3]),
								h[0]
							);
						}
						var h, o, f, c, a;
						function l(t, n, i, r, u, e) {
							var s,
								h,
								o = r < 0 ? 1 : 0;
							0 === (r = o ? -r : r)
								? (t(0, u, e + n), t(0 < 1 / r ? 0 : 2147483648, u, e + i))
								: isNaN(r)
									? (t(0, u, e + n), t(2146959360, u, e + i))
									: 17976931348623157e292 < r
										? (t(0, u, e + n),
											t(((o << 31) | 2146435072) >>> 0, u, e + i))
										: r < 22250738585072014e-324
											? (t((s = r / 5e-324) >>> 0, u, e + n),
												t(((o << 31) | (s / 4294967296)) >>> 0, u, e + i))
											: (1024 === (h = Math.floor(Math.log(r) / Math.LN2)) &&
													(h = 1023),
												t(
													(4503599627370496 * (s = r * Math.pow(2, -h))) >>> 0,
													u,
													e + n,
												),
												t(
													((o << 31) |
														((h + 1023) << 20) |
														((1048576 * s) & 1048575)) >>>
														0,
													u,
													e + i,
												));
						}
						function d(t, n, i, r, u) {
							(n = t(r, u + n)),
								(t = t(r, u + i)),
								(r = 2 * (t >> 31) + 1),
								(u = (t >>> 20) & 2047),
								(i = 4294967296 * (1048575 & t) + n);
							return 2047 == u
								? i
									? NaN
									: (1 / 0) * r
								: 0 == u
									? 5e-324 * r * i
									: r * Math.pow(2, u - 1075) * (i + 4503599627370496);
						}
						function v(t, n, i) {
							(f[0] = t),
								(n[i] = c[0]),
								(n[i + 1] = c[1]),
								(n[i + 2] = c[2]),
								(n[i + 3] = c[3]),
								(n[i + 4] = c[4]),
								(n[i + 5] = c[5]),
								(n[i + 6] = c[6]),
								(n[i + 7] = c[7]);
						}
						function w(t, n, i) {
							(f[0] = t),
								(n[i] = c[7]),
								(n[i + 1] = c[6]),
								(n[i + 2] = c[5]),
								(n[i + 3] = c[4]),
								(n[i + 4] = c[3]),
								(n[i + 5] = c[2]),
								(n[i + 6] = c[1]),
								(n[i + 7] = c[0]);
						}
						function y(t, n) {
							return (
								(c[0] = t[n]),
								(c[1] = t[n + 1]),
								(c[2] = t[n + 2]),
								(c[3] = t[n + 3]),
								(c[4] = t[n + 4]),
								(c[5] = t[n + 5]),
								(c[6] = t[n + 6]),
								(c[7] = t[n + 7]),
								f[0]
							);
						}
						function b(t, n) {
							return (
								(c[7] = t[n]),
								(c[6] = t[n + 1]),
								(c[5] = t[n + 2]),
								(c[4] = t[n + 3]),
								(c[3] = t[n + 4]),
								(c[2] = t[n + 5]),
								(c[1] = t[n + 6]),
								(c[0] = t[n + 7]),
								f[0]
							);
						}
						return (
							"undefined" != typeof Float32Array
								? ((h = new Float32Array([-0])),
									(o = new Uint8Array(h.buffer)),
									(a = 128 === o[3]),
									(t.writeFloatLE = a ? r : u),
									(t.writeFloatBE = a ? u : r),
									(t.readFloatLE = a ? e : s),
									(t.readFloatBE = a ? s : e))
								: ((t.writeFloatLE = n.bind(null, g)),
									(t.writeFloatBE = n.bind(null, m)),
									(t.readFloatLE = i.bind(null, p)),
									(t.readFloatBE = i.bind(null, A))),
							"undefined" != typeof Float64Array
								? ((f = new Float64Array([-0])),
									(c = new Uint8Array(f.buffer)),
									(a = 128 === c[7]),
									(t.writeDoubleLE = a ? v : w),
									(t.writeDoubleBE = a ? w : v),
									(t.readDoubleLE = a ? y : b),
									(t.readDoubleBE = a ? b : y))
								: ((t.writeDoubleLE = l.bind(null, g, 0, 4)),
									(t.writeDoubleBE = l.bind(null, m, 4, 0)),
									(t.readDoubleLE = d.bind(null, p, 0, 4)),
									(t.readDoubleBE = d.bind(null, A, 4, 0))),
							t
						);
					}
					function g(t, n, i) {
						(n[i] = 255 & t),
							(n[i + 1] = (t >>> 8) & 255),
							(n[i + 2] = (t >>> 16) & 255),
							(n[i + 3] = t >>> 24);
					}
					function m(t, n, i) {
						(n[i] = t >>> 24),
							(n[i + 1] = (t >>> 16) & 255),
							(n[i + 2] = (t >>> 8) & 255),
							(n[i + 3] = 255 & t);
					}
					function p(t, n) {
						return (
							(t[n] | (t[n + 1] << 8) | (t[n + 2] << 16) | (t[n + 3] << 24)) >>>
							0
						);
					}
					function A(t, n) {
						return (
							((t[n] << 24) | (t[n + 1] << 16) | (t[n + 2] << 8) | t[n + 3]) >>>
							0
						);
					}
					n.exports = r(r);
				},
				{},
			],
			5: [
				function (require, module, exports) {
					function inquire(moduleName) {
						try {
							var mod = eval("quire".replace(/^/, "re"))(moduleName);
							if (mod && (mod.length || Object.keys(mod).length)) return mod;
						} catch (e) {}
						return null;
					}
					module.exports = inquire;
				},
				{},
			],
			6: [
				function (t, n, i) {
					n.exports = function t(i, r, n) {
						var u = n || 8192,
							e = u >>> 1,
							s = null,
							h = u;
						return function t(n) {
							if (n < 1 || e < n) return i(n);
							u < h + n && ((s = i(u)), (h = 0));
							n = r.call(s, h, (h += n));
							return 7 & h && (h = 1 + (7 | h)), n;
						};
					};
				},
				{},
			],
			7: [
				function (t, n, i) {
					(i.length = function t(n) {
						for (var i, r = 0, u = 0; u < n.length; ++u)
							(i = n.charCodeAt(u)) < 128
								? (r += 1)
								: i < 2048
									? (r += 2)
									: 55296 == (64512 & i) &&
											56320 == (64512 & n.charCodeAt(u + 1))
										? (++u, (r += 4))
										: (r += 3);
						return r;
					}),
						(i.read = function t(n, i, r) {
							if (r - i < 1) return "";
							for (var u, e = null, s = [], h = 0; i < r; )
								(u = n[i++]) < 128
									? (s[h++] = u)
									: 191 < u && u < 224
										? (s[h++] = ((31 & u) << 6) | (63 & n[i++]))
										: 239 < u && u < 365
											? ((u =
													(((7 & u) << 18) |
														((63 & n[i++]) << 12) |
														((63 & n[i++]) << 6) |
														(63 & n[i++])) -
													65536),
												(s[h++] = 55296 + (u >> 10)),
												(s[h++] = 56320 + (1023 & u)))
											: (s[h++] =
													((15 & u) << 12) |
													((63 & n[i++]) << 6) |
													(63 & n[i++])),
									8191 < h &&
										((e = e || []).push(String.fromCharCode.apply(String, s)),
										(h = 0));
							return e
								? (h &&
										e.push(String.fromCharCode.apply(String, s.slice(0, h))),
									e.join(""))
								: String.fromCharCode.apply(String, s.slice(0, h));
						}),
						(i.write = function t(n, i, r) {
							for (var u, e, s = r, h = 0; h < n.length; ++h)
								(u = n.charCodeAt(h)) < 128
									? (i[r++] = u)
									: (u < 2048
											? (i[r++] = (u >> 6) | 192)
											: (55296 == (64512 & u) &&
												56320 == (64512 & (e = n.charCodeAt(h + 1)))
													? (++h,
														(i[r++] =
															((u = 65536 + ((1023 & u) << 10) + (1023 & e)) >>
																18) |
															240),
														(i[r++] = ((u >> 12) & 63) | 128))
													: (i[r++] = (u >> 12) | 224),
												(i[r++] = ((u >> 6) & 63) | 128)),
										(i[r++] = (63 & u) | 128));
							return r - s;
						});
				},
				{},
			],
			8: [
				function (t, n, i) {
					var r = i;
					function u() {
						r.util._configure(),
							r.Writer._configure(r.BufferWriter),
							r.Reader._configure(r.BufferReader);
					}
					(r.build = "minimal"),
						(r.Writer = t(16)),
						(r.BufferWriter = t(17)),
						(r.Reader = t(9)),
						(r.BufferReader = t(10)),
						(r.util = t(15)),
						(r.rpc = t(12)),
						(r.roots = t(11)),
						(r.configure = u),
						u();
				},
				{ 10: 10, 11: 11, 12: 12, 15: 15, 16: 16, 17: 17, 9: 9 },
			],
			9: [
				function (t, n, i) {
					n.exports = o;
					var r,
						u = t(15),
						e = u.LongBits,
						s = u.utf8;
					function h(t, n) {
						return RangeError(
							"index out of range: " + t.pos + " + " + (n || 1) + " > " + t.len,
						);
					}
					function o(t) {
						(this.buf = t), (this.pos = 0), (this.len = t.length);
					}
					var f =
							"undefined" != typeof Uint8Array
								? function t(n) {
										if (n instanceof Uint8Array || Array.isArray(n))
											return new o(n);
										throw Error("illegal buffer");
									}
								: function t(n) {
										if (Array.isArray(n)) return new o(n);
										throw Error("illegal buffer");
									},
						c = function t() {
							return u.Buffer
								? function t(n) {
										return (o.create = function t(n) {
											return u.Buffer.isBuffer(n) ? new r(n) : f(n);
										})(n);
									}
								: f;
						};
					function a() {
						var t = new e(0, 0),
							n = 0;
						if (!(4 < this.len - this.pos)) {
							for (; n < 3; ++n) {
								if (this.pos >= this.len) throw h(this);
								if (
									((t.lo =
										(t.lo | ((127 & this.buf[this.pos]) << (7 * n))) >>> 0),
									this.buf[this.pos++] < 128)
								)
									return t;
							}
							return (
								(t.lo =
									(t.lo | ((127 & this.buf[this.pos++]) << (7 * n))) >>> 0),
								t
							);
						}
						for (; n < 4; ++n)
							if (
								((t.lo =
									(t.lo | ((127 & this.buf[this.pos]) << (7 * n))) >>> 0),
								this.buf[this.pos++] < 128)
							)
								return t;
						if (
							((t.lo = (t.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
							(t.hi = (t.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
							this.buf[this.pos++] < 128)
						)
							return t;
						if (((n = 0), 4 < this.len - this.pos)) {
							for (; n < 5; ++n)
								if (
									((t.hi =
										(t.hi | ((127 & this.buf[this.pos]) << (7 * n + 3))) >>> 0),
									this.buf[this.pos++] < 128)
								)
									return t;
						} else
							for (; n < 5; ++n) {
								if (this.pos >= this.len) throw h(this);
								if (
									((t.hi =
										(t.hi | ((127 & this.buf[this.pos]) << (7 * n + 3))) >>> 0),
									this.buf[this.pos++] < 128)
								)
									return t;
							}
						throw Error("invalid varint encoding");
					}
					function l(t, n) {
						return (
							(t[n - 4] |
								(t[n - 3] << 8) |
								(t[n - 2] << 16) |
								(t[n - 1] << 24)) >>>
							0
						);
					}
					function d() {
						if (this.pos + 8 > this.len) throw h(this, 8);
						return new e(
							l(this.buf, (this.pos += 4)),
							l(this.buf, (this.pos += 4)),
						);
					}
					(o.create = c()),
						(o.prototype._slice =
							u.Array.prototype.subarray || u.Array.prototype.slice),
						(o.prototype.uint32 = (function t() {
							var n = 4294967295;
							return function t() {
								if (
									((n = (127 & this.buf[this.pos]) >>> 0),
									this.buf[this.pos++] < 128 ||
										((n = (n | ((127 & this.buf[this.pos]) << 7)) >>> 0),
										this.buf[this.pos++] < 128) ||
										((n = (n | ((127 & this.buf[this.pos]) << 14)) >>> 0),
										this.buf[this.pos++] < 128) ||
										((n = (n | ((127 & this.buf[this.pos]) << 21)) >>> 0),
										this.buf[this.pos++] < 128) ||
										((n = (n | ((15 & this.buf[this.pos]) << 28)) >>> 0),
										this.buf[this.pos++] < 128) ||
										!((this.pos += 5) > this.len))
								)
									return n;
								throw ((this.pos = this.len), h(this, 10));
							};
						})()),
						(o.prototype.int32 = function t() {
							return 0 | this.uint32();
						}),
						(o.prototype.sint32 = function t() {
							var n = this.uint32();
							return ((n >>> 1) ^ -(1 & n)) | 0;
						}),
						(o.prototype.bool = function t() {
							return 0 !== this.uint32();
						}),
						(o.prototype.fixed32 = function t() {
							if (this.pos + 4 > this.len) throw h(this, 4);
							return l(this.buf, (this.pos += 4));
						}),
						(o.prototype.sfixed32 = function t() {
							if (this.pos + 4 > this.len) throw h(this, 4);
							return 0 | l(this.buf, (this.pos += 4));
						}),
						(o.prototype.float = function t() {
							if (this.pos + 4 > this.len) throw h(this, 4);
							var n = u.float.readFloatLE(this.buf, this.pos);
							return (this.pos += 4), n;
						}),
						(o.prototype.double = function t() {
							if (this.pos + 8 > this.len) throw h(this, 4);
							var n = u.float.readDoubleLE(this.buf, this.pos);
							return (this.pos += 8), n;
						}),
						(o.prototype.bytes = function t() {
							var n = this.uint32(),
								i = this.pos,
								r = this.pos + n;
							if (r > this.len) throw h(this, n);
							return (
								(this.pos += n),
								Array.isArray(this.buf)
									? this.buf.slice(i, r)
									: i === r
										? new this.buf.constructor(0)
										: this._slice.call(this.buf, i, r)
							);
						}),
						(o.prototype.string = function t() {
							var n = this.bytes();
							return s.read(n, 0, n.length);
						}),
						(o.prototype.skip = function t(n) {
							if ("number" == typeof n) {
								if (this.pos + n > this.len) throw h(this, n);
								this.pos += n;
							} else
								do {
									if (this.pos >= this.len) throw h(this);
								} while (128 & this.buf[this.pos++]);
							return this;
						}),
						(o.prototype.skipType = function (t) {
							switch (t) {
								case 0:
									this.skip();
									break;
								case 1:
									this.skip(8);
									break;
								case 2:
									this.skip(this.uint32());
									break;
								case 3:
									for (; 4 != (t = 7 & this.uint32()); ) this.skipType(t);
									break;
								case 5:
									this.skip(4);
									break;
								default:
									throw Error(
										"invalid wire type " + t + " at offset " + this.pos,
									);
							}
							return this;
						}),
						(o._configure = function (t) {
							(r = t), (o.create = c()), r._configure();
							var n = "toLong";
							u.merge(o.prototype, {
								int64: function t() {
									return a.call(this)[n](!1);
								},
								uint64: function t() {
									return a.call(this)[n](!0);
								},
								sint64: function t() {
									return a.call(this).zzDecode()[n](!1);
								},
								fixed64: function t() {
									return d.call(this)[n](!0);
								},
								sfixed64: function t() {
									return d.call(this)[n](!1);
								},
							});
						});
				},
				{ 15: 15 },
			],
			10: [
				function (t, n, i) {
					n.exports = e;
					var r = t(9),
						u =
							(((e.prototype = Object.create(r.prototype)).constructor = e),
							t(15));
					function e(t) {
						r.call(this, t);
					}
					(e._configure = function () {
						u.Buffer && (e.prototype._slice = u.Buffer.prototype.slice);
					}),
						(e.prototype.string = function t() {
							var n = this.uint32();
							return this.buf.utf8Slice
								? this.buf.utf8Slice(
										this.pos,
										(this.pos = Math.min(this.pos + n, this.len)),
									)
								: this.buf.toString(
										"utf-8",
										this.pos,
										(this.pos = Math.min(this.pos + n, this.len)),
									);
						}),
						e._configure();
				},
				{ 15: 15, 9: 9 },
			],
			11: [
				function (t, n, i) {
					n.exports = {};
				},
				{},
			],
			12: [
				function (t, n, i) {
					i.Service = t(13);
				},
				{ 13: 13 },
			],
			13: [
				function (t, n, i) {
					n.exports = r;
					var h = t(15);
					function r(t, n, i) {
						if ("function" != typeof t)
							throw TypeError("rpcImpl must be a function");
						h.EventEmitter.call(this),
							(this.rpcImpl = t),
							(this.requestDelimited = Boolean(n)),
							(this.responseDelimited = Boolean(i));
					}
					(((r.prototype = Object.create(
						h.EventEmitter.prototype,
					)).constructor = r).prototype.rpcCall = function t(r, n, u, i, e) {
						if (!i) throw TypeError("request must be specified");
						var s = this;
						if (!e) return h.asPromise(t, s, r, n, u, i);
						if (!s.rpcImpl)
							return (
								setTimeout(function () {
									e(Error("already ended"));
								}, 0),
								undefined
							);
						try {
							return s.rpcImpl(
								r,
								n[s.requestDelimited ? "encodeDelimited" : "encode"](
									i,
								).finish(),
								function t(n, i) {
									if (n) return s.emit("error", n, r), e(n);
									if (null === i) return s.end(!0), undefined;
									if (!(i instanceof u))
										try {
											i =
												u[s.responseDelimited ? "decodeDelimited" : "decode"](
													i,
												);
										} catch (n) {
											return s.emit("error", n, r), e(n);
										}
									return s.emit("data", i, r), e(null, i);
								},
							);
						} catch (t) {
							return (
								s.emit("error", t, r),
								setTimeout(function () {
									e(t);
								}, 0),
								undefined
							);
						}
					}),
						(r.prototype.end = function t(n) {
							return (
								this.rpcImpl &&
									(n || this.rpcImpl(null, null, null),
									(this.rpcImpl = null),
									this.emit("end").off()),
								this
							);
						});
				},
				{ 15: 15 },
			],
			14: [
				function (t, n, i) {
					n.exports = u;
					var r = t(15);
					function u(t, n) {
						(this.lo = t >>> 0), (this.hi = n >>> 0);
					}
					var e = (u.zero = new u(0, 0)),
						s =
							((e.toNumber = function () {
								return 0;
							}),
							(e.zzEncode = e.zzDecode =
								function () {
									return this;
								}),
							(e.length = function () {
								return 1;
							}),
							(u.zeroHash = "\0\0\0\0\0\0\0\0"),
							(u.fromNumber = function t(n) {
								var i, r;
								return 0 === n
									? e
									: ((r = (n = (i = n < 0) ? -n : n) >>> 0),
										(n = ((n - r) / 4294967296) >>> 0),
										i &&
											((n = ~n >>> 0), (r = ~r >>> 0), 4294967295 < ++r) &&
											((r = 0), 4294967295 < ++n) &&
											(n = 0),
										new u(r, n));
							}),
							(u.from = function t(n) {
								if ("number" == typeof n) return u.fromNumber(n);
								if (r.isString(n)) {
									if (!r.Long) return u.fromNumber(parseInt(n, 10));
									n = r.Long.fromString(n);
								}
								return n.low || n.high ? new u(n.low >>> 0, n.high >>> 0) : e;
							}),
							(u.prototype.toNumber = function t(n) {
								var i;
								return !n && this.hi >>> 31
									? ((n = (1 + ~this.lo) >>> 0),
										(i = ~this.hi >>> 0),
										-(n + 4294967296 * (i = n ? i : (i + 1) >>> 0)))
									: this.lo + 4294967296 * this.hi;
							}),
							(u.prototype.toLong = function t(n) {
								return r.Long
									? new r.Long(0 | this.lo, 0 | this.hi, Boolean(n))
									: {
											low: 0 | this.lo,
											high: 0 | this.hi,
											unsigned: Boolean(n),
										};
							}),
							String.prototype.charCodeAt);
					(u.fromHash = function t(n) {
						return "\0\0\0\0\0\0\0\0" === n
							? e
							: new u(
									(s.call(n, 0) |
										(s.call(n, 1) << 8) |
										(s.call(n, 2) << 16) |
										(s.call(n, 3) << 24)) >>>
										0,
									(s.call(n, 4) |
										(s.call(n, 5) << 8) |
										(s.call(n, 6) << 16) |
										(s.call(n, 7) << 24)) >>>
										0,
								);
					}),
						(u.prototype.toHash = function t() {
							return String.fromCharCode(
								255 & this.lo,
								(this.lo >>> 8) & 255,
								(this.lo >>> 16) & 255,
								this.lo >>> 24,
								255 & this.hi,
								(this.hi >>> 8) & 255,
								(this.hi >>> 16) & 255,
								this.hi >>> 24,
							);
						}),
						(u.prototype.zzEncode = function t() {
							var n = this.hi >> 31;
							return (
								(this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ n) >>> 0),
								(this.lo = ((this.lo << 1) ^ n) >>> 0),
								this
							);
						}),
						(u.prototype.zzDecode = function t() {
							var n = -(1 & this.lo);
							return (
								(this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ n) >>> 0),
								(this.hi = ((this.hi >>> 1) ^ n) >>> 0),
								this
							);
						}),
						(u.prototype.length = function t() {
							var n = this.lo,
								i = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
								r = this.hi >>> 24;
							return 0 == r
								? 0 == i
									? n < 16384
										? n < 128
											? 1
											: 2
										: n < 2097152
											? 3
											: 4
									: i < 16384
										? i < 128
											? 5
											: 6
										: i < 2097152
											? 7
											: 8
								: r < 128
									? 9
									: 10;
						});
				},
				{ 15: 15 },
			],
			15: [
				function (t, n, i) {
					var u = i;
					function r(t, n, i) {
						for (var r = Object.keys(n), u = 0; u < r.length; ++u)
							(t[r[u]] !== undefined && i) || (t[r[u]] = n[r[u]]);
						return t;
					}
					function e(t) {
						function i(t, n) {
							if (!(this instanceof i)) return new i(t, n);
							Object.defineProperty(this, "message", {
								get: function () {
									return t;
								},
							}),
								Error.captureStackTrace
									? Error.captureStackTrace(this, i)
									: Object.defineProperty(this, "stack", {
											value: new Error().stack || "",
										}),
								n && r(this, n);
						}
						return (
							((i.prototype = Object.create(Error.prototype)).constructor = i),
							Object.defineProperty(i.prototype, "name", {
								get: function () {
									return t;
								},
							}),
							(i.prototype.toString = function t() {
								return this.name + ": " + this.message;
							}),
							i
						);
					}
					(u.asPromise = t(1)),
						(u.base64 = t(2)),
						(u.EventEmitter = t(3)),
						(u.float = t(4)),
						(u.inquire = t(5)),
						(u.utf8 = t(7)),
						(u.pool = t(6)),
						(u.LongBits = t(14)),
						(u.isNode = Boolean(
							"undefined" != typeof global &&
								global &&
								global.process &&
								global.process.versions &&
								global.process.versions.node,
						)),
						(u.global =
							(u.isNode && global) ||
							("undefined" != typeof window && window) ||
							("undefined" != typeof self && self) ||
							this),
						(u.emptyArray = Object.freeze ? Object.freeze([]) : []),
						(u.emptyObject = Object.freeze ? Object.freeze({}) : {}),
						(u.isInteger =
							Number.isInteger ||
							function t(n) {
								return (
									"number" == typeof n && isFinite(n) && Math.floor(n) === n
								);
							}),
						(u.isString = function t(n) {
							return "string" == typeof n || n instanceof String;
						}),
						(u.isObject = function t(n) {
							return n && "object" == typeof n;
						}),
						(u.isset = u.isSet =
							function t(n, i) {
								var r = n[i];
								return (
									!(null == r || !n.hasOwnProperty(i)) &&
									("object" != typeof r ||
										0 < (Array.isArray(r) ? r : Object.keys(r)).length)
								);
							}),
						(u.Buffer = (function () {
							try {
								var t = u.inquire("buffer").Buffer;
								return t.prototype.utf8Write ? t : null;
							} catch (t) {
								return null;
							}
						})()),
						(u._Buffer_from = null),
						(u._Buffer_allocUnsafe = null),
						(u.newBuffer = function t(n) {
							return "number" == typeof n
								? u.Buffer
									? u._Buffer_allocUnsafe(n)
									: new u.Array(n)
								: u.Buffer
									? u._Buffer_from(n)
									: "undefined" == typeof Uint8Array
										? n
										: new Uint8Array(n);
						}),
						(u.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array),
						(u.Long = Long),
						(u.key2Re = /^true|false|0|1$/),
						(u.key32Re = /^-?(?:0|[1-9][0-9]*)$/),
						(u.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/),
						(u.longToHash = function t(n) {
							return n ? u.LongBits.from(n).toHash() : u.LongBits.zeroHash;
						}),
						(u.longFromHash = function t(n, i) {
							n = u.LongBits.fromHash(n);
							return u.Long
								? u.Long.fromBits(n.lo, n.hi, i)
								: n.toNumber(Boolean(i));
						}),
						(u.merge = r),
						(u.lcFirst = function t(n) {
							return n.charAt(0).toLowerCase() + n.substring(1);
						}),
						(u.newError = e),
						(u.ProtocolError = e("ProtocolError")),
						(u.oneOfGetter = function t(n) {
							for (var i = {}, r = 0; r < n.length; ++r) i[n[r]] = 1;
							return function () {
								for (var t = Object.keys(this), n = t.length - 1; -1 < n; --n)
									if (1 === i[t[n]] && this[t[n]] !== undefined) return t[n];
							};
						}),
						(u.oneOfSetter = function t(i) {
							return function (t) {
								for (var n = 0; n < i.length; ++n)
									i[n] !== t && (this[i[n]] = undefined);
							};
						}),
						(u.toJSONOptions = {
							longs: String,
							enums: String,
							bytes: String,
							json: !0,
						}),
						(u._configure = function () {
							var r = u.Buffer;
							r
								? ((u._Buffer_from =
										(r.from !== Uint8Array.from && r.from) ||
										function t(n, i) {
											return new r(n, i);
										}),
									(u._Buffer_allocUnsafe =
										r.allocUnsafe ||
										function t(n) {
											return new r(n);
										}))
								: (u._Buffer_from = u._Buffer_allocUnsafe = null);
						});
				},
				{ 1: 1, 14: 14, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 },
			],
			16: [
				function (t, n, i) {
					n.exports = a;
					var r,
						u = t(15),
						e = u.LongBits,
						s = u.base64,
						h = u.utf8;
					function o(t, n, i) {
						(this.fn = t),
							(this.len = n),
							(this.next = undefined),
							(this.val = i);
					}
					function f() {}
					function c(t) {
						(this.head = t.head),
							(this.tail = t.tail),
							(this.len = t.len),
							(this.next = t.states);
					}
					function a() {
						(this.len = 0),
							(this.head = new o(f, 0, 0)),
							(this.tail = this.head),
							(this.states = null);
					}
					var l = function t() {
						return u.Buffer
							? function t() {
									return (a.create = function t() {
										return new r();
									})();
								}
							: function t() {
									return new a();
								};
					};
					function d(t, n, i) {
						n[i] = 255 & t;
					}
					function v(t, n) {
						(this.len = t), (this.next = undefined), (this.val = n);
					}
					function w(t, n, i) {
						for (; t.hi; )
							(n[i++] = (127 & t.lo) | 128),
								(t.lo = ((t.lo >>> 7) | (t.hi << 25)) >>> 0),
								(t.hi >>>= 7);
						for (; 127 < t.lo; )
							(n[i++] = (127 & t.lo) | 128), (t.lo = t.lo >>> 7);
						n[i++] = t.lo;
					}
					function y(t, n, i) {
						(n[i] = 255 & t),
							(n[i + 1] = (t >>> 8) & 255),
							(n[i + 2] = (t >>> 16) & 255),
							(n[i + 3] = t >>> 24);
					}
					(a.create = l()),
						(a.alloc = function t(n) {
							return new u.Array(n);
						}),
						u.Array !== Array &&
							(a.alloc = u.pool(a.alloc, u.Array.prototype.subarray)),
						(a.prototype._push = function t(n, i, r) {
							return (
								(this.tail = this.tail.next = new o(n, i, r)),
								(this.len += i),
								this
							);
						}),
						((v.prototype = Object.create(o.prototype)).fn = function t(
							n,
							i,
							r,
						) {
							for (; 127 < n; ) (i[r++] = (127 & n) | 128), (n >>>= 7);
							i[r] = n;
						}),
						(a.prototype.uint32 = function t(n) {
							return (
								(this.len += (this.tail = this.tail.next =
									new v(
										(n >>>= 0) < 128
											? 1
											: n < 16384
												? 2
												: n < 2097152
													? 3
													: n < 268435456
														? 4
														: 5,
										n,
									)).len),
								this
							);
						}),
						(a.prototype.int32 = function t(n) {
							return n < 0
								? this._push(w, 10, e.fromNumber(n))
								: this.uint32(n);
						}),
						(a.prototype.sint32 = function t(n) {
							return this.uint32(((n << 1) ^ (n >> 31)) >>> 0);
						}),
						(a.prototype.int64 = a.prototype.uint64 =
							function t(n) {
								n = e.from(n);
								return this._push(w, n.length(), n);
							}),
						(a.prototype.sint64 = function t(n) {
							n = e.from(n).zzEncode();
							return this._push(w, n.length(), n);
						}),
						(a.prototype.bool = function t(n) {
							return this._push(d, 1, n ? 1 : 0);
						}),
						(a.prototype.sfixed32 = a.prototype.fixed32 =
							function t(n) {
								return this._push(y, 4, n >>> 0);
							}),
						(a.prototype.sfixed64 = a.prototype.fixed64 =
							function t(n) {
								n = e.from(n);
								return this._push(y, 4, n.lo)._push(y, 4, n.hi);
							}),
						(a.prototype.float = function t(n) {
							return this._push(u.float.writeFloatLE, 4, n);
						}),
						(a.prototype.double = function t(n) {
							return this._push(u.float.writeDoubleLE, 8, n);
						});
					var b = u.Array.prototype.set
						? function t(n, i, r) {
								i.set(n, r);
							}
						: function t(n, i, r) {
								for (var u = 0; u < n.length; ++u) i[r + u] = n[u];
							};
					(a.prototype.bytes = function t(n) {
						var i,
							r = n.length >>> 0;
						return r
							? (u.isString(n) &&
									((i = a.alloc((r = s.length(n)))),
									s.decode(n, i, 0),
									(n = i)),
								this.uint32(r)._push(b, r, n))
							: this._push(d, 1, 0);
					}),
						(a.prototype.string = function t(n) {
							var i = h.length(n);
							return i
								? this.uint32(i)._push(h.write, i, n)
								: this._push(d, 1, 0);
						}),
						(a.prototype.fork = function t() {
							return (
								(this.states = new c(this)),
								(this.head = this.tail = new o(f, 0, 0)),
								(this.len = 0),
								this
							);
						}),
						(a.prototype.reset = function t() {
							return (
								this.states
									? ((this.head = this.states.head),
										(this.tail = this.states.tail),
										(this.len = this.states.len),
										(this.states = this.states.next))
									: ((this.head = this.tail = new o(f, 0, 0)), (this.len = 0)),
								this
							);
						}),
						(a.prototype.ldelim = function t() {
							var n = this.head,
								i = this.tail,
								r = this.len;
							return (
								this.reset().uint32(r),
								r &&
									((this.tail.next = n.next), (this.tail = i), (this.len += r)),
								this
							);
						}),
						(a.prototype.finish = function t() {
							for (
								var n = this.head.next,
									i = this.constructor.alloc(this.len),
									r = 0;
								n;
							)
								n.fn(n.val, i, r), (r += n.len), (n = n.next);
							return i;
						}),
						(a._configure = function (t) {
							(r = t), (a.create = l()), r._configure();
						});
				},
				{ 15: 15 },
			],
			17: [
				function (t, n, i) {
					n.exports = e;
					var r = t(16),
						u =
							(((e.prototype = Object.create(r.prototype)).constructor = e),
							t(15));
					function e() {
						r.call(this);
					}
					function s(t, n, i) {
						t.length < 40
							? u.utf8.write(t, n, i)
							: n.utf8Write
								? n.utf8Write(t, i)
								: n.write(t, i);
					}
					(e._configure = function () {
						(e.alloc = u._Buffer_allocUnsafe),
							(e.writeBytesBuffer =
								u.Buffer &&
								u.Buffer.prototype instanceof Uint8Array &&
								"set" === u.Buffer.prototype.set.name
									? function t(n, i, r) {
											i.set(n, r);
										}
									: function t(n, i, r) {
											if (n.copy) n.copy(i, r, 0, n.length);
											else for (var u = 0; u < n.length; ) i[r++] = n[u++];
										});
					}),
						(e.prototype.bytes = function t(n) {
							var i =
								(n = u.isString(n) ? u._Buffer_from(n, "base64") : n).length >>>
								0;
							return (
								this.uint32(i), i && this._push(e.writeBytesBuffer, i, n), this
							);
						}),
						(e.prototype.string = function t(n) {
							var i = u.Buffer.byteLength(n);
							return this.uint32(i), i && this._push(s, i, n), this;
						}),
						e._configure();
				},
				{ 15: 15, 16: 16 },
			],
		},
		{},
		[8],
	);
})();
//# sourceMappingURL=protobuf.js.map
