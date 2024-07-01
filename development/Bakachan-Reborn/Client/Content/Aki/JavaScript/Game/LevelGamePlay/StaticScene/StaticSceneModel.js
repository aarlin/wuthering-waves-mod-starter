"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StaticSceneModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class StaticSceneModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.IsNotAutoExitSceneCamera = !1),
			(this.IsForceKeepUi = !1);
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return (this.IsNotAutoExitSceneCamera = !1), !(this.IsForceKeepUi = !1);
	}
}
exports.StaticSceneModel = StaticSceneModel;
