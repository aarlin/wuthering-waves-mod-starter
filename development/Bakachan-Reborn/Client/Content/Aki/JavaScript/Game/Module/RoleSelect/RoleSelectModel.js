"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSelectModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleSelectModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.SelectedRoleSet = new Set()),
			(this.RoleIndexMap = new Map());
	}
	GetRoleIndex(e) {
		for (const o of this.RoleIndexMap) if (o[1].GetDataId() === e) return o[0];
		return 0;
	}
	ClearData() {
		this.SelectedRoleSet.clear(), this.RoleIndexMap.clear();
	}
}
exports.RoleSelectModel = RoleSelectModel;
