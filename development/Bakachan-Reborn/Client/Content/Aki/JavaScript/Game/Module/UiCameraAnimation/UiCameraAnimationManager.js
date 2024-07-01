"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, a, t, n) {
		var i,
			r = arguments.length,
			o =
				r < 3
					? a
					: null === n
						? (n = Object.getOwnPropertyDescriptor(a, t))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(e, a, t, n);
		else
			for (var m = e.length - 1; 0 <= m; m--)
				(i = e[m]) && (o = (r < 3 ? i(o) : 3 < r ? i(a, t, o) : i(a, t)) || o);
		return 3 < r && o && Object.defineProperty(a, t, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraAnimationManager = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stack_1 = require("../../../Core/Container/Stack"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	CameraUtility_1 = require("../../Camera/CameraUtility"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager"),
	UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraSequenceComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraSequenceComponent"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
	UiCameraSpringStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraSpringStructure"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	UiCameraAnimation_1 = require("./UiCameraAnimation"),
	UiCameraAnimationDefine_1 = require("./UiCameraAnimationDefine"),
	UiCameraAnimationHandle_1 = require("./UiCameraAnimationHandle"),
	UiCameraHandleData_1 = require("./UiCameraContext/UiCameraHandleData"),
	UiCameraMappingData_1 = require("./UiCameraContext/UiCameraMappingData");
class UiCameraAnimationManager {
	static Initialize() {
		(this.LoadingViewCameraAnimationLength =
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"LoadingViewCameraAnimationLength",
			)),
			(this.LoadingViewManualFocusDistance =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"LoadingViewManualFocusDistance",
				)),
			(this.LoadingViewAperture =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"LoadingViewAperture",
				)),
			this.hAo();
	}
	static Clear() {
		this.ClearDisplay(), this.lAo();
	}
	static hAo() {
		for (const a of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllUiCameraMappingConfig()) {
			var e = new UiCameraMappingData_1.UiCameraMappingData(a, !1);
			this._Ao.set(a.ViewName, e);
		}
		for (const e of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllChildUiCameraMappingConfig()) {
			var a = new UiCameraMappingData_1.UiCameraMappingData(e, !0);
			this._Ao.set(e.ViewName, a);
		}
	}
	static GetCameraMappingData(e) {
		return this._Ao.get(e);
	}
	static lAo() {
		this._Ao.clear();
	}
	static uAo(e) {
		this.cAo.Push(e);
	}
	static mAo(e) {
		let a = this.cAo.Peek();
		for (var t = e.UniqueId; a && a.UniqueId !== t; )
			this.cAo.Pop(), (a = this.cAo.Peek());
		return this.cAo.Pop(), this.GetLastHandleData();
	}
	static dAo(e) {
		let a = this.cAo.Peek();
		for (var t = e.UniqueId; a && a.UniqueId !== t; )
			this.cAo.Pop(), (a = this.cAo.Peek());
		return this.GetLastHandleData();
	}
	static CAo(e) {
		const a = this.gAo(e);
		if (!a) return !1;
		var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
				a.ViewName,
			),
			n = [];
		let i = !1;
		for (const a of this.cAo)
			if (a.UniqueId === e) n.push(a), (i = !0);
			else if (i) {
				if (!this.fAo(t, a.ViewName)) break;
				n.push(a);
			}
		for (const e of n) this.cAo.Delete(e);
		return !0;
	}
	static fAo(e, a) {
		for (const t of e) if (t.ChildViewName === a) return !0;
		return !1;
	}
	static gAo(e) {
		for (const a of this.cAo) if (a.UniqueId === e) return a;
	}
	static GetLastHandleData() {
		return this.cAo.Peek();
	}
	static pAo() {
		var e = new UiCameraAnimationHandle_1.UiCameraAnimationHandle();
		return e.Initialize(), e;
	}
	static vAo(e, a = !0, t = !0) {
		this.CurrentCameraHandle
			? this.CurrentCameraHandle.Deactivate()
			: (this.CurrentCameraHandle = this.pAo()),
			this.CurrentCameraHandle.Activate(e, a, t);
	}
	static MAo(e, a = !0, t = !0) {
		this.IsPlayingAnimation()
			? this.SAo.WaitCameraAnimationFinished().then(
					(n) => {
						0 === n.FinishType && this.vAo(e, a, t);
					},
					() => {},
				)
			: this.vAo(e, a, t);
	}
	static PushCameraHandleByOpenView(e, a, t = !0) {
		if (UiCameraAnimationManager.CanPushCameraHandle(e)) {
			var n = UiCameraAnimationManager.GetLastHandleData();
			if (n && n.UniqueId === a)
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"此界面已经在栈顶",
						["PushHandleData", n?.ToString()],
						["viewId", a],
					);
			else {
				var i = UiCameraHandleData_1.UiCameraHandleData.NewByView(e);
				if (a && (a = this.gAo(a)))
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"CameraAnimation",
								8,
								"此界面已经入栈,则抛出之后的所有界面镜头状态",
								["PushHandleData", a.ToString()],
							),
						void this.dAo(a)
					);
				let r;
				(a = n?.ViewName),
					a && (r = this.GetBlendName(a, e)),
					this.PushCameraHandle(i, t, !0, r, !0);
			}
		}
	}
	static PushCameraHandleByHandleName(
		e,
		a = !0,
		t = !0,
		n = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME,
		i = !1,
		r = void 0,
		o,
	) {
		var m;
		if (!StringUtils_1.StringUtils.IsBlank(e))
			return (
				(o = UiCameraHandleData_1.UiCameraHandleData.NewByHandleName(e, o)),
				(m = this.GetLastHandleData())
					? ((m = m.ViewName),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"CameraAnimation",
								8,
								"手动播放镜头动画，将镜头数据的ViewName设置为栈顶的数据",
								["HandleName", e],
								["ViewName", m],
							),
						(o.ViewName = m))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"CameraAnimation",
							8,
							"手动播放镜头动画时，当前没有播放任何Ui镜头状态",
							["HandleName", e],
						),
				this.PushCameraHandle(o, a, t, n, i, r),
				o
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"CameraAnimation",
				8,
				"镜头动画的HandleName为空，镜头动画异常",
			);
	}
	static PushCameraHandle(e, a = !0, t = !0, n, i = !1, r = void 0) {
		var o = UiCameraAnimationManager.GetLastHandleData();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"CameraAnimation",
				8,
				"镜头状态数据------入栈",
				["PushHandleData", e.ToString()],
				["LastTopHandleData", o?.ToString()],
			),
			i && this.EAo(e)
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"镜头状态数据------新的镜头状态和旧的镜头状态一致，不会再次播放推入镜头状态表现",
						[
							"CurrentHandleData",
							this.CurrentCameraHandle?.GetHandleData().ToString(),
						],
						["NewHandleData", e.ToString()],
					)
				: (this.uAo(e),
					this.StopUiCameraAnimation(),
					this.yAo(e, o, a, t, n, r));
	}
	static PopCameraHandleByCloseView(e, a, t, n = !0) {
		UiCameraAnimationManager.CanPushCameraHandle(e) &&
			(n
				? ((n = this.GetBlendName(e, a)),
					(a = this.gAo(t)),
					this.PopCameraHandle(a, n))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"CameraAnimation",
							8,
							"仅删除镜头状态，不做任何表现",
							["closeViewName", e],
							["closeViewId", t],
						),
					this.CAo(t)));
	}
	static PopCameraHandle(e, a) {
		var t;
		e
			? ((t = this.mAo(e)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"镜头状态数据------出栈",
						["popHandleData", e.ToString()],
						["TopHandleData", t?.ToString()],
						["blendName", a],
					),
				this.StopUiCameraAnimation(),
				this.yAo(t, e, void 0 !== a, !0, a))
			: this.ClearDisplay();
	}
	static EAo(e) {
		var a;
		return (
			!!this.CurrentCameraHandle &&
			!(
				!(a = this.cAo.Peek()) ||
				!this.UiCamera?.GetIsEntered() ||
				!a.IsEqual(e) ||
				(this.CurrentCameraHandle.SetHandleData(e), 0)
			)
		);
	}
	static yAo(e, a, t = !0, n = !0, i, r = void 0) {
		var o;
		return (
			(this.UiCamera = UiCameraManager_1.UiCameraManager.Get()),
			(this.UiCameraPostEffectComponent = this.UiCamera.GetUiCameraComponent(
				UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
			)),
			(this.UiCameraSequenceComponent = this.UiCamera.GetUiCameraComponent(
				UiCameraSequenceComponent_1.UiCameraSequenceComponent,
			)),
			this.IAo &&
				(this.IAo.StopSequence(), (this.IAo = void 0), this.UiCamera.Exit()),
			e
				? (e.Refresh(),
					this.TAo(e),
					StringUtils_1.StringUtils.IsEmpty(i)
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"CameraAnimation",
									8,
									"镜头状态数据------入栈是BlendName为空，直接激活镜头状态",
									["PushHandleData", e.ToString()],
									["blendName", i],
								),
							this.MAo(e, t, n),
							3)
						: a
							? t
								? !(o =
										ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
											i,
										)) || o.Time <= 0
									? (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"CameraAnimation",
												8,
												"没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头",
												["blendName", i],
											),
										this.vAo(e, !1, !1),
										3)
									: (UiCameraAnimationManager.AsyncPlayCameraAnimation(
											a,
											e,
											i,
										).then(
											(e) => {
												this.HFt(e, r);
											},
											() => {},
										),
										1)
								: (Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"CameraAnimation",
											8,
											"镜头状态数据------不需要播放镜头动画，直接激活镜头状态",
											["LastHandleData", a.ToString()],
											["PushHandleData", e.ToString()],
										),
									this.vAo(e, !1, !1),
									3)
							: (this.MAo(e, t, n), 3))
				: ((o = this.GetCurrentCameraHandle())
						? (this.IAo = o).Revert(!0, () => {
								this.ClearDisplay();
							})
						: this.ClearDisplay(),
					2)
		);
	}
	static TAo(e) {
		this.UiCameraSpringStructure?.IsValid() ||
			e.IsEmptyState ||
			(this.UiCameraSpringStructure = this.UiCamera.PushStructure(
				UiCameraSpringStructure_1.UiCameraSpringStructure,
			));
	}
	static HFt(e, a = void 0) {
		var t = e.FromHandleData,
			n = e.ToHandleData;
		0 === e.FinishType
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"镜头状态数据------入栈动画结束",
						["LastHandleData", t.ToString()],
						["PushHandleData", n.ToString()],
						["FinishType", e.FinishType],
					),
				this.vAo(n, !1, !1))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"CameraAnimation",
					8,
					"镜头状态数据------入栈动画被停止",
					["LastHandleData", t.ToString()],
					["PushHandleData", n.ToString()],
					["FinishType", e.FinishType],
				),
			a && a(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
				e,
			);
	}
	static CanPushCameraHandle(e) {
		return !!(e = this.GetCameraMappingData(e)) && e.CanPushCameraHandle();
	}
	static ReactivateCameraHandle(e = !1, a = !1) {
		var t, n;
		this.CurrentCameraHandle &&
			!this.CurrentCameraHandle.GetIsPendingRevert() &&
			(t = this.CurrentCameraHandle.GetHandleData()) &&
			((n = t.ViewName),
			StringUtils_1.StringUtils.IsEmpty(n) ||
				((n = UiCameraAnimationManager.GetCameraMappingData(n)) &&
					((t.HandleName = n.GetSourceHandleName()), t.Refresh())),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("CameraAnimation", 8, "重新激活镜头状态", [
					"handleData",
					t.ToString(),
				]),
			this.CurrentCameraHandle.Activate(t, e, a));
	}
	static DeactivateCurrentCameraHandle() {
		this.CurrentCameraHandle && this.CurrentCameraHandle.Deactivate();
	}
	static GetCurrentCameraHandle() {
		return this.CurrentCameraHandle;
	}
	static GetBlendName(e, a) {
		if ((e = this.GetCameraMappingData(e))) return e.GetToBlendName(a);
	}
	static IsPlayingAnimation() {
		return !!this.SAo && this.SAo.IsPlaying();
	}
	static IsPlayingBlendInSequence() {
		return (
			!!this.CurrentCameraHandle &&
			this.CurrentCameraHandle.GetIsPlayingBlendInSequence()
		);
	}
	static ClearDisplay() {
		this.StopUiCameraAnimation(),
			this.LAo(),
			UiCameraManager_1.UiCameraManager.Destroy();
		for (const e of this.cAo) e.Reset();
		this.cAo.Clear(),
			this.CurrentCameraHandle?.Reset(),
			(this.UiCamera = void 0),
			(this.UiCameraSpringStructure = void 0),
			(this.UiCameraPostEffectComponent = void 0),
			(this.CurrentCameraHandle = void 0),
			(this.IAo = void 0),
			this.DAo.clear(),
			this.RAo.clear();
	}
	static GenerateHandleDataUniqueId() {
		return this.UAo++;
	}
	static async AsyncPlayCameraAnimation(e, a, t) {
		return (
			this.SAo
				? this.SAo.StopUiCameraAnimation()
				: (this.SAo = new UiCameraAnimation_1.UiCameraAnimation()),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnPlayCameraAnimationStart,
			),
			this.SAo.AsyncPlayUiCameraAnimation(e, a, t)
		);
	}
	static PlayCameraAnimationFromCurrent(e, a) {
		var t = this.GetLastHandleData();
		return this.PushCameraHandleByHandleName(e, !0, !0, a), t;
	}
	static PlayBackCurrent(e = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME) {
		const a = this.CurrentCameraHandle?.GetHandleData();
		var t;
		a &&
			(!(t =
				ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
					e,
				)) || t.Time <= 0
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"CameraAnimation",
							8,
							"没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头",
							["blendName", e],
						),
					this.vAo(a, !1, !1))
				: this.AsyncPlayCameraAnimation(a, a, e).then(
						(e) => {
							0 === e.FinishType && this.vAo(a);
						},
						() => {},
					));
	}
	static StopUiCameraAnimation() {
		this.SAo && (this.SAo.StopUiCameraAnimation(), (this.SAo = void 0));
	}
	static Tick(e) {
		this.SAo && this.SAo.Tick(e),
			this.CurrentCameraHandle && this.CurrentCameraHandle.Tick(e);
	}
	static BroadUiCameraSequenceEvent(e) {
		UiCameraManager_1.UiCameraManager.Get()
			.GetUiCameraComponent(
				UiCameraSequenceComponent_1.UiCameraSequenceComponent,
			)
			.ExecuteUiCameraSequenceEvent(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
				e,
			);
	}
	static IsActivate() {
		return 0 < this.cAo.Size;
	}
	static GetHandleDataStack() {
		return this.cAo;
	}
	static GetTargetActor(e) {
		switch (e) {
			case 2:
				return ModelManager_1.ModelManager.InteractionModel
					.CurrentInteractUeActor;
			case 1:
				return CharacterController_1.CharacterController.GetActor(
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
				);
			case 3:
				return UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
			case 4:
				return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(
					1,
				)?.Actor;
			case 5:
				return UiSceneManager_1.UiSceneManager.GetHandBookCaseActor();
			default:
				return;
		}
	}
	static GetTargetBodyKey(e) {
		switch (e) {
			case 1:
				return (a =
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem)
					? ((a = a.GetConfigId),
						(a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a))
							? a.RoleBody
							: void 0)
					: void 0;
			case 3:
				var a;
				return (a = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor())
					? ((a = (a.Model?.CheckGetComponent(11)).RoleConfigId),
						(a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a))
							? a.RoleBody
							: void 0)
					: void 0;
			case 2:
				if (
					((a =
						ModelManager_1.ModelManager.InteractionModel
							.CurrentInteractEntityId),
					(a = EntitySystem_1.EntitySystem.Get(a)),
					!a?.Valid)
				)
					return;
				switch (a.GetComponent(0).GetModelConfig().体型类型) {
					case 0:
					default:
						return;
					case 5:
						return "FemaleM";
					case 4:
						return "FemaleS";
					case 6:
						return "FemaleXL";
					case 2:
						return "MaleM";
					case 1:
						return "MaleS";
					case 3:
						return "MaleXL";
				}
			default:
				return;
		}
	}
	static GetTargetActorSkeletalMesh(e, a = 0) {
		switch (e) {
			case 2:
				var t =
					ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
				return t
					? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
					: void 0;
			case 1:
				return (t = CharacterController_1.CharacterController.GetActor(
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
				))
					? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
					: void 0;
			case 3:
				return (t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor())
					? t.Model?.CheckGetComponent(1)?.MainMeshComponent
					: void 0;
			case 4:
				return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(
					1,
				)?.MainMeshComponent;
			case 5:
				return (t = UiSceneManager_1.UiSceneManager.GetHandBookVision())
					? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
					: void 0;
			default:
				return;
		}
	}
	static LAo() {
		this.EnablePlayerActor(),
			this.EnableCustomCreatureActor(),
			Global_1.Global.BaseCharacter?.SetDitherEffect(1, 2);
	}
	static DisablePlayerActor() {
		var e,
			a,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t?.Valid
			? (t = t.Entity)?.Valid
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("CameraAnimation", 8, "Ui镜头隐藏玩家Actor"),
					(e = t.GetComponent(1)) &&
						((a = t.Id),
						this.DAo.has(a)
							? Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"CameraAnimation",
									8,
									"已经隐藏过对应的玩家Actor",
									["entityId", a],
									["PlayerActorDisableHandleIdMap", this.DAo],
								)
							: ((a = e.DisableActor("Ui镜头Sequence中隐藏角色")),
								this.DAo.set(t.Id, a))))
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家Entity",
					)
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"CameraAnimation",
					8,
					"Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家EntityHandle",
				);
	}
	static IsDisablePlayer() {
		return this.IsActivate() && 0 < this.DAo.size;
	}
	static EnablePlayerActor() {
		for (var [e, a] of (Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("CameraAnimation", 8, "Ui镜头在清理表现时显示玩家Actor", [
				"DisableHandleId",
				this.DAo,
			]),
		this.DAo)) {
			var t = EntitySystem_1.EntitySystem.Get(e);
			if (!t?.Valid)
				return void (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"Ui镜头在清理表现时显示玩家Actor-失败，因为找不到当前玩家Entity",
						["EntityId", e],
					)
				);
			(t = t.GetComponent(1))
				? t.EnableActor(a)
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"Ui镜头在清理表现时显示玩家Actor-失败，因为当前玩家实体找不到BaseActorComponent",
						["EntityId", e],
					);
		}
		this.DAo.clear();
	}
	static DisableCustomCreatureActor(e) {
		var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (a?.Valid) {
			var t = a.Entity.GetComponent(0);
			if (t && !(e > (t = t.CustomServerEntityIds).length || 0 === e)) {
				a = a.Entity.Id;
				var n = t[e - 1];
				n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
				if (n?.Valid) {
					var i = n.Entity.GetComponent(1);
					if (i) {
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Battle",
								4,
								"隐藏伴生物",
								["customServerEntityIds", t],
								["customEntity", n.Id],
							),
							(t = i.DisableActor("Ui镜头Sequence中隐藏角色伴生物"));
						let r = this.RAo.get(a);
						r || ((r = new Map()), this.RAo.set(a, r)), r.set(e, t);
					}
				}
			}
		}
	}
	static EnableCustomCreatureActor() {
		for (var [e, a] of this.RAo) {
			if (!(e = EntitySystem_1.EntitySystem.Get(e).GetComponent(0))) return;
			var t,
				n,
				i = e.CustomServerEntityIds;
			for ([t, n] of a) {
				var r = i[t - 1];
				if (!(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)))
					return;
				var o = r.Entity.GetComponent(1);
				if (!o) return;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						4,
						"显示伴生物",
						["customServerEntityIds", i],
						["customEntity", r.Id],
					),
					o.EnableActor(n);
			}
		}
		this.RAo.clear();
	}
	static ResetFightCameraRotation() {
		var e;
		!Global_1.Global.BaseCharacter ||
			(e =
				CameraController_1.CameraController.FightCamera
					.LogicComponent).CameraGuideController?.IsLockCameraInput() ||
			(e.SetRotation(
				CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
			),
			e.ResetFightCameraLogic(!1));
	}
}
(UiCameraAnimationManager.UAo = 0),
	(UiCameraAnimationManager._Ao = new Map()),
	(UiCameraAnimationManager.cAo = new Stack_1.Stack()),
	(UiCameraAnimationManager.CurrentCameraHandle = void 0),
	(UiCameraAnimationManager.SAo = void 0),
	(UiCameraAnimationManager.IAo = void 0),
	(UiCameraAnimationManager.LoadingViewCameraAnimationLength = 0),
	(UiCameraAnimationManager.LoadingViewManualFocusDistance = 0),
	(UiCameraAnimationManager.LoadingViewAperture = void 0),
	(UiCameraAnimationManager.DAo = new Map()),
	(UiCameraAnimationManager.RAo = new Map()),
	(UiCameraAnimationManager.UiCamera = void 0),
	(UiCameraAnimationManager.UiCameraSpringStructure = void 0),
	(UiCameraAnimationManager.UiCameraPostEffectComponent = void 0),
	(UiCameraAnimationManager.UiCameraSequenceComponent = void 0),
	__decorate(
		[
			(0, PerformanceDecorators_1.PerformanceFunctionEx)(
				"UiCameraAnimationManager.Tick",
			),
		],
		UiCameraAnimationManager,
		"Tick",
		null,
	),
	(exports.UiCameraAnimationManager = UiCameraAnimationManager);
