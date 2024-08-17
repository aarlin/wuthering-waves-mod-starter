"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiEffectAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiEffectAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
	constructor(t, e, s, o, i, n, h, c, a) {
		super(),
			(this.EffectPath = t),
			(this.MeshComponent = e),
			(this.Socket = s),
			(this.Attached = o),
			(this.AttachLocationOnly = i),
			(this.Location = n),
			(this.Rotation = h),
			(this.Scale = c),
			(this.PlayOnEnd = a);
	}
	IsValid() {
		return (
			void 0 !== this.EffectPath &&
			void 0 !== this.Socket &&
			void 0 !== this.MeshComponent
		);
	}
	IsEqual(t) {
		return (
			t instanceof UiEffectAnsContext &&
			!(!this.IsValid() || !t.IsValid()) &&
			this.EffectPath === t.EffectPath &&
			this.Socket.op_Equality(t.Socket) &&
			this.MeshComponent === t.MeshComponent
		);
	}
}
exports.UiEffectAnsContext = UiEffectAnsContext;
