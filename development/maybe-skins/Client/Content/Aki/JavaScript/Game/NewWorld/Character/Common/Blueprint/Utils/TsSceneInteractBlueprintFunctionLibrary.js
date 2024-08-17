"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RewardController_1 = require("../../../../../Module/Reward/RewardController");
class TsSceneInteractBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetSitDownState(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 26)?.GetSitDownState() ?? !1
		);
	}
	static GetEnterSitDownIndex(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 26)?.EnterSitDownIndex;
	}
	static GetLeaveSitDownIndex(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 26)?.LeaveSitDownIndex;
	}
	static PreLeaveSitDownAction(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 26)?.PreLeaveSitDownAction();
	}
	static LeaveSitDownAction(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 26)?.LeaveSitDownAction();
	}
	static GetGiantActor(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 26)?.Giant;
	}
	static EndCatapult(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 26)?.EndCatapult();
	}
	static EndBounce(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 26)?.EndBounce();
	}
	static IsAiDriver(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.IsAiDriver ?? !1;
	}
	static IsDropItem(t) {
		return void 0 !== EntitySystem_1.EntitySystem.GetComponent(t, 133);
	}
	static PickUpDropItem(t, e) {
		(e = EntitySystem_1.EntitySystem.Get(e).GetComponent(0)),
			RewardController_1.RewardController.PickUpFightDrop(
				e.GetCreatureDataId(),
				e.GetPbDataId(),
			);
	}
	static InteractSceneItem(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(e, 178)?.ExecuteInteractFromVision(
			t,
		);
	}
}
exports.default = TsSceneInteractBlueprintFunctionLibrary;
