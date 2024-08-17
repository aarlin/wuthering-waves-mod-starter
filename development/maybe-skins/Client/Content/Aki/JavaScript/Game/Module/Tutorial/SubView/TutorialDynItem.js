"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialDynItem = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TutorialDynItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.eqe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
			[4, UE.UIText],
		];
	}
	GetItemSize(e) {
		return (
			void 0 === this.eqe && (this.eqe = Vector2D_1.Vector2D.Create()),
			e.IsTypeTitle
				? ((e = this.GetItem(0)), this.eqe.Set(e.GetWidth(), e.GetHeight()))
				: ((e = this.GetRootItem()), this.eqe.Set(e.GetWidth(), e.GetHeight())),
			this.eqe.ToUeVector2D(!0)
		);
	}
	ClearItem() {}
}
exports.TutorialDynItem = TutorialDynItem;
