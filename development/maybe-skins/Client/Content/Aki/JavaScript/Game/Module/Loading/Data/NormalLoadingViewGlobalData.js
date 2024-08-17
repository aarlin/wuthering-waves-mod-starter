"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NormalLoadingViewGlobalData = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class NormalLoadingViewGlobalData {
	static CreateFirstProgressPromise() {
		this.vpi = new CustomPromise_1.CustomPromise();
	}
	static FinishFirstProgressPromise() {
		this.vpi.SetResult(void 0), (this.vpi = void 0);
	}
	static get FirstProgressPromise() {
		return this.vpi;
	}
	static get FinishPromise() {
		return this.Mpi;
	}
	static CreateFinishPromisePromise() {
		this.Mpi = new CustomPromise_1.CustomPromise();
	}
	static FinishEndPromise() {
		this.Mpi.SetResult(void 0), (this.Mpi = void 0);
	}
	static get IsNotifyCloseView() {
		return this.Spi;
	}
	static ResetNotifyCloseView() {
		this.Spi = !1;
	}
}
((exports.NormalLoadingViewGlobalData = NormalLoadingViewGlobalData).vpi =
	void 0),
	(NormalLoadingViewGlobalData.Mpi = void 0),
	(NormalLoadingViewGlobalData.Spi = !1);
