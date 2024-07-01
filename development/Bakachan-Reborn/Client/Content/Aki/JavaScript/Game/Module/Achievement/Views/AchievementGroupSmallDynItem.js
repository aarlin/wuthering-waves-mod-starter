"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGroupSmallDynItem = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementGroupSmallDynItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.eqe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[4, UE.UIItem],
			[1, UE.UIExtendToggle],
			[3, UE.UIText],
		];
	}
	GetItemSize(e) {
		void 0 === this.eqe && (this.eqe = Vector2D_1.Vector2D.Create());
		var t = this.GetRootItem();
		return this.eqe.Set(t.GetWidth(), t.GetHeight()), this.eqe.ToUeVector2D(!0);
	}
	ClearItem() {}
}
exports.AchievementGroupSmallDynItem = AchievementGroupSmallDynItem;
