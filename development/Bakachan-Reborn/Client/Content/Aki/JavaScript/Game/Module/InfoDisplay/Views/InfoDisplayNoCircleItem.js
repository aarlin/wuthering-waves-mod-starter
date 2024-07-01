"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayNoCircleItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	FRONT_HIERACHY = 1,
	ANIMAL_SCALE = 0.8,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6;
class InfoDisplayNoCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
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
			this.osi && (this.Aqe(), this.GetRootItem().SetHierarchyIndex(0));
	}
	SetData(t) {
		this.Pe = t;
	}
	Aqe() {
		"" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
	}
	OnMoveItem(t) {
		var e,
			i = this.GetRootItem(),
			o = this.GetAttachItem().ExhibitionView.GetWidth(),
			s = ((o = (i.GetAnchorOffsetX() + o / 2) / o), i.RelativeScale3D);
		let r = 0;
		o >= 0.4 && o <= 0.6
			? (o >= 0.4 && o <= 0.5
					? ((r = o - 0.4),
						(e = MathUtils_1.MathUtils.Lerp(0.8, 1, 10 * r)),
						(e = new UE.Vector(e, e, e)),
						i.SetUIItemScale(e))
					: ((r = o - 0.5),
						(e = MathUtils_1.MathUtils.Lerp(1, 0.8, 10 * r)),
						(o = new UE.Vector(e, e, e)),
						i.SetUIItemScale(o)),
				this.GetRootItem().SetHierarchyIndex(1))
			: s.X !== this.rsi.X && i.SetUIItemScale(this.rsi);
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
exports.InfoDisplayNoCircleItem = InfoDisplayNoCircleItem;
