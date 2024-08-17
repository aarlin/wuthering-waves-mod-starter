"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySettingRowBaseItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
class KeySettingRowBaseItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	ClearItem() {}
	GetItemSize(e) {
		var t = Vector2D_1.Vector2D.Create();
		let s;
		switch (e.GetRowType()) {
			case 1:
				s = this.GetItem(1);
				break;
			case 2:
				s = this.GetItem(2);
		}
		return s && ((t.X = s.GetWidth()), (t.Y = s.GetHeight())), t.ToUeVector2D();
	}
}
exports.KeySettingRowBaseItem = KeySettingRowBaseItem;
