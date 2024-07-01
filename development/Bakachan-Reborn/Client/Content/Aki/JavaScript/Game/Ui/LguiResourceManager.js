"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LguiResourceManager = exports.ELguiLoadResultType = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../GlobalData"),
	ConfigManager_1 = require("../Manager/ConfigManager");
var ELguiLoadResultType;
!(function (e) {
	(e[(e.Success = 0)] = "Success"), (e[(e.Fail = 1)] = "Fail");
})(
	(ELguiLoadResultType =
		exports.ELguiLoadResultType || (exports.ELguiLoadResultType = {})),
);
class LguiResourceManager {
	static LoadPrefabByResourceId(e, a, r) {
		return (
			(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
			LguiResourceManager.LoadPrefab(e, a, r)
		);
	}
	static LoadPrefab(e, a, r) {
		var o = ResourceSystem_1.ResourceSystem.LoadAsync(
			e,
			UE.PrefabAsset,
			(e, o) => {
				e
					? GlobalData_1.GlobalData.World
						? ((e = UE.LGUIBPLibrary.LoadPrefabWithAsset(
								GlobalData_1.GlobalData.World,
								e,
								a,
							)),
							r && r?.(e, o, ELguiLoadResultType.Success))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("LguiUtil", 11, "资源加载失败,Game.World为空", [
									"path",
									o,
								]),
							r?.(void 0, o, ELguiLoadResultType.Fail))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("LguiUtil", 11, "资源加载失败,资源不存在", [
								"path",
								o,
							]),
						r?.(void 0, o, ELguiLoadResultType.Fail));
			},
		);
		return (
			o !== LguiResourceManager.InvalidId && LguiResourceManager.Vmr.set(o, e),
			o
		);
	}
	static CancelLoadPrefab(e) {
		LguiResourceManager.InvalidId !== e &&
			LguiResourceManager.Vmr.get(e) &&
			(LguiResourceManager.Vmr.delete(e),
			ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e));
	}
}
((exports.LguiResourceManager = LguiResourceManager).Vmr = new Map()),
	(LguiResourceManager.InvalidId = -1);
