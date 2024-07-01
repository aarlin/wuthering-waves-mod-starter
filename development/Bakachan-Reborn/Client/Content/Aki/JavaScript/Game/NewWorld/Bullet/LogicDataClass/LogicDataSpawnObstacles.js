"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSpawnObstacles extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Model = 0),
			(this.Mesh = void 0),
			(this.Size = void 0),
			(this.ProfileName = void 0),
			(this.ShowModel = !1),
			(this.NeedAttach = !1),
			(this.CanStandOn = !1);
	}
}
exports.default = LogicDataSpawnObstacles;
