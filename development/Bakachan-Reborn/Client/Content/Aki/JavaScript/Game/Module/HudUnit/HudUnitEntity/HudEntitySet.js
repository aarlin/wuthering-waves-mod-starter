"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudEntitySet = void 0);
const HudEntityData_1 = require("./HudEntityData");
class HudEntitySet {
	constructor() {
		(this.iii = []), (this.oii = new Map());
	}
	Initialize() {}
	Clear() {
		(this.iii.length = 0), this.oii.clear();
	}
	Add(t) {
		var i = new HudEntityData_1.HudEntityData();
		return i.Initialize(t), this.oii.set(t.Id, i), this.iii.push(i), i;
	}
	Remove(t) {
		var i = this.GetByEntity(t);
		i &&
			(i.Destroy(),
			(i = this.iii.indexOf(i)),
			this.iii.splice(i, 1),
			this.oii.delete(t.Id));
	}
	Num() {
		return this.iii.length;
	}
	GetByEntity(t) {
		return this.oii.get(t.Id);
	}
	GetByEntityId(t) {
		return this.oii.get(t);
	}
	GetAll() {
		return this.iii;
	}
}
exports.HudEntitySet = HudEntitySet;
