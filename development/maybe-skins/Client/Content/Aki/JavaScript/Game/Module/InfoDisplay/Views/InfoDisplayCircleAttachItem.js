"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayCircleAttachItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	FRONT_HIERACHY = 3,
	ANIMAL_SCALE = 0.8,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6;
class InfoDisplayCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.osi = ""),
			(this.rsi = new UE.Vector(0.8, 0.8, 0.8));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
		]),
			(this.BtnBindInfo = [
				[
					0,
					() => {
						this.jbe();
					},
				],
			]);
	}
	OnRefreshItem(e) {
		(this.osi = e), this.Aqe(), this.GetRootItem().SetHierarchyIndex(0);
	}
	OnMoveItem() {
		var e,
			t = this.GetCurrentMovePercentage(),
			i = this.RootItem.RelativeScale3D;
		let o = 0;
		t >= 0.4 && t <= 0.6
			? (t >= 0.4 && t <= 0.5
					? ((o = t - 0.4),
						(e = MathUtils_1.MathUtils.Lerp(0.8, 1, 10 * o)),
						(e = new UE.Vector(e, e, e)),
						this.RootItem.SetUIItemScale(e))
					: ((o = t - 0.5),
						(e = MathUtils_1.MathUtils.Lerp(1, 0.8, 10 * o)),
						(t = new UE.Vector(e, e, e)),
						this.RootItem.SetUIItemScale(t)),
				this.GetRootItem().SetHierarchyIndex(3))
			: i.X !== this.rsi.X && this.RootItem.SetUIItemScale(this.rsi);
	}
	Aqe() {
		"" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
	}
	OnSelect() {}
	OnUnSelect() {}
	jbe() {
		var e = this.GetCurrentMovePercentage();
		e >= 0.4 && e <= 0.6
			? (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
					this.osi,
				),
				InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView())
			: EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ClickDisplayItem,
					this,
				);
	}
}
exports.InfoDisplayCircleAttachItem = InfoDisplayCircleAttachItem;
