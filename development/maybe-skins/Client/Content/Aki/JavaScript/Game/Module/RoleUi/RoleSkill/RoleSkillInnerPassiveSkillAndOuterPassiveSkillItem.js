"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem = void 0);
const UE = require("ue"),
	RoleSkillChainItem_1 = require("./RoleSkillChainItem"),
	RoleSkillInnerPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillItem"),
	RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem extends RoleSkillChainItem_1.RoleSkillChainItem {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	OnStart() {
		var e =
			new RoleSkillInnerPassiveSkillItem_1.RoleSkillInnerPassiveSkillItem();
		e.CreateThenShowByActor(this.GetItem(0).GetOwner()),
			this.SkillNodeItemList.push(e);
		for (const e of [1, 2]) {
			var l = this.GetItem(e),
				i =
					new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
			i.CreateThenShowByActor(l.GetOwner()), this.SkillNodeItemList.push(i);
		}
		for (const e of [3, 4]) {
			var t = this.GetItem(e);
			this.LineItemList.push(t);
		}
	}
}
exports.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem =
	RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem;
