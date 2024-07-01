"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassPayView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	BattlePassController_1 = require("./BattlePassController");
class BattlePassPayView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.KOi = void 0),
			(this.QOi = void 0),
			(this.XOi = void 0),
			(this.$Oi = void 0),
			(this.MOi = 0),
			(this.TDe = void 0),
			(this.YOi = () => {
				this.JOi();
			}),
			(this.DSi = () => {
				this.CloseMe();
			}),
			(this.zOi = () => {
				BattlePassController_1.BattlePassController.PayPrimaryBattlePass();
			}),
			(this.ZOi = () => {
				BattlePassController_1.BattlePassController.PayHighBattlePass();
			}),
			(this.eki = () => {
				var e = {
					WeaponDataList:
						ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
					SelectedIndex: 0,
					WeaponObservers: this.OpenParam,
				};
				UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
			}),
			(this.rOe = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.RefreshLeftTime = () => {
				var e = TimeUtil_1.TimeUtil.GetServerTime();
				(e = this.MOi - e) < 0 ||
					((e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(7),
						"Text_GachaRemainingTime_Text",
						e.CountDownText,
					));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIGridLayout],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIGridLayout],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.zOi],
				[6, this.ZOi],
				[0, this.DSi],
				[8, this.eki],
			]);
	}
	async OnBeforeStartAsync() {
		await ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
			this.DSi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
			this.DSi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	OnStart() {
		(this.XOi = []),
			(this.$Oi = []),
			ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(
				1,
				this.XOi,
			),
			ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(
				3,
				this.$Oi,
			),
			(this.KOi = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(1),
				this.rOe,
			)),
			(this.QOi = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(4),
				this.rOe,
			)),
			this.KOi.RefreshByData(this.XOi),
			this.QOi.RefreshByData(this.$Oi),
			(this.MOi =
				ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime()),
			(this.TDe = TimerSystem_1.TimerSystem.Forever(
				this.RefreshLeftTime,
				CommonDefine_1.MILLIONSECOND_PER_SECOND,
			)),
			this.RefreshLeftTime(),
			this.JOi();
		const e = new Array();
		this.tki().forEach((t) => {
			(t = ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(t)),
				e.push(t.ProductId.toString());
		}),
			ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
				e,
			);
	}
	tki() {
		return [
			ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId(),
			ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId(),
			ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId(),
		];
	}
	OnBeforeDestroy() {
		(this.XOi.length = 0),
			(this.XOi = void 0),
			(this.$Oi.length = 0),
			(this.$Oi = void 0),
			(this.KOi = void 0),
			(this.QOi = void 0),
			this.TDe.Remove(),
			(this.TDe = void 0);
	}
	JOi() {
		var e,
			t = ModelManager_1.ModelManager.BattlePassModel.PayType;
		this.GetItem(9).SetUIActive(t === Protocol_1.Aki.Protocol.B2s.Proto_NoPaid),
			this.GetItem(11).SetUIActive(
				t !== Protocol_1.Aki.Protocol.B2s.Proto_NoPaid,
			),
			this.GetItem(10).SetUIActive(
				t !== Protocol_1.Aki.Protocol.B2s.Proto_Advanced,
			),
			this.GetItem(12).SetUIActive(
				t === Protocol_1.Aki.Protocol.B2s.Proto_Advanced,
			),
			t === Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
				? ((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
						ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId(),
					)?.GetDirectPriceText()),
					this.GetText(2).SetText(e ?? ""),
					(e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
						ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId(),
					)?.GetDirectPriceText()),
					this.GetText(5).SetText(e ?? ""))
				: t === Protocol_1.Aki.Protocol.B2s.Proto_Paid &&
					((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
						ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId(),
					)?.GetDirectPriceText()),
					this.GetText(5).SetText(e ?? ""));
	}
}
exports.BattlePassPayView = BattlePassPayView;
