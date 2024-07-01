"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityAkComponentConfig =
		exports.FoleySynthModel2Config =
		exports.FoleySynthModel1Config =
		exports.FoleySynthModelConfig =
		exports.FoleySynthAllConfig =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CharacterAudioConfigByIdWithDefaultId_1 = require("../../../../../../Core/Define/ConfigQuery/CharacterAudioConfigByIdWithDefaultId"),
	EntityAudioConfigByIdWithZero_1 = require("../../../../../../Core/Define/ConfigQuery/EntityAudioConfigByIdWithZero"),
	FoleySynthBoneConfigById_1 = require("../../../../../../Core/Define/ConfigQuery/FoleySynthBoneConfigById"),
	FoleySynthConfigByIdWithDefaultId_1 = require("../../../../../../Core/Define/ConfigQuery/FoleySynthConfigByIdWithDefaultId"),
	ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	DEFAULT_DB_ID = 0;
class FoleySynthAllConfig {
	constructor() {
		(this.FoleySynthModel1Configs = new Array()),
			(this.FoleySynthModel2Configs = new Array()),
			(this.Model2AccelerationMaxCount = 0),
			(this.Model2VelocityMaxCount = 0),
			(this.CurLoadCount = 0);
	}
	IsLoadSuccess() {
		return 0 === this.CurLoadCount;
	}
}
exports.FoleySynthAllConfig = FoleySynthAllConfig;
class FoleySynthModelConfig {
	constructor() {
		(this.BoneName = void 0), (this.Model = 0);
	}
}
class FoleySynthModel1Config extends (exports.FoleySynthModelConfig =
	FoleySynthModelConfig) {
	constructor() {
		super(...arguments),
			(this.Ceil = 0),
			(this.CeilEvent = ""),
			(this.Floor = 0),
			(this.FloorEvent = ""),
			(this.Rtpc = void 0),
			(this.CeilInterpolation = -0),
			(this.FloorInterpolation = -0);
	}
}
exports.FoleySynthModel1Config = FoleySynthModel1Config;
class FoleySynthModel2Config extends FoleySynthModelConfig {
	constructor() {
		super(...arguments),
			(this.Ceil = 0),
			(this.CeilEvent = ""),
			(this.Floor = 0),
			(this.FloorEvent = ""),
			(this.FloorPrecent = -0),
			(this.RtpcVelMax = void 0),
			(this.RtpcAccMax = void 0),
			(this.RtpcVelDur = void 0),
			(this.CeilInterpolation = -0),
			(this.FloorInterpolation = -0);
	}
}
exports.FoleySynthModel2Config = FoleySynthModel2Config;
class EntityAkComponentConfig extends ConfigBase_1.ConfigBase {
	GetEntityAkComponentConfig(o) {
		if ((o = o.GetComponent(0)))
			return (
				(o = o.EntityPbModelConfigId),
				EntityAudioConfigByIdWithZero_1.configEntityAudioConfigByIdWithZero.GetConfig(
					o,
					o,
					o,
				)
			);
	}
	GetEntityFoleySynthConfig(o) {
		if ((o = o.GetComponent(0))) {
			var e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
				o.GetPbDataId(),
			);
			e = e?.IsTrialRole() ? e.GetRoleId() : o.GetPbDataId();
			if (
				(o =
					FoleySynthConfigByIdWithDefaultId_1.configFoleySynthConfigByIdWithDefaultId.GetConfig(
						0,
						e,
						e,
						e,
					))
			) {
				if (0 !== o.Id) {
					const e = new FoleySynthAllConfig();
					for (const t of o.Model1Config) {
						const o =
							FoleySynthBoneConfigById_1.configFoleySynthBoneConfigById.GetConfig(
								t,
							);
						if (o) {
							const t = new FoleySynthModel1Config();
							(t.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(o.BoneName)),
								(t.Ceil = o.Model1Ceil),
								(t.CeilEvent = o.Model1CeilEventPath),
								(t.Floor = o.Model1Floor),
								(t.FloorEvent = o.Model1FloorEventPath),
								e.CurLoadCount++,
								ResourceSystem_1.ResourceSystem.LoadAsync(
									o.Model1RtpcPath,
									UE.AkRtpc,
									(n) => {
										(t.Rtpc = n),
											e.CurLoadCount--,
											t.Rtpc ||
												(Log_1.Log.CheckWarn() &&
													Log_1.Log.Warn(
														"Audio",
														58,
														"音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
														["Id", o.Id],
														["Path", o.Model1RtpcPath],
													));
									},
								),
								(t.CeilInterpolation = o.Model1CeilInterpolation),
								(t.FloorInterpolation = o.Model1FloorInterpolation),
								e.FoleySynthModel1Configs.push(t);
						} else
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Audio",
									58,
									"音频组件配置表配置的音频骨骼Id无效 /Config/y.音频组件配置表/角色音频配置",
									["Id", t],
									["ConfigId", t],
								);
					}
					for (const t of o.Model2Config) {
						const o =
							FoleySynthBoneConfigById_1.configFoleySynthBoneConfigById.GetConfig(
								t,
							);
						if (o) {
							const t = new FoleySynthModel2Config();
							(t.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(o.BoneName)),
								(t.Ceil = o.Model2Ceil),
								(t.CeilEvent = o.Model2CeilEventPath),
								(t.Floor = o.Model2Floor),
								(t.FloorEvent = o.Model2FloorPath),
								(t.FloorPrecent = o.Model2FloorPrecent),
								e.CurLoadCount++,
								ResourceSystem_1.ResourceSystem.LoadAsync(
									o.Model2RptcVelocityMax,
									UE.AkRtpc,
									(n) => {
										(t.RtpcVelMax = n),
											e.CurLoadCount--,
											t.RtpcVelMax ||
												(Log_1.Log.CheckWarn() &&
													Log_1.Log.Warn(
														"Audio",
														58,
														"音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
														["Id", o.Id],
														["Path", o.Model2RptcVelocityMax],
													));
									},
								),
								e.CurLoadCount++,
								ResourceSystem_1.ResourceSystem.LoadAsync(
									o.Model2RptcAccelerationMax,
									UE.AkRtpc,
									(n) => {
										(t.RtpcAccMax = n),
											e.CurLoadCount--,
											t.RtpcAccMax ||
												(Log_1.Log.CheckWarn() &&
													Log_1.Log.Warn(
														"Audio",
														58,
														"音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
														["Id", o.Id],
														["Path", o.Model2RptcAccelerationMax],
													));
									},
								),
								e.CurLoadCount++,
								ResourceSystem_1.ResourceSystem.LoadAsync(
									o.Model2RptcVelocityDuring,
									UE.AkRtpc,
									(n) => {
										(t.RtpcVelDur = n),
											e.CurLoadCount--,
											t.RtpcVelDur ||
												(Log_1.Log.CheckWarn() &&
													Log_1.Log.Warn(
														"Audio",
														58,
														"音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
														["Id", o.Id],
														["Path", o.Model2RptcVelocityDuring],
													));
									},
								),
								(t.CeilInterpolation = o.Model2CeilInterpolation),
								(t.FloorInterpolation = o.Model2FloorInterpolation),
								e.FoleySynthModel2Configs.push(t);
						} else
							Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Audio",
									58,
									"音频组件配置表配置的音频骨骼Id无效 /Config/y.音频组件配置表/角色音频配置",
									["Id", t],
									["ConfigId", t],
								);
					}
					return (
						(e.Model2AccelerationMaxCount = o.Model2AccMaxCount),
						(e.Model2VelocityMaxCount = o.Model2VelMaxCount),
						e
					);
				}
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Audio",
						58,
						"该角色未在角色音频配置表中配置 /Config/y.音频组件配置表/音频运动实体配置",
						["Id", e],
						["现替换Id", 0],
					);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Audio",
						58,
						"该角色未在角色音频配置表中默认值配置 /Config/y.音频组件配置表/音频运动实体配置",
						["默认值Id", 0],
					);
		}
	}
	GetCharacterAudioConfigByEntity(o) {
		var e;
		if ((o = o.GetComponent(0)))
			return (
				(e = (e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
					o.GetPbDataId(),
				))?.IsTrialRole()
					? e.GetRoleId()
					: o.GetPbDataId()),
				this.GetCharacterAudioConfigByConfigId(e)
			);
	}
	GetCharacterAudioConfigByConfigId(o) {
		var e =
			CharacterAudioConfigByIdWithDefaultId_1.configCharacterAudioConfigByIdWithDefaultId.GetConfig(
				0,
				o,
				o,
				o,
			);
		if (e) {
			if (0 !== e.Id) return e;
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Audio",
					58,
					"该角色未在角色音频配置表中配置 /Config/y.音频组件配置表/角色音频配置 ",
					["Id", o],
					["现替换Id", 0],
				);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Audio",
					58,
					"该角色未在角色音频配置表中默认值配置 /Config/y.音频组件配置表/角色音频配置 ",
					["默认值Id", 0],
				);
	}
}
exports.EntityAkComponentConfig = EntityAkComponentConfig;
