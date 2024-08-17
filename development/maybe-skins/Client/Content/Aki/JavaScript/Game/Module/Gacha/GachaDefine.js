"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaSelectionViewData =
		exports.GachaPoolData =
		exports.GachaRecord =
		exports.textKeyMap =
		exports.GACHA_NO_RECORD =
		exports.GACHA_RECORD_LIMIT =
		exports.GACHA_TYPE =
		exports.GACHA_RECORD =
		exports.GACHA_TEXT =
		exports.POOL_TIME_LIMIT =
		exports.POOL_RESIDENT =
		exports.POOL_TOTAL_REST_COUNT =
		exports.POOL_TODAY_REST_COUNT =
		exports.TOTAL_REST_COUNT =
		exports.GACHA_TEN =
		exports.GACHA_ONE =
		exports.ROLE_FUNCTION_ITEM =
		exports.GACHA_3D_SCENE_PATH =
		exports.GACHA_WEAPON_CASE =
		exports.GACHA_ROLE_CASE =
		exports.GACHA_BLEND_CAMERA =
		exports.CACHA_RESUOT_CAMERA =
		exports.GACHA_WEAPON_CAMERA_TARGET =
		exports.GACHA_WEAPON_CAMERA =
		exports.GACHA_RECORD_CAMERA =
		exports.GACHA_ROLE_CAMERA_TARGET =
		exports.GACHA_ROLE_CAMERA =
			void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
(exports.GACHA_ROLE_CAMERA = "1035"),
	(exports.GACHA_ROLE_CAMERA_TARGET = "-1035"),
	(exports.GACHA_RECORD_CAMERA = "1040"),
	(exports.GACHA_WEAPON_CAMERA = "1041_New"),
	(exports.GACHA_WEAPON_CAMERA_TARGET = "-1041"),
	(exports.CACHA_RESUOT_CAMERA = "1043"),
	(exports.GACHA_BLEND_CAMERA = "10007"),
	(exports.GACHA_ROLE_CASE = "RoleCase"),
	(exports.GACHA_WEAPON_CASE = "WeaponCase"),
	(exports.GACHA_3D_SCENE_PATH =
		"/Game/Aki/Map/Level/Function/ChouKa/Art/Instance_ChouKa_01"),
	(exports.ROLE_FUNCTION_ITEM = 5),
	(exports.GACHA_ONE = 1),
	(exports.GACHA_TEN = 10),
	(exports.TOTAL_REST_COUNT = "GachaTotalRestCount"),
	(exports.POOL_TODAY_REST_COUNT = "GachaPoolTodayRestCount"),
	(exports.POOL_TOTAL_REST_COUNT = "GachaPoolTotalRestCount"),
	(exports.POOL_RESIDENT = "PoolResident"),
	(exports.POOL_TIME_LIMIT = "PoolTimeLimit"),
	(exports.GACHA_TEXT = "GachaText"),
	(exports.GACHA_RECORD = "GachaRecord"),
	(exports.GACHA_TYPE = "GachaType"),
	(exports.GACHA_RECORD_LIMIT = "GachaRecordLimit"),
	(exports.GACHA_NO_RECORD = "GachaNoRecord"),
	(exports.textKeyMap = { 0: "Role", 1: "Weapon" });
class GachaRecord {
	constructor() {
		(this.u5n = void 0), (this.f5n = 0), (this.RuleGroupId = 0);
	}
}
exports.GachaRecord = GachaRecord;
class GachaPoolData {
	constructor(A, o) {
		(this.GachaInfo = A), (this.PoolInfo = o);
	}
}
exports.GachaPoolData = GachaPoolData;
class GachaSelectionViewData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.GachaInfo = void 0);
	}
}
exports.GachaSelectionViewData = GachaSelectionViewData;
