"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionEquipmentView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
	LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown"),
	FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	StaticTabComponent_1 = require("../../../Common/TabComponent/StaticTabComponent"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	RoleVisionDragHeadItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionDragHeadItem"),
	VisionCommonDragItem_1 = require("../../../RoleUi/TabView/VisionSubView/VisionCommonDragItem"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController"),
	CostTabItem_1 = require("./CostTabItem"),
	VisionDetailComponent_1 = require("./VisionDetailComponent"),
	VisionEquipmentDragItem_1 = require("./VisionEquipmentDragItem"),
	VisionEquipmentDropDownItem_1 = require("./VisionEquipmentDropDownItem"),
	VisionEquipmentDropDownTitleItem_1 = require("./VisionEquipmentDropDownTitleItem"),
	VisionMediumItemGrid_1 = require("./VisionMediumItemGrid"),
	ANIMATIONTIME = 300,
	INVALIDINDEX = 999;
class VisionEquipmentView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.e6i = 10),
			(this.L8i = void 0),
			(this.D8i = TickSystem_1.TickSystem.InvalidId),
			(this.R8i = TickSystem_1.TickSystem.InvalidId),
			(this.U8i = TickSystem_1.TickSystem.InvalidId),
			(this.A8i = TickSystem_1.TickSystem.InvalidId),
			(this.zke = 0),
			(this.P8i = 0),
			(this.x8i = 0),
			(this.Uqe = 0),
			(this.w8i = new Array()),
			(this.lqe = void 0),
			(this.LoopScrollView = void 0),
			(this.B8i = new Array()),
			(this.b8i = void 0),
			(this.q8i = 0),
			(this.G8i = void 0),
			(this.N8i = void 0),
			(this.O8i = 0),
			(this.aft = void 0),
			(this.hft = void 0),
			(this.k8i = void 0),
			(this.F8i = 999),
			(this.K1t = 0),
			(this.V8i = 0),
			(this.H8i = !1),
			(this.j8i = !1),
			(this.W8i = 0),
			(this.K8i = 0),
			(this.Q8i = TickSystem_1.TickSystem.InvalidId),
			(this.X8i = void 0),
			(this.VisionEquipmentDragItem = void 0),
			(this.$8i = new Array()),
			(this.Y8i = void 0),
			(this.g_t = 0),
			(this.J8i = 0),
			(this.z8i = 0),
			(this.Z8i = 0),
			(this.e9i = 0),
			(this.t9i = void 0),
			(this.O4t = 0),
			(this.i9i = new Array()),
			(this.XVe = void 0),
			(this.o9i = new Array()),
			(this.Ife = !1),
			(this.j6i = !1),
			(this.r9i = !1),
			(this.n9i = 0),
			(this.s9i = !0),
			(this.a9i = !1),
			(this.KIt = (e) => {
				"ContrastSwitch" === e && this.GetItem(11).SetUIActive(this.r9i);
			}),
			(this.t6e = (e) => {
				(this.e9i = e), this.Ife && this.h9i();
			}),
			(this.i6e = (e) => Number(e)),
			(this.ZVe = (e) =>
				new VisionEquipmentDropDownItem_1.VisionEquipmentDropDownItem(e)),
			(this.zVe = (e) =>
				new VisionEquipmentDropDownTitleItem_1.VisionEquipmentDropDownTitleItem(
					e,
				)),
			(this.fqe = (e, t) => ((e = new CostTabItem_1.CostTabItem(e)).Init(), e)),
			(this.pqe = (e) => {
				(this.O4t = this.i9i[e]), this.Ife && this.h9i();
			}),
			(this.l9i = (e) => {
				ModelManager_1.ModelManager.PhantomBattleModel.SaveIfSimpleState(1, !e);
			}),
			(this.oft = () => {
				UiManager_1.UiManager.OpenView(
					"VisionSkinView",
					this.b8i?.GetUniqueId(),
				);
			}),
			(this._9i = (e) => {
				"VisionEquipmentView" === e.ToHandleData.ViewName &&
					this.IsShowOrShowing &&
					!this.s9i &&
					((this.s9i = !0), this.u9i(this.b8i?.GetUniqueId() ?? 0));
			}),
			(this.ABn = (e) => {
				e && ((e = this.O8i), (this.O8i = 0), this.u9i(e, !1));
			}),
			(this.c9i = () => {
				const e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				this.m9i(this.b8i, this.q8i, () => {
					ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
						this.b8i.GetUniqueId(),
						e.GetRoleId(),
						this.q8i,
					);
				});
			}),
			(this.d9i = () => {
				UiManager_1.UiManager.OpenView(
					"VisionIntensifyView",
					this.b8i.GetUniqueId(),
				);
			}),
			(this.C9i = () => {
				this.j6i = !this.j6i;
				var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				0 <
				(e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
						e.GetRoleId(),
						this.q8i,
					))
					? this.j6i
						? (this.GetItem(11).SetUIActive(!0),
							this.k8i.StopSequenceByKey("ContrastSwitch", !1, !1),
							this.k8i.PlaySequencePurely("ContrastSwitch", !1, !1),
							(this.r9i = !0))
						: (this.r9i &&
								(this.k8i.StopSequenceByKey("ContrastSwitch", !1, !1),
								this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
								(this.j6i = !1)),
							(this.r9i = !1))
					: (this.j6i = !1),
					this.GetItem(14).SetUIActive(this.j6i && 0 < e),
					this.g9i();
			}),
			(this.sGe = () => {
				var e = new VisionMediumItemGrid_1.VisionMediumItemGrid();
				return (
					e.SetClickToggleEvent(this.f9i),
					e.SetOnRefreshEvent(this.p9i),
					e.SetOnPointDownCallBack(this.v9i),
					e.SetOnPointUpCallBack(this.M9i),
					e
				);
			}),
			(this.p9i = (e) => {
				e.CheckSelectedState(this.b8i) &&
					(this.LoopScrollView.DeselectCurrentGridProxy(),
					this.LoopScrollView.SelectGridProxy(e.GridIndex, !1));
			}),
			(this.v9i = (e, t) => {
				this.S9i(),
					(this.K1t = 0),
					(this.V8i = 0),
					(this.H8i = !0),
					(this.X8i = e),
					(e =
						LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
							0,
						).GetWorldPointInPlane()),
					(this.W8i = e.X),
					(this.K8i = e.Z),
					(this.j8i = !1),
					this.VisionEquipmentDragItem.UpdateItem(t),
					this.Y8i.Refresh(t, !1),
					this.E9i(!0),
					this.y9i(0),
					(this.F8i = -1),
					this.GetSprite(19).SetFillAmount(0),
					(this.R8i = TickSystem_1.TickSystem.Add(
						this.I9i,
						"RoleVisionAnimation",
						0,
						!0,
					).Id);
			}),
			(this.M9i = (e, t) => {
				this.S9i(),
					this.GetLoopScrollViewComponent(6).SetEnable(!0),
					this.Y8i?.ClearStayingItem(),
					this.VisionEquipmentDragItem.SetActive(!1),
					this.E9i(!1),
					(this.F8i = 999),
					e || t || this.T9i();
			}),
			(this.I9i = () => {
				var e, t;
				(this.K1t += Time_1.Time.DeltaTime),
					this.j8i && this.Y8i.TickCheckDrag(),
					this.H8i &&
						(this.K1t > this.J8i &&
							0 === this.z8i &&
							(this.L9i(), this.y9i(1), (this.V8i = 0)),
						0 < this.z8i && (this.V8i += Time_1.Time.DeltaTime),
						this.X8i &&
							((t =
								LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
									0,
								).GetWorldPointInPlane()),
							(e = this.W8i - t.X),
							(t = this.K8i - t.Z),
							Math.abs(e) + Math.abs(t) > this.Z8i) &&
							(this.E9i(!1), (this.H8i = !1)),
						this.V8i > this.g_t
							? (this.GetLoopScrollViewComponent(6).SetEnable(!1),
								this.E9i(!1),
								(this.H8i = !1),
								(this.j8i = !0),
								this.VisionEquipmentDragItem.SetActive(!0),
								this.Y8i.StartDragState(),
								this.Y8i.SetItemToPointerPosition(),
								this.OnPointerDownCallBack(this.Y8i.GetCurrentIndex()),
								this.Y8i.SetDragItemHierarchyMax(),
								AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag"),
								(this.A8i = TickSystem_1.TickSystem.Add(
									this.D9i,
									"RoleVisionAnimation",
									0,
									!0,
								).Id))
							: this.GetSprite(19).SetFillAmount(this.V8i / this.g_t));
			}),
			(this.D9i = () => {
				var e =
						LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
							0,
						),
					t =
						LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(
							0,
						),
					i = this.Y8i.GetStayingItem();
				e ||
					t ||
					(0 === i?.length
						? (this.M9i(void 0, void 0),
							AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"))
						: (this.OnDragEndCallBack(this.Y8i, this.Y8i.GetStayingItem()),
							this.M9i(void 0, void 0)),
					this.R9i());
			}),
			(this.f9i = (e, t) => {
				this.U9i(e),
					this.LoopScrollView.DeselectCurrentGridProxy(),
					this.LoopScrollView.SelectGridProxy(t),
					this.A9i(e),
					(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectData =
						this.P9i(t)),
					(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
						e.GetUniqueId()),
					this.u9i(this.b8i.GetUniqueId()),
					this.x9i();
			}),
			(this.TryEquip = (e, t, i) => {
				var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				switch (
					e
						? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(
								o.GetRoleId(),
								t,
								e.GetUniqueId(),
							)
						: 1
				) {
					case 0:
						if (-1 === t) return;
						this.w9i(t);
						break;
					case 1:
					case 2:
						this.B9i(e, t, i);
				}
			}),
			(this.OnClickFailVision = (e) => {
				this.T9i();
			}),
			(this.OnClickVisionAndRefreshVisionView = (e) => {
				this.GetItem(15).SetRaycastTarget(!1), this.b9i(e), this.q9i(!1, !1);
				var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				0 ===
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
						t.GetRoleId(),
						e,
					) && this.LoopScrollView.ResetGridController(),
					this.G9i(),
					AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click");
			}),
			(this.Og = (e) => {
				this.N9i(), this.G9i(), this.x9i(), this.O9i(e?.GetUniqueId() ?? 0);
			}),
			(this.k9i = () => {
				this.LoopScrollView.DeselectCurrentGridProxy(),
					0 < this.B8i.length
						? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
							this.LoopScrollView.RefreshAllGridProxies())
						: this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
			}),
			(this.F9i = () => {
				this.LoopScrollView.RefreshAllGridProxies();
			}),
			(this.V9i = () => {
				this.LoopScrollView.DeselectCurrentGridProxy(),
					0 < this.B8i.length
						? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
							this.LoopScrollView.ReloadData(this.B8i))
						: this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
			}),
			(this.N9i = () => {
				var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.zke,
					),
					t =
						ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
							e,
						),
					i = this.w8i.length;
				for (let e = 0; e < i; e++) {
					var o = t.length > e ? t[e] : void 0;
					this.w8i[e].UpdateItem(o), this.$8i[e].Refresh(o, !1);
				}
				this.H9i();
			}),
			(this.OnBeginDrag = (e) => {
				var t = this.$8i.length;
				for (let e = 0; e < t; e++) this.$8i[e].StartDragState();
				for (let e = 0; e < t; e++)
					ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
						this.$8i[e].GetCurrentIndex(),
					) && this.$8i[e].SetDragItemHierarchyMax();
				this.$8i[e].SetItemToPointerPosition(),
					(this.F8i = e),
					AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
			}),
			(this.OnPointerDownCallBack = (e) => {
				this.GetItem(15).SetRaycastTarget(!0);
				var t = this.$8i.length;
				for (let e = 0; e < t; e++) this.$8i[e].StartClickCheckTimer();
			}),
			(this.j9i = () => {
				this.Uqe += Time_1.Time.DeltaTime;
				let e = this.Uqe / 300;
				1 <= e && (e = 1),
					this.$8i[this.F8i].TickDoCeaseAnimation(e),
					1 <= e && (this.W9i(this.F8i), this.K9i());
			}),
			(this.OnEquipError = () => {
				this.T9i();
			}),
			(this.OnPhantomEquip = () => {
				this.g9i();
			}),
			(this.OnVisionFilterMonster = () => {
				this.Q9i();
			}),
			(this.X9i = (e, t) => {
				this.K9i(),
					(this.Uqe = 0),
					(this.F8i = 999),
					this.$8i[e].SetActive(!1),
					this.$8i[e].ResetPosition(),
					this.w8i[e].ResetPosition(),
					this.GetItem(15).SetRaycastTarget(!1);
				const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				this.m9i(t, e, () => {
					ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
						t.GetUniqueId(),
						i.GetRoleId(),
						e,
					);
				});
			}),
			(this.OnDragEndCallBack = (e, t) => {
				if (t.length < 1)
					this.T9i(),
						AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
				else {
					const i = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
						e,
						t,
					);
					if (-1 === i) this.T9i();
					else {
						-1 === e.GetCurrentIndex() && this.T9i();
						const t = e.GetCurrentIndex(),
							o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
								this.zke,
							),
							n = -1 !== t;
						this.m9i(e.GetCurrentData(), i, () => {
							this.$9i(t, !0),
								this.$9i(i, !0),
								this.Y9i(t, !0),
								this.Y9i(i, !0),
								ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
									e.GetCurrentData().GetUniqueId(),
									o.GetRoleId(),
									i,
									t,
									n,
								);
						});
					}
				}
			}),
			(this.J9i = (e, t, i) => {
				(this.F8i = 999),
					0 <= e &&
						(this.$8i[e].SetActive(!0), this.w8i[e].SetAniLightState(!1)),
					i && -1 !== e
						? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
							this.z9i(),
							(this.Uqe = 0),
							(i = this.$8i[t].GetAnimationTargetPos()),
							this.$8i[e].SetDragComponentToTargetPositionParam(i),
							(i = this.$8i[e].GetAnimationTargetPos()),
							this.$8i[t].SetDragComponentToTargetPositionParam(i),
							(this.P8i = e),
							(this.x8i = t),
							this.$9i(this.P8i, !0),
							this.$9i(this.x8i, !0),
							this.Y9i(this.P8i, !0),
							this.Y9i(this.x8i, !0),
							(this.D8i = TickSystem_1.TickSystem.Add(
								this.J_,
								"RoleVisionAnimation",
								0,
								!0,
							).Id))
						: (this.$9i(e, !1),
							this.$9i(t, !1),
							this.Y9i(e, !1),
							this.Y9i(t, !1),
							this.Z9i(),
							this.b9i(t),
							this.q9i(!0, !1, !1),
							this.w8i[t].GetCurrentData() && this.e7i(t),
							0 <= e
								? AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_off")
								: AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
			}),
			(this.J_ = () => {
				this.Uqe += Time_1.Time.DeltaTime;
				let e = this.Uqe / 300;
				1 <= e && (e = 1),
					this.$8i[this.P8i].TickDoCeaseAnimation(e),
					this.$8i[this.x8i].TickDoCeaseAnimation(e),
					1 <= e &&
						(this.t7i(),
						this.z9i(),
						AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
			}),
			(this.Awe = () => {
				this.CloseMe();
			}),
			(this.i7i = void 0),
			(this.bpt = (e, t, i) => {
				var o = e;
				const n = new Array();
				o.forEach((e) => {
					n.push(
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							e.Id,
						),
					);
				}),
					(this.B8i = n),
					this.V9i(),
					(e = 0 < e?.length),
					this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(e),
					this.o7i(o, t, i);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UILoopScrollViewComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[16, UE.UIItem],
			[15, UE.UIItem],
			[17, UE.UIVerticalLayout],
			[18, UE.UIItem],
			[19, UE.UISprite],
			[20, UE.UIItem],
			[21, UE.UIExtendToggle],
			[22, UE.UIItem],
			[23, UE.UIItem],
			[24, UE.UIItem],
			[25, UE.UIItem],
			[26, UE.UIItem],
			[27, UE.UIButtonComponent],
			[28, UE.UIItem],
			[29, UE.UIButtonComponent],
			[30, UE.UIText],
			[31, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[21, this.l9i],
				[27, this.oft],
				[29, this.C9i],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.V9i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemLock,
				this.F9i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomEquipError,
				this.OnEquipError,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomEquip,
				this.OnPhantomEquip,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
				this.J9i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.VisionFilterMonster,
				this.OnVisionFilterMonster,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
				this._9i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.VisionSkinViewClose,
				this.ABn,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.V9i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemLock,
				this.F9i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomEquipError,
				this.OnEquipError,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomEquip,
				this.OnPhantomEquip,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
				this.J9i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.VisionFilterMonster,
				this.OnVisionFilterMonster,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
				this._9i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.VisionSkinViewClose,
				this.ABn,
			);
	}
	OnStart() {
		(this.s9i = !1),
			this.GetItem(15).SetUIActive(!0),
			this.GetItem(15).SetRaycastTarget(!1),
			this.GetItem(9).SetUIActive(!0),
			(this.aft = new FilterEntrance_1.FilterEntrance(
				this.GetItem(12),
				this.bpt,
			)),
			(this.hft = new SortEntrance_1.SortEntrance(this.GetItem(13), this.bpt)),
			(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(6),
				this.GetItem(8).GetOwner(),
				this.sGe,
			)),
			this.r7i(),
			(this.k8i = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.k8i.BindSequenceCloseEvent(this.KIt),
			this.GetItem(14).SetUIActive(!1),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
			this.lqe.SetCloseCallBack(this.Awe),
			(this.g_t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerPressTime()),
			(this.Z8i =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerMoveDistance()),
			(this.J8i =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionBeforeScrollerLongPressTime()),
			this.n7i(),
			this.s7i(),
			this.E9i(!1),
			this.GetVerticalLayout(17).SetEnable(!1),
			this.N8i.RefreshViewByCompareState(!0),
			this.a7i(),
			this.h7i(),
			(this.Ife = !0);
		var e = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1)
			? 0
			: 1;
		this.GetExtendToggle(21)?.SetToggleState(e),
			this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
			(this.r9i = !1);
	}
	OnHandleLoadScene() {
		PhantomBattleController_1.PhantomBattleController.SetMeshTransform(
			this.i7i,
		);
	}
	async OnBeforeStartAsync() {
		(this.zke = this.OpenParam),
			(this.G8i = new VisionDetailComponent_1.VisionDetailComponent(
				this.GetItem(10),
			)),
			await this.G8i.Init(),
			(this.N8i = new VisionDetailComponent_1.VisionDetailComponent(
				this.GetItem(11),
			)),
			await this.N8i.Init(),
			await this.l7i(),
			(this.XVe = new CommonDropDown_1.CommonDropDown(
				this.GetItem(22),
				this.ZVe,
				this.zVe,
			)),
			await this.XVe.Init();
	}
	r7i() {
		this.G8i.GetDetailUnderComponent().SetRightButtonClick(this.d9i),
			this.G8i.GetDetailUnderComponent().SetLeftButtonClick(this.c9i),
			this.G8i.SetActive(!1),
			this.N8i.SetButtonPanelShowState(!0),
			this.N8i.SetActive(!0);
	}
	async l7i() {
		for (let e = 0; e <= 4; e++)
			this.w8i.push(
				new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
					this.GetItem(e),
					0 + e,
					this.zke,
				),
			);
		(this.VisionEquipmentDragItem =
			new VisionEquipmentDragItem_1.VisionEquipmentDragItem(this.GetItem(16))),
			await this.VisionEquipmentDragItem.Init(),
			this.VisionEquipmentDragItem.SetActive(!1),
			(this.Y8i = new VisionCommonDragItem_1.VisionCommonDragItem(
				this.VisionEquipmentDragItem.GetRootItem(),
				this.VisionEquipmentDragItem.GetDragComponent(),
				this.GetItem(15),
				-1,
			)),
			this.GetItem(16).SetUIActive(!1),
			await Promise.all([...this.w8i.map(async (e) => e.Init())]),
			this.w8i.forEach((e) => {
				var t = new VisionCommonDragItem_1.VisionCommonDragItem(
					e.GetRootItem(),
					e.GetDragComponent(),
					this.GetItem(15),
					e.GetCurrentIndex(),
				);
				this.$8i.push(t),
					t.SetOnDragAnimationStartFunction(e.OnDragItemDragBegin),
					t.SetOnDragAnimationEndFunction(e.OnDragItemDragEnd),
					t.SetOnOverlayCallBack(e.OnOverlay),
					t.SetOnUnOverlayCallBack(e.OnUnOverlay),
					t.SetMoveToScrollViewCallBack(e.OnScrollToScrollView),
					t.SetRemoveFromScrollViewCallBack(e.OnRemoveFromScrollView),
					e.SetShowType(1);
			}),
			this.$8i.forEach((e) => {
				e.SetOnClickCallBack(this.OnClickVisionAndRefreshVisionView),
					e.SetOnClickFailCallBack(this.OnClickFailVision),
					e.SetDragCheckItem(this.$8i),
					e.SetDragSuccessCallBack(this.OnDragEndCallBack),
					e.SetPointerDownCallBack(this.OnPointerDownCallBack),
					e.SetOnBeginDragCall(this.OnBeginDrag),
					e.SetEndDragWhenOnScrollViewCallBack(this.X9i);
			}),
			this.Y8i.SetDragCheckItem(this.$8i);
	}
	h7i() {
		var e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray();
		this.o9i.push(0),
			e.forEach((e) => {
				this.o9i.push(e.Id);
			}),
			this.XVe.SetOnSelectCall(this.t6e),
			this.XVe.SetShowType(0),
			this.XVe.InitScroll(this.o9i, this.i6e, this.e9i);
	}
	a7i() {
		var e = new Array();
		for (let i = 23; i <= 26; i++) {
			var t = this.GetItem(i);
			e.push(t);
		}
		var i = this.GetItem(20);
		(this.t9i = new StaticTabComponent_1.StaticTabComponent(
			this.fqe,
			this.pqe,
		)),
			this.t9i.Init(e);
		var o = i.GetAttachUIChildren().Num();
		for (let e = 0; e < o; e++) {
			let t = e;
			1 < e && (t += 1), this.i9i.push(t);
		}
		this.t9i.SelectToggleByIndex(0, !0);
	}
	n7i() {
		this.q8i =
			ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex;
		var e =
				ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId,
			t =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
		0 < e && t ? this.U9i(t) : this.U9i(this.P9i(this.q8i));
	}
	_7i() {
		0 < this.n9i &&
			(RedDotController_1.RedDotController.UnBindGivenUi(
				"IdentifyTab",
				this.GetItem(28),
				this.n9i,
			),
			(this.n9i = 0));
	}
	u7i() {
		this._7i(),
			this.b8i &&
				((this.n9i = this.b8i.GetUniqueId()),
				RedDotController_1.RedDotController.BindRedDot(
					"IdentifyTab",
					this.GetItem(28),
					void 0,
					this.n9i,
				));
	}
	s7i() {
		this.Og(this.b8i), this.u9i(this.b8i?.GetUniqueId() ?? 0), this.c7i();
	}
	y9i(e) {
		this.GetItem(18).SetAlpha(e), (this.z8i = e);
	}
	E9i(e) {
		this.GetItem(18).SetUIActive(e);
	}
	m9i(e, t, i) {
		this.m7i(e, t) ? this.TryEquip(e, t, i) : this.T9i();
	}
	m7i(e, t) {
		var i =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
					e.GetUniqueId(),
				),
			o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke),
			n =
				((t = (s =
					ModelManager_1.ModelManager.PhantomBattleModel).GetRoleIndexPhantomId(
					o.GetRoleId(),
					t,
				)),
				(t = s.GetPhantomBattleData(t)
					? s.GetPhantomBattleData(t).GetCost()
					: 0),
				s.GetRoleCurrentPhantomCost(o.GetRoleId()));
		if (i && i !== o.GetRoleId()) {
			var s = s.GetRoleCurrentPhantomCost(i) - e.GetCost() + t,
				a = n - t + e.GetCost();
			if (s > this.d7i() || a > this.d7i()) return this.C7i(), !1;
		} else {
			if (i && i === o.GetRoleId()) return !0;
			if (n - t + e.GetCost() > this.d7i()) return this.C7i(), !1;
		}
		return !0;
	}
	C7i() {
		var e;
		this.d7i() <
		ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax()
			? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(157)).FunctionMap.set(
					1,
					() => {
						this.g7i(),
							UiManager_1.UiManager.OpenView(
								"CalabashRootView",
								void 0,
								(e) => {
									e &&
										(UiManager_1.UiManager.CloseView("VisionEquipmentView"),
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.PhantomCostInsufficient,
										));
								},
							);
					},
				),
				(e.IsEscViewTriggerCallBack = !1),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					e,
				))
			: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(158)),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					e,
				));
	}
	G9i() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		let t =
			ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
				e.GetRoleId(),
			);
		var i =
				ModelManager_1.ModelManager.PhantomBattleModel?.GetRoleIndexPhantomId(
					e.GetRoleId(),
					this.q8i,
				),
			o =
				((e = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					e.GetRoleId(),
				).GetIncrIdList()),
				this.b8i ? this.b8i.GetUniqueId() : 0);
		e = e.includes(o);
		i &&
			0 < i &&
			!e &&
			(t -= (o =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
					i,
				)).GetCost()),
			e || (t += this.b8i ? this.b8i.GetCost() : 0);
		let n = "",
			s = "";
		t > this.d7i()
			? ((n =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorAlert()),
				(s =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
				this.a9i || (this.k8i.PlaySequencePurely("CostBlink"), (this.a9i = !0)))
			: ((s =
					t === this.d7i()
						? ((n =
								ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull())
						: ((n =
								ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase()),
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase())),
				this.k8i.StopSequenceByKey("CostBlink", !1, !0),
				(this.a9i = !1)),
			this.GetText(5).SetText(
				StringUtils_1.StringUtils.Format("/{0}", this.d7i().toString()),
			),
			this.GetText(30).SetText(
				StringUtils_1.StringUtils.Format("{0}", t.toString()),
			),
			this.GetText(30).SetColor(UE.Color.FromHex(n)),
			this.GetText(5).SetColor(UE.Color.FromHex(s));
	}
	g9i() {
		const e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
			this.zke,
		);
		var t =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
				e.GetRoleId(),
				this.q8i,
			);
		if (
			(t =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t))
		)
			this.N8i.Update(t, this.zke, !0);
		else {
			const e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.zke,
			);
			0 ===
				ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
					e.GetRoleId(),
					this.q8i,
				) &&
				this.r9i &&
				(this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
				(this.r9i = !1),
				(this.j6i = !1));
		}
	}
	U9i(e) {
		(this.b8i = e), this.f7i(), this.G9i(), this.u7i();
	}
	S9i() {
		this.R8i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.R8i),
			(this.R8i = TickSystem_1.TickSystem.InvalidId));
	}
	L9i() {
		var e =
				LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
					0,
				),
			t =
				((e = Vector2D_1.Vector2D.Create(e.X, e.Y)).FromUeVector2D(
					UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
						e.ToUeVector2D(!0),
					),
				),
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
			i =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
		(t = e.X + t), (e = e.Y + i);
		this.GetItem(18).SetLGUISpaceAbsolutePosition(new UE.Vector(t, e, 0));
	}
	p7i() {
		this.Q8i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.Q8i),
			(this.Q8i = TickSystem_1.TickSystem.InvalidId));
	}
	R9i() {
		this.A8i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.A8i),
			(this.A8i = TickSystem_1.TickSystem.InvalidId));
	}
	w9i(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
			0,
			t.GetRoleId(),
			e,
			e,
		);
	}
	B9i(e, t, i) {
		e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
				e.GetUniqueId(),
			);
		var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		e && e !== o.GetRoleId()
			? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(31)),
				(e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)),
				o.SetTextArgs(e.GetName()),
				o.FunctionMap.set(1, () => {
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
				}),
				o.FunctionMap.set(2, () => {
					i();
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				))
			: i();
	}
	b9i(e) {
		this.q8i !== e &&
			((this.q8i = e),
			(ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
				e));
	}
	q9i(e = !1, t = !0, i = !0) {
		this.v7i(t, i), this.M7i(e);
	}
	v7i(e = !0, t = !0) {
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		0 !==
		(i =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
				i.GetRoleId(),
				this.q8i,
			))
			? (this.O9i(i, t), (i = this.P9i(this.q8i)), this.U9i(i))
			: e &&
				(this.U9i(this.P9i(this.q8i)),
				this.LoopScrollView.ResetGridController(),
				this.O9i(this.b8i?.GetUniqueId() ?? 0, t));
	}
	M7i(e = !1) {
		this.A9i(this.b8i),
			this.H9i(),
			this.g9i(),
			this.u9i(this.b8i?.GetUniqueId() ?? 0, e),
			this.x9i(),
			this.c7i(),
			this.T9i();
	}
	S7i() {
		var e = this.w8i.length;
		for (let t = 0; t < e; t++) this.w8i[t].SetToggleState(0, !1, !0);
	}
	c7i() {
		var e = this.w8i.length;
		for (let t = 0; t < e; t++)
			this.w8i[t].SetToggleState(this.q8i === t ? 1 : 0);
	}
	P9i(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		t =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
				t.GetRoleId(),
				e,
			);
		let i =
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
		return i || (0 < this.B8i.length ? this.B8i[0] : void 0);
	}
	A9i(e, t = 0) {
		e
			? (this.G8i.SetActive(!0), this.G8i.Update(e, this.zke, !1))
			: this.G8i.SetActive(!1);
	}
	O9i(e, t = !0) {
		this.LoopScrollView.DeselectCurrentGridProxy();
		let i = !1,
			o = 0;
		for (const t of this.B8i) {
			if (t.GetUniqueId() === e) {
				i = !0;
				break;
			}
			o++;
		}
		i || (o = 0),
			0 < this.B8i.length &&
				i &&
				(t && this.LoopScrollView.ScrollToGridIndex(o, !1),
				this.LoopScrollView.SelectGridProxy(o));
	}
	OnBeforeShow() {
		var e;
		0 < this.O8i &&
			!UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
			((e = this.O8i), (this.O8i = 0), this.u9i(e, !1)),
			ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
			this.A9i(this.b8i),
			this.g9i(),
			ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpTag()
				? (this.h9i(),
					ModelManager_1.ModelManager.PhantomBattleModel.ClearVisionLevelUp())
				: 0 <
						ModelManager_1.ModelManager.PhantomBattleModel
							.CurrentSelectFetterGroupId
					? ((this.e9i = this.o9i.indexOf(
							ModelManager_1.ModelManager.PhantomBattleModel
								.CurrentSelectFetterGroupId,
						)),
						(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId = 0),
						this.XVe.SetSelectedIndex(this.e9i))
					: this.h9i(),
			this.Q9i(),
			this.S7i(),
			this.c7i(),
			this.x9i(),
			this.N9i();
	}
	Q9i() {
		ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter &&
			(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
				void 0);
	}
	h9i() {
		var e = this.o9i[this.e9i];
		e = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
			e,
			this.O4t,
		);
		this.aft.UpdateData(this.e6i, e, this.zke),
			this.hft.UpdateData(this.e6i, e, this.zke);
	}
	OnAfterShow() {
		this.$8i.forEach((e) => {
			e.SetScrollViewItem(this.GetLoopScrollViewComponent(6).RootUIComp);
		});
	}
	OnAfterHide() {
		this.T9i(),
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!1,
			),
			UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
	}
	u9i(e, t = !1) {
		var i;
		this.s9i &&
			(i =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					e,
				)) &&
			this.O8i !== i.GetUniqueId() &&
			(this.y7i(),
			ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
				i.GetConfigId(!0),
				() => {
					this.E7i(t);
				},
				this.i7i,
			),
			(this.O8i = e));
	}
	E7i(e = !1) {
		if (this.i7i) {
			var t = this.i7i.Model;
			let i, o;
			(o = e
				? ((i = "VisionChangeEffect"), "VisionChangeController")
				: ((i = "VisionLevelUpEffect"), "VisionStepupController")),
				UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(t, i),
				UiModelUtil_1.UiModelUtil.SetRenderingMaterial(t, o);
		}
	}
	f7i() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
		let t = "";
		switch (
			this.b8i
				? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(
						e.GetRoleId(),
						this.q8i,
						this.b8i.GetUniqueId(),
					)
				: 1
		) {
			case 0:
				t = "PhantomTakeOff";
				break;
			case 1:
				t = "PhantomPutOn";
				break;
			case 2:
				t = "PhantomReplace";
		}
		this.G8i.SetUnderLeftButtonText(t);
	}
	H9i() {
		var e = this.w8i.length;
		for (let t = 0; t < e; t++)
			t === this.q8i ? this.w8i[t].SetSelected() : this.w8i[t].SetUnSelected();
	}
	async W9i(e) {
		(this.x8i = e),
			this.$9i(this.P8i, !1),
			this.$9i(this.x8i, !1),
			await this.I7i(e),
			this.Y9i(this.P8i, !1),
			this.Y9i(this.x8i, !1),
			this.T9i(!1),
			this.L8i.SetResult(!0);
	}
	async I7i(e) {
		this.$8i[e].SetToTargetParentAndSetStretch(
			this.w8i[this.x8i].GetRootItem(),
		),
			this.$8i[this.x8i].SetToTargetParentAndSetStretch(
				this.w8i[e].GetRootItem(),
			),
			this.$8i[e].DoCeaseSequence(),
			this.x8i !== e &&
				this.$8i[this.x8i].GetCurrentData() &&
				this.$8i[this.x8i].DoCeaseSequence(),
			await this.$8i[e].GetCeaseAnimationPromise()?.Promise;
	}
	K9i() {
		this.U8i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.U8i),
			(this.U8i = TickSystem_1.TickSystem.InvalidId));
	}
	async T9i(e = !0) {
		e &&
			999 !== this.F8i &&
			-1 !== this.F8i &&
			(this.K9i(),
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!0,
			),
			(this.Uqe = 0),
			(this.L8i = new CustomPromise_1.CustomPromise()),
			(e = this.$8i[this.F8i].GetAnimationTargetPos()),
			this.$8i[this.F8i].SetDragComponentToTargetPositionParam(e),
			(this.U8i = TickSystem_1.TickSystem.Add(
				this.j9i,
				"OnFailAnimationTick",
				0,
				!0,
			).Id),
			this.$9i(this.F8i, !0),
			await this.L8i.Promise,
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!1,
			),
			(this.F8i = 999)),
			this.$8i.forEach((e) => {
				e.ResetPosition(), e.SetActive(!0);
			}),
			this.w8i.forEach((e) => {
				e.ResetPosition();
			}),
			this.GetItem(15).SetRaycastTarget(!1),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"UiCommon",
					28,
					"this.GetItem(EComponent.DragPanel)!.SetRaycastTar",
				);
	}
	$9i(e, t) {
		0 <= e && this.$8i[e].SetMovingState(t);
	}
	Y9i(e, t) {
		0 <= e && this.w8i[e].SetAnimationState(t);
	}
	async e7i(e) {
		return (
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!0,
			),
			this.$8i[e].DoCeaseSequence(),
			await this.$8i[e].GetCeaseAnimationPromise()?.Promise,
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!1,
			),
			Promise.resolve()
		);
	}
	async t7i() {
		this.w8i[this.x8i].GetRootItem().SetAsFirstHierarchy(),
			this.$8i[this.P8i].SetToNormalParent(),
			this.$9i(this.P8i, !1),
			this.$9i(this.x8i, !1),
			await this.I7i(this.P8i),
			this.Y9i(this.P8i, !1),
			this.Y9i(this.x8i, !1),
			await this.T9i(!1),
			this.Z9i(),
			this.b9i(this.x8i),
			this.q9i(!0, !0, !1),
			UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
	}
	Z9i() {
		this.k9i(), this.N9i(), this.g9i(), this.G9i(), this.f7i(), this.T9i();
	}
	z9i() {
		this.D8i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.D8i),
			(this.D8i = TickSystem_1.TickSystem.InvalidId));
	}
	d7i() {
		return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
	}
	y7i() {
		UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
			UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
			(this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
	}
	g7i() {
		UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
			(this.i7i = void 0);
	}
	OnBeforePlayCloseSequence() {
		this.g7i();
	}
	OnBeforeDestroy() {
		this.g7i(),
			(this.i7i = void 0),
			this.p7i(),
			this._7i(),
			this.LoopScrollView.ClearGridProxies(),
			this.S9i(),
			this.z9i(),
			this.K9i(),
			this.t9i.Destroy();
	}
	o7i(e, t, i) {
		if (0 < e?.length) {
			let n = 0;
			if (1 !== i || t) {
				var o = e.length;
				for (let t = 0; t < o; t++)
					if (e[t].Id === this.b8i?.GetUniqueId()) {
						n = this.b8i?.GetUniqueId();
						break;
					}
				0 === n && (n = e[0].Id);
			} else n = e[0].Id;
			(i =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n)),
				this.U9i(i),
				this.O9i(n),
				this.A9i(this.b8i),
				this.g9i(),
				this.u9i(n),
				this.x9i(),
				this.c7i();
		}
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = this.B8i;
		if (0 !== t.length)
			if (2 !== e.length)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Guide", 17, "声骸聚焦引导extraParam配置错误");
			else {
				if ("txt" === e[0]) {
					var i = this.G8i?.GetTxtItemByIndex(Number(e[1]));
					if (i) return [i, i];
				}
				if ("item" === e[0]) {
					const o = Number(e[1]);
					return o
						? ((i = t.findIndex((e) => e.GetMonsterId(!0) === o)),
							this.LoopScrollView.ScrollToGridIndex(i),
							[(t = this.LoopScrollView.GetGrid(i)), t])
						: void (
								Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Guide",
									17,
									"声骸聚焦引导extraParam字段配置错误",
									["configParams", e],
								)
							);
				}
			}
	}
	x9i() {
		var e = this.b8i?.GetMonsterId();
		(e =
			e &&
			ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
				e,
			))
			? ((e = 1 < e.length),
				this.GetButton(27).RootUIComp.SetUIActive(e),
				(e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
						this.b8i.GetConfigId(),
					)),
				this.GetItem(31).SetUIActive(e))
			: this.GetButton(27).RootUIComp.SetUIActive(!1);
	}
}
exports.VisionEquipmentView = VisionEquipmentView;
