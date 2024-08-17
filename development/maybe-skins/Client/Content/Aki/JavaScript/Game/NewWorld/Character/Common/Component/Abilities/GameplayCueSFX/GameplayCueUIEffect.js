"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueUIEffect = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueUIEffect extends GameplayCueBase_1.GameplayCueBase {
	OnInit() {}
	OnTick(e) {}
	OnCreate() {
		this.p$o(!0);
	}
	OnDestroy() {
		this.p$o(!1);
	}
	p$o(e) {
		var t = this.v$o(this.CueConfig.CueType);
		t &&
			EventSystem_1.EventSystem.Emit(
				t,
				this.Entity.Id,
				this.CueConfig,
				e,
				this.ActiveHandleId,
			);
	}
	v$o(e) {
		switch (e) {
			case 2:
				return EventDefine_1.EEventName.CharOnBuffAddUITexture;
			case 4:
				return EventDefine_1.EEventName.CharOnBuffAddUIPrefab;
			case 5:
				return EventDefine_1.EEventName.CharOnBuffAddUIDamage;
			default:
				return;
		}
	}
}
exports.GameplayCueUIEffect = GameplayCueUIEffect;
