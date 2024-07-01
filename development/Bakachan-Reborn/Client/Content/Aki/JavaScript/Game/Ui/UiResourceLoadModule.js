"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiResourceLoadModule = exports.UiResourceHandle = void 0);
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
class UiResourceHandle {
	constructor(e) {
		(this.ResourceId = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.Object = e);
	}
	CancelResource() {
		this.ResourceId !== ResourceSystem_1.ResourceSystem.InvalidId &&
			ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ResourceId);
	}
}
exports.UiResourceHandle = UiResourceHandle;
class UiResourceLoadModule {
	constructor() {
		this.aCr = new Map();
	}
	CancelResource(e) {
		let s = this.aCr.get(e);
		s
			? s.CancelResource()
			: ((s = new UiResourceHandle(e)), this.aCr.set(e, s));
	}
	SetResourceId(e, s) {
		(e = this.aCr.get(e)) && (e.ResourceId = s);
	}
	DeleteResourceHandle(e) {
		this.aCr.delete(e);
	}
	Clear() {
		for (const e of this.aCr.values()) e.CancelResource();
		this.aCr.clear();
	}
}
exports.UiResourceLoadModule = UiResourceLoadModule;
