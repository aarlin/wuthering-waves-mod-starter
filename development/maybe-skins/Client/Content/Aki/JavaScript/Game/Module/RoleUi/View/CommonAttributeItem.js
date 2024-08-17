"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonAttributeItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Pe = void 0),
			(this.r7e = () => !!this.Pe.DetailText),
			(this.ToggleEvent = (t) => {
				(t = 1 === t),
					this.GetText(5).SetUIActive(t),
					this.GetItem(7).SetUIActive(t);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIExtendToggle],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.ToggleEvent]]);
	}
	OnStart() {
		var t = this.GetExtendToggle(4);
		t.RootUIComp.SetUIActive(!0),
			this.GetItem(7).SetUIActive(!1),
			t.CanExecuteChange.Unbind(),
			t.CanExecuteChange.Bind(this.r7e);
	}
	ShowTemp(t) {
		(this.Pe = t).AttrNameText && this.GetText(1).SetText(t.AttrNameText),
			t.AttrIconTexture
				? (this.GetTexture(0).SetUIActive(!0),
					this.SetTextureByPath(t.AttrIconTexture, this.GetTexture(0)))
				: this.GetTexture(0).SetUIActive(!1),
			t.DetailText
				? (this.GetItem(6).SetUIActive(!0),
					this.GetText(5).SetText(t.DetailText))
				: this.GetItem(6).SetUIActive(!1),
			t.AttrBaseValue && this.GetText(2).SetText(t.AttrBaseValue),
			t.AttrAddValue
				? this.GetText(3).SetText(t.AttrAddValue)
				: this.GetText(3).SetText("");
	}
}
exports.CommonAttributeItem = CommonAttributeItem;
