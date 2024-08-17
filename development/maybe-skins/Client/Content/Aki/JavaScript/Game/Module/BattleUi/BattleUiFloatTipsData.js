"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiFloatTipsData = exports.BattleUiFloatTip = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UiManager_1 = require("../../Ui/UiManager"),
	MIN_VALID_TIME = 0.1;
class BattleUiFloatTip {
	constructor() {
		(this.Type = 0),
			(this.TextKey = void 0),
			(this.EndTime = 0),
			(this.CountdownEndTime = 0);
	}
}
exports.BattleUiFloatTip = BattleUiFloatTip;
class BattleUiFloatTipsData {
	constructor() {
		(this.QKe = new Array()), (this.CurTip = void 0);
	}
	Init() {}
	OnLeaveLevel() {
		(this.CurTip = void 0), (this.QKe.length = 0);
	}
	Clear() {}
	GetNextFloatTip() {
		for (; 0 < this.QKe.length; ) {
			var e = this.QKe.pop();
			if (!this.CheckIsExpired(e)) return e;
		}
	}
	PlayNormalFloatTip(e, t) {
		var i = new BattleUiFloatTip();
		(i.Type = 0),
			(i.TextKey = e),
			(i.EndTime = Time_1.Time.WorldTimeSeconds + t),
			this.AddNewFloatTip(i);
	}
	PlayCountdownFloatTip(e, t, i) {
		var a = new BattleUiFloatTip();
		(a.Type = 1),
			(a.TextKey = e),
			(a.EndTime = Time_1.Time.WorldTimeSeconds + t),
			(a.CountdownEndTime = Time_1.Time.WorldTimeSeconds + i),
			this.AddNewFloatTip(a);
	}
	AddNewFloatTip(e) {
		this.CurTip && this.QKe.push(this.CurTip),
			(this.CurTip = e),
			UiManager_1.UiManager.IsViewOpen("BattleFloatTipsView")
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.BattleUiFloatTipUpdate,
					)
				: UiManager_1.UiManager.OpenView("BattleFloatTipsView");
	}
	CheckIsExpired(e) {
		return e.EndTime - Time_1.Time.WorldTimeSeconds < 0.1;
	}
}
exports.BattleUiFloatTipsData = BattleUiFloatTipsData;
