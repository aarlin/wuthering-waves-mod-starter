"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleRootView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Queue_1 = require("../../../Core/Container/Queue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GlobalData_1 = require("../../GlobalData"),
	InputSettings_1 = require("../../InputSettings/InputSettings"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotController_1 = require("../../RedDot/RedDotController"),
	RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine"),
	TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	EffectUtil_1 = require("../../Utils/EffectUtil"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	RoleTabItem_1 = require("../Common/TabComponent/TabItem/RoleTabItem"),
	TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
	GuideConfig_1 = require("../Guide/GuideConfig"),
	UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	RoleListComponent_1 = require("./Component/RoleListComponent"),
	RoleDefine_1 = require("./RoleDefine");
class OperationParam {
	constructor(e, t) {
		(this.OperationType = e), (this.Param = t);
	}
}
class RoleRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RoleListComponent = void 0),
			(this.TabViewComponent = void 0),
			(this.TabComponent = void 0),
			(this.pco = void 0),
			(this.TabDataList = []),
			(this.Fho = 0),
			(this.RoleRootUiCameraHandleData = void 0),
			(this._Ve = 0),
			(this.hco = void 0),
			(this.R7t = void 0),
			(this.lco = 0),
			(this.cVe = void 0),
			(this._co = !0),
			(this.m5i = new Map()),
			(this.uco = new Map()),
			(this.A6i = !1),
			(this.P6i = void 0),
			(this.plo = void 0),
			(this.cco = new Queue_1.Queue()),
			(this.pHt = !1),
			(this.NLn = !0),
			(this.OnRoleSelect = () => {
				var e;
				this.RHt
					? ((e = new OperationParam(2)), this.cco.Push(e))
					: (this.UHt(),
						this.OnRoleSelectAsync().finally(() => {
							this.O0t();
						}));
			}),
			(this.OnSelectRoleTabOutside = (e) => {
				this.UHt(),
					this.SelectRoleTabOutSide(e).finally(() => {
						this.O0t();
					});
			}),
			(this.CanToggleChange = (e) => {
				var t;
				return (
					!!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
					((t = CommonParamById_1.configCommonParamById.GetIntConfig(
						"panel_interval_time",
					)),
					!this.cVe) ||
					Time_1.Time.Now - this.cVe >= t
				);
			}),
			(this.dVe = (e, t) => new RoleTabItem_1.RoleTabItem()),
			(this.pqe = (e) => {
				this.lco++, (this.cVe = Time_1.Time.Now);
				var t = this.TabDataList[e],
					i = t.ChildViewName,
					o = this.TabComponent.GetTabItemByIndex(e);
				this.TabViewComponent.ToggleCallBack(t, i, o, this.plo),
					(this._Ve = e),
					(this.hco = i),
					this.mco(e, this.lco),
					(this.A6i = this.x6i());
			}),
			(this.G6i = (e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddPitchInput(-e);
			}),
			(this.N6i = (e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddYawInput(e);
			}),
			(this.wDn = (e, t) => {
				0 !== t &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddZoomInput(t);
			}),
			(this.dco = () => {
				var e;
				this.A6i &&
					(e =
						UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
					UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
						e.HandleName,
						!0,
						!0,
						"1001",
					);
			}),
			(this.pbt = (e, t) => {
				this.A6i && 2 === t.TouchType && this.lCt();
			}),
			(this.yqe = (e) => (
				(e = this.TabDataList[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.CloseClick = () => {
				this.CloseMe();
			}),
			(this.OnInternalViewQuit = () => {
				(this.plo.RoleViewState = 0), this.u5i(), this.TabComponent.ShowItem();
			}),
			(this.OnInternalViewEnter = () => {
				(this.plo.RoleViewState = 1), this.Cco(), this.TabComponent.HideItem();
			}),
			(this.RoleListClick = () => {
				UiManager_1.UiManager.OpenView("RoleSelectionView", this.plo);
			}),
			(this.w6i = void 0),
			(this.B6i = (e) => {
				this.A6i && (this.w6i = e.GetLocalPointInPlane());
			}),
			(this.b6i = (e) => {
				var t;
				!this.A6i ||
				1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
				InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
					? (this.w6i = void 0)
					: ((t = this.w6i),
						(this.w6i = e.GetLocalPointInPlane()),
						t &&
							((e = this.w6i.X - t.X),
							(t = this.w6i.Y - t.Y),
							0 != e && this.P6i.AddYawInput(e),
							0 != t) &&
							this.P6i.AddPitchInput(t));
			}),
			(this.q6i = (e) => {
				this.A6i && (this.w6i = void 0);
			}),
			(this.O6i = (e) => {
				this.A6i &&
					0 !== e.scrollAxisValue &&
					this.P6i.AddZoomInput(-e.scrollAxisValue);
			}),
			(this.gco = () => {
				(this.A6i = !1), this.P6i?.PauseTick();
			}),
			(this.fco = () => {
				var e,
					t = UiCameraManager_1.UiCameraManager.Get();
				(this.P6i = t.AddUiCameraComponent(
					UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
					!1,
				)),
					(t =
						ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetDefaultRoleCameraConfig());
				this.P6i.InitDataByConfig(t),
					(this.A6i = this.x6i()),
					this.A6i &&
						((e = (t = this.pco).K2_GetActorLocation()),
						(t = (t.Model?.CheckGetComponent(11)).RoleConfigId),
						(t =
							ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
								t,
							).RoleBody),
						(t =
							ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(
								t,
							)),
						this.P6i.UpdateData(
							e,
							t.镜头浮动最大高度,
							t.镜头浮动最低高度,
							t.镜头浮动最长臂长,
							t.镜头浮动最短臂长,
						),
						this.P6i.Activate(),
						this.P6i.ResumeTick());
			}),
			(this.vco = (e) => {
				this.GetItem(2).SetUIActive(e);
			}),
			(this.Mco = (e) => {
				this.UiViewSequence.PlaySequencePurely(e ? "hide" : "show");
			}),
			(this.Sco = () => {
				var e;
				this._co &&
					((e = UiSceneManager_1.UiSceneManager.GetUiStartSequenceFrame()),
					(e = new UE.FrameNumber(e)),
					(e = new UE.FrameTime(e, 0)),
					(e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, 1)),
					this.R7t.SetPlaybackPosition(e));
			});
	}
	get RHt() {
		return this.pHt;
	}
	UHt() {
		this.pHt = !0;
	}
	O0t() {
		if (((this.pHt = !1), 0 !== this.cco.Size)) {
			var e = this.cco.Pop();
			if (e)
				switch (e.OperationType) {
					case 0:
						this.RefreshRoleList();
						break;
					case 1:
						this.RefreshTabList();
						break;
					case 2:
						this.OnRoleSelect();
				}
		}
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[6, UE.UIDraggableComponent],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.RoleListClick]]);
	}
	async OnBeforeStartAsync() {
		(this.plo = this.OpenParam),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleRootView",
					])
				: ((this.RoleListComponent =
						new RoleListComponent_1.RoleListComponent()),
					await this.RoleListComponent.CreateThenShowByActorAsync(
						this.GetItem(3).GetOwner(),
						this.plo,
					),
					this.InitTabComponent(),
					(this.plo.RoleViewState = 0),
					(this.pco =
						UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
					AudioController_1.AudioController.SetSwitch(
						"actor_ui_switch",
						"sys_ui",
						this.pco,
					),
					(this.hco = this.plo.GetCurSelectTabName()),
					this.RefreshRoleSystemModeUiParam());
	}
	OLn() {
		this.NLn &&
			((this.NLn = !1),
			this.pco ||
				(this.pco = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
			this.LoadFloorEffect(),
			this.pco.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"));
	}
	OnHandleLoadScene() {
		this.OLn();
	}
	OnBeforeShow() {
		this.OLn(), this.RefreshRoleList();
	}
	RefreshRoleList() {
		var e;
		this.RHt
			? ((e = new OperationParam(0)), this.cco.Push(e))
			: (this.UHt(),
				this.RefreshRoleListAsync().finally(() => {
					this.O0t();
				}));
	}
	async RefreshRoleListAsync() {
		UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !0);
		var e = this.plo.GetRoleIdList();
		await this.RoleListComponent.UpdateComponent(e).finally(() => {
			UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !1);
		}),
			(e = this.plo.GetCurSelectRoleId());
		this.RoleListComponent?.SetCurSelection(e);
	}
	RefreshTabList() {
		var e;
		this.RHt
			? ((e = new OperationParam(1)), this.cco.Push(e))
			: (this.UHt(),
				this.RefreshTabListAsync().finally(() => {
					this.O0t();
				}));
	}
	async RefreshTabListAsync() {
		UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", !0);
		var e = this.plo.GetRoleTabDataList(),
			t = this.TabDataList.toString() !== e.toString(),
			i = ((this.TabDataList = e), this.TabDataList.length),
			o = this.TabComponent.CreateTabItemDataByLength(i);
		if (this.plo.GetRoleSystemUiParams().TabRedDot) {
			var n = this.plo?.GetCurSelectRoleData();
			for (let e = 0; e < i; e++) {
				var a = this.TabDataList[e].ChildViewName;
				(a = this.GetRedDotName(a)) &&
					((o[e].RedDotName = a), (o[e].RedDotUid = n.GetDataId()));
			}
		}
		if (
			(await this.TabComponent.RefreshTabItemAsync(o, t).finally(() => {
				UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", !1);
			}),
			t)
		) {
			let e = 0;
			for (let t = 0; t < this.TabDataList.length; t++)
				if (this.TabDataList[t].ChildViewName === this.hco) {
					e = t;
					break;
				}
			this.TabComponent.SelectToggleByIndex(e, !0);
		} else
			this.TabViewComponent?.SetCurrentTabViewState(!0),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetRoleFlag);
	}
	async OnRoleSelectAsync() {
		UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", !0),
			this.RefreshUiMode(),
			await this.RefreshTabListAsync().finally(() => {
				UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", !1);
			});
	}
	async SelectRoleTabOutSide(e) {
		var t = new CustomPromise_1.CustomPromise();
		await Promise.all([
			this.UiViewSequence.PlaySequenceAsync("RoleListStart", t),
			this.TabComponent.ShowItemAsync(),
		]),
			(this.plo.RoleViewState = 0),
			(t = this.TabDataList.findIndex((t) => t.ChildViewName === e));
		this.TabComponent.SelectToggleByIndex(t);
	}
	InitTabComponent() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.pqe,
			this.yqe,
		);
		(this.TabComponent =
			new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
				this.GetItem(2),
				e,
				this.CloseClick,
			)),
			(this.cVe = void 0),
			this.TabComponent.SetCanChange(this.CanToggleChange),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(4),
			));
	}
	mco(e, t) {
		const i = this.TabDataList[e].LightSequence;
		var o = this.m5i.get(e);
		o
			? (this.R7t && (this.R7t.Stop(), (this._co = !1), (this.R7t = void 0)),
				(o = o.SequencePlayer).Play(),
				(this._co = !0),
				(this.R7t = o))
			: 1 !== this.uco.get(e) &&
				(this.uco.set(e, 1),
				ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, (t) => {
					var o, n;
					ObjectUtils_1.ObjectUtils.IsValid(t)
						? (((o =
								new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
								!0),
							(n = (0, puerts_1.$ref)(void 0)),
							UE.LevelSequencePlayer.CreateLevelSequencePlayer(
								GlobalData_1.GlobalData.World,
								t,
								new UE.MovieSceneSequencePlaybackSettings(),
								n,
							),
							((n = (0, puerts_1.$unref)(n)).PlaybackSettings = o),
							n.SetSequence(t),
							this.m5i.set(e, n),
							this.R7t &&
								(this.R7t.Stop(), (this._co = !1), (this.R7t = void 0)),
							this._Ve === e &&
								((this.R7t = n.SequencePlayer),
								(n.bOverrideInstanceData = !0),
								(n.DefaultInstanceData.TransformOrigin =
									RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform()),
								this.R7t.Play(),
								(this._co = !0)))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Role", 44, "加载level sequence失败:", [
								"sequencePath",
								i,
							]),
						this.uco.set(e, 0);
				}));
	}
	lCt() {
		var e;
		1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
			((e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
				TouchFingerDefine_1.EFingerIndex.One,
				TouchFingerDefine_1.EFingerIndex.Two,
			)),
			this.P6i.AddZoomInput(-e));
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (this.RHt)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 44, "异步操作执行过程中不能触发引导");
		else {
			if (2 === e.length && e[0] === GuideConfig_1.GuideConfig.TabTag) {
				this.TabComponent ||
					((t = new CommonTabComponentData_1.CommonTabComponentData(
						this.dVe,
						this.pqe,
						this.yqe,
					)),
					(this.TabComponent =
						new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
							this.GetItem(2),
							t,
							this.CloseClick,
						)));
				var t = this.TabComponent.GetTabComponent().GetLayout();
				if (!t)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Guide",
							17,
							"角色界面聚焦引导的额外参数配置有误, 找不到Layout",
							["configParams", e],
						)
					);
				const i = Number(e[1]);
				return (t = t.GetLayoutItemByIndex(i))
					? [t.GetRootItem(), t.GetIconSprite()]
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("Guide", 44, "Layout加载未完成")
						);
			}
			if (2 === e.length && e[0] === GuideConfig_1.GuideConfig.SlotTag) {
				const i = Number(e[1]);
				return (t = this.RoleListComponent.GetSelfScrollView()
					.GetScrollItemByIndex(i)
					.GetToggleForGuide().RootUIComp)
					? [t, t]
					: void 0;
			}
			t =
				2 !== e.length
					? e[0]
					: e.find(
							(e) =>
								Number(e) ===
								ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId(),
						);
			const i = Number(t),
				o = (e = this.plo.GetRoleIdList()).findIndex((e) => e === i);
			if (o < 0 || o >= e.length)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						"角色界面聚焦引导的额外参数配置有误, 找不到角色Id",
						["roleId", i],
					);
			else {
				const e =
					this.RoleListComponent?.GetSelfScrollView()?.GetScrollItemByIndex(o);
				if (
					e &&
					(TimerSystem_1.TimerSystem.Next(() => {
						this.RoleListComponent.GetSelfScrollView().ScrollTo(
							e.GetRootItem(),
						);
					}),
					(t = e.RoleIconItem?.GetRootItem()),
					t)
				)
					return [t, t];
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						44,
						"角色界面聚焦引导的额外参数配置有误, 找不到角色Id",
						["roleId", i],
					);
			}
		}
	}
	u5i() {
		this.UiViewSequence.PlaySequence("RoleListStart");
	}
	Cco() {
		this.UiViewSequence.PlaySequence("RoleListClose");
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.SwitchRootTabState,
			this.vco,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AttributeComponentEvent,
				this.Mco,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
				this.Sco,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SelectRoleTab,
				this.pqe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.OnSelectRoleTabOutside,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleInternalViewEnter,
				this.OnInternalViewEnter,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.OnInternalViewQuit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayCameraAnimationStart,
				this.gco,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this.fco,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.OnRoleSelect,
			);
		var e = this.GetDraggable(6);
		e.OnPointerBeginDragCallBack.Bind(this.B6i),
			e.OnPointerDragCallBack.Bind(this.b6i),
			e.OnPointerEndDragCallBack.Bind(this.q6i),
			e.OnPointerScrollCallBack.Bind(this.O6i),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
				this.G6i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerRoleTurn,
				this.N6i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerRoleZoom,
				this.wDn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerRoleReset,
				this.dco,
			),
			InputDistributeController_1.InputDistributeController.BindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
				],
				this.pbt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.SwitchRootTabState,
			this.vco,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AttributeComponentEvent,
				this.Mco,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
				this.Sco,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SelectRoleTab,
				this.pqe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.OnSelectRoleTabOutside,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleInternalViewEnter,
				this.OnInternalViewEnter,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.OnInternalViewQuit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.OnRoleSelect,
			);
	}
	Eco() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlayCameraAnimationStart,
			this.gco,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this.fco,
			);
		var e = this.GetDraggable(6);
		e.OnPointerBeginDragCallBack.Unbind(),
			e.OnPointerDragCallBack.Unbind(),
			e.OnPointerEndDragCallBack.Unbind(),
			e.OnPointerScrollCallBack.Unbind(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
				this.G6i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerRoleTurn,
				this.N6i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerRoleZoom,
				this.wDn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerRoleReset,
				this.dco,
			),
			InputDistributeController_1.InputDistributeController.UnBindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
				],
				this.pbt,
			);
	}
	x6i() {
		if (
			UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()
		)
			return !1;
		const e = this.TabViewComponent.GetCurrentTabViewName();
		let t = !1;
		return (
			RoleDefine_1.UI_ROLE_CAN_ROTATE_TABVIEW.forEach((i) => {
				e === i && (t = !0);
			}),
			t
		);
	}
	RefreshUiMode() {
		this.RefreshRoleSystemModeUiParam();
	}
	RefreshRoleSystemModeUiParam() {
		var e = this.plo.GetRoleSystemUiParams();
		this.BindRedDot(e.RoleListButtonRedDot),
			this.SetRoleListButtonVisible(e.RoleListButton),
			this.RoleListComponent.SetRoleSystemUiParams(e);
	}
	LoadFloorEffect() {
		var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
		e &&
			(this.Fho = EffectUtil_1.EffectUtil.SpawnUiEffect(
				"RoleSystemFloorEffect",
				"[RoleRootView.LoadFloorEffect]",
				e.GetTransform(),
				new EffectContext_1.EffectContext(void 0, e),
			));
	}
	GetRedDotName(e) {
		return "RoleAttributeTabView" === e
			? "RoleAttributeTab"
			: "RoleResonanceTabNewView" === e
				? "RoleResonanceTab"
				: "RolePhantomTabView" === e
					? "VisionOneKeyEquip"
					: void 0;
	}
	BindRedDot(e) {
		e
			? RedDotController_1.RedDotController.BindRedDot(
					"RoleSelectionList",
					this.GetItem(8),
				)
			: (RedDotController_1.RedDotController.UnBindGivenUi(
					"RoleSelectionList",
					this.GetItem(8),
				),
				this.GetItem(8).SetUIActive(!1));
	}
	UnBindRedDot() {
		for (const e of this.TabComponent.GetTabItemMap().values())
			e.UnBindRedDot();
		RedDotController_1.RedDotController.UnBindRedDot("RoleSelectionList");
	}
	SetRoleListButtonVisible(e) {
		this.GetButton(1).RootUIComp.SetUIActive(e);
	}
	SetRoleListVisible(e) {
		this.GetItem(3).SetUIActive(e);
	}
	OnBeforeHide() {
		this.Eco(),
			(this.A6i = !1),
			this.R7t && ((this._co = !1), this.R7t.Stop(), (this.R7t = void 0)),
			UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
				UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
			),
			(this.P6i = void 0);
	}
	OnHandleReleaseScene() {
		this.kLn();
	}
	OnAfterHide() {
		this.RoleListComponent.UnBindRedDot(),
			this.TabViewComponent.SetCurrentTabViewState(!1);
	}
	OnBeforeDestroy() {
		this.UnBindRedDot(),
			Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面关闭");
	}
	kLn() {
		this.NLn ||
			((this.NLn = !0),
			EffectSystem_1.EffectSystem.IsValid(this.Fho) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.Fho,
					"[RoleRootView.HandleReleaseScene]",
					!1,
				),
			UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.pco),
			(this.pco = void 0),
			UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame(),
			ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0));
	}
	OnBeforeDestroyImplement() {
		this.kLn(),
			this.ClearData(),
			Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面销毁");
	}
	ClearData() {
		this.TabViewComponent &&
			(this.TabViewComponent.DestroyTabViewComponent(),
			(this.TabViewComponent = void 0)),
			EffectSystem_1.EffectSystem.IsValid(this.Fho) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.Fho,
					"[RoleRootView.ClearData]",
					!0,
				),
				(this.Fho = 0));
		for (const e of this.m5i.values()) e.SetShouldLatentDestroy(!0);
		this.m5i.clear(),
			(this._Ve = 0),
			(this.lco = 0),
			UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
				UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
			);
	}
}
exports.RoleRootView = RoleRootView;
