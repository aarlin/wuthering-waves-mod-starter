"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenGlobalData = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class BlackScreenGlobalData {
	static get ShowPromise() {
		return this.dgt;
	}
	static CreateShowPromise() {
		this.dgt = new CustomPromise_1.CustomPromise();
	}
	static FinishShowPromise() {
		this.dgt.SetResult(void 0);
	}
	static get HidePromise() {
		return this.Cgt;
	}
	static CreateHidePromise() {
		this.Cgt = new CustomPromise_1.CustomPromise();
	}
	static FinishHidePromise() {
		this.Cgt.SetResult(void 0);
	}
	static ResetGlobalData() {
		(this.dgt = void 0), (this.Cgt = void 0);
	}
}
((exports.BlackScreenGlobalData = BlackScreenGlobalData).dgt = void 0),
	(BlackScreenGlobalData.Cgt = void 0);
