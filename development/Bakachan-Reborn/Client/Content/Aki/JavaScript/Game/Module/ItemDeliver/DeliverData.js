"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeliverData = void 0);
const DeliverSlotData_1 = require("./DeliverSlotData");
class DeliverData {
	constructor(t, e, i, s) {
		(this.Context = void 0),
			(this.nCi = []),
			(this.NpcName = ""),
			(this.TitleTextId = void 0),
			(this.DescriptionTextId = void 0),
			(this.Context = s),
			(this.NpcName = t),
			(this.TitleTextId = e),
			(this.DescriptionTextId = i);
	}
	Clear() {
		(this.Context = void 0),
			(this.nCi.length = 0),
			(this.NpcName = ""),
			(this.DescriptionTextId = "");
	}
	AddSlotData(t, e, i) {
		var s;
		if (t && !(t.length <= 0))
			return (
				(s = new DeliverSlotData_1.DeliverSlotData()).Initialize(t, e, i),
				this.nCi.push(s),
				s
			);
	}
	GetSlotDataList() {
		return this.nCi;
	}
	IsSlotEnough(t) {
		for (const e of this.nCi)
			if (e.HasItem() && e.GetCurrentItemConfigId() === t && e.IsEnough())
				return !0;
		return !1;
	}
}
exports.DeliverData = DeliverData;
