"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ActorUtils_1 = require("../../../Utils/ActorUtils");
class TsBaseItem extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.EntityHandle = void 0),
			(this.DebugComp = void 0);
	}
	ReceiveBeginPlay() {
		(this.EntityHandle = ActorUtils_1.ActorUtils.GetEntityByActor(this)),
			(this.DebugComp = this.EntityHandle.Entity.GetComponent(111));
	}
	GetTagDebugStrings() {
		return this.DebugComp.GetTagDebugStrings();
	}
}
exports.default = TsBaseItem;
