"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorUtil = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class RoleFavorUtil {
	static IsRoleInfo(e) {
		return 1 === e.FavorTabType && 3 !== e.TypeParam;
	}
	static IsRoleBaseInfo(e) {
		return 1 === e.FavorTabType && 1 === e.TypeParam;
	}
	static IsRolePowerFile(e) {
		return 1 === e.FavorTabType && 2 === e.TypeParam;
	}
	static IsSameContentItemData(e, a) {
		return (
			void 0 !== e &&
			void 0 !== a &&
			e.FavorTabType === a.FavorTabType &&
			e.RoleId === a.RoleId &&
			e.TypeParam === a.TypeParam &&
			e.Config.Id === a.Config.Id
		);
	}
	static GetCurLanguageCvName(e) {
		var a =
			ConfigManager_1.ConfigManager.RoleFavorConfig?.GetFavorRoleInfoConfig(e);
		if (void 0 === a) return StringUtils_1.EMPTY_STRING;
		switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
			case CommonDefine_1.CHINESE_ISO639_1:
				return a.CVNameCn;
			case CommonDefine_1.JAPANESE_ISO639_1:
				return a.CVNameJp;
			case CommonDefine_1.ENGLISH_ISO639_1:
				return a.CVNameEn;
			case CommonDefine_1.KOREAN_ISO639_1:
				return a.CVNameKo;
			default:
				return a.CVNameCn;
		}
	}
}
exports.RoleFavorUtil = RoleFavorUtil;
