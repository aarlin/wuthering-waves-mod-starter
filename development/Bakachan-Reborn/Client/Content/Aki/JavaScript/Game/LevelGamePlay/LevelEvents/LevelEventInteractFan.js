"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventInteractFan = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventInteractFan extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e &&
			((e = e.EntityId),
			(e = EntitySystem_1.EntitySystem.GetComponent(e, 135))) &&
			(e.ExecuteInteract(), this.FinishExecute(!0));
	}
}
exports.LevelEventInteractFan = LevelEventInteractFan;
