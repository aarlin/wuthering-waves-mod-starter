"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataInteract = void 0);
class BulletDataInteract {
	constructor(t) {
		(this.u6o = ""), (this.c6o = !1), (this.Pe = t);
	}
	get WaterInteract() {
		return (
			this.c6o ||
				((this.c6o = !0), (this.u6o = this.Pe.水面交互.ToAssetPathName())),
			this.u6o
		);
	}
}
exports.BulletDataInteract = BulletDataInteract;
