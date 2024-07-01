"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewListContainer = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	UiViewContainer_1 = require("./UiViewContainer");
class UiViewListContainer extends UiViewContainer_1.UiViewContainer {
	constructor(e) {
		super(), (this.kur = void 0), (this.kur = e);
	}
	async OpenViewAsync(e) {
		this.kur.push(e), await this.OpenViewImplementAsync(e);
	}
	async CloseViewAsync(e) {
		var r = this.kur.indexOf(e);
		r < 0
			? Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					11,
					"ListContainer: 界面关闭重复执行,直接返回",
					["界面名称", e.Info?.Name],
					["ViewId", e.GetViewId()],
				)
			: (this.kur.splice(r, 1), await this.CloseViewImplementAsync(e));
	}
	ClearContainer() {
		for (let r = this.kur.length - 1; 0 <= r; --r) {
			var e = this.kur[r];
			(e.IsExistInLeaveLevel = !0),
				e.Info.IsPermanent ||
					(e.IsDestroyOrDestroying || this.TryCatchViewDestroyCompatible(e),
					this.kur.pop());
		}
	}
	CloseAllView() {
		for (let e = this.kur.length - 1; 0 <= e; --e)
			this.kur[e].Destroy(), this.kur.splice(e, 1);
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
exports.UiViewListContainer = UiViewListContainer;
