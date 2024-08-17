"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataDestroyOtherBullet extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Camp = 0),
			(this.BulletId = ""),
			(this.SummonChildBullet = !1);
	}
}
exports.default = LogicDataDestroyOtherBullet;
