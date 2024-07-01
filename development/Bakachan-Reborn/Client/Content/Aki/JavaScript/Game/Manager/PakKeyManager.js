"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PakKeyManager = void 0);
const TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	PakKeyUpdate_1 = require("../../Launcher/Update/PakKeyUpdate");
class PakKeyManager {
	static Init() {
		void 0 !== PakKeyManager.xBe &&
			(TimerSystem_1.TimerSystem.Remove(PakKeyManager.xBe),
			(PakKeyManager.xBe = void 0)),
			PakKeyManager.wBe();
	}
	static wBe() {
		var e;
		PakKeyUpdate_1.PakKeyUpdate.NeedExtPakKeys &&
			0 < PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval &&
			((e = 1e3 * PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval),
			(PakKeyManager.xBe = TimerSystem_1.TimerSystem.Forever(() => {
				PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(void 0, void 0).catch(
					(e) => {},
				);
			}, e)));
	}
}
(exports.PakKeyManager = PakKeyManager).xBe = void 0;
