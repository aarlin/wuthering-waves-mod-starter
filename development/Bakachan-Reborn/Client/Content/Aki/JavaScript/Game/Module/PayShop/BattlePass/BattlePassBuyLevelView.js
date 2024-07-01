"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassBuyLevelView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class BattlePassBuyLevelView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.bOe = void 0),
			(this.ZNi = void 0),
			(this.WGe = void 0),
			(this.w0t = 0),
			(this.eOi = 0),
			(this.tOi = 0),
			(this.iOi = 0),
			(this.oOi = !1),
			(this.rOi = () => {
				this.CloseMe();
			}),
			(this.nOi = () => {
				ControllerHolder_1.ControllerHolder.BattlePassController.RequestBuyBattlePassLevel(
					this.WGe.GetSelectNumber(),
				),
					this.CloseMe();
			}),
			(this.sOi = () => {
				this.CloseMe();
			}),
			(this.PCi = () => {
				this.CloseMe();
			}),
			(this.rOe = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.KGe = (e) =>
				new LguiUtil_1.TableTextArgNew("Text_BattlePassLevelBuy2_Text", e)),
			(this.QGe = (e) => {
				this.bl(e);
			}),
			(this.aOi = () => {
				0 < this.iOi && (this.hOi(this.iOi).then(this.aOi), (this.iOi = 0));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UITexture],
			[9, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[2, this.rOi],
				[3, this.nOi],
			]);
	}
	OnStart() {
		this.w0t = ModelManager_1.ModelManager.BattlePassModel.BattlePassLevel;
		var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(
				ModelManager_1.ModelManager.BattlePassModel.BattlePassId,
			),
			t =
				((this.eOi = e.ConsumeId),
				ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.eOi));
		(this.tOi = e.ConsumeCount),
			this.SetTextureByPath(t.IconSmall, this.GetTexture(8)),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(9),
				"CurrencyNotEnough",
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name),
			),
			(this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(0),
				this.rOe,
			)),
			(this.ZNi = []);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattlePassMainViewHide,
			this.sOi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattlePassMainViewHide,
			this.sOi,
		);
	}
	OnBeforeShow() {
		var e = this.ChildPopView?.PopItem;
		e &&
			(e.SetCurrencyItemList([this.eOi]),
			(e = e
				.GetCurrencyComponent()
				.GetCurrencyItemList()[0]).SetBeforeButtonFunction(this.PCi),
			e.SetToPayShopFunction()),
			(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
				this.GetItem(5),
			)),
			(e = {
				MaxNumber:
					ModelManager_1.ModelManager.BattlePassModel.GetMaxLevel() - this.w0t,
				GetExchangeTableText: this.KGe,
				ValueChangeFunction: this.QGe,
			});
		this.WGe.Init(e);
	}
	bl(e) {
		var t = this.w0t + e,
			i =
				((e =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(4),
						"Text_BattlePassLevelBuy1_Text",
						t,
					),
					e * this.tOi)),
				this.GetText(6)),
			s =
				(i.SetText(e.toString()),
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					this.eOi,
				));
		i.SetChangeColor(s < e, i.changeColor),
			this.GetButton(3).SetSelfInteractive(e <= s),
			this.GetItem(7).SetUIActive(s < e),
			(this.iOi = t),
			this.oOi || this.aOi();
	}
	async hOi(e) {
		(this.oOi = !0),
			ModelManager_1.ModelManager.BattlePassModel.GetTargetLevelRewardList(
				e,
				this.ZNi,
			),
			await this.bOe.RefreshByDataAsync(this.ZNi),
			8 < this.ZNi.length && this.bOe?.ScrollToLeft(0),
			(this.oOi = !1);
	}
	OnDestroy() {
		(this.iOi = 0),
			(this.bOe = void 0),
			(this.ZNi.length = 0),
			(this.ZNi = void 0),
			this.WGe.Destroy(),
			(this.WGe = void 0);
	}
}
exports.BattlePassBuyLevelView = BattlePassBuyLevelView;
