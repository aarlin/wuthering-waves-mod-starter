"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.JoinTeamModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class JoinTeamModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.F0i = 0);
	}
	SetRoleDescriptionId(e) {
		(this.F0i = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshJoinTeamRole,
			);
	}
	GetRoleDescriptionId() {
		return this.F0i;
	}
}
exports.JoinTeamModel = JoinTeamModel;
