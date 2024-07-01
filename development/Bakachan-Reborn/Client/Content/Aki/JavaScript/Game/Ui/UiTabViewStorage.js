"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTabViewStorage = void 0);
class UiTabViewStorage {
	static GetUiTabViewBase(e) {
		return this.hCr.get(e);
	}
	static AddUiTabViewBase(e) {
		for (const t of e)
			this.hCr.set(t[0], { CreateUiTabView: t[1], ResourceId: t[2] });
	}
}
(exports.UiTabViewStorage = UiTabViewStorage).hCr = new Map();
