"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarKeyItem = void 0);
const UE = require("ue"),
	InputEnums_1 = require("../../../../Input/InputEnums"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	InputMultiKeyItemGroup_1 = require("../../../Common/InputKey/InputMultiKeyItemGroup");
class SpecialEnergyBarKeyItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.xet = void 0), (this.Lo = void 0);
	}
	SetConfig(e) {
		this.Lo = e;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	async OnBeforeStartAsync() {
		(this.xet = new InputMultiKeyItemGroup_1.InputMultiKeyItemGroup()),
			await this.xet.CreateByActorAsync(this.GetItem(0).GetOwner());
	}
	OnStart() {
		var e = (t = this.Lo.KeyInfoList)[0],
			t = t[1];
		let i = "";
		if (0 === this.Lo.KeyType) i = "";
		else
			switch (this.Lo.KeyType) {
				case 1:
					i = "+";
					break;
				case 2:
					i = "/";
					break;
				default:
					i = "";
			}
		(e = {
			SingleActionOrAxisKeyItem: this.dmt(e),
			DoubleActionOrAxisKeyItem: t ? this.dmt(t) : void 0,
			LinkString: i,
		}),
			this.xet?.Refresh(e),
			this.xet?.SetActive(!0);
	}
	dmt(e) {
		var t = 1 === e.Action;
		return {
			ActionOrAxisName: InputEnums_1.EInputAction[e.ActionType],
			IsLongPressProcessVisible: t,
			IsTextArrowVisible: t,
		};
	}
	RefreshKeyEnable(e, t) {
		this.xet?.SetEnable(e, t);
	}
}
exports.SpecialEnergyBarKeyItem = SpecialEnergyBarKeyItem;
