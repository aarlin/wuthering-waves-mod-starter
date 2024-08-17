"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionIntensifyView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
	VisionTabItem_1 = require("../../../Common/TabComponent/TabItem/VisionTabItem"),
	TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent"),
	HelpController_1 = require("../../../Help/HelpController"),
	ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	CANNOTLEVELSUBQUALITY = 2,
	VISION_INTENSIFY_HELPID = 32;
class VisionIntensifyView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TabComponent = void 0),
			(this.TabViewComponent = void 0),
			(this.upt = []),
			(this.lHi = 0),
			(this._Hi = !1),
			(this.i7i = void 0),
			(this.uHi = (e) => {
				this.TabComponent.SetCloseBtnShowState(e);
			}),
			(this.cHi = () => {
				this.TabComponent.SelectToggleByIndex(1);
			}),
			(this.mHi = () => {
				var e, t;
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					this.lHi,
				).GetQuality() > 2 &&
					(e = this.TabComponent.GetTabItemByIndex(1)) &&
					((t = this.dHi()), e.SetToggleStateForce(t ? 0 : 2, !1));
			}),
			(this.CanToggleChange = (e) =>
				1 !== e ||
				((e = this.dHi()) ||
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"VisionIdentifyLock",
					),
				e)),
			(this.dVe = (e, t) => new VisionTabItem_1.VisionTabItem()),
			(this.SetOnUndeterminedClick = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"VisionIdentifyLock",
				);
			}),
			(this.pqe = (e) => {
				var t = this.upt[e],
					n = t.ChildViewName,
					i =
						((e = this.TabComponent.GetTabItemByIndex(e)),
						this.TabViewComponent.GetCurrentTabView());
				i && i.HideUiTabView(!1),
					this.TabViewComponent.ToggleCallBack(t, n, e, this.lHi),
					this.TabComponent.SetHelpButtonCallBack(this.CHi);
			}),
			(this.CHi = () => {
				HelpController_1.HelpController.OpenHelpById(32);
			}),
			(this.yqe = (e) => (
				(e = this.upt[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.CloseClick = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.pqe,
			this.yqe,
		);
		(e =
			((this.TabComponent =
				new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
					this.GetItem(0),
					e,
					this.CloseClick,
				)),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(1),
			)),
			new Array())).push(ItemDefines_1.EItemId.Gold),
			this.TabComponent.SetCurrencyItemList(e),
			this.TabComponent.SetHelpButtonShowState(!0),
			this.TabComponent.SetCanChange(this.CanToggleChange),
			this.GetItem(2).SetUIActive(!1);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState,
			this.uHi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomLevelUp,
				this.mHi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
				this.cHi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState,
			this.uHi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomLevelUp,
				this.mHi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
				this.cHi,
			);
	}
	dHi() {
		var e,
			t = (e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					this.lHi,
				)).GetSubPropUnlockLevel(0);
		return (
			(e = e.GetPhantomLevel() >= t) &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.VisionIntensifyTabOpen,
				),
			e
		);
	}
	OnBeforePlayCloseSequence() {
		var e = this.TabViewComponent.GetCurrentTabView();
		e &&
			new UiSequencePlayer_1.UiSequencePlayer(e.GetRootItem()).PlaySequence(
				"Close",
			);
	}
	OnHandleLoadScene() {
		var e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.lHi,
			);
		e &&
			ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
				e.GetConfigId(),
				void 0,
				this.i7i,
			);
	}
	OnBeforeShow() {
		var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
				this.Info.Name,
			),
			t =
				(e.forEach((e) => {
					this.upt.push(e);
				}),
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					this.lHi,
				)),
			n = ModelManager_1.ModelManager.FunctionModel.IsOpen(10001004);
		let i = 0;
		(i = t.GetQuality() <= 2 || !n ? 1 : e.length),
			this.TabComponent.RefreshTabItemByLength(i, () => {
				var e, t, n;
				for ([e, t] of this.TabComponent.GetTabItemMap())
					1 === e &&
						((n = this.dHi()),
						t.SetToggleStateForce(n ? 0 : 2, !1),
						t.SetCanClickWhenDisable(!0),
						t.SetOnUndeterminedClick(this.SetOnUndeterminedClick));
				this.TabComponent.SelectToggleByIndex(0, !0),
					this.TabViewComponent.SetCurrentTabViewState(!0),
					this.x6e(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint,
						this.lHi,
					);
			});
	}
	x6e() {
		var e = this.upt.findIndex((e) => "VisionIdentifyView" === e.ChildViewName);
		0 < e &&
			(e = this.TabComponent.GetTabItemByIndex(e)) &&
			e.BindRedDot("IdentifyTab", this.lHi);
	}
	Dpt() {
		var e = this.upt.findIndex((e) => "VisionIdentifyView" === e.ChildViewName);
		0 < e && (e = this.TabComponent.GetTabItemByIndex(e)) && e.UnBindRedDot();
	}
	OnBeforeHide() {
		this.Dpt();
	}
	OnAfterHide() {
		var e = this.TabViewComponent.GetCurrentTabView();
		e && e.HideUiTabView(!1);
	}
	OnBeforeCreate() {
		(this.lHi = this.OpenParam),
			UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
				(UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
				(this._Hi = !0)),
			(this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
	}
	OnBeforeDestroy() {
		this.TabViewComponent.DestroyTabViewComponent(),
			this.TabComponent.Destroy(),
			this._Hi &&
				(UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
				(this.i7i = void 0));
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		const t = Number(e[0]);
		var n = this.TabComponent.GetTabItemByIndex(
			this.upt.findIndex((e) => e.Id === t),
		).GetRootItem();
		if (n) return [n, n];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
}
exports.VisionIntensifyView = VisionIntensifyView;
