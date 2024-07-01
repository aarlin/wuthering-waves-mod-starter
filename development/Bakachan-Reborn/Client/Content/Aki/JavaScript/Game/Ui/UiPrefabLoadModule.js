"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPrefabLoadModule = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../Core/Common/CustomPromise"),
	Log_1 = require("../../Core/Common/Log"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../GlobalData");
class UiPrefabLoadModule {
	constructor() {
		this.sCr = new Map();
	}
	async LoadPrefabAsync(e, o) {
		if (GlobalData_1.GlobalData.World) {
			const s = new CustomPromise_1.CustomPromise();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiPrefabLoad", 11, "资源加载开始", ["路径", e]);
			var r = ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.PrefabAsset,
				(e, r) => {
					(e = UE.LGUIBPLibrary.LoadPrefabWithAsset(
						GlobalData_1.GlobalData.World,
						e,
						o,
					)),
						s.SetResult(e),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("UiPrefabLoad", 11, "资源加载完成", ["路径", r]);
				},
				102,
			);
			e =
				(r !== ResourceSystem_1.ResourceSystem.InvalidId && this.sCr.set(r, e),
				await s.Promise);
			return this.sCr.delete(r), e;
		}
	}
	Clear() {
		for (var [e, o] of this.sCr)
			ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiPrefabLoad", 11, "资源加载取消", ["路径", o]);
		this.sCr.clear();
	}
}
exports.UiPrefabLoadModule = UiPrefabLoadModule;
