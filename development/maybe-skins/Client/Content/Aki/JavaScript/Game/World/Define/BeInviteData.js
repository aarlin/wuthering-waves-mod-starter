"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BeInviteData = void 0);
class BeInviteData {
	constructor() {
		(this.j8 = 0),
			(this.he = ""),
			(this.zz = ""),
			(this.Ssi = 0),
			(this.zfr = ""),
			(this.Zfr = void 0);
	}
	SetPlayerId(t) {
		this.j8 = t;
	}
	GetPlayerId() {
		return this.j8;
	}
	SetName(t) {
		this.he = t;
	}
	GetName() {
		return this.he;
	}
	SetContent(t) {
		this.zz = t;
	}
	GetContent() {
		return this.zz;
	}
	SetLimitTimestamp(t) {
		this.Ssi = t;
	}
	GetLimitTimestamp() {
		return this.Ssi;
	}
	SetToken(t) {
		this.zfr = t;
	}
	GetToken() {
		return this.zfr;
	}
	SetGameplayTagHash(t) {
		this.Zfr = t;
	}
	GetGameplayTagHash() {
		return this.Zfr;
	}
}
exports.BeInviteData = BeInviteData;
