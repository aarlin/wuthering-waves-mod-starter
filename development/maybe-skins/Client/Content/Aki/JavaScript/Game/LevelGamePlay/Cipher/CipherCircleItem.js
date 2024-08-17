"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CipherCircleItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AutoAttachExhibitionItem_1 = require("../../Module/CircleExhibition/AutoAttachExhibitionItem"),
	WRONG_COLOR = "BB5C58",
	RIGHT_COLOR = "F6D03F",
	NORMAL_COLOR = "FFFFFF";
class CipherCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
	constructor() {
		super(...arguments),
			(this.fye = 0),
			(this.pye = void 0),
			(this.Pe = void 0),
			(this.vye = UE.Color.FromHex("BB5C58")),
			(this.Mye = UE.Color.FromHex("F6D03F")),
			(this.Sye = UE.Color.FromHex("FFFFFF")),
			(this.Eye = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	RefreshItem(e) {
		(this.pye = this.Pe[this.GetShowItemIndex()]),
			void 0 !== this.pye && this.GetText(0).SetText(this.pye.toString());
	}
	OnSelect() {
		super.OnSelect(),
			ModelManager_1.ModelManager.CipherModel.SetCurPassword(
				this.fye,
				this.pye,
			),
			(this.GetText(0).useChangeColor = !1),
			this.Eye && this.Eye(this.pye);
	}
	OnUnSelect() {
		super.OnUnSelect(),
			this.GetText(0).SetColor(this.Sye),
			(this.GetText(0).useChangeColor = !0);
	}
	SetData(e) {
		this.Pe = e;
	}
	InitItem(e, t) {
		(this.fye = e), (this.Eye = t);
	}
	HandleConfirm(e) {
		let t = this.vye;
		e && (t = this.Mye), this.GetText(0).SetColor(t);
	}
	GetNumber() {
		return this.pye;
	}
}
exports.CipherCircleItem = CipherCircleItem;
