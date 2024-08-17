"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerRoleComplexItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerRoleComplexItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.GetItem(2).SetUIActive(!1);
	}
	RefreshRoleId(e) {
		var t,
			o = this.GetTexture(1),
			i = this.GetSprite(0);
		e
			? (o.SetUIActive(!0),
				i.SetUIActive(!0),
				(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
				this.SetRoleIcon(t.RoleHeadIconBig, o, e),
				(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(
					t.QualityId,
				)),
				this.SetSpriteByPath(e.Image, i, !1))
			: (o.SetUIActive(!1), i.SetUIActive(!1));
	}
}
exports.TowerRoleComplexItem = TowerRoleComplexItem;
