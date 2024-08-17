"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadAsyncPromise = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class LoadAsyncPromise {
	constructor(e, s, o = 100) {
		(this.ZAo = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.ePo = new CustomPromise_1.CustomPromise()),
			this.tPo(e, s, o);
	}
	get CustomPromise() {
		return this.ePo;
	}
	get Promise() {
		return this.CustomPromise?.Promise;
	}
	get HandleId() {
		return this.ZAo;
	}
	tPo(e, s, o = 100) {
		this.ZAo = ResourceSystem_1.ResourceSystem.LoadAsync(
			e,
			s,
			(e, s) => {
				this.CustomPromise.SetResult(e);
			},
			o,
		);
	}
	CancelAsyncLoad() {
		this.HandleId !== ResourceSystem_1.ResourceSystem.InvalidId &&
			ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.HandleId);
	}
}
exports.LoadAsyncPromise = LoadAsyncPromise;
