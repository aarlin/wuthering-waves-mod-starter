"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiGlobalMaterialParam = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Application_1 = require("../../Core/Application/Application"),
	UiLayer_1 = require("./UiLayer");
class UiGlobalMaterialParam {
	static Init() {
		UiGlobalMaterialParam.Xmr(),
			Application_1.Application.AddApplicationHandler(
				1,
				UiGlobalMaterialParam.$mr,
			);
	}
	static Refresh() {
		UiGlobalMaterialParam.Xmr();
	}
	static Clear() {
		Application_1.Application.RemoveApplicationHandler(
			1,
			UiGlobalMaterialParam.$mr,
		);
	}
	static Xmr() {
		var a = (0, puerts_1.$ref)(void 0);
		UE.BP_CharacterRenderingFunctionLibrary_C.GetLGUIMPC(
			UiLayer_1.UiLayer.UiRoot,
			a,
		),
			(a = (0, puerts_1.$unref)(a));
		UE.KismetMaterialLibrary.SetScalarParameterValue(
			UiLayer_1.UiLayer.UiRoot.GetWorld(),
			a,
			UiGlobalMaterialParam.LguiWidth,
			UiLayer_1.UiLayer.UiRootItem.GetWidth(),
		),
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				UiLayer_1.UiLayer.UiRoot.GetWorld(),
				a,
				UiGlobalMaterialParam.LguiRenderOnScreen,
				1,
			);
	}
}
((exports.UiGlobalMaterialParam = UiGlobalMaterialParam).LguiWidth =
	new UE.FName("LGUIWidth")),
	(UiGlobalMaterialParam.LguiRenderOnScreen = new UE.FName(
		"RenderOnScreenWPO",
	)),
	(UiGlobalMaterialParam.$mr = () => {
		UiGlobalMaterialParam.Xmr();
	});
