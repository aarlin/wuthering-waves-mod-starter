"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridBuffIconComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridBuffIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	GetResourceId() {
		return "UiItem_ItemType";
	}
	OnRefresh(e) {
		if (void 0 === e) this.SetActive(!1);
		else {
			let r;
			var t = ModelManager_1.ModelManager.MediumItemGridModel;
			switch (e) {
				case 0:
					break;
				case 1:
					r = t.AttackBuffSpritePath;
					break;
				case 2:
					r = t.DefenseBuffSpritePath;
					break;
				case 3:
					r = t.RestoreHealthBuffSpritePath;
					break;
				case 4:
					r = t.RechargeBuffSpritePath;
					break;
				case 5:
					r = t.ResurrectionBuffSpritePath;
			}
			r
				? ((e = this.GetSprite(0)),
					this.SetSpriteByPath(r, e, !1),
					this.SetActive(!0))
				: this.SetActive(!1);
		}
	}
}
exports.MediumItemGridBuffIconComponent = MediumItemGridBuffIconComponent;
