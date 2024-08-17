"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleUtils = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	EffectUtil_1 = require("../../Utils/EffectUtil"),
	UiModelUtil_1 = require("../UiModel/UiModelUtil");
class UiRoleUtils {
	static PlayRoleChangeEffect(e) {
		var l, o;
		e
			? ((l = (e = e.Model).CheckGetComponent(5)),
				(o = EffectUtil_1.EffectUtil.GetEffectPath(
					"ChangeRoleMaterialController",
				)),
				(o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					o,
					UE.PD_CharacterControllerData_C,
				)) && l?.AddRenderingMaterialByData(o),
				UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "ChangeRoleEffect"))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 17, "PlayRoleChangeEffect roleActor is null");
	}
	static PlayRoleLevelUpEffect(e) {
		e
			? ((e = e.Model),
				UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
					e,
					"RoleLevelUpMaterialController",
				),
				UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "RoleLevelUpEffect"))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 17, "PlayRoleLevelUpEffect roleActor is null");
	}
	static PlayRoleBreachFinishEffect(e) {
		e
			? ((e = e.Model),
				UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
					e,
					"RoleBreachFinishMaterialController",
				),
				UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "RoleBreachFinishEffect"))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Role",
					17,
					"PlayRoleBreachFinishEffect roleActor is null",
				);
	}
}
exports.UiRoleUtils = UiRoleUtils;
