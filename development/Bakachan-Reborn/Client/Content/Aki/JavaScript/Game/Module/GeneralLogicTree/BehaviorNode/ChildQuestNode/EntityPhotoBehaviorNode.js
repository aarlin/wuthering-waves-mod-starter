"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityPhotoBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class EntityPhotoBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.TakePlace = void 0),
			(this.TakeTime = void 0),
			(this.TakeTargetArray = []);
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"TakePhoto" === (e = e.Condition).Type &&
			((this.TakeTime = e.TimeCondition),
			(this.TakePlace = e.PosCondition),
			(this.TakeTargetArray = e.PhotoTargets),
			!0)
		);
	}
	UseSubmitNode() {
		this.SubmitNode();
	}
	OnStart(e) {
		super.OnStart(e);
	}
	OnEnd(e) {
		super.OnEnd(e);
	}
	OnDestroy() {
		super.OnDestroy();
	}
}
exports.EntityPhotoBehaviorNode = EntityPhotoBehaviorNode;
