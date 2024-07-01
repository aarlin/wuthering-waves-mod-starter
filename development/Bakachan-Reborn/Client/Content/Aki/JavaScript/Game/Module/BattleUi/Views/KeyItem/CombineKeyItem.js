"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombineKeyItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	InputSettings_1 = require("../../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
	KeyItemBase_1 = require("./KeyItemBase");
class CombineKeyItem extends KeyItemBase_1.KeyItemBase {
	constructor() {
		super(...arguments), (this.__t = "");
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UITexture],
		];
	}
	GetKeyText() {}
	GetKeyTexture() {
		return this.GetTexture(0);
	}
	RefreshAction(e) {
		super.RefreshAction(e),
			this.ActionName !== e &&
				(this.UnBindAction(),
				(this.ActionName = e),
				(this.AxisName = void 0),
				this.BindAction());
		var t =
			InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
				this.ActionName,
			);
		if (t) {
			var i = new Map();
			if ((t.GetCurrentPlatformKeyNameMap(i), i))
				for (var [n, s] of i)
					return (
						this.RefreshKey(InputSettings_1.InputSettings.GetKey(n)),
						this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(s)),
						this.GetTexture(2).SetUIActive(!0),
						void this.GetText(1).SetUIActive(!0)
					);
		}
		this.GetTexture(2).SetUIActive(!1),
			this.GetText(1).SetUIActive(!1),
			InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				this.ActionName,
			) && super.RefreshAction(e);
	}
	RefreshSubKey(e) {
		var t = e.GetKeyName();
		if (this.__t !== t) {
			if (((e = e.GetKeyIconPath()), !StringUtils_1.StringUtils.IsEmpty(e))) {
				const t = this.GetTexture(2);
				t.SetUIActive(!1),
					this.SetTextureByPath(e, t, void 0, () => {
						t.SetSizeFromTexture(), t.SetUIActive(!0);
					});
			}
			this.__t = t;
		}
	}
	OnSetGray() {
		var e;
		(e =
			((e = this.GetTexture(0)).SetChangeColor(this.IsGray, e.changeColor),
			this.GetTexture(2))).SetChangeColor(this.IsGray, e.changeColor);
	}
}
exports.CombineKeyItem = CombineKeyItem;
