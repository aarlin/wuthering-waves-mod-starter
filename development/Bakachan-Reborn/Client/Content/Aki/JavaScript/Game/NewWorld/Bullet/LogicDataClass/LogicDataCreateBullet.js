"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataCreateBullet extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.BulletOwner = 0),
			(this.CreateBulletRowName = "None"),
			(this.BulletTransform = 0),
			(this.AttachToActor = 0),
			(this.AttachToBoneName = "None"),
			(this.FlashBulletRowName = "None");
	}
}
exports.default = LogicDataCreateBullet;
