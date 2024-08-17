"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProtoGachaInfo = exports.ProtoGachaPoolInfo = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class ProtoGachaPoolInfo {
	constructor(t) {
		(this.Id = 0),
			(this.BeginTime = 0),
			(this.EndTime = 0),
			(this.Sort = 0),
			(this.UrlList = void 0),
			(this.Id = t.Ekn),
			(this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.HCs)),
			(this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.jCs)),
			(this.UrlList = t.pRs),
			(t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(
				this.Id,
			)) && (this.Sort = t.Sort);
	}
}
exports.ProtoGachaPoolInfo = ProtoGachaPoolInfo;
class ProtoGachaInfo {
	constructor(t) {
		(this.Id = 0),
			(this.TodayTimes = 0),
			(this.TotalTimes = 0),
			(this.ItemId = 0),
			(this.GachaConsumes = void 0),
			(this.UsePoolId = 0),
			(this.bWt = []),
			(this.BeginTime = 0),
			(this.EndTime = 0),
			(this.DailyLimitTimes = 0),
			(this.TotalLimitTimes = 0),
			(this.ResourcesId = ""),
			(this.GroupId = 0),
			(this.Sort = 0),
			(this.Id = t.Ekn),
			(this.TodayTimes = t.S5n),
			(this.TotalTimes = t.E5n),
			(this.ItemId = t.G3n),
			(this.GachaConsumes = t.MRs),
			(this.UsePoolId = t.SRs);
		var o = t.ERs;
		if (o) for (const t of o) this.bWt.push(new ProtoGachaPoolInfo(t));
		(this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.HCs)),
			(this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.jCs)),
			(this.DailyLimitTimes = t.yRs),
			(this.TotalLimitTimes = t.IRs),
			(this.ResourcesId = t.TRs),
			(o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaConfig(this.Id)) &&
				((this.Sort = o.Sort), (this.GroupId = o.RuleGroupId));
	}
	GetFirstValidPool() {
		if (this.bWt && 0 < this.bWt.length)
			for (const t of this.bWt) if (this.IsPoolValid(t)) return t;
	}
	GetPoolInfo(t) {
		let o;
		for (const i of this.bWt) i.Id === t && (o = i);
		return o;
	}
	GetPoolEndTimeByPoolId(t) {
		return (t = this.GetPoolInfo(t)), this.GetPoolEndTimeByPoolInfo(t);
	}
	GetPoolEndTimeByPoolInfo(t) {
		var o = this.EndTime;
		return !t || 0 === (t = t.EndTime) || (0 !== o && o < t) ? o : t;
	}
	GetValidPoolList() {
		var t = this.bWt;
		if (t) {
			var o = [];
			for (const i of t) this.IsPoolValid(i) && o.push(i);
			return o;
		}
	}
	IsPoolValid(t) {
		return (
			0 === (t = this.GetPoolEndTimeByPoolInfo(t)) ||
			t >= TimeUtil_1.TimeUtil.GetServerTime()
		);
	}
}
exports.ProtoGachaInfo = ProtoGachaInfo;
