"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleHeadGrid = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleHeadGrid extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.zke = 0), this.CreateThenShowByActor(e);
	}
	get Lo() {
		return this.zke
			? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke)
			: void 0;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	dBt() {
		var e,
			t = this.Lo;
		t &&
			(e = this.GetTexture(0)) &&
			"" !== (t = t.RoleHeadIconBig) &&
			this.SetRoleIcon(t, e, this.zke);
	}
	Refresh(e) {
		(this.zke = e), this.dBt();
	}
}
exports.RoleHeadGrid = RoleHeadGrid;
