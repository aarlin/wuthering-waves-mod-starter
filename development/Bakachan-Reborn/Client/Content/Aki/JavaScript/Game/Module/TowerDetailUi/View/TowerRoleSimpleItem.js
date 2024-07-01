"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerRoleSimpleItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerRoleSimpleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	Refresh(e, t, r) {
		var o;
		e
			? (this.GetTexture(0).SetUIActive(!0),
				(o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
				this.SetRoleIcon(o.RoleHeadIcon, this.GetTexture(0), e))
			: this.GetTexture(0).SetUIActive(!1);
	}
}
exports.TowerRoleSimpleItem = TowerRoleSimpleItem;
