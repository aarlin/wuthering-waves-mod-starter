"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RunEndData = exports.ActivityRunModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiViewData_1 = require("../../../../Ui/Define/UiViewData"),
	ActivityRunData_1 = require("./ActivityRunData");
class ActivityRunModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentSelectChallengeId = 0),
			(this.W2e = 0),
			(this.K2e = new Map());
	}
	OnReceiveMessageData(e) {
		e.WCs.forEach((e) => {
			this.GetActivityRunData(e._3n).Phrase(e);
		}),
			e.UPs.forEach((e) => {
				this.GetActivityRunData(e).SetIsOpen(!0);
			});
	}
	OnReceiveChallengeOpenNotify(e) {
		var t = this.GetActivityRunData(e._3n);
		t.SetIsOpen(e.zCs),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				t.GetActivityId(),
			);
	}
	OnGetChallengeReward(e, t) {
		(e = this.GetActivityRunData(e)).OnGetScoreReward(t),
			(e = e.GetScoreIndexScore(t)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnGetRunActivityReward,
				e,
			);
	}
	GetOpenChallengeIds() {
		const e = new Array();
		return (
			this.K2e.forEach((t, n) => {
				t.GetIsShow() && e.push(n);
			}),
			e
		);
	}
	GetChallengeIds() {
		const e = new Array();
		return (
			this.K2e.forEach((t, n) => {
				e.push(n);
			}),
			e
		);
	}
	GetActivityRunData(e) {
		var t = this.K2e.get(e);
		if (t) return t;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Activity", 28, "找不到跑酷数据", ["id", e]);
	}
	CreateActivityRunData(e, t) {
		let n = this.K2e.get(t);
		return (
			n || ((n = new ActivityRunData_1.ActivityRunData(e)), this.K2e.set(t, n)),
			n
		);
	}
	GetDefaultOpenUiChallengeIndex(e) {
		var t;
		return e instanceof ActivityRunData_1.ActivityRun
			? ((t = e.GetChallengeDataArray()),
				e.IfAllFinish()
					? ((this.W2e = t.length - 1), t.length - 1)
					: e.GetActivityContentIndex())
			: 0;
	}
	SetStartViewSelectIndex(e) {
		this.W2e = e;
	}
	GetStartViewSelectIndex() {
		return this.W2e;
	}
	GetChallengeDataByMarkId(e) {
		var t = this.GetChallengeIds(),
			n = t.length;
		if (0 !== n) {
			let i = -1;
			for (let a = 0; a < n; a++)
				this.GetActivityRunData(t[a])?.GetMarkId() === e && (i = a);
			return -1 === i && (i = 0), this.GetActivityRunData(t[i]);
		}
	}
}
exports.ActivityRunModel = ActivityRunModel;
class RunEndData extends UiViewData_1.UiViewData {
	constructor() {
		super(...arguments),
			(this.CurrentChallengeId = 0),
			(this.CurrentScore = 0),
			(this.CurrentTime = -0),
			(this.IfNewRecord = !1);
	}
	Phrase(e) {
		(this.CurrentChallengeId = e._3n),
			(this.CurrentScore = e.J0s),
			(this.CurrentTime = e.Skn);
	}
	SetIfNewRecord(e) {
		this.IfNewRecord = e;
	}
}
exports.RunEndData = RunEndData;
