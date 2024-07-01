"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AccessPathButton = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AccessPathButton extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.Rci = () => {
				this.Uci && this.Uci(this.Aci);
			}),
			(this.Aci = t),
			this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIToggleComponent],
		]),
			(this.BtnBindInfo = [[6, this.Rci]]);
	}
	OnStart() {
		var e,
			t,
			i,
			s,
			n,
			o,
			a = ConfigManager_1.ConfigManager.InventoryConfig.GetAccessPathConfig(
				this.Aci,
			);
		a &&
			((e = this.GetText(0)),
			(t = this.GetText(1)),
			(i = this.GetText(2)),
			(s = this.GetText(3)),
			(n = this.GetText(4)),
			(o = this.GetText(5)),
			e) &&
			t &&
			i &&
			s &&
			n &&
			o &&
			((a = a.Description),
			e.ShowTextNew(a),
			t.ShowTextNew(a),
			i.ShowTextNew(a),
			s.ShowTextNew(a),
			n.ShowTextNew(a),
			o.ShowTextNew(a));
	}
	OnBeforeDestroy() {
		this.Uci = void 0;
	}
	BindOnGetWayButtonClickedCallback(e) {
		this.Uci = e;
	}
}
exports.AccessPathButton = AccessPathButton;
