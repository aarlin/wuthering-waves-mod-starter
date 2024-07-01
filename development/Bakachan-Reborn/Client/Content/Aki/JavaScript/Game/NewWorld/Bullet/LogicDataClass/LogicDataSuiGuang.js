"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSuiGuang extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.IncludeBullet = !1),
			(this.NeedTag = void 0),
			(this.NewBulletId = "");
	}
}
exports.default = LogicDataSuiGuang;
