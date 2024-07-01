"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideFocusItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiNavigationGlobalData_1 = require("../../UiNavigation/New/UiNavigationGlobalData"),
	UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
	GuideFocusItemText_1 = require("./GuideFocusItemText");
class GuideFocusItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, o) {
		super(),
			(this.PJt = void 0),
			(this.Owner = void 0),
			(this.xJt = void 0),
			(this.wJt = void 0),
			(this.HXe = void 0),
			(this.RectItem = void 0),
			(this.Config = void 0),
			(this.BJt = !1),
			(this.bJt = !1),
			(this.qJt = !1),
			(this.GJt = void 0),
			(this.NJt = void 0),
			(this.OJt = void 0),
			(this.Fr = () => {
				GuideFocusItem.IsOpenLog &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Guide", 17, "OnButtonClick enter");
				var e,
					t = this.NJt;
				this.kJt(),
					t?.IsInteractable() &&
						this.xJt.bIsUIActive &&
						(t.IsA(UE.UIButtonComponent.StaticClass())
							? (e = t).OnClickCallBack.IsBound() &&
								(GuideFocusItem.IsOpenLog &&
									Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Guide",
										17,
										"OnButtonClick execute parent OnClickCallBack UIButtonComponent",
									),
								e.OnClickCallBack.Execute())
							: t.IsA(UE.UISelectableButtonComponent.StaticClass())
								? (e = t).OnClickCallBack.IsBound() &&
									(GuideFocusItem.IsOpenLog &&
										Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Guide",
											17,
											"OnButtonClick execute parent OnClickCallBack UISelectableButtonComponent",
										),
									e.OnClickCallBack.Execute())
								: t.IsA(UE.UIToggleComponent.StaticClass())
									? (t.SetState(!t.IsOn, !0),
										GuideFocusItem.IsOpenLog &&
											Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Guide",
												17,
												"OnButtonClick execute parent SetState UIToggleComponent",
											))
									: t.IsA(UE.UIExtendToggle.StaticClass())
										? 0 === (e = t).GetToggleState() &&
											(GuideFocusItem.IsOpenLog &&
												Log_1.Log.CheckWarn() &&
												Log_1.Log.Warn(
													"Guide",
													17,
													"OnButtonClick execute parent SetToggleState ETT_Checked UIExtendToggle",
												),
											e.SetToggleState(1, !0))
										: t.IsA(UE.UISliderComponent.StaticClass()) &&
											(e = t).OnValueChangeCb.IsBound() &&
											(GuideFocusItem.IsOpenLog &&
												Log_1.Log.CheckWarn() &&
												Log_1.Log.Warn(
													"Guide",
													17,
													"OnButtonClick execute parent OnValueChangeCb UISliderComponent",
												),
											e.OnValueChangeCb.Execute(e.Value)));
			}),
			(this.FJt = () => {
				var e, t;
				this.BJt ||
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Guide", 17, "OnButtonPointerDownCallBack enter"),
					(e = this.NJt)?.IsValid() &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnButtonPointerDownCallBack execute self",
							),
						(this.qJt = !0),
						e.IsA(UE.UIButtonComponent.StaticClass())
							? (t = e).OnPointDownCallBack.IsBound() &&
								(GuideFocusItem.IsOpenLog &&
									Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Guide",
										17,
										"OnButtonPointerDownCallBack execute parent UIButtonComponent",
									),
								t.OnPointDownCallBack.Execute())
							: e.IsA(UE.UIExtendToggle.StaticClass()) &&
								(t = e).OnPointDownCallBack.IsBound() &&
								(GuideFocusItem.IsOpenLog &&
									Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Guide",
										17,
										"OnButtonPointerDownCallBack execute parent UIExtendToggle",
									),
								t.OnPointDownCallBack.Execute(1))));
			}),
			(this.VJt = () => {
				GuideFocusItem.IsOpenLog &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Guide", 17, "OnButtonPointerUpCallBack enter");
				var e,
					t = this.NJt;
				t?.IsValid() &&
					((this.qJt = !1),
					GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnButtonPointerUpCallBack execute self TryFinishByClick",
						),
					t.IsA(UE.UIButtonComponent.StaticClass())
						? (e = t).OnPointUpCallBack.IsBound() &&
							(GuideFocusItem.IsOpenLog &&
								Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Guide",
									17,
									"OnButtonPointerUpCallBack execute parent UIButtonComponent",
								),
							this.kJt(),
							e.OnPointUpCallBack.Execute())
						: t.IsA(UE.UIExtendToggle.StaticClass()) &&
							(e = t).OnPointUpCallBack.IsBound() &&
							(GuideFocusItem.IsOpenLog &&
								Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Guide",
									17,
									"OnButtonPointerUpCallBack execute parent UIExtendToggle",
								),
							this.kJt(),
							e.OnPointUpCallBack.Execute(1)));
			}),
			(this.HJt = (e) => {
				var t;
				this.BJt ||
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDownCallBack enter"),
					(t = this.GJt)?.IsValid() &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerDownCallBack execute self",
							),
						t.OnPointerDownCallBack.IsBound()) &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerDownCallBack execute parent",
							),
						t.OnPointerDownCallBack.Execute(e)));
			}),
			(this.jJt = (e) => {
				var t;
				this.BJt ||
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerBeginDragCallBack enter",
						),
					(t = this.GJt)?.IsValid() &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerBeginDragCallBack execute self",
							),
						(this.bJt = !0),
						t.OnPointerBeginDragCallBack.IsBound()) &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerBeginDragCallBack execute parent",
							),
						t.OnPointerBeginDragCallBack.Execute(e)));
			}),
			(this.WJt = (e) => {
				var t;
				this.BJt ||
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDragCallBack enter"),
					(t = this.GJt)?.IsValid() &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerDragCallBack execute self",
							),
						(this.OJt = e),
						t.OnPointerDragCallBack.IsBound()) &&
						(GuideFocusItem.IsOpenLog &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"OnDraggablePointerDragCallBack execute parent",
							),
						t.OnPointerDragCallBack.Execute(e)));
			}),
			(this.KJt = (e) => {
				GuideFocusItem.IsOpenLog &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Guide",
						17,
						"OnDraggablePointerEndDragCallBack enter",
					);
				var t = this.GJt;
				t?.IsValid() &&
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerEndDragCallBack execute self",
						),
					(this.bJt = !1),
					t.OnPointerEndDragCallBack.IsBound()) &&
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerEndDragCallBack execute parent",
						),
					t.OnPointerEndDragCallBack.Execute(e));
			}),
			(this.QJt = (e) => {
				GuideFocusItem.IsOpenLog &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Guide", 17, "OnDraggablePointerUpCallBack enter");
				var t = this.GJt;
				t?.IsValid() &&
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerUpCallBack execute self",
						),
					t.OnPointerUpCallBack.IsBound()) &&
					(GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerUpCallBack execute parent",
						),
					t.OnPointerUpCallBack.Execute(e),
					GuideFocusItem.IsOpenLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"OnDraggablePointerUpCallBack execute TryFinishByClick",
						),
					this.kJt());
			}),
			(this.OnTouch = (e, t) => {
				e = Number(e);
				var o =
					TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
						e,
					)?.GetPointerEventData()?.pressComponent;
				o &&
					o.GetOwner() === this.GetButton(0).GetOwner() &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.GuideTouchIdInject,
						e,
						this.xJt.GetOwner(),
					);
			}),
			(this.Owner = o),
			(this.Config = this.Owner.GetGuideStepInfo().ViewData.ViewConf),
			(this.xJt = e),
			(this.wJt = t);
	}
	Init(e) {
		e && this.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Fr]]);
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(3);
		(this.PJt = new GuideFocusItemText_1.FocusItemText(this)),
			await this.PJt.OnlyCreateByActorAsync(e.GetOwner()),
			this.AddChild(this.PJt);
	}
	OnStart() {
		this.Config.OnlyFrame
			? this.GetItem(3).SetUIActive(!1)
			: (this.GetItem(3).SetUIActive(!0), this.PJt.ShowText()),
			this.Config.OnlyText
				? this.GetItem(2).SetUIActive(!1)
				: this.GetItem(2).SetUIActive(!0),
			(this.HXe = this.GetItem(1)),
			(this.RectItem = this.GetItem(2)),
			this.GetItem(1).SetUIActive(this.Config.UseMask),
			(this.NJt = this.xJt
				.GetOwner()
				.GetComponentByClass(UE.UISelectableComponent.StaticClass()));
		const e = this.GetButton(0),
			t =
				(e.OnPointDownCallBack.Bind(this.FJt),
				e.OnPointUpCallBack.Bind(this.VJt),
				this.GetItem(3));
		t.SetUIActive(!1),
			this.Config.ClickAnywhere &&
				0 < (o = this.Config.ClickAnywhereShowTime) &&
				(e.RootUIComp.SetRaycastTarget(!1),
				TimerSystem_1.TimerSystem.Delay(() => {
					t.SetUIActive(!0), e.RootUIComp.SetRaycastTarget(!0);
				}, o)),
			(this.GJt = this.xJt
				.GetOwner()
				.GetComponentByClass(UE.UIDraggableComponent.StaticClass()));
		var o = e.RootUIComp.GetOwner().GetComponentByClass(
			UE.UIDraggableComponent.StaticClass(),
		);
		o.OnPointerDownCallBack.Bind((e) => {
			this.HJt(e);
		}),
			o.OnPointerBeginDragCallBack.Bind((e) => {
				this.jJt(e);
			}),
			o.OnPointerDragCallBack.Bind((e) => {
				this.WJt(e);
			}),
			o.OnPointerEndDragCallBack.Bind((e) => {
				this.KJt(e);
			}),
			o.OnPointerUpCallBack.Bind((e) => {
				this.QJt(e);
			}),
			InputDistributeController_1.InputDistributeController.BindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
					InputMappingsDefine_1.touchIdMappings.Touch3,
					InputMappingsDefine_1.touchIdMappings.Touch4,
					InputMappingsDefine_1.touchIdMappings.Touch5,
					InputMappingsDefine_1.touchIdMappings.Touch6,
					InputMappingsDefine_1.touchIdMappings.Touch7,
					InputMappingsDefine_1.touchIdMappings.Touch8,
					InputMappingsDefine_1.touchIdMappings.Touch9,
					InputMappingsDefine_1.touchIdMappings.Touch10,
				],
				this.OnTouch,
			);
	}
	OnBeforeShow() {
		this.Owner?.Config?.UseMask
			? (UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(
					this.xJt,
				),
				UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag(
					"GuideFocus",
				))
			: this.NJt?.FocusListenerDelegate.Bind(() => {
					this.kJt();
				});
	}
	OnAfterHide() {
		this.Owner?.Config?.UseMask
			? (UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag(
					"GuideFocus",
				),
				UiNavigationNewController_1.UiNavigationNewController.ResetNavigationFocusForGuide())
			: this.NJt?.FocusListenerDelegate.Unbind();
	}
	OnAfterShow() {
		this.Owner.ReadyToShow = !0;
	}
	kJt() {
		!this.Config.UseClick ||
			this.BJt ||
			((this.BJt = !0),
			GuideFocusItem.IsOpenLog &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Guide", 17, "TryFinishByClick done"),
			this.Owner.DoCloseByFinished(),
			TimerSystem_1.TimerSystem.Next(() => {
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Guide", 17, "DoCloseByFinished");
			}));
	}
	OnBaseViewCloseWhenFinish() {
		this.PJt.OnBaseViewCloseWhenFinish();
	}
	OnBeforeDestroy() {
		(this.BJt = !0),
			this.bJt &&
				(this.KJt(this.OJt),
				this.QJt(this.OJt),
				(this.bJt = !1),
				(this.OJt = void 0)),
			this.qJt && (this.VJt(), (this.qJt = !1)),
			InputDistributeController_1.InputDistributeController.UnBindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
					InputMappingsDefine_1.touchIdMappings.Touch3,
					InputMappingsDefine_1.touchIdMappings.Touch4,
					InputMappingsDefine_1.touchIdMappings.Touch5,
					InputMappingsDefine_1.touchIdMappings.Touch6,
					InputMappingsDefine_1.touchIdMappings.Touch7,
					InputMappingsDefine_1.touchIdMappings.Touch8,
					InputMappingsDefine_1.touchIdMappings.Touch9,
					InputMappingsDefine_1.touchIdMappings.Touch10,
				],
				this.OnTouch,
			);
	}
	OnTick(e) {
		this.IsShowOrShowing &&
			this.RootItem?.IsValid() &&
			this.xJt?.IsValid() &&
			(this.ApplyButtonFollow(), this.ApplyBgFollow(), this.PJt?.OnTick(e));
	}
	OnDurationChange(e) {
		this.GetActive() && this.PJt?.OnDurationChange(e);
	}
	ApplyButtonFollow() {
		var e = (t = this.wJt).K2_GetComponentScale(),
			t =
				(this.RootItem.K2_SetWorldLocation(
					t.K2_GetComponentLocation(),
					!1,
					void 0,
					!1,
				),
				this.RootItem.SetPivot(t.GetPivot()),
				this.RootItem.SetHeight(t.Height * e.Y),
				this.RootItem.SetWidth(t.Width * e.X),
				this.xJt);
		e = this.GetButton(0).RootUIComp;
		this.Config.ClickAnywhere
			? (e.K2_SetWorldLocation(
					UiLayer_1.UiLayer.UiRootItem.K2_GetComponentLocation(),
					!1,
					void 0,
					!1,
				),
				e.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()),
				e.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height),
				e.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width))
			: (e.SetPivot(t.GetPivot()),
				e.SetHeight(t.Height),
				e.SetWidth(t.Width),
				e.SetRelativeScale3D(t.K2_GetComponentScale()),
				e.K2_SetWorldLocation(t.K2_GetComponentLocation(), !1, void 0, !1));
	}
	ApplyBgFollow() {
		var e;
		this.Config.UseMask &&
			((e = this.HXe).K2_SetWorldLocation(
				UiLayer_1.UiLayer.UiRootItem.K2_GetComponentLocation(),
				!1,
				void 0,
				!1,
			),
			e.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()),
			e.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height),
			e.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width));
	}
}
(exports.GuideFocusItem = GuideFocusItem).IsOpenLog = !1;
