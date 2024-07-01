"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillOuterAttributeSkillItem = void 0);
const UE = require("ue"),
	RoleSkillTreeSkillItemBase_1 = require("./RoleSkillTreeSkillItemBase");
class RoleSkillOuterAttributeSkillItem extends RoleSkillTreeSkillItemBase_1.RoleSkillTreeSkillItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	GetSkillIconItem() {
		return this.GetItem(0);
	}
	GetLockItem() {
		return this.GetItem(1);
	}
	GetStrongArrowUpItem() {
		return this.GetItem(2);
	}
	GetType() {
		return 4;
	}
	IsIconTexture() {
		return !0;
	}
}
exports.RoleSkillOuterAttributeSkillItem = RoleSkillOuterAttributeSkillItem;
