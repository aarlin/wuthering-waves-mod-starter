"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	HotKeyIconByKeyName_1 = require("../../../Core/Define/ConfigQuery/HotKeyIconByKeyName"),
	HotKeyMapById_1 = require("../../../Core/Define/ConfigQuery/HotKeyMapById"),
	HotKeyTextByTextId_1 = require("../../../Core/Define/ConfigQuery/HotKeyTextByTextId"),
	HotKeyTypeById_1 = require("../../../Core/Define/ConfigQuery/HotKeyTypeById"),
	HotKeyViewById_1 = require("../../../Core/Define/ConfigQuery/HotKeyViewById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class UiNavigationConfig extends ConfigBase_1.ConfigBase {
	GetHighlightWhenMouseMoveOut() {
		var o = CommonParamById_1.configCommonParamById.GetBoolConfig(
			"highlight_when_mouse_moveout",
		);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					'鼠标移出button表现参数找不到, 请检测c.参数字段"highlight_when_mouse_moveout"',
				),
			o
		);
	}
	GetMobileHighlight() {
		var o =
			CommonParamById_1.configCommonParamById.GetBoolConfig("mobile_highlight");
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					'移动端是否显示按钮高亮参数找不到, 请检测c.参数字段"mobile_highlight"',
				),
			o
		);
	}
	GetPcPress() {
		var o = CommonParamById_1.configCommonParamById.GetBoolConfig("pc_press");
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					'PC端是否显示按钮按下参数找不到, 请检测c.参数字段"pc_press"',
				),
			o
		);
	}
	GetNavigateTolerance() {
		var o =
			CommonParamById_1.configCommonParamById.GetFloatConfig(
				"navigate_tolerance",
			);
		return (
			void 0 === o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					'导航组同向误差找不到, 请检测c.参数字段"navigate_tolerance"',
				),
			o
		);
	}
	GetHotKeyViewConfig(o) {
		var e = HotKeyViewById_1.configHotKeyViewById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiNavigation", 11, "热键界面配置找不到", ["id", o])),
			e
		);
	}
	GetHotKeyMapConfig(o) {
		var e;
		if (-1 !== o)
			return (
				(e = HotKeyMapById_1.configHotKeyMapById.GetConfig(o)) ||
					-1 === o ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiNavigation", 11, "热键映射配置找不到", [
							"id",
							o,
						])),
				e
			);
	}
	GetHotKeyTypeConfig(o) {
		return HotKeyTypeById_1.configHotKeyTypeById.GetConfig(o);
	}
	GetHotKeyIconConfig(o, e = 0) {
		var r = HotKeyIconByKeyName_1.configHotKeyIconByKeyName.GetConfig(o);
		return (
			r ||
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("UiNavigation", 11, "快捷键图标配置找不到", [
						"keyName",
						o,
					])),
			r
		);
	}
	GetHotKeyText(o) {
		var e = HotKeyTextByTextId_1.configHotKeyTextByTextId.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiNavigation", 11, "快捷键文本配置找不到", [
						"TextId",
						o,
					])),
			e?.Name
		);
	}
	GetHotKeyIcon(o, e = !1) {
		return this.GetHotKeyIconConfig(o, e)?.Icon;
	}
}
exports.UiNavigationConfig = UiNavigationConfig;
