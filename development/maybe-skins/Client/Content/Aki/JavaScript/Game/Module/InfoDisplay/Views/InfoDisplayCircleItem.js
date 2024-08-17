"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayCircleItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	FRONT_HIERACHY = 3,
	ANIMAL_SCALE = 0.8,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6;
class InfoDisplayCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
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
	RefreshItem() {
		(this.osi = this.Pe[this.GetShowItemIndex()]),
			this.Aqe(),
			this.GetRootItem().SetHierarchyIndex(0);
	}
	OnMoveItem(t) {
		var e,
			i = this.GetAttachItem().ExhibitionView.GetWidth(),
			o = this.GetRootItem(),
			s = ((i = (o.GetAnchorOffsetX() + i / 2) / i), o.RelativeScale3D);
		let r = 0;
		i >= 0.4 && i <= 0.6
			? (i >= 0.4 && i <= 0.5
					? ((r = i - 0.4),
						(e = MathUtils_1.MathUtils.Lerp(0.8, 1, 10 * r)),
						(e = new UE.Vector(e, e, e)),
						o.SetUIItemScale(e))
					: ((r = i - 0.5),
						(e = MathUtils_1.MathUtils.Lerp(1, 0.8, 10 * r)),
						(i = new UE.Vector(e, e, e)),
						o.SetUIItemScale(i)),
				this.GetRootItem().SetHierarchyIndex(3))
			: s.X !== this.rsi.X && o.SetUIItemScale(this.rsi);
	}
	SetData(t) {
		this.Pe = t;
	}
	Aqe() {
		"" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
	}
	jbe() {
		var t = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth();
		(t = (this.GetRootItem().GetAnchorOffsetX() + t / 2) / t) >= 0.4 &&
			t <= 0.6 &&
			(ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
				this.osi,
			),
			InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
	}
}
exports.InfoDisplayCircleItem = InfoDisplayCircleItem;
