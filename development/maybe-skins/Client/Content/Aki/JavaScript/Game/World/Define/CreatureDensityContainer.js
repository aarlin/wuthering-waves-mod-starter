"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreatureDensityContainer = exports.CreatureDensityItem = void 0);
class CreatureDensityItem {
	constructor(e, t, r) {
		(this.CreatureDataId = e),
			(this.DensityLevel = t),
			(this.EntityData = r),
			(this.EntityHandle = void 0);
	}
}
exports.CreatureDensityItem = CreatureDensityItem;
class CreatureDensityContainer {
	constructor() {
		(this.DensityArray = new Array()), (this.CreatureDensityMap = new Map());
	}
	GetLevel(e) {
		for (; this.DensityArray.length <= e; ) this.DensityArray.push(new Map());
		return this.DensityArray[e];
	}
	GetItem(e) {
		return this.CreatureDensityMap.get(e);
	}
	AddItem(e, t, r) {
		var s = new CreatureDensityItem(e, t, r);
		for (
			this.CreatureDensityMap.set(e, s);
			this.DensityArray.length <= s.DensityLevel;
		)
			this.DensityArray.push(new Map());
		return this.DensityArray[s.DensityLevel].set(e, s), s;
	}
	RemoveItem(e) {
		var t = this.CreatureDensityMap.get(e);
		return (
			!!t &&
			(this.CreatureDensityMap.delete(e),
			this.DensityArray[t.DensityLevel].delete(e),
			!0)
		);
	}
	Clear() {
		this.CreatureDensityMap.clear();
		for (const e of this.DensityArray) e.clear();
	}
}
exports.CreatureDensityContainer = CreatureDensityContainer;
