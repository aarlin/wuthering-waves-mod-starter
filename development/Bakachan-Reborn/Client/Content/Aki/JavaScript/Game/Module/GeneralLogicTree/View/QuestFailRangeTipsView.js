"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestFailRangeTipsView = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class QuestFailRangeTipsView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.A$t = void 0),
			(this.EPe = void 0),
			(this.mNe = -0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		(this.A$t = this.GetText(0)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
		var e = this.OpenParam;
		(this.mNe = e - TimeUtil_1.TimeUtil.GetServerTimeStamp()), this.P$t();
	}
	OnTick(e) {
		ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop ||
			((this.mNe = Math.max(this.mNe - e * Time_1.Time.TimeDilation, 0)),
			this.P$t(),
			"Loop" !== this.EPe.GetCurrentSequence() &&
				this.EPe.PlayLevelSequenceByName("Loop", !1));
	}
	P$t() {
		var e = this.mNe / 1e3;
		e = Math.floor(e);
		this.A$t.SetText(e.toString());
	}
}
exports.QuestFailRangeTipsView = QuestFailRangeTipsView;
