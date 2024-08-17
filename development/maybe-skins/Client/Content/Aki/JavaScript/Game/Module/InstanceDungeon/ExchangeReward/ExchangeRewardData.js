"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangeShareData = exports.ExchangeRewardData = void 0);
class ExchangeRewardData {
	constructor() {
		(this.xe = 0), (this.t6 = 0);
	}
	GetId() {
		return this.xe;
	}
	GetCount() {
		return this.t6;
	}
	Phrase(t, e) {
		(this.xe = t), (this.t6 = e);
	}
}
exports.ExchangeRewardData = ExchangeRewardData;
class ExchangeShareData {
	constructor() {
		(this.xe = 0), (this.t6 = 0);
	}
	GetId() {
		return this.xe;
	}
	GetCount() {
		return this.t6;
	}
	Phrase(t, e) {
		(this.xe = t), (this.t6 = e);
	}
}
exports.ExchangeShareData = ExchangeShareData;
