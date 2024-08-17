"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharRenderBase = void 0);
class CharRenderBase {
	constructor() {
		(this.RenderComponent = void 0), (this.Qhr = !1);
	}
	GetIsInitSuc() {
		return this.Qhr;
	}
	GetRenderingComponent() {
		return this.RenderComponent;
	}
	OnInitSuccess() {
		this.Qhr = !0;
	}
	Awake(e) {
		this.RenderComponent = e;
	}
	Start() {}
	Update() {}
	LateUpdate() {}
	Destroy() {}
	GetDeltaTime() {
		return this.RenderComponent.GetDeltaTime();
	}
}
exports.CharRenderBase = CharRenderBase;
