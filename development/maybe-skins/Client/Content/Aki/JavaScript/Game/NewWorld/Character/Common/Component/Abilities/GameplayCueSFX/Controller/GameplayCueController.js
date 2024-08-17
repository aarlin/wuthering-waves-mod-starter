"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueController = void 0);
const ControllerBase_1 = require("../../../../../../../../Core/Framework/ControllerBase"),
	GameplayCueBeamCommonItem_1 = require("../CommonItem/GameplayCueBeamCommonItem"),
	GameplayCueHookCommonItem_1 = require("../CommonItem/GameplayCueHookCommonItem");
class GameplayCueController extends ControllerBase_1.ControllerBase {
	static SpawnGameplayCueHook(e, o, a, m) {
		return GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(
			e,
			o,
			a,
			m,
		);
	}
	static DestroyGameplayCueHook(e) {
		e.Destroy();
	}
	static SpawnGameplayCueBeam(e, o) {
		return GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(e, o);
	}
	static TickBeam(e, o, a) {
		e.Tick(o, a);
	}
	static DestroyGameplayCueBeam(e) {
		e.Destroy();
	}
}
exports.GameplayCueController = GameplayCueController;
