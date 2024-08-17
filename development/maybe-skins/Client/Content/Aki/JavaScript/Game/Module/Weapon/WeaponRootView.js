"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponRootView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	WeaponTabItem_1 = require("../Common/TabComponent/TabItem/WeaponTabItem"),
	TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	WeaponController_1 = require("./WeaponController");
class WeaponRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TabViewComponent = void 0),
			(this.TabComponent = void 0),
			(this.TabDataList = []),
			(this.ANo = 0),
			(this.Nki = void 0),
			(this.Oki = void 0),
			(this.dVe = (e) => new WeaponTabItem_1.WeaponTabItem()),
			(this.pqe = (e) => {
				var n = this.TabDataList[e],
					a = n.ChildViewName;
				e = this.TabComponent.GetTabItemByIndex(e);
				this.TabViewComponent.ToggleCallBack(n, a, e, this.ANo);
			}),
			(this.yqe = (e) => (
				(e = this.TabDataList[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.wOo = () => {
				this.UpdateDynamicTabComponent();
			}),
			(this._9i = (e) => {
				"WeaponRootView" === e.ViewName &&
					this.Nki &&
					this.Oki &&
					WeaponController_1.WeaponController.OnSelectedWeaponChange(
						ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
							this.ANo,
						),
						this.Nki,
						this.Oki,
					);
			}),
			(this.W9t = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnBeforeCreate() {
		var e = this.OpenParam;
		e
			? ((this.ANo = e.WeaponIncId),
				(this.Nki = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
				(this.Oki =
					UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Weapon", 44, "进入武器培养界面未传参");
	}
	async OnBeforeStartAsync() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.pqe,
			this.yqe,
		);
		(this.TabComponent =
			new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
				this.GetItem(0),
				e,
				this.W9t,
			)),
			await this.TabComponent.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(1),
			));
	}
	OnHandleLoadScene() {
		this.Nki ||
			(this.Nki = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
			this.Oki ||
				(this.Oki =
					UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
	}
	OnBeforeShow() {
		this.UpdateDynamicTabComponent(),
			UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() ||
				WeaponController_1.WeaponController.OnSelectedWeaponChange(
					ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						this.ANo,
					),
					this.Nki,
					this.Oki,
				);
	}
	OnAfterShow() {
		ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WeaponCanGoBreach,
			this.wOo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this._9i,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WeaponCanGoBreach,
			this.wOo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
				this._9i,
			);
	}
	OnBeforePlayCloseSequence() {
		this.BOo();
	}
	OnHandleReleaseScene() {
		this.BOo();
	}
	BOo() {
		this.Nki &&
			(UiSceneManager_1.UiSceneManager.HideObserver(
				this.Nki,
				"ShowHideWeaponEffect",
			),
			UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.Nki),
			(this.Nki = void 0)),
			this.Oki &&
				(UiSceneManager_1.UiSceneManager.HideObserver(
					this.Oki,
					"ShowHideWeaponEffect",
				),
				UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.Nki),
				(this.Oki = void 0));
	}
	OnBeforeDestroy() {
		var e = this.OpenParam;
		e &&
			e.IsFromRoleRootView &&
			UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor() &&
			WeaponController_1.WeaponController.RoleFadeOut(
				UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
			),
			this.TabComponent &&
				(this.TabComponent.Destroy(), (this.TabComponent = void 0)),
			(this.TabDataList = []),
			this.TabViewComponent &&
				(this.TabViewComponent.DestroyTabViewComponent(),
				(this.TabViewComponent = void 0));
	}
	UpdateDynamicTabComponent() {
		this.TabDataList = this.GetWeaponTabList();
		const e = this.TabComponent.GetSelectedIndex();
		this.TabComponent.RefreshTabItemByLength(this.TabDataList.length, () => {
			var n = 0 < e ? e : 0;
			this.TabComponent.SelectToggleByIndex(n);
		});
	}
	GetWeaponTabList() {
		var e = [],
			n =
				ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
					"WeaponRootView",
				),
			a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			).CanGoBreach();
		for (const t of n)
			("WeaponBreachView" === t.ChildViewName && !a) ||
				("WeaponLevelUpView" === t.ChildViewName && a) ||
				e.push(t);
		return e;
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 === e.length) {
			if (!this.TabComponent) return;
			if (!this.TabComponent.GetTabComponent().GetLayout())
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						54,
						"角色界面聚焦引导的额外参数配置有误, 找不到Layout",
						["configParams", e],
					)
				);
			const n = Number(e[0]);
			if (
				(e = this.TabComponent.GetTabItemByIndex(
					this.TabDataList.findIndex((e) => e.Id === n),
				).GetRootItem())
			)
				return [e, e];
		}
	}
}
exports.WeaponRootView = WeaponRootView;
