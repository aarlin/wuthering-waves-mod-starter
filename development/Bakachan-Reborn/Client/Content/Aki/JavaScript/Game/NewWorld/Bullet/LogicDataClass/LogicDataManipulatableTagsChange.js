"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataManipulatableTagsChange extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.ExistTagsCondition = void 0),
			(this.UnExistTagsCondition = void 0),
			(this.AddTags = void 0),
			(this.RemoveTags = void 0);
	}
}
exports.default = LogicDataManipulatableTagsChange;
