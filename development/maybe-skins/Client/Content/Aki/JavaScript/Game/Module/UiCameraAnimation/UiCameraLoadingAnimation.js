"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraLoadingAnimation = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager");
class UiCameraLoadingAnimation {
	constructor() {
		(this.Cce = 0),
			(this.dUo = -0),
			(this.QAo = -0),
			(this.XAo = -0),
			(this.$Ao = -0),
			(this.YAo = -0),
			(this.IsPlaying = !1),
			(this.JAo = void 0),
			(this.JRo = void 0),
			(this.zAo = void 0);
	}
	Initialize() {}
	Play(t, i, e) {
		(this.JRo = UiCameraManager_1.UiCameraManager.Get()),
			(this.zAo = this.JRo.GetUiCameraComponent(
				UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
			)),
			(this.Cce = 0),
			(this.dUo = t),
			(this.$Ao = this.zAo.GetManualFocusDistance()),
			(this.YAo = this.zAo.GetCurrentAperture()),
			(this.QAo = i),
			(this.XAo = e),
			(this.IsPlaying = !0);
	}
	Stop() {
		(this.dUo = 0), (this.IsPlaying = !1), (this.JAo = void 0);
	}
	Tick(t) {
		var i, e;
		this.dUo &&
			this.IsPlaying &&
			(this.Cce >= this.dUo
				? (this.JAo?.SetResult(), this.Stop())
				: ((i = MathUtils_1.MathUtils.Lerp(
						this.$Ao,
						this.QAo,
						this.Cce / this.dUo,
					)),
					(e = MathUtils_1.MathUtils.Lerp(
						this.YAo,
						this.XAo,
						this.Cce / this.dUo,
					)),
					this.zAo.SetCameraFocalDistance(i),
					this.zAo.SetCameraAperture(e),
					(this.Cce += 10)));
	}
}
exports.UiCameraLoadingAnimation = UiCameraLoadingAnimation;
