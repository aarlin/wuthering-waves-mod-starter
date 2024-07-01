"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewSetContainer = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	UiViewContainer_1 = require("./UiViewContainer");
class UiViewSetContainer extends UiViewContainer_1.UiViewContainer {
	constructor(e) {
		super(), (this.EFo = void 0), (this.EFo = e);
	}
	async OpenViewAsync(e) {
		var o = e.Info.Name;
		this.EFo.has(o)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCore", 1, "界面重复", ["name", o])
			: (this.EFo.set(o, e), await this.OpenViewImplementAsync(e));
	}
	async CloseViewAsync(e) {
		this.EFo.delete(e.Info.Name), await this.CloseViewImplementAsync(e);
	}
	ClearContainer() {
		var e,
			o,
			r = [];
		for ([e, o] of this.EFo)
			(o.IsExistInLeaveLevel = !0),
				o.Info.IsPermanent ||
					(this.TryCatchViewDestroyCompatible(o), r.push(e));
		for (const e of r) this.EFo.delete(e);
	}
	async PreOpenViewAsync(e) {
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					17,
					"此类型容器不支持预打开界面",
					["name", e.Info.Name],
					["type", e.Info.Type],
				),
			Promise.resolve()
		);
	}
	async OpenViewAfterPreOpenedAsync(e) {
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					17,
					"此类型容器不支持预打开界面",
					["name", e.Info.Name],
					["type", e.Info.Type],
				),
			Promise.reject(TypeError("此类型容器不支持预打开界面"))
		);
	}
}
exports.UiViewSetContainer = UiViewSetContainer;
