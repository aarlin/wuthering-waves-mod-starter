"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericPromptController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	GenericPromptDefine_1 = require("./GenericPromptDefine");
class GenericPromptController extends UiControllerBase_1.UiControllerBase {
	static ShowPromptByCode(e, ...r) {
		var t,
			n =
				ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(
					e,
				);
		n
			? ((t =
					ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(
						e,
					)),
				GenericPromptController.ShowPromptByItsType(n.TypeId, t, void 0, r))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GenericPrompt",
					11,
					'配置不存在，请检查"t.通用提示.xlsx"',
					["Id", e],
				);
	}
	static ShowPromptByCodeWithCallback(e, r, ...t) {
		var n,
			o =
				ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(
					e,
				);
		o
			? ((n =
					ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(
						e,
					)),
				GenericPromptController.ShowPromptByItsType(
					o.TypeId,
					n,
					void 0,
					t,
					void 0,
					Number(e),
					r,
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GenericPrompt",
					11,
					'配置不存在，请检查"t.通用提示.xlsx"',
					["Id", e],
				);
	}
	static ShowPromptByItsType(e, r, t, n, o, i, a, m) {
		(i = {
			TypeId: e,
			PromptId: i,
			MainTextObj: r,
			ExtraTextObj: t,
			MainTextParams: n,
			ExtraTextParams: o,
			CloseCallback: a,
			...m,
		}),
			9 === e
				? ModelManager_1.ModelManager.GenericPromptModel.ApplyPromptParamHub(i)
				: (r = GenericPromptDefine_1.genericPromptView[e]) &&
					UiManager_1.UiManager.OpenView(r, i);
	}
	static GetViewNameByPromptId(e) {
		var r =
			ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(e);
		if (r) return GenericPromptDefine_1.genericPromptView[r.TypeId] || void 0;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"GenericPrompt",
				11,
				'配置不存在，请检查"t.通用提示.xlsx"',
				["Id", e],
			);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UiManagerInit,
			this.H$t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AfterLoadMap,
				this.H$t,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UiManagerInit,
			this.H$t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AfterLoadMap,
				this.H$t,
			);
	}
}
(exports.GenericPromptController = GenericPromptController).H$t = () => {
	UiManager_1.UiManager.IsViewOpen("GenericPromptView") ||
		UiManager_1.UiManager.OpenView("GenericPromptView");
};
