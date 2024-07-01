"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WuYinAreaModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
class WuYinAreaModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.v4o = new Map());
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return this.v4o.clear(), !0;
	}
	GetWuYinLevelSequenceState(e) {
		if (this.v4o.has(e)) return this.v4o.get(e);
	}
	PlayWuYinSequence(e, r) {
		(r = "Play" === r ? 1 : 0),
			RenderModuleController_1.RenderModuleController.SetBattleState(e, r);
	}
}
exports.WuYinAreaModel = WuYinAreaModel;
