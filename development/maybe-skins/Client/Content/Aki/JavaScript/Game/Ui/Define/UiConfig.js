"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	InputDefine_1 = require("../Input/InputDefine"),
	InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
	UiViewStorage_1 = require("../UiViewStorage"),
	UiLayerType_1 = require("./UiLayerType"),
	UiViewInfo_1 = require("./UiViewInfo");
class UiConfig {
	static TryGetViewInfo(e) {
		let i = UiConfig.ecr.get(e);
		if (!i) {
			var n = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e),
				r = UiViewStorage_1.UiViewStorage.GetUiTsInfo(e);
			if (!r)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiCore",
						17,
						"[UiConfig.TryGetViewInfo] 未在UiViewManager中注册",
						["name", e],
					)
				);
			var o = r.ResourceId;
			let s = "",
				p = "";
			if (this.tcr(e))
				(s = ConfigManager_1.ConfigManager.CommonConfig.GetDebugGmViewPath(e)),
					(p = s);
			else {
				var t =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(o);
				if (!t)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[UiConfig.TryGetViewInfo] 找不到界面配置",
							["name", e],
							["resourceId", o],
						)
					);
				(s = t.Path), (p = t.PcPath);
			}
			var g = [];
			if (n.SkipAnim)
				if (n.IsShortKeysExitView) {
					for (var [a, f] of InputDefine_1.openViewActionsMap.entries())
						if (e === f) {
							if (
								"Escape" ===
								InputSettingsManager_1.InputSettingsManager.GetActionBinding(a)
									?.GetPcKey()
									?.GetKeyName()
							)
								break;
							g.push(a);
							break;
						}
					g.push(InputMappingsDefine_1.actionMappings.Ui返回);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							38,
							"[UiConfig.SkipAnim] 配置错误,跳过动画功能前提为IsShortKeysExitView=True",
						);
			(o = UiLayerType_1.ELayerType[n.Type]),
				(i = new UiViewInfo_1.UiViewInfo(
					e,
					o,
					r.Ctor,
					s,
					p,
					n.ObstructUi,
					n.AudioEvent,
					n.OpenAudioEvent,
					n.CloseAudioEvent,
					n.TimeDilation,
					n.ShowCursorType,
					n.CanOpenViewByShortcutKey,
					n.IsShortKeysExitView,
					r.SourceType,
					n.LoadAsync,
					n.NeedGC,
					n.IsFullScreen,
					UiLayerType_1.NORMAL_CONTAINER_TYPE & o
						? ConfigManager_1.ConfigManager.UiViewConfig.GetUiNormalConfig(e)
								.SortIndex
						: -1,
					n.CommonPopBg,
					n.CommonPopBgKey,
					n.ScenePath,
					n.IsPermanent,
					g,
					n.ScenePointTag,
				)),
				UiConfig.ecr.set(e, i);
		}
		return i;
	}
	static tcr(e) {
		return "GmView" === e || "LoginDebugView" === e;
	}
}
((exports.UiConfig = UiConfig).ecr = new Map()),
	(UiConfig.CanOpenWhileClearSceneViewNameSet = new Set(["LoadingView"]));
