"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PanelQteTimeDilation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class PanelQteTimeDilation {
	constructor() {
		(this.RNi = 0), (this.UNi = 0);
	}
	Init() {
		(this.RNi = 1), (this.UNi = 1);
	}
	Clear() {}
	Start(e) {
		(this.RNi = e.Config.WorldTimeDilation),
			1 <= this.RNi || this.RNi < 0
				? (this.RNi = 1)
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("PanelQte", 18, "界面QTE时停开始"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
						this.RNi,
					));
	}
	Stop() {
		1 !== this.RNi &&
			((this.RNi = 1),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("PanelQte", 18, "界面QTE时停结束"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
				this.RNi,
			));
	}
	GetWorldTimeDilation() {
		return this.RNi;
	}
	GetEntityTimeDilation() {
		return this.UNi;
	}
}
exports.PanelQteTimeDilation = PanelQteTimeDilation;
