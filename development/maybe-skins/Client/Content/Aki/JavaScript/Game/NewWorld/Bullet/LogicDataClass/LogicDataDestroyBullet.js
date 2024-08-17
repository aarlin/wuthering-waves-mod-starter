"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataDestroyBullet extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.BulletOwner = 0),
			(this.DestroyBulletRowName = "None"),
			(this.SummonChildBullet = !1);
	}
}
exports.default = LogicDataDestroyBullet;
