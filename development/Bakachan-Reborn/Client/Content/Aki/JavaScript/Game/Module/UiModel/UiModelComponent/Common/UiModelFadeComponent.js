"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, o) {
		var s,
			n = arguments.length,
			h =
				n < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, i))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			h = Reflect.decorate(e, t, i, o);
		else
			for (var r = e.length - 1; 0 <= r; r--)
				(s = e[r]) && (h = (n < 3 ? s(h) : 3 < n ? s(t, i, h) : s(t, i)) || h);
		return 3 < n && h && Object.defineProperty(t, i, h), h;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelFadeComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelFadeComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.F7t = 0),
			(this.EBr = 0),
			(this.gle = 0),
			(this.Wht = 0),
			(this.HYo = void 0),
			(this.eAn = !1);
	}
	OnCreate() {
		this.eAn = !1;
	}
	OnInit() {
		this.Qwr = this.Owner.CheckGetComponent(0);
	}
	OnEnd() {
		this.NeedTick && this.Qwr?.SetDitherEffect(this.EBr),
			(this.eAn = !0),
			this.av();
	}
	Fade(e, t, i, o) {
		this.eAn ||
			((this.F7t = e),
			(this.EBr = t),
			(this.Wht = i),
			(this.HYo = o),
			(this.gle = 0),
			(this.NeedTick = !0),
			this.Qwr?.SetDitherEffect(e));
	}
	Tick(e) {
		(this.gle += 1e3 * e),
			(e =
				this.HYo.GetFloatValue(this.gle / this.Wht) * (this.EBr - this.F7t) +
				this.F7t),
			this.Qwr?.SetDitherEffect(e),
			this.gle >= this.Wht && ((this.NeedTick = !1), this.av());
	}
	av() {
		(this.F7t = 0),
			(this.EBr = 0),
			(this.Wht = 0),
			(this.HYo = void 0),
			(this.gle = 0);
	}
};
(UiModelFadeComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(8)],
	UiModelFadeComponent,
)),
	(exports.UiModelFadeComponent = UiModelFadeComponent);
