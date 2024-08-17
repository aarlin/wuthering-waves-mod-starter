"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridTeamIconComponent = void 0);
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridTeamIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	GetResourceId() {
		return "UiItem_ItemTeam";
	}
	OnRefresh(e) {
		void 0 !== e && e ? this.SetActive(!0) : this.SetActive(!1);
	}
}
exports.MediumItemGridTeamIconComponent = MediumItemGridTeamIconComponent;
