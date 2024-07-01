"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopRootView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotController_1 = require("../../RedDot/RedDotController"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	PayShopTabItem_1 = require("../Common/TabComponent/TabItem/PayShopTabItem"),
	TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	PayShopGoods_1 = require("./PayShopData/PayShopGoods"),
	PayShopDefine_1 = require("./PayShopDefine");
class PayShopRootView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.PayShopId = 1),
			(this.TabComponent = void 0),
			(this.TabViewComponent = void 0),
			(this.TabShopList = []),
			(this.CountDownTextActive = !1),
			(this.CountDownText = void 0),
			(this.UpdateInterval = 0),
			(this.GoodsList = []),
			(this.AllowTick = !1),
			(this.k2i = !1),
			(this.PayShopViewData = void 0),
			(this.F2i = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 11, "PayShop:Root 打开客服反馈"),
					ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
						3,
					);
			}),
			(this.W9t = () => {
				this.CloseMe();
			}),
			(this.fqe = (e, t) => new PayShopTabItem_1.PayShopTabItem()),
			(this.pqe = (e) => {
				e = this.TabShopList[e];
				var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e);
				t = PayShopDefine_1.payShopTabView[t.ShopTabViewType];
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 11, "PayShop:Root 点击切换界面", [
						"ViewName",
						t,
					]),
					this.V2i(e),
					ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdate(
						e,
						!0,
					);
			}),
			(this.yqe = (e) => (
				(e = this.TabShopList[e]),
				(e =
					ModelManager_1.ModelManager.PayShopModel.GetTabInfoByPayShopIdId(e)),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.H2i = (e) => {
				this.j2i(this.TabShopList, 0);
			}),
			(this.W2i = (e, t) => {
				(e = this.TabShopList.indexOf(e)),
					this.TabComponent.SelectToggleByIndex(e);
			}),
			(this.K2i = (e, t, o) => {
				t === this.PayShopId &&
					this.TabViewComponent.GetCurrentTabView().RefreshView?.(o);
			}),
			(this.Q2i = (e) => {
				var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e),
					o =
						((t = PayShopDefine_1.payShopTabView[t.ShopTabViewType]),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Shop", 11, "PayShop:Root 切换界面", [
								"ViewName",
								t,
							]),
						this.TabComponent?.SetTitleIconVisible(!0),
						(this.PayShopId = e),
						this.RefreshCurrency(e),
						this.TabShopList.indexOf(e));
				o = this.TabComponent.GetTabItemByIndex(o);
				this.TabViewComponent.ToggleCallBack(
					e,
					t,
					o,
					this.PayShopViewData?.SwitchId,
				),
					this.UpdateGoodsList(),
					this.S7s(),
					(this.UpdateInterval = 0),
					this.PayShopViewData && (this.PayShopViewData.SwitchId = void 0);
			}),
			(this.X2i = (e, t) => {
				t &&
					((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(
						1,
						() => {
							this.$2i();
						},
					),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("Shop", 11, "PayShop:Root 商品数据不同步,打开弹窗");
			}),
			(this.Y2i = (e) => {
				var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
				t.FunctionMap.set(1, () => {
					this.TabViewComponent.GetCurrentTabView().RefreshView?.(e),
						this.UpdateGoodsList();
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					);
			}),
			(this.xGn = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
				e.FunctionMap.set(1, () => {
					this.CloseMe();
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Shop",
							11,
							"PayShop:Root 商品VersionCode不同步,打开弹窗",
						);
			}),
			(this.J2i = (e) => {
				(e = e.get(this.PayShopId)) &&
					this.TabViewComponent.GetCurrentTabView().RefreshView?.(e);
			});
	}
	OnBeforeCreate() {
		this.PayShopViewData = this.OpenParam;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[6, this.F2i]]);
	}
	OnStart() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.fqe,
			this.pqe,
			this.yqe,
		);
		(this.TabComponent =
			new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
				this.GetItem(0),
				e,
				this.W9t,
			)),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(1),
			)),
			this.z2i(),
			(this.PayShopId = void 0),
			this.GetButton(6).RootUIComp.SetRaycastTarget(!0),
			(this.CountDownText = this.GetText(3)),
			(this.CountDownTextActive = this.GetItem(2).bIsUIActive),
			this.TabComponent.SetTitle(""),
			this.TabComponent.SetTitleIconVisible(!1),
			this.Z2i(),
			this.S7s();
	}
	Z2i() {
		RedDotController_1.RedDotController.BindRedDot(
			"CustomerService",
			this.GetItem(7),
		);
	}
	eFi() {
		RedDotController_1.RedDotController.UnBindGivenUi(
			"CustomerService",
			this.GetItem(7),
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshAllPayShop,
			this.H2i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SwitchPayShopTabItem,
				this.W2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshGoods,
				this.K2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SwitchPayShopView,
				this.Q2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshPayShop,
				this.X2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshGoodsList,
				this.Y2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnLockGoods,
				this.J2i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ShopVersionCodeChange,
				this.xGn,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshAllPayShop,
			this.H2i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SwitchPayShopTabItem,
				this.W2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshGoods,
				this.K2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SwitchPayShopView,
				this.Q2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshPayShop,
				this.X2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshGoodsList,
				this.Y2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnLockGoods,
				this.J2i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ShopVersionCodeChange,
				this.xGn,
			);
	}
	OnAfterShow() {
		this.PayShopId
			? this.TabViewComponent.SetCurrentTabViewState(!0)
			: (this.SelectDefaultPayShop(), this.RefreshCountDownText());
	}
	V2i(e) {
		var t = this.GetItem(5);
		ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()
			? t.SetUIActive(100 === e)
			: t.SetUIActive(!1);
	}
	z2i() {
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(4),
			"FriendMyUid",
			ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(),
		);
	}
	OnAfterHide() {
		this.TabViewComponent.SetCurrentTabViewState(!1);
	}
	OnBeforeDestroy() {
		this.eFi(),
			this.TabComponent &&
				(this.TabComponent.Destroy(), (this.TabComponent = void 0)),
			this.TabViewComponent &&
				(this.TabViewComponent.DestroyTabViewComponent(),
				(this.TabViewComponent = void 0)),
			(this.TabShopList = []);
	}
	async RefreshCurrency(e) {
		(e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e)),
			await this.TabComponent.SetCurrencyItemList(e.Money),
			this.TabComponent.GetCurrencyItemList().forEach((e) => {
				100 === this.PayShopId
					? e.SetButtonActive(!1)
					: e.SetPayShopButtonActive(),
					e.SetToPayShopFunction();
			});
	}
	SelectDefaultPayShop() {
		var e;
		this.PayShopViewData && 0 !== this.PayShopViewData?.ShowShopIdList?.length
			? (this.TabShopList = this.PayShopViewData.ShowShopIdList)
			: ((this.TabShopList = []),
				ModelManager_1.ModelManager.PayShopModel.GetPayShopIdList().forEach(
					(e) => {
						var t =
							ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e);
						PayShopDefine_1.hideInPayShopViewTabType.includes(
							t.ShopTabViewType,
						) || this.TabShopList.push(e);
					},
				)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Shop", 11, "PayShop:Root 页签数据", [
					"TabShopList",
					this.TabShopList,
				]),
			this.PayShopViewData?.PayShopId
				? ((e = this.TabShopList.indexOf(this.PayShopViewData.PayShopId)),
					this.j2i(this.TabShopList, e))
				: this.j2i(this.TabShopList, 0);
	}
	j2i(e, t = 0) {
		const o = e.length;
		this.TabComponent.RefreshTabItemByLength(o, () => {
			for (let t = 0; t < o; t++) {
				var e = this.TabComponent.GetTabItemByIndex(t),
					i = this.TabShopList[t],
					n = e.GetNameTextComponent(),
					a =
						ModelManager_1.ModelManager.PayShopModel.GetTabInfoByPayShopIdId(i);
				e.BindRedDot("PayShopInstance", i),
					LguiUtil_1.LguiUtil.SetLocalTextNew(n, a.TabName);
			}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Shop", 11, "PayShop:Root 选择页签", ["Index", t]),
				this.TabComponent?.SelectToggleByIndex(t);
		});
	}
	$2i() {
		this.TabViewComponent.GetCurrentTabView().RefreshView?.(),
			this.UpdateGoodsList();
		var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(
			this.PayShopId,
		);
		e &&
			e.RemainingTime > TimeUtil_1.TimeUtil.TimeDeviation &&
			(this.UpdateInterval =
				e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND),
			(this.k2i = !1);
	}
	UpdateTime(e) {
		void 0 !== this.UpdateInterval &&
			(0 < this.UpdateInterval
				? (this.UpdateInterval -= e)
				: (this.RefreshCountDownText(),
					(e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(
						this.PayShopId,
					)) &&
						(this.UpdateInterval =
							e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND)));
	}
	S7s() {
		var e = this.GetItem(8),
			t = 4 === this.PayShopId;
		e.SetUIActive(t);
	}
	RefreshCountDownText() {
		var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(
			this.PayShopId,
		);
		void 0 === e
			? ((this.CountDownTextActive = !1),
				this.GetItem(2).SetUIActive(!1),
				(this.UpdateInterval = void 0))
			: void 0 === e.CountDownText
				? ((this.CountDownTextActive = !1),
					this.GetItem(2).SetUIActive(!1),
					void 0 !== this.UpdateInterval &&
						this.UpdateInterval <= 0 &&
						!this.k2i &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Shop", 28, "发送协议请求商店"),
						ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdate(
							this.PayShopId,
							!1,
						),
						(this.k2i = !0)),
					(this.UpdateInterval = void 0))
				: (this.CountDownTextActive ||
						(this.GetItem(2).SetUIActive(!0), (this.CountDownTextActive = !0)),
					(e = ModelManager_1.ModelManager.PayShopModel.GetPayShopUpdateTime(
						this.PayShopId,
					)),
					(e = PayShopGoods_1.PayShopGoods.GetEndTimeShowText(e)),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.CountDownText,
						"RefreshTime",
						e,
					));
	}
	UpdateGoodsList() {
		(this.GoodsList =
			ModelManager_1.ModelManager.PayShopModel.GetNeedCheckGoods(
				this.PayShopId,
			)),
			(this.AllowTick = !0);
	}
	TickGoodList() {
		if (this.AllowTick)
			if (!this.GoodsList || this.GoodsList.length <= 0) this.AllowTick = !1;
			else {
				var e = [];
				for (const t of this.GoodsList)
					t.NeedUpdate() && e.push(t.GetGoodsId());
				e.length <= 0 ||
					((this.AllowTick = !1),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Shop", 28, "请求刷新商品", ["goodsList", e]),
					ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopItemUpdate(
						e,
					));
			}
	}
	OnTick(e) {
		super.OnTick(e), this.TickGoodList(), this.UpdateTime(e);
	}
}
exports.PayShopRootView = PayShopRootView;
