"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MoveSkillItem = void 0);
const InputController_1 = require("../../../Input/InputController"),
	InputEnums_1 = require("../../../Input/InputEnums"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BattleSkillItem_1 = require("./BattleSkillItem");
class MoveSkillItem extends BattleSkillItem_1.BattleSkillItem {
	constructor() {
		super(...arguments),
			(this.f_t = !1),
			(this.Gut = InputEnums_1.EInputAxis.None),
			(this.jce = 0);
	}
	RefreshByMoveType(e, t) {
		(this.Gut = e), (this.jce = t), this.IsShowOrShowing || this.Show();
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
		(this.f_t = !0),
			this.ClickEffect?.Play(),
			InputController_1.InputController.InputAxis(this.Gut, this.jce);
	}
	OnSkillButtonReleased() {
		(this.f_t = !1), InputController_1.InputController.InputAxis(this.Gut, 0);
	}
	Tick(e) {
		super.Tick(e),
			this.f_t &&
				InputController_1.InputController.InputAxis(this.Gut, this.jce);
	}
	OnBeforeHide() {
		this.f_t = !1;
	}
	OnInputAction() {
		this.ClickEffect?.Play();
	}
}
exports.MoveSkillItem = MoveSkillItem;
