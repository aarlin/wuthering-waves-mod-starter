"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityFilter = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log");
class EntityFilter {
	static CollectList = [
		"Collect001",
		"Collect002",
		"Collect003",
		"Collect004",
		"Collect005",
		"Collect006",
		"Collect007",
		"Collect008",
		"Collect009",
		"Collect010",
		"Collect011",
		"Collect101",
		"Collect102",
		"Collect103",
		"Collect104",
		"Collect105",
		"Collect106",
		"Collect107",
		"Collect108",
		"Collect109",
		"Collect110",
		"Collect111",
		"Collect112",
		"Collect113",
		"Collect114",
		"Collect115",
		"Collect116",
		"Collect117",
		"Collect118",
		"Collect119",
		"Collect601",
		"Collect602",
		"Collect603",
	];
	static CollectAnimal = [
		"Animal016",
		"Animal017",
		"Animal018",
		"Animal019",
		"Animal020",
		"Animal021",
		"Animal022",
		"Animal023",
		"Animal024",
		"Animal025",
		"Animal026",
		"Animal027",
		"Animal028",
		"Animal029",
		"Animal030",
	];
	static TreasureList = [
		"Treasure001",
		"Treasure002",
		"Treasure003",
		"Treasure004",
		"Treasure005",
		"Treasure006",
		"Treasure007",
		"Treasure008",
		"Treasure009",
		"Treasure010",
		"Treasure011",
		"Treasure012",
		"Treasure013",
		"Treasure014",
		"Treasure015",
		"Treasure016",
		"Treasure017",
		"Treasure018",
		"Treasure019",
		"Treasure020",
		"Treasure021",
	];
	static isneedLoot(e) {
		return this.CollectList.includes(e) || this.CollectAnimal.includes(e);
	}
	static isneedTreasure(e) {
		return this.TreasureList.includes(e);
	}
}
exports.EntityFilter = EntityFilter;
