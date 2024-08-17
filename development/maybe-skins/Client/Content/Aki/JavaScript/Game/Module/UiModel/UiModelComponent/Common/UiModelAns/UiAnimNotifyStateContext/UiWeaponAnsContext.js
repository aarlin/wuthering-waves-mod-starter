"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiWeaponAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiWeaponAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
	constructor(e, t, n, s = void 0) {
		super(),
			(this.Index = e),
			(this.ShowMaterialController = t),
			(this.HideEffect = n),
			(this.Transform = s);
	}
	IsEqual(e) {
		return e instanceof UiWeaponAnsContext && this.Index === e.Index;
	}
}
exports.UiWeaponAnsContext = UiWeaponAnsContext;
