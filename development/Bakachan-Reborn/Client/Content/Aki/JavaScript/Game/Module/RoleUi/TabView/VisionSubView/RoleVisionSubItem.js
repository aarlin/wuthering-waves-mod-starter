"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionSubItem = void 0);
const UE = require("ue"),
	RoleVisionCommonItem_1 = require("./RoleVisionCommonItem");
class RoleVisionSubItem extends RoleVisionCommonItem_1.RoleVisionCommonItem {
	constructor() {
		super(...arguments), (this.T7e = () => !1);
	}
	GetPlusItem() {
		return this.GetItem(8);
	}
	GetVisionTextureComponent() {
		return this.GetTexture(3);
	}
	GetVisionQualitySprite() {
		return this.GetSprite(5);
	}
	GetVisionLevelText() {
		return this.GetText(4);
	}
	GetVisionCostText() {
		return this.GetText(7);
	}
	GetVisionCostItem() {
		return this.GetItem(6);
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
			[1, UE.UISprite],
			[2, UE.UIDraggableComponent],
			[3, UE.UITexture],
			[4, UE.UIText],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickVision]]);
	}
	OnStart() {
		this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.T7e());
	}
}
exports.RoleVisionSubItem = RoleVisionSubItem;
