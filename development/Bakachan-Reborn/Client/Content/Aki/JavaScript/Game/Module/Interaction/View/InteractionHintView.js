"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionHintView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
	GuideConfig_1 = require("../../Guide/GuideConfig"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	InteractionDefine_1 = require("../InteractionDefine"),
	InteractionGuide_1 = require("./InteractionGuide"),
	InteractionHint_1 = require("./InteractionHint");
class InteractionHintView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.S_i = 0),
			(this.E_i = void 0),
			(this.y_i = 1),
			(this.I_i = 0),
			(this.T_i = 0),
			(this.L_i = 0),
			(this.D_i = 0),
			(this.R_i = InteractionDefine_1.LERP_TIME),
			(this.oTt = -1),
			(this.U_i = 0),
			(this.A_i = void 0),
			(this.P_i = []),
			(this.x_i = 0),
			(this.w_i = !1),
			(this.B_i = void 0),
			(this.b_i = void 0),
			(this.q_i = void 0),
			(this.g_t = 0),
			(this.G_i = !1),
			(this.N_i = 0),
			(this.O_i = 0),
			(this.k_i = 0),
			(this.F_i = !1),
			(this.V_i = 0),
			(this.H_i = void 0),
			(this.j_i = !1),
			(this.IsHoverHint = !1),
			(this.W_i = !1),
			(this.K_i = !1),
			(this.eHs = !1),
			(this.sbt = () => {
				this.aHs(), this.hHs();
			}),
			(this.MJt = () => {
				this.Ioi();
			}),
			(this.Q_i = () => {
				this.CloseMe();
			}),
			(this.X_i = (i) => {
				0 <= this.U_i && this.OZt(this.U_i),
					this.H_i && this.j_i && ((this.j_i = !1), this.$_i());
				var t = this.E_i.GetDisplayGridNum();
				(this.y_i > this.I_i ? this.I_i : this.y_i) !==
					(t = ((this.y_i = t), this.y_i > this.I_i ? this.I_i : this.y_i)) &&
					((this.L_i = this.T_i + this.D_i * ((t - 1) / 2)),
					(this.R_i = 0),
					(this.W_i = !0));
			}),
			(this.Y_i = () => {
				var i = new InteractionHint_1.InteractionHint();
				return (
					i.BindOnHover(this.J_i),
					i.BindOnUnHover(this.z_i),
					i.BindOnToggleStateChanged(this.s_i),
					i
				);
			}),
			(this.J_i = (i) => {
				(this.IsHoverHint = !0), (i = i.ActorIndex), this.OZt(i);
			}),
			(this.z_i = (i) => {
				this.IsHoverHint = !1;
			}),
			(this.s_i = (i, t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Test",
						8,
						"[InteractionView]自动拾取-----当ExtendToggle状态改变时，会打断自动拾取",
					),
					(this.G_i = !1),
					this.Z_i(),
					this.InteractPawn(t);
			}),
			(this.fzt = (i) => {
				i || (this.IsHoverHint = !1);
			}),
			(this.dKe = () => {
				this.eui();
			}),
			(this.tui = () => {
				ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
					this.iui() &&
					this.oui();
			}),
			(this.rui = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----成功拾取", [
						"IsAutoPicked",
						this.G_i,
					]),
					this.G_i ? this.nui() : (this.w_i = !1);
			}),
			(this.sui = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Test", 8, "[InteractionView]刷新交互选项时"),
					(this.w_i = !1),
					this.w_i
						? Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Test",
								8,
								"[InteractionView]刷新交互选项 - 自动拾取中",
								["Count", this.P_i?.length],
							)
						: this.b_i
							? Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Test",
									8,
									"[InteractionView]刷新交互选项 - 下一帧会刷新交互选项",
								)
							: (this.b_i = TimerSystem_1.TimerSystem.Next(() => {
									this.aui(),
										Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug(
												"Test",
												8,
												"[InteractionView]刷新交互选项 - 开始刷新交互选项",
												["Count", this.P_i?.length],
											),
										this.hui(this.P_i),
										this.lui(),
										(this.b_i = void 0);
								}));
			}),
			(this.bMe = (i, t) => {
				0 === t
					? this._ui()
					: 1 === t && (this.H_i ? this.$_i() : (this.j_i = !0));
			}),
			(this.Ltt = () => {
				this.oui();
			}),
			(this.uui = (i, t) => {
				0 === t && this.cui(void 0, -1);
			}),
			(this.cui = (i, t) => {
				0 === t ||
					this.IsHoverHint ||
					(1 !== this.E_i.GetDisplayGridNum() && this.SelectHint(0 < t));
			}),
			(this.mui = (i, t) => {
				0 === t && this.SelectHint(!0);
			}),
			(this.dui = (i, t) => {
				0 === t && this.SelectHint(!1);
			}),
			(this.pbt = (i, t) => {
				(t = t.TouchType),
					(i = Number(i)),
					(i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(i)) &&
						(0 === t
							? (this.F_i = i.IsTouchComponentContainTag(
									InteractionDefine_1.autoPickUpTag,
								))
							: 1 === t &&
								(this.F_i &&
									i.IsTouchComponentContainTag(
										InteractionDefine_1.autoPickUpTag,
									) &&
									this.oui(),
								(this.F_i = !1)));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
			[2, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.tui]]);
	}
	OnAddEventListener() {
		this.hHs(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.InteractionViewUpdate,
				this.sui,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HideInteractView,
				this.Q_i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnShowMouseCursor,
				this.fzt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInteractDropItemSuccess,
				this.rui,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.InputControllerChange,
				this.sbt,
			),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				19,
				this.MJt,
			);
	}
	hHs() {
		InputDistributeController_1.InputDistributeController.BindAxis(
			InputMappingsDefine_1.axisMappings.WheelAxis,
			this.cui,
		),
			void 0 !==
			ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
				? ((this.K_i = !0),
					ModelManager_1.ModelManager.PlatformModel?.IsInGamepad()
						? ((this.eHs = !0),
							InputDistributeController_1.InputDistributeController.BindAction(
								InputMappingsDefine_1.actionMappings.UI左摇杆上,
								this.mui,
							),
							InputDistributeController_1.InputDistributeController.BindAction(
								InputMappingsDefine_1.actionMappings.UI左摇杆下,
								this.dui,
							))
						: (InputDistributeController_1.InputDistributeController.BindAction(
								InputMappingsDefine_1.actionMappings.Ui方向上,
								this.mui,
							),
							InputDistributeController_1.InputDistributeController.BindAction(
								InputMappingsDefine_1.actionMappings.Ui方向下,
								this.dui,
							)),
					InputDistributeController_1.InputDistributeController.BindAction(
						InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
						this.bMe,
					))
				: (InputDistributeController_1.InputDistributeController.BindAction(
						InputMappingsDefine_1.actionMappings.通用交互,
						this.bMe,
					),
					InputDistributeController_1.InputDistributeController.BindAction(
						InputMappingsDefine_1.actionMappings.切换交互,
						this.uui,
					)),
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
				this.pbt,
			);
	}
	OnRemoveEventListener() {
		this.aHs(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.InteractionViewUpdate,
				this.sui,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HideInteractView,
				this.Q_i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnShowMouseCursor,
				this.fzt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInteractDropItemSuccess,
				this.rui,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.InputControllerChange,
				this.sbt,
			),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				19,
				this.MJt,
			);
	}
	aHs() {
		InputDistributeController_1.InputDistributeController.UnBindAxis(
			InputMappingsDefine_1.axisMappings.WheelAxis,
			this.cui,
		),
			this.K_i
				? ((this.K_i = !1),
					this.eHs
						? ((this.eHs = !1),
							InputDistributeController_1.InputDistributeController.UnBindAction(
								InputMappingsDefine_1.actionMappings.UI左摇杆上,
								this.mui,
							),
							InputDistributeController_1.InputDistributeController.UnBindAction(
								InputMappingsDefine_1.actionMappings.UI左摇杆下,
								this.dui,
							))
						: (InputDistributeController_1.InputDistributeController.UnBindAction(
								InputMappingsDefine_1.actionMappings.Ui方向上,
								this.mui,
							),
							InputDistributeController_1.InputDistributeController.UnBindAction(
								InputMappingsDefine_1.actionMappings.Ui方向下,
								this.dui,
							)),
					InputDistributeController_1.InputDistributeController.UnBindAction(
						InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
						this.bMe,
					))
				: (InputDistributeController_1.InputDistributeController.UnBindAction(
						InputMappingsDefine_1.actionMappings.通用交互,
						this.bMe,
					),
					InputDistributeController_1.InputDistributeController.UnBindAction(
						InputMappingsDefine_1.actionMappings.切换交互,
						this.uui,
					)),
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
				this.pbt,
			);
	}
	Ioi() {
		var i =
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
				19,
			);
		this.SetUiActive(i),
			i &&
				!ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
				((this.j_i = !1),
				InputDistributeController_1.InputDistributeController.ExecuteDelayInputAction(
					InputMappingsDefine_1.actionMappings.通用交互,
				));
	}
	OnAfterShow() {
		this.aui(), this.hui(this.P_i), this.lui(), this.Ioi(), this.OZt(0);
	}
	OnAfterHide() {
		this.H_i = void 0;
	}
	OnStart() {
		(this.xqe = this.GetScrollViewWithScrollbar(2)),
			(this.A_i = this.GetItem(3)),
			(this.S_i = this.xqe.ScrollSensitivity),
			(this.V_i = this.A_i.GetAnchorOffsetY()),
			(this.T_i = this.A_i.GetAnchorOffsetY());
		var i = this.GetItem(1);
		(this.E_i = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.Y_i,
			i?.GetOwner(),
		)),
			(this.D_i = i.GetHeight()),
			(this.I_i = this.A_i.GetHeight() / this.D_i),
			(i = ModelManager_1.ModelManager.InteractionModel);
		(this.g_t = i.AutoLongPressTime + i.ShowLongPressTime),
			this.xqe.OnLateUpdate.Bind(this.X_i);
	}
	oui() {
		(this.G_i = !0),
			(this.w_i = !0),
			(this.k_i = this.P_i.length),
			(this.N_i = 0),
			(this.O_i = 0);
		var i = ModelManager_1.ModelManager.InteractionModel;
		ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? i.SaveTriggerMobileGuide(!0)
			: i.SaveTriggerDesktopGuide(!0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----开始", [
					"AutoPickLength",
					this.k_i,
				]),
			this.nui();
	}
	nui() {
		this.O_i++;
		var i = this.P_i[this.N_i];
		(!i?.Valid ||
			(ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(i) ||
				(this.N_i++, this.nui()),
			this.InteractPawn(this.N_i)
				? (this.P_i.splice(this.N_i, 1), this.hui(this.P_i))
				: (this.N_i++, this.nui()),
			this.O_i >= this.k_i)) &&
			this.Cui();
	}
	Cui() {
		this.aui(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----结束", [
					"InteractLength",
					this.P_i.length,
				]),
			this.hui(this.P_i),
			(this.w_i = !1);
	}
	InteractPawn(i) {
		var t = this.P_i[i];
		return (
			!!t?.Valid &&
			!!(t = t.GetComponent(103))?.IsPawnInteractive() &&
			((i =
				ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
					i,
				)),
			t.InteractPawn(i),
			!0)
		);
	}
	OnBeforeDestroy() {
		this.E_i && (this.E_i.ClearChildren(), (this.E_i = void 0)),
			this.q_i?.Destroy(),
			(this.q_i = void 0),
			(this.H_i = void 0),
			this.A_i?.SetAnchorOffsetY(this.V_i),
			(this.A_i = void 0),
			this.xqe &&
				((this.xqe.ScrollSensitivity = this.S_i),
				this.xqe.OnLateUpdate.Unbind()),
			(this.S_i = 0),
			(this.xqe = void 0),
			(this.w_i = !1),
			(this.q_i = void 0),
			(this.P_i.length = 0),
			(this.F_i = !1),
			this.Z_i(),
			this.gui();
	}
	gui() {
		this.b_i &&
			TimerSystem_1.TimerSystem.Has(this.b_i) &&
			(TimerSystem_1.TimerSystem.Remove(this.b_i), (this.b_i = void 0));
	}
	hui(i) {
		this.E_i.RefreshByData(i),
			(i = MathUtils_1.MathUtils.Clamp(this.oTt, 0, i.length - 1)),
			this.OZt(i);
	}
	aui() {
		(this.P_i.length = 0), (this.x_i = this.pui(this.P_i));
	}
	pui(i) {
		return ModelManager_1.ModelManager.InteractionModel.RefreshInteractEntities(
			i,
		);
	}
	OnTick(i) {
		this.W_i &&
			(this.R_i < InteractionDefine_1.LERP_TIME
				? ((this.R_i += i),
					(i = this.A_i.GetAnchorOffsetY()),
					(i = MathUtils_1.MathUtils.Lerp(
						i,
						this.L_i,
						Math.min(this.R_i / InteractionDefine_1.LERP_TIME, 1),
					)),
					this.A_i.SetAnchorOffsetY(i))
				: (this.W_i = !1)),
			this.q_i?.InAsyncLoading() || this.q_i?.RefreshTextWidth();
	}
	_ui() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Test",
				8,
				"[InteractionView]自动拾取-----当玩家按下通用交互，会打断自动拾取",
			),
			(this.G_i = !1),
			this.H_i &&
				!ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
				this.iui() &&
				this.GetActive() &&
				(this.Z_i(),
				(this.B_i = TimerSystem_1.TimerSystem.Delay(this.Ltt, this.g_t)));
	}
	Z_i() {
		this.B_i &&
			TimerSystem_1.TimerSystem.Has(this.B_i) &&
			(TimerSystem_1.TimerSystem.Remove(this.B_i), (this.B_i = void 0));
	}
	$_i() {
		var i;
		this.Z_i(),
			this.G_i ||
				ModelManager_1.ModelManager.InteractionModel.InInteractCd() ||
				(this.GetActive() &&
					this.H_i &&
					this.InteractPawn(this.H_i.ActorIndex) &&
					(AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option"),
					(i = Math.max(this.P_i.length - 1, 0)),
					(this.oTt = Math.min(this.oTt, i))));
	}
	SelectHint(i) {
		let t = -1;
		var e = this.P_i.length - 1;
		(t = i
			? (t = this.oTt - 1) < 0
				? e
				: t
			: (t = this.oTt + 1) > e
				? 0
				: t) < 0 || ((this.U_i = t), this.OZt(this.U_i));
	}
	OZt(i) {
		if (
			i !== this.oTt &&
			!ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
			this.E_i
		) {
			let t = this.E_i.GetLayoutItemByIndex(i);
			(t = t || this.E_i.GetLayoutItemByIndex(0)) &&
				(this.H_i?.SetSelected(!1),
				(this.H_i = t),
				(this.oTt = i),
				(this.U_i = -1),
				this.vui(i),
				this.E_i.SelectGridProxy(i),
				this.xqe.ScrollTo(t.GetRootItem()));
		}
	}
	vui(i) {
		var t;
		this.iui() &&
		((t = ModelManager_1.ModelManager.InteractionModel),
		(i = this.P_i[i]),
		t.CanAutoPickUp(i))
			? this.H_i?.SetLongPressTime(t.AutoLongPressTime)
			: this.H_i?.SetLongPressTime(0);
	}
	lui() {
		var i = ModelManager_1.ModelManager.InteractionModel;
		if (i.IsInShowAutoInteractionGuideCountLimit()) {
			var t = ModelManager_1.ModelManager.PlatformModel.IsMobile();
			if (t) {
				if (i.IsTriggerMobileGuide) return;
			} else if (i.IsTriggerDesktopGuide) return;
			this.x_i <= i.ActiveInteractGuideCount ||
				this.q_i ||
				(t
					? this.Mui().then(
							(i) => {
								i.Refresh("MobileAutoPickUpText");
							},
							() => {},
						)
					: this.Mui().then(
							(i) => {
								i.Refresh("DesktopAutoPickUpText");
							},
							() => {},
						),
				i.SaveAutoInteractionGuideAppearCount(
					i.AutoInteractionGuideAppearCount + 1,
				));
		}
	}
	async Mui() {
		var i = this.GetItem(5);
		return (
			(this.q_i = new InteractionGuide_1.InteractionGuide()),
			await this.q_i.CreateThenShowByResourceIdAsync(
				"UiItem_GuideNPCActScroll",
				i,
				!1,
			),
			this.q_i
		);
	}
	eui() {
		this.q_i &&
			(ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? this.q_i.Refresh("MobileAutoPickUpText")
				: this.q_i.Refresh("DesktopAutoPickUpText"));
	}
	iui() {
		return 0 < this.x_i;
	}
	GetGuideUiItemAndUiItemForShowEx(i) {
		var t;
		if (2 === i.length && i[0] === GuideConfig_1.GuideConfig.TabTag)
			return (t = this.E_i.GetLayoutItemList()).length <= 0
				? void 0
				: [(t = t[0].GetButtonForGuide()), t];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				i,
			]);
	}
	OnGetLayer() {
		return UiLayerType_1.ELayerType.Normal;
	}
}
(exports.InteractionHintView = InteractionHintView).fui = void 0;
