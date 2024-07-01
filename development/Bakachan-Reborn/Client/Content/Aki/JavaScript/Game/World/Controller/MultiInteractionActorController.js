"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiInteractionActorController = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	AttachToActorController_1 = require("./AttachToActorController"),
	MAX_DESTROY_TIME = 3;
class MultiInteractionActorController extends ControllerBase_1.ControllerBase {
	static OnTick() {
		if (!(this.W0r.Size <= 0)) {
			let t = 0;
			for (; t < 3; ) {
				if (this.W0r.Size <= 0) return;
				this.W0r.Pop().DestroySelf(), t++;
			}
		}
	}
	static OnClear() {
		return this.K0r(), !0;
	}
	static OnLeaveLevel() {
		return this.K0r(), !0;
	}
	static K0r() {
		for (; 0 < this.W0r.Size; ) {
			var t = this.W0r.Pop();
			t?.IsValid() && t.DestroySelf();
		}
	}
	static AddWaitDestroyActor(t) {
		this.W0r.Push(t),
			AttachToActorController_1.AttachToActorController.DetachActor(
				t,
				!1,
				"MultiInteractionActorController.AddWaitDestroyActor",
				1,
				1,
				1,
			);
	}
}
(exports.MultiInteractionActorController =
	MultiInteractionActorController).W0r = new Queue_1.Queue();
