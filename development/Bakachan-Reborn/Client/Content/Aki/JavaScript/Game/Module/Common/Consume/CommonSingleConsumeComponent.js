"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSingleConsumeComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiComponentUtil_1 = require("../../Util/UiComponentUtil"),
	ButtonItem_1 = require("../Button/ButtonItem"),
	ConsumeItem_1 = require("./ConsumeItem"),
	ConsumeItemUtil_1 = require("./ConsumeItemUtil");
class CommonSingleConsumeComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.StrengthItem = void 0),
			(this.ConsumeItem = void 0),
			(this.EnoughMoney = !0),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
		];
	}
	OnStart() {
		(this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(5))),
			(this.ConsumeItem = new ConsumeItem_1.ConsumeItem(this.GetItem(4)));
	}
	OnBeforeDestroy() {
		this.StrengthItem.Destroy(), (this.StrengthItem = void 0);
	}
	UpdateComponent(e, t, n) {
		let o;
		this.SetMaxState(!1),
			n &&
				(o = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(n[0], n[1])),
			this.ConsumeItem.UpdateItem(o);
		n = this.GetText(1);
		var m = this.GetTexture(0),
			i = this.GetText(3),
			s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);
		(this.EnoughMoney = UiComponentUtil_1.UiComponentUtil.SetMoneyState(
			n,
			i,
			t,
			s,
		)),
			(n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e));
		this.SetTextureByPath(n.Icon, m);
	}
	UpdateComponentOnlyConsume(e) {
		let t;
		this.SetMaxState(!1),
			this.GetItem(6).SetUIActive(!1),
			e &&
				(t = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(e[0], e[1])),
			this.ConsumeItem.UpdateItem(t);
	}
	SetMaxState(e) {
		this.GetItem(6).SetUIActive(!e),
			this.GetItem(7).SetUIActive(!e),
			this.StrengthItem.SetEnableClick(!e),
			e
				? this.StrengthItem.SetLocalText("ReachMaxLevelStage")
				: this.StrengthItem.SetLocalText("WeaponResonanceText");
	}
	SetStrengthFunction(e) {
		this.StrengthItem.SetFunction(e);
	}
	SetStrengthItemLocalText(e, ...t) {
		this.StrengthItem.SetLocalText(e, t);
	}
	SetConsumeFunction(e) {
		this.ConsumeItem.SetButtonFunction(e);
	}
	GetEnoughMoney() {
		return this.EnoughMoney;
	}
}
exports.CommonSingleConsumeComponent = CommonSingleConsumeComponent;
