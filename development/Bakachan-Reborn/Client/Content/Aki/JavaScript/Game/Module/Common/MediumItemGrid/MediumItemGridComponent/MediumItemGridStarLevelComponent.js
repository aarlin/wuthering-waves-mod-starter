"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridStarLevelComponent = void 0);
const UE = require("ue"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridStarLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments), (this.Uxt = void 0), (this.Axt = []), (this.Pxt = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
		];
	}
	OnActivate() {
		(this.Uxt = this.GetItem(0)), this.GetSprite(1).SetUIActive(!1);
	}
	OnDeactivate() {
		(this.Axt.length = 0), (this.Uxt = void 0);
	}
	GetResourceId() {
		return "UiItem_ItemTagStar";
	}
	OnRefresh(t) {
		if (this.Pxt !== t) {
			this.Pxt = t;
			var e = this.GetSprite(1).GetOwner();
			this.xxt();
			for (let i = 0; i < t; i++) {
				let t = this.Axt[i];
				t?.IsValid() ||
					((t = LguiUtil_1.LguiUtil.DuplicateActor(e, this.Uxt)),
					this.Axt.push(t)),
					t?.GetUIItem()?.SetUIActive(!0);
			}
		}
		this.SetActive(!0);
	}
	xxt() {
		for (const t of this.Axt) t?.GetUIItem()?.SetUIActive(!1);
	}
}
exports.MediumItemGridStarLevelComponent = MediumItemGridStarLevelComponent;
