"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonthCardView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
	UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
	HelpController_1 = require("../../Help/HelpController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PayShopDefine_1 = require("../PayShopDefine"),
	MONTH_CARD_HELP_ID = 9;
class MonthCardView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.zki = void 0),
			(this.Zki = void 0),
			(this.e2i = void 0),
			(this.t2i = !1),
			(this.YOi = () => {
				this.i2i();
			}),
			(this.YZe = () => {
				HelpController_1.HelpController.OpenHelpById(9);
			}),
			(this.o2i = () => {
				var e;
				this.t2i &&
					((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
						PayShopDefine_1.MONTH_CARD_SHOP_ID,
					)),
					ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
						e.GetGoodsData().Id,
					));
			}),
			(this.r2i = () => {
				this.n2i(), this.s2i();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.YZe]]);
	}
	async OnBeforeStartAsync() {
		await ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync(),
			await ControllerHolder_1.ControllerHolder.MonthCardController.RequestMonthCardData(),
			(this.Zki = new GetItemPanel()),
			await this.Zki.CreateByActorAsync(this.GetItem(5).GetOwner()),
			this.AddChild(this.Zki),
			(this.e2i = new GetItemPanel()),
			await this.e2i.CreateByActorAsync(this.GetItem(6).GetOwner()),
			this.AddChild(this.e2i);
	}
	OnStart() {
		var e = new Array(),
			t = PayShopDefine_1.MONTH_CARD_SHOP_ID;
		(t =
			ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
				t,
			).GetGetPayGiftData().ProductId),
			e.push(t.toString()),
			ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
				e,
			),
			(this.zki = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4))),
			this.zki.BindCallback(this.o2i),
			(t = ModelManager_1.ModelManager.MonthCardModel.LocalOnceReward),
			(e = ModelManager_1.ModelManager.MonthCardModel.LocalDailyReward);
		this.Zki.Refresh(t[0].ItemId, t[1]),
			this.e2i.Refresh(e[0].ItemId, e[1]),
			this.r2i(),
			this.i2i(),
			this.GetText(9).ShowTextNew("MonthCardDes_1"),
			(
				this.GetTabBehavior(
					UiTabSequence_1.UiTabSequence,
				)?.GetLevelSequencePlayer()
			).PlayLevelSequenceByName("Loop");
	}
	i2i() {
		var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
			PayShopDefine_1.MONTH_CARD_SHOP_ID,
		);
		this.GetText(3).SetText(e.GetDirectPriceText());
	}
	OnBeforeDestroy() {
		this.zki?.Destroy(), (this.zki = void 0);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
			this.r2i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
			this.r2i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	OnAfterShow() {
		(
			this.GetTabBehavior(
				UiTabSequence_1.UiTabSequence,
			)?.GetLevelSequencePlayer()
		).PlayLevelSequenceByName("Start"),
			ModelManager_1.ModelManager.MonthCardModel.RefreshNextShowPayButtonRedDotTime();
	}
	n2i() {
		var e = 0 <= ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
		this.GetItem(0).SetUIActive(e),
			this.GetText(1).SetUIActive(e),
			e &&
				this.GetText(1)?.SetText(
					ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText("ec7172"),
				);
	}
	s2i() {
		var e = ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit(),
			t = this.GetItem(8),
			i = this.GetItem(7);
		e
			? ((this.t2i = !0),
				this.zki.RefreshEnable(!0),
				this.zki.SetActive(!0),
				i.SetUIActive(!0),
				t.SetUIActive(!1))
			: ((this.t2i = !1),
				this.zki.RefreshEnable(!1),
				this.zki.SetActive(!1),
				i.SetUIActive(!1),
				t.SetUIActive(!0));
	}
}
exports.MonthCardView = MonthCardView;
class GetItemPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.gIt = 0),
			(this.a2i = () => {
				0 !== this.gIt &&
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						this.gIt,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.a2i]]);
	}
	OnStart() {
		this.GetTexture(1).SetUIActive(!1);
	}
	Refresh(e, t) {
		this.gIt = e;
		const i = this.GetTexture(1);
		this.SetItemIcon(i, e, void 0, () => {
			i.SetUIActive(!0);
		}),
			(e = this.GetText(2)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				e,
				"Text_RoleCount_Text",
				t.toString(),
			);
	}
}
