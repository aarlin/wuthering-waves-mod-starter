"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class GamePingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.CurrentPing = 0);
	}
}
exports.GamePingModel = GamePingModel;
