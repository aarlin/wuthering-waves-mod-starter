"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PoiQuest =
		exports.GuideQuest =
		exports.RoleQuest =
		exports.TestQuest =
		exports.BranchQuest =
		exports.MainQuest =
		exports.createQuestObj =
			void 0);
const DailyQuest_1 = require("./DailyQuest"),
	Quest_1 = require("./Quest");
function createQuestObj(e) {
	if (e) {
		let s;
		switch (e.Type) {
			case 100:
				s = new TestQuest(100, e);
				break;
			case 1:
				s = new MainQuest(1, e);
				break;
			case 2:
				s = new BranchQuest(2, e);
				break;
			case 3:
				s = new RoleQuest(3, e);
				break;
			case 7:
				s = new GuideQuest(7, e);
				break;
			case 4:
				s = new DailyQuest_1.DailyQuest(4, e);
				break;
			case 9:
				s = new PoiQuest(9, e);
				break;
			default:
				s = new Quest_1.Quest(e.Type, e);
		}
		return s;
	}
}
exports.createQuestObj = createQuestObj;
class MainQuest extends Quest_1.Quest {}
exports.MainQuest = MainQuest;
class BranchQuest extends Quest_1.Quest {}
exports.BranchQuest = BranchQuest;
class TestQuest extends Quest_1.Quest {}
exports.TestQuest = TestQuest;
class RoleQuest extends Quest_1.Quest {}
exports.RoleQuest = RoleQuest;
class GuideQuest extends Quest_1.Quest {}
exports.GuideQuest = GuideQuest;
class PoiQuest extends Quest_1.Quest {}
exports.PoiQuest = PoiQuest;
