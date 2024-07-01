"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementDataDynItem = void 0);
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementDataDynItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.eqe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	GetItemSize(e) {
		void 0 === this.eqe && (this.eqe = Vector2D_1.Vector2D.Create());
		var t = this.GetRootItem();
		return this.eqe.Set(t.GetWidth(), t.GetHeight()), this.eqe.ToUeVector2D(!0);
	}
	ClearItem() {}
}
exports.AchievementDataDynItem = AchievementDataDynItem;
