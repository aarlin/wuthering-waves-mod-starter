"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScreenShotManager = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	GlobalData_1 = require("../../GlobalData");
class ScreenShotManager {
	static Clear() {
		this.ResetScreenShot(), this.vT.clear();
	}
	static GetScreenShotTexture(e, t) {
		var r = e + "x" + t;
		let a = this.vT.get(r);
		return (
			a?.IsValid() ||
				((a = UE.LGUIBPLibrary.CreateTransientTexture2D(
					e,
					t,
					FNameUtil_1.FNameUtil.GetDynamicFName("ScreenShotTexture_" + r),
				)),
				this.vT.set(r, a)),
			a
		);
	}
	static PrepareTakeScreenshot(e, t, r, a, o, i) {
		return (
			this.ResetScreenShot(),
			(t = Vector2D_1.Vector2D.Create(t, r)),
			(r = Vector2D_1.Vector2D.Create(a, o)),
			(a = GlobalData_1.GlobalData.World),
			(this.hpo = UE.KuroGameScreenshotBPLibrary.PrepareTakeScreenshot(
				a,
				e,
				t.ToUeVector2D(),
				r.ToUeVector2D(),
				0,
				0,
				i,
			)),
			this.hpo
		);
	}
	static ResetScreenShot() {
		this.hpo && this.hpo.IsValid() && this.hpo.Reset(), (this.hpo = void 0);
	}
	static RequestIOSPhotoLibraryAuthorization() {
		this.hpo?.RequestIOSPhotoLibraryAuthorization();
	}
}
((exports.ScreenShotManager = ScreenShotManager).vT = new Map()),
	(ScreenShotManager.hpo = void 0);
