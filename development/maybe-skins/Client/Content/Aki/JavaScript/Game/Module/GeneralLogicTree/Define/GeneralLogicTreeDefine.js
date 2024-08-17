"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaShowInfo =
		exports.TreeTrackTextExpressionInfo =
		exports.checkSubTitleSame =
		exports.checkMainTitleSame =
		exports.NodeStatusChangeInfo =
		exports.BtCustomUiConfig =
		exports.btChildQuestNodeStatusLogString =
		exports.btNodeStatusLogString =
		exports.btTypeLogString =
		exports.NodeInfo =
		exports.NPCFARAWAY_TIMERTYPE =
		exports.OUTRANGEFAILED_TIMERTYPE =
		exports.CHALLENGELEVELPLAY_TRACKICONID =
		exports.COMMONLEVELPLAY_TRACKICONID =
		exports.INVALID_INTERACTOPTION_ID =
			void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	PublicUtil_1 = require("../../../Common/PublicUtil");
(exports.INVALID_INTERACTOPTION_ID = -1),
	(exports.COMMONLEVELPLAY_TRACKICONID = 8),
	(exports.CHALLENGELEVELPLAY_TRACKICONID = 9),
	(exports.OUTRANGEFAILED_TIMERTYPE = "FailedNodeOutRangeTimerType"),
	(exports.NPCFARAWAY_TIMERTYPE = "NpcFarAwayOutRangeTimerType");
class NodeInfo extends Protocol_1.Aki.Protocol.ANs {
	constructor() {
		super(...arguments), (this.NodeId = 0);
	}
}
(exports.NodeInfo = NodeInfo),
	(exports.btTypeLogString = {
		[Protocol_1.Aki.Protocol.tps.Proto_BtTypeInvalid]: "无效",
		[Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest]: "任务",
		[Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay]: "玩法",
		[Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst]: "副本",
	}),
	(exports.btNodeStatusLogString = {
		[Protocol_1.Aki.Protocol.DNs.Proto_NotActive]: "0-未激活",
		[Protocol_1.Aki.Protocol.DNs.t5n]: "1-激活",
		[Protocol_1.Aki.Protocol.DNs.Proto_Completing]: "2-完成中",
		[Protocol_1.Aki.Protocol.DNs.Proto_CompletedSuccess]: "3-成功完成",
		[Protocol_1.Aki.Protocol.DNs.Proto_CompletedFailed]: "4-失败完成",
		[Protocol_1.Aki.Protocol.DNs.Proto_Destroy]: "6-销毁",
	}),
	(exports.btChildQuestNodeStatusLogString = {
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_NotActive]: "0-未激活",
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_Enter]: "1-进入",
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_EnterAction]: "2-执行进入行为中",
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_Progress]: "3-进行中",
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_Finished]: "4-完成",
		[Protocol_1.Aki.Protocol.bNs.Proto_CQNS_FinishAction]: "5-完成行为",
	});
class BtCustomUiConfig {
	constructor(t, o) {
		(this.SourceOfAdd = t), (this.CustomUiConfig = o);
	}
}
exports.BtCustomUiConfig = BtCustomUiConfig;
class NodeStatusChangeInfo {
	constructor(t, o, e, r) {
		(this.TreeIncId = t),
			(this.NodeId = o),
			(this.IsGmFinished = e),
			(this.ShowBridge = r);
	}
	Clear() {
		(this.TreeIncId = BigInt(0)), (this.NodeId = 0), (this.ShowBridge = void 0);
	}
}
function checkMainTitleSame(t, o) {
	return (
		(!t && !o) ||
		!(
			!t ||
			!o ||
			(t.TidTitle !== o.TidTitle &&
				PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle) !==
					PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidTitle))
		)
	);
}
function checkSubTitleSame(t, o) {
	return (
		t.TidTitle === o.TidTitle ||
		PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle) ===
			PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidTitle)
	);
}
(exports.NodeStatusChangeInfo = NodeStatusChangeInfo),
	(exports.checkMainTitleSame = checkMainTitleSame),
	(exports.checkSubTitleSame = checkSubTitleSame);
class TreeTrackTextExpressionInfo {
	constructor() {
		(this.MainTitle = void 0), (this.SubTitles = []), (this.MainTitle = void 0);
	}
	Clear() {
		(this.MainTitle = void 0), this.ClearSubTitle();
	}
	SetMainTitle(t) {
		this.MainTitle = t;
	}
	AddSubTitle(t) {
		this.SubTitles.push(t);
	}
	ClearSubTitle() {
		this.SubTitles.length = 0;
	}
	CopyConfig(t) {
		(this.MainTitle = t.MainTitle), (this.SubTitles = [...t.SubTitles]);
	}
	CheckTextEqual(o) {
		if (!o) return !1;
		if (!checkMainTitleSame(this.MainTitle, o.MainTitle)) return !1;
		if (this.SubTitles.length !== o.SubTitles.length) return !1;
		for (let t = 0; t < this.SubTitles.length; t++)
			if (!checkSubTitleSame(this.SubTitles[t], o.SubTitles[t])) return !1;
		return !0;
	}
	IsSubTitle(o) {
		return (
			!(!this.SubTitles || 0 === this.SubTitles.length) &&
			void 0 !==
				this.SubTitles.find((t) => {
					t = t.QuestScheduleType;
					return void 0 !== t && t.ChildQuestId === o;
				})
		);
	}
}
exports.TreeTrackTextExpressionInfo = TreeTrackTextExpressionInfo;
class SilentAreaShowInfo {
	constructor(t, o) {
		(this.SourceOfAdd = t), (this.ShowInfo = o);
	}
}
exports.SilentAreaShowInfo = SilentAreaShowInfo;
//# sourceMappingURL=GeneralLogicTreeDefine.js.map
