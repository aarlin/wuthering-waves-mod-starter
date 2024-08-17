"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CipherKey = void 0);
const UE = require("ue"),
	CircleAttachView_1 = require("../../Module/AutoAttach/CircleAttachView"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	CipherCircleAttachItem_1 = require("./CipherCircleAttachItem"),
	INITGP = 0,
	LEN = 10;
class CipherKey extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.yye = void 0),
			(this.Iye = void 0),
			(this.Tye = void 0),
			(this.Lye = void 0),
			(this.Dye = void 0),
			(this.Rye = 0),
			(this.Uye = (e, t, i) => (
				(e = new CipherCircleAttachItem_1.CipherCircleAttachItem(e)).InitData(
					this.KeyIndex,
					this.Dye,
				),
				this.Lye.push(e),
				e
			)),
			(this.KeyIndex = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.Tye = new Array();
		for (let e = 0; e < 10; e++) this.Tye.push(e);
		(this.Lye = new Array()),
			(this.Dye = (e) => {
				this.Aye(e);
			}),
			this.Iye?.Clear(),
			(this.Iye = void 0),
			(this.Iye = new CircleAttachView_1.CircleAttachView(
				this.GetItem(0).GetOwner(),
			)),
			this.Iye.SetAudioEvent("ui_cipher_picker_tick"),
			this.Iye.CreateItems(this.GetItem(1).GetOwner(), 0, this.Uye, 1),
			this.GetItem(1).SetUIActive(!1),
			this.Iye.ReloadView(10, this.Tye),
			this.Iye.AttachToIndex(0),
			this.AddEvent();
	}
	OnBeforeDestroy() {
		this.RemoveEvent(), this.Iye.Clear();
	}
	AddEvent() {}
	RemoveEvent() {}
	InitKey(e) {
		this.yye = e;
	}
	Aye(e) {
		(this.Rye = e), this.yye && this.yye(this.KeyIndex, e);
	}
	HandleConfirm(e) {
		for (const t of this.Lye)
			if (t.GetNumber() === this.Rye) return void t.HandleConfirm(e);
	}
	HandleRest() {
		this.Iye.ReloadView(10, this.Tye), this.Iye.AttachToIndex(0);
	}
}
exports.CipherKey = CipherKey;
