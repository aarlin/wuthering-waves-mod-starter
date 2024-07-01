"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridComponent = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ItemGridComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Qet = void 0),
			(this.bAt = void 0),
			(this.qAt = void 0),
			(this.GAt = !1),
			(this.NAt = !1),
			(this.OAt = void 0);
	}
	Initialize(t) {
		this.GAt ||
			((this.Qet = t),
			(this.bAt = this.GetResourceId()),
			this.OnInitialize(),
			(this.GAt = !0));
	}
	async Load() {
		return (
			(this.OAt = new CustomPromise_1.CustomPromise()),
			await this.CreateByResourceIdAsync(this.bAt, this.Qet),
			this.OAt.SetResult(this),
			this
		);
	}
	async GetAsync() {
		return this.IsCreating ? this.OAt.Promise : this;
	}
	OnStartImplement() {
		(this.NAt = !0),
			this.OnActivate(),
			void 0 !== this.qAt && this.OnRefresh(this.qAt);
	}
	Refresh(t) {
		(this.qAt = t), this.InAsyncLoading() || this.OnRefresh(t);
	}
	OnBeforeDestroyImplement() {
		this.NAt && this.OnDeactivate(),
			(this.NAt = !1),
			(this.GAt = !1),
			(this.qAt = void 0);
	}
	OnInitialize() {}
	OnActivate() {}
	OnDeactivate() {}
	OnRefresh(t) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Inventory", 8, "没有实现 OnRefresh", [
				"ComponentName",
				this.constructor.name,
			]);
	}
	GetResourceId() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Inventory", 8, "没有实现 GetResourceId", [
				"ComponentName",
				this.constructor.name,
			]);
	}
	GetLayoutLevel() {
		return 0;
	}
	SetActive(t) {
		(t && this.IsShowOrShowing) || super.SetActive(t);
	}
	SetHierarchyIndex(t) {
		this.RootItem.GetHierarchyIndex() !== t &&
			this.RootItem.SetHierarchyIndex(t);
	}
}
exports.ItemGridComponent = ItemGridComponent;
