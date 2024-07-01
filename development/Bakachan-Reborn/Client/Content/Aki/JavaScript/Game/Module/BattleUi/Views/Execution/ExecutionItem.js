"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExecutionItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleSkillItem_1 = require("../BattleSkillItem");
class ExecutionItem extends BattleSkillItem_1.BattleSkillItem {
	constructor() {
		super(...arguments), (this.B7 = void 0);
	}
	Init(e) {
		(this.B7 = e), this.IsShowOrShowing || this.Show();
	}
	RefreshKeyByActionName(e) {
		var t = ModelManager_1.ModelManager.PlatformModel.OperationType;
		2 !== t ||
			(this.KeyActionName === e && this.KeyOperationType === t) ||
			(this.KeyItem &&
				(this.KeyItem.RefreshByActionOrAxis({ ActionOrAxisName: e }),
				this.KeyItem.SetActive(!0)),
			(this.KeyOperationType = t),
			(this.KeyActionName = e));
	}
	RefreshSkillIconByResId(e) {
		(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
			this.SetSkillIcon(e);
	}
	OnSkillButtonPressed() {
		this.B7?.();
	}
	OnInputAction() {
		this.ClickEffect?.Play();
	}
}
exports.ExecutionItem = ExecutionItem;
