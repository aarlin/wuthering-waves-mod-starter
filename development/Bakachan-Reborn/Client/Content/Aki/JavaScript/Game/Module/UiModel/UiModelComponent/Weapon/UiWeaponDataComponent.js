"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, o, t, n) {
		var a,
			r = arguments.length,
			i =
				r < 3
					? o
					: null === n
						? (n = Object.getOwnPropertyDescriptor(o, t))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, o, t, n);
		else
			for (var p = e.length - 1; 0 <= p; p--)
				(a = e[p]) && (i = (r < 3 ? a(i) : 3 < r ? a(o, t, i) : a(o, t)) || i);
		return 3 < r && i && Object.defineProperty(o, t, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiWeaponDataComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponDataComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments), (this.ebr = void 0);
	}
	get WeaponConfigId() {
		return this.ebr?.GetItemId() ?? 0;
	}
	get WeaponData() {
		return this.ebr;
	}
	SetWeaponData(e) {
		this.ebr = e;
	}
};
(UiWeaponDataComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(18)],
	UiWeaponDataComponent,
)),
	(exports.UiWeaponDataComponent = UiWeaponDataComponent);
