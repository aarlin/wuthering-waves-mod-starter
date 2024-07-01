"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CipherCircleAttachItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AutoAttachItem_1 = require("../../Module/AutoAttach/AutoAttachItem"),
	WRONG_COLOR = "BB5C58",
	RIGHT_COLOR = "F6D03F",
	NORMAL_COLOR = "FFFFFF";
class CipherCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.fye = 0),
			(this.pye = void 0),
			(this.vye = UE.Color.FromHex("BB5C58")),
			(this.Mye = UE.Color.FromHex("F6D03F")),
			(this.Sye = UE.Color.FromHex("FFFFFF")),
			(this.Eye = void 0);
	}
	OnMoveItem() {}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnRefreshItem(e) {
		(this.pye = e),
			void 0 !== this.pye && this.GetText(0).SetText(this.pye.toString());
	}
	OnSelect() {
		ModelManager_1.ModelManager.CipherModel.SetCurPassword(this.fye, this.pye);
		var e = this.GetText(0);
		e.SetChangeColor(!1, e.changeColor), this.Eye && this.Eye(this.pye);
	}
	OnUnSelect() {
		var e = this.GetText(0);
		e.SetColor(this.Sye), e.SetChangeColor(!0, e.changeColor);
	}
	InitData(e, t) {
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
exports.CipherCircleAttachItem = CipherCircleAttachItem;
