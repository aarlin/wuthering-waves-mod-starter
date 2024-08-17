"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractNavigation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	InputEnums_1 = require("../../../Input/InputEnums");
class InteractNavigation {
	constructor(i, t, s) {
		(this.F1i = 0),
			(this.V1i = 0),
			(this.H1i = 0),
			(i < (this.j1i = 0) || t < 0) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Interaction",
					9,
					"设置lookUp阈值和zoomThreshold阈值错误!",
					["lookUpThreshold", i],
					["zoomThreshold", t],
				),
			(this.W1i = i),
			(this.K1i = t),
			(this.Q1i = s);
	}
	get Index() {
		return this.V1i;
	}
	set Index(i) {
		this.V1i = i;
	}
	get TotalNum() {
		return this.F1i;
	}
	UpdateValue(i, t, s = void 0) {
		var h,
			o = this.V1i;
		return (
			void 0 !== this.V1i
				? i === InputEnums_1.EInputAxis.LookUp
					? (this.H1i * t < 0 && (this.H1i = 0),
						(this.H1i += t),
						Math.abs(this.H1i) >= this.W1i &&
							((h =
								(0 < t ? 1 : -1) * Math.floor(Math.abs(this.H1i / this.W1i))),
							(this.H1i -= this.W1i * h),
							(this.V1i += h)))
					: i === InputEnums_1.EInputAxis.Zoom &&
						(this.j1i * (h = -t) < 0 && (this.j1i = 0),
						(this.j1i += h),
						Math.abs(this.j1i) >= this.K1i) &&
						((i = (0 < h ? 1 : -1) * Math.floor(Math.abs(this.j1i / this.K1i))),
						(this.j1i -= this.K1i * i),
						(this.V1i += i))
				: (this.V1i = 0),
			this.X1i(s),
			this.V1i !== o
		);
	}
	UpdateIndex(i) {
		var t = this.V1i;
		return this.X1i(i), this.V1i !== t;
	}
	X1i(i) {
		i && (this.F1i = i),
			this.F1i &&
				(this.V1i < 0 || this.V1i >= this.F1i) &&
				(this.Q1i
					? ((this.V1i = this.V1i % this.F1i),
						this.V1i < 0 && (this.V1i = this.F1i + this.V1i))
					: (this.V1i = Math.max(0, Math.min(this.V1i, this.F1i - 1))));
	}
}
exports.InteractNavigation = InteractNavigation;
