"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PowerDefines_1 = require("./PowerDefines");
class PowerModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Cce = 0),
			(this.gio = 0),
			(this.pio = 0),
			(this.G6s = 0),
			(this.vio = !1),
			(this.Mio = 0),
			(this.Sio = 0),
			(this.Eio = 0),
			(this.InnerConfirmBoxData = void 0),
			(this.yio = 0);
	}
	get NeedUpdateCountDown() {
		return this.vio;
	}
	get RestTime() {
		return this.Mio;
	}
	get PowerCount() {
		return this.Eio;
	}
	get ConfirmBoxData() {
		return this.InnerConfirmBoxData;
	}
	get PowerShopCount() {
		return this.yio;
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return !0;
	}
	UpdatePowerRenewTimer() {
		var e;
		this.vio &&
			((this.Cce = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
			(e = this.pio - this.Cce),
			(this.Mio = e * TimeUtil_1.TimeUtil.Millisecond),
			this.Cce > this.G6s
				? (this.Iio(this.Eio + 1),
					(this.G6s =
						this.Cce +
						ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan() *
							TimeUtil_1.TimeUtil.InverseMillisecond),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("PowerModule", 5, "体力本地自增: " + this.Eio))
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnPowerCountDownChanged,
					));
	}
	RefreshPowerInfos(e, o) {
		this.Iio(o),
			(this.Sio = e * TimeUtil_1.TimeUtil.InverseMillisecond),
			(o =
				ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan() *
				TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.G6s = this.Sio + o),
			(this.gio =
				(ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit() -
					this.Eio) *
				o),
			(this.pio = this.Sio + this.gio);
	}
	CreateConfirmBoxData(e, o) {
		this.InnerConfirmBoxData = new PowerDefines_1.PowerConfirmBoxData(e, o);
	}
	Iio(e) {
		(this.Eio = e),
			this.Eio >=
			ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()
				? (this.vio = !1)
				: (this.vio = !0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPowerChanged);
	}
	AddOnePowerShopCount(e) {
		var o = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds();
		this.yio >= o.size ||
			(o.has(e) &&
				((this.yio += 1), this.yio >= o.size) &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PowerShopReady,
				));
	}
	ResetPowerShopCount() {
		this.yio = 0;
	}
	UpdatePowerItemWhenBuy() {
		for (const o of ConfigManager_1.ConfigManager.PowerConfig
			.PowerItemInfoList) {
			let t = 0;
			o.ItemId <= PowerDefines_1.PowerConst.MaxVirtualItemId
				? (t = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(3))
				: 0 ===
						(t =
							ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								o.ItemId,
							))
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnRemoveItem,
							o.ItemId,
						)
					: t !== o.StackValue &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnRefreshItem,
							o.ItemId,
							!1,
						),
				(o.StackValue = t || 0);
			var e = this.Tio(o.ShopId);
			-1 ===
				e.findIndex((e, t, i) => !e.IsSoldOut() && e.Price.has(o.ItemId)) &&
				((e = e[e.length - 1]),
				(o.RenewValue = e.StackSize ?? 0),
				(o.CostValue = e.GetPrice(o.ItemId)),
				(o.GoodsId = e.Id),
				(o.RemainCount = 0));
		}
	}
	Tio(e) {
		return (e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(e)) &&
			0 !== e.length
			? (e.sort((e, o) => e.Id - o.Id), e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("PowerModule", 50, "体力系统获取商店数据失败"),
				[]);
	}
	UpdatePowerItemWhenGoodUnlock() {
		for (const i of ConfigManager_1.ConfigManager.PowerConfig
			.PowerItemInfoList) {
			var e = this.Tio(i.ShopId),
				o = e.findIndex(
					(e, o, t) =>
						e.IsUnlocked() && !e.IsSoldOut() && e.Price.has(i.ItemId),
				),
				t = e[o];
			t &&
				((i.RenewValue = t.StackSize ?? 0),
				(i.CostValue = t.GetPrice(i.ItemId)),
				(i.GoodsId = t.Id),
				(t = t.BuyLimit < 0 ? t.BuyLimit : e.length - o),
				(i.RemainCount = t));
		}
	}
	IsPowerEnough(e) {
		return !e || this.PowerCount >= e;
	}
	ClearConfirmBoxData() {
		this.InnerConfirmBoxData = void 0;
	}
}
exports.PowerModel = PowerModel;
