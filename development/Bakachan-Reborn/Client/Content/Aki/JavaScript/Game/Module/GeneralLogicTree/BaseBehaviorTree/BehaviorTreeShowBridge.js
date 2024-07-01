"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorTreeShowBridge = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
class BehaviorTreeShowBridge {
	constructor() {
		(this.Yre = void 0),
			(this.BtType = void 0),
			(this.TreeIncId = BigInt(0)),
			(this.TreeConfigId = 0),
			(this.lKt = void 0),
			(this.QuestType = void 0),
			(this.TrackIconConfigId = 0),
			(this.ShowByCustom = !1),
			(this.IsNewQuest = !1),
			(this.TrackTextConfig = void 0);
	}
	static Create(e) {
		if (0 === BehaviorTreeShowBridge.RUe.length) {
			const t = new BehaviorTreeShowBridge();
			return t.Reset(e), t;
		}
		const t = BehaviorTreeShowBridge.RUe.pop();
		return t.Reset(e), t;
	}
	static Recycle(e) {}
	get QuestName() {
		return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.lKt);
	}
	Reset(e) {
		(this.Yre = e),
			(this.BtType = e.BtType),
			(this.TreeIncId = e.TreeIncId),
			(this.TreeConfigId = e.TreeConfigId),
			(this.IsNewQuest = e.ContainTag(8)),
			this.UpdateToNew();
	}
	UpdateToNew() {
		var e = this.Yre;
		if (this.Yre) {
			(this.TrackIconConfigId = e.TaskMarkTableId),
				(this.ShowByCustom = this.Yre.IsChallengeUi());
			e = this.Yre.GetTrackTextExpressInfo();
			(this.TrackTextConfig =
				new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
				this.TrackTextConfig.SetMainTitle(e.MainTitle);
			for (const t of e.SubTitles) this.TrackTextConfig.AddSubTitle(t);
			this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
				? ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
						this.TreeConfigId,
					)),
					(this.lKt = e?.QuestNameTid),
					(this.QuestType = e?.Type))
				: ((this.lKt = void 0), (this.QuestType = void 0));
		}
	}
	IsInTrackRange() {
		return this.Yre.ContainTag(11);
	}
	IsRollbackWaiting() {
		return this.Yre.ContainTag(5);
	}
	CheckShowConfigEmpty() {
		var e = this.TrackTextConfig;
		let t;
		if (
			(t =
				e.MainTitle && e.MainTitle.TidTitle
					? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MainTitle.TidTitle)
					: t) &&
			!StringUtils_1.StringUtils.IsBlank(t)
		)
			return !1;
		if (e.SubTitles && 0 !== e.SubTitles.length)
			for (const t of e.SubTitles)
				if (t.TidTitle) {
					var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidTitle);
					if (!StringUtils_1.StringUtils.IsBlank(i)) return !1;
				}
		return !0;
	}
	GetCurrentCommunicateId() {
		return this.Yre.GetCurrentCommunicateId();
	}
	GetBlackboard() {
		return this.Yre;
	}
}
(exports.BehaviorTreeShowBridge = BehaviorTreeShowBridge).RUe = [];
