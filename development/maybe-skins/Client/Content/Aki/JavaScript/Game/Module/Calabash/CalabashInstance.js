"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashInstance = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CalabashInstance {
	constructor() {
		(this.w0t = 0),
			(this.UQ = 10),
			(this.B0t = 0),
			(this.b0t = 0),
			(this.q0t = new Map()),
			(this.G0t = new Map()),
			(this.N0t = new Set());
	}
	SetBaseInfo(t) {
		(this.CalabashCurrentLevel = t.r3n),
			(this.CalabashCurrentExp = t.k3n),
			(this.CalabashMaxLevel =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashMaxLevel()),
			(this.IdentifyGuaranteeCount = t.WSs),
			this.SetUnlockCalabashDevelopRewards(t.jSs);
	}
	SetConfigInfo(t) {
		for (const a of Object.keys(t.XSs)) {
			var e = Number.parseInt(a);
			this.q0t.set(e, t.XSs[a]);
		}
	}
	set CalabashCurrentLevel(t) {
		this.w0t = t;
	}
	get CalabashCurrentLevel() {
		return this.w0t;
	}
	set CalabashMaxLevel(t) {
		this.UQ = t;
	}
	get CalabashMaxLevel() {
		return this.UQ;
	}
	set CalabashCurrentExp(t) {
		this.B0t = t;
	}
	get CalabashCurrentExp() {
		return this.B0t;
	}
	set IdentifyGuaranteeCount(t) {
		this.b0t = t;
	}
	get IdentifyGuaranteeCount() {
		return this.b0t;
	}
	SetUnlockCalabashDevelopRewards(t) {
		this.G0t.clear();
		for (const e of t.values()) this.G0t.set(e.iMs, e.$Ss);
	}
	SetUnlockCalabashDevelopReward(t) {
		this.G0t.set(t.iMs, t.$Ss);
	}
	GetUnlockCalabashDevelopRewards() {
		return this.G0t;
	}
	SetRewardedLevelsSet(t) {
		this.N0t.clear();
		for (const e of t) this.N0t.add(e);
	}
	IsRewardedByLevel(t) {
		return this.N0t.has(t);
	}
	GetCatchGainByLevel(t) {
		return this.q0t.get(t);
	}
}
exports.CalabashInstance = CalabashInstance;
