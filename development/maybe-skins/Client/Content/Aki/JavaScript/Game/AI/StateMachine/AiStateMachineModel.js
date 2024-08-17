"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	AiStateMachineFactory_1 = require("./AiStateMachineFactory");
class AiStateMachineModel extends ModelBase_1.ModelBase {
	OnInit() {
		return (
			(this.AiStateMachineFactory =
				new AiStateMachineFactory_1.AiStateMachineFactory()),
			!0
		);
	}
}
exports.AiStateMachineModel = AiStateMachineModel;
