"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UI_CAMERA_TAG =
		exports.UI_SKELETAL_OBSERVER_TAG =
		exports.UI_SCENE_ROLE_TAG =
		exports.UI_ROLE_CAN_ROTATE_TABVIEW =
		exports.SkillEffect =
		exports.OneSkillEffect =
		exports.ArrayIntInt =
		exports.ROLE_CHANGEROLE_BLENDNAME =
		exports.ROLE_CAMERA_SETTING_NAME =
		exports.UI_ABP_PATH =
		exports.MUL_RATIO =
		exports.PROP_RATIO_PER =
		exports.ROBOT_DATA_MIN_ID =
		exports.STRENGTH_MAX_ID =
		exports.RESPONSE_PROFICIENCY_ID =
		exports.DEF_ATTR_ID =
		exports.CRIT_ATTR_ID =
		exports.ATTACK_ATTR_ID =
		exports.HP_ATTR_ID =
			void 0);
const UE = require("ue");
(exports.HP_ATTR_ID = 2),
	(exports.ATTACK_ATTR_ID = 7),
	(exports.CRIT_ATTR_ID = 8),
	(exports.DEF_ATTR_ID = 10),
	(exports.RESPONSE_PROFICIENCY_ID = 13),
	(exports.STRENGTH_MAX_ID = 69),
	(exports.ROBOT_DATA_MIN_ID = 1e5),
	(exports.PROP_RATIO_PER = 1e4),
	(exports.MUL_RATIO = 1 / exports.PROP_RATIO_PER),
	(exports.UI_ABP_PATH =
		"/Game/Aki/Character/Role/Common/ABP_PerformanceRole.ABP_PerformanceRole_C"),
	(exports.ROLE_CAMERA_SETTING_NAME = "1020"),
	(exports.ROLE_CHANGEROLE_BLENDNAME = "10007");
class ArrayIntInt {
	constructor() {
		(this.Ckn = 0), (this.gkn = 0);
	}
}
exports.ArrayIntInt = ArrayIntInt;
class OneSkillEffect {}
exports.OneSkillEffect = OneSkillEffect;
class SkillEffect {}
(exports.SkillEffect = SkillEffect),
	(exports.UI_ROLE_CAN_ROTATE_TABVIEW = [
		"RoleAttributeTabView",
		"RoleFavorTabView",
	]),
	(exports.UI_SCENE_ROLE_TAG = new UE.FName("TsUiSceneRoleActor")),
	(exports.UI_SKELETAL_OBSERVER_TAG = new UE.FName("TsSkeletalObserver")),
	(exports.UI_CAMERA_TAG = new UE.FName("UICineCamera"));
