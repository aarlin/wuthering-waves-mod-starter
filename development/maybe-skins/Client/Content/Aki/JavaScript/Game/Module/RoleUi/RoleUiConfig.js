"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById"),
	MainRoleConfigAll_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigAll"),
	MainRoleConfigByGender_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigByGender"),
	MainRoleConfigById_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	RoleAnimAudioByRoleId_1 = require("../../../Core/Define/ConfigQuery/RoleAnimAudioByRoleId"),
	RoleBreachByBreachGroupId_1 = require("../../../Core/Define/ConfigQuery/RoleBreachByBreachGroupId"),
	RoleBreachByBreachGroupIdAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/RoleBreachByBreachGroupIdAndBreachLevel"),
	RoleExpItemAll_1 = require("../../../Core/Define/ConfigQuery/RoleExpItemAll"),
	RoleExpItemById_1 = require("../../../Core/Define/ConfigQuery/RoleExpItemById"),
	RoleInfoAll_1 = require("../../../Core/Define/ConfigQuery/RoleInfoAll"),
	RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById"),
	RoleInfoByRoleType_1 = require("../../../Core/Define/ConfigQuery/RoleInfoByRoleType"),
	RoleLevelConsumeByConsumeGroupIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/RoleLevelConsumeByConsumeGroupIdAndLevel"),
	RoleQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleQualityInfoById"),
	RoleTagAll_1 = require("../../../Core/Define/ConfigQuery/RoleTagAll"),
	RoleTagById_1 = require("../../../Core/Define/ConfigQuery/RoleTagById"),
	RoleTrainingDegreeByDifficultyLevel_1 = require("../../../Core/Define/ConfigQuery/RoleTrainingDegreeByDifficultyLevel"),
	TrialRoleInfoByGroupId_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoByGroupId"),
	TrialRoleInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RoleDefine_1 = require("./RoleDefine");
class RoleConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.kmo = new Map());
	}
	GetRoleName(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	LimitStringCount() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"character_name_def_limit",
		);
	}
	GetRoleResonanceGrowthDescribe(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetRoleConfig(e) {
		let o = e;
		if (e > RoleDefine_1.ROBOT_DATA_MIN_ID) {
			let n = this.GetTrialRoleConfigByGroupId(e);
			(n = n || this.GetTrialRoleConfig(e)), (o = n.ParentId);
		}
		return RoleInfoById_1.configRoleInfoById.GetConfig(o);
	}
	GetRoleHeadIcon(e, o = !1) {
		return (e = this.GetRoleConfig(e)), o ? e.RoleHeadIconBig : e.RoleHeadIcon;
	}
	GetRoleTrialGroupId(e) {
		if (
			(e =
				TrialRoleInfoByGroupId_1.configTrialRoleInfoByGroupId.GetConfigList(
					e,
				)) &&
			!(e.length <= 0)
		) {
			var o,
				n = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
			let r,
				i = n - e[0].WorldLevel;
			for (const l of e) {
				if (l.WorldLevel === n) return l;
				l.WorldLevel > n || ((o = n - l.WorldLevel) <= i && ((i = o), (r = l)));
			}
			return r;
		}
	}
	GetDamageConfig(e) {
		return DamageById_1.configDamageById.GetConfig(BigInt(e));
	}
	GetRoleBreachList(e) {
		return RoleBreachByBreachGroupId_1.configRoleBreachByBreachGroupId.GetConfigList(
			e,
		);
	}
	GetRoleBreachConfig(e, o) {
		return RoleBreachByBreachGroupIdAndBreachLevel_1.configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig(
			e,
			o,
		);
	}
	GetRoleExpItemList() {
		return RoleExpItemAll_1.configRoleExpItemAll.GetConfigList();
	}
	GetRoleExpItemExp(e) {
		return RoleExpItemById_1.configRoleExpItemById.GetConfig(e)?.BasicExp;
	}
	GetRolePerformanceDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"action_stand_show_time",
		);
	}
	GetRoleHuluModelId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"role_panel_using_model",
		);
	}
	GetRoleAudioMap(e) {
		return RoleAnimAudioByRoleId_1.configRoleAnimAudioByRoleId.GetConfigList(e);
	}
	GetRoleList() {
		return RoleInfoAll_1.configRoleInfoAll.GetConfigList();
	}
	GetRoleListByType(e) {
		return RoleInfoByRoleType_1.configRoleInfoByRoleType.GetConfigList(e);
	}
	GetResonAnimationInterval() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"role_reson_animation_interval",
		);
	}
	GetRoleLevelUpSuccessDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"RoleLevelUpSuccessDelayTime",
		);
	}
	GetRoleBreachSuccessDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"RoleBreachSuccessDelayTime",
		);
	}
	GetWeaponLevelUpSuccessDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"WeaponLevelUpSuccessDelayTime",
		);
	}
	GetWeaponBreachDaDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"WeaponBreachChangeDelay",
		);
	}
	GetRoleElementSwitchDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"RoleElementSwitchDelayTime",
		);
	}
	GetRoleElementTransferFunctionId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"RoleElementTransferFunctionId",
		);
	}
	GetRoleGenderSwitchDelayTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"RoleGenderSwitchDelayTime",
		);
	}
	GetRoleLevelConsume(e, o) {
		return RoleLevelConsumeByConsumeGroupIdAndLevel_1.configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig(
			e,
			o,
		);
	}
	GetRoleQualityInfo(e) {
		return RoleQualityInfoById_1.configRoleQualityInfoById.GetConfig(e);
	}
	GetTrialRoleConfig(e) {
		return TrialRoleInfoById_1.configTrialRoleInfoById.GetConfig(e);
	}
	GetTrialRoleConfigByGroupId(e) {
		return this.GetRoleTrialGroupId(e);
	}
	GetTrialRoleIdConfigByGroupId(e) {
		var o = this.GetRoleTrialGroupId(e);
		return o ? o.Id : e;
	}
	GetRoleTrainingDegreeConfig(e) {
		return RoleTrainingDegreeByDifficultyLevel_1.configRoleTrainingDegreeByDifficultyLevel.GetConfig(
			e,
		);
	}
	GetMainRoleByGender(e) {
		return MainRoleConfigByGender_1.configMainRoleConfigByGender.GetConfigList(
			e,
		);
	}
	GetMainRoleById(e) {
		return MainRoleConfigById_1.configMainRoleConfigById.GetConfig(e);
	}
	GetAllMainRoleConfig() {
		return MainRoleConfigAll_1.configMainRoleConfigAll.GetConfigList();
	}
	GetRoleTagConfig(e) {
		return RoleTagById_1.configRoleTagById.GetConfig(e);
	}
	GetAllRoleTagList() {
		const e = [];
		return (
			this.GetAllRoleTagConfig().forEach((o) => {
				e.push(o.Id);
			}),
			e
		);
	}
	GetAllRoleTagConfig() {
		return RoleTagAll_1.configRoleTagAll.GetConfigList();
	}
	OnClear() {
		return this.kmo.clear(), !0;
	}
}
exports.RoleConfig = RoleConfig;
