"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridLevelAndLockComponent = void 0);
const UE = require("ue"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridLevelAndLockComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
		];
	}
	OnActivate() {
		this.GetItem(1).SetUIActive(!1), this.GetItem(3).SetUIActive(!1);
	}
	OnRefresh(e) {
		var t;
		e
			? (this.SetLevel(e.Level, e.IsUseVision),
				this.SetLock(e.IsLockVisible),
				(t = this.GetText(2)).SetChangeColor(
					e.IsLevelUseChangeColor,
					t.changeColor,
				),
				this.SetActive(!0))
			: this.SetActive(!1);
	}
	SetLock(e) {
		this.GetSprite(0).SetUIActive(e ?? !1);
	}
	SetLevel(e, t) {
		t ? (this.Sxt(void 0), this.yxt(e)) : (this.yxt(void 0), this.Sxt(e));
	}
	Sxt(e) {
		var t = this.GetItem(1);
		void 0 === e
			? t.IsUIActiveSelf() && t.SetUIActive(!1)
			: (this.GetText(2).SetText(e.toString()),
				t.IsUIActiveSelf() || t.SetUIActive(!0));
	}
	yxt(e) {
		var t = this.GetItem(3);
		void 0 === e
			? t.IsUIActiveSelf() && t.SetUIActive(!1)
			: (this.GetText(4).SetText(e.toString()),
				t.IsUIActiveSelf() || t.SetUIActive(!0));
	}
	GetResourceId() {
		return "UiItem_ItemState";
	}
}
exports.MediumItemGridLevelAndLockComponent =
	MediumItemGridLevelAndLockComponent;
