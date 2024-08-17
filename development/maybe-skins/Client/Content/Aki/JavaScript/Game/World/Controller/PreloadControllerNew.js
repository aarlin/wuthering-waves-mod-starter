"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PreloadControllerNew = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	BulletPreloadByActorBlueprintAndBulletId_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId"),
	CommonSkillPreloadAll_1 = require("../../../Core/Define/ConfigQuery/CommonSkillPreloadAll"),
	EntitySkillPreloadByActorBlueprintAndSkillId_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByActorBlueprintAndSkillId"),
	GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
	ModelConfigPreloadById_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadById"),
	StateMachinePreloadByFsmKey_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByFsmKey"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
	NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
	RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
	SplineMoveComponent_1 = require("../../NewWorld/Common/Component/SplineMoveComponent"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine"),
	RenderConfig_1 = require("../../Render/Config/RenderConfig"),
	GameModePromise_1 = require("../Define/GameModePromise"),
	PreloadConstants_1 = require("./PreloadConstants"),
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
	NEED_PRELOAD_DISTANCE = 4e6,
	CHARACTER_PREFIX_PATH = "/Game/Aki/Character/",
	animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase)),
	animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent)),
	animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
	animBuffList = new Array(),
	COMMON_STATE_MACHINE = "SM_Common";
class PreloadControllerNew extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return !!this.Ifr();
	}
	static Ifr() {
		var e = ModelManager_1.ModelManager.PreloadModelNew;
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			var t =
				CommonSkillPreloadAll_1.configCommonSkillPreloadAll.GetConfigList();
			if (!t?.length) return !1;
			for (const r of t) {
				var o = new PreloadDefine_1.AssetElement();
				this.Tfr(r, o), e.AddCommonSkill(r.Id, r.HasMontagePath, o);
			}
		} else {
			var r = UE.KuroStaticLibrary.GetFilesRecursive(
				e.CommonSkillJsonExportPath,
				"*",
				!0,
				!1,
			);
			for (let t = 0; t < r.Num(); ++t) {
				var a = r.Get(t),
					i = (0, puerts_1.$ref)("");
				if (
					(UE.KuroStaticLibrary.LoadFileToString(i, a),
					!(i = (0, puerts_1.$unref)(i))?.length)
				)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Preload", 3, "[预加载] 加载文件失败", [
								"path",
								a,
							]),
						!1
					);
				if (!(i = JSON.parse(i)))
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Preload",
								3,
								"[预加载] 序列化skillAssetRecord失败",
								["path", a],
							),
						!1
					);
				(a = new PreloadDefine_1.AssetElement()),
					this.Lfr(i.AssetRecord, a),
					e.AddCommonSkill(i.SkillId, i.HasMontagePath, a);
			}
		}
		return !0;
	}
	static async DoPreload(e) {
		let t = !1;
		(o =
			ModelManager_1.ModelManager
				.GameModeModel).PreloadCommonProfiler.Restart(),
			(e = await this.Dfr(e));
		var o =
			(o.PreloadCommonProfiler.Stop(),
			e || (t = !0),
			ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Restart(),
			await this.X0r(
				ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler,
			));
		return (
			ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(),
			!(t = !o || t)
		);
	}
	static async Dfr(e) {
		let t = !1;
		var o;
		return (
			(o =
				((o = await this.$0r()) || (t = !0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Preload", 3, "[预加载] 预加载公共主要资源结果", [
						"Success",
						o,
					]),
				await this.Rfr())) || (t = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Preload", 3, "[预加载] 预加载公共次要资源结果", [
					"Success",
					o,
				]),
			e(t),
			!0
		);
	}
	static async $0r() {
		var e = ModelManager_1.ModelManager.PreloadModelNew;
		for (const t of commonMajorPaths) e.CommonAssetElement.AddOther(t);
		var t = new GameModePromise_1.GameModePromise();
		return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, t), t.Promise;
	}
	static async Rfr() {
		var e = ModelManager_1.ModelManager.PreloadModelNew;
		for (const t of commonEffectPaths) e.CommonAssetElement.AddEffect(t);
		for (const t of commonOtherPaths) e.CommonAssetElement.AddOther(t);
		this.Ufr(e.CommonAssetElement, "SM_Common");
		var t = new GameModePromise_1.GameModePromise();
		return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, t), t.Promise;
	}
	static async X0r(e) {
		const t = ModelManager_1.ModelManager.PreloadModel;
		var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		if (0 === o.length) return !1;
		var r = Vector_1.Vector.Create(
				ModelManager_1.ModelManager.GameModeModel.BornLocation,
			),
			a = Vector_1.Vector.Create(),
			i = new Array();
		for (const e of o) {
			var n = e.Entity.GetComponent(0);
			e.IsInit ||
				n.GetLoading() ||
				n.GetRemoveState() ||
				n.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom ||
				((n.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player ||
					((n = n.GetLocation()),
					(a.X = n.X),
					(a.Y = n.Y),
					(a.Z = n.Z),
					Vector_1.Vector.DistSquared(r, a) <= 4e6)) &&
					(i.push(e), t.AddNeedWaitEntity(e.Id)));
		}
		let s = i.length;
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Preload",
					3,
					"[预加载] 批量预加载实体:开始",
					["当前实体总数", o.length],
					["需要预加载的实体个数", s],
				),
			0 === s)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] 需要预加载的实体数量为0"),
				!1
			);
		var l,
			d = new Array();
		for (const o of i) {
			const r = o.Entity.GetComponent(0);
			o.IsInit ||
				r.GetLoading() ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Preload",
						3,
						"[预加载] 预加载单个实体:开始",
						["CreatureDataId", r.GetCreatureDataId()],
						["PbDataId", r.GetPbDataId()],
						["Reason", "PreloadController.PreloadEntities"],
						["Count", s],
					),
				(l = this.PreloadEntity(o, e, (e) => {
					s--,
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Preload",
								3,
								"[预加载] 预加载实体:结束",
								["CreatureDataId", r.GetCreatureDataId()],
								["PbDataId", r.GetPbDataId()],
								["预加载结果", e],
								["调用代码位置", "PreloadController.PreloadEntities"],
								["Count", s],
							),
						t.RemoveNeedWaitEntity(o.Id);
				})),
				d.push(l));
		}
		let f = !0;
		for (const e of await Promise.all(d)) 1 === e && (f = !1);
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Preload", 3, "[预加载] 批量预加载实体:结束", [
					"预加载结果",
					f,
				]),
			f
		);
	}
	static async PreloadEntity(e, t, o) {
		const r = ModelManager_1.ModelManager.PreloadModelNew;
		var a = new CustomPromise_1.CustomPromise();
		const i = e.Entity.GetComponent(0);
		if (i.GetRemoveState()) return o?.(3), 3;
		if (e.IsInit)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Preload",
						3,
						"[预加载] 实体重复预加载，因为这个实体handle.IsInit为true",
					),
				o?.(1),
				1
			);
		if (i.GetPreloadFinished())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Preload",
						3,
						"[预加载] 实体重复预加载，creatureDataComponent.GetPreloadFinished()为true",
					),
				o?.(1),
				1
			);
		if (i.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom)
			return (
				i.SetPreloadFinished(!0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PreloadEntityFinished,
					e,
				),
				o?.(2),
				2
			);
		let n,
			s,
			l,
			d,
			f,
			_ =
				(t &&
					((n = t.CreateChild(
						`预加载实体, CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` +
							i.GetPbDataId(),
						!0,
					)),
					(s = n.CreateChild("预加载实体主要资源", !0)),
					(l = n.CreateChild("预加载技能资源", !0)),
					(d = n.CreateChild("预加载子弹资源", !0)),
					(f = n.CreateChild("预加载状态机资源", !0))),
				n?.Start(),
				r.GetEntityAssetElement(i.GetCreatureDataId()));
		if (_)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] 实体重复预加载"),
				o?.(1),
				1
			);
		if (
			(((_ = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0),
			(_.Promise = a.Promise),
			_.AddCallback(o),
			(_.MainAsset.AddObjectCallback = (e, t) => {
				r.HoldPreloadObject.AddEntityAsset(i.GetCreatureDataId(), e);
			}),
			r.AddEntityAsset(i.GetCreatureDataId(), _),
			i.ModelBlueprintPath)
		) {
			let e;
			if (
				((t = i.GetPbEntityInitData()) &&
					((t = (0, IComponent_1.getComponent)(
						t.ComponentsData,
						"ModelComponent",
					)),
					(e = t?.ModelType)),
				!this.Afr(_.MainAsset, e))
			)
				return o?.(1), 1;
		} else if (!this.Pfr(_, i.GetModelId())) return o?.(1), 1;
		if (
			(s?.Start(),
			(t = new GameModePromise_1.GameModePromise()),
			this.LoadAssetAsync(_.MainAsset, _.LoadPriority, !1, t),
			(o = await t.Promise),
			s?.Stop(),
			!o)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] 预加载主要资源失败", [
						"CreatureDataId",
						_.CreatureDataComponent.GetCreatureDataId(),
					]),
				_.DoCallback(1),
				1
			);
		var u = ((t = e.Entity.GetComponent(194)) && t.InitPreload(_), new Array());
		if (
			(l?.Start(), _.FightAssetManager.SkillAssetManager.SkillAssetMap.size)
		) {
			let e = _.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
			for (const [t, o] of _.FightAssetManager.SkillAssetManager
				.SkillAssetMap) {
				var m = new GameModePromise_1.GameModePromise();
				this.LoadAssetAsync(o, _.LoadPriority, !1, m, (o) => {
					--e || l?.Stop(),
						o ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Preload",
									3,
									"[预加载] 预加载技能失败",
									[
										"CreatureDataId",
										_.CreatureDataComponent.GetCreatureDataId(),
									],
									["SkillId", t],
								));
				}),
					u.push(m.Promise);
			}
		} else l?.Stop();
		d?.Start();
		const A = _.FightAssetManager.BulletAssetManager;
		let g = A.BulletAssetMap.size;
		if (g)
			for (const [e, t] of A.BulletAssetMap) {
				var c = new GameModePromise_1.GameModePromise();
				this.LoadAssetAsync(t, _.LoadPriority, !1, c, (t) => {
					--g || d?.Stop(),
						t ||
							((t = A.IndexMapping.get(e)),
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Preload",
									3,
									"[预加载] 预加载子弹失败",
									[
										"CreatureDataId",
										_.CreatureDataComponent.GetCreatureDataId(),
									],
									["BulletId", t],
								));
				}),
					u.push(c.Promise);
			}
		else d?.Stop();
		f?.Start();
		const C = _.FightAssetManager.StateMachineAssetManager;
		let E = C.StateMachineAssetMap.size;
		if (E)
			for (const [e, t] of C.StateMachineAssetMap) {
				var h = new GameModePromise_1.GameModePromise();
				this.LoadAssetAsync(t, _.LoadPriority, !1, h, (t) => {
					--E || f?.Stop(),
						t ||
							((t = C.IndexMapping.get(e)),
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Preload",
									3,
									"[预加载] 预加载状态机失败",
									[
										"CreatureDataId",
										_.CreatureDataComponent.GetCreatureDataId(),
									],
									["FsmKey", t],
								));
				}),
					u.push(h.Promise);
			}
		else f?.Stop();
		if (((o = await Promise.all(u)), !e.Valid)) return _.DoCallback(3), 3;
		if (i.GetRemoveState()) return _.DoCallback(3), 3;
		let P = !0;
		for (const e of o) e || (P = !1);
		return P
			? (a.SetResult(2),
				i.SetPreloadFinished(!0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PreloadEntityFinished,
					e,
				),
				_.DoCallback(2),
				a.Promise)
			: (_.DoCallback(1), 1);
	}
	static RemoveEntity(e) {
		var t = ModelManager_1.ModelManager.PreloadModelNew,
			o = t.GetEntityAssetElement(e);
		o &&
			o.EntityHandle?.Valid &&
			3 !== o.LoadState &&
			((o.LoadState = 3),
			t.HoldPreloadObject.RemoveEntityAssets(o.EntityHandle.Id),
			o.Clear(),
			t.RemoveEntityAsset(e));
	}
	static LoadAssetAsync(e, t, o, r, a) {
		this.xfr(
			e,
			t,
			(e) => {
				a?.(e), r?.SetResult(e);
			},
			o,
		);
	}
	static LoadAsset(e) {
		if (!e.NeedLoadAssets.length) return !0;
		let t = !0;
		for (var [, o] of e.NeedLoadAssets) {
			e.AddLoading(o);
			var r = ResourceSystem_1.ResourceSystem.Load(o, UE.Object);
			e.RemoveLoading(o),
				r?.IsValid()
					? e.AddLoaded(o) && e.AddObject(o, r)
					: ((t = !1),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
								"Path",
								o,
							]));
		}
		return (e.NeedLoadAssets.length = 0), t;
	}
	static FlushSkill(e, t) {
		return (e = e.FightAssetManager.SkillAssetManager.GetSkill(t))
			? this.wfr(e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] FlushSkill失败，技能不存在", [
						"SkillId",
						t,
					]),
				!1);
	}
	static FlushBullet(e, t) {
		return (e = e.FightAssetManager.BulletAssetManager.GetBullet(t))
			? this.wfr(e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Preload",
						3,
						"[预加载] FlushBullet失败，子弹不存在",
						["BulletId", t],
					),
				!1);
	}
	static wfr(e) {
		if (!e.Loading()) return !0;
		let t = !0;
		for (var [, o] of e.NeedLoadAssets) {
			e.AddLoading(o);
			var r = ResourceSystem_1.ResourceSystem.Load(o, UE.Object);
			e.RemoveLoading(o),
				r?.IsValid()
					? e.AddLoaded(o) && e.AddObject(o, r)
					: ((t = !1),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
								"Path",
								o,
							]));
		}
		for (const o of e.LoadingSet) {
			var a = ResourceSystem_1.ResourceSystem.Load(o, UE.Object);
			e.RemoveLoading(o),
				a?.IsValid()
					? e.AddLoaded(o) && e.AddObject(o, a)
					: ((t = !1),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
								"Path",
								o,
							]));
		}
		return t;
	}
	static xfr(e, t, o, r) {
		if (e.NeedLoadAssets.length) {
			var a = void 0;
			a = new Array();
			for (const t of e.NeedLoadAssets) a.push(t), e.AddLoading(t[1]);
			e.NeedLoadAssets.length = 0;
			let i = a.length,
				n = 0;
			for (const [s, l] of a)
				this.Bfr(l, t, (a, l, d) => {
					if ((i--, e.RemoveLoading(l), a)) {
						if ((e.AddLoaded(l) && e.AddObject(l, d), r))
							switch (s) {
								case 2:
									this.mfr(e, d);
									break;
								case 0:
									this.ofr(e, d);
									break;
								case 1:
									d.IsA(UE.AnimMontage.StaticClass())
										? this._fr(e, d, animBuffList)
										: d.IsA(UE.AnimSequenceBase.StaticClass()) &&
											this.ufr(e, d, animBuffList);
									break;
								case 6:
									this.dfr(e, d);
							}
					} else n++;
					i || (r && e.NeedLoadCount() ? this.xfr(e, t, o, r) : o?.(0 === n));
				});
		} else o?.(!0);
	}
	static ofr(e, t) {
		var o;
		t &&
			((o = (0, puerts_1.$ref)(void 0)),
			UE.KuroStaticLibrary.GetCharacterAnimClass(t, o),
			(t = (0, puerts_1.$unref)(o))) &&
			this.dfr(e, t);
	}
	static dfr(e, t) {
		if (t) {
			(0, puerts_1.$unref)(animationAssetSetRef).Empty(),
				UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
					t,
					animationAssetSetRef,
				);
			var o = (0, puerts_1.$unref)(animationAssetSetRef);
			if (0 !== o.Num()) {
				for (let t = 0; t < o.Num(); ++t) {
					var r = o.Get(t);
					r.IsA(UE.AnimSequence.StaticClass())
						? this.ufr(e, r, animBuffList)
						: r.IsA(UE.AnimMontage.StaticClass()) &&
							this._fr(e, r, animBuffList);
				}
				this.cfr(e, animBuffList);
			}
		}
	}
	static ufr(e, t, o) {
		(0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
			UE.KuroStaticLibrary.GetAnimSequenceNotifies(t, animNotifyEventsRef);
		var r = (0, puerts_1.$unref)(animNotifyEventsRef),
			a = r.Num();
		if (0 !== a)
			for (let t = 0; t < a; ++t) {
				var i = r.Get(t);
				this.Efr(e, i, o);
			}
	}
	static _fr(e, t, o) {
		(0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
			UE.KuroStaticLibrary.GetAnimMontageNotifies(t, animNotifyEventsRef),
			UE.KuroStaticLibrary.SetMontageANIndex(t);
		var r = (0, puerts_1.$unref)(animNotifyEventsRef);
		if (0 < r.Num())
			for (let t = 0; t < r.Num(); ++t) {
				var a = r.Get(t);
				this.Efr(e, a, o);
			}
		(0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
			UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
				t,
				animSequenceBasesRef,
			);
		var i = (0, puerts_1.$unref)(animSequenceBasesRef);
		if (0 < i.Num())
			for (let t = 0; t < i.Num(); ++t) {
				var n = i.Get(t);
				this.ufr(e, n, o);
			}
	}
	static Efr(e, t, o) {
		if (t.NotifyStateClass?.IsValid()) {
			if (t.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
				return (r = t.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
					0 !== r.length &&
					"None" !== r
					? void e.AddEffect(r)
					: void 0;
			if (t.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
				return (r = t.NotifyStateClass).BuffId ? void o.push(r.BuffId) : void 0;
		}
		var r;
		if (t.Notify?.IsValid())
			return t.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
				? (r = t.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
					0 !== r.length &&
					"None" !== r
					? void e.AddEffect(r)
					: void 0
				: void (
						t.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
						(e = t.Notify).BuffId &&
						o.push(e.BuffId)
					);
	}
	static cfr(e, t) {
		if (
			t?.length &&
			(t = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(0, t))
		)
			for (const o of t) this.vfr(e, o);
	}
	static vfr(e, t) {
		if (t && t.GameplayCueIds)
			for (const r of t.GameplayCueIds) {
				var o = GameplayCueById_1.configGameplayCueById.GetConfig(r);
				if (o) {
					o.Path.length && e.AddEffect(o.Path);
					for (const t of o.Resources) t.length && e.AddEffect(t);
				}
			}
	}
	static Bfr(e, t, o) {
		e?.length
			? ResourceSystem_1.ResourceSystem.LoadAsync(
					e,
					UE.Object,
					(t, r) => {
						t?.IsValid()
							? o?.(!0, e, t)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error("Preload", 3, "[预加载] 预加载资源失败", [
										"Path",
										r,
									]),
								o?.(!1, e, void 0));
					},
					t,
				)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] path路径为空"),
				o?.(!1, e, void 0));
	}
	static Pfr(e, t) {
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			var o =
				ModelConfigPreloadById_1.configModelConfigPreloadById.GetConfig(t);
			if (!o) return !1;
			(e.BlueprintClassPath = o.ActorClassPath), this.Tfr(o, e.MainAsset);
		} else if (
			((o =
				"" +
				ModelManager_1.ModelManager.PreloadModelNew.ModelConfigJsonExportPath +
				t +
				".json"),
			UE.BlueprintPathsLibrary.FileExists(o))
		) {
			t = (0, puerts_1.$ref)("");
			if (
				(UE.KuroStaticLibrary.LoadFileToString(t, o),
				!(t = (0, puerts_1.$unref)(t))?.length)
			)
				return !1;
			(t = JSON.parse(t)),
				(e.BlueprintClassPath = t.ActorClassPath),
				this.Lfr(t.AssetRecord, e.MainAsset);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[预加载] 不存在配置文件，重新导出ModelConfig对应的配置？",
					["Path", o],
				);
		return !0;
	}
	static Afr(e, t) {
		var o;
		return (
			!!t &&
			((o = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath])?.length &&
				e.AddOther(o),
			t.PrefabPath?.length && e.AddOther(t.PrefabPath),
			!0)
		);
	}
	static CollectAssetBySkillId(e, t, o) {
		var r = ModelManager_1.ModelManager.PreloadModelNew;
		let a,
			i = !1,
			n = !1;
		if ((d = r.GetCommonSkill(t))) {
			(i = !0), (n = d[0]);
			var s,
				l,
				d = d[1];
			for ([s, l] of ((a = new PreloadDefine_1.AssetElement()),
			e.FightAssetManager.SkillAssetManager.AddSkill(t, a),
			d.NeedLoadAssets))
				a.AddAsset(s, l);
			if (!n) return a;
		}
		if (e.BlueprintClassPath?.length) {
			if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
				if (
					((d = (d = e.BlueprintClassPath.substring(20)).substring(
						0,
						d.lastIndexOf("."),
					)),
					(r = "" + r.SkillJsonExportPath + d + `/${t}.json`),
					!UE.BlueprintPathsLibrary.FileExists(r))
				)
					return void (
						o &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[预加载] 不存在技能配置文件",
							["Path", r],
							["是否公共技能", i],
							["是否拥有蒙太奇", n],
							["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
						)
					);
				if (
					((d = (0, puerts_1.$ref)("")),
					UE.KuroStaticLibrary.LoadFileToString(d, r),
					!(o = (0, puerts_1.$unref)(d))?.length)
				)
					return;
				return (
					a ||
						((a = new PreloadDefine_1.AssetElement()),
						e.FightAssetManager.SkillAssetManager.AddSkill(t, a)),
					(r = JSON.parse(o)),
					this.Lfr(r.AssetRecord, a),
					a
				);
			}
			if (
				(d =
					EntitySkillPreloadByActorBlueprintAndSkillId_1.configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig(
						e.BlueprintClassPath,
						t,
					))
			)
				return (
					a ||
						((a = new PreloadDefine_1.AssetElement()),
						e.FightAssetManager.SkillAssetManager.AddSkill(t, a)),
					this.Tfr(d, a),
					a
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[预加载] 角色蓝图无效",
					["SkillId", t],
					["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
				);
	}
	static CollectAssetByBulletId(e, t) {
		var o = ModelManager_1.ModelManager.PreloadModelNew;
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			var r = (r = e.BlueprintClassPath.substring(20)).substring(
				0,
				r.lastIndexOf("."),
			);
			o = "" + o.BulletJsonExportPath + r + `/${t}.json`;
			if (!UE.BlueprintPathsLibrary.FileExists(o))
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "[预加载] 不存在子弹配置文件", [
						"Path",
						o,
					])
				);
			if (
				((r = (0, puerts_1.$ref)("")),
				UE.KuroStaticLibrary.LoadFileToString(r, o),
				!(o = (0, puerts_1.$unref)(r))?.length)
			)
				return;
			const a = new PreloadDefine_1.AssetElement();
			return (
				e.FightAssetManager.BulletAssetManager.AddBullet(t, a),
				(r = JSON.parse(o)),
				this.Lfr(r.AssetRecord, a),
				a
			);
		}
		if (
			(o =
				BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId.GetConfig(
					e.BlueprintClassPath,
					t,
				))
		) {
			const r = new PreloadDefine_1.AssetElement();
			return (
				e.FightAssetManager.BulletAssetManager.AddBullet(t, r),
				this.Tfr(o, r),
				r
			);
		}
	}
	static Ufr(e, t) {
		var o, r;
		return PublicUtil_1.PublicUtil.UseDbConfig()
			? !!(r =
					StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
						t,
					)) && (this.Tfr(r, e), !0)
			: ((r =
					"" +
					ModelManager_1.ModelManager.PreloadModelNew
						.StateMachineJsonExportPath +
					t +
					".json"),
				UE.BlueprintPathsLibrary.FileExists(r)
					? ((o = ((t = ""), puerts_1.$ref)("")),
						UE.KuroStaticLibrary.LoadFileToString(o, r),
						!!(t = (0, puerts_1.$unref)(o))?.length &&
							((o = JSON.parse(t)), this.Lfr(o.AssetRecord, e), !0))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("World", 3, "[预加载] 不存在状态机文件", [
								"Path",
								r,
							]),
						!1));
	}
	static CollectAssetByStateMachineNode(e, t) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			var o =
				"" +
				ModelManager_1.ModelManager.PreloadModelNew.StateMachineJsonExportPath +
				t +
				".json";
			if (!UE.BlueprintPathsLibrary.FileExists(o))
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "[预加载] 不存在状态机文件", ["Path", o])
				);
			var r = (0, puerts_1.$ref)("");
			if (
				(UE.KuroStaticLibrary.LoadFileToString(r, o),
				!(o = (0, puerts_1.$unref)(r))?.length)
			)
				return;
			const a = new PreloadDefine_1.AssetElement();
			return (
				e.FightAssetManager.StateMachineAssetManager.AddStateMachine(t, a),
				(r = JSON.parse(o)),
				this.Lfr(r.AssetRecord, a),
				a
			);
		}
		if (
			(o =
				StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
					t,
				))
		) {
			const r = new PreloadDefine_1.AssetElement();
			return (
				e.FightAssetManager.StateMachineAssetManager.AddStateMachine(t, r),
				this.Tfr(o, r),
				r
			);
		}
	}
	static RemoveSkill(e, t) {
		return e
			? e.FightAssetManager.SkillAssetManager.RemoveSkill(t)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "[预加载] entityAssetElement参数无效"),
				!1);
	}
	static RemoveBullet(e, t) {
		e
			? e.FightAssetManager.BulletAssetManager.RemoveBullet(t)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("World", 3, "[预加载] entityAssetElement参数无效");
	}
	static mfr(e, t) {
		if (t?.IsValid() && t.IsA(UE.EffectModelGroup_C.StaticClass())) {
			var o = t,
				r = o.EffectData.Num();
			for (let n = 0; n < r; ++n) {
				var a,
					i = o.EffectData.GetKey(n);
				i?.IsValid() &&
					(i.IsA(UE.EffectModelGroup_C.StaticClass())
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Preload",
								3,
								"子特效不能是DA_Fx_Group",
								["父特效", t.GetName()],
								["子特效", i.GetName()],
							)
						: (this.mfr(e, i),
							i.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
								((a = i.AnimationRef)?.IsValid()
									? a.IsA(UE.AnimSequence.StaticClass())
										? this.ufr(e, a, animBuffList)
										: a.IsA(UE.AnimMontage.StaticClass()) &&
											this._fr(e, a, animBuffList)
									: Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Preload",
											3,
											"特效的mesh没有配置动画",
											["父特效", t.GetName()],
											["子特效", i.GetName()],
										))));
			}
		}
	}
	static Tfr(e, t) {
		for (const o of e.ActorClass) t.AddActorClass(o);
		for (const o of e.Animations) t.AddAnimation(o);
		for (const o of e.Effects) t.AddEffect(o);
		for (const o of e.Audios) t.AddAudio(o);
		for (const o of e.Materials) t.AddMaterial(o);
		for (const o of e.Meshes) t.AddMesh(o);
		for (const o of e.AnimationBlueprints) t.AddAnimationBlueprint(o);
		for (const o of e.Others) t.AddOther(o);
	}
	static Lfr(e, t, o) {
		if (e)
			if (t) {
				for (const o of e.ActorClass) t.AddActorClass(o);
				for (const o of e.Animations) t.AddAnimation(o);
				for (const r of e.Effects)
					t.AddEffect(r),
						o &&
							ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
								o,
								r,
							);
				for (const o of e.Audios) t.AddAudio(o);
				for (const o of e.Meshes) t.AddMesh(o);
				for (const o of e.Materials) t.AddMaterial(o);
				for (const o of e.AnimationBlueprints) t.AddAnimationBlueprint(o);
				for (const o of e.Others) t.AddOther(o);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "[预加载] assetElement参数无效");
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("World", 3, "[预加载] assetRecord参数无效");
	}
}
exports.PreloadControllerNew = PreloadControllerNew;
