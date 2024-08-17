"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDetailInformationBuffItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	TowerDetailInformationBuffSubItem_1 = require("./TowerDetailInformationBuffSubItem");
class TowerDetailInformationBuffItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.fLo = void 0),
			(this.pLo = void 0),
			(this.vLo = (e, t, o) => (
				(t =
					new TowerDetailInformationBuffSubItem_1.TowerDetailInformationBuffSubItem(
						t,
					)).Update(e),
				{ Key: o, Value: t }
			)),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
		];
	}
	OnStart() {
		this.pLo = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(1),
			this.vLo,
		);
	}
	Update(e) {
		(this.fLo = e), this.Og();
	}
	Og() {
		this.pLo.RebuildLayoutByDataNew(this.fLo.Buffs);
	}
	OnBeforeDestroy() {
		this.pLo.ClearChildren();
	}
}
exports.TowerDetailInformationBuffItem = TowerDetailInformationBuffItem;
