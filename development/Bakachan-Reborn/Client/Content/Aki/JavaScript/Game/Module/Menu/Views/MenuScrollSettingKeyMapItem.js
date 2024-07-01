"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingKeyMapItem = void 0);
const UE = require("ue"),
	MenuController_1 = require("../MenuController"),
	MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingKeyMapItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
	constructor() {
		super(...arguments), (this.Pe = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
		];
	}
	OnStart() {}
	OnBeforeDestroy() {
		this.Pe && (this.Pe = void 0);
	}
	Update(e) {
		(this.Pe = e), this.RefreshTitle(), this.dSe();
	}
	RefreshTitle() {
		this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
	}
	SetInteractionActive(e) {
		this.GetButton(1).SetSelfInteractive(!0);
	}
	dSe() {
		this.GetRootItem().SetUIActive(!0);
		var e = MenuController_1.MenuController.GetTargetMenuData(
			this.Pe.MenuDataFunctionId,
		);
		this.GetText(2).ShowTextNew(e.MenuDataFunctionKeyMap ?? "");
	}
}
exports.MenuScrollSettingKeyMapItem = MenuScrollSettingKeyMapItem;
