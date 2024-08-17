"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreateCharacterController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	LoginDefine_1 = require("../Login/Data/LoginDefine"),
	UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager");
class CreateCharacterController extends UiControllerBase_1.UiControllerBase {
	static TriggerInputName() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.CreateRoleShowInputName,
		);
	}
	static AddBurstEyeRenderingMaterial(e) {
		var n =
			ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()[
				e ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl
			];
		(e = e
			? "RoleMaleBurstEyeMaterialController"
			: "RoleFemaleBurstEyeMaterialController"),
			(n = UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
				n,
				e,
			));
		UiLoginSceneManager_1.UiLoginSceneManager.SetBurstEyeMaterialId(n);
	}
	static RemoveBurstEyeRenderingMaterial(e) {
		e =
			ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()[
				e ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl
			];
		var n = UiLoginSceneManager_1.UiLoginSceneManager.GetBurstEyeMaterialId();
		UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterial(e, n);
	}
}
exports.CreateCharacterController = CreateCharacterController;
