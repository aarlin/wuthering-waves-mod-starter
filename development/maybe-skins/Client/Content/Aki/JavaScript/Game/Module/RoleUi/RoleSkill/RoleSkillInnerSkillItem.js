"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillInnerSkillItem = void 0);
const UE = require("ue"),
	RoleSkillTreeSkillItemBase_1 = require("./RoleSkillTreeSkillItemBase");
class RoleSkillInnerSkillItem extends RoleSkillTreeSkillItemBase_1.RoleSkillTreeSkillItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
		];
	}
	GetSkillIconItem() {
		return this.GetItem(0);
	}
	GetLevelText() {
		return this.GetText(1);
	}
	GetNameText() {
		return this.GetText(2);
	}
	GetStrongArrowUpItem() {
		return this.GetItem(3);
	}
	GetType() {
		return 2;
	}
}
exports.RoleSkillInnerSkillItem = RoleSkillInnerSkillItem;
