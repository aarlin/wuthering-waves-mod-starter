"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraMappingData = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraMappingData {
	constructor(e, a) {
		(this.WDe = e.ViewName), (this.Lo = e), (this.IsChildView = a);
	}
	GetUiCameraMappingConfig() {
		return this.Lo;
	}
	GetSourceHandleName() {
		var e, a, t;
		if (this.Lo)
			return (
				(a = this.Lo.BodyTargetType),
				(e = this.Lo.DefaultUiCameraSettingsName),
				0 !== a &&
				(a =
					UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetBodyKey(
						a,
					)) &&
				(t = this.Lo.BodyCameraSettingsNameMap) &&
				((t = t.get(a)), !StringUtils_1.StringUtils.IsEmpty(t))
					? t
					: e
			);
	}
	CanPushCameraHandle() {
		var e;
		return (
			!!this.Lo &&
			"None" !== (e = this.Lo.DefaultUiCameraSettingsName) &&
			!StringUtils_1.StringUtils.IsEmpty(e)
		);
	}
	GetToBlendName(e) {
		var a = this.Lo.UiCameraBlendNameMap;
		return !a || ((a = a.get(e)), StringUtils_1.StringUtils.IsEmpty(a))
			? this.Lo.DefaultCameraBlendName
			: a;
	}
	GetUiCameraDelayTime() {
		return this.Lo.UiCameraDelayTime;
	}
	GetViewName() {
		return this.WDe;
	}
}
exports.UiCameraMappingData = UiCameraMappingData;
