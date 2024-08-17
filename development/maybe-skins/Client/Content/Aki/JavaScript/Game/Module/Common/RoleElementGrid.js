"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleElementGrid = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleElementGrid extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.Vyt = 0), this.CreateThenShowByActor(e);
	}
	get Lo() {
		return this.Vyt
			? ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.Vyt)
			: void 0;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
		];
	}
	mBt() {
		var e,
			t,
			r = this.GetTexture(0),
			n = this.GetSprite(1);
		r &&
			n &&
			(e = this.Lo) &&
			((t = e.ElementColor),
			(t = UE.Color.FromHex(t)),
			n.SetColor(t),
			"" !== (n = e.Icon)) &&
			0 !== n.length &&
			this.SetElementIcon(n, r, this.Vyt);
	}
	Refresh(e) {
		(this.Vyt = e), this.mBt();
	}
}
exports.RoleElementGrid = RoleElementGrid;
