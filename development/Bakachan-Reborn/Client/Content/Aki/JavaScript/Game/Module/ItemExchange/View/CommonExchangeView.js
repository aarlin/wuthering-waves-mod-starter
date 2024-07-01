"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonExchangeView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
	NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ItemExchangeDefine_1 = require("../ItemExchangeDefine");
class CommonExchangeView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.WGe = void 0),
			(this.dbt = void 0),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"ExChangeCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.QGe = (e) => {
				this.bl(e);
			}),
			(this.PCi = () => {
				this.CloseMe();
			}),
			(this.SetMaxValue = () => {
				this.WGe.SelectMax();
			}),
			(this.m6t = () => {
				var e,
					t = this.xCi();
				t?.ConfirmCallBack &&
					((e = this.WGe.GetSelectNumber()),
					t?.ConfirmCallBack(t.GetDestItemId(), e)),
					t.ConfirmNoClose || this.CloseMe();
			}),
			(this.wCi = () => {
				var e = this.xCi()?.CancelCallBack;
				e && e(), this.CloseMe();
			});
	}
	xCi() {
		return this.OpenParam;
	}
	BCi() {
		return this.xCi().GetDestItemId();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIText],
			[6, UE.UIText],
			[5, UE.UITexture],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIInteractionGroup],
			[10, UE.UIInteractionGroup],
			[11, UE.UIText],
			[12, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[7, this.wCi],
				[8, this.m6t],
			]);
	}
	async OnBeforeStartAsync() {
		this.xCi().ShowPayGold &&
			((this.dbt = new CommonCurrencyItem_1.CommonCurrencyItem()),
			await this.dbt.CreateThenShowByResourceIdAsync(
				"UIItem_CommonCurrencyItem",
			));
	}
	OnStart() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.wCi);
		var e = this.xCi();
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(0),
			ItemExchangeDefine_1.EXCHANGE_TITLE,
			e.GetDestName(),
		),
			this.SetItemIcon(this.GetTexture(1), e.GetSrcItemId()),
			this.SetItemIcon(this.GetTexture(2), e.GetDestItemId()),
			this.SetItemIcon(this.GetTexture(5), e.GetSrcItemId()),
			this.rNe(),
			this.bCi();
	}
	OnBeforeShow() {
		var e;
		this.xCi().ShowPayGold &&
			(this.dbt
				?.GetRootItem()
				.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent()),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
				ItemDefines_1.EItemId.PayGold,
			)),
			this.dbt.RefreshTemp(ItemDefines_1.EItemId.PayGold, e.toString()),
			this.dbt.SetPayShopButtonActive(),
			this.dbt.SetBeforeButtonFunction(this.PCi),
			this.dbt.SetToPayShopFunction());
	}
	rNe() {
		(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
			this.GetItem(13),
		)),
			this.WGe.SetLimitMaxValueForce(ItemExchangeDefine_1.EXCHANGE_MAX_COUNT);
		var e = ModelManager_1.ModelManager.ItemExchangeModel.GetMaxExChangeTime(
				this.BCi(),
			),
			t = {
				MaxNumber: e,
				GetExchangeTableText: this.KGe,
				ValueChangeFunction: this.QGe,
			};
		this.WGe.Init(t),
			this.WGe.SetMaxBtnShowState(!0),
			this.WGe.SetAddReduceButtonActive(!0),
			this.WGe.SetAddReduceButtonInteractive(1 < e);
	}
	bCi() {
		var e = ModelManager_1.ModelManager.ItemExchangeModel.GetMaxExChangeTime(
			this.BCi(),
		);
		this.GetInteractionGroup(10).SetInteractable(0 < e);
	}
	bl(e) {
		var t = this.xCi(),
			i = this.BCi(),
			n =
				((i = ModelManager_1.ModelManager.ItemExchangeModel.GetCurExchangeInfo(
					i,
					e,
				)),
				(t =
					(this.GetText(3).SetText(t.GetSrcName()),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(11),
						ItemExchangeDefine_1.EXCHANGE_COUNT_DESCRIBE2,
						i.ConsumeCount,
					),
					this.GetText(4).SetText(t.GetDestName()),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(12),
						ItemExchangeDefine_1.EXCHANGE_COUNT_DESCRIBE2,
						i.GainCount,
					),
					this.GetText(6))),
				this.xCi().GetSrcItemId());
		(i = i.ConsumeCount * e),
			t.SetText(i.toString()),
			(e =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n));
		t.SetChangeColor(e < i, t.changeColor), this.GetItem(14).SetUIActive(e < i);
	}
}
exports.CommonExchangeView = CommonExchangeView;
