"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillTreeAttributeItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillTreeAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
		];
	}
	OnStart() {
		this.SetNextLevelItem(!1);
	}
	Refresh(e, t) {
		var r;
		e.AttrNameText && this.GetText(0).SetText(e.AttrNameText),
			e.AttrBaseValue && this.GetText(1).SetText(e.AttrBaseValue),
			t &&
				t.AttrBaseValue &&
				((r = this.GetText(3)).SetText(t.AttrBaseValue),
				(t = t.AttrBaseValue !== e.AttrBaseValue),
				r.SetChangeColor(t, r.changeColor),
				this.GetItem(4).SetUIActive(t));
	}
	SetNextLevelItem(e) {
		this.GetItem(2).SetUIActive(e);
	}
}
exports.RoleSkillTreeAttributeItem = RoleSkillTreeAttributeItem;
