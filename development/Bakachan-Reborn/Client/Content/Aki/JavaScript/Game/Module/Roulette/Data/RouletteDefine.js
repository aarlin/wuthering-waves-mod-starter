"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ROULETTE_NUM =
		exports.DEFAULT_ITEM_ROULETTE_GRID_INDEX =
		exports.ROULETTE_TEXT_EMPTY =
		exports.AssemblyTipsData =
		exports.AssemblyEquipItemGridData =
		exports.AssemblyFunctionGridData =
		exports.AssemblyExploreGridData =
		exports.AssemblyGridData =
			void 0);
class AssemblyGridData {
	constructor() {
		(this.Id = 0),
			(this.Index = -1),
			(this.GridType = 0),
			(this.Name = ""),
			(this.State = 0),
			(this.SortId = 0),
			(this.RelativeIndex = 0);
	}
}
class AssemblyExploreGridData extends (exports.AssemblyGridData =
	AssemblyGridData) {
	constructor() {
		super(...arguments), (this.IconPath = "");
	}
}
exports.AssemblyExploreGridData = AssemblyExploreGridData;
class AssemblyFunctionGridData extends AssemblyGridData {
	constructor() {
		super(...arguments), (this.IconPath = "");
	}
}
exports.AssemblyFunctionGridData = AssemblyFunctionGridData;
class AssemblyEquipItemGridData extends AssemblyGridData {
	constructor() {
		super(...arguments),
			(this.ItemType = 1),
			(this.QualityId = 0),
			(this.ItemNum = 0);
	}
}
exports.AssemblyEquipItemGridData = AssemblyEquipItemGridData;
class AssemblyTipsData {
	constructor() {
		(this.GridType = 0),
			(this.GridId = 0),
			(this.Title = ""),
			(this.BgQuality = 1),
			(this.IsIconTexture = !1),
			(this.IconPath = ""),
			(this.HelpId = 0),
			(this.TextMain = ""),
			(this.TextSub = ""),
			(this.GetWayData = []),
			(this.CanSetItemNum = [0, 0]),
			(this.NeedItemMap = new Map()),
			(this.Authorization = []);
	}
}
(exports.AssemblyTipsData = AssemblyTipsData),
	(exports.ROULETTE_TEXT_EMPTY = "Text_ProbeToolFunctionNotice2_Text"),
	(exports.DEFAULT_ITEM_ROULETTE_GRID_INDEX = 6),
	(exports.ROULETTE_NUM = 8);
