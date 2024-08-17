"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	CommonCurrencyItem_1 = require("../Common/CommonCurrencyItem"),
	MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView"),
	PowerController_1 = require("./PowerController"),
	COUN_NOT_ENOUGH_COLOR = "9D2437FF";
class PowerView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Lio = void 0),
			(this.Dio = void 0),
			(this.Rio = void 0),
			(this.Uio = void 0),
			(this.hio = void 0),
			(this.Aio = 0),
			(this.Pio = 0),
			(this.xio = 0),
			(this.dbt = void 0),
			(this.wio = void 0),
			(this.N2t = void 0),
			(this.Bio = -1),
			(this.bio = () => {
				ModelManager_1.ModelManager.PowerModel.NeedUpdateCountDown
					? (this.GetItem(14).SetUIActive(!0),
						this.GetItem(18).SetUIActive(!1),
						this.P$t())
					: (this.GetItem(14).bIsUIActive && this.GetItem(14).SetUIActive(!1),
						this.GetItem(18).SetUIActive(!0));
			}),
			(this.PUt = () => {
				this.CloseMe();
			}),
			(this.xUt = () => {
				1 === this.Rio.Type
					? (this.CloseMe(), PowerController_1.PowerController.OpenPowerView())
					: 2 === this.Rio.Type
						? 0 === this.Uio.RemainCount
							? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"PowerRamainCountFail",
								)
							: ModelManager_1.ModelManager.PowerModel.PowerCount +
										this.Uio.RenewValue >
									this.xio
								? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"PowerBound",
									)
								: this.Uio.CostValue > this.Uio.StackValue
									? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"PowerCashFail",
										)
									: PowerController_1.PowerController.ExchangePower(this.Uio, 1)
						: this.CloseMe();
			}),
			(this.qio = (e) => {
				var t = e.Data;
				e = e.MediumItemGrid;
				this.N2t?.SetSelected(!1), (this.N2t = e), (this.Uio = t), this.Gio(t);
			}),
			(this.Cbt = () => {
				this.dbt.SetActive(!0),
					this.dbt.SetCountText(
						"ItemShow",
						ModelManager_1.ModelManager.PowerModel.PowerCount,
						this.Pio,
					);
				var e = ModelManager_1.ModelManager.PowerModel.PowerCount / this.Pio;
				this.GetSlider(17).SetValue(e),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"PowerModule",
							50,
							`补充时打印体力${ModelManager_1.ModelManager.PowerModel.PowerCount}/` +
								this.Pio,
						),
					this.bio();
			}),
			(this.Nio = () => {
				this.Dio?.SetBottomText(
					ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
						ItemDefines_1.EItemId.BlackCard,
					).toString(),
				);
			}),
			(this.xmi = (e, t) => {
				e &&
					t &&
					(this.Lio &&
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"PowerBuySucceed",
							this.Uio.RenewValue,
						),
					ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
					ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock(),
					this.Oio());
			}),
			(this.kio = () => {
				ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock(),
					this.Oio();
			}),
			(this.Mni = (e, t, i) => {
				if (this.Fio(e)) return { Key: i, Value: void 0 };
				-1 === this.Bio && (this.Bio = i);
				var o = new MediumItemGrid_1.MediumItemGrid();
				o.Initialize(t.GetOwner()),
					(t = {
						Data: e,
						Type: 4,
						ItemConfigId: e.ItemId,
						BottomText: e.StackValue.toString(),
					});
				return (
					o.Apply(t),
					o.BindOnExtendToggleClicked(this.qio),
					e.CostValue > e.StackValue && o.SetBottomTextColor("9D2437FF"),
					e.ItemId === ItemDefines_1.EItemId.BlackCard && (this.Dio = o),
					{ Key: i, Value: o }
				);
			});
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPowerChanged,
			this.Cbt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BoughtItem,
				this.xmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGoodUnlock,
				this.kio,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPowerCountDownChanged,
				this.bio,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.Nio,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPowerChanged,
			this.Cbt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BoughtItem,
				this.xmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGoodUnlock,
				this.kio,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPowerCountDownChanged,
				this.bio,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.Nio,
			);
	}
	async OnBeforeStartAsync() {}
	OnStart() {
		this.GetItem(14).SetUIActive(!1),
			PowerController_1.PowerController.SendUpdatePowerRequest(),
			(this.Aio =
				ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan()),
			(this.Pio =
				ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
			(this.xio =
				ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()),
			(this.Rio = ModelManager_1.ModelManager.PowerModel.ConfirmBoxData),
			this.Vio(),
			(this.Lio = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(7),
				this.Mni,
			)),
			(this.hio = ConfigManager_1.ConfigManager.PowerConfig.PowerItemInfoList),
			ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
			ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock(),
			this.Lio.RefreshByData(this.hio),
			(this.Uio = this.hio[this.Bio]),
			(this.N2t = this.Lio.GetScrollItemList()[this.Bio]),
			this.N2t.SetSelected(!0),
			this.Gio(this.Uio);
	}
	OnBeforeDestroy() {
		this.Lio && (this.Lio.ClearChildren(), (this.Lio = void 0)),
			ModelManager_1.ModelManager.PowerModel.ClearConfirmBoxData(),
			this.dbt.Destroy();
	}
	OnBeforeShow() {
		this.dbt ||
			((this.dbt = new CommonCurrencyItem_1.CommonCurrencyItem()),
			this.dbt
				.CreateThenShowByResourceIdAsync(
					"UIItem_CommonCurrencyItem",
					this.ChildPopView?.PopItem?.GetCostParent(),
				)
				.finally(() => {
					this.dbt.ShowWithoutText(ItemDefines_1.EItemId.Power),
						this.dbt.SetButtonActive(!1);
					var e = ModelManager_1.ModelManager.PowerModel.PowerCount;
					this.dbt.RefreshTemp(ItemDefines_1.EItemId.Power, e + "/" + this.Pio);
				})),
			this.wio ||
				((this.wio = new CommonCurrencyItem_1.CommonCurrencyItem()),
				this.wio
					.CreateThenShowByResourceIdAsync(
						"UIItem_CommonCurrencyItem",
						this.ChildPopView?.PopItem?.GetCostParent(),
					)
					.finally(() => {
						var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
							ItemDefines_1.EItemId.BlackCard,
						);
						this.wio.RefreshTemp(ItemDefines_1.EItemId.BlackCard, e.toString()),
							this.wio.SetToPayShopFunction();
					}));
	}
	P$t() {
		var e = ModelManager_1.ModelManager.PowerModel.RestTime,
			t = e / TimeUtil_1.TimeUtil.Hour,
			i = (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
			o = e % TimeUtil_1.TimeUtil.Minute,
			n = (t = Math.trunc(t)) < 10 ? "0" : "",
			r = (i = Math.trunc(i)) < 10 ? "0" : "",
			l = (o = Math.trunc(o)) < 10 ? "0" : "";
		this.GetText(5).SetText(n + t + `:${r}${i}:` + l + o),
			(n = (e %= this.Aio) / TimeUtil_1.TimeUtil.Minute),
			(t = e % TimeUtil_1.TimeUtil.Minute),
			(r = (n = Math.trunc(n)) < 10 ? "0" : ""),
			(i = (t = Math.trunc(t)) < 10 ? "0" : "");
		this.GetText(4).SetText(r + n + ":" + i + t);
	}
	Vio() {
		switch (this.Rio.Type) {
			case 2:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerTitle"),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "PowerConfirm"),
					this.GetSprite(8).SetUIActive(!1);
				break;
			case 0:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward"),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(13), "PowerRewardCost"),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(3),
						"PowerCostAndReward",
					),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
					this.GetVerticalLayout(11).GetRootComponent().SetUIActive(!1),
					this.GetItem(12).SetUIActive(!0),
					this.GetSprite(8).SetUIActive(!1);
				break;
			case 1:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward"),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(13),
						"PowerRewardCostFail",
					),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(3),
						"PowerCostAndReward",
					),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
					this.GetVerticalLayout(11).GetRootComponent().SetUIActive(!1),
					this.GetItem(12).SetUIActive(!0),
					this.GetSprite(8).SetUIActive(!1);
		}
	}
	Gio(e) {
		this.GetButton(2)
			.GetOwner()
			.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
			.SetInteractable(0 !== e.RemainCount),
			this.GetButton(16).RootUIComp.SetUIActive(0 === e.RemainCount);
		var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.ItemName);
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(10),
			"PowerDescribe",
			e.CostValue,
			t,
			e.RenewValue,
		),
			(t = this.GetText(9));
		e.RemainCount < 0
			? (this.GetSprite(8).SetUIActive(!1), t.SetUIActive(!1))
			: (this.GetSprite(8).SetUIActive(!0),
				t.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(
					t,
					"PowerExchangeRemain",
					e.RemainCount,
				));
	}
	Oio() {
		if (this.Lio) {
			var e = this.hio.length;
			for (let n = 0; n < e; ++n) {
				var t,
					i,
					o = this.hio[n];
				this.Fio(o, n) ||
					((t = this.Lio.GetScrollItemByKey(n)),
					(i = {
						Data: o,
						Type: 4,
						ItemConfigId: o.ItemId,
						BottomText: o.StackValue.toString(),
					}),
					t.Apply(i),
					o.CostValue > o.StackValue && t.SetBottomTextColor("9D2437FF"),
					o.GoodsId === this.Uio.GoodsId && this.Gio(o));
			}
			if ((this.Uio?.StackValue ?? 0) <= 0) {
				let e = !1,
					t = 0;
				for (let i = 0; i < this.hio.length; i++) {
					var n = this.hio[i];
					if (0 < n?.StackValue) {
						this.ylo(i, n), (e = !0);
						break;
					}
					n.ItemId === ItemDefines_1.EItemId.BlackCard && (t = i);
				}
				e || this.ylo(t, this.hio[t]);
			}
		}
	}
	ylo(e, t) {
		this.N2t?.SetSelected(!1),
			(this.N2t = this.Lio.GetScrollItemList()[e]),
			this.N2t.SetSelected(!0),
			(this.Uio = t),
			this.Gio(t);
	}
	Fio(e, t) {
		return (
			!!(e.StackValue <= 0 && e.IsHideWhenZero) &&
			((t = t || this.hio.indexOf(e)),
			this.Lio.GetItemByIndex(t).SetUIActive(!1),
			!0)
		);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIScrollViewWithScrollbarComponent],
			[8, UE.UISprite],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIVerticalLayout],
			[12, UE.UIItem],
			[13, UE.UIText],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIButtonComponent],
			[17, UE.UISliderComponent],
			[18, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.PUt],
				[2, this.xUt],
				[16, this.xUt],
			]);
	}
}
exports.PowerView = PowerView;
