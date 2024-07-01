"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchResultDynItem = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementSearchResultDynItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.MGe = void 0), (this.SGe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.MGe = Vector2D_1.Vector2D.Create();
		let e = this.GetItem(0);
		this.MGe.Set(e.GetWidth(), e.GetHeight()),
			(this.SGe = Vector2D_1.Vector2D.Create()),
			(e = this.GetItem(1)),
			this.SGe.Set(e.GetWidth(), e.GetHeight());
	}
	GetItemSize(e) {
		return e.AchievementSearchGroupData
			? this.MGe.ToUeVector2D(!0)
			: e.AchievementData
				? this.SGe.ToUeVector2D(!0)
				: new Vector2D_1.Vector2D().ToUeVector2D();
	}
	ClearItem() {}
}
exports.AchievementSearchResultDynItem = AchievementSearchResultDynItem;
