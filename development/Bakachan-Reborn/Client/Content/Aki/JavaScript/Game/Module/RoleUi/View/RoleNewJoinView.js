"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleNewJoinView = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	BlackScreenController_1 = require("../../BlackScreen/BlackScreenController"),
	GachaDefine_1 = require("../../Gacha/GachaDefine"),
	GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
	UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
	UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
	RoleController_1 = require("../RoleController");
class RoleNewJoinView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.EPe = void 0),
			(this.UiCameraHandleData = void 0),
			(this.Bkt = void 0),
			(this.eWt = void 0),
			(this.tWt = void 0),
			(this.iWt = void 0),
			(this.oWt = void 0),
			(this.exe = void 0),
			(this.hWt = void 0),
			(this.$be = void 0),
			(this.aGn =
				UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
			(this.lWt = 0),
			(this.cgo = !1),
			(this.OnSequenceEventByStringParam = (e) => {
				switch (e) {
					case "Flash1":
						this.eWt.NiagaraComponent.ReinitializeSystem();
						break;
					case "Flash2":
						5 === this.lWt
							? (this.tWt.SetActorHiddenInGame(!1),
								this.tWt?.NiagaraComponent.ReinitializeSystem())
							: 4 === this.lWt
								? (this.iWt.SetActorHiddenInGame(!1),
									this.iWt?.NiagaraComponent.ReinitializeSystem())
								: 3 === this.lWt &&
									(this.oWt.SetActorHiddenInGame(!1),
									this.oWt?.NiagaraComponent.ReinitializeSystem());
				}
			}),
			(this.CloseViewEvent = () => {
				this.wWt();
			}),
			(this.wWt = () => {
				this.BWt(!0);
			}),
			(this.BWt = (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Gacha", 28, "GachaScene被关闭"),
					e &&
						(UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.AfterCloseGachaScene,
						));
			}),
			(this.mgo = () => {
				this.$ne();
			}),
			(this.vao = () => {
				this.cgo || ((this.cgo = !0), this.dgo());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UITexture],
			[4, UE.UIHorizontalLayout],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[6, this.vao],
				[7, this.mgo],
			]);
	}
	OnBeforeCreate() {
		(this.zke = this.OpenParam),
			(this.lWt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
				this.zke,
			).QualityId);
	}
	async OnCreateAsync() {
		await Promise.all([
			ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence([this.zke]),
			BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
				"Start",
				"RoleNewJoinView",
			),
		]);
	}
	async OnBeforeStartAsync() {
		await this.lGn();
	}
	async lGn() {
		var e = this.zke,
			t =
				((e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e)),
				(e =
					ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
						e.ShowSequence,
					)),
				(e = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(
					e.SequencePath,
				)),
				(this.Bkt = ActorSystem_1.ActorSystem.Get(
					UE.LevelSequenceActor.StaticClass(),
					new UE.Transform(),
					void 0,
					!1,
				)),
				this.Bkt.SetSequence(e),
				UE.NewArray(UE.SkeletalMesh));
		const a = new CustomPromise_1.CustomPromise();
		var i = this.Bkt.GetBindingByTagInTemplate(
			GachaScanView_1.SCENE_ROLE_TAG,
			!0,
		);
		for (let e = 0; e < i.Num(); e++) {
			var o = i.Get(e);
			if (o) {
				var n = o.K2_GetComponentsByClass(
					UE.SkeletalMeshComponent.StaticClass(),
				);
				for (let e = 0; e < n.Num(); e++) {
					var r = n.Get(e);
					t.Add(r.SkeletalMesh);
				}
			}
		}
		t.Num() <= 0 ||
			((this.aGn =
				UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
					t,
					void 0,
					() => {
						a.SetResult();
					},
				)),
			await a.Promise);
	}
	OnStart() {
		this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
			this.GetHorizontalLayout(4),
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlaySequenceEventByStringParam,
			this.OnSequenceEventByStringParam,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseGachaSceneView,
				this.CloseViewEvent,
			);
	}
	OnAfterShow() {
		(this.cgo = !1), this.bl();
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlaySequenceEventByStringParam,
			this.OnSequenceEventByStringParam,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseGachaSceneView,
				this.CloseViewEvent,
			);
	}
	OnBeforeDestroy() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
			this.UiCameraHandleData,
			GachaDefine_1.GACHA_BLEND_CAMERA,
		),
			this.aGn ===
				UiModelResourcesManager_1.UiModelResourcesManager
					.StreamingInvalidValue &&
				(UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
					this.aGn,
				),
				(this.aGn =
					UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)),
			this.DWt(),
			this.hWt?.EndGachaScene(),
			ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
	}
	OnHandleLoadScene() {
		(this.exe = UE.KuroCollectActorComponent.GetActorWithTag(
			FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"),
			0,
		)),
			(this.eWt = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"),
				0,
			)),
			(this.tWt = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"),
				0,
			)),
			(this.iWt = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"),
				0,
			)),
			(this.oWt = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"),
				0,
			)),
			(this.hWt = UE.KuroCollectActorComponent.GetActorWithTag(
				FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"),
				0,
			)),
			this.hWt.SetTickableWhenPaused(!0),
			this.eWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
			this.tWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
			this.iWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
			this.oWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1);
		var e = new UE.Vector(200, 0, 0),
			t = new UE.Vector(60, 0, 0),
			a = new UE.Rotator(0, 90, 0);
		this.eWt.K2_SetActorRelativeLocation(t, !1, void 0, !1),
			this.tWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.iWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.oWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.eWt.K2_SetActorRelativeRotation(a, !1, void 0, !1),
			this.tWt.K2_SetActorRelativeRotation(a, !1, void 0, !1),
			this.iWt.K2_SetActorRelativeRotation(a, !1, void 0, !1),
			this.oWt.K2_SetActorRelativeRotation(a, !1, void 0, !1),
			(this.UiCameraHandleData =
				UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
					GachaDefine_1.GACHA_WEAPON_CAMERA,
					!0,
					!0,
					GachaDefine_1.GACHA_BLEND_CAMERA,
				));
	}
	bl() {
		this.yWt(),
			this.Og(),
			this.RefreshModel(),
			this.UiViewSequence.StopPrevSequence(!1),
			this.UiViewSequence.PlaySequence("Show", !0);
	}
	Og() {
		var e,
			t = this.zke,
			a =
				((t = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t)),
				ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
					t.ElementId,
				));
		a &&
			(this.GetTexture(3).SetColor(UE.Color.FromHex(a.ElementColor)),
			(e = this.GetTexture(2)),
			this.SetTextureByPath(a.Icon, e),
			(a = UE.Color.FromHex(a.ElementColor)),
			e.SetColor(a)),
			this.GetText(0).ShowTextNew(t.Name),
			this.GetText(5).ShowTextNew(t.Introduction),
			this.$be.RebuildLayout(this.lWt),
			BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
				"Close",
				"RoleNewJoinView",
			);
	}
	RefreshModel() {
		var e,
			t = this.zke,
			a =
				((t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(t)),
				CameraController_1.CameraController.SetViewTarget(
					this.exe,
					"RoleNewJoinView.RefreshModel",
				),
				new UE.MovieSceneSequencePlaybackSettings());
		(a.bRestoreState = !0),
			(a.bPauseAtEnd = !0),
			(this.Bkt.PlaybackSettings = a),
			this.Bkt.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.exe),
			(this.EPe = this.Bkt.SequencePlayer),
			RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
				? 0 < t.BindPoint?.length
					? ((this.Bkt.bOverrideInstanceData = !0),
						(this.Bkt.DefaultInstanceData.TransformOriginActor =
							UE.KuroCollectActorComponent.GetActorWithTag(
								FNameUtil_1.FNameUtil.GetDynamicFName(t.BindPoint),
								1,
							)))
					: ((this.Bkt.bOverrideInstanceData = !0),
						(a = this.Bkt.DefaultInstanceData),
						(e = UE.KuroCollectActorComponent.GetActorWithTag(
							FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
							1,
						)),
						(a.TransformOrigin = e.GetTransform()))
				: 0 < t.BindPoint?.length &&
					((this.Bkt.bOverrideInstanceData = !0),
					(this.Bkt.DefaultInstanceData.TransformOriginActor =
						UE.KuroCollectActorComponent.GetActorWithTag(
							FNameUtil_1.FNameUtil.GetDynamicFName(t.BindPoint),
							1,
						))),
			this.EPe.PlayTo(
				new UE.MovieSceneSequencePlaybackParams(
					new UE.FrameTime(),
					0,
					"A",
					2,
					0,
				),
			),
			this.RWt();
	}
	RWt() {
		var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.zke);
		1302 === e.Id
			? this.hWt?.Yinlin()
			: 1404 === e.Id
				? this.hWt?.Jiyan()
				: 1203 === e.Id
					? this.hWt?.Anke()
					: 1503 === e.Id
						? this.hWt?.Jueyuan()
						: 1301 === e.Id
							? this.hWt?.Kakaluo()
							: 1603 === e.Id
								? this.hWt?.Chun()
								: 1104 === e.Id
									? this.hWt?.Awu()
									: 5 === e.QualityId
										? this.hWt?.CharacterGolden()
										: 4 === e.QualityId && this.hWt?.CharacterPurple();
	}
	yWt() {
		this.tWt.SetActorHiddenInGame(!0),
			this.iWt.SetActorHiddenInGame(!0),
			this.oWt.SetActorHiddenInGame(!0),
			this.tWt.NiagaraComponent?.Deactivate(),
			this.iWt.NiagaraComponent?.Deactivate(),
			this.oWt.NiagaraComponent?.Deactivate();
	}
	DWt() {
		if (
			(this.EPe &&
				(this.EPe.OnStop.Clear(), this.EPe.Stop(), (this.EPe = void 0)),
			this.Bkt?.IsValid())
		) {
			const e = this.Bkt;
			TimerSystem_1.TimerSystem.Next(() => {
				ActorSystem_1.ActorSystem.Put(e);
			}),
				(this.Bkt = void 0);
		}
	}
	$ne() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.CloseGachaSceneView,
		);
	}
	async dgo() {
		await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
			"Start",
			"RoleNewJoinView",
		);
		var e = [this.zke];
		RoleController_1.RoleController.CloseAndOpenRoleMainView(
			this.Info.Name,
			0,
			this.zke,
			e,
			void 0,
			() => {
				BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
					"Close",
					"RoleNewJoinView",
				),
					this.$ne();
			},
		);
	}
}
exports.RoleNewJoinView = RoleNewJoinView;
