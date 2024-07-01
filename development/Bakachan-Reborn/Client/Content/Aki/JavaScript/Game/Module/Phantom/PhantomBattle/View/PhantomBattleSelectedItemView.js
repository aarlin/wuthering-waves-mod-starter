"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomBattleSelectedItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PhantomBattleSelectedItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.GetItem(0).SetUIActive(!0), this.GetItem(2).SetUIActive(!1);
	}
	UpdateSelectedItem(e, t) {
		let o = "";
		(o =
			e !== t
				? `<color=#9d2437>${e}</color><color=#ffffff>/${t}</color>`
				: `<color=#ffffff>${e}</color><color=#ffffff>/${t}</color>`),
			this.GetText(1).SetText(o);
	}
}
exports.PhantomBattleSelectedItem = PhantomBattleSelectedItem;
