"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GiftPackageItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class GiftPackageItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.CommonItemSimpleGrid = void 0),
			(this.ItemId = 0);
	}
	Initialize(e) {
		this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	OnStart() {
		(this.CommonItemSimpleGrid =
			new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this.CommonItemSimpleGrid.Initialize(this.GetItem(0).GetOwner());
	}
	SetBelongViewName(e) {}
	UpdateItem(e, t) {
		(this.ItemId = e),
			this.CommonItemSimpleGrid.RefreshByConfigId(e),
			(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e)),
			this.GetText(1).ShowTextNew(e.Name),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Quantity", t);
	}
	OnBeforeDestroy() {}
}
exports.GiftPackageItem = GiftPackageItem;
