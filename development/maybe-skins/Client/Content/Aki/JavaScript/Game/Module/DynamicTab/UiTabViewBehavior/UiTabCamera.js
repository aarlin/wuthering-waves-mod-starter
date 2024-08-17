"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTabCamera = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	DynamicTabCamera_1 = require("../DynamicTabCamera"),
	UiTabViewBehavior_1 = require("./UiTabViewBehavior");
class UiTabCamera extends UiTabViewBehavior_1.UiTabViewBehavior {
	constructor() {
		super(...arguments),
			(this.TabData = void 0),
			(this.HFt = (a) => {
				DynamicTabCamera_1.DynamicTabCamera.OnPlayCameraAnimationFinished(a);
			});
	}
	SetTabData(a) {
		this.TabData = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTab(a);
	}
	Init() {}
	Begin() {
		DynamicTabCamera_1.DynamicTabCamera.PlayTabUiCamera(
			this.TabData.ChildViewName,
		),
			this.Ore();
	}
	ShowFromToggle() {
		DynamicTabCamera_1.DynamicTabCamera.PlayTabUiCamera(
			this.TabData.ChildViewName,
			this.TabData.BackViewBlendName,
		);
	}
	ShowFromView() {
		DynamicTabCamera_1.DynamicTabCamera.PlayTabUiCamera(
			this.TabData.ChildViewName,
		);
	}
	Hide() {}
	Destroy() {
		(this.TabData = void 0), this.kre();
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
			this.HFt,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
			this.HFt,
		);
	}
}
exports.UiTabCamera = UiTabCamera;
