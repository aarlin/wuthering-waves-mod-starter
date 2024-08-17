"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialBarEffectPercentInfoLang = void 0);
class SpecialBarEffectPercentInfoLang {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MinPercent() {
		return this.minpercent();
	}
	get MaxPercent() {
		return this.maxpercent();
	}
	get MinValue() {
		return this.minvalue();
	}
	get MaxValue() {
		return this.maxvalue();
	}
	get FloatParameterName() {
		return this.floatparametername();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSpecialBarEffectPercentInfoLang(t, e) {
		return (e || new SpecialBarEffectPercentInfoLang()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	minpercent() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxpercent() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	minvalue() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	maxvalue() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	floatparametername() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SpecialBarEffectPercentInfoLang = SpecialBarEffectPercentInfoLang;
//# sourceMappingURL=SpecialBarEffectPercentInfoLang.js.map
