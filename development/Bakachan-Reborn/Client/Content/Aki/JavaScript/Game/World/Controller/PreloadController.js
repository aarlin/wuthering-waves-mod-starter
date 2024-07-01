"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PreloadController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Queue_1 = require("../../../Core/Container/Queue"),
	AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
	AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
	GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
	NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
	RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
	SplineMoveComponent_1 = require("../../NewWorld/Common/Component/SplineMoveComponent"),
	RenderConfig_1 = require("../../Render/Config/RenderConfig"),
	PreloadModel_1 = require("../Model/PreloadModel"),
	PreloadConstants_1 = require("./PreloadConstants"),
	VISION_DATA_PATH = "/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
	commonMajorPaths = [
		"/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain",
		"/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
		"/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
		"/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
		"/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo",
		"/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo",
		"/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo",
		"/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo",
		"/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig",
	],
	commonOtherPaths = [
		"/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightPutong.SP_FightPutong",
		"/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C",
		"/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_001.NS_Fx_LGUI_FightQTE_001",
		"/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_002.NS_Fx_LGUI_FightQTE_002",
		"/Game/Aki/Effect/MaterialController/Common/DA_Fx_Character_ChangeRole.DA_Fx_Character_ChangeRole",
		"/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning.BP_Fx_Scanning_C",
		"/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C",
		"/Game/Aki/Data/Fight/BulletCampAsset/DT_AllBulletCampAsset.DT_AllBulletCampAsset",
		"/Game/Aki/Data/Fight/BulletDataAsset/DT_AllBulletLogicTypeNew.DT_AllBulletLogicTypeNew",
		"/Game/Aki/Data/Fight/CommonGB/DT_AllKuroBpDataGroup.DT_AllKuroBpDataGroup",
		"/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Control_Obj_Beam.NS_Fx_Control_Obj_Beam",
		"/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluWarning.DA_Fx_HuluWarning",
		"/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte",
		"/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor",
		"/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole",
		RenderConfig_1.RenderConfig.CharMaterialContainerDataPath,
		RenderConfig_1.RenderConfig.EmptyMaterialPath,
		RoleDefine_1.UI_ABP_PATH,
		NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH,
		NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH,
		AutoAttachDefine_1.INERTIA_CURVE_PATH,
		AutoAttachDefine_1.VELOCITY_CURVE_PATH,
		AutoAttachDefine_1.BOUNDARY_CURVE_PATH,
		PreloadConstants_1.ACC_LERP_CURVE_PATH,
		PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH,
		PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH,
		PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH,
		SplineMoveComponent_1.SplineMoveComponent.DaPath,
		PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
		PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
		PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH,
	],
	commonEffectPaths = [
		"/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig",
		"/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Control_Obj_Hand.DA_Fx_Group_Control_Obj_Hand",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Animal_Vanish.DA_Fx_Animal_Vanish",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Qidong00.DA_Fx_Group_XieZou_Qidong00",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Gaowen00.DA_Fx_Group_XieZou_Gaowen00",
		"/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart",
		"/Game/Aki/Effect/MaterialController/Common/DA_Fx_TimeFreeze_LimitDodge.DA_Fx_TimeFreeze_LimitDodge",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Press_Smoke.DA_Fx_Group_Press_Smoke",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_Lock.DA_Fx_Group_Hook_Miaodian_Lock",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_LockDown.DA_Fx_Group_Hook_Miaodian_LockDown",
		"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play",
	],
	animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase)),
	animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent)),
	animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
	animBuffList = new Array(),
	COMMON_STATE_MACHINE = "SM_Common",
	NEED_PRELOAD_DISTANCE = 4e6;
class PreloadController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
	static DoPreload(e, t) {
		var o = ModelManager_1.ModelManager.PreloadModel;
		if (o.IsUsePreload) {
			o.HoldPreloadObject.Clear(), (o.ResourcesLoadTime.length = 0);
			const a = ModelManager_1.ModelManager.GameModeModel;
			a.PreloadCommonProfiler.Restart(),
				this.Q0r((o) => {
					o
						? (a.PreloadCommonProfiler.Stop(),
							a.PreloadEntitiesProfiler.Restart(),
							e(!0),
							this.X0r(
								ModelManager_1.ModelManager.GameModeModel
									.PreloadEntitiesProfiler,
								(e) => {
									ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(),
										t(e);
								},
							))
						: (a.PreloadCommonProfiler.Stop(), e(!1), t?.(!1));
				});
		} else e(!0), t(!0);
	}
	static Q0r(e) {
		var t = ModelManager_1.ModelManager.PreloadModel;
		const o = ConfigManager_1.ConfigManager.WorldConfig;
		var a = ModelManager_1.ModelManager.GameModeModel;
		const r = t.CommonAssetElement;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(开始)"),
			this.$0r(a.PreloadCommonProfiler, (t) => {
				if (t) {
					(t =
						ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild(
							"搜集公共资源的次要资源",
							!0,
						)).Start(),
						o.GetRoleCommonSkillInfo(),
						o.GetMonsterCommonSkillInfo(),
						o.GetVisionCommonSkillInfo(),
						o.GetCommonBulletData();
					for (const e of commonOtherPaths) r.AddOtherAsset(e);
					for (const e of DataTableUtil_1.dataTablePaths.values())
						r.AddOtherAsset(e);
					for (const e of commonEffectPaths) r.AddEffectAsset(e);
					var a =
						AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
							"SM_Common",
						);
					for (const e of JSON.parse(a.StateMachineJson).Nodes)
						this.CollectAssetByStateMachineNode(r, e);
					t.Stop();
					const s =
						ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild(
							"加载公共资源次要资源",
							!0,
						);
					s.Restart(),
						this.CheckPreloadByAssetElement(
							r,
							s,
							(t) => {
								s.Stop(),
									t
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"Preload",
													3,
													"预加载:PreloadLoadCommon(结束)",
												),
											e(!0))
										: (Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"World",
													3,
													"[PreloadManager.PreloadLoadCommon] 预加载公共资源失败。",
												),
											e(!1));
							},
							0,
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[PreloadManager.PreloadLoadCommon] 预加载公共资源Major失败。",
						),
						e(!1);
			});
	}
	static $0r(e, t) {
		var o = ModelManager_1.ModelManager.PreloadModel.CommonAssetElement;
		const a = e.CreateChild("收集并加载公共的主要资源", !0);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(开始)"),
			a.Restart();
		for (const e of commonMajorPaths) o.AddMajorAsset(e);
		var r = new Array();
		for (const e of o.MajorAssets) r.push(e);
		this.J0r(o, o.MajorAssets, r, a, (e, o) => {
			a.Stop(),
				e
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(结束)"),
						t?.(e))
					: t(!1);
		});
	}
	static X0r(e, t) {
		const o = ModelManager_1.ModelManager.PreloadModel;
		if (o.LoadAssetOneByOneState) this.z0r(e, t);
		else {
			var a = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
			if (0 === a.length) t(!0);
			else {
				var r = Vector_1.Vector.Create(
						ModelManager_1.ModelManager.GameModeModel.BornLocation,
					),
					s = Vector_1.Vector.Create(),
					n = new Array();
				for (const e of a) {
					var i = e.Entity.GetComponent(0);
					e.IsInit ||
						i.GetLoading() ||
						i.GetRemoveState() ||
						i.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom ||
						((i.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
							((i = i.GetLocation()),
							(s.X = i.X),
							(s.Y = i.Y),
							(s.Z = i.Z),
							Vector_1.Vector.DistSquared(r, s) <= 4e6)) &&
							(n.push(e), o.AddNeedWaitEntity(e.Id)));
				}
				let l = n.length;
				if (
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Preload",
							3,
							"过滤需要预加载的实体",
							["当前实体总数", a.length],
							["需要预加载的实体个数", l],
						),
					0 === l)
				)
					t(!0);
				else
					for (const a of n) {
						const r = a.Entity.GetComponent(0);
						a.IsInit ||
							r.GetLoading() ||
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Preload",
									3,
									"预加载实体:开始",
									["CreatureDataId", r.GetCreatureDataId()],
									["PbDataId", r.GetPbDataId()],
									["Reason", "PreloadController.PreloadEntities"],
									["Count", l],
								),
							this.PreloadEntity(a, e, (e) => {
								l--,
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Preload",
											3,
											"预加载实体:结束",
											["CreatureDataId", r.GetCreatureDataId()],
											["PbDataId", r.GetPbDataId()],
											["预加载结果", e],
											["调用代码位置", "PreloadController.PreloadEntities"],
											["Count", l],
										),
									o.RemoveNeedWaitEntity(a.Id),
									l <= 0 && t?.(e);
							}));
					}
			}
		}
	}
	static z0r(e, t) {
		var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		let a;
		e &&
			(a = e.CreateChild("逐个加载Entity，实体个数:" + o.length, !0)).Start();
		var r = new Array();
		for (const e of o) r.push(e);
		this.Z0r(r, 0, a, (e) => {
			a?.Stop(), t(e);
		});
	}
	static Z0r(e, t, o, a) {
		var r, s;
		t >= e.length
			? a(!0)
			: ((s = (r = e[t]).Entity.GetComponent(0)),
				!r || s.GetRemoveState()
					? this.Z0r(e, t + 1, o, (e) => {
							a(e);
						})
					: this.PreloadEntity(r, o, (r) => {
							r
								? t < e.length
									? this.Z0r(e, t + 1, o, (e) => {
											a(e);
										})
									: a(!0)
								: a(!1);
						}));
	}
	static PreloadEntity(e, t, o) {
		if (ModelManager_1.ModelManager.PreloadModel.IsUsePreload) {
			const a = e.Entity.GetComponent(0);
			let r, s, n, i, l;
			if (
				(t &&
					((r = t.CreateChild(
						`预加载实体, CreatureDataId:${a.GetCreatureDataId()}, PbDataId:` +
							a.GetPbDataId(),
						!0,
					)),
					(s = r.CreateChild("搜集实体主要资源", !0)),
					(n = r.CreateChild("搜集实体次要资源", !0)),
					(i = r.CreateChild("预加载实体主要资源", !0)),
					(l = r.CreateChild("预加载实体次要资源", !0))),
				r?.Start(),
				a.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom)
			)
				r?.Stop(), o?.(!0);
			else {
				s?.Start();
				const t = this.efr(e);
				t
					? (r?.SetDescribe(
							t.CharacterPath + ", 优先级:" + t.GetLoadPriority(),
						),
						s?.Stop(),
						t && 3 === t.LoadState
							? (r?.Stop(), o?.(!0))
							: 0 !== t.LoadState
								? (r?.Stop(), o?.(!1))
								: ((t.LoadState = 1),
									a.GetEntityType() ===
										Protocol_1.Aki.Protocol.HBs.Proto_Player &&
										Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Preload",
											3,
											"预加载实体:预加载主要资源（开始）",
											["CreatureDataId", a.GetCreatureDataId()],
											["PbDataId", a.GetPbDataId()],
										),
									i?.Start(),
									this.tfr(t, i, (e) => {
										i?.Stop(),
											a.GetEntityType() ===
												Protocol_1.Aki.Protocol.HBs.Proto_Player &&
												Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"Preload",
													3,
													"预加载实体:预加载主要资源（结束）",
													["CreatureDataId", a.GetCreatureDataId()],
													["PbDataId", a.GetPbDataId()],
													["结果", e],
												),
											e
												? t && 4 !== t.LoadState
													? (n?.Start(),
														this.ifr(t)
															? (n?.Stop(),
																a.GetEntityType() ===
																	Protocol_1.Aki.Protocol.HBs.Proto_Player &&
																	Log_1.Log.CheckInfo() &&
																	Log_1.Log.Info(
																		"Preload",
																		3,
																		"预加载实体:预加载次要资源（开始）",
																		["CreatureDataId", a.GetCreatureDataId()],
																		["PbDataId", a.GetPbDataId()],
																	),
																l?.Start(),
																this.CheckPreloadByAssetElement(
																	t,
																	l,
																	(e) => {
																		l?.Stop(),
																			a.GetEntityType() ===
																				Protocol_1.Aki.Protocol.HBs
																					.Proto_Player &&
																				Log_1.Log.CheckInfo() &&
																				Log_1.Log.Info(
																					"Preload",
																					3,
																					"预加载实体:预加载次要资源（结束）",
																					[
																						"CreatureDataId",
																						a.GetCreatureDataId(),
																					],
																					["PbDataId", a.GetPbDataId()],
																					["结果", e],
																				),
																			t && 4 !== t.LoadState
																				? e
																					? ((t.LoadState = 3),
																						r?.Stop(),
																						a.SetPreloadFinished(!0),
																						EventSystem_1.EventSystem.Emit(
																							EventDefine_1.EEventName
																								.PreloadEntityFinished,
																							t.EntityHandle,
																						),
																						o?.(!0))
																					: (Log_1.Log.CheckError() &&
																							Log_1.Log.Error(
																								"World",
																								3,
																								"[PreloadManager.PreloadEntity] 预加载实体次要资源是失败。",
																								[
																									"CreatureDataId",
																									a?.GetCreatureDataId(),
																								],
																								["PbDataId", a?.GetPbDataId()],
																							),
																						o?.(!1))
																				: o?.(!1);
																	},
																	0,
																))
															: (n?.Stop(), r?.Stop(), o?.(!1)))
													: (r?.Stop(), o?.(!1))
												: (Log_1.Log.CheckError() &&
														Log_1.Log.Error(
															"World",
															3,
															"[PreloadManager.PreloadEntity] 预加载实体失败。",
															["CreatureDataId", a.GetCreatureDataId()],
															["PbDataId", a.GetPbDataId()],
														),
													r?.Stop(),
													o?.(!1));
									})))
					: (s?.Stop(), r?.Stop(), o?.(!1));
			}
		} else o(!0);
	}
	static RemovePreloadEntity(e) {
		var t = ModelManager_1.ModelManager.PreloadModel,
			o = t.AllEntityAssetMap.get(e);
		if (o && 4 !== o.LoadState) {
			(o.LoadState = 4),
				t.HoldPreloadObject.RemoveEntityAssets(o.EntityHandle.Id);
			for (const e of o.AssetPathSet) t.RemovePreloadResource(e);
			t.RemoveEntityAsset(e);
		}
	}
	static HasAsset(e) {
		return ModelManager_1.ModelManager.PreloadModel.PreloadAssetMap.has(e);
	}
	static IsEntityPreload(e) {
		return ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.has(e);
	}
	static tfr(e, t, o) {
		if (e.MajorAssets.size) {
			var a = new Array();
			for (const t of e.MajorAssets) a.push(t);
			this.J0r(e, e.MajorAssets, a, t, (t, a) => {
				t && (a = a.get(e.BlueprintClassPath))?.IsValid()
					? (this.ofr(e, a), o?.(t))
					: o(!1);
			});
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Preload",
					3,
					"实体预加载主要资源MajorAssets为空。",
					["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
					["PbDataId", e.CreatureDataComponent.GetPbDataId()],
					["ModelId", e.CreatureDataComponent.GetModelId()],
				),
				o?.(!1);
	}
	static EntityIsDone(e) {
		return (
			3 ===
			ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(e)
				?.LoadState
		);
	}
	static efr(e) {
		var t = e.Entity.GetComponent(0),
			o = ModelManager_1.ModelManager.PreloadModel,
			a = o.AllEntityAssetMap.get(t.GetCreatureDataId());
		if (a) return a;
		((a = new PreloadModel_1.EntityAssetElement(e)).LoadState = 0),
			o.AddEntityAsset(t.GetCreatureDataId(), a);
		const r = t.GetModelConfig();
		if (r) {
			if (
				(t.ModelBlueprintPath?.length &&
					((a.BlueprintClassPath = t.ModelBlueprintPath),
					a.AddMajorAsset(t.ModelBlueprintPath)),
				0 < (e = r.蓝图.ToAssetPathName()).length &&
					((o = (a.BlueprintClassPath = e).lastIndexOf("/")),
					(a.CharacterPath = e.substring(0, o)),
					a.AddMajorAsset(e)),
				t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
					t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
					t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Vision)
			) {
				if (!(o = a.BlueprintClassPath) || 0 === o.length || "None" === o) {
					if (
						((e = t.GetModelId()),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								3,
								"[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图。",
								["CreatureDataId", t.GetCreatureDataId()],
								["PbDataId", t.GetPbDataId()],
								["ModelId", e],
								["BlueprintClassPath", o],
							),
						GlobalData_1.GlobalData.IsPlayInEditor)
					) {
						const t = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
							0,
							e.toString(),
						);
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								3,
								"[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图(直接从表中查询)。",
								["ModelId", e],
								["BlueprintClassPath", t?.蓝图.ToAssetPathName()],
							);
					}
					return;
				}
				(e =
					ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(o)),
					(o = e?.SkillDataTable.ToAssetPathName()),
					o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
					(o = e?.BulletDataTable.ToAssetPathName()),
					o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
					(o = e?.PartHitEffect?.ToAssetPathName()),
					o &&
						0 < o.length &&
						"None" !== o &&
						((a.PartHitEffectPath = o), a.AddMajorAsset(o)),
					(o = e?.HitEffectTable.ToAssetPathName()),
					o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
					0 !== (o = this.GetCurCharacterLoadType()) &&
						(this.VBn(e?.SkillDataTableMap, o, a),
						this.VBn(e?.BulletDataTableMap, o, a),
						this.VBn(e?.HitEffectTableMap, o, a));
			}
			return a;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"World",
				3,
				"[PreloadManager.CollectAssetByCreatureMajor] 不存在实体配置表，预加载失败。",
				["CreatureDataId", t.GetCreatureDataId()],
				["PbDataId", t.GetPbDataId()],
			);
	}
	static VBn(e, t, o) {
		e &&
			(e = e.Get(t)?.ToAssetPathName()) &&
			0 < e.length &&
			"None" !== e &&
			o.AddMajorAsset(e);
	}
	static ifr(e) {
		var t, o, a, r;
		return (
			!e.CollectMinorAsset &&
			((e.CollectMinorAsset = !0),
			(t = this.nfr(e)),
			(o = this.sfr(e)),
			(a = this.CollectAssetByBullet(e)),
			(r = this.CollectAssetByStateMachine(e)),
			this.afr(e),
			this.hfr(e),
			t) &&
			o &&
			a &&
			r
		);
	}
	static CheckPreloadByAssetElement(e, t, o, a = 0) {
		let r;
		(r = t
			? t.CreateChild(
					`CheckPreloadByAssetElement 层:${a} 个数:` + e.NeedLoadCount(),
					!0,
				)
			: r)?.Start(),
			e.NeedLoadCount()
				? ((t = new Queue_1.Queue()),
					0 < e.OtherAssetSet.size && t.Push([6, e.OtherAssetSet]),
					0 < e.AnimationAssetSet.size && t.Push([0, e.AnimationAssetSet]),
					0 < e.AnimationBlueprintClassAssetSet.size &&
						t.Push([5, e.AnimationBlueprintClassAssetSet]),
					0 < e.MeshAssetSet.size && t.Push([3, e.MeshAssetSet]),
					0 < e.AudioAssetSet.size && t.Push([2, e.AudioAssetSet]),
					0 < e.EffectAssetSet.size &&
						(PreCreateEffect_1.PreCreateEffect.IsNeedPreCreateEffect()
							? t.Push([1, e.EffectAssetSet])
							: e.EffectAssetSet.clear()),
					this.lfr(e, r, t, (t) => {
						e.NeedLoadCount()
							? this.CheckPreloadByAssetElement(
									e,
									r,
									(e) => {
										o(e);
									},
									a + 1,
								)
							: (r?.Stop(), o(!e.HasError));
					}))
				: (r?.Stop(), o(!0));
	}
	static lfr(e, t, o, a) {
		if (0 === o.Size) a(!0);
		else {
			var r = o.Pop();
			const n = r[0];
			let i;
			if (
				((r = r[1]),
				(i = t
					? t.CreateChild(
							PreloadModel_1.preloadAssetTypeForName.get(n) + " 个数:" + r.size,
							!0,
						)
					: i)?.Start(),
				0 === r.size)
			)
				i?.Stop(), a(!0);
			else {
				var s = new Array();
				for (const e of r) s.push(e);
				this.J0r(e, r, s, i, (r, s) => {
					if ((i?.Stop(), r || (e.HasError = !0), 0 === n)) {
						for (var [, l] of ((animBuffList.length = 0), s))
							l.IsA(UE.AnimMontage.StaticClass())
								? this._fr(e, l, animBuffList)
								: l.IsA(UE.AnimSequenceBase.StaticClass()) &&
									this.ufr(e, l, animBuffList);
						this.CollectAssetByBuffIdList(e, animBuffList);
					}
					if (1 === n)
						for (var [f, d] of s)
							d.IsA(UE.EffectModelBase.StaticClass()) &&
								e instanceof PreloadModel_1.EntityAssetElement &&
								ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
									e.EntityHandle.Id,
									f,
								),
								this.mfr(e, d);
					if (5 === n) for (var [, C] of s) this.dfr(e, C);
					0 === o.Size
						? a(r)
						: this.lfr(e, t, o, (e) => {
								a(e);
							});
				});
			}
		}
	}
	static J0r(e, t, o, a, r) {
		var s = ModelManager_1.ModelManager.PreloadModel;
		if (s.LoadAssetOneByOneState) this.LoadAssetsOneByOne(e, t, o, a, r);
		else {
			let n,
				i = ((n = a ? a.CreateChild("批量预加载资源", !0) : n)?.Start(), 0),
				l = 0;
			const f = new Map();
			for (const a of o)
				t.delete(a),
					s.AddPreloadResource(a),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						a,
						UE.Object,
						(t, a) => {
							t?.IsValid()
								? (i++, e.AddObject(a, t), f.set(a, t))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"World",
											3,
											"[PreloadManager.PreloadAssetsInternal] 批量预加载资源失败，asset.IsValid() = false。",
											["Path", a],
										),
									l++),
								l + i < o.length || (n?.Stop(), r?.(0 === l, f));
						},
						e.GetLoadPriority(),
					);
		}
	}
	static LoadAssetsOneByOne(e, t, o, a, r) {
		let s;
		a &&
			(s = a.CreateChild("逐个加载资源列表，资源个数:" + t.size, !0)).Start();
		const n = new Map();
		this.LoadAssetsRecursive(e, t, o, 0, s, n, (e) => {
			s?.Stop(), r(e, n);
		});
	}
	static LoadAssetsRecursive(e, t, o, a, r, s, n) {
		if (0 === o.length || a === o.length) n(!0);
		else {
			const i = o[a];
			let l;
			r && (l = r.CreateChild(`加载资源:${i} `, !0)).Start(),
				t.delete(i),
				ModelManager_1.ModelManager.PreloadModel.AddPreloadResource(i),
				ResourceSystem_1.ResourceSystem.LoadAsync(
					i,
					UE.Object,
					(f, d) => {
						l?.Stop(),
							ModelManager_1.ModelManager.PreloadModel.AddResourcesLoadTime([
								d,
								l ? l.Time : 0,
							]),
							f
								? f.IsValid()
									? (e.AddObject(i, f),
										s.set(d, f),
										a < o.length
											? this.LoadAssetsRecursive(e, t, o, a + 1, r, s, (e) => {
													n(e);
												})
											: n?.(!0))
									: (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"World",
												3,
												"[PreloadManager.LoadAssetsRecursive] asset.IsValid() = false。",
												["资源Path", d],
											),
										n?.(!1))
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"World",
											3,
											"[PreloadManager.LoadAssetsRecursive] 预加载资源失败, asset = undefined。",
											["资源Path", d],
										),
									n?.(!1));
					},
					e.GetLoadPriority(),
				);
		}
	}
	static LoadAsset(e, t) {}
	static afr(e) {
		var t = e.BlueprintClassPath;
		if (
			t?.length &&
			((t = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(t)),
			t?.size)
		)
			for (var [, o] of t)
				(o = o?.ToAssetPathName()),
					o && 0 !== o.length && "None" !== o && e.AddAnimationAsset(o);
	}
	static hfr(e) {
		if (e.PartHitEffectPath?.length) {
			var t = void 0,
				o =
					((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						e.PartHitEffectPath,
						UE.BP_PartHitEffect_C,
					))?.IsValid() ||
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"World",
								3,
								"预加载部位资源失败。",
								["Path", e.PartHitEffectPath],
								["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
							),
						e.PrintDebugInfo()),
					t?.PartCollision),
				a = o?.Num();
			if (a)
				for (let t = 0; t < a; ++t) {
					var r = o.Get(t),
						s = r.Audio?.ToAssetPathName();
					r = r.Effect?.ToAssetPathName();
					s?.length &&
						"None" !== s &&
						e.AddEffectAsset(s) &&
						e instanceof PreloadModel_1.EntityAssetElement &&
						ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
							e.EntityHandle.Id,
							s,
						),
						r?.length &&
							"None" !== r &&
							e.AddEffectAsset(r) &&
							e instanceof PreloadModel_1.EntityAssetElement &&
							ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
								e.EntityHandle.Id,
								r,
							);
				}
		}
	}
	static nfr(e) {
		var t = e.CreatureDataComponent.GetModelConfig();
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[PreloadManager.PreloadEntityActor] 不存在modelConfig。",
						["PbDataId", e.CreatureDataComponent.GetPbDataId()],
					),
				!1
			);
		var o =
			((o = t.动画蓝图.ToAssetPathName()) &&
				0 < o.length &&
				"None" !== o &&
				e.AddAnimationBlueprintClassAsset(o),
			t.网格体);
		UE.KismetSystemLibrary.IsValidSoftObjectReference(o) &&
			e.AddOtherAsset(o.ToAssetPathName());
		o = t.场景交互物.AssetPathName?.toString();
		var a =
				(o && 0 < o.length && "None" !== o && e.AddOtherAsset(o),
				t.常驻特效列表),
			r = a?.Num();
		if (r)
			for (let t = 0; t < r; ++t) {
				var s = a.GetKey(t);
				s = a.Get(s).AssetPathName;
				e.AddEffectAsset(s.toString());
			}
		return (
			(o = t.DA.AssetPathName.toString()) && "None" !== o && e.AddOtherAsset(o),
			!0
		);
	}
	static sfr(e) {
		var t,
			o,
			a = e.CreatureDataComponent;
		return (
			(a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
				a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
				a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
				((a = e.BlueprintClassPath),
				(t =
					ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
						a,
					)?.SkillDataTable.ToAssetPathName()) &&
					0 < t.length &&
					"None" !== t &&
					((o = void 0),
					(o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						t,
						UE.DataTable,
					))?.IsValid()
						? (e.SkillDataTable = o)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Character",
								3,
								"[PreloadController.CollectAssetBySkill] 加载角色技能表失败。",
								["Path", a],
								["技能表Path", t],
							)),
				e.AddOtherAsset(VISION_DATA_PATH),
				this.Cfr(e)),
			!0
		);
	}
	static Cfr(e) {
		var t = e.CreatureDataComponent;
		if (e.SkillDataTable) {
			var o = (0, puerts_1.$ref)(void 0),
				a =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(
						e.SkillDataTable,
						o,
					),
					new Array()),
				r = (0, puerts_1.$unref)(o);
			if (r?.Num())
				for (let t = 0; t < r.Num(); t++) {
					var s = r.Get(t).toString(),
						n = this.gfr(e, s);
					if (n) {
						this.CollectEntityAbility(e, n),
							this.CollectEntitySkillMontage(e, s, n);
						var i = n.SkillStartBuff;
						if (i?.Num())
							for (let e = 0; e < i.Num(); ++e) {
								var l = i.Get(e);
								l && a.push(l);
							}
						var f = n.SkillEndBuff;
						if (f?.Num())
							for (let e = 0; e < f.Num(); ++e) {
								var d = f.Get(e);
								d && a.push(d);
							}
					}
				}
			this.CollectAssetByBuffIdList(e, a);
		}
		var C = (o =
			ConfigManager_1.ConfigManager.WorldConfig).GetCharacterFightInfo(
			e.BlueprintClassPath,
		);
		if (
			0 !== (A = this.GetCurCharacterLoadType()) &&
			((C = C?.SkillDataTableMap.Get(A)?.ToAssetPathName()),
			C && 0 < C.length && "None" !== C)
		) {
			var m = ResourceSystem_1.ResourceSystem.GetLoadedAsset(C, UE.DataTable),
				A = (0, puerts_1.$ref)(void 0),
				c =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(m, A), new Array()),
				_ = (0, puerts_1.$unref)(A);
			if (_?.Num())
				for (let t = 0; t < _.Num(); t++) {
					var u = _.Get(t).toString(),
						g = DataTableUtil_1.DataTableUtil.GetDataTableRow(m, u);
					if (g) {
						this.CollectEntityAbility(e, g),
							this.CollectEntitySkillMontage(e, u, g);
						var h = g.SkillStartBuff;
						if (h?.Num())
							for (let e = 0; e < h.Num(); ++e) {
								var P = h.Get(e);
								P && c.push(P);
							}
						var E = g.SkillEndBuff;
						if (E?.Num())
							for (let e = 0; e < E.Num(); ++e) {
								var M = E.Get(e);
								M && c.push(M);
							}
					}
				}
			this.CollectAssetByBuffIdList(e, c);
		}
		if (t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
			(C = (0, puerts_1.$ref)(void 0)),
				UE.DataTableFunctionLibrary.GetDataTableRowNames(
					o.GetRoleCommonSkillInfo(),
					C,
				),
				(A = o.GetRoleCommonSkillRowNames());
			for (const t of A) {
				var y = this.gfr(e, t);
				y &&
					(this.CollectEntityAbility(e, y),
					this.CollectEntitySkillMontage(e, t, y));
			}
		} else if (
			t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster
		) {
			(C = (0, puerts_1.$ref)(void 0)),
				UE.DataTableFunctionLibrary.GetDataTableRowNames(
					o.GetMonsterCommonSkillInfo(),
					C,
				),
				(A = o.GetMonsterCommonSkillRowNames());
			for (const t of A) {
				var G = this.gfr(e, t);
				G &&
					(this.CollectEntityAbility(e, G),
					this.CollectEntitySkillMontage(e, t, G));
			}
		} else if (t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Vision) {
			(C = (0, puerts_1.$ref)(void 0)),
				UE.DataTableFunctionLibrary.GetDataTableRowNames(
					o.GetVisionCommonSkillInfo(),
					C,
				),
				(A = o.GetVisionCommonSkillRowNames());
			for (const t of A) {
				var S = this.gfr(e, t);
				S &&
					(this.CollectEntityAbility(e, S),
					this.CollectEntitySkillMontage(e, t, S));
			}
		}
	}
	static vfr(e, t) {
		if (t && t.GameplayCueIds)
			for (const a of t.GameplayCueIds) {
				var o = GameplayCueById_1.configGameplayCueById.GetConfig(a);
				if (o) {
					o.Path.length && e.AddEffectAsset(o.Path);
					for (const t of o.Resources) t.length && e.AddEffectAsset(t);
				}
			}
	}
	static CollectAssetByBuffIdList(e, t) {
		if (
			t?.length &&
			(t = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(
				e instanceof PreloadModel_1.EntityAssetElement ? e.EntityHandle.Id : -1,
				t,
			))
		)
			for (const o of t) this.vfr(e, o);
	}
	static gfr(e, t) {
		let o = DataTableUtil_1.DataTableUtil.GetDataTableRow(
			e.SkillDataTable,
			t.toString(),
		);
		if (!o) {
			var a = ConfigManager_1.ConfigManager.WorldConfig;
			let r;
			e.CreatureDataComponent.GetEntityType() ===
			Protocol_1.Aki.Protocol.HBs.Proto_Player
				? (r = a.GetRoleCommonSkillInfo())
				: e.CreatureDataComponent.GetEntityType() ===
						Protocol_1.Aki.Protocol.HBs.Proto_Monster
					? (r = a.GetMonsterCommonSkillInfo())
					: e.CreatureDataComponent.GetEntityType() ===
							Protocol_1.Aki.Protocol.HBs.Proto_Vision &&
						(r = a.GetVisionCommonSkillInfo()),
				r &&
					(o = DataTableUtil_1.DataTableUtil.GetDataTableRow(r, t.toString()));
		}
		return o;
	}
	static CollectEntityAbility(e, t) {
		t &&
			1 === t.SkillMode &&
			(t = t.SkillGA.AssetPathName.toString()) &&
			0 < t.length &&
			"None" !== t &&
			e.AddOtherAsset(t);
	}
	static CollectEntitySkillMontage(e, t, o) {
		var a = o.Animations,
			r = o.ExportSpecialAnim;
		if (a?.Num() || r?.Num()) {
			if (a?.Num())
				for (let t = 0; t < a.Num(); ++t) {
					var s = a.Get(t).AssetPathName.toString();
					s && 0 !== s.length && "None" !== s && e.AddAnimationAsset(s);
				}
			if (r?.Num())
				for (let t = 0; t < r.Num(); ++t) {
					var n = r.Get(t).AssetPathName.toString();
					n && 0 !== n.length && "None" !== n && e.AddAnimationAsset(n);
				}
		} else if (o.MontagePaths?.Num()) {
			let a = !1;
			var i = o.MontagePaths;
			for (let o = 0; o < i.Num(); ++o) {
				var l = i.Get(o);
				(l && 0 !== l.length) ||
					((a = !0),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[PreloadManager.CollectEntitySkillMontage] 实体的MontagePath配置了空蒙太奇名称。",
							["索引:", o],
							["SkillId:", t],
							["CreatureDataId:", e.CreatureDataComponent.GetCreatureDataId()],
							["PbDataId:", e.CreatureDataComponent.GetPbDataId()],
						));
			}
			if (!a) {
				var f = e.CharacterPath;
				for (let t = 0; t < i.Num(); ++t) {
					var d = i.Get(t);
					d = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
						f,
						d,
					)?.ToAssetPathName();
					d && 0 !== d.length && "None" !== d && e.AddAnimationAsset(d);
				}
			}
		}
	}
	static Mfr(e) {
		var t = new LogProfiler_1.LogProfiler("CollectAssetByCommonBullet耗时"),
			o =
				(t.Start(),
				ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData()),
			a = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(o);
		if (a) {
			var r = ModelManager_1.ModelManager.PreloadModel,
				s = a.length;
			for (let t = 0; t < s; ++t) {
				var n = (f = a[t]).基础设置,
					i = f.逻辑设置,
					l = f.表现效果设置,
					f = f.执行逻辑,
					d =
						((n = n.命中判定类型预设),
						(n =
							(UE.KismetSystemLibrary.IsValidSoftObjectReference(n) &&
								r.CommonAssetElement.AddOtherAsset(n.ToAssetPathName()),
							i.预设)),
						(i =
							(UE.KismetSystemLibrary.IsValidSoftObjectReference(n) &&
								r.CommonAssetElement.AddOtherAsset(n.ToAssetPathName()),
							l.子弹特效DA)),
						UE.KismetSystemLibrary.IsValidSoftObjectReference(i) &&
							r.CommonAssetElement.AddEffectAsset(i.ToAssetPathName()),
						l.命中特效DA?.Num()),
					C = l.命中特效DA;
				if (d)
					for (let t = 0; t < d; ++t) {
						var m = C.GetKey(t),
							A = ((m = C.Get(m)), m?.ToAssetPathName());
						A &&
							0 < A?.length &&
							"None" !== A &&
							r.CommonAssetElement.AddEffectAsset(A) &&
							r.PreCreateEffect.AddPreCreateEffect(e, m.ToAssetPathName());
					}
				(n = l.命中时攻击者震屏),
					(i =
						(UE.KismetSystemLibrary.IsValidSoftClassReference(n) &&
							r.CommonAssetElement.AddOtherAsset(n.ToAssetPathName()),
						l.命中时受击者震屏)),
					(n =
						(UE.KismetSystemLibrary.IsValidSoftClassReference(i) &&
							r.CommonAssetElement.AddOtherAsset(i.ToAssetPathName()),
						f.GB组));
				var c =
					(UE.KismetSystemLibrary.IsValidSoftObjectReference(n) &&
						r.CommonAssetElement.AddOtherAsset(n.ToAssetPathName()),
					f.命中后对攻击者应用GE的Id);
				if (c?.Num())
					for (let t = 0; t < c.Num(); ++t)
						this.CollectAssetByCommonBulletBuff(e, c.Get(t));
				var _ = f.命中后对受击者应用GE的Id;
				if (_?.Num())
					for (let t = 0; t < _.Num(); ++t)
						this.CollectAssetByCommonBulletBuff(e, _.Get(t));
				var u = f.能量恢复类GE数组的Id;
				if (u?.Num())
					for (let t = 0; t < u.Num(); ++t)
						this.CollectAssetByCommonBulletBuff(e, u.Get(t));
				var g = f.命中后对在场上角色应用的GE的Id;
				if (g?.Num())
					for (let t = 0; t < g.Num(); ++t)
						this.CollectAssetByCommonBulletBuff(e, g.Get(t));
				var h = f.受击对象进入应用的GE的Id;
				if (h?.Num())
					for (let t = 0; t < h.Num(); ++t)
						this.CollectAssetByCommonBulletBuff(e, h.Get(t));
			}
			t.Stop();
		}
	}
	static CollectAssetByCommonBulletBuff(e, t) {
		if (
			t &&
			(e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfig(e, t))
		) {
			var o = ModelManager_1.ModelManager.PreloadModel;
			if (e.GameplayCueIds)
				for (const t of e.GameplayCueIds) {
					var a = GameplayCueById_1.configGameplayCueById.GetConfig(t);
					a &&
						a.Path &&
						0 !== a.Path.length &&
						o.CommonAssetElement.AddEffectAsset(a.Path);
				}
		}
	}
	static CollectAssetByBullet(e) {
		var t,
			o,
			a,
			r = e.CreatureDataComponent;
		return (
			(r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
				r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
				r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
				((r = e.BlueprintClassPath),
				(t = (o =
					ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
						r,
					))?.BulletDataTable.ToAssetPathName()) &&
					0 !== t.length &&
					"None" !== t &&
					((a = void 0),
					(a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						t,
						UE.DataTable,
					))?.IsValid()
						? (this.CollectAssetByBulletDt(a, e),
							o &&
								0 !== (a = this.GetCurCharacterLoadType()) &&
								(o = o?.BulletDataTableMap.Get(a)?.ToAssetPathName()) &&
								0 < o.length &&
								"None" !== o &&
								(a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
									o,
									UE.DataTable,
								)) &&
								this.CollectAssetByBulletDt(a, e))
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Character",
								3,
								"[CollectAssetByBullet.PreloadController] 加载角色子弹表失败。",
								["Path", r],
								["子弹表Path", t],
							))),
			!0
		);
	}
	static CollectAssetByBulletDt(e, t) {
		if (e.IsValid()) {
			var o = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(e);
			if (o) {
				var a = o.length;
				for (let e = 0; e < a; ++e) {
					var r = o[e];
					this.Sfr(t, r);
				}
			}
		}
	}
	static CollectAssetByStateMachine(e) {
		var t = e.CreatureDataComponent.GetPbEntityInitData();
		let o = 0;
		if (
			((t = (o =
				t?.ComponentsData &&
				(t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))
					?.AiId &&
				!t.Disabled
					? t.AiId
					: o)
				? AiBaseById_1.configAiBaseById.GetConfig(o)
				: void 0),
			t?.StateMachine)
		) {
			var a =
				AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
					t.StateMachine,
				);
			if (a?.StateMachineJson) {
				a = JSON.parse(a.StateMachineJson);
				var r = e.Entity.GetComponent(65);
				r.StateMachineName = t.StateMachine;
				for (const t of (r.StateMachineJsonObject = a).Nodes)
					this.CollectAssetByStateMachineNode(e, t);
			}
		}
		return !0;
	}
	static CollectAssetByStateMachineNode(e, t) {
		if (t.BindStates && 0 < t.BindStates.length)
			for (const o of t.BindStates)
				switch (o.Type) {
					case 1:
						this.CollectAssetByBuffIdList(e, [BigInt(o.BindBuff.BuffId)]);
						break;
					case 104:
						for (const t of o.BindCue.CueIds)
							this.CollectAssetByCueId(e, BigInt(t));
						break;
					case 113:
						o.BindPalsy.CounterAttackEffect &&
							e.AddOtherAsset(o.BindPalsy.CounterAttackEffect),
							o.BindPalsy.CounterAttackCamera &&
								e.AddOtherAsset(o.BindPalsy.CounterAttackCamera);
				}
		var o = [];
		t.OnEnterActions &&
			0 < t.OnEnterActions?.length &&
			o.push(...t.OnEnterActions),
			t.OnExitActions &&
				0 < t.OnExitActions?.length &&
				o.push(...t.OnExitActions);
		for (const t of o)
			switch (t.Type) {
				case 1:
					this.CollectAssetByBuffIdList(e, [BigInt(t.ActionAddBuff.BuffId)]);
					break;
				case 101:
					for (const o of t.ActionCue.CueIds)
						this.CollectAssetByCueId(e, BigInt(o));
			}
	}
	static CollectAssetByCueId(e, t) {
		(t = GameplayCueById_1.configGameplayCueById.GetConfig(t)) &&
			t.Path &&
			0 !== t.Path.length &&
			e.AddEffectAsset(t.Path);
	}
	static Sfr(e, t) {
		var o = t.基础设置,
			a = t.逻辑设置,
			r = t.表现效果设置,
			s =
				((t = t.执行逻辑),
				(o = o.命中判定类型预设),
				(o =
					(UE.KismetSystemLibrary.IsValidSoftObjectReference(o) &&
						e.AddOtherAsset(o.ToAssetPathName()),
					a.预设)),
				(a =
					(UE.KismetSystemLibrary.IsValidSoftObjectReference(o) &&
						e.AddOtherAsset(o.ToAssetPathName()),
					r.子弹特效DA)),
				UE.KismetSystemLibrary.IsValidSoftObjectReference(a) &&
					e.AddEffectAsset(a.ToAssetPathName()),
				r.命中特效DA),
			n = s?.Num();
		if (n)
			for (let t = 0; t < n; ++t) {
				var i = s.GetKey(t),
					l = ((i = s.Get(i)), i?.ToAssetPathName());
				l &&
					0 < l?.length &&
					"None" !== l &&
					e.AddEffectAsset(l) &&
					e instanceof PreloadModel_1.EntityAssetElement &&
					(e.CreatureDataComponent.GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_Player
						? ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateHitEffect(
								e.EntityHandle.Id,
								i.ToAssetPathName(),
							)
						: ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
								e.EntityHandle.Id,
								i.ToAssetPathName(),
							));
			}
		(o = r.命中时攻击者震屏),
			UE.KismetSystemLibrary.IsValidSoftClassReference(o) &&
				e.AddOtherAsset(o.ToAssetPathName()),
			(a = r.命中时受击者震屏),
			UE.KismetSystemLibrary.IsValidSoftClassReference(a) &&
				e.AddOtherAsset(a.ToAssetPathName()),
			(o = t.GB组);
		var f =
				(UE.KismetSystemLibrary.IsValidSoftObjectReference(o) &&
					e.AddOtherAsset(o.ToAssetPathName()),
				new Array()),
			d = t.命中后对攻击者应用GE的Id;
		if (d?.Num())
			for (let e = 0; e < d.Num(); ++e) {
				var C = d.Get(e);
				C && f.push(C);
			}
		var m = t.命中后对受击者应用GE的Id;
		if (m?.Num())
			for (let e = 0; e < m.Num(); ++e) {
				var A = m.Get(e);
				A && f.push(A);
			}
		var c = t.能量恢复类GE数组的Id;
		if (c?.Num())
			for (let e = 0; e < c.Num(); ++e) {
				var _ = c.Get(e);
				_ && f.push(_);
			}
		var u = t.命中后对在场上角色应用的GE的Id;
		if (u?.Num())
			for (let e = 0; e < u.Num(); ++e) {
				var g = u.Get(e);
				g && f.push(g);
			}
		var h = t.受击对象进入应用的GE的Id;
		if (h?.Num())
			for (let e = 0; e < h.Num(); ++e) {
				var P = h.Get(e);
				P && f.push(P);
			}
		this.CollectAssetByBuffIdList(e, f);
	}
	static ufr(e, t, o) {
		(0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
			UE.KuroStaticLibrary.GetAnimSequenceNotifies(t, animNotifyEventsRef);
		var a = (0, puerts_1.$unref)(animNotifyEventsRef),
			r = a?.Num();
		if (r)
			for (let t = 0; t < r; ++t) {
				var s = a.Get(t);
				this.Efr(e, s, o);
			}
	}
	static _fr(e, t, o) {
		(0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
			UE.KuroStaticLibrary.GetAnimMontageNotifies(t, animNotifyEventsRef),
			UE.KuroStaticLibrary.SetMontageANIndex(t);
		var a = (0, puerts_1.$unref)(animNotifyEventsRef);
		if (a?.Num())
			for (let t = 0; t < a.Num(); ++t) {
				var r = a.Get(t);
				this.Efr(e, r, o);
			}
		(0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
			UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
				t,
				animSequenceBasesRef,
			);
		var s = (0, puerts_1.$unref)(animSequenceBasesRef);
		if (s?.Num())
			for (let t = 0; t < s.Num(); ++t) {
				var n = s.Get(t);
				this.ufr(e, n, o);
			}
	}
	static Efr(e, t, o) {
		if (t.NotifyStateClass?.IsValid()) {
			if (t.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
				return (a = t.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
					0 !== a.length &&
					"None" !== a
					? void e.AddEffectAsset(a)
					: void 0;
			if (t.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
				return (a = t.NotifyStateClass).BuffId ? void o.push(a.BuffId) : void 0;
		}
		var a;
		if (t.Notify?.IsValid())
			return t.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
				? (a = t.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
					0 !== a.length &&
					"None" !== a
					? void e.AddEffectAsset(a)
					: void 0
				: void (
						t.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
						(e = t.Notify).BuffId &&
						o.push(e.BuffId)
					);
	}
	static mfr(e, t) {
		if (t?.IsValid() && t.IsA(UE.EffectModelGroup_C.StaticClass())) {
			var o = t,
				a = o.EffectData?.Num();
			if (a)
				for (let n = 0; n < a; ++n) {
					var r,
						s = o.EffectData.GetKey(n);
					s?.IsValid() &&
						(s.IsA(UE.EffectModelGroup_C.StaticClass())
							? Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Preload",
									3,
									"子特效不能是DA_Fx_Group",
									["父特效", t.GetName()],
									["子特效", s.GetName()],
								)
							: (this.mfr(e, s),
								s.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
									((r = s.AnimationRef)?.IsValid()
										? r.IsA(UE.AnimSequence.StaticClass())
											? this.ufr(e, r, animBuffList)
											: r.IsA(UE.AnimMontage.StaticClass()) &&
												this._fr(e, r, animBuffList)
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Preload",
												3,
												"特效的mesh没有配置动画",
												["父特效", t.GetName()],
												["子特效", s.GetName()],
											))));
				}
		}
	}
	static dfr(e, t) {
		if (t) {
			(0, puerts_1.$unref)(animationAssetSetRef).Empty(),
				UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
					t,
					animationAssetSetRef,
				);
			var o = (0, puerts_1.$unref)(animationAssetSetRef);
			if (o?.Num()) {
				for (let t = (animBuffList.length = 0); t < o.Num(); ++t) {
					var a = o.Get(t);
					a.IsA(UE.AnimSequence.StaticClass())
						? this.ufr(e, a, animBuffList)
						: a.IsA(UE.AnimMontage.StaticClass()) &&
							this._fr(e, a, animBuffList);
				}
				this.CollectAssetByBuffIdList(e, animBuffList);
			}
		}
	}
	static ofr(e, t) {
		var o;
		t &&
			((o = (0, puerts_1.$ref)(void 0)),
			UE.KuroStaticLibrary.GetCharacterAnimClass(t, o),
			(t = (0, puerts_1.$unref)(o))) &&
			this.dfr(e, t);
	}
	static OnLeaveLevel() {
		var e,
			t = ModelManager_1.ModelManager.PreloadModel;
		for ([, e] of (t.CommonAssetElement.Clear(), t.AllEntityAssetMap))
			4 !== e.LoadState && e.Clear();
		return t.ClearEntityAsset(), t.ClearPreloadResource(), !0;
	}
	static GetCurCharacterLoadType() {
		return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
			? 1
			: 0;
	}
}
((exports.PreloadController = PreloadController).rfr = void 0),
	(PreloadController.yfr = void 0);
