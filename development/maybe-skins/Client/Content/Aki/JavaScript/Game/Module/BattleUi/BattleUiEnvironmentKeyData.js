"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiEnvironmentKeyData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class BattleUiEnvironmentKeyData {
	constructor() {
		(this.xKe = 0), (this.wKe = []);
	}
	GetCurEnvironmentalKey() {
		return this.xKe;
	}
	GetCurKeyText() {
		return BattleUiEnvironmentKeyData.BKe[this.xKe];
	}
	Init() {
		(this.xKe = 0), (this.wKe.length = 0), this.wKe.push(!0);
		for (let e = 1; e < 4; e++) this.wKe.push(!1);
	}
	SetEnvironmentKeyVisible(e, t) {
		if (this.wKe[e] !== t)
			if ((this.wKe[e] = t)) this.xKe < e && ((this.xKe = e), this.bKe());
			else if (!(this.xKe > e))
				for (let t = e - 1; 0 <= t; t--)
					if (this.wKe[t]) return (this.xKe = t), void this.bKe();
	}
	bKe() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "环境特性快捷键类型改变", [
				"type",
				this.xKe,
			]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
			);
	}
	OnLeaveLevel() {
		this.xKe = 0;
		for (let e = 1; e < 4; e++) this.wKe[e] = !1;
	}
	Clear() {}
}
(exports.BattleUiEnvironmentKeyData = BattleUiEnvironmentKeyData).BKe = [
	void 0,
	"HotKeyText_SilentAreaTips_Name",
	"HotKeyText_EnvironmentBuffTips_Name",
	"HotKeyText_RogueInfoTips_Name",
];
