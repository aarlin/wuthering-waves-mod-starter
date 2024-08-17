"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase"),
	RenderModuleController_1 = require("../../Manager/RenderModuleController");
class PostProcessTriggerStateBase extends StateBase_1.StateBase {
	OnEnter(e) {}
	OnUpdate(e) {}
	OnExit(e) {}
	GetTargetDefaultValue() {
		var e = this.Owner.GetWuYinQuBattleState(),
			t = this.Owner.GetWuYinQuBattleKey();
		return 0 === e || 4 === e
			? RenderModuleController_1.RenderModuleController.GetIdleClearAtmosphere(
					this.Owner.GetWuYinQuBattleKey(),
				)
				? 0
				: 1
			: (1 !== e && 2 !== e && 3 !== e) ||
					e !==
						RenderModuleController_1.RenderModuleController.GetCurrentKeyState(
							t,
						)
				? 0
				: 1;
	}
}
exports.default = PostProcessTriggerStateBase;
