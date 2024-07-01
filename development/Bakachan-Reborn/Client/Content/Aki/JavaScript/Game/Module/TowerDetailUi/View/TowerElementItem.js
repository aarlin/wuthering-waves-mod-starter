"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerElementItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerElementItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UITexture],
		];
	}
	OnStart() {}
	Refresh(e) {
		(e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e)),
			this.SetTextureByPath(e.Icon, this.GetTexture(1)),
			this.GetItem(0)?.SetColor(UE.Color.FromHex(e.ElementColor));
	}
}
exports.TowerElementItem = TowerElementItem;
