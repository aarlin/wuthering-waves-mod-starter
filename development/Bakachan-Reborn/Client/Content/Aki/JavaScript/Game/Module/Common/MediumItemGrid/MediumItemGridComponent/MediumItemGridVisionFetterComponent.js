"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridVisionFetterComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisionFetterComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments), (this.PPt = void 0);
	}
	GetResourceId() {
		return "UiItem_ItemRogue";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(0),
		)),
			await this.PPt.Init().finally(() => {
				this.GetItem(0).SetUIActive(!0);
			});
	}
	OnActivate() {
		this.GetText(1).SetUIActive(!1);
	}
	OnRefresh(e) {
		(e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e)),
			this.SetActive(!0),
			this.PPt.Update(e);
	}
}
exports.MediumItemGridVisionFetterComponent =
	MediumItemGridVisionFetterComponent;
