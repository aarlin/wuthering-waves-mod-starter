"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionCameraInputItem = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	InputSettings_1 = require("../../../../InputSettings/InputSettings"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerDefine_1 = require("../../../../Ui/TouchFinger/TouchFingerDefine"),
	TouchFingerManager_1 = require("../../../../Ui/TouchFinger/TouchFingerManager"),
	UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
	UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
	UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
class VisionCameraInputItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.A6i = !1),
			(this.CanPitchInput = !1),
			(this.P6i = void 0),
			(this.OnPlayCameraAnimationStart = () => {
				this.Pause();
			}),
			(this.OnActivateUiCameraAnimationHandle = () => {
				var i;
				(this.A6i = this.x6i()),
					this.A6i &&
						this.P6i &&
						((i = UE.KuroCollectActorComponent.GetActorWithTag(
							FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
							1,
						).K2_GetActorLocation()),
						this.P6i.UpdateData(i, 0, 0, 0, 0),
						this.P6i.Activate(),
						this.P6i.ResumeTick());
			}),
			(this.w6i = void 0),
			(this.B6i = (i) => {
				this.A6i && (this.w6i = i.GetLocalPointInPlane());
			}),
			(this.b6i = (i) => {
				var e;
				!this.A6i ||
				1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
				InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
					? (this.w6i = void 0)
					: ((e = this.w6i),
						(this.w6i = i.GetLocalPointInPlane()),
						e &&
							(0 != (i = this.w6i.X - e.X) && this.P6i.AddYawInput(i),
							0 != (i = this.w6i.Y - e.Y)) &&
							this.CanPitchInput &&
							this.P6i.AddPitchInput(i));
			}),
			(this.q6i = (i) => {
				this.A6i && (this.w6i = void 0);
			}),
			(this.G6i = (i, e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.CanPitchInput &&
					this.P6i.AddPitchInput(-e);
			}),
			(this.N6i = (i, e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddYawInput(e);
			}),
			(this.O6i = (i) => {
				this.A6i &&
					0 !== i.scrollAxisValue &&
					this.P6i.AddZoomInput(-i.scrollAxisValue);
			}),
			(this.k6i = (i, e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddZoomInput(e);
			}),
			(this.F6i = (i, e) => {
				0 !== e &&
					this.A6i &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.P6i.AddZoomInput(e);
			}),
			(this.pbt = (i, e) => {
				this.A6i && 2 === e.TouchType && this.lCt();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent]];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlayCameraAnimationStart,
			this.OnPlayCameraAnimationStart,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this.OnActivateUiCameraAnimationHandle,
			);
		var i = this.GetDraggable(0);
		i.OnPointerBeginDragCallBack.Bind(this.B6i),
			i.OnPointerDragCallBack.Bind(this.b6i),
			i.OnPointerEndDragCallBack.Bind(this.q6i),
			i.OnPointerScrollCallBack.Bind(this.O6i),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiLookUp,
				this.G6i,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiTurn,
				this.N6i,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiIncrease,
				this.k6i,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiReduce,
				this.F6i,
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
			EventDefine_1.EEventName.OnPlayCameraAnimationStart,
			this.OnPlayCameraAnimationStart,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this.OnActivateUiCameraAnimationHandle,
			);
		var i = this.GetDraggable(0);
		i.OnPointerBeginDragCallBack.Unbind(),
			i.OnPointerDragCallBack.Unbind(),
			i.OnPointerEndDragCallBack.Unbind(),
			i.OnPointerScrollCallBack.Unbind(),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiLookUp,
				this.G6i,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiTurn,
				this.N6i,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiIncrease,
				this.k6i,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiReduce,
				this.F6i,
			),
			InputDistributeController_1.InputDistributeController.UnBindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
				],
				this.pbt,
			);
	}
	OnStart() {
		this.V6i();
	}
	OnBeforeShow() {
		this.OnActivateUiCameraAnimationHandle(), this.OnAddEventListener();
	}
	OnBeforeHide() {
		this.P6i?.Deactivate(), this.OnRemoveEventListener(), (this.A6i = !1);
	}
	OnBeforeDestroy() {
		this.H6i();
	}
	Pause() {
		(this.A6i = !1), this.P6i?.PauseTick();
	}
	V6i() {
		var i = UiCameraManager_1.UiCameraManager.Get();
		(this.P6i = i.AddUiCameraComponent(
			UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
			!1,
		)),
			(i =
				ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(
					"声骸",
				));
		this.P6i.InitDataByConfig(i);
	}
	H6i() {
		UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
			UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
		),
			(this.P6i = void 0);
	}
	x6i() {
		return !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation();
	}
	lCt() {
		var i;
		1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
			((i = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
				TouchFingerDefine_1.EFingerIndex.One,
				TouchFingerDefine_1.EFingerIndex.Two,
			)),
			this.P6i.AddZoomInput(-i));
	}
}
exports.VisionCameraInputItem = VisionCameraInputItem;
