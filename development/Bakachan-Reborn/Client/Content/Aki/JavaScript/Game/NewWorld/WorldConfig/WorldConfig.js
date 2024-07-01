"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldConfig = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	LockOnConfigById_1 = require("../../../Core/Define/ConfigQuery/LockOnConfigById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ROLE_COMMON_SKILLINFO_PATH =
		"/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
	MOMSTER_COMMON_SKILLINFO_PATH =
		"/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo",
	VISION_COMMON_SKILLINFO_PATH =
		"/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo",
	COMMON_BULLET_PATH =
		"/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain",
	COMMON_HIT_EFFECT_PATH =
		"/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
	CAUGHT_DATA_PATH = "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo",
	CHARACTERFIGHTINFO_DATA_PATH =
		"/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo";
class WorldConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.tsr = void 0),
			(this.isr = void 0),
			(this.osr = void 0),
			(this.rsr = void 0),
			(this.nsr = void 0),
			(this.ssr = void 0),
			(this.asr = void 0),
			(this.hsr = void 0),
			(this.lsr = void 0),
			(this._sr = void 0);
	}
	OnInit() {
		this.usr = new Map();
		var e = UE.DataTableUtil_C.LoadAllSkillMontages(
			GlobalData_1.GlobalData.World,
		);
		for (let s = 0; s < e.Num(); ++s) {
			var t = e.Get(s);
			if (0 !== t.CharacterPath.length) {
				let e = this.usr.get(t.CharacterPath);
				e || ((e = new Map()), this.usr.set(t.CharacterPath, e)),
					0 < t.CommonAnim.ToAssetPathName().length &&
					"None" !== t.CommonAnim.ToAssetPathName()
						? e.set(t.MontageName, t.CommonAnim)
						: 0 < t.BaseAnim.ToAssetPathName().length &&
							"None" !== t.BaseAnim.ToAssetPathName() &&
							e.set(t.MontageName, t.BaseAnim);
			}
		}
		return !0;
	}
	GetLockOnConfig(e) {
		return LockOnConfigById_1.configLockOnConfigById.GetConfig(e);
	}
	GetRoleCommonSkillInfo() {
		if (!this.tsr) {
			this.tsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				ROLE_COMMON_SKILLINFO_PATH,
				UE.DataTable,
			);
			var e = (0, puerts_1.$ref)(void 0),
				t =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.tsr, e),
					(0, puerts_1.$unref)(e));
			this.isr = new Array();
			for (let e = 0; e < t.Num(); e++) {
				var s = t.Get(e);
				this.isr.push(s.toString());
			}
		}
		return this.tsr;
	}
	GetRoleCommonSkillRowNames() {
		return this.isr || this.GetRoleCommonSkillInfo(), this.isr;
	}
	GetMonsterCommonSkillInfo() {
		if (!this.osr) {
			this.osr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				MOMSTER_COMMON_SKILLINFO_PATH,
				UE.DataTable,
			);
			var e = (0, puerts_1.$ref)(void 0),
				t =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.osr, e),
					(0, puerts_1.$unref)(e));
			this.rsr = new Array();
			for (let e = 0; e < t.Num(); e++) {
				var s = t.Get(e);
				this.rsr.push(s.toString());
			}
		}
		return this.osr;
	}
	GetMonsterCommonSkillRowNames() {
		return this.rsr || this.GetMonsterCommonSkillInfo(), this.rsr;
	}
	GetVisionCommonSkillInfo() {
		if (!this.nsr) {
			this.nsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				VISION_COMMON_SKILLINFO_PATH,
				UE.DataTable,
			);
			var e = (0, puerts_1.$ref)(void 0),
				t =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(this.nsr, e),
					(0, puerts_1.$unref)(e));
			this.ssr = new Array();
			for (let e = 0; e < t.Num(); e++) {
				var s = t.Get(e);
				this.ssr.push(s.toString());
			}
		}
		return this.nsr;
	}
	GetVisionCommonSkillRowNames() {
		return this.ssr || this.GetVisionCommonSkillInfo(), this.ssr;
	}
	GetCaughtDataInfo() {
		return (
			this.lsr ||
				(this.lsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					CAUGHT_DATA_PATH,
					UE.DataTable,
				)),
			this.lsr
		);
	}
	GetCommonBulletData() {
		return (
			this.asr ||
				(this.asr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					COMMON_BULLET_PATH,
					UE.DataTable,
				)),
			this.asr
		);
	}
	GetCommonHitEffectData() {
		return (
			this.hsr ||
				(this.hsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					COMMON_HIT_EFFECT_PATH,
					UE.DataTable,
				)),
			this.hsr
		);
	}
	GetSkillMontage(e, t) {
		if (this.usr && (e = this.usr.get(e))) return e.get(t);
	}
	GetMontageMap(e) {
		if (this.usr) return this.usr.get(e);
	}
	GetCharacterFightInfo(e) {
		return (
			this._sr ||
				(this._sr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					CHARACTERFIGHTINFO_DATA_PATH,
					UE.DataTable,
				)),
			DataTableUtil_1.DataTableUtil.GetDataTableRow(this._sr, e)
		);
	}
	ClearCommonSkillData() {
		(this.tsr = void 0),
			(this.osr = void 0),
			(this.asr = void 0),
			(this.nsr = void 0),
			(this.lsr = void 0),
			(this._sr = void 0);
	}
	GetRoleConfig(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
	}
	OnClear() {
		return this.ClearCommonSkillData(), !0;
	}
}
exports.WorldConfig = WorldConfig;
