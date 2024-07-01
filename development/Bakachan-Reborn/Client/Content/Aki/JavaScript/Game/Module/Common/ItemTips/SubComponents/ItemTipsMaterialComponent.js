"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsMaterialComponent = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent"),
	ItemTipsGetWay_1 = require("./ItemTipsGetWay");
class TipsMaterialComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
	constructor(t) {
		super(t),
			(this.Pe = void 0),
			(this.LPt = void 0),
			this.CreateThenShowByResourceIdAsync("UiItem_TipsMaterial", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
		];
	}
	OnStart() {
		var t = this.GetItem(6);
		this.LPt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
	}
	OnBeforeDestroy() {
		this.Pe &&
			((this.Pe = void 0),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
	}
	Refresh(t) {
		var e = () => {
			var t = this.Pe,
				e =
					((e =
						((e =
							(LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(0),
								t.MaterialType,
							),
							this.GetSprite(1).SetUIActive(void 0 !== t.FunctionSpritePath),
							t.FunctionSpritePath &&
								this.SetSpriteByPath(
									t.FunctionSpritePath,
									this.GetSprite(1),
									!1,
								),
							this.GetText(3).SetText(t.Num.toString()),
							(this.GetText(3).useChangeColor = 0 === t.Num),
							!StringUtils_1.StringUtils.IsEmpty(t.TxtEffect))) &&
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.TxtEffect),
						this.GetText(4).SetUIActive(e),
						!StringUtils_1.StringUtils.IsEmpty(t.TxtDescription))) &&
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(5),
							t.TxtDescription,
						),
					this.GetText(5).SetUIActive(e),
					this.DPt(t.GetWayData),
					this.RPt(t.LimitTimeTxt),
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
						t.ConfigId,
						!0,
					));
			t = 6e4 === e?.ItemType || 60002 === e?.ItemType || 60003 === e?.ItemType;
			this.SetPanelNumVisible(!t);
		};
		(this.Pe = t),
			ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t),
			this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
	}
	DPt(t) {
		this.GetItem(6).SetUIActive(0 !== t.length), t && this.LPt.Refresh(t);
	}
	RPt(t) {
		this.GetItem(7).SetUIActive(void 0 !== t), t && this.GetText(8).SetText(t);
	}
	SetPanelNumVisible(t) {
		var e = () => {
			this.GetItem(2).SetUIActive(t);
		};
		this.InAsyncLoading()
			? this.OperationMap.set("SetPanelNumVisible", e)
			: e();
	}
}
exports.TipsMaterialComponent = TipsMaterialComponent;
