"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionMainItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	RoleVisionCommonItem_1 = require("./RoleVisionCommonItem");
class RoleVisionMainItem extends RoleVisionCommonItem_1.RoleVisionCommonItem {
	constructor() {
		super(...arguments), (this.T7e = () => !1);
	}
	GetPlusItem() {}
	GetVisionTextureComponent() {
		return this.GetTexture(3);
	}
	GetVisionQualitySprite() {
		return this.GetSprite(6);
	}
	GetVisionLevelText() {
		return this.GetText(4);
	}
	GetVisionCostText() {
		return this.GetText(9);
	}
	GetVisionCostItem() {
		return this.GetItem(8);
	}
	GetDragComponent() {
		return this.GetDraggable(2);
	}
	GetSelectToggle() {
		return this.GetExtendToggle(0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIDraggableComponent],
			[3, UE.UITexture],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UISprite],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.OnClickVision]]);
	}
	OnStart() {
		var e = this.GetExtendToggle(0);
		this.GetTexture(1).SetUIActive(!1),
			e.CanExecuteChange.Bind(() => this.T7e());
	}
	OnUpdateTrialItem(e) {}
	OnUpdateItem(e) {
		var t = e?.GetCurrentSkillId(),
			i = e?.GetIfActivePersonalSkill();
		(t =
			((t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					t,
				)) &&
				(this.SetTextureByPath(
					i ? t.BattleViewIcon : t.SpecialBattleViewIcon,
					this.GetTexture(1),
				),
				this.GetTexture(1).SetUIActive(!0)),
			this.GetTexture(1))).SetChangeColor(i, t.changeColor),
			this.GetItem(7).SetUIActive(e?.GetIfActivePersonalSkill());
	}
}
exports.RoleVisionMainItem = RoleVisionMainItem;
