"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayNoCircleAttachItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	FRONT_HIERACHY = 1,
	ANIMAL_SCALE = 0.8,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6;
class InfoDisplayNoCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.osi = ""),
			(this.rsi = new UE.Vector(0.8, 0.8, 0.8));
	}
	OnSelect() {}
	OnUnSelect() {}
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
	Aqe() {
		"" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
	}
	OnMoveItem() {
		var e,
			t = this.GetCurrentMovePercentage(),
			o = this.RootItem.RelativeScale3D;
		let i = 0;
		t >= 0.4 && t <= 0.6
			? (t >= 0.4 && t <= 0.5
					? ((i = t - 0.4),
						(e = MathUtils_1.MathUtils.Lerp(0.8, 1, 10 * i)),
						(e = new UE.Vector(e, e, e)),
						this.RootItem.SetUIItemScale(e))
					: ((i = t - 0.5),
						(e = MathUtils_1.MathUtils.Lerp(1, 0.8, 10 * i)),
						(t = new UE.Vector(e, e, e)),
						this.RootItem.SetUIItemScale(t)),
				this.GetRootItem().SetHierarchyIndex(1))
			: o.X !== this.rsi.X && this.RootItem.SetUIItemScale(this.rsi);
	}
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
exports.InfoDisplayNoCircleAttachItem = InfoDisplayNoCircleAttachItem;
