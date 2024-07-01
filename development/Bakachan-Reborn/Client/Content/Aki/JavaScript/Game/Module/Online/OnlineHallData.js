"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldTeamRoleInfo =
		exports.WorldTeamPlayerFightInfo =
		exports.OnlineTeamData =
		exports.OnlineApplyData =
		exports.OnlineHallData =
			void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class OnlineHallData {
	constructor(e) {
		(this.CardUnlockList = []), (this.Oqi = 0);
		for (const t of (this.kqi = e).Jgs)
			this.CardUnlockList.push(new PersonalDefine_1.CardShowEntry(t, !0));
	}
	SetApplyTime(e) {
		e <= 0 || (this.Oqi = e);
	}
	get ApplyTimeLeftTime() {
		return this.Oqi - TimeUtil_1.TimeUtil.GetServerTime();
	}
	get PlayerId() {
		return this.kqi.aFn;
	}
	get HeadId() {
		return this.kqi.$gs;
	}
	get Level() {
		return this.kqi.r3n;
	}
	get PlayerCount() {
		return this.kqi.Qgs;
	}
	get WorldLevel() {
		return this.kqi.Vgs;
	}
	get Name() {
		return this.kqi.e4n;
	}
	get PlayerName() {
		return this.kqi.e4n;
	}
	get Signature() {
		return this.kqi.l5n;
	}
	get PlayerCard() {
		return this.kqi.zgs;
	}
	get PlayerDetails() {
		return this.kqi;
	}
}
exports.OnlineHallData = OnlineHallData;
class OnlineApplyData {
	constructor(e, t, i, r, s) {
		(this.Fqi = e),
			(this.Vqi = t),
			(this.Oqi = i),
			(this.Hqi = r),
			(this.jqi = s);
	}
	get ApplyTimeLeftTime() {
		return (
			Number(MathUtils_1.MathUtils.LongToBigInt(this.Oqi)) -
			TimeUtil_1.TimeUtil.GetServerTime()
		);
	}
	get PlayerId() {
		return this.Vqi;
	}
	get RefuseTimestamp() {
		return this.Oqi;
	}
	get Level() {
		return this.jqi;
	}
	get Name() {
		return this.Fqi;
	}
	get HeadId() {
		return this.Hqi;
	}
}
exports.OnlineApplyData = OnlineApplyData;
class OnlineTeamData {
	constructor(e, t, i, r, s, l, n, o) {
		(this.CardUnlockList = []),
			(this.Wqi = 0),
			(this.Fqi = e),
			(this.Vqi = t),
			(this.jqi = i),
			(this.Hqi = r),
			(this.Kqi = s),
			(this.PlayerNumber = l),
			(this.kqi = n),
			(this.Qqi = Protocol_1.Aki.Protocol.oFs.Proto_GREAT);
		for (const e of n.Jgs)
			this.CardUnlockList.push(new PersonalDefine_1.CardShowEntry(e, !0));
	}
	get PlayerId() {
		return this.Vqi;
	}
	get HeadId() {
		return this.Hqi;
	}
	set HeadId(e) {
		this.Hqi = e;
	}
	get Level() {
		return this.jqi;
	}
	set Level(e) {
		this.jqi = e;
	}
	get Name() {
		return this.Fqi;
	}
	set Name(e) {
		this.Fqi = e;
	}
	get PlayerName() {
		return this.Fqi;
	}
	get Signature() {
		return this.Kqi;
	}
	set Signature(e) {
		this.Kqi = e;
	}
	get PlayerNumber() {
		return this.Wqi;
	}
	set PlayerNumber(e) {
		this.Wqi = e;
	}
	get IsSelf() {
		return (
			this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
		);
	}
	get PingState() {
		return this.Qqi;
	}
	set PingState(e) {
		this.Qqi = e;
	}
	get PlayerDetails() {
		return this.kqi;
	}
	set PlayerDetails(e) {
		this.kqi = e;
	}
}
exports.OnlineTeamData = OnlineTeamData;
class WorldTeamPlayerFightInfo {
	constructor(e, t, i, r) {
		(this.Fqi = e), (this.Vqi = t), (this.Xqi = r), (this.$qi = i);
	}
	get PlayerId() {
		return this.Vqi;
	}
	get CurRoleId() {
		return this.$qi;
	}
	set CurRoleId(e) {
		this.$qi = e;
	}
	get RoleInfos() {
		return this.Xqi;
	}
	set RoleInfos(e) {
		this.Xqi = e;
	}
	GetRoleInfoByConfigId(e) {
		for (const t of this.Xqi) if (t.RoleId === e) return t;
	}
	get Name() {
		return this.Fqi;
	}
	set Name(e) {
		this.Fqi = e;
	}
	get IsSelf() {
		return (
			this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
		);
	}
	GetIsDiffRoleList(e) {
		if (e.length !== this.Xqi.length) return !0;
		for (const t of e) {
			let e = !1;
			for (const i of this.Xqi) t.l3n === i.RoleId && (e = !0);
			if (!e) return !0;
		}
		return !1;
	}
	GetRoleLength() {
		return this.Xqi.length;
	}
}
exports.WorldTeamPlayerFightInfo = WorldTeamPlayerFightInfo;
class WorldTeamRoleInfo {
	constructor(e, t) {
		(this.Yqi = 0),
			(this.RoleCurHp = 1),
			(this.RoleMaxHp = 1),
			(this.Jqi = e),
			(this.zqi = t);
	}
	get RoleId() {
		return this.Jqi;
	}
	set RoleId(e) {
		this.Jqi = e;
	}
	get RoleLevel() {
		return this.zqi;
	}
	set RoleLevel(e) {
		this.zqi = e;
	}
	get RoleIndex() {
		return this.Yqi;
	}
	set RoleIndex(e) {
		this.Yqi = e;
	}
}
exports.WorldTeamRoleInfo = WorldTeamRoleInfo;
