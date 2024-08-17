"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataManipulatableCreateBullet extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.ExistTagsCondition = void 0),
			(this.UnExistTagsCondition = void 0),
			(this.BulletOwner = 0),
			(this.CreateBulletRowName = void 0),
			(this.BulletTransform = 0);
	}
}
exports.default = LogicDataManipulatableCreateBullet;
