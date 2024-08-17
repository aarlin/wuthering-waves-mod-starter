"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionChangeInteractOptionText = void 0);
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeInteractOptionText extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var t,
			e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
		e &&
			(e = EntitySystem_1.EntitySystem.Get(e)) &&
			(e = e.GetComponent(178)) &&
			(e = e.GetInteractController()) &&
			(e = e.CurrentInteractOption) &&
			((t = this.ActionInfo.Params), (e.TidContent = t.TidContent));
	}
}
exports.FlowActionChangeInteractOptionText = FlowActionChangeInteractOptionText;
