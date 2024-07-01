"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaButton = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GachaController_1 = require("../GachaController"),
	GachaDefine_1 = require("../GachaDefine"),
	CLICKCD = 1e3;
class GachaButton extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.oHt = void 0),
			(this.Times = 0),
			(this.rHt = 0),
			(this.nHt = 0),
			(this.sHt = () => {
				var e = this.oHt.GachaInfo;
				if (e)
					if (0 === e.UsePoolId)
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"GachaNoOption",
						);
					else {
						if (0 !== this.nHt && Time_1.Time.Now - this.nHt <= 1e3) return;
						this.nHt = Time_1.Time.Now;
						var o = ModelManager_1.ModelManager.GachaModel.CheckCountIsEnough(
							e,
							this.Times,
						);
						if (o[0]) {
							var t =
								ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
									e.ItemId,
								);
							if (5 === e.Id && t <= 0)
								(n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(195)),
									ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
										n,
									);
							else {
								var n = this.rHt - t;
								if (n <= 0)
									GachaController_1.GachaController.GachaRequest(
										e.Id,
										this.Times,
									),
										Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug("Gacha", 35, "needTokenCount <= 0");
								else {
									const o =
										ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
											e.ItemId,
											n,
											0,
											!0,
										);
									if (o) {
										const r = new CommonExchangeData_1.CommonExchangeData();
										r.InitByItemId(e.ItemId),
											ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
												? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
														166,
													)).SetTextArgs(r.GetDestName()),
													ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
														t,
													))
												: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
														61,
													)).SetTextArgs(
														n.toString(),
														r.GetDestName(),
														o.ConsumeCount.toString(),
														r.GetSrcName(),
													),
													e.FunctionMap.set(2, () => {
														this.aHt(r, o.ExChangeTime, o.ConsumeCount);
													}),
													ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
														e,
													));
									} else
										Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug(
												"Gacha",
												35,
												"exchangeSimulation is null",
											);
								}
							}
						} else
							(t = o[1]),
								(n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t)),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									n,
								);
					}
				else
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Gacha", 35, "gachaInfo is null");
			}),
			(this.Times = e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.sHt]]);
	}
	aHt(e, o, t) {
		var n = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
			e.GetSrcItemId(),
		);
		if (t <= n)
			ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
				e.GetDestItemId(),
				o,
				!1,
				(t, n) => {
					var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
						e.GetDestItemId(),
					);
					o <= r &&
						GachaController_1.GachaController.GachaRequest(
							this.oHt.GachaInfo.Id,
							this.Times,
						);
				},
			);
		else {
			const o = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
				e.GetSrcItemId(),
				t - n,
				0,
				!0,
			);
			if (o) {
				const n = new CommonExchangeData_1.CommonExchangeData();
				n.InitByItemId(e.GetSrcItemId()),
					(t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(62)).SetTextArgs(
						n.GetDestName(),
						n.GetSrcName(),
						n.GetDestName(),
					),
					t.FunctionMap.set(2, () => {
						this.hHt(n, o.ExChangeTime, o.ConsumeCount);
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					);
			}
		}
	}
	hHt(e, o, t) {
		t <=
		ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
			e.GetSrcItemId(),
		)
			? ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
					e.GetDestItemId(),
					o,
					!0,
				)
			: ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm();
	}
	Refresh(e, o) {
		(this.oHt = e), (this.rHt = o);
		o = e.GachaInfo;
		for (const e of o.GachaConsumes)
			if (e.fRs === this.Times) {
				this.rHt = e.vRs;
				break;
			}
		ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(o.ItemId) &&
			(this.SetItemIcon(this.GetTexture(1), o.ItemId),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				"Text_GachaExChangeCountDescribe_Text",
				this.rHt,
			),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(3),
				GachaDefine_1.GACHA_TEXT,
				this.Times.toString(),
			),
			(o = e.PoolInfo.Id),
			1 === (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(o))
				? ((o =
						ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(
							e,
						)),
					this.GetItem(4).SetUIActive(!0),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), o.TagText),
					(e = UE.Color.FromHex(o.TagColor)),
					this.GetSprite(6).SetColor(e))
				: this.GetItem(4).SetUIActive(!1));
	}
}
exports.GachaButton = GachaButton;
