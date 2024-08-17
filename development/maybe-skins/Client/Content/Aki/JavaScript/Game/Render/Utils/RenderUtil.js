"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderUtil = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../GlobalData"),
	CharBodyEffect_1 = require("../Character/Components/Components/CharBodyEffect"),
	CharDecalShadow_1 = require("../Character/Components/Components/CharDecalShadow"),
	CharDitherEffect_1 = require("../Character/Components/Components/CharDitherEffect"),
	CharNpcDitherEffect_1 = require("../Character/Components/Components/CharNpcDitherEffect"),
	CharPropertyModifier_1 = require("../Character/Components/Components/CharPropertyModifier"),
	CharSceneInteraction_1 = require("../Character/Components/Components/CharSceneInteraction"),
	CharMaterialContainer_1 = require("../Character/Components/MaterialContainer/CharMaterialContainer"),
	CharMaterialController_1 = require("../Character/Components/MaterialController/CharMaterialController");
class RenderUtil {
	static GetRenderComps(e) {
		var r = new Array();
		switch (e) {
			case 0:
			case 1:
				r.push(new CharMaterialController_1.CharMaterialController()),
					r.push(new CharMaterialContainer_1.CharMaterialContainer()),
					r.push(new CharDitherEffect_1.CharDitherEffect()),
					r.push(new CharSceneInteraction_1.CharSceneInteraction()),
					r.push(new CharPropertyModifier_1.CharPropertyModifier()),
					r.push(new CharBodyEffect_1.CharBodyEffect()),
					r.push(new CharDecalShadow_1.CharDecalShadow());
				break;
			case 3:
				r.push(new CharDitherEffect_1.CharDitherEffect()),
					r.push(new CharNpcDitherEffect_1.CharNpcDitherEffect()),
					r.push(new CharDecalShadow_1.CharDecalShadow());
				break;
			case 2:
				r.push(new CharMaterialController_1.CharMaterialController()),
					r.push(new CharMaterialContainer_1.CharMaterialContainer()),
					r.push(new CharDitherEffect_1.CharDitherEffect()),
					r.push(new CharSceneInteraction_1.CharSceneInteraction()),
					r.push(new CharPropertyModifier_1.CharPropertyModifier()),
					r.push(new CharDecalShadow_1.CharDecalShadow());
				break;
			case 4:
				r.push(new CharMaterialController_1.CharMaterialController()),
					r.push(new CharMaterialContainer_1.CharMaterialContainer()),
					r.push(new CharDitherEffect_1.CharDitherEffect()),
					r.push(new CharSceneInteraction_1.CharSceneInteraction()),
					r.push(new CharDecalShadow_1.CharDecalShadow());
				break;
			case 5:
			case 7:
				r.push(new CharMaterialController_1.CharMaterialController()),
					r.push(new CharMaterialContainer_1.CharMaterialContainer()),
					r.push(new CharDitherEffect_1.CharDitherEffect());
				break;
			case 6:
				r.push(new CharMaterialController_1.CharMaterialController()),
					r.push(new CharMaterialContainer_1.CharMaterialContainer());
		}
		return r;
	}
	static GetFloat(e, r) {
		return UE.KuroCurveLibrary.GetValue_Float(e, r);
	}
	static GetColor(e, r) {
		return UE.KuroCurveLibrary.GetValue_LinearColor(e, r);
	}
	static GetFloatFromGroup(e, r) {
		switch (r.Type) {
			case 0:
				return void 0 !== e.StartConstant
					? e.StartConstant
					: UE.KuroCurveLibrary.GetValue_Float(e.Start, r.Factor);
			case 1:
				return void 0 !== e.LoopConstant
					? e.LoopConstant
					: UE.KuroCurveLibrary.GetValue_Float(e.Loop, r.Factor);
			case 2:
				return void 0 !== e.EndConstant
					? e.EndConstant
					: UE.KuroCurveLibrary.GetValue_Float(e.End, r.Factor);
			default:
				return e.Loop.Constant;
		}
	}
	static GetColorFromGroup(e, r) {
		switch (r.Type) {
			case 0:
				var a = e.StartConstant;
				return void 0 !== a
					? a
					: UE.KuroCurveLibrary.GetValue_LinearColor(e.Start, r.Factor);
			case 1:
				return void 0 !== (a = e.LoopConstant)
					? a
					: UE.KuroCurveLibrary.GetValue_LinearColor(e.Loop, r.Factor);
			case 2:
				return void 0 !== (a = e.EndConstant)
					? a
					: UE.KuroCurveLibrary.GetValue_LinearColor(e.End, r.Factor);
			default:
				return e.Loop.Constant;
		}
	}
	static GetTextureFromGroup(e, r) {
		switch (r.Type) {
			case 0:
				return e.Start;
			case 1:
				return e.Loop;
			case 2:
				return e.End;
			default:
				return;
		}
	}
	static Lerp(e, r, a) {
		return e + a * (r - e);
	}
	static Max(e, r) {
		return r < e ? e : r;
	}
	static Min(e, r) {
		return e < r ? e : r;
	}
	static Clamp(e, r, a) {
		return a <= e ? a : e <= r ? r : e;
	}
	static LerpVector(e, r, a, t) {
		(a = this.Clamp(a, 0, 1)),
			(t[0] = this.Lerp(e.X, r.X, a)),
			(t[1] = this.Lerp(e.Y, r.Y, a)),
			(t[2] = this.Lerp(e.Z, r.Z, a));
	}
	static StringIsNullOrEmpty(e) {
		return 0 === e.length;
	}
	static GetSelectedChannel(e) {
		switch (e) {
			case 0:
				return new UE.LinearColor(-1, 0, 0, 0);
			case 1:
				return new UE.LinearColor(1, 0, 0, 0);
			case 2:
				return new UE.LinearColor(0, 1, 0, 0);
			case 3:
				return new UE.LinearColor(0, 0, 1, 0);
			case 4:
				return new UE.LinearColor(0, 0, 0, 1);
			default:
				return new UE.LinearColor(0, 0, 0, 0);
		}
	}
	static OpenToonSceneShadow() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Shadow.ToonSceneShadowIntensity 1",
			);
	}
	static CloseToonSceneShadow() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Shadow.ToonSceneShadowIntensity 0",
			);
	}
	static OpenMobileSpotLightShadow() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Mobile.EnableKuroSpotlightsShadow 1",
			);
	}
	static CloseMobileSpotLightShadow() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Mobile.EnableKuroSpotlightsShadow 0",
			);
	}
	static CloseVelocityScreenSizeCull() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.VelocityScreenSizeCull 0",
			);
	}
	static EnableVelocityScreenSizeCull() {
		GlobalData_1.GlobalData.World &&
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.VelocityScreenSizeCull 0.01",
			);
	}
}
exports.RenderUtil = RenderUtil;
