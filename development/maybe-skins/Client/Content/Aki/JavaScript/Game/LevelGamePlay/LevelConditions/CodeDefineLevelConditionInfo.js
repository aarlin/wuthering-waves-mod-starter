"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelCodeConditionCheckGroupInfo =
		exports.LevelConditionCheckEntityTagInfo =
		exports.LevelConditionCheckFanIsNotRotatingInfo =
		exports.LevelConditionCheckCharacterTagInfo =
		exports.CodeCondition =
		exports.LevelConditionGroup =
			void 0);
class LevelConditionGroup {
	constructor() {
		(this.Type = 0), (this.Conditions = new Array());
	}
}
exports.LevelConditionGroup = LevelConditionGroup;
class CodeCondition {
	constructor() {
		(this.Type = "CompareVar"), (this.CodeType = 0);
	}
}
class LevelConditionCheckCharacterTagInfo extends (exports.CodeCondition =
	CodeCondition) {
	constructor() {
		super(), (this.TagId = 0), (this.IsContain = !1), (this.CodeType = 0);
	}
}
exports.LevelConditionCheckCharacterTagInfo =
	LevelConditionCheckCharacterTagInfo;
class LevelConditionCheckFanIsNotRotatingInfo extends CodeCondition {
	constructor() {
		super(), (this.EntityId = 0), (this.CodeType = 2);
	}
}
exports.LevelConditionCheckFanIsNotRotatingInfo =
	LevelConditionCheckFanIsNotRotatingInfo;
class LevelConditionCheckEntityTagInfo extends CodeCondition {
	constructor() {
		super(),
			(this.TagId = 0),
			(this.EntityId = 0),
			(this.IsContain = !1),
			(this.CodeType = 1);
	}
}
exports.LevelConditionCheckEntityTagInfo = LevelConditionCheckEntityTagInfo;
class LevelCodeConditionCheckGroupInfo extends CodeCondition {
	constructor() {
		super(), (this.ConditionGroup = void 0), (this.CodeType = 3);
	}
}
exports.LevelCodeConditionCheckGroupInfo = LevelCodeConditionCheckGroupInfo;
