"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraPostEffectComponent = void 0);
const UiCameraComponent_1 = require("./UiCameraComponent");
class UiCameraPostEffectComponent extends UiCameraComponent_1.UiCameraComponent {
	SetCameraFieldOfView(e) {
		this.CineCameraComponent.SetFieldOfView(e);
	}
	SetCameraFocalDistance(e) {
		this.CineCameraComponent.FocusSettings.ManualFocusDistance = e;
	}
	SetCameraAperture(e) {
		this.CineCameraComponent.CurrentAperture = e;
	}
	SetCameraPostProcessBlendWeight(e) {
		this.CineCameraComponent.SetPostProcessBlendWeight(e);
	}
	GetFieldOfView() {
		return this.CineCameraComponent.FieldOfView;
	}
	GetManualFocusDistance() {
		return this.CineCameraComponent.FocusSettings.ManualFocusDistance;
	}
	GetCurrentAperture() {
		return this.CineCameraComponent.CurrentAperture;
	}
	GetPostProcessBlendWeight() {
		return this.CineCameraComponent.PostProcessBlendWeight;
	}
}
exports.UiCameraPostEffectComponent = UiCameraPostEffectComponent;
