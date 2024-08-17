"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHintView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	ItemHintItem_1 = require("./ItemHintItem"),
	ItemPriorHintItem_1 = require("./ItemPriorHintItem"),
	ListSliderControl_1 = require("./ListSliderControl");
class ItemHintView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.egi = void 0),
			(this.tgi = void 0),
			(this.igi = () =>
				ConfigManager_1.ConfigManager.ItemConfig.GetItemListMaxSize()),
			(this.ogi = () =>
				ConfigManager_1.ConfigManager.ItemConfig.GetPriorItemListMaxSize()),
			(this.rgi = () =>
				!ModelManager_1.ModelManager.ItemHintModel.IsMainInterfaceDataEmpty),
			(this.ngi = () =>
				!ModelManager_1.ModelManager.ItemHintModel.IsPriorInterfaceDataEmpty),
			(this.sgi = () =>
				ConfigManager_1.ConfigManager.RewardConfig.GetNextItemTime()),
			(this.HDe = () => {
				this.tgi.IsFinish && this.egi.IsFinish && this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[1, UE.UIItem],
			[0, UE.UIItem],
		];
	}
	OnBeforeDestroy() {
		this.egi && (this.egi.DestroyMe(), (this.egi = void 0)),
			this.tgi && (this.tgi.DestroyMe(), (this.tgi = void 0));
	}
	OnStart() {
		this.rgi() || this.ngi()
			? ((this.egi = new ListSliderControl_1.ListSliderControl(
					ItemHintItem_1.ItemHintItem,
					this.GetItem(1),
					this.igi,
					this.rgi,
					this.sgi,
					this.HDe,
					0,
				)),
				this.egi.DisEnableParentLayout(),
				(this.tgi = new ListSliderControl_1.ListSliderControl(
					ItemPriorHintItem_1.ItemPriorHintItem,
					this.GetItem(0),
					this.ogi,
					this.ngi,
					this.sgi,
					this.HDe,
					0,
				)),
				this.tgi.DisEnableParentLayout())
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("ItemHint", 9, "进包列表为空, 但打开了界面!"),
				this.CloseMe());
	}
	OnTick(i) {
		this.tgi && this.tgi.Tick(i), this.egi && this.egi.Tick(i);
	}
}
exports.ItemHintView = ItemHintView;
