"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendData =
		exports.RecentlyTeamData =
		exports.FriendApplyData =
		exports.FriendBlackListData =
			void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class FriendBlackListData {
	constructor() {
		this.jVt = void 0;
	}
	InitializeFriendBlackListData(t) {
		(this.jVt = new FriendData()), this.jVt.SetPlayerBasicInfo(t);
	}
	get GetBlockedPlayerData() {
		return this.jVt;
	}
	set GetBlockedPlayerData(t) {
		this.jVt = t;
	}
}
exports.FriendBlackListData = FriendBlackListData;
class FriendApplyData {
	constructor() {
		(this.jVt = void 0), (this.WVt = -0), (this.Fresh = !0);
	}
	InitializeFriendApply(t) {
		(this.jVt = new FriendData()),
			this.jVt.SetPlayerBasicInfo(t.a5n),
			(this.WVt = Number(MathUtils_1.MathUtils.LongToBigInt(t.sRs)));
	}
	get ApplyCreatedTime() {
		return this.WVt;
	}
	set ApplyCreatedTime(t) {
		this.WVt = t;
	}
	get ApplyPlayerData() {
		return this.jVt;
	}
	set ApplyPlayerData(t) {
		this.jVt = t;
	}
}
exports.FriendApplyData = FriendApplyData;
class RecentlyTeamData {
	constructor() {
		(this.PlayerData = new FriendData()), (this.TeamTime = -0);
	}
	InitData(t) {
		this.PlayerData.SetPlayerBasicInfo(t.a5n),
			(this.TeamTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.uRs)));
	}
	GetOfflineDay() {
		var t = this.TeamTime;
		return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, !1);
	}
}
exports.RecentlyTeamData = RecentlyTeamData;
class FriendData {
	constructor() {
		(this.xe = 0),
			(this.he = ""),
			(this.B8 = 0),
			(this.KVt = 0),
			(this.QVt = 0),
			(this.XVt = !1),
			(this.$Vt = 0),
			(this.YVt = void 0),
			(this.Debug = !1),
			(this.WorldLevel = 0),
			(this.TeamMemberCount = 0),
			(this.Signature = ""),
			(this.CurCard = 0),
			(this.RoleShowList = []),
			(this.CardShowList = []),
			(this.Birthday = 0),
			(this.IsBirthdayDisplay = !1),
			(this.CardUnlockList = []);
	}
	SetFriendDataAttribute(t) {
		this.SetPlayerBasicInfo(t.a5n),
			(this.YVt = t.h5n),
			this.YVt ||
				((t = ModelManager_1.ModelManager.FriendModel.GetFriendById(t.a5n.aFn)),
				(this.YVt = t?.YVt));
	}
	SetPlayerBasicInfo(t) {
		(this.xe = t.aFn),
			(this.he = t.e4n),
			(this.B8 = t.r3n),
			(this.KVt = t.$gs),
			(this.QVt = t.Hgs),
			(this.XVt = t.jgs),
			(this.$Vt = Number(MathUtils_1.MathUtils.LongToBigInt(t.Kgs))),
			this.YVt ||
				((e = ModelManager_1.ModelManager.FriendModel.GetFriendById(t.aFn)),
				(this.YVt = e?.YVt)),
			(this.WorldLevel = t.Vgs),
			(this.TeamMemberCount = t.Qgs),
			(this.Signature = t.l5n),
			(this.CurCard = t.zgs),
			0 === this.CurCard &&
				(this.CurCard =
					ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId()),
			(this.RoleShowList = []);
		var e,
			a = t.Ygs.length;
		for (let e = 0; e < a; e++) {
			var i = t.Ygs[e];
			this.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(i.l3n, i.r3n));
		}
		(this.CardShowList = t.Jgs),
			(this.CardUnlockList = []),
			t.Jgs.forEach((t) => {
				this.CardUnlockList.push(new PersonalDefine_1.CardShowEntry(t, !0));
			}),
			(this.Birthday = t._5n),
			(this.IsBirthdayDisplay = t.Zgs);
	}
	get PlayerId() {
		return this.xe;
	}
	set PlayerId(t) {
		this.xe = t;
	}
	get PlayerName() {
		return this.he;
	}
	set PlayerName(t) {
		this.he = t;
	}
	get PlayerLevel() {
		return this.B8;
	}
	set PlayerLevel(t) {
		this.B8 = t;
	}
	get PlayerHeadPhoto() {
		return this.KVt;
	}
	get PlayerHeadFrame() {
		return this.QVt;
	}
	get PlayerIsOnline() {
		return this.XVt;
	}
	set PlayerIsOnline(t) {
		this.XVt = t;
	}
	get PlayerLastOfflineTime() {
		return this.$Vt;
	}
	set PlayerLastOfflineTime(t) {
		this.$Vt = t;
	}
	GetOfflineDay() {
		var t = this.PlayerLastOfflineTime;
		return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, !1);
	}
	get FriendRemark() {
		return this.YVt;
	}
	set FriendRemark(t) {
		this.YVt = t;
	}
}
exports.FriendData = FriendData;
