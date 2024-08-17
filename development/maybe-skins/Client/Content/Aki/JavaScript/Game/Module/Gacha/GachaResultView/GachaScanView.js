"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaScanView =
		exports.SCENE_ROLE_TAG =
		exports.SCENE_CAMERA_TAG =
			void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ChannelController_1 = require("../../Channel/ChannelController"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
	ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GachaDefine_1 = require("../GachaDefine"),
	GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView"),
	GlobalData_1 = require("../../../GlobalData"),
	GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager");
(exports.SCENE_CAMERA_TAG = new UE.FName("SequenceCamera")),
	(exports.SCENE_ROLE_TAG = new UE.FName("Role"));
class GachaScanView extends GachaSceneView_1.GachaSceneView {
	constructor() {
		super(...arguments),
			(this.GachaResult = void 0),
			(this.CurIndex = 0),
			(this.LastIndex = -1),
			(this.xjt = void 0),
			(this.Jjt = void 0),
			(this.EPe = void 0),
			(this.zjt = void 0),
			(this.Zjt = void 0),
			(this.Bkt = void 0),
			(this.eWt = void 0),
			(this.tWt = void 0),
			(this.iWt = void 0),
			(this.oWt = void 0),
			(this.exe = void 0),
			(this.$be = void 0),
			(this.Njt = void 0),
			(this.rWt = 0),
			(this.nWt = 0),
			(this.sWt = 0),
			(this.aWt = 0),
			(this.hWt = void 0),
			(this.lWt = 0),
			(this._Wt = !1),
			(this.uWt = void 0),
			(this.cWt = void 0),
			(this.mWt = 190),
			(this.dWt = 190),
			(this.CWt = !1),
			(this.gWt = void 0),
			(this.Ojt = () => {
				var e,
					t =
						5 <= this.lWt && ChannelController_1.ChannelController.CouldShare();
				this.GetItem(18)?.SetUIActive(t),
					t &&
						((t = ShareRewardById_1.configShareRewardById.GetConfig(
							2 ===
								ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
									this.fWt().u5n.G3n,
								)
								? 4
								: 3,
						)),
						(e = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(
							t.Id,
						)),
						this.GetItem(20)?.SetUIActive(e),
						e) &&
						((e = [...t.ShareReward][0]), this.Njt?.SetItemInfo(e[0], e[1]));
			}),
			(this.pWt = () => {
				ChannelController_1.ChannelController.ShareGacha([this.fWt()]);
			}),
			(this.vWt = () => {
				(this._Wt = !0), this.AddIndex();
			}),
			(this.kjt = () => {
				this.CWt && this.AddIndex();
			}),
			(this.MWt = void 0),
			(this.SWt = void 0),
			(this.OnSequenceEventByStringParam = (e) => {
				var t = this.MWt,
					i = this.SWt,
					a = t.Model,
					o = i.Model;
				switch (e) {
					case "Flash1":
						this.eWt.NiagaraComponent.ReinitializeSystem();
						break;
					case "Flash2":
						AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_burst"),
							5 === this.lWt
								? (this.tWt.SetActorHiddenInGame(!1),
									this.tWt?.NiagaraComponent.ReinitializeSystem())
								: 4 === this.lWt
									? (this.iWt.SetActorHiddenInGame(!1),
										this.iWt?.NiagaraComponent.ReinitializeSystem())
									: 3 === this.lWt &&
										(this.oWt.SetActorHiddenInGame(!1),
										this.oWt?.NiagaraComponent.ReinitializeSystem());
						break;
					case "WeaponDA":
						(this.rWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
							a,
							"GachaMaterialController",
						)),
							(this.nWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
								o,
								"GachaMaterialController",
							));
						break;
					case "WeaponEffect":
						5 === this.lWt
							? ((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
									a,
									"GachaBurstGoldController",
								)),
								(this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
									o,
									"GachaBurstGoldController",
								)))
							: 4 === this.lWt
								? ((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
										a,
										"GachaBurstPurpleController",
									)),
									(this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
										o,
										"GachaBurstPurpleController",
									)))
								: 3 === this.lWt &&
									((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
										a,
										"GachaBurstWhiteController",
									)),
									(this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
										o,
										"GachaBurstWhiteController",
									)));
						break;
					case "RemoveWeaponDA":
						UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(a, this.rWt),
							UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(o, this.nWt),
							UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(a, this.sWt),
							UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(o, this.aWt);
				}
			});
	}
	fWt() {
		return this.GachaResult[this.CurIndex];
	}
	EWt() {
		if (!(this.LastIndex < 0)) return this.GachaResult[this.LastIndex];
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UITexture],
			[5, UE.UITexture],
			[6, UE.UIHorizontalLayout],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UITexture],
			[16, UE.UIText],
			[18, UE.UIItem],
			[19, UE.UIButtonComponent],
			[20, UE.UIItem],
			[21, UE.UIItem],
			[22, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.vWt],
				[1, this.kjt],
				[19, this.pWt],
			]);
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		if (void 0 !== e && e.SkipOnLoadResourceFinish) {
			var t = [];
			for (const e of ModelManager_1.ModelManager.GachaModel.CurGachaResult)
				t.push(e.u5n.G3n);
			await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(t);
		}
		(this.Njt = new ShareRewardInfo_1.ShareRewardInfo()),
			await this.Njt.OnlyCreateByActorAsync(this.GetItem(21).GetOwner()),
			this.AddChild(this.Njt),
			(this.GachaResult =
				ModelManager_1.ModelManager.GachaModel.CurGachaResult),
			this.GachaResult || (this.GachaResult = []),
			this.GetItem(12).SetUIActive(!1),
			void 0 !==
				this.GachaResult.find(
					(e) => (
						(e = e.u5n?.G3n ?? 0),
						5 === ModelManager_1.ModelManager.GachaModel.GetGachaQuality(e)
					),
				) &&
				((e = (
					await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
						"UiItem_FiveStar",
						this.GetItem(12),
					)
				).GetComponentByClass(UE.UIItem.StaticClass())),
				(this.zjt = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
				this.zjt.BindSequenceCloseEvent(() => {
					this.GetItem(12).SetUIActive(!1), this.AfterFiveStarAnimation();
				})),
			(this.gWt = CameraController_1.CameraController.Model.CurrentCameraActor);
	}
	OnAfterOpenUiScene() {
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
			i = new UE.Rotator(0, 90, 0);
		this.eWt.K2_SetActorRelativeLocation(t, !1, void 0, !1),
			this.tWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.iWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.oWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
			this.eWt.K2_SetActorRelativeRotation(i, !1, void 0, !1),
			this.tWt.K2_SetActorRelativeRotation(i, !1, void 0, !1),
			this.iWt.K2_SetActorRelativeRotation(i, !1, void 0, !1),
			this.oWt.K2_SetActorRelativeRotation(i, !1, void 0, !1);
	}
	yWt() {
		this.tWt?.SetActorHiddenInGame(!0),
			this.iWt?.SetActorHiddenInGame(!0),
			this.oWt?.SetActorHiddenInGame(!0),
			this.tWt?.NiagaraComponent?.Deactivate(),
			this.iWt?.NiagaraComponent?.Deactivate(),
			this.oWt?.NiagaraComponent?.Deactivate();
	}
	IWt() {
		(this.xjt = new SmallItemGrid_1.SmallItemGrid()),
			this.xjt.Initialize(this.GetItem(8).GetOwner()),
			(this.Jjt = new SmallItemGrid_1.SmallItemGrid()),
			this.Jjt.Initialize(this.GetItem(10).GetOwner());
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlaySequenceEventByStringParam,
			this.OnSequenceEventByStringParam,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFirstShare,
				this.Ojt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlaySequenceEventByStringParam,
			this.OnSequenceEventByStringParam,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFirstShare,
				this.Ojt,
			);
	}
	Refresh() {
		this.yWt();
		var e = this.fWt().u5n?.G3n ?? 0;
		e <= 0
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Gacha", 44, "抽卡获得物品为空")
			: (3 === (e = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(e))
					? AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "normal")
					: 4 === e
						? AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "purple")
						: 5 === e &&
							AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "golden"),
				AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_next"),
				5 === e
					? (this.GetItem(12).SetUIActive(!0),
						this.zjt?.PlayLevelSequenceByName("Start", !0))
					: this.AfterFiveStarAnimation());
	}
	AfterFiveStarAnimation() {
		this.RefreshView(), this.RefreshModel();
	}
	RefreshView() {
		var e = this.fWt(),
			t = e.u5n.G3n,
			i = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.u5n.G3n),
			a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
		let o = 0;
		this.Zjt?.StopSequenceByKey("Show"),
			this.Zjt?.StopSequenceByKey("ConvertShow"),
			this.GetItem(13).SetAlpha(0),
			this.GetItem(22).SetAlpha(0),
			1 === i
				? (this.GetItem(3).SetUIActive(!0),
					(o = (i =
						ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t))
						.QualityId),
					(t = i.ElementId),
					(t =
						ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(t)) &&
						(this.GetTexture(5).SetColor(UE.Color.FromHex(t.ElementColor)),
						(n = this.GetTexture(4)),
						this.SetTextureByPath(t.Icon, n),
						(t = UE.Color.FromHex(t.ElementColor)),
						n.SetColor(t)),
					this.GetText(2).ShowTextNew(i.Name))
				: (this.GetItem(3).SetUIActive(!1),
					(o = a.QualityId),
					this.GetText(2).ShowTextNew(a.Name));
		var n = 5 === o || (4 === o && e.IsNew);
		this.GetButton(0).RootUIComp.SetUIActive(!n),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Gacha",
					35,
					"星星刷新:",
					["qualityId", o],
					["LayoutDisplayCount", this.$be.GetDisplayCount()],
					["LayoutItemList", this.$be.GetItemList()?.length],
				),
			this.$be.RebuildLayout(o),
			(t = e.v5n);
		if (
			(this.GetItem(11)?.SetUIActive(e.IsNew),
			this.GetItem(7).SetUIActive(!!t && 0 < t?.length),
			e.v5n && 0 < e.v5n?.length)
		) {
			this.xjt.SetActive(!0);
			const t = e.v5n[0];
			(i = {
				Type: 4,
				ItemConfigId: t.G3n,
				BottomText: t.g5n.toString(),
				Data: void 0,
			}),
				this.xjt.Apply(i),
				this.xjt.BindOnCanExecuteChange(() => !1),
				this.xjt.BindOnExtendToggleRelease(() => {
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						t.G3n,
					);
				});
		} else this.xjt.SetActive(!1);
		if (
			((a = e.p5n),
			this.GetItem(9).SetUIActive(0 < (a?.length ?? 0)),
			a && 0 < a?.length)
		) {
			this.Jjt.SetActive(!0);
			const e = a[0];
			(n = {
				Type: 4,
				ItemConfigId: e.G3n,
				BottomText: e.g5n.toString(),
				Data: void 0,
			}),
				this.Jjt.Apply(n),
				this.Jjt.BindOnCanExecuteChange(() => !1),
				this.Jjt.BindOnExtendToggleRelease(() => {
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e.G3n,
					);
				}),
				this.Zjt.PlayLevelSequenceByName("ConvertShow", !1);
		} else this.Jjt.SetActive(!1);
		1 < (a?.length ?? 0) &&
			((t = a[1]), Log_1.Log.CheckError()) &&
			Log_1.Log.Error(
				"Gacha",
				9,
				"转换奖励只能有一个!, 请检查配置表",
				["itemId", t.G3n],
				["itemCount", t.g5n],
			),
			(i = e.M5n) && 0 < i.G3n && 0 < i.g5n
				? (this.GetItem(14).SetUIActive(!0),
					this.SetItemIcon(this.GetTexture(15), i.G3n),
					this.GetText(16)?.SetText(i.g5n.toString()))
				: this.GetItem(14).SetUIActive(!1),
			this.Ojt();
	}
	RefreshModel() {
		if ((t = this.EWt()))
			switch (
				((t = t.u5n.G3n),
				ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t))
			) {
				case 1:
					this.TWt();
					break;
				case 2:
					this.LWt();
			}
		if ((t = this.fWt())) {
			var e = t.u5n.G3n,
				t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e),
				i =
					ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
						t.ShowSequence,
					),
				a = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e),
				o =
					((i = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(
						i.SequencePath,
					)),
					this.DWt(),
					CameraController_1.CameraController.SetViewTarget(
						this.exe,
						"GachaScanView.RefreshModel",
					),
					new UE.MovieSceneSequencePlaybackSettings()),
				n =
					((o.bRestoreState = !0),
					(o.bPauseAtEnd = !0),
					(this.Bkt = ActorSystem_1.ActorSystem.Spawn(
						UE.LevelSequenceActor.StaticClass(),
						MathUtils_1.MathUtils.DefaultTransform,
						void 0,
					)),
					(this.Bkt.PlaybackSettings = o),
					(this.EPe = this.Bkt.SequencePlayer),
					this.Bkt.SetSequence(i),
					this.Bkt.SetTickableWhenPaused(!0),
					this.Bkt.AddBindingByTag(exports.SCENE_CAMERA_TAG, this.exe, !1, !0),
					RenderModuleController_1.RenderModuleController
						.DebugNewUiSceneWorkflow
						? 0 < t.BindPoint?.length
							? ((this.Bkt.bOverrideInstanceData = !0),
								(this.Bkt.DefaultInstanceData.TransformOriginActor =
									UE.KuroCollectActorComponent.GetActorWithTag(
										FNameUtil_1.FNameUtil.GetDynamicFName(t.BindPoint),
										1,
									)))
							: ((this.Bkt.bOverrideInstanceData = !0),
								(o = this.Bkt.DefaultInstanceData),
								(i = UE.KuroCollectActorComponent.GetActorWithTag(
									FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
									1,
								)),
								(o.TransformOrigin = i.GetTransform()))
						: 0 < t.BindPoint?.length &&
							((this.Bkt.bOverrideInstanceData = !0),
							(this.Bkt.DefaultInstanceData.TransformOriginActor =
								UE.KuroCollectActorComponent.GetActorWithTag(
									FNameUtil_1.FNameUtil.GetDynamicFName(t.BindPoint),
									1,
								))),
					this.Bkt.GetBindingByTagInTemplate(exports.SCENE_ROLE_TAG, !0)),
				r = n.Num();
			for (let e = 0; e < r; e++) {
				var s = n.Get(e);
				if (s) {
					var h = s.K2_GetComponentsByClass(
							UE.SkeletalMeshComponent.StaticClass(),
						),
						l = h.Num();
					for (let e = 0; e < l; e++) {
						var m = h.Get(e);
						m && m.SetTickableWhenPaused(!0);
					}
				}
			}
			(this.CWt = !1),
				1 === a
					? (this.EPe.OnPause.Add(() => {
							this.CWt = !0;
						}),
						(o = this.EPe.GetStartTime().Time),
						this.EPe.PlayTo(
							new UE.MovieSceneSequencePlaybackParams(o, 0, "A", 2, 0),
						))
					: (this.EPe.OnFinished.Add(() => {
							this.CWt = !0;
						}),
						this.EPe.Play()),
				this.cWt &&
					(TimerSystem_1.TimerSystem.Remove(this.cWt), (this.cWt = void 0));
			let d = 120;
			switch (a) {
				case 1:
					(this.lWt =
						ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
							e,
						).QualityId),
						(d = this.mWt),
						this.RWt();
					break;
				case 2:
					this.UWt(e),
						(this.lWt =
							ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
								e,
							)?.QualityId),
						(d = this.dWt);
			}
			this.Zjt.StopSequenceByKey("Show"),
				(this.cWt = TimerSystem_1.TimerSystem.Forever(() => {
					var e = this.EPe.GetCurrentTime().Time.FrameNumber.Value;
					this.EPe.GetEndTime().Time.FrameNumber.Value - e < d &&
						(this.Zjt.PlayLevelSequenceByName("Show", !1),
						TimerSystem_1.TimerSystem.Remove(this.cWt),
						(this.cWt = void 0));
				}, 100));
		}
	}
	LWt() {
		var e = this.MWt?.Model,
			t = this.SWt?.Model;
		e && UiModelUtil_1.UiModelUtil.SetVisible(e, !1),
			t && UiModelUtil_1.UiModelUtil.SetVisible(t, !1);
	}
	RWt() {
		var e = this.fWt().u5n.G3n;
		1302 ===
		(e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e)).Id
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
										: this.hWt?.UpdateGachaShowItem(e.Id);
	}
	TWt() {
		this.DWt();
	}
	DWt() {
		this.EPe && (this.EPe.OnStop.Clear(), this.EPe.Stop(), (this.EPe = void 0)),
			this.Bkt?.IsValid() &&
				(this.Bkt.ResetBindings(),
				(this.Bkt.bOverrideInstanceData = !1),
				(this.Bkt.DefaultInstanceData.TransformOriginActor = void 0),
				(this.Bkt = void 0));
	}
	UWt(e) {
		2 === ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e) &&
			this.YHt(e);
	}
	YHt(e) {
		var t = this.MWt;
		if (t) {
			var i =
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e);
			let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(
				this.uWt,
				e.toString(),
			);
			a =
				a ||
				ConfigManager_1.ConfigManager.GachaConfig.GetGachaWeaponTransformConfig(
					i.WeaponType,
				);
			const o = t.Model;
			e = o.CheckGetComponent(2);
			const n = o.CheckGetComponent(1);
			e?.LoadModelByModelId(i.ModelId, !1, () => {
				a.ShowScabbard || UiModelUtil_1.UiModelUtil.SetVisible(o, !0);
				var e = UE.KuroCollectActorComponent.GetActorWithTag(
						FNameUtil_1.FNameUtil.GetDynamicFName(
							GachaDefine_1.GACHA_WEAPON_CASE,
						),
						1,
					),
					t =
						((e =
							(n.Actor?.K2_AttachToActor(e, void 0, 2, 2, 2, !1),
							Transform_1.Transform.Create())),
						a.Rotation),
					i = ((t = Rotator_1.Rotator.Create(t.Y, t.Z, t.X)), a.Size);
				(i = Vector_1.Vector.Create(i, i, i)),
					e.SetLocation(a.Location),
					e.SetRotation(t.Quaternion()),
					e.SetScale3D(i.ToUeVector()),
					n.MainMeshComponent?.K2_SetRelativeTransform(
						e.ToUeTransform(),
						!1,
						void 0,
						!1,
					),
					(t = o.CheckGetComponent(9)),
					t?.SetRotateParam(a.RotateTime, 1, !0),
					(i = new UE.Rotator(a.AxisRotate.Y, a.AxisRotate.Z, a.AxisRotate.X));
				n?.Actor?.K2_SetActorRotation(i, !1), t?.StartRotate();
			}),
				5 === i.QualityId
					? this.hWt?.WeaponGolden()
					: 4 === i.QualityId
						? this.hWt?.WeaponPurple()
						: 3 === i.QualityId && this.hWt?.WeaponNormal();
			const r = this.SWt.Model;
			(t = i.Models),
				a.ShowScabbard && 1 < t.length
					? ((e = t[1]),
						r.CheckGetComponent(2)?.LoadModelByModelId(e, !1, () => {
							var e = r.CheckGetComponent(1),
								t =
									(e.Actor.K2_AttachToActor(n?.Actor, void 0, 2, 1, 1, !1),
									Transform_1.Transform.Create());
							t.SetLocation(a.ScabbardOffset),
								e?.MainMeshComponent?.K2_SetRelativeTransform(
									t.ToUeTransform(),
									!1,
									void 0,
									!1,
								),
								UiModelUtil_1.UiModelUtil.SetVisible(r, !0);
						}))
					: UiModelUtil_1.UiModelUtil.SetVisible(r, !1);
		}
	}
	AddIndex() {
		if (this.CurIndex >= this.GachaResult.length - 1) this.Finish();
		else {
			if (this._Wt) {
				var e = this.AWt();
				if (!(0 < e)) return void this.Finish();
				(this.LastIndex = this.CurIndex), (this.CurIndex = e);
			} else (this.LastIndex = this.CurIndex), this.CurIndex++;
			this.Refresh();
		}
	}
	AWt() {
		for (let i = this.CurIndex + 1; i < this.GachaResult.length; i++) {
			var e = this.GachaResult[i],
				t = e.u5n.G3n;
			if (
				5 === (t = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(t)) ||
				(4 <= t && e.IsNew)
			)
				return i;
		}
		return -1;
	}
	Finish() {
		(ModelManager_1.ModelManager.GachaModel.CanCloseView = !0),
			UiManager_1.UiManager.OpenView("GachaResultView", this.OpenParam, () => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(ModelManager_1.ModelManager.GachaModel.CanCloseView = !1);
	}
	OnBeforeShow() {
		super.OnBeforeShow(),
			UiSceneManager_1.UiSceneManager.InitGachaItemObserver(),
			(this.MWt = UiSceneManager_1.UiSceneManager.GetGachaItemObserver()),
			(this.SWt = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
		var e = UE.KuroCollectActorComponent.GetActorWithTag(
			FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
			0,
		);
		e?.IsSkip || e.WhiteScreenOff(),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Kuro.KuroBloomEnable 1",
			),
			(this.uWt = ResourceSystem_1.ResourceSystem.SyncLoad(
				"/Game/Aki/Data/GaCha/GachaWeaponTransform.GachaWeaponTransform",
				UE.DataTable,
			)),
			this.IWt(),
			(e = this.OpenParam);
		(this._Wt = e && e.IsOnlyShowGold),
			this._Wt
				? ((this.CurIndex = -1),
					0 < (e = this.AWt())
						? (this.CurIndex = e)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Gacha",
									44,
									"打开抽卡展示界面时，没有抽中金色，却执行了跳过操作",
								),
							(this.CurIndex = 0)))
				: (this.CurIndex = 0),
			(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
				this.GetHorizontalLayout(6),
			)),
			(this.Zjt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.mWt =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"GachaRoleBeforeEndFrame",
				) ?? this.mWt),
			(this.dWt =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"GachaWeaponBeforeEndFrame",
				) ?? this.dWt),
			this.Refresh();
	}
	OnBeforeHideImplement() {
		GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
			.GetCurrentQualityInfo()
			.ApplyBloomEnable(),
			this.hWt?.IsValid() && this.hWt?.EndGachaScene();
	}
	OnBeforeDestroyImplementImplement() {
		(this.uWt = void 0),
			UiSceneManager_1.UiSceneManager.DestroyGachaItemObserver(),
			UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.SWt),
			this.cWt &&
				(TimerSystem_1.TimerSystem.Remove(this.cWt), (this.cWt = void 0)),
			CameraController_1.CameraController.SetViewTarget(
				this.gWt,
				"GachaScanView.OnBeforeDestroyImplementImplement",
			);
	}
	OnBeforeDestroy() {
		this.AddChild(this.xjt),
			this.AddChild(this.Jjt),
			this.TWt(),
			ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
	}
}
exports.GachaScanView = GachaScanView;
