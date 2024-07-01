"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffItemData = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	TimeUtil_1 = require("../../Common/TimeUtil");
class BuffItemData {
	constructor(t, e, i) {
		(this.Igt = 0),
			(this.Tgt = 0),
			(this.Lgt = 0),
			(this.Dgt = t),
			(this.Rgt = i),
			this.SetEndCdTimeStamp(e);
	}
	get ItemConfigId() {
		return this.Dgt;
	}
	get EndCdTimeStamp() {
		return this.Igt;
	}
	SetEndCdTimeStamp(t) {
		(this.Igt = t / TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.Tgt = TimeUtil_1.TimeUtil.GetServerTime()),
			(this.Lgt = Time_1.Time.WorldTimeSeconds);
	}
	SetTotalCdTime(t) {
		this.Rgt = t;
	}
	GetBuffItemRemainCdTime() {
		var t = this.Igt - (Time_1.Time.WorldTimeSeconds - this.Lgt + this.Tgt);
		return Math.max(t, 0);
	}
	GetBuffItemTotalCdTime() {
		return this.Rgt;
	}
}
exports.BuffItemData = BuffItemData;
