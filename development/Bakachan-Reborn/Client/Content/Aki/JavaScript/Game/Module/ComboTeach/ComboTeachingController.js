"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	CheckCondtions_1 = require("./Conditions/CheckCondtions");
class ComboTeachingController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ComboTeachingViewOpen,
			ComboTeachingController.OnOpenComboTeachingView,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ComboTeachingViewOpen,
			ComboTeachingController.OnOpenComboTeachingView,
		);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"ComboTeachingView",
			ComboTeachingController.CheckOpenComboTeachingView,
			"ComboTeachingController.CheckOpenComboTeachingView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"ComboTeachingView",
			ComboTeachingController.CheckOpenComboTeachingView,
		);
	}
	static GetSuccessChecker(e, n) {
		switch (e) {
			case 0:
				return new CheckCondtions_1.CheckSkillIdSuccessCondition(n, !0);
			case 5:
				return new CheckCondtions_1.CheckTagAddCondition(n, !0);
			case 4:
				return new CheckCondtions_1.CheckBuffAddCondition(n, !0);
			case 2:
				return new CheckCondtions_1.CheckSkillEnterNextAttrCondition(n, !0);
			case 6:
				return new CheckCondtions_1.CheckIsJumpCondition(n, !0);
			case 1:
				return new CheckCondtions_1.CheckSkillHitSuccessCondition(n, !0);
			case 3:
				return new CheckCondtions_1.CheckEnergyCondition(n, !0);
		}
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"ComboTeaching",
					35,
					"角色出招教学，成功条件检查未实现",
					["type", e],
				),
			new CheckCondtions_1.BaseCheckCondition(n, !0)
		);
	}
	static GetFailChecker(e, n) {
		switch (e) {
			case 0:
				return new CheckCondtions_1.CheckSkillIdFailCondition(n, !1);
			case 2:
				return new CheckCondtions_1.CheckNotInSkillCondition(n, !1);
			case 1:
				return new CheckCondtions_1.CheckSkillExitNextAttrCondition(n, !1);
			case 4:
				return new CheckCondtions_1.CheckBuffNotHaveCondition(n, !1);
			case 5:
				return new CheckCondtions_1.CheckTagNotHaveCondition(n, !1);
			case 6:
				return new CheckCondtions_1.CheckIsInJumpCondition(n, !1);
			case 3:
				return new CheckCondtions_1.CheckEnergyCondition(n, !1);
		}
		return (
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"ComboTeaching",
					35,
					"角色出招教学，失败条件检查未实现",
					["type", e],
				),
			new CheckCondtions_1.BaseCheckCondition(n, !1)
		);
	}
}
((exports.ComboTeachingController =
	ComboTeachingController).OnOpenComboTeachingView = (e) => {
	(ModelManager_1.ModelManager.ComboTeachingModel.RecoveryComboId = e),
		UiManager_1.UiManager.OpenView("ComboTeachingView", e);
}),
	(ComboTeachingController.CheckOpenComboTeachingView = () =>
		ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance());
