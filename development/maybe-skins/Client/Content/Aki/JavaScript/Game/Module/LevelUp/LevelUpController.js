"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelUpController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class LevelUpController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerExpChanged,
				this.NCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFinishLoadingState,
				this.tpi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerExpChanged,
				this.NCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFinishLoadingState,
				this.tpi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			);
	}
}
((exports.LevelUpController = LevelUpController).NCi = (e, n, t) => {
	var o,
		r = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
	r < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
		((o = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(
			r,
			n,
			r,
			e,
		)),
		ModelManager_1.ModelManager.LevelUpModel.SetExpChange(r, e, n, t, o));
}),
	(LevelUpController.Cke = (e, n, t, o, r, a, l) => {
		var v;
		KuroSdkReport_1.KuroSdkReport.OnPlayerLevelChange(n),
			n < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
				((v = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(
					e,
					o,
					n,
					t,
				)),
				ModelManager_1.ModelManager.LevelUpModel.SetLevelUp(
					e,
					n,
					t,
					o,
					r,
					a,
					l,
					v,
				));
	}),
	(LevelUpController.tpi = () => {
		var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
		e < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
			ModelManager_1.ModelManager.LevelUpModel.SetShowLevelOnly(e);
	}),
	(LevelUpController.uht = (e) => {
		2 === e && LevelUpController.tpi();
	});
