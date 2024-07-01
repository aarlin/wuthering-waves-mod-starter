"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillChainItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillChainItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.SkillNodeItemList = []),
			(this.LineItemList = []);
	}
	Update(e, l) {
		this.SkillNodeItemList[0].Update(e, l);
		let t =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
					l,
				).NodeIndex,
			i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
		var o = (i =
			i ||
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
				e,
			)).GetRoleSkillTreeConfig();
		for (let l = 1; l < this.SkillNodeItemList.length; l++)
			for (const i of o)
				if (1 === i.ParentNodes.length && i.ParentNodes[0] === t) {
					this.SkillNodeItemList[l].Update(e, i.Id), (t = i.NodeIndex);
					break;
				}
		this.RefreshLine();
	}
	RefreshLine() {
		for (let t = 0; t < this.LineItemList.length; t++) {
			if ((l = t + 1) >= this.SkillNodeItemList.length) return;
			var e = (l = this.SkillNodeItemList[l]).GetSkillNodeId(),
				l = l.GetRoleId();
			l = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(l, e);
			(e = this.LineItemList[t]).SetChangeColor(0 === l, e.changeColor);
		}
	}
	OnNodeLevelChange(e) {
		for (const l of this.SkillNodeItemList) l.OnNodeLevelChange(e);
		this.RefreshLine();
	}
}
exports.RoleSkillChainItem = RoleSkillChainItem;
