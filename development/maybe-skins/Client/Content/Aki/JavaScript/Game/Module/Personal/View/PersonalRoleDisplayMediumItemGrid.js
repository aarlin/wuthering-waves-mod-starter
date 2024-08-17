"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalRoleDisplayMediumItemGrid = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class PersonalRoleDisplayMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.RoleId = 0);
	}
	OnRefresh(e, o, i) {
		if (((this.GridIndex = i), e < 0)) {
			const e = { Type: 1 };
			this.Apply(e);
		} else {
			(this.RoleId = e),
				(i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e));
			const o = {
				Type: 2,
				Data: e,
				ItemConfigId: e,
				BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name),
			};
			this.Apply(o);
		}
	}
}
exports.PersonalRoleDisplayMediumItemGrid = PersonalRoleDisplayMediumItemGrid;
