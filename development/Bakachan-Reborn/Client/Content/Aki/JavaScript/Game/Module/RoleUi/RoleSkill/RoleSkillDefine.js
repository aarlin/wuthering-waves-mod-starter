"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillTreeInfoViewData = void 0);
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
class RoleSkillTreeInfoViewData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.RoleId = 0), (this.SkillNodeId = 0);
	}
}
exports.RoleSkillTreeInfoViewData = RoleSkillTreeInfoViewData;
