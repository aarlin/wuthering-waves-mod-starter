"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharRenderingComponent = void 0);
const UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	WorldModel_1 = require("../../../World/Model/WorldModel"),
	RenderConfig_1 = require("../../Config/RenderConfig"),
	RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig"),
	RenderModuleController_1 = require("../../Manager/RenderModuleController"),
	RenderUtil_1 = require("../../Utils/RenderUtil"),
	CharRuntimeMaterialControllerGroupInfo_1 = require("../Components/MaterialController/CharRuntimeMaterialControllerGroupInfo"),
	NEAR_RANGE = 1e3,
	MIDDLE_RANGE = 2500,
	FAR_RANGE = 5e3,
	MOBILE_NEAR_RANGE = 800,
	MOBILE_MIDDLE_RANGE = 1500,
	MOBILE_FAR_RANGE = 3e3;
class CharRenderingComponent extends UE.ActorComponent {
	constructor() {
		super(...arguments),
			(this.RenderType = void 0),
			(this.InteractionConfig = void 0),
			(this.DecalShadowConfig = void 0),
			(this.AllRenderComps = void 0),
			(this.AllRenderCompsMap = void 0),
			(this.IsInit = !1),
			(this.IsStartInvoke = !1),
			(this.DeltaTime = -0),
			(this.DeltaCount = -0),
			(this.TickCount = 0),
			(this.ForceUpdateOnce = !1),
			(this.IsOnMobile = !1),
			(this.NearDistance = -0),
			(this.MiddleDistance = -0),
			(this.FarDistance = -0),
			(this.CurrentLocation = void 0),
			(this.AllMaterialControlRuntimeDataGroupMap = void 0),
			(this.IndexCount = 0),
			(this.TempRemoveList = void 0),
			(this.SequenceHandleIds = void 0),
			(this.IsDebug = !1),
			(this.CachedOwner = void 0),
			(this.CachedOwnerName = ""),
			(this.CachedOwnerEntity = void 0),
			(this.LogicOwner = void 0),
			(this.IsLogicOwnerTsEffectActor = !1),
			(this.IsUiUpdate = 0),
			(this.OnRoleGoDownFinishEventAdded = !1),
			(this.RemoveInteractionOnRoleGoDownFinish = void 0),
			(this.IsInDebugModeInternal = !1),
			(this.IsRecordInternal = !1);
	}
	QuickInitAndAddData(e, t = void 0) {
		return (
			RenderModuleConfig_1.RenderStats.Init(),
			this.CheckInit() || this.Init(6),
			this.GetOwner() instanceof UE.TsBaseCharacter_C ||
				(t && this.AddComponentByCase(0, t.SkeletalMeshComponent)),
			(t = this.AddMaterialControllerData(e)),
			this.SequenceHandleIds.push(t),
			t
		);
	}
	QuickInitAndAddDataWithMeshComponent(e, t = void 0) {
		return (
			RenderModuleConfig_1.RenderStats.Init(),
			this.CheckInit() || this.Init(6),
			this.GetOwner() instanceof UE.TsBaseCharacter_C ||
				(t && this.AddComponentByCase(0, t)),
			(t = this.AddMaterialControllerData(e)),
			this.SequenceHandleIds.push(t),
			t
		);
	}
	QuickInitAndAddDataGroup(e, t = void 0) {
		return (
			RenderModuleConfig_1.RenderStats.Init(),
			this.CheckInit() || this.Init(6),
			this.GetOwner() instanceof UE.TsBaseCharacter_C ||
				(t && this.AddComponentByCase(0, t.SkeletalMeshComponent)),
			(t = this.AddMaterialControllerDataGroup(e)),
			this.SequenceHandleIds.push(t),
			t
		);
	}
	QuickInitAndAddDataGroupWithMeshComponent(e, t = void 0) {
		return (
			RenderModuleConfig_1.RenderStats.Init(),
			this.CheckInit() || this.Init(6),
			this.GetOwner() instanceof UE.TsBaseCharacter_C ||
				(t && this.AddComponentByCase(0, t)),
			(t = this.AddMaterialControllerDataGroup(e)),
			this.SequenceHandleIds.push(t),
			t
		);
	}
	Init(e) {
		let t = !1;
		if (
			((this.CachedOwner = this.GetOwner()),
			(this.CachedOwnerName = this.CachedOwner.GetName().toString()),
			this.CachedOwner instanceof TsBaseCharacter_1.default &&
				(this.CachedOwnerEntity = this.CachedOwner.GetEntityNoBlueprint()),
			this.IsInit &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("RenderCharacter", 14, "材质控制器已初始化", [
						"Actor",
						this.CachedOwnerName,
					]),
				(t = !0)),
			8 === e &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：初始化参数错误. 初始化类型不应为Error",
						["Actor", this.CachedOwnerName],
					),
				(t = !0)),
			!t)
		) {
			(this.DeltaTime = 0),
				(this.DeltaCount = 0),
				(this.TickCount = 0),
				(this.IsOnMobile =
					0 ===
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
						GlobalData_1.GlobalData.World,
					)),
				(this.NearDistance = this.IsOnMobile ? 800 : 1e3),
				(this.MiddleDistance = this.IsOnMobile ? 1500 : 2500),
				(this.FarDistance = this.IsOnMobile ? 3e3 : 5e3),
				(this.CurrentLocation = Vector_1.Vector.Create()),
				this.CurrentLocation.FromUeVector(
					this.CachedOwner.K2_GetActorLocation(),
				),
				(this.AllRenderComps = new Array()),
				(this.AllRenderCompsMap = new Map()),
				(this.IsInit = !1),
				(this.IsStartInvoke = !1),
				(this.RenderType = e),
				(this.TempRemoveList = []),
				(this.SequenceHandleIds = []),
				(this.IsDebug = !1);
			for (const e of this.GetRenderComps())
				this.AllRenderCompsMap.has(e.GetComponentId())
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"错误:重复添加渲染模块 ID",
							["Actor", this.CachedOwnerName],
							["渲染模块ID", e.GetComponentId()],
						)
					: (this.AllRenderCompsMap.set(e.GetComponentId(), e),
						this.AllRenderComps.push(e),
						e.Awake(this));
			(this.IsInit = !0),
				(this.IsStartInvoke = !1),
				(this.IndexCount = 0),
				(this.AllMaterialControlRuntimeDataGroupMap = new Map()),
				this.InvokeStart();
		}
	}
	SetLogicOwner(e) {
		(this.LogicOwner = e),
			this.LogicOwner &&
				(this.IsLogicOwnerTsEffectActor = this.LogicOwner.IsA(
					UE.TsEffectActor_C.StaticClass(),
				));
	}
	AddComponent(e, t) {
		let n = !1;
		var o = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray.length;
		for (let t = 0; t < o; t++)
			if (e === RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[t]) {
				n = !0;
				break;
			}
		n
			? (this.IsInDebugMode &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderCharacter",
						41,
						"【DEPRECATED】请使用AddComponentByCase接口",
					),
				this.AddComponentInner(e, t, !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"【添加MeshComponent】MeshName必须使用指定的名称, 否则无法进行材质控制。",
					["身体", "CharacterMesh0"],
					[
						"武器",
						"WeaponCase0, WeaponCase1, WeaponCase2, WeaponCase3, WeaponCase4",
					],
					["葫芦", "HuluCase0"],
					[
						"其他",
						"OtherCase0, OtherCase1, OtherCase2, OtherCase3, OtherCase4",
					],
				);
	}
	RemoveComponent(e) {
		this.IsInDebugMode &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"RenderCharacter",
				41,
				"【DEPRECATED】请使用RemoveComponentByCase接口",
			),
			this.RemoveComponentInner(e);
	}
	AddComponentByCase(e, t) {
		(e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e]) &&
			this.AddComponentInner(e, t, !0);
	}
	RemoveComponentByCase(e) {
		(e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e]) &&
			this.RemoveComponentInner(e);
	}
	AddComponentInner(e, t, n) {
		if (t) {
			var o = this.GetComponent(
					RenderConfig_1.RenderConfig.IdMaterialContainer,
				),
				r = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
			let a = !1;
			r && r.RemoveSkeletalMeshMaterialControllerData(e),
				o &&
					(o.RemoveSkeletalComponent(e), (a = o.AddSkeletalComponent(t, e, n))),
				a ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderCharacter",
							14,
							"添加的MeshComponent是失效的!",
							["Actor", this.CachedOwner.GetName()],
						)),
				this.AddComponentForDecalShadow(e, t);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("RenderCharacter", 14, "添加的MeshComponent是失效的", [
					"Actor",
					this.CachedOwner.GetName(),
				]);
	}
	RemoveComponentInner(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer),
			n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		n && n.RemoveSkeletalMeshMaterialControllerData(e),
			t &&
				!t.RemoveSkeletalComponent(e) &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("RenderCharacter", 14, "无法找到要删除的MeshComponent", [
					"Actor",
					this.GetOwner().GetName(),
				]),
			this.RemoveComponentFromDecalShadow(e);
	}
	CheckInit() {
		return this.IsInit;
	}
	SetDebug(e) {
		this.IsDebug = e;
	}
	GetDebugInfo() {
		var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		if (this.IsDebug) return (e.EnableDebug = !0), e.DebugInfo;
		e.EnableDebug = !1;
	}
	GetComponent(e) {
		if (this.IsInit && this.AllRenderCompsMap.has(e))
			return this.AllRenderCompsMap.get(e);
	}
	Tick(e) {
		this.Update(e);
	}
	ReceiveEndPlay(e) {
		2 !== e &&
			(this.Destroy(),
			RenderModuleController_1.RenderModuleController.RemoveCharRenderShell(
				this,
			)
				? Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("RenderCharacter", 14, "材质控制器已正常销毁", [
						"Actor",
						this.GetOwner().GetName(),
					])
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("RenderCharacter", 14, "材质控制器销毁失败", [
						"Actor",
						this.GetOwner().GetName(),
					]));
	}
	GetDeltaTime() {
		return this.DeltaTime;
	}
	GetTimeDilation() {
		let e = RenderModuleController_1.RenderModuleController.IsGamePaused
			? 0
			: RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
		return 0 === e
			? 0
			: (this.LogicOwner &&
					this.IsLogicOwnerTsEffectActor &&
					(e *= this.LogicOwner.GetTimeScale()),
				e);
	}
	GetInWater(e = 2) {
		return this.GetComponent(
			RenderConfig_1.RenderConfig.IdSceneInteraction,
		)?.GetInWater(e);
	}
	GetRenderType() {
		return this.RenderType;
	}
	ResetAllRenderingState() {
		var e;
		(e =
			((e =
				((e = this.GetComponent(
					RenderConfig_1.RenderConfig.IdMaterialController,
				)) && e.RemoveAllMaterialControllerData(),
				this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer))) &&
				e.ResetAllState(),
			this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect))) &&
			e.ResetDitherEffect();
	}
	ResetAllRenderingStateForDebug() {
		var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		e &&
			0 < e.AllMaterialControlRuntimeDataMap.size &&
			(e.PrintCurrentInfo(), this.ResetAllRenderingState());
	}
	AddMaterialControllerDataGroup(e) {
		var t,
			n,
			o = e;
		return o
			? ((t = ++this.IndexCount),
				this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)
					.AllMaterialControlRuntimeDataMap.size >
					RenderConfig_1.RenderConfig.RefErrorCount &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间",
						["Actor", this.GetOwner().GetName()],
						["添加的材质控制器名称", e.GetName()],
						["ID", t],
					),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderCharacter",
						14,
						"添加材质控制器组",
						["Actor", this.GetOwner().GetName()],
						["添加的材质控制器名称", e.GetName()],
						["ID", t],
					),
				o.CleanOriginEffect && this.ResetAllRenderingState(),
				(n =
					new CharRuntimeMaterialControllerGroupInfo_1.CharMaterialControlRuntimeDataGroup()).Init(
					this,
					o,
				),
				this.AllMaterialControlRuntimeDataGroupMap.set(t, n),
				EventSystem_1.EventSystem.EmitWithTarget(
					this,
					EventDefine_1.EEventName.OnAddMaterialControllerGroup,
					e,
					t,
				),
				t)
			: -1;
	}
	RemoveMaterialControllerDataGroup(e) {
		(e = this.AllMaterialControlRuntimeDataGroupMap.get(e)) && e.EndState();
	}
	RemoveMaterialControllerDataGroupWithEnding(e) {
		(e = this.AllMaterialControlRuntimeDataGroupMap.get(e)) &&
			e.EndStateWithEnding();
	}
	GetCachedOwner() {
		return this.CachedOwner;
	}
	AddMaterialControllerDataInner(e, t) {
		var n = e;
		if (!n) return -1;
		var o = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		return o
			? CharRenderingComponent.DisableForDebug
				? (this.ResetAllRenderingStateForDebug(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"RenderCharacter",
							41,
							"【DEBUG】材质控制已关闭",
							["Actor", this.GetOwner().GetName()],
							["材质控制器", n.GetName()],
						),
					-1)
				: (e.CleanOriginEffect && this.ResetAllRenderingState(),
					(o = o.AddMaterialControllerData(n, t)),
					EventSystem_1.EventSystem.EmitWithTarget(
						this,
						EventDefine_1.EEventName.OnAddMaterialController,
						e,
						t,
						o,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderCharacter",
							14,
							"添加材质控制器",
							["Actor", this.GetOwner().GetName()],
							["材质控制器", n.GetName()],
							["handle", o],
							["CleanOriginEffect", e.CleanOriginEffect],
						),
					o)
			: -1;
	}
	AddMaterialControllerDataWithUserData(e, t) {
		return this.AddMaterialControllerDataInner(e, t);
	}
	AddMaterialControllerData(e) {
		return this.AddMaterialControllerDataInner(e);
	}
	RemoveMaterialControllerData(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		t && t.RemoveMaterialControllerData(e);
	}
	RemoveMaterialControllerDataWithEnding(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		t && t.RemoveMaterialControllerDataWithEnding(e);
	}
	AddMaterialControllerDataDestroyCallback(e, t) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		n && n.AddMaterialControllerDataDestroyCallback(e, t);
	}
	RemoveMaterialControllerDataDestroyCallback(e, t) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		n && n.RemoveMaterialControllerDataDestroyCallback(e, t);
	}
	UpdateNpcDitherComponent() {
		var e;
		this.IsInit &&
			(3 !== this.RenderType
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderCharacter", 12, "NPC更新不是NPC类型")
				: (e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect)) &&
					e.UpdateNpcDitherComponent());
	}
	SetDitherEffect(e, t) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
		n &&
			(n.SetDitherEffect(e, t),
			this.SetBodyEffectOpacity(e),
			this.SetDecalShadowOpacity(e),
			this.SetRealtimeShadowOpacity(e));
	}
	RegisterBodyEffect(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
		t && t.RegisterEffect(e);
	}
	SetBodyEffectOpacity(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
		t && t.SetOpacity(e);
	}
	AddInteraction(e, t = 1) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
		n &&
			!n.GetIsPossed() &&
			(n.PossCharacter(e, t),
			!this.OnRoleGoDownFinishEventAdded && this.CachedOwnerEntity) &&
			((this.RemoveInteractionOnRoleGoDownFinish = () => {
				this.RemoveInteraction();
			}),
			EventSystem_1.EventSystem.AddWithTarget(
				this.CachedOwnerEntity,
				EventDefine_1.EEventName.OnRoleGoDownFinish,
				this.RemoveInteractionOnRoleGoDownFinish,
			),
			(this.OnRoleGoDownFinishEventAdded = !0));
	}
	RemoveInteraction() {
		var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
		e && e.UnpossCharacter();
	}
	SetMaterialPropertyFloat(e, t, n, o, r) {
		var a = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
		a &&
			a.SetPropertyFloat(e, t, n, FNameUtil_1.FNameUtil.GetDynamicFName(o), r);
	}
	SetMaterialPropertyColor(e, t, n, o, r) {
		var a = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
		a &&
			a.SetPropertyColor(e, t, n, FNameUtil_1.FNameUtil.GetDynamicFName(o), r);
	}
	SetStarScarEnergy(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
		t && t.SetStarScarEnergy(e);
	}
	SetCapsuleDither(e) {}
	SetDecalShadowEnabled(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		t && (e ? t.EnableDecalShadow() : t.DisableDecalShadow());
	}
	SetRealtimeShadowEnabled(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		t && (e ? t.EnableRealtimeShadow() : t.DisableRealtimeShadow());
	}
	DisableAllShadowByDecalShadowComponent() {
		var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		e && e.DisableAllShadow();
	}
	AddComponentForDecalShadow(e, t) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		n && n.AddPrimitiveComponent(e, t);
	}
	RemoveComponentFromDecalShadow(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		t && t.RemovePrimitiveComponent(e);
	}
	SetDecalShadowOpacity(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		t && t.SetDecalShadowOpacity(e);
	}
	SetRealtimeShadowOpacity(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
		t && t.SetRealtimeShadowOpacity(e);
	}
	MarkForceUpdateOnce() {
		this.ForceUpdateOnce = !0;
	}
	Update(e) {
		if (
			(CharRenderingComponent.DisableForDebug &&
				this.ResetAllRenderingStateForDebug(),
			(this.TickCount += 1),
			30 < this.TickCount &&
				(this.CurrentLocation.FromUeVector(
					this.CachedOwner.K2_GetActorLocation(),
				),
				(this.TickCount = 0)),
			this.IsInit)
		) {
			var t;
			this.ForceUpdateOnce ||
			this.IsInDebugMode ||
			5 === this.RenderType ||
			0 < this.IsUiUpdate ||
			!Info_1.Info.IsGameRunning() ||
			ModelManager_1.ModelManager.PlotModel?.IsInPlot
				? ((this.DeltaCount += 1),
					(this.DeltaTime += e),
					(this.ForceUpdateOnce = !1))
				: (t = Vector_1.Vector.Dist(
							this.CurrentLocation,
							ModelManager_1.ModelManager.CameraModel.CameraLocation,
						)) < this.NearDistance
					? ((this.DeltaCount += 1), (this.DeltaTime += e))
					: (this.NearDistance <= t && t < this.MiddleDistance) ||
							(this.MiddleDistance <= t && t < this.FarDistance)
						? ((this.DeltaCount += 0.5), (this.DeltaTime += e))
						: this.FarDistance <= t &&
							((this.DeltaCount += 0.03), (this.DeltaTime += e));
			for (const t of this.AllMaterialControlRuntimeDataGroupMap.values())
				t.IsDead || t.BeforeUpdateState(e, this.GetTimeDilation());
			if (1 <= this.DeltaCount) {
				for (const e of this.AllRenderComps) e.GetIsInitSuc() && e.Update();
				for (const e of this.AllRenderComps) e.GetIsInitSuc() && e.LateUpdate();
				(this.DeltaTime = 0), (this.DeltaCount = 0);
			}
			this.DataGroupAfterUpdate(e);
		}
	}
	DataGroupAfterUpdate(e) {
		for (const n of this.AllMaterialControlRuntimeDataGroupMap.keys()) {
			var t = this.AllMaterialControlRuntimeDataGroupMap.get(n);
			t.AfterUpdateState(e), t.IsDead && this.TempRemoveList.push(n);
		}
		if (this.TempRemoveList?.length) {
			for (let e = 0; e < this.TempRemoveList.length; e++) {
				var n = this.TempRemoveList[e];
				this.AllMaterialControlRuntimeDataGroupMap.delete(n),
					GlobalData_1.GlobalData.BpEventManager.材质播放结束时.Broadcast(n),
					EventSystem_1.EventSystem.EmitWithTarget(
						this,
						EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
						n,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderCharacter",
							41,
							"移除材质控制器组:",
							["Actor", this.GetOwner().GetName()],
							["ID", n],
						);
			}
			this.TempRemoveList.length = 0;
		}
	}
	SetEffectProgress(e, t) {
		var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		n && n.SetEffectProgress(e, t);
	}
	IsMaterialControllerDataValid(e) {
		var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
		return !!t && void 0 !== t.GetRuntimeMaterialControllerInfo(e);
	}
	Destroy() {
		if (this.IsInit) {
			this.ResetAllRenderingState();
			for (const e of this.AllRenderComps) e.Destroy();
			(this.AllRenderComps = new Array()),
				this.AllRenderCompsMap.clear(),
				(this.IsInit = !1),
				(this.IsStartInvoke = !1),
				(this.RenderType = 8),
				this.CachedOwnerEntity &&
					(EventSystem_1.EventSystem.RemoveWithTarget(
						this.CachedOwnerEntity,
						EventDefine_1.EEventName.OnRoleGoDownFinish,
						this.RemoveInteractionOnRoleGoDownFinish,
					),
					(this.OnRoleGoDownFinishEventAdded = !1));
		}
	}
	OnFinalizedLevelSequence() {
		for (const e of this.SequenceHandleIds.values())
			this.RemoveMaterialControllerData(e),
				this.RemoveMaterialControllerDataGroup(e);
		this.SequenceHandleIds = [];
		var e = this.GetOwner().Mesh;
		e.SetCustomPrimitiveDataFloat(0, 0),
			e.SetCustomPrimitiveDataFloat(1, 0),
			(e.ExposeToCinematicsCustomLightFactor = 0),
			(e.ExposeToCinematicsCustomLightYaw = 0);
	}
	GetRenderComps() {
		return RenderUtil_1.RenderUtil.GetRenderComps(this.RenderType);
	}
	InvokeStart() {
		if (!this.IsStartInvoke) {
			this.IsStartInvoke = !0;
			for (const e of this.AllRenderComps) e.Start();
			for (const e of this.AllRenderComps)
				e.GetIsInitSuc() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"错误:组件初始化错误:",
							["Actor", this.GetOwner().GetName()],
							["组件ID", e.GetComponentId()],
						));
			this.IsRecord ||
				RenderModuleController_1.RenderModuleController.AddCharRenderShell(
					this,
				);
		}
	}
	get IsInDebugMode() {
		return (
			Info_1.Info.IsGameRunning()
				? void 0 === this.IsInDebugModeInternal &&
					(this.IsInDebugModeInternal =
						ModelManager_1.ModelManager.GameModeModel.IsSilentLogin ||
						WorldModel_1.WorldModel.IsStandalone ||
						this.IsRecord ||
						GlobalData_1.GlobalData.IsPlayInEditor)
				: (this.IsInDebugModeInternal =
						WorldModel_1.WorldModel.IsStandalone ||
						this.IsRecord ||
						GlobalData_1.GlobalData.IsPlayInEditor),
			this.IsInDebugModeInternal
		);
	}
	get IsRecord() {
		return (
			void 0 === this.IsRecordInternal &&
				(this.IsRecordInternal =
					this.GetOwner() instanceof UE.KuroRecordCharacter),
			this.IsRecordInternal
		);
	}
	ReceiveBeginPlay() {
		this.SetComponentTickEnabled(this.IsRecord);
	}
	ReceiveTick(e) {
		this.IsRecord && this.Update(e);
	}
	ReceiveSeqTick(e) {
		Info_1.Info.IsGameRunning() || this.Update(e);
	}
}
((exports.CharRenderingComponent =
	CharRenderingComponent).MotionVelocitySquared = [4e4, 25e4]),
	(CharRenderingComponent.MotionMeshShadingRate = [3, 6]),
	(CharRenderingComponent.DisableForDebug = !1),
	(exports.default = CharRenderingComponent);
