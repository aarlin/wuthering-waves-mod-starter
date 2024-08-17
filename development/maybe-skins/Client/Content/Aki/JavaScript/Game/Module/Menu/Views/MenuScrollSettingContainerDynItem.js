"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingContainerDynItem = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MenuScrollSettingContainerDynItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.IGe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	GetItemSize(e) {
		return (
			void 0 === this.IGe && (this.IGe = Vector2D_1.Vector2D.Create()),
			(e = this.$wi(e))
				? this.IGe.Set(e.GetWidth(), e.GetHeight())
				: this.IGe.Set(0, 0),
			this.IGe.ToUeVector2D(!0)
		);
	}
	$wi(e) {
		if (0 === e.Type) return this.GetItem(1);
		switch (e.Data.MenuDataSetType) {
			case 1:
				return this.GetItem(4);
			case 2:
				return this.GetItem(3);
			case 3:
			case 4:
				return this.GetItem(2);
			case 5:
				return this.GetItem(5);
		}
	}
	ClearItem() {}
}
exports.MenuScrollSettingContainerDynItem = MenuScrollSettingContainerDynItem;
