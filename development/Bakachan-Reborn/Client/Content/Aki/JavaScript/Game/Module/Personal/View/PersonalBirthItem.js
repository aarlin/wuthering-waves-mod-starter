"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalBirthItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
	MIN_ALPHA = 0.5,
	MAX_ALPHA = 1;
class PersonalBirthItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
	constructor() {
		super(...arguments),
			(this.Dates = void 0),
			(this.kG = new UE.Vector(0)),
			(this.Mnt = void 0),
			(this.EVe = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnBeforeDestroy() {
		this.Mnt = void 0;
	}
	RefreshItem() {
		(this.Mnt = this.Dates[this.GetShowItemIndex()]),
			this.GetText(0).SetText(String(this.Mnt));
	}
	SetData(t) {
		this.Dates = t;
	}
	OnMoveItem(t) {
		var e = this.GetAttachItem().ExhibitionView.ItemActor.GetHeight(),
			i = this.GetRootItem();
		(i = Math.abs(i.GetAnchorOffsetY()) / (e / 2)),
			(e = MathUtils_1.MathUtils.Lerp(1, 0.5, i));
		(this.kG.X = 1),
			(this.kG.Y = 1),
			(this.kG.Z = 1),
			this.RootItem.SetUIItemScale(this.kG),
			this.GetText(0).SetAlpha(e);
	}
	BindOnSelected(t) {
		this.EVe = t;
	}
	OnSelect() {
		this.EVe && this.EVe(this.Mnt);
	}
}
exports.PersonalBirthItem = PersonalBirthItem;
