"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalRoleMediumItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class PersonalRoleMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.zke = 0), (this.GirdIndex = 0);
	}
	OnRefresh(e, o, t) {
		(this.zke = e),
			(this.GirdIndex = t),
			(t = {
				Type: 2,
				Data: e,
				ItemConfigId: e,
				BottomTextId: "Text_LevelShow_Text",
				BottomTextParameter: [
					ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke)
						.GetLevelData()
						.GetLevel(),
				],
			}),
			this.Apply(t);
	}
}
exports.PersonalRoleMediumItemGrid = PersonalRoleMediumItemGrid;
